import type { WindowInstance } from '../types';
import { instances, emit } from '../core';

// Global z-index manager
let topZIndex = 1000;
const windowInstances: Set<Window> = new Set();

export class Window implements WindowInstance {
  #el: HTMLElement;
  #titleBar: HTMLElement | null = null;
  #content: HTMLElement | null = null;
  #title: string;
  #isMinimized = false;
  #isMaximized = false;
  #isDragging = false;
  #isResizing = false;
  #resizeDirection = '';
  #dragOffset = { x: 0, y: 0 };
  #savedState = { x: 0, y: 0, width: 0, height: 0 };
  #minWidth: number;
  #minHeight: number;
  #boundHandleMouseMove: (e: MouseEvent) => void;
  #boundHandleMouseUp: () => void;
  #boundHandleTouchMove: (e: TouchEvent) => void;
  #boundHandleTouchEnd: () => void;

  constructor(el: HTMLElement) {
    this.#el = el;
    this.#title = el.dataset.title || 'Janela';
    this.#minWidth = parseInt(el.dataset.minWidth || '200');
    this.#minHeight = parseInt(el.dataset.minHeight || '150');

    this.#boundHandleMouseMove = this.#handleMouseMove.bind(this);
    this.#boundHandleMouseUp = this.#handleMouseUp.bind(this);
    this.#boundHandleTouchMove = this.#handleTouchMove.bind(this);
    this.#boundHandleTouchEnd = this.#handleTouchEnd.bind(this);

    this.#createWindow();
    this.#setupListeners();
    this.#bringToFront();

    windowInstances.add(this);
    instances.set(el, this);

    // Notify taskbar
    emit(document.body, 'window:created', { 
      id: this.#el.id || this.#el.dataset.windowId,
      title: this.#title,
      instance: this
    });
  }

  #createWindow(): void {
    // Wrap existing content
    const existingContent = this.#el.innerHTML;
    
    this.#el.className = `fixed bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col ${this.#el.className}`;
    this.#el.style.minWidth = `${this.#minWidth}px`;
    this.#el.style.minHeight = `${this.#minHeight}px`;
    
    // Set initial position if not set
    if (!this.#el.style.left && !this.#el.style.top) {
      const offset = windowInstances.size * 30;
      this.#el.style.left = `${100 + offset}px`;
      this.#el.style.top = `${100 + offset}px`;
    }
    
    // Set initial size if not set
    if (!this.#el.style.width) {
      this.#el.style.width = this.#el.dataset.width || '400px';
    }
    if (!this.#el.style.height) {
      this.#el.style.height = this.#el.dataset.height || '300px';
    }

    this.#el.innerHTML = `
      <div data-window-titlebar class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 cursor-move select-none shrink-0">
        <div class="flex items-center gap-2">
          <span data-window-icon class="text-sm">${this.#el.dataset.icon || '📋'}</span>
          <span data-window-title class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">${this.#title}</span>
        </div>
        <div class="flex items-center gap-1">
          <button data-window-minimize class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors" title="Minimizar">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
          </button>
          <button data-window-maximize class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors" title="Maximizar">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </button>
          <button data-window-close class="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500 hover:text-white text-gray-500 dark:text-gray-400 transition-colors" title="Fechar">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <div data-window-content class="flex-1 overflow-auto p-4">
        ${existingContent}
      </div>
      <!-- Resize handles -->
      <div data-resize="n" class="absolute top-0 left-2 right-2 h-1 cursor-n-resize"></div>
      <div data-resize="s" class="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"></div>
      <div data-resize="e" class="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize"></div>
      <div data-resize="w" class="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize"></div>
      <div data-resize="nw" class="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"></div>
      <div data-resize="ne" class="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"></div>
      <div data-resize="sw" class="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"></div>
      <div data-resize="se" class="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"></div>
    `;

    this.#titleBar = this.#el.querySelector('[data-window-titlebar]');
    this.#content = this.#el.querySelector('[data-window-content]');
  }

  #setupListeners(): void {
    // Focus on click
    this.#el.addEventListener('mousedown', () => this.#bringToFront());

    // Title bar drag
    this.#titleBar?.addEventListener('mousedown', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      this.#startDrag(e.clientX, e.clientY);
    });

    this.#titleBar?.addEventListener('touchstart', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      const touch = e.touches[0];
      this.#startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    // Double-click to maximize
    this.#titleBar?.addEventListener('dblclick', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      this.#isMaximized ? this.restore() : this.maximize();
    });

    // Window controls
    this.#el.querySelector('[data-window-minimize]')?.addEventListener('click', () => this.minimize());
    this.#el.querySelector('[data-window-maximize]')?.addEventListener('click', () => {
      this.#isMaximized ? this.restore() : this.maximize();
    });
    this.#el.querySelector('[data-window-close]')?.addEventListener('click', () => this.close());

    // Resize handles
    this.#el.querySelectorAll('[data-resize]').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#startResize((handle as HTMLElement).dataset.resize || '', e as MouseEvent);
      });
    });

    // Global mouse/touch events
    document.addEventListener('mousemove', this.#boundHandleMouseMove);
    document.addEventListener('mouseup', this.#boundHandleMouseUp);
    document.addEventListener('touchmove', this.#boundHandleTouchMove, { passive: false });
    document.addEventListener('touchend', this.#boundHandleTouchEnd);
  }

  #startDrag(clientX: number, clientY: number): void {
    if (this.#isMaximized) return;
    
    this.#isDragging = true;
    this.#dragOffset = {
      x: clientX - this.#el.offsetLeft,
      y: clientY - this.#el.offsetTop
    };
    this.#el.style.transition = 'none';
  }

  #startResize(direction: string, e: MouseEvent): void {
    if (this.#isMaximized) return;
    
    this.#isResizing = true;
    this.#resizeDirection = direction;
    this.#savedState = {
      x: e.clientX,
      y: e.clientY,
      width: this.#el.offsetWidth,
      height: this.#el.offsetHeight
    };
    this.#el.style.transition = 'none';
    this.#bringToFront();
  }

  #handleMouseMove(e: MouseEvent): void {
    if (this.#isDragging) {
      this.#drag(e.clientX, e.clientY);
    } else if (this.#isResizing) {
      this.#resize(e.clientX, e.clientY);
    }
  }

  #handleTouchMove(e: TouchEvent): void {
    if (this.#isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      this.#drag(touch.clientX, touch.clientY);
    }
  }

  #drag(clientX: number, clientY: number): void {
    let newX = clientX - this.#dragOffset.x;
    let newY = clientY - this.#dragOffset.y;

    // Keep within viewport
    newX = Math.max(0, Math.min(newX, window.innerWidth - this.#el.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - this.#el.offsetHeight));

    this.#el.style.left = `${newX}px`;
    this.#el.style.top = `${newY}px`;
  }

  #resize(clientX: number, clientY: number): void {
    const dx = clientX - this.#savedState.x;
    const dy = clientY - this.#savedState.y;
    const dir = this.#resizeDirection;

    let newWidth = this.#savedState.width;
    let newHeight = this.#savedState.height;
    let newLeft = this.#el.offsetLeft;
    let newTop = this.#el.offsetTop;

    if (dir.includes('e')) {
      newWidth = Math.max(this.#minWidth, this.#savedState.width + dx);
    }
    if (dir.includes('w')) {
      const proposedWidth = this.#savedState.width - dx;
      if (proposedWidth >= this.#minWidth) {
        newWidth = proposedWidth;
        newLeft = this.#el.offsetLeft + dx;
      }
    }
    if (dir.includes('s')) {
      newHeight = Math.max(this.#minHeight, this.#savedState.height + dy);
    }
    if (dir.includes('n')) {
      const proposedHeight = this.#savedState.height - dy;
      if (proposedHeight >= this.#minHeight) {
        newHeight = proposedHeight;
        newTop = this.#el.offsetTop + dy;
      }
    }

    this.#el.style.width = `${newWidth}px`;
    this.#el.style.height = `${newHeight}px`;
    if (dir.includes('w')) this.#el.style.left = `${newLeft}px`;
    if (dir.includes('n')) this.#el.style.top = `${newTop}px`;
  }

  #handleMouseUp(): void {
    if (this.#isDragging || this.#isResizing) {
      this.#isDragging = false;
      this.#isResizing = false;
      this.#el.style.transition = '';
      emit(this.#el, 'window:moved', { 
        x: this.#el.offsetLeft, 
        y: this.#el.offsetTop,
        width: this.#el.offsetWidth,
        height: this.#el.offsetHeight
      });
    }
  }

  #handleTouchEnd(): void {
    this.#handleMouseUp();
  }

  #bringToFront(): void {
    topZIndex++;
    this.#el.style.zIndex = String(topZIndex);
    emit(this.#el, 'window:focus', { id: this.#el.id });
  }

  minimize(): this {
    if (this.#isMinimized) return this;

    this.#savedState = {
      x: this.#el.offsetLeft,
      y: this.#el.offsetTop,
      width: this.#el.offsetWidth,
      height: this.#el.offsetHeight
    };

    this.#el.style.transform = 'scale(0)';
    this.#el.style.opacity = '0';
    this.#el.style.pointerEvents = 'none';
    this.#isMinimized = true;

    emit(this.#el, 'window:minimized', { id: this.#el.id, title: this.#title });
    emit(document.body, 'window:minimized', { id: this.#el.id, title: this.#title, instance: this });
    return this;
  }

  restore(): this {
    if (this.#isMinimized) {
      this.#el.style.transform = '';
      this.#el.style.opacity = '1';
      this.#el.style.pointerEvents = '';
      this.#isMinimized = false;
      this.#bringToFront();
      emit(this.#el, 'window:restored', { id: this.#el.id });
      emit(document.body, 'window:restored', { id: this.#el.id, instance: this });
    } else if (this.#isMaximized) {
      this.#el.style.left = `${this.#savedState.x}px`;
      this.#el.style.top = `${this.#savedState.y}px`;
      this.#el.style.width = `${this.#savedState.width}px`;
      this.#el.style.height = `${this.#savedState.height}px`;
      this.#isMaximized = false;
      
      // Update maximize button icon
      const maxBtn = this.#el.querySelector('[data-window-maximize]');
      if (maxBtn) {
        maxBtn.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>';
      }
      emit(this.#el, 'window:restored', { id: this.#el.id });
    }
    return this;
  }

  maximize(): this {
    if (this.#isMaximized) return this;
    if (this.#isMinimized) this.restore();

    this.#savedState = {
      x: this.#el.offsetLeft,
      y: this.#el.offsetTop,
      width: this.#el.offsetWidth,
      height: this.#el.offsetHeight
    };

    this.#el.style.left = '0';
    this.#el.style.top = '0';
    this.#el.style.width = '100vw';
    this.#el.style.height = '100vh';
    this.#el.style.borderRadius = '0';
    this.#isMaximized = true;

    // Update maximize button icon to restore icon
    const maxBtn = this.#el.querySelector('[data-window-maximize]');
    if (maxBtn) {
      maxBtn.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>';
    }

    this.#bringToFront();
    emit(this.#el, 'window:maximized', { id: this.#el.id });
    return this;
  }

  close(): this {
    this.#el.style.transform = 'scale(0.9)';
    this.#el.style.opacity = '0';
    
    setTimeout(() => {
      emit(this.#el, 'window:closed', { id: this.#el.id, title: this.#title });
      emit(document.body, 'window:closed', { id: this.#el.id, title: this.#title });
      this.destroy();
    }, 150);
    
    return this;
  }

  focus(): this {
    if (this.#isMinimized) this.restore();
    this.#bringToFront();
    return this;
  }

  setTitle(title: string): this {
    this.#title = title;
    const titleEl = this.#el.querySelector('[data-window-title]');
    if (titleEl) titleEl.textContent = title;
    emit(document.body, 'window:titlechanged', { id: this.#el.id, title });
    return this;
  }

  getTitle(): string {
    return this.#title;
  }

  isMinimized(): boolean {
    return this.#isMinimized;
  }

  isMaximized(): boolean {
    return this.#isMaximized;
  }

  destroy(): void {
    document.removeEventListener('mousemove', this.#boundHandleMouseMove);
    document.removeEventListener('mouseup', this.#boundHandleMouseUp);
    document.removeEventListener('touchmove', this.#boundHandleTouchMove);
    document.removeEventListener('touchend', this.#boundHandleTouchEnd);
    
    windowInstances.delete(this);
    this.#el.remove();
    instances.delete(this.#el);
  }
}

// Static method to get all windows
export function getAllWindows(): Window[] {
  return Array.from(windowInstances);
}
