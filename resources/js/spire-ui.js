// VANILLA PRO 2025 — Versão Refatorada com correções de segurança, A11y e performance

const VanillaPro = (() => {
  // WeakMap para armazenar instâncias sem poluir o DOM
  const instances = new WeakMap();

  // =====================
  // COMPONENTE: Button
  // =====================
  class Button {
    #el;
    #originalText;
    #originalClasses;

    constructor(el) {
      this.#el = el;
      this.#originalText = el.textContent.trim();
      this.#originalClasses = el.className;
    }

    loading(state = true) {
      if (state) {
        this.#originalText = this.#el.textContent.trim();
      }
      this.#el.disabled = state;
      this.#el.setAttribute('aria-disabled', String(state));
      this.#el.setAttribute('aria-busy', String(state));
      this.#el.textContent = state ? 'Carregando...' : this.#originalText;
      return this;
    }

    success(msg = 'Salvo!', duration = 2000) {
      this.#el.textContent = msg;
      this.#el.classList.add('bg-green-600');
      setTimeout(() => {
        this.loading(false);
        this.#el.classList.remove('bg-green-600');
      }, duration);
      return this;
    }

    error(msg = 'Erro!', duration = 2000) {
      this.#el.textContent = msg;
      this.#el.classList.add('bg-red-600');
      setTimeout(() => {
        this.loading(false);
        this.#el.classList.remove('bg-red-600');
      }, duration);
      return this;
    }

    reset() {
      this.#el.disabled = false;
      this.#el.removeAttribute('aria-disabled');
      this.#el.removeAttribute('aria-busy');
      this.#el.textContent = this.#originalText;
      return this;
    }

    destroy() {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Input
  // =====================
  class Input {
    #el;
    #errorEl;

    constructor(el) {
      this.#el = el;
      this.#errorEl = el.closest('div')?.querySelector('.error-text');
      this.#setupValidation();
    }

    #setupValidation() {
      this.#el.addEventListener('input', () => {
        if (this.#el.classList.contains('border-red-500')) {
          this.error('');
        }
      });
    }

    value(v) {
      this.#el.value = v;
      this.#el.dispatchEvent(new Event('input', { bubbles: true }));
      return this;
    }

    error(msg = '') {
      const hasError = !!msg;
      this.#el.classList.toggle('border-red-500', hasError);
      this.#el.classList.toggle('border-gray-300', !hasError);
      this.#el.setAttribute('aria-invalid', String(hasError));
      
      if (this.#errorEl) {
        this.#errorEl.textContent = msg;
        this.#errorEl.classList.toggle('hidden', !hasError);
        this.#errorEl.setAttribute('role', 'alert');
        this.#errorEl.setAttribute('aria-live', 'polite');
      }
      return this;
    }

    focus() {
      this.#el.focus();
      return this;
    }

    clear() {
      return this.value('').error('');
    }

    disable(state = true) {
      this.#el.disabled = state;
      this.#el.setAttribute('aria-disabled', String(state));
      return this;
    }

    destroy() {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Modal
  // =====================
  class Modal {
    #el;
    #previousActiveElement;
    #boundHandleKeydown;
    #boundHandleClick;
    #focusableElements;

    constructor(el) {
      this.#el = el;
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y() {
      this.#el.setAttribute('role', 'dialog');
      this.#el.setAttribute('aria-modal', 'true');
      this.#el.setAttribute('tabindex', '-1');
      
      const titleEl = this.#el.querySelector('[data-title]');
      if (titleEl) {
        const titleId = titleEl.id || `modal-title-${Date.now()}`;
        titleEl.id = titleId;
        this.#el.setAttribute('aria-labelledby', titleId);
      }
    }

    #setupListeners() {
      // Listeners com bind para poder remover depois
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#boundHandleClick = this.#handleClick.bind(this);

      this.#el.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });
    }

    #handleKeydown(e) {
      if (e.key === 'Escape') {
        this.close();
        return;
      }
      
      // Trap focus dentro do modal
      if (e.key === 'Tab') {
        this.#trapFocus(e);
      }
    }

    #handleClick(e) {
      if (e.target === this.#el) {
        this.close();
      }
    }

    #trapFocus(e) {
      this.#focusableElements = this.#el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstEl = this.#focusableElements[0];
      const lastEl = this.#focusableElements[this.#focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    }

    #lockScroll() {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.dataset.scrollY = scrollY;
    }

    #unlockScroll() {
      const scrollY = document.body.dataset.scrollY || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.scrollY;
    }

    open() {
      this.#previousActiveElement = document.activeElement;
      this.#el.classList.remove('hidden');
      this.#lockScroll();
      
      // Adicionar listeners
      document.addEventListener('keydown', this.#boundHandleKeydown);
      this.#el.addEventListener('click', this.#boundHandleClick);
      
      // Focar no modal ou primeiro elemento focável
      requestAnimationFrame(() => {
        const firstFocusable = this.#el.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (firstFocusable || this.#el).focus();
      });
      
      return this;
    }

    close() {
      this.#el.classList.add('hidden');
      this.#unlockScroll();
      
      // Remover listeners
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      this.#el.removeEventListener('click', this.#boundHandleClick);
      
      // Restaurar foco
      this.#previousActiveElement?.focus();
      
      return this;
    }

    title(text) {
      const titleEl = this.#el.querySelector('[data-title]');
      if (titleEl) {
        if (typeof text === 'string') {
          titleEl.textContent = text;
        } else {
          titleEl.replaceChildren(text);
        }
      }
      return this;
    }

    body(content) {
      const bodyEl = this.#el.querySelector('[data-body]');
      if (bodyEl) {
        if (typeof content === 'string') {
          bodyEl.innerHTML = content;
        } else {
          bodyEl.replaceChildren(content);
        }
      }
      return this;
    }

    destroy() {
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      this.#el.removeEventListener('click', this.#boundHandleClick);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Dropdown
  // =====================
  class Dropdown {
    #el;
    #menu;
    #trigger;
    #boundHandleOutsideClick;
    #boundHandleKeydown;

    constructor(el) {
      this.#el = el;
      this.#menu = el.querySelector('[data-menu]');
      this.#trigger = el.querySelector('[data-trigger]');
      
      if (!this.#menu || !this.#trigger) return;
      
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y() {
      this.#trigger.setAttribute('aria-haspopup', 'true');
      this.#trigger.setAttribute('aria-expanded', 'false');
      this.#menu.setAttribute('role', 'menu');
    }

    #setupListeners() {
      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);

      this.#trigger.addEventListener('click', () => this.toggle());
      this.#trigger.addEventListener('keydown', this.#boundHandleKeydown);
    }

    #handleOutsideClick(e) {
      if (!this.#el.contains(e.target)) {
        this.close();
      }
    }

    #handleKeydown(e) {
      if (e.key === 'Escape') {
        this.close();
        this.#trigger.focus();
      }
    }

    open() {
      this.#menu.classList.remove('hidden');
      this.#trigger.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', this.#boundHandleOutsideClick);
      document.addEventListener('keydown', this.#boundHandleKeydown);
      return this;
    }

    close() {
      this.#menu.classList.add('hidden');
      this.#trigger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      return this;
    }

    toggle() {
      const isOpen = !this.#menu.classList.contains('hidden');
      return isOpen ? this.close() : this.open();
    }

    destroy() {
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Table
  // =====================
  class Table {
    #el;
    #tbody;

    constructor(el) {
      this.#el = el;
      this.#tbody = el.querySelector('tbody');
    }

    loading(state = true) {
      if (state && this.#tbody) {
        this.#tbody.innerHTML = `
          <tr>
            <td colspan="99" class="py-12 text-center text-gray-500">
              <span class="inline-flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
              </span>
            </td>
          </tr>
        `;
        this.#el.setAttribute('aria-busy', 'true');
      } else {
        this.#el.removeAttribute('aria-busy');
      }
      return this;
    }

    html(rows) {
      if (this.#tbody) {
        this.#tbody.innerHTML = rows;
        this.#el.removeAttribute('aria-busy');
      }
      return this;
    }

    empty(message = 'Nenhum registro encontrado') {
      if (this.#tbody) {
        this.#tbody.innerHTML = `
          <tr>
            <td colspan="99" class="py-12 text-center text-gray-500">${message}</td>
          </tr>
        `;
      }
      return this;
    }

    destroy() {
      instances.delete(this.#el);
    }
  }

  // =====================
  // TOAST SYSTEM (usando classe para suportar métodos privados)
  // =====================
  class ToastManager {
    #config = {
      queue: [],
      maxVisible: 3,
      container: null
    };

    #getContainer() {
      if (!this.#config.container) {
        this.#config.container = document.createElement('div');
        this.#config.container.className = 'fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm';
        this.#config.container.setAttribute('role', 'region');
        this.#config.container.setAttribute('aria-label', 'Notificações');
        document.body.appendChild(this.#config.container);
      }
      return this.#config.container;
    }

    #createToast(msg, type, duration) {
      const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-yellow-500 text-gray-900'
      };

      const icons = {
        success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
        error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
        info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'
      };

      const t = document.createElement('div');
      t.className = `${colors[type] || colors.info} text-white px-4 py-3 rounded-xl shadow-2xl transform translate-x-full transition-all duration-300 flex items-center gap-3`;
      t.setAttribute('role', 'alert');
      t.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
      
      t.innerHTML = `
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icons[type] || icons.info}
        </svg>
        <span class="flex-1">${msg}</span>
        <button class="shrink-0 hover:opacity-75 transition-opacity" aria-label="Fechar notificação">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      `;

      const closeBtn = t.querySelector('button');
      closeBtn.addEventListener('click', () => this.#removeToast(t));

      return { element: t, duration };
    }

    #removeToast(t) {
      t.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        t.remove();
        this.#processQueue();
      }, 300);
    }

    #processQueue() {
      const container = this.#getContainer();
      const currentToasts = container.children.length;

      if (currentToasts < this.#config.maxVisible && this.#config.queue.length > 0) {
        const { element, duration } = this.#config.queue.shift();
        container.appendChild(element);
        
        requestAnimationFrame(() => {
          element.classList.remove('translate-x-full');
        });

        if (duration > 0) {
          setTimeout(() => this.#removeToast(element), duration);
        }
      }
    }

    show(msg, type = 'info', duration = 5000) {
      const toastData = this.#createToast(msg, type, duration);
      this.#config.queue.push(toastData);
      this.#processQueue();
      return this;
    }

    success(msg, duration = 5000) {
      return this.show(msg, 'success', duration);
    }

    error(msg, duration = 7000) {
      return this.show(msg, 'error', duration);
    }

    info(msg, duration = 5000) {
      return this.show(msg, 'info', duration);
    }

    warning(msg, duration = 6000) {
      return this.show(msg, 'warning', duration);
    }

    clear() {
      this.#config.queue = [];
      if (this.#config.container) {
        this.#config.container.innerHTML = '';
      }
    }
  }

  const toast = new ToastManager();

  // =====================
  // COMPONENTES MAP
  // =====================
  const Components = {
    button: Button,
    input: Input,
    modal: Modal,
    dropdown: Dropdown,
    table: Table
  };

  // =====================
  // API PÚBLICA
  // =====================
  return {
    init() {
      document.querySelectorAll('[data-v]').forEach(el => {
        const type = el.dataset.v;
        if (Components[type] && !instances.has(el)) {
          const instance = new Components[type](el);
          instances.set(el, instance);
          
          // Manter compatibilidade com API antiga (element.$button, etc)
          // mas agora também disponível via VanillaPro.get(el)
          Object.defineProperty(el, `$${type}`, {
            get: () => instances.get(el),
            configurable: true
          });
        }
      });
    },

    get(el) {
      return instances.get(el);
    },

    destroy(el) {
      const instance = instances.get(el);
      if (instance?.destroy) {
        instance.destroy();
      }
    },

    destroyAll() {
      document.querySelectorAll('[data-v]').forEach(el => {
        this.destroy(el);
      });
    },

    toast
  };
})();

// =====================
// AUTO INICIALIZAÇÃO
// =====================
['DOMContentLoaded', 'livewire:navigated', 'turbo:render', 'astro:page-load'].forEach(ev => 
  document.addEventListener(ev, () => setTimeout(VanillaPro.init, 10))
);

// =====================
// THEME TOGGLE
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar tema salvo ou preferência do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Criar botão de toggle se não existir
  if (!document.getElementById('theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform';
    btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
    btn.innerHTML = `
      <svg class="w-6 h-6 hidden dark:block text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
      </svg>
      <svg class="w-6 h-6 block dark:hidden text-gray-700" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  // Event listener para toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Escutar mudanças de preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
});

// Expor globalmente
window.$v = VanillaPro;
window.VanillaPro = VanillaPro;
