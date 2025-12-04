import type { WindowTaskbarInstance } from '../types';
import { instances, emit } from '../core';
import type { Window } from './Window';

interface TaskbarItem {
  id: string;
  title: string;
  instance: Window;
  minimized: boolean;
}

export class WindowTaskbar implements WindowTaskbarInstance {
  #el: HTMLElement;
  #items: Map<string, TaskbarItem> = new Map();
  #container: HTMLElement | null = null;

  constructor(el: HTMLElement) {
    this.#el = el;
    this.#createTaskbar();
    this.#setupListeners();
    instances.set(el, this);
  }

  #createTaskbar(): void {
    this.#el.className = `fixed bottom-0 left-0 right-0 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center px-2 gap-1 z-[9999] ${this.#el.className}`;
    
    this.#el.innerHTML = `
      <div data-taskbar-items class="flex items-center gap-1 flex-1 overflow-x-auto"></div>
      <div class="flex items-center gap-2 px-2 text-xs text-gray-500 dark:text-gray-400">
        <span data-taskbar-clock></span>
      </div>
    `;

    this.#container = this.#el.querySelector('[data-taskbar-items]');
    this.#updateClock();
    setInterval(() => this.#updateClock(), 1000);
  }

  #updateClock(): void {
    const clock = this.#el.querySelector('[data-taskbar-clock]');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  }

  #setupListeners(): void {
    // Listen for window events
    document.body.addEventListener('window:created', ((e: CustomEvent) => {
      this.#addItem(e.detail);
    }) as EventListener);

    document.body.addEventListener('window:minimized', ((e: CustomEvent) => {
      const item = this.#items.get(e.detail.id);
      if (item) {
        item.minimized = true;
        this.#render();
      }
    }) as EventListener);

    document.body.addEventListener('window:restored', ((e: CustomEvent) => {
      const item = this.#items.get(e.detail.id);
      if (item) {
        item.minimized = false;
        this.#render();
      }
    }) as EventListener);

    document.body.addEventListener('window:closed', ((e: CustomEvent) => {
      this.#items.delete(e.detail.id);
      this.#render();
    }) as EventListener);

    document.body.addEventListener('window:titlechanged', ((e: CustomEvent) => {
      const item = this.#items.get(e.detail.id);
      if (item) {
        item.title = e.detail.title;
        this.#render();
      }
    }) as EventListener);
  }

  #addItem(detail: { id: string; title: string; instance: Window }): void {
    const id = detail.id || `window-${Date.now()}`;
    this.#items.set(id, {
      id,
      title: detail.title,
      instance: detail.instance,
      minimized: false
    });
    this.#render();
  }

  #render(): void {
    if (!this.#container) return;

    this.#container.innerHTML = Array.from(this.#items.values()).map(item => `
      <button 
        data-taskbar-item="${item.id}"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          item.minimized 
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' 
            : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
        } hover:bg-blue-200 dark:hover:bg-blue-800/50 max-w-[200px]"
      >
        <span class="truncate">${item.title}</span>
        ${item.minimized ? '<span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>' : ''}
      </button>
    `).join('');

    // Attach click listeners
    this.#container.querySelectorAll('[data-taskbar-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.taskbarItem || '';
        const item = this.#items.get(id);
        if (item) {
          if (item.minimized) {
            item.instance.restore();
          } else {
            item.instance.focus();
          }
        }
      });
    });
  }

  destroy(): void {
    instances.delete(this.#el);
  }
}
