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

interface AppLauncher {
  id: string;
  title: string;
  icon: string;
  action: () => void;
}

export class WindowTaskbar implements WindowTaskbarInstance {
  #el: HTMLElement;
  #items: Map<string, TaskbarItem> = new Map();
  #closedWindows: Map<string, ClosedWindowConfig> = new Map();
  #container: HTMLElement | null = null;
  #appLaunchers: AppLauncher[] = [];
  #searchQuery = '';

  constructor(el: HTMLElement) {
    this.#el = el;
    this.#initDefaultApps();
    this.#createTaskbar();
    this.#setupListeners();
    this.#discoverExistingWindows();
    instances.set(el, this);
  }

  #initDefaultApps(): void {
    const apps: Array<[string, string, string]> = [
      ['editor', 'Editor', '📝'],
      ['files', 'Arquivos', '📁'],
      ['calc', 'Calculadora', '🔢'],
      ['terminal', 'Terminal', '💻'],
      ['settings', 'Config', '⚙️'],
      ['browser', 'Navegador', '🌐'],
      ['mail', 'E-mail', '📧'],
      ['calendar', 'Calendário', '📅'],
      ['music', 'Música', '🎵'],
      ['photos', 'Fotos', '🖼️'],
      ['notes', 'Notas', '📋'],
      ['contacts', 'Contatos', '👥'],
    ];
    this.#appLaunchers = apps.map(([id, title, icon]) => ({
      id, title, icon,
      action: () => this.#launchApp(id, title, icon)
    }));
  }

  #launchApp(id: string, title: string, icon: string): void {
    const container = this.#el.closest('.relative') || document.body;
    
    // Check if already open
    const existing = this.#items.get(id);
    if (existing) {
      existing.instance.restore().focus();
      return;
    }
    
    const offset = this.#items.size * 30;
    const newWindow = document.createElement('div');
    newWindow.setAttribute('data-v', 'window');
    newWindow.id = id;
    newWindow.dataset.title = title;
    newWindow.dataset.icon = icon;
    newWindow.dataset.width = '450px';
    newWindow.dataset.height = '350px';
    newWindow.style.left = `${50 + offset}px`;
    newWindow.style.top = `${50 + offset}px`;
    newWindow.innerHTML = `<div class="flex items-center justify-center h-full text-gray-400"><span class="text-4xl">${icon}</span></div>`;
    
    container.appendChild(newWindow);
    new Window(newWindow);
  }
  #createTaskbar(): void {
    const isInsideRelative = this.#el.closest('.relative') !== null;
    const positionClass = isInsideRelative ? 'absolute' : 'fixed';
    
    this.#el.className = `${positionClass} bottom-0 left-0 right-0 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center px-2 gap-1 z-[9999] ${this.#el.className}`;
    
    this.#el.innerHTML = `
      <button data-taskbar-menu class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors" title="Aplicativos">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="5" r="2.5"/>
          <circle cx="12" cy="5" r="2.5"/>
          <circle cx="19" cy="5" r="2.5"/>
          <circle cx="5" cy="12" r="2.5"/>
          <circle cx="12" cy="12" r="2.5"/>
          <circle cx="19" cy="12" r="2.5"/>
          <circle cx="5" cy="19" r="2.5"/>
          <circle cx="12" cy="19" r="2.5"/>
          <circle cx="19" cy="19" r="2.5"/>
        </svg>
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
      <div data-taskbar-items class="flex items-center gap-1 flex-1 overflow-x-auto"></div>
      <div class="flex items-center gap-2 px-2 text-xs text-gray-500 dark:text-gray-400">
        <span data-taskbar-clock></span>
      </div>
      <div data-taskbar-app-menu class="hidden absolute bottom-14 left-0 right-0 mx-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-[10000]" style="max-height: calc(100% - 80px);">
        <div class="p-4">
          <div class="relative mb-4">
            <input 
              data-app-search 
              type="text" 
              placeholder="Pesquisar aplicativos..." 
              class="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div data-app-grid class="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-1"></div>
        </div>
        <div data-running-section class="border-t border-gray-700 p-3 bg-gray-800/50"></div>
      </div>
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
      this.#searchQuery = '';
    });
    
    // Setup search
    const searchInput = appMenu?.querySelector('[data-app-search]') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.#searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
      this.#renderAppGrid();
    });
    
    searchInput?.addEventListener('click', (e) => e.stopPropagation());
    appMenu?.addEventListener('click', (e) => e.stopPropagation());
  }
  
  #renderAppMenu(): void {
    this.#renderAppGrid();
    this.#renderRunningSection();
    
    // Focus search input
    const searchInput = this.#el.querySelector('[data-app-search]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = this.#searchQuery;
      setTimeout(() => searchInput.focus(), 50);
    }
  }
  
  #renderAppGrid(): void {
    const grid = this.#el.querySelector('[data-app-grid]');
    if (!grid) return;
    
    // Filter apps by search
    const filteredApps = this.#appLaunchers.filter(app => 
      app.title.toLowerCase().includes(this.#searchQuery)
    );
    
    // Add closed windows as reopenable apps
    const closedApps = Array.from(this.#closedWindows.values()).filter(app =>
      app.title.toLowerCase().includes(this.#searchQuery)
    );
    
    let html = '';
    
    filteredApps.forEach(app => {
      const isRunning = this.#items.has(app.id);
      html += `
        <button 
          data-app-launcher="${app.id}" 
          class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors group relative"
        >
          <span class="text-4xl group-hover:scale-110 transition-transform">${app.icon}</span>
          <span class="text-xs text-gray-300 truncate w-full text-center">${app.title}</span>
          ${isRunning ? '<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>' : ''}
        </button>
      `;
    });
    
    // Add closed windows
    closedApps.forEach(app => {
      html += `
        <button 
          data-app-closed="${app.id}" 
          class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors group opacity-60 hover:opacity-100"
        >
          <span class="text-4xl group-hover:scale-110 transition-transform">${app.icon}</span>
          <span class="text-xs text-gray-400 truncate w-full text-center">${app.title}</span>
        </button>
      `;
    });
    
    if (filteredApps.length === 0 && closedApps.length === 0) {
      html = '<div class="col-span-4 text-center text-gray-500 py-8">Nenhum aplicativo encontrado</div>';
    }
    
    grid.innerHTML = html;
    
    // Attach listeners
    grid.querySelectorAll('[data-app-launcher]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.appLauncher || '';
        const app = this.#appLaunchers.find(a => a.id === id);
        if (app) {
          app.action();
          this.#el.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
        }
      });
    });
    
    grid.querySelectorAll('[data-app-closed]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.appClosed || '';
        this.#reopenWindow(id);
        this.#el.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
      });
    });
  }
  
  #renderRunningSection(): void {
    const section = this.#el.querySelector('[data-running-section]');
    if (!section) return;
    
    const openWindows = Array.from(this.#items.values());
    
    if (openWindows.length === 0) {
      section.classList.add('hidden');
      return;
    }
    
    section.classList.remove('hidden');
    
    let html = '<div class="text-xs font-medium text-gray-500 mb-2">Em execução</div>';
    html += '<div class="flex gap-2 overflow-x-auto">';
    
    openWindows.forEach(item => {
      const statusColor = item.minimized ? 'ring-yellow-400' : 'ring-green-400';
      html += `
        <button 
          data-running-item="${item.id}" 
          class="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors ring-2 ${statusColor} ring-offset-2 ring-offset-gray-800"
          title="${item.title}"
        >
          <span class="text-2xl">${item.icon}</span>
        </button>
      `;
    });
    
    html += '</div>';
    section.innerHTML = html;
    
    // Attach listeners
    section.querySelectorAll('[data-running-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.runningItem || '';
        const item = this.#items.get(id);
        if (item) {
          item.instance.restore().focus();
          this.#el.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
        }
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
