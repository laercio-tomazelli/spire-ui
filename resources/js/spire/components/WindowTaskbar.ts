import type { WindowTaskbarInstance } from '../types';
import { instances } from '../core';
import { Window, getAllWindows } from './Window';

interface TaskbarItem {
  id: string;
  title: string;
  icon: string;
  instance: Window;
  minimized: boolean;
}

interface ClosedWindowConfig {
  id: string;
  title: string;
  icon: string;
}

export class WindowTaskbar implements WindowTaskbarInstance {
  #el: HTMLElement;
  #items: Map<string, TaskbarItem> = new Map();
  #closedWindows: Map<string, ClosedWindowConfig> = new Map();
  #container: HTMLElement | null = null;

  constructor(el: HTMLElement) {
    this.#el = el;
    this.#createTaskbar();
    this.#setupListeners();
    this.#discoverExistingWindows();
    instances.set(el, this);
  }

  #createTaskbar(): void {
    const isInsideRelative = this.#el.closest('.relative') !== null;
    const positionClass = isInsideRelative ? 'absolute' : 'fixed';
    
    this.#el.className = `${positionClass} bottom-0 left-0 right-0 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center px-2 gap-1 z-[9999] ${this.#el.className}`;
    
    this.#el.innerHTML = `
      <button data-taskbar-menu class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors" title="Aplicativos">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
      <div data-taskbar-items class="flex items-center gap-1 flex-1 overflow-x-auto"></div>
      <div class="flex items-center gap-2 px-2 text-xs text-gray-500 dark:text-gray-400">
        <span data-taskbar-clock></span>
      </div>
      <div data-taskbar-app-menu class="hidden absolute bottom-14 left-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] z-[10000]"></div>
    `;

    this.#container = this.#el.querySelector('[data-taskbar-items]');
    this.#updateClock();
    setInterval(() => this.#updateClock(), 1000);
    
    const menuBtn = this.#el.querySelector('[data-taskbar-menu]');
    const appMenu = this.#el.querySelector('[data-taskbar-app-menu]');
    
    menuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      appMenu?.classList.toggle('hidden');
      this.#renderAppMenu();
    });
    
    document.addEventListener('click', () => {
      appMenu?.classList.add('hidden');
    });
  }
  
  #renderAppMenu(): void {
    const appMenu = this.#el.querySelector('[data-taskbar-app-menu]');
    if (!appMenu) return;
    
    const openWindows = Array.from(this.#items.values());
    const closedWindows = Array.from(this.#closedWindows.values());
    
    let html = '';
    
    if (openWindows.length > 0) {
      html += '<div class="text-xs font-medium text-gray-400 dark:text-gray-500 px-2 py-1 uppercase">Abertas</div>';
      openWindows.forEach(item => {
        const statusColor = item.minimized ? 'bg-yellow-400' : 'bg-green-500';
        html += `
          <button 
            data-app-menu-item="${item.id}" 
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300"
          >
            <span>${item.icon}</span>
            <span class="flex-1 truncate">${item.title}</span>
            <span class="w-2 h-2 rounded-full ${statusColor}"></span>
          </button>
        `;
      });
    }
    
    if (closedWindows.length > 0) {
      html += '<div class="text-xs font-medium text-gray-400 dark:text-gray-500 px-2 py-1 uppercase mt-2">Fechadas</div>';
      closedWindows.forEach(item => {
        html += `
          <button 
            data-app-menu-closed="${item.id}" 
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-gray-500 dark:text-gray-400"
          >
            <span>${item.icon}</span>
            <span class="flex-1 truncate">${item.title}</span>
            <span class="text-xs">Reabrir</span>
          </button>
        `;
      });
    }
    
    if (openWindows.length === 0 && closedWindows.length === 0) {
      html = '<div class="px-3 py-2 text-sm text-gray-400">Nenhuma janela</div>';
    }
    
    appMenu.innerHTML = html;
    
    // Attach listeners for open windows
    appMenu.querySelectorAll('[data-app-menu-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.appMenuItem || '';
        const item = this.#items.get(id);
        if (item) {
          item.instance.restore().focus();
        }
        appMenu.classList.add('hidden');
      });
    });
    
    // Attach listeners for closed windows (reopen)
    appMenu.querySelectorAll('[data-app-menu-closed]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.appMenuClosed || '';
        this.#reopenWindow(id);
        appMenu.classList.add('hidden');
      });
    });
  }
  
  #reopenWindow(id: string): void {
    const config = this.#closedWindows.get(id);
    if (!config) return;
    
    const container = this.#el.closest('.relative') || document.body;
    
    const newWindow = document.createElement('div');
    newWindow.setAttribute('data-v', 'window');
    newWindow.id = config.id;
    newWindow.dataset.title = config.title;
    newWindow.dataset.icon = config.icon;
    newWindow.dataset.width = '400px';
    newWindow.dataset.height = '300px';
    newWindow.innerHTML = '<p class="text-gray-500">Janela restaurada</p>';
    
    container.appendChild(newWindow);
    
    // Initialize the window
    new Window(newWindow);
    
    this.#closedWindows.delete(id);
  }

  #discoverExistingWindows(): void {
    const existingWindows = getAllWindows();
    existingWindows.forEach(win => {
      const id = win.getId() || `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const title = win.getTitle();
      const el = win.getElement();
      const icon = el.dataset.icon || '📋';
      this.#items.set(id, {
        id,
        title,
        icon,
        instance: win,
        minimized: win.isMinimized()
      });
    });
    this.#render();
  }

  #updateClock(): void {
    const clock = this.#el.querySelector('[data-taskbar-clock]');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  }

  #setupListeners(): void {
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
      const item = this.#items.get(e.detail.id);
      if (item) {
        // Save config for reopening
        this.#closedWindows.set(e.detail.id, {
          id: e.detail.id,
          title: item.title,
          icon: item.icon
        });
      }
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

  #addItem(detail: { id: string; title: string; icon?: string; instance: Window }): void {
    const id = detail.id || `window-${Date.now()}`;
    this.#closedWindows.delete(id);
    this.#items.set(id, {
      id,
      title: detail.title,
      icon: detail.icon || detail.instance.getElement().dataset.icon || '📋',
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
        <span>${item.icon}</span>
        <span class="truncate">${item.title}</span>
        ${item.minimized ? '<span class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>' : ''}
      </button>
    `).join('');

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
