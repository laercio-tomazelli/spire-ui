import type { WindowTaskbarInstance } from '../types';
import { instances } from '../core';
import { Window, getAllWindows } from './Window';

interface TaskbarItem {
  id: string;
  title: string;
  icon: string;
  instance: Window;
  minimized: boolean;
  appId?: string;
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

export interface RegisteredApp {
  id: string;
  title: string;
  icon: string;
  url?: string;
  content?: string | (() => string);
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  singleton?: boolean; // If true, only one instance allowed
  onLoad?: (windowEl: HTMLElement, contentEl: HTMLElement) => void;
}

export interface OpenWindowOptions {
  title?: string;
  url?: string;
  content?: string;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
  icon?: string;
  singleton?: boolean;
  onLoad?: (windowEl: HTMLElement, contentEl: HTMLElement) => void;
}

export interface WindowTaskbarOptions {
  onReady?: (taskbar: WindowTaskbar) => void;
}

export class WindowTaskbar implements WindowTaskbarInstance {
  #el: HTMLElement;
  #items: Map<string, TaskbarItem> = new Map();
  #closedWindows: Map<string, ClosedWindowConfig> = new Map();
  #container: HTMLElement | null = null;
  #registeredApps: Map<string, RegisteredApp> = new Map();
  #menuContainer: HTMLElement | null = null;
  #contextMenu: HTMLElement | null = null;
  #appLaunchers: AppLauncher[] = [];
  #searchQuery = '';
  #instanceCounter = 0;
  #arrangeMode: 'none' | 'cascade' | 'tile' = 'none';
  #options: WindowTaskbarOptions;

  constructor(el: HTMLElement, options?: WindowTaskbarOptions) {
    this.#el = el;
    this.#options = options || {};
    this.#initDefaultApps();
    this.#createTaskbar();
    this.#setupDesktopContextMenu();
    this.#setupListeners();
    this.#discoverExistingWindows();
    instances.set(el, this);
    
    // Emit ready event on element
    el.dispatchEvent(new CustomEvent('taskbar:ready', { 
      detail: { taskbar: this },
      bubbles: true 
    }));
    
    // Call onReady callback if provided
    if (this.#options.onReady) {
      this.#options.onReady(this);
    }
  }

  // ========== PUBLIC API ==========

  /**
   * Register an application module that can be opened as a window
   */
  registerApp(app: RegisteredApp): this {
    this.#registeredApps.set(app.id, app);
    
    // Add to app launchers
    this.#appLaunchers.push({
      id: app.id,
      title: app.title,
      icon: app.icon,
      action: () => this.openApp(app.id)
    });
    
    return this;
  }

  /**
   * Open a registered application
   */
  openApp(appId: string, options?: Partial<OpenWindowOptions>): Window | null {
    const app = this.#registeredApps.get(appId);
    if (!app) {
      console.warn(`App "${appId}" not registered`);
      return null;
    }

    // Check singleton
    if (app.singleton) {
      const existing = Array.from(this.#items.values()).find(item => item.appId === appId);
      if (existing) {
        existing.instance.restore().focus();
        return existing.instance;
      }
    }

    return this.openWindow({
      title: options?.title || app.title,
      icon: app.icon,
      url: options?.url || app.url,
      content: options?.content || (typeof app.content === 'function' ? app.content() : app.content),
      width: options?.width || app.width,
      height: options?.height || app.height,
      x: options?.x,
      y: options?.y,
      singleton: app.singleton,
      onLoad: app.onLoad,
    }, appId);
  }

  /**
   * Open a new window with custom content or URL
   */
  openWindow(options: OpenWindowOptions, appId?: string): Window {
    const container = this.#el.closest('.relative') || document.body;
    this.#instanceCounter++;
    
    const windowId = `window-${appId || 'custom'}-${this.#instanceCounter}`;
    const offset = (this.#instanceCounter % 10) * 30;
    
    const newWindow = document.createElement('div');
    newWindow.setAttribute('data-v', 'window');
    newWindow.id = windowId;
    newWindow.dataset.title = options.title || 'Nova Janela';
    newWindow.dataset.icon = options.icon || '📄';
    newWindow.dataset.width = options.width || '600px';
    newWindow.dataset.height = options.height || '450px';
    newWindow.style.left = `${options.x ?? (50 + offset)}px`;
    newWindow.style.top = `${options.y ?? (50 + offset)}px`;
    
    // Create content container with loading skeleton for iframes
    let contentHtml: string;
    if (options.url) {
      const loadingId = `loading-${windowId}`;
      contentHtml = `
        <div id="${loadingId}" class="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10">
          <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500"></div>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Carregando...</p>
        </div>
        <iframe 
          src="${options.url}" 
          class="w-full h-full border-0 opacity-0 transition-opacity duration-300" 
          frameborder="0"
          onload="
            this.classList.remove('opacity-0');
            this.classList.add('opacity-100');
            var loading = document.getElementById('${loadingId}');
            if (loading) loading.remove();
          "
        ></iframe>`;
    } else if (options.content) {
      contentHtml = `<div class="w-full h-full overflow-auto">${options.content}</div>`;
    } else {
      contentHtml = `<div class="flex items-center justify-center h-full text-gray-400"><span class="text-4xl">${options.icon || '📄'}</span></div>`;
    }
    
    newWindow.innerHTML = contentHtml;
    container.appendChild(newWindow);
    
    const windowInstance = new Window(newWindow);
    
    // Store appId reference
    if (appId) {
      const item = this.#items.get(windowId);
      if (item) {
        item.appId = appId;
      }
    }
    
    // Call onLoad callback
    if (options.onLoad) {
      const contentEl = newWindow.querySelector('[data-window-content]') as HTMLElement;
      setTimeout(() => options.onLoad?.(newWindow, contentEl), 100);
    }
    
    return windowInstance;
  }

  /**
   * Get all registered apps
   */
  getRegisteredApps(): RegisteredApp[] {
    return Array.from(this.#registeredApps.values());
  }

  /**
   * Get all open windows
   */
  getOpenWindows(): { id: string; title: string; instance: Window; appId?: string }[] {
    return Array.from(this.#items.values()).map(item => ({
      id: item.id,
      title: item.title,
      instance: item.instance,
      appId: item.appId
    }));
  }

  // ========== PRIVATE METHODS ==========

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
    const menuContainer = this.#el.closest('.relative') || document.body;
    
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
    `;

    // Create menu overlay outside taskbar for proper z-index
    const appMenu = document.createElement('div');
    appMenu.setAttribute('data-taskbar-app-menu', '');
    appMenu.className = `hidden ${positionClass} inset-0 bottom-12 bg-black/80 backdrop-blur-md z-[99999] flex flex-col`;
    appMenu.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden">
        <div class="w-full max-w-2xl">
          <div class="relative mb-8">
            <input 
              data-app-search 
              type="text" 
              placeholder="Pesquisar aplicativos..." 
              class="w-full px-6 py-4 pl-14 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
            />
            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div data-app-grid class="grid grid-cols-6 gap-4 max-h-[60vh] overflow-y-auto p-2"></div>
        </div>
      </div>
      <div data-running-section class="border-t border-white/10 p-4 bg-black/40 backdrop-blur-sm"></div>
    `;
    menuContainer.appendChild(appMenu);
    
    // Store reference to menu container for queries
    this.#menuContainer = menuContainer as HTMLElement;

    this.#container = this.#el.querySelector('[data-taskbar-items]');
    this.#updateClock();
    setInterval(() => this.#updateClock(), 1000);
    
    const menuBtn = this.#el.querySelector('[data-taskbar-menu]');
    
    menuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      appMenu.classList.toggle('hidden');
      this.#renderAppMenu();
    });
    
    document.addEventListener('click', () => {
      appMenu.classList.add('hidden');
      this.#searchQuery = '';
    });
    
    // Setup search
    const searchInput = appMenu.querySelector('[data-app-search]') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.#searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
      this.#renderAppGrid();
    });
    
    searchInput?.addEventListener('click', (e) => e.stopPropagation());
    appMenu.addEventListener('click', (e) => e.stopPropagation());
  }
  
  #renderAppMenu(): void {
    this.#renderAppGrid();
    this.#renderRunningSection();
    
    // Focus search input
    const searchInput = this.#menuContainer?.querySelector('[data-app-search]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = this.#searchQuery;
      setTimeout(() => searchInput.focus(), 50);
    }
  }
  
  #renderAppGrid(): void {
    const grid = this.#menuContainer?.querySelector('[data-app-grid]');
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
          class="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all group relative"
        >
          <span class="text-5xl group-hover:scale-110 transition-transform drop-shadow-lg">${app.icon}</span>
          <span class="text-sm text-white/90 font-medium truncate w-full text-center">${app.title}</span>
          ${isRunning ? '<span class="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></span>' : ''}
        </button>
      `;
    });
    
    // Add closed windows
    closedApps.forEach(app => {
      html += `
        <button 
          data-app-closed="${app.id}" 
          class="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all group opacity-50 hover:opacity-100"
        >
          <span class="text-5xl group-hover:scale-110 transition-transform">${app.icon}</span>
          <span class="text-sm text-white/70 font-medium truncate w-full text-center">${app.title}</span>
        </button>
      `;
    });
    
    if (filteredApps.length === 0 && closedApps.length === 0) {
      html = '<div class="col-span-6 text-center text-white/50 py-12 text-lg">Nenhum aplicativo encontrado</div>';
    }
    
    grid.innerHTML = html;
    
    // Attach listeners with single/double click handling
    grid.querySelectorAll('[data-app-launcher]').forEach(btn => {
      let clickTimer: ReturnType<typeof setTimeout> | null = null;
      
      btn.addEventListener('click', () => {
        if (clickTimer) {
          // Double click - open and close menu
          clearTimeout(clickTimer);
          clickTimer = null;
          const id = (btn as HTMLElement).dataset.appLauncher || '';
          const app = this.#appLaunchers.find(a => a.id === id);
          if (app) {
            app.action();
            this.#menuContainer?.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
          }
        } else {
          // Single click - open and keep menu open
          clickTimer = setTimeout(() => {
            clickTimer = null;
            const id = (btn as HTMLElement).dataset.appLauncher || '';
            const app = this.#appLaunchers.find(a => a.id === id);
            if (app) {
              app.action();
              setTimeout(() => this.#renderAppMenu(), 50);
            }
          }, 250);
        }
      });
    });
    
    grid.querySelectorAll('[data-app-closed]').forEach(btn => {
      let clickTimer: ReturnType<typeof setTimeout> | null = null;
      
      btn.addEventListener('click', () => {
        if (clickTimer) {
          // Double click - open and close menu
          clearTimeout(clickTimer);
          clickTimer = null;
          const id = (btn as HTMLElement).dataset.appClosed || '';
          this.#reopenWindow(id);
          this.#menuContainer?.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
        } else {
          // Single click - open and keep menu open
          clickTimer = setTimeout(() => {
            clickTimer = null;
            const id = (btn as HTMLElement).dataset.appClosed || '';
            this.#reopenWindow(id);
            setTimeout(() => this.#renderAppMenu(), 50);
          }, 250);
        }
      });
    });
  }
  
  #renderRunningSection(): void {
    const section = this.#menuContainer?.querySelector('[data-running-section]');
    if (!section) return;
    
    const openWindows = Array.from(this.#items.values());
    
    if (openWindows.length === 0) {
      section.classList.add('hidden');
      return;
    }
    
    section.classList.remove('hidden');
    
    let html = '<div class="max-w-2xl mx-auto">';
    html += '<div class="text-xs font-medium text-white/50 mb-3 uppercase tracking-wider">Em execução</div>';
    html += '<div class="flex gap-3 justify-center flex-wrap">';
    
    openWindows.forEach(item => {
      const statusColor = item.minimized ? 'bg-yellow-400' : 'bg-green-400';
      const shadowColor = item.minimized ? 'shadow-yellow-400/50' : 'shadow-green-400/50';
      html += `
        <button 
          data-running-item="${item.id}" 
          class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all relative group"
          title="${item.title}"
        >
          <span class="text-3xl group-hover:scale-110 transition-transform">${item.icon}</span>
          <span class="text-xs text-white/70">${item.title}</span>
          <span class="absolute -top-1 -right-1 w-3 h-3 ${statusColor} rounded-full shadow-lg ${shadowColor}"></span>
        </button>
      `;
    });
    
    html += '</div></div>';
    section.innerHTML = html;
    
    // Attach listeners
    section.querySelectorAll('[data-running-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.runningItem || '';
        const item = this.#items.get(id);
        if (item) {
          item.instance.restore().focus();
          this.#menuContainer?.querySelector('[data-taskbar-app-menu]')?.classList.add('hidden');
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
      // Re-arrange if in tile mode
      if (this.#arrangeMode === 'tile') {
        setTimeout(() => this.#arrangeWindowsTile(), 50);
      }
    }) as EventListener);

    document.body.addEventListener('window:minimized', ((e: CustomEvent) => {
      const item = this.#items.get(e.detail.id);
      if (item) {
        item.minimized = true;
        this.#render();
        // Re-arrange if in tile mode
        if (this.#arrangeMode === 'tile') {
          setTimeout(() => this.#arrangeWindowsTile(), 50);
        }
      }
    }) as EventListener);

    document.body.addEventListener('window:restored', ((e: CustomEvent) => {
      const item = this.#items.get(e.detail.id);
      if (item) {
        item.minimized = false;
        this.#render();
        // Re-arrange if in tile mode
        if (this.#arrangeMode === 'tile') {
          setTimeout(() => this.#arrangeWindowsTile(), 50);
        }
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
      // Re-arrange if in tile mode
      if (this.#arrangeMode === 'tile') {
        setTimeout(() => this.#arrangeWindowsTile(), 50);
      }
    }) as EventListener);

    document.body.addEventListener('window:focused', ((e: CustomEvent) => {
      // Re-arrange cascade when window is focused
      if (this.#arrangeMode === 'cascade') {
        const focusedId = e.detail.id;
        this.#arrangeWindowsCascadeWithFocus(focusedId);
      }
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
    this.#contextMenu?.remove();
    instances.delete(this.#el);
  }

  #setupDesktopContextMenu(): void {
    const container = this.#el.closest('.relative') || document.body;
    
    // Create context menu
    this.#contextMenu = document.createElement('div');
    this.#contextMenu.className = 'hidden absolute bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-48 z-[99999]';
    this.#contextMenu.innerHTML = `
      <button data-action="minimize-all" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
        <span class="text-base">⬇️</span> Minimizar todas
      </button>
      <button data-action="restore-all" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
        <span class="text-base">⬆️</span> Restaurar todas
      </button>
      <div class="border-t border-gray-200 dark:border-gray-600 my-1"></div>
      <button data-action="cascade" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
        <span class="text-base">📑</span> Organizar em cascata
      </button>
      <button data-action="tile" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
        <span class="text-base">⊞</span> Organizar lado a lado
      </button>
      <div class="border-t border-gray-200 dark:border-gray-600 my-1"></div>
      <button data-action="close-all" class="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3">
        <span class="text-base">✕</span> Fechar todas
      </button>
    `;
    container.appendChild(this.#contextMenu);
    
    // Listen for right-click on desktop (container)
    container.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;
      // Only show if clicking on desktop background, not on windows or taskbar
      if (target === container || target.closest('[data-v="window-taskbar"]')) {
        if (!target.closest('[data-v="window"]') && !target.closest('[data-taskbar-app-menu]')) {
          e.preventDefault();
          this.#showContextMenu(e as MouseEvent);
        }
      }
    });
    
    // Hide on click outside
    document.addEventListener('click', () => {
      this.#contextMenu?.classList.add('hidden');
    });
    
    // Handle actions
    this.#contextMenu.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = (btn as HTMLElement).dataset.action;
        this.#handleDesktopAction(action || '');
        this.#contextMenu?.classList.add('hidden');
      });
    });
  }
  
  #showContextMenu(e: MouseEvent): void {
    if (!this.#contextMenu) return;
    
    const container = this.#el.closest('.relative') as HTMLElement || document.body;
    const rect = container.getBoundingClientRect();
    
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    // Ensure menu stays within bounds
    this.#contextMenu.classList.remove('hidden');
    const menuRect = this.#contextMenu.getBoundingClientRect();
    
    if (x + menuRect.width > rect.width) {
      x = rect.width - menuRect.width - 8;
    }
    if (y + menuRect.height > rect.height - 48) { // 48 = taskbar height
      y = rect.height - menuRect.height - 56;
    }
    
    this.#contextMenu.style.left = `${x}px`;
    this.#contextMenu.style.top = `${y}px`;
  }
  
  #handleDesktopAction(action: string): void {
    const windows = Array.from(this.#items.values());
    
    switch (action) {
      case 'minimize-all':
        windows.forEach(w => w.instance.minimize());
        break;
        
      case 'restore-all':
        windows.forEach(w => w.instance.restore());
        break;
        
      case 'close-all':
        windows.forEach(w => w.instance.close());
        break;
        
      case 'cascade':
        this.#arrangeMode = 'cascade';
        this.#arrangeWindowsCascade();
        break;
        
      case 'tile':
        this.#arrangeMode = 'tile';
        this.#arrangeWindowsTile();
        break;
    }
  }
  
  #arrangeWindowsCascade(): void {
    const windows = Array.from(this.#items.values()).filter(w => !w.minimized);
    const container = this.#el.closest('.relative') as HTMLElement || document.body;
    const rect = container.getBoundingClientRect();
    
    const startX = 30;
    const startY = 30;
    const offsetX = 30;
    const offsetY = 30;
    const windowWidth = Math.min(450, rect.width - 100);
    const windowHeight = Math.min(350, rect.height - 150);
    
    windows.forEach((w, i) => {
      const el = w.instance.getElement();
      el.style.left = `${startX + i * offsetX}px`;
      el.style.top = `${startY + i * offsetY}px`;
      el.style.width = `${windowWidth}px`;
      el.style.height = `${windowHeight}px`;
      w.instance.restore();
    });
    
    // Focus last window
    if (windows.length > 0) {
      windows[windows.length - 1].instance.focus();
    }
  }
  
  #arrangeWindowsCascadeWithFocus(focusedId: string): void {
    const allWindows = Array.from(this.#items.values()).filter(w => !w.minimized);
    
    // Reorder: focused window goes to end (top of stack)
    const focusedIndex = allWindows.findIndex(w => w.id === focusedId);
    if (focusedIndex > -1) {
      const [focused] = allWindows.splice(focusedIndex, 1);
      allWindows.push(focused);
    }
    
    const container = this.#el.closest('.relative') as HTMLElement || document.body;
    const rect = container.getBoundingClientRect();
    
    const startX = 30;
    const startY = 30;
    const offsetX = 30;
    const offsetY = 30;
    const windowWidth = Math.min(450, rect.width - 100);
    const windowHeight = Math.min(350, rect.height - 150);
    
    allWindows.forEach((w, i) => {
      const el = w.instance.getElement();
      el.style.left = `${startX + i * offsetX}px`;
      el.style.top = `${startY + i * offsetY}px`;
      el.style.width = `${windowWidth}px`;
      el.style.height = `${windowHeight}px`;
    });
  }
  
  #arrangeWindowsTile(): void {
    const windows = Array.from(this.#items.values()).filter(w => !w.minimized);
    if (windows.length === 0) return;
    
    const container = this.#el.closest('.relative') as HTMLElement || document.body;
    const rect = container.getBoundingClientRect();
    const padding = 8;
    const taskbarHeight = 48;
    const availableHeight = rect.height - taskbarHeight - padding * 2;
    const availableWidth = rect.width - padding * 2;
    
    // Calculate grid
    const count = windows.length;
    let cols = Math.ceil(Math.sqrt(count));
    let rows = Math.ceil(count / cols);
    
    // Adjust for better aspect ratio
    if (count === 2) { cols = 2; rows = 1; }
    if (count === 3) { cols = 3; rows = 1; }
    
    const tileWidth = Math.floor(availableWidth / cols) - padding;
    const tileHeight = Math.floor(availableHeight / rows) - padding;
    
    windows.forEach((w, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const el = w.instance.getElement();
      
      el.style.left = `${padding + col * (tileWidth + padding)}px`;
      el.style.top = `${padding + row * (tileHeight + padding)}px`;
      el.style.width = `${tileWidth}px`;
      el.style.height = `${tileHeight}px`;
      w.instance.restore();
    });
  }
}
