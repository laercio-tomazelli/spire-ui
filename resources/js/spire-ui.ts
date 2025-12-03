// SPIRE UI 2025 — TypeScript Version
// Biblioteca leve (~5KB gzip) para substituir Alpine.js em projetos Laravel

// =====================
// TYPES & INTERFACES
// =====================

interface SpireUIInstance {
  destroy(): void;
}

interface ButtonInstance extends SpireUIInstance {
  loading(state?: boolean): this;
  success(msg?: string, duration?: number): this;
  error(msg?: string, duration?: number): this;
  reset(): this;
}

interface InputInstance extends SpireUIInstance {
  value(v: string): this;
  error(msg?: string): this;
  focus(): this;
  clear(): this;
  disable(state?: boolean): this;
}

interface ModalInstance extends SpireUIInstance {
  open(): this;
  close(): this;
  title(text: string | HTMLElement): this;
  body(content: string | HTMLElement): this;
}

interface DropdownInstance extends SpireUIInstance {
  open(): this;
  close(): this;
  toggle(): this;
}

interface TableInstance extends SpireUIInstance {
  loading(state?: boolean): this;
  html(rows: string): this;
  empty(message?: string): this;
}

interface TabsInstance extends SpireUIInstance {
  show(tabId: string): this;
  current(): string | null;
  disable(tabId: string): this;
  enable(tabId: string): this;
  hide(tabId: string): this;
  unhide(tabId: string): this;
  add(config: { name: string; label: string; content: string; position?: number; active?: boolean }): this;
  remove(tabId: string): this;
  list(): Array<{ name: string; label: string }>;
  // Highlight methods
  highlight(tabId: string, options?: { type?: 'error' | 'warning' | 'success' | 'info'; pulse?: boolean; badge?: string | number }): this;
  clearHighlight(tabId: string): this;
  clearAllHighlights(): this;
}

interface AccordionInstance extends SpireUIInstance {
  toggle(itemId?: string): this;
  open(itemId: string): this;
  close(itemId: string): this;
  openAll(): this;
  closeAll(): this;
}

interface TooltipInstance extends SpireUIInstance {
  show(): this;
  hide(): this;
  update(content: string): this;
}

interface SelectInstance extends SpireUIInstance {
  value(): string;
  setValue(val: string): this;
  open(): this;
  close(): this;
  options(opts: SelectOption[]): this;
  disable(state?: boolean): this;
}

interface MultiSelectInstance extends SpireUIInstance {
  value(): string[];
  setValue(vals: string[]): this;
  add(val: string): this;
  remove(val: string): this;
  toggle(val: string): this;
  clear(): this;
  selectAll(): this;
  open(): this;
  close(): this;
  options(opts: SelectOption[]): this;
  disable(state?: boolean): this;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Novos componentes

interface DrawerInstance extends SpireUIInstance {
  open(): this;
  close(): this;
  toggle(): this;
  isOpen(): boolean;
}

interface PopoverInstance extends SpireUIInstance {
  show(): this;
  hide(): this;
  toggle(): this;
  update(content: string | HTMLElement): this;
}

interface ProgressInstance extends SpireUIInstance {
  value(percent?: number): number | this;
  increment(amount?: number): this;
  decrement(amount?: number): this;
  complete(): this;
  reset(): this;
  indeterminate(state?: boolean): this;
}

interface SkeletonInstance extends SpireUIInstance {
  show(): this;
  hide(): this;
  toggle(): this;
}

interface ClipboardInstance extends SpireUIInstance {
  copy(): Promise<boolean>;
  copyText(text: string): Promise<boolean>;
}

interface StepperInstance extends SpireUIInstance {
  current(): number;
  goto(step: number): this;
  next(): this;
  prev(): this;
  complete(step?: number): this;
  reset(): this;
  canNext(): boolean;
  canPrev(): boolean;
}

// ===== CONTEXT MENU =====

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  handler?: () => void;
  items?: ContextMenuItem[]; // Submenu support
}

interface ContextMenuInstance extends SpireUIInstance {
  show(x: number, y: number, items?: ContextMenuItem[]): this;
  hide(): this;
  setItems(items: ContextMenuItem[]): this;
  isOpen(): boolean;
}

// ===== NEW COMPONENTS =====

interface FormValidatorInstance extends SpireUIInstance {
  validate(): boolean;
  isValid(): boolean;
  errors(): Record<string, string[]>;
  reset(): this;
  setRules(field: string, rules: string): this;
}

interface LazyLoadInstance extends SpireUIInstance {
  load(): this;
  unload(): this;
  isLoaded(): boolean;
}

interface InfiniteScrollInstance extends SpireUIInstance {
  load(): Promise<void>;
  reset(): this;
  setLoader(fn: () => Promise<string>): this;
  hasMore(): boolean;
}

interface DatePickerInstance extends SpireUIInstance {
  value(): string;
  setValue(date: string | Date): this;
  open(): this;
  close(): this;
  min(date: string | Date): this;
  max(date: string | Date): this;
  disable(state?: boolean): this;
}

interface DateRangePickerInstance extends SpireUIInstance {
  value(): { start: string | null; end: string | null };
  setValue(start: string | Date | null, end: string | Date | null): this;
  open(): this;
  close(): this;
  min(date: string | Date): this;
  max(date: string | Date): this;
  disable(state?: boolean): this;
  clear(): this;
}

interface ColorPickerInstance extends SpireUIInstance {
  value(): string;
  setValue(color: string): this;
  open(): this;
  close(): this;
}

interface RangeSliderInstance extends SpireUIInstance {
  value(): number | [number, number];
  setValue(val: number | [number, number]): this;
  min(val: number): this;
  max(val: number): this;
  step(val: number): this;
}

interface FileUploadInstance extends SpireUIInstance {
  files(): File[];
  clear(): this;
  upload(): Promise<void>;
  remove(index: number): this;
}

interface CommandPaletteInstance extends SpireUIInstance {
  open(): this;
  close(): this;
  toggle(): this;
  setCommands(commands: CommandItem[]): this;
  registerCommand(command: CommandItem): this;
}

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  handler: () => void;
  category?: string;
}

interface VirtualScrollInstance extends SpireUIInstance {
  setItems(items: unknown[]): this;
  scrollTo(index: number): this;
  refresh(): this;
}

interface PersistInstance extends SpireUIInstance {
  save(): this;
  load(): this;
  clear(): this;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmClass?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastManager {
  show(msg: string, type?: ToastType, duration?: number): this;
  success(msg: string, duration?: number): this;
  error(msg: string, duration?: number): this;
  info(msg: string, duration?: number): this;
  warning(msg: string, duration?: number): this;
  clear(): void;
}

// Keyboard Shortcuts
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  handler: (e: KeyboardEvent) => void;
  description?: string;
}

interface KeyboardShortcutsManager {
  register(shortcut: KeyboardShortcut): void;
  unregister(key: string, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean }): void;
  list(): KeyboardShortcut[];
  enable(): void;
  disable(): void;
}

// ===== UTILITY INTERFACES =====

interface MaskDefinition {
  pattern: string;
  placeholder?: string;
}

interface CurrencyOptions {
  locale?: string;
  currency?: string;
  symbol?: string;
  decimal?: string;
  thousands?: string;
}

interface HttpOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

interface EventBusManager {
  on(event: string, handler: (...args: unknown[]) => void): () => void;
  off(event: string, handler?: (...args: unknown[]) => void): void;
  emit(event: string, ...args: unknown[]): void;
  once(event: string, handler: (...args: unknown[]) => void): () => void;
}

interface HttpClient {
  get<T = unknown>(url: string, options?: HttpOptions): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, options?: HttpOptions): Promise<HttpResponse<T>>;
}

interface CurrencyManager {
  format(value: number, options?: CurrencyOptions): string;
  parse(value: string): number;
}

interface MaskManager {
  apply(input: HTMLInputElement, mask: string | MaskDefinition): void;
  remove(input: HTMLInputElement): void;
  getValue(input: HTMLInputElement): string;
}

interface PerfManager {
  mark(name: string): void;
  measure(name: string, startMark: string, endMark?: string): number;
  getMarks(): Record<string, number>;
  clear(): void;
}

interface A11yManager {
  announce(message: string, priority?: 'polite' | 'assertive'): void;
  trapFocus(container: HTMLElement): () => void;
  skipLink(target: string, label?: string): void;
}

type ErrorHandler = (error: Error, context?: { component?: string; element?: HTMLElement }) => void;

interface SpireUIAPI {
  init(): void;
  get<T extends SpireUIInstance>(el: HTMLElement): T | undefined;
  destroy(el: HTMLElement): void;
  destroyAll(): void;
  toast: ToastManager;
  confirm(options: ConfirmOptions): Promise<boolean>;
  shortcuts: KeyboardShortcutsManager;
  command: CommandPaletteInstance;
  // New utilities
  debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T;
  throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): T;
  events: EventBusManager;
  http: HttpClient;
  currency: CurrencyManager;
  mask: MaskManager;
  perf: PerfManager;
  a11y: A11yManager;
  onError(handler: ErrorHandler): void;
}

// Extend HTMLElement to include component properties
declare global {
  interface HTMLElement {
    $button?: ButtonInstance;
    $input?: InputInstance;
    $modal?: ModalInstance;
    $dropdown?: DropdownInstance;
    $table?: TableInstance;
    $tabs?: TabsInstance;
    $accordion?: AccordionInstance;
    $tooltip?: TooltipInstance;
    $select?: SelectInstance;
    $multiselect?: MultiSelectInstance;
    $drawer?: DrawerInstance;
    $popover?: PopoverInstance;
    $progress?: ProgressInstance;
    $skeleton?: SkeletonInstance;
    $clipboard?: ClipboardInstance;
    $stepper?: StepperInstance;
    $form?: FormValidatorInstance;
    $lazy?: LazyLoadInstance;
    $infinitescroll?: InfiniteScrollInstance;
    $datepicker?: DatePickerInstance;
    $colorpicker?: ColorPickerInstance;
    $range?: RangeSliderInstance;
    $upload?: FileUploadInstance;
    $commandpalette?: CommandPaletteInstance;
    $virtualscroll?: VirtualScrollInstance;
    $persist?: PersistInstance;
  }
}

// =====================
// MAIN MODULE
// =====================

const SpireUI = ((): SpireUIAPI => {
  // WeakMap para armazenar instâncias sem poluir o DOM
  const instances = new WeakMap<HTMLElement, SpireUIInstance>();

  // Helper para emitir eventos customizados
  const emit = (el: HTMLElement, eventName: string, detail: Record<string, unknown> = {}): void => {
    el.dispatchEvent(new CustomEvent(eventName, { 
      bubbles: true, 
      cancelable: true,
      detail 
    }));
  };

  // =====================
  // COMPONENTE: Button
  // =====================
  class Button implements ButtonInstance {
    #el: HTMLButtonElement;
    #originalText: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    #originalClasses: string;

    constructor(el: HTMLButtonElement) {
      this.#el = el;
      this.#originalText = el.textContent?.trim() || '';
      this.#originalClasses = el.className;
    }

    loading(state = true): this {
      if (state) {
        this.#originalText = this.#el.textContent?.trim() || '';
      }
      this.#el.disabled = state;
      this.#el.setAttribute('aria-disabled', String(state));
      this.#el.setAttribute('aria-busy', String(state));
      this.#el.textContent = state ? 'Carregando...' : this.#originalText;
      emit(this.#el, 'button:loading', { loading: state });
      return this;
    }

    success(msg = 'Salvo!', duration = 2000): this {
      this.#el.textContent = msg;
      this.#el.classList.add('bg-green-600');
      emit(this.#el, 'button:success', { message: msg });
      setTimeout(() => {
        this.loading(false);
        this.#el.classList.remove('bg-green-600');
      }, duration);
      return this;
    }

    error(msg = 'Erro!', duration = 2000): this {
      this.#el.textContent = msg;
      this.#el.classList.add('bg-red-600');
      emit(this.#el, 'button:error', { message: msg });
      setTimeout(() => {
        this.loading(false);
        this.#el.classList.remove('bg-red-600');
      }, duration);
      return this;
    }

    reset(): this {
      this.#el.disabled = false;
      this.#el.removeAttribute('aria-disabled');
      this.#el.removeAttribute('aria-busy');
      this.#el.textContent = this.#originalText;
      emit(this.#el, 'button:reset', {});
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Input
  // =====================
  class Input implements InputInstance {
    #el: HTMLInputElement;
    #errorEl: HTMLElement | null;
    #handleInput: () => void;

    constructor(el: HTMLInputElement) {
      this.#el = el;
      this.#errorEl = el.closest('div')?.querySelector('.error-text') || null;
      this.#handleInput = () => {
        if (this.#el.classList.contains('border-red-500')) {
          this.error('');
        }
      };
      this.#setupValidation();
    }

    #setupValidation(): void {
      this.#el.addEventListener('input', this.#handleInput);
    }

    value(v: string): this {
      this.#el.value = v;
      this.#el.dispatchEvent(new Event('input', { bubbles: true }));
      emit(this.#el, 'input:change', { value: v });
      return this;
    }

    error(msg = ''): this {
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
      
      if (hasError) {
        emit(this.#el, 'input:error', { message: msg });
      }
      return this;
    }

    focus(): this {
      this.#el.focus();
      return this;
    }

    clear(): this {
      return this.value('').error('');
    }

    disable(state = true): this {
      this.#el.disabled = state;
      this.#el.setAttribute('aria-disabled', String(state));
      return this;
    }

    destroy(): void {
      this.#el.removeEventListener('input', this.#handleInput);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Modal
  // =====================
  class Modal implements ModalInstance {
    #el: HTMLElement;
    #previousActiveElement: Element | null = null;
    #boundHandleKeydown: (e: KeyboardEvent) => void;
    #boundHandleClick: (e: MouseEvent) => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#boundHandleClick = this.#handleClick.bind(this);
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y(): void {
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

    #setupListeners(): void {
      this.#el.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
        return;
      }
      
      if (e.key === 'Tab') {
        this.#trapFocus(e);
      }
    }

    #handleClick(e: MouseEvent): void {
      if (e.target === this.#el) {
        this.close();
      }
    }

    #trapFocus(e: KeyboardEvent): void {
      const focusableElements = this.#el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    }

    #lockScroll(): void {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.dataset.scrollY = String(scrollY);
    }

    #unlockScroll(): void {
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.scrollY;
    }

    open(): this {
      this.#previousActiveElement = document.activeElement;
      this.#el.classList.remove('hidden');
      this.#lockScroll();
      
      document.addEventListener('keydown', this.#boundHandleKeydown);
      this.#el.addEventListener('click', this.#boundHandleClick);
      
      requestAnimationFrame(() => {
        const firstFocusable = this.#el.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (firstFocusable || this.#el).focus();
      });
      
      emit(this.#el, 'modal:opened', {});
      return this;
    }

    close(): this {
      this.#el.classList.add('hidden');
      this.#unlockScroll();
      
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      this.#el.removeEventListener('click', this.#boundHandleClick);
      
      if (this.#previousActiveElement instanceof HTMLElement) {
        this.#previousActiveElement.focus();
      }
      
      emit(this.#el, 'modal:closed', {});
      return this;
    }

    title(text: string | HTMLElement): this {
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

    body(content: string | HTMLElement): this {
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

    destroy(): void {
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      this.#el.removeEventListener('click', this.#boundHandleClick);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Dropdown
  // =====================
  class Dropdown implements DropdownInstance {
    #el: HTMLElement;
    #menu: HTMLElement | null;
    #trigger: HTMLElement | null;
    #boundHandleOutsideClick: (e: MouseEvent) => void;
    #boundHandleKeydown: (e: KeyboardEvent) => void;
    #boundHandleTriggerClick: () => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#menu = el.querySelector('[data-menu]');
      this.#trigger = el.querySelector('[data-trigger]');
      
      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#boundHandleTriggerClick = () => this.toggle();

      if (this.#menu && this.#trigger) {
        this.#setupA11y();
        this.#setupListeners();
      }
    }

    #setupA11y(): void {
      this.#trigger?.setAttribute('aria-haspopup', 'true');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#menu?.setAttribute('role', 'menu');
    }

    #setupListeners(): void {
      this.#trigger?.addEventListener('click', this.#boundHandleTriggerClick);
      this.#trigger?.addEventListener('keydown', this.#boundHandleKeydown);
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#el.contains(e.target as Node)) {
        this.close();
      }
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
        this.#trigger?.focus();
      }
    }

    open(): this {
      this.#menu?.classList.remove('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', this.#boundHandleOutsideClick);
      document.addEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'dropdown:opened', {});
      return this;
    }

    close(): this {
      this.#menu?.classList.add('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'dropdown:closed', {});
      return this;
    }

    toggle(): this {
      const isOpen = !this.#menu?.classList.contains('hidden');
      return isOpen ? this.close() : this.open();
    }

    destroy(): void {
      this.#trigger?.removeEventListener('click', this.#boundHandleTriggerClick);
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Table
  // =====================
  class Table implements TableInstance {
    #el: HTMLTableElement;
    #tbody: HTMLTableSectionElement | null;

    constructor(el: HTMLTableElement) {
      this.#el = el;
      this.#tbody = el.querySelector('tbody');
    }

    loading(state = true): this {
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
        emit(this.#el, 'table:loading', { loading: true });
      } else {
        this.#el.removeAttribute('aria-busy');
        emit(this.#el, 'table:loading', { loading: false });
      }
      return this;
    }

    html(rows: string): this {
      if (this.#tbody) {
        this.#tbody.innerHTML = rows;
        this.#el.removeAttribute('aria-busy');
        emit(this.#el, 'table:updated', {});
      }
      return this;
    }

    empty(message = 'Nenhum registro encontrado'): this {
      if (this.#tbody) {
        this.#tbody.innerHTML = `
          <tr>
            <td colspan="99" class="py-12 text-center text-gray-500">${message}</td>
          </tr>
        `;
        emit(this.#el, 'table:empty', { message });
      }
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Tabs
  // =====================
  class Tabs implements TabsInstance {
    #el: HTMLElement;
    #tablist: HTMLElement | null = null;
    #panelsContainer: HTMLElement | null = null;
    #currentTab: string | null = null;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#tablist = el.querySelector('[role="tablist"]') || el.querySelector('[data-tablist]');
      this.#panelsContainer = el.querySelector('[data-panels]') || el;
      this.#setupA11y();
      this.#setupListeners();
      this.#initializeActiveTab();
    }

    #getTabs(): HTMLElement[] {
      // Only get direct tabs from this component's tablist, not nested ones
      if (this.#tablist) {
        return Array.from(this.#tablist.querySelectorAll(':scope > [data-tab]'));
      }
      // Fallback: get tabs that are direct children or in the first tablist found
      const tablist = this.#el.querySelector('[role="tablist"]');
      if (tablist) {
        return Array.from(tablist.querySelectorAll(':scope > [data-tab]'));
      }
      return [];
    }

    #getPanels(): HTMLElement[] {
      // Only get panels that belong to this tabs instance
      const panelsContainer = this.#panelsContainer;
      if (panelsContainer && panelsContainer !== this.#el) {
        return Array.from(panelsContainer.querySelectorAll(':scope > [data-panel]'));
      }
      // Get panels that are direct descendants of tab-panels div
      const tabPanelsDiv = this.#el.querySelector('.tab-panels');
      if (tabPanelsDiv) {
        return Array.from(tabPanelsDiv.querySelectorAll(':scope > [data-panel]'));
      }
      // Fallback: only get panels that don't belong to nested tabs
      return Array.from(this.#el.querySelectorAll('[data-panel]')).filter(panel => {
        const closestTabs = panel.closest('[data-v="tabs"]');
        return closestTabs === this.#el;
      });
    }

    #setupA11y(): void {
      if (this.#tablist) {
        this.#tablist.setAttribute('role', 'tablist');
      }

      this.#getTabs().forEach((tab, index) => {
        this.#setupTabA11y(tab, index);
      });
    }

    #setupTabA11y(tab: HTMLElement, index: number): void {
      const tabId = tab.dataset.tab || `tab-${index}`;
      const panelId = `panel-${tabId}`;
      
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.id = `tab-${tabId}`;
      
      const panel = this.#el.querySelector(`[data-panel="${tabId}"]`);
      if (panel) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${tabId}`);
        panel.id = panelId;
      }
    }

    #setupListeners(): void {
      // Use event delegation for dynamic tabs
      this.#el.addEventListener('click', (e) => {
        const tab = (e.target as HTMLElement).closest('[data-tab]') as HTMLElement;
        if (!tab || tab.hasAttribute('disabled') || tab.classList.contains('disabled')) return;
        
        // Check if this tab belongs to THIS tabs instance (not a nested one)
        const tabsContainer = tab.closest('[data-v="tabs"]');
        if (tabsContainer !== this.#el) return;
        
        const tabId = tab.dataset.tab;
        if (tabId) this.show(tabId);
      });

      this.#el.addEventListener('keydown', (e: KeyboardEvent) => {
        const tab = (e.target as HTMLElement).closest('[data-tab]') as HTMLElement;
        if (!tab) return;

        const tabs = this.#getTabs().filter(t => !t.hasAttribute('disabled') && !t.classList.contains('disabled') && !t.classList.contains('tab-hidden'));
        const currentIndex = tabs.indexOf(tab);
        let newIndex = currentIndex;

        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = tabs.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        const newTab = tabs[newIndex];
        const tabId = newTab?.dataset.tab;
        if (tabId) {
          this.show(tabId);
          newTab.focus();
        }
      });
    }

    #initializeActiveTab(): void {
      const activeTab = this.#el.querySelector<HTMLElement>('[data-tab].active, [data-tab][aria-selected="true"]');
      const tabs = this.#getTabs();
      const tabId = activeTab?.dataset.tab || tabs[0]?.dataset.tab;
      if (tabId) this.show(tabId);
    }

    show(tabId: string): this {
      const targetTab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      if (!targetTab || targetTab.hasAttribute('disabled') || targetTab.classList.contains('disabled')) {
        return this;
      }

      this.#getTabs().forEach(tab => {
        const isActive = tab.dataset.tab === tabId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      this.#getPanels().forEach(panel => {
        const isActive = panel.dataset.panel === tabId;
        panel.classList.toggle('hidden', !isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });

      this.#currentTab = tabId;
      emit(this.#el, 'tabs:changed', { tab: tabId });
      return this;
    }

    current(): string | null {
      return this.#currentTab;
    }

    disable(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      if (tab) {
        tab.setAttribute('disabled', '');
        tab.classList.add('disabled', 'opacity-50', 'cursor-not-allowed');
        tab.setAttribute('aria-disabled', 'true');
        
        // If disabling current tab, switch to next available
        if (this.#currentTab === tabId) {
          const availableTab = this.#getTabs().find(t => 
            !t.hasAttribute('disabled') && !t.classList.contains('tab-hidden')
          );
          if (availableTab?.dataset.tab) {
            this.show(availableTab.dataset.tab);
          }
        }
      }
      emit(this.#el, 'tabs:disabled', { tab: tabId });
      return this;
    }

    enable(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      if (tab) {
        tab.removeAttribute('disabled');
        tab.classList.remove('disabled', 'opacity-50', 'cursor-not-allowed');
        tab.setAttribute('aria-disabled', 'false');
      }
      emit(this.#el, 'tabs:enabled', { tab: tabId });
      return this;
    }

    hide(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      const panel = this.#el.querySelector<HTMLElement>(`[data-panel="${tabId}"]`);
      
      if (tab) {
        tab.classList.add('tab-hidden', 'hidden');
      }
      if (panel) {
        panel.classList.add('hidden');
      }
      
      // If hiding current tab, switch to next available
      if (this.#currentTab === tabId) {
        const availableTab = this.#getTabs().find(t => 
          !t.classList.contains('tab-hidden') && !t.hasAttribute('disabled')
        );
        if (availableTab?.dataset.tab) {
          this.show(availableTab.dataset.tab);
        }
      }
      
      emit(this.#el, 'tabs:hidden', { tab: tabId });
      return this;
    }

    unhide(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      const panel = this.#el.querySelector<HTMLElement>(`[data-panel="${tabId}"]`);
      
      if (tab) {
        tab.classList.remove('tab-hidden', 'hidden');
      }
      // Panel visibility is controlled by show()
      
      emit(this.#el, 'tabs:unhidden', { tab: tabId });
      return this;
    }

    add(config: { name: string; label: string; content: string; position?: number; active?: boolean }): this {
      const { name: tabId, label, content, position, active = false } = config;
      
      // Create tab button
      const tab = document.createElement('button');
      tab.dataset.tab = tabId;
      tab.className = 'px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 [&.active]:border-blue-600 [&.active]:text-blue-600 dark:[&.active]:border-blue-400 dark:[&.active]:text-blue-400';
      tab.textContent = label;
      
      // Create panel
      const panel = document.createElement('div');
      panel.dataset.panel = tabId;
      panel.className = 'hidden';
      panel.innerHTML = content;
      
      // Find tablist and panels container
      const tablist = this.#tablist || this.#el.querySelector('[role="tablist"]');
      const panelsContainer = this.#panelsContainer;
      
      if (tablist) {
        const tabs = this.#getTabs();
        if (position !== undefined && position < tabs.length) {
          tabs[position].before(tab);
        } else {
          tablist.appendChild(tab);
        }
      }
      
      if (panelsContainer) {
        const panels = this.#getPanels();
        if (position !== undefined && position < panels.length) {
          panels[position].before(panel);
        } else {
          panelsContainer.appendChild(panel);
        }
      }
      
      // Setup A11y for new tab
      this.#setupTabA11y(tab, this.#getTabs().length - 1);
      
      emit(this.#el, 'tabs:added', { tab: tabId, label });
      
      if (active) {
        this.show(tabId);
      }
      
      return this;
    }

    remove(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      const panel = this.#el.querySelector<HTMLElement>(`[data-panel="${tabId}"]`);
      
      // If removing current tab, switch to another first
      if (this.#currentTab === tabId) {
        const tabs = this.#getTabs().filter(t => t.dataset.tab !== tabId);
        const nextTab = tabs.find(t => !t.hasAttribute('disabled') && !t.classList.contains('tab-hidden'));
        if (nextTab?.dataset.tab) {
          this.show(nextTab.dataset.tab);
        }
      }
      
      tab?.remove();
      panel?.remove();
      
      emit(this.#el, 'tabs:removed', { tab: tabId });
      return this;
    }

    list(): Array<{ name: string; label: string }> {
      return this.#getTabs()
        .filter(t => !t.classList.contains('tab-hidden'))
        .map(t => ({
          name: t.dataset.tab || '',
          label: t.textContent?.replace(/\d+$/, '').trim() || '' // Remove badge number from label
        }))
        .filter(t => t.name);
    }

    highlight(tabId: string, options: { type?: 'error' | 'warning' | 'success' | 'info'; pulse?: boolean; badge?: string | number } = {}): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      if (!tab) return this;

      const { type = 'error', pulse = false, badge } = options;

      // Clear any existing highlight first
      this.clearHighlight(tabId);

      // Color classes based on type
      const colorClasses: Record<string, string> = {
        error: 'text-red-600 dark:text-red-400',
        warning: 'text-amber-600 dark:text-amber-400',
        success: 'text-green-600 dark:text-green-400',
        info: 'text-blue-600 dark:text-blue-400'
      };

      const bgClasses: Record<string, string> = {
        error: 'bg-red-100 dark:bg-red-900/30',
        warning: 'bg-amber-100 dark:bg-amber-900/30',
        success: 'bg-green-100 dark:bg-green-900/30',
        info: 'bg-blue-100 dark:bg-blue-900/30'
      };

      // Apply highlight classes
      tab.classList.add(...colorClasses[type].split(' '), ...bgClasses[type].split(' '), 'tab-highlighted');
      tab.dataset.highlightType = type;

      // Add pulse animation if requested
      if (pulse) {
        tab.classList.add('animate-pulse');
        tab.dataset.highlightPulse = 'true';
      }

      // Add badge if provided
      if (badge !== undefined) {
        const existingBadge = tab.querySelector('[data-tab-badge]');
        existingBadge?.remove();

        const badgeEl = document.createElement('span');
        badgeEl.dataset.tabBadge = '';
        badgeEl.className = `ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-bold rounded-full ${
          type === 'error' ? 'bg-red-600 text-white' :
          type === 'warning' ? 'bg-amber-600 text-white' :
          type === 'success' ? 'bg-green-600 text-white' :
          'bg-blue-600 text-white'
        }`;
        badgeEl.textContent = String(badge);
        tab.appendChild(badgeEl);
      }

      emit(this.#el, 'tabs:highlighted', { tab: tabId, type, pulse, badge });
      return this;
    }

    clearHighlight(tabId: string): this {
      const tab = this.#el.querySelector<HTMLElement>(`[data-tab="${tabId}"]`);
      if (!tab) return this;

      // Remove all highlight-related classes
      const highlightClasses = [
        'text-red-600', 'dark:text-red-400', 'bg-red-100', 'dark:bg-red-900/30',
        'text-amber-600', 'dark:text-amber-400', 'bg-amber-100', 'dark:bg-amber-900/30',
        'text-green-600', 'dark:text-green-400', 'bg-green-100', 'dark:bg-green-900/30',
        'text-blue-600', 'dark:text-blue-400', 'bg-blue-100', 'dark:bg-blue-900/30',
        'tab-highlighted', 'animate-pulse'
      ];
      
      tab.classList.remove(...highlightClasses);
      delete tab.dataset.highlightType;
      delete tab.dataset.highlightPulse;

      // Remove badge
      tab.querySelector('[data-tab-badge]')?.remove();

      emit(this.#el, 'tabs:highlight-cleared', { tab: tabId });
      return this;
    }

    clearAllHighlights(): this {
      this.#getTabs().forEach(tab => {
        if (tab.dataset.tab) {
          this.clearHighlight(tab.dataset.tab);
        }
      });
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Rating
  // =====================
  interface RatingInstance {
    getValue(): number;
    setValue(value: number): RatingInstance;
    reset(): RatingInstance;
    destroy(): void;
  }

  class Rating implements RatingInstance {
    #el: HTMLElement;
    #stars: NodeListOf<HTMLElement>;
    #input: HTMLInputElement | null;
    #valueDisplay: HTMLElement | null;
    #max: number;
    #half: boolean;
    #readonly: boolean;
    #value: number;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#stars = el.querySelectorAll('[data-rating-star]');
      this.#input = el.querySelector('[data-rating-input]');
      this.#valueDisplay = el.querySelector('[data-rating-value-display]');
      this.#max = parseInt(el.dataset.max || '5');
      this.#half = el.dataset.half === 'true';
      this.#readonly = el.dataset.readonly === 'true';
      this.#value = parseFloat(el.dataset.value || '0');

      if (!this.#readonly) {
        this.#setupListeners();
      }
    }

    #setupListeners(): void {
      this.#stars.forEach((star, index) => {
        const starValue = index + 1;

        // Hover preview
        star.addEventListener('mouseenter', (e) => {
          if (this.#half) {
            const rect = star.getBoundingClientRect();
            const isHalf = (e as MouseEvent).clientX < rect.left + rect.width / 2;
            this.#preview(isHalf ? starValue - 0.5 : starValue);
          } else {
            this.#preview(starValue);
          }
        });

        star.addEventListener('mousemove', (e) => {
          if (this.#half) {
            const rect = star.getBoundingClientRect();
            const isHalf = (e as MouseEvent).clientX < rect.left + rect.width / 2;
            this.#preview(isHalf ? starValue - 0.5 : starValue);
          }
        });

        // Click to set value
        star.addEventListener('click', (e) => {
          if (this.#half) {
            const rect = star.getBoundingClientRect();
            const isHalf = (e as MouseEvent).clientX < rect.left + rect.width / 2;
            this.setValue(isHalf ? starValue - 0.5 : starValue);
          } else {
            this.setValue(starValue);
          }
        });
      });

      // Reset on mouse leave
      this.#el.addEventListener('mouseleave', () => {
        this.#render(this.#value);
      });
    }

    #preview(value: number): void {
      this.#render(value);
    }

    #render(value: number): void {
      this.#stars.forEach((star, index) => {
        const starValue = index + 1;
        const fill = star.querySelector('[data-rating-fill]') as HTMLElement;
        
        if (fill) {
          let clipPercent = '100%';
          if (starValue <= value) {
            clipPercent = '0%';
          } else if (starValue - 0.5 <= value && this.#half) {
            clipPercent = '50%';
          }
          fill.style.clipPath = `inset(0 ${clipPercent} 0 0)`;
        }
      });

      if (this.#valueDisplay) {
        this.#valueDisplay.textContent = this.#half ? value.toFixed(1) : value.toString();
      }
    }

    getValue(): number {
      return this.#value;
    }

    setValue(value: number): this {
      this.#value = Math.max(0, Math.min(value, this.#max));
      this.#el.dataset.value = String(this.#value);
      
      if (this.#input) {
        this.#input.value = String(this.#value);
      }

      this.#render(this.#value);
      emit(this.#el, 'rating:change', { value: this.#value });
      return this;
    }

    reset(): this {
      this.setValue(0);
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Carousel
  // =====================
  interface CarouselInstance {
    next(): CarouselInstance;
    prev(): CarouselInstance;
    goto(index: number): CarouselInstance;
    current(): number;
    count(): number;
    play(): CarouselInstance;
    pause(): CarouselInstance;
    destroy(): void;
  }

  class Carousel implements CarouselInstance {
    #el: HTMLElement;
    #track: HTMLElement | null;
    #slides: HTMLElement[];
    #prevBtn: HTMLElement | null;
    #nextBtn: HTMLElement | null;
    #indicators: HTMLElement[];
    #currentIndex: number = 0;
    #autoplay: boolean;
    #interval: number;
    #autoplayTimer: number | null = null;
    #loop: boolean;
    #pauseOnHover: boolean;
    #touchStartX: number = 0;
    #touchEndX: number = 0;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#track = el.querySelector('[data-carousel-track]');
      this.#slides = Array.from(el.querySelectorAll('[data-carousel-slide]'));
      this.#prevBtn = el.querySelector('[data-carousel-prev]');
      this.#nextBtn = el.querySelector('[data-carousel-next]');
      this.#indicators = Array.from(el.querySelectorAll('[data-carousel-indicator]'));
      
      this.#autoplay = el.dataset.autoplay === 'true';
      this.#interval = parseInt(el.dataset.interval || '5000');
      this.#loop = el.dataset.loop !== 'false';
      this.#pauseOnHover = el.dataset.pauseOnHover !== 'false';

      this.#setupListeners();
      this.#updateUI();

      if (this.#autoplay) {
        this.play();
      }
    }

    #setupListeners(): void {
      // Navigation buttons
      this.#prevBtn?.addEventListener('click', () => this.prev());
      this.#nextBtn?.addEventListener('click', () => this.next());

      // Indicators
      this.#indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goto(index));
      });

      // Keyboard navigation
      this.#el.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.prev();
        } else if (e.key === 'ArrowRight') {
          this.next();
        }
      });

      // Touch/swipe support
      this.#el.addEventListener('touchstart', (e) => {
        this.#touchStartX = e.changedTouches[0].screenX;
        if (this.#autoplay) this.pause();
      }, { passive: true });

      this.#el.addEventListener('touchend', (e) => {
        this.#touchEndX = e.changedTouches[0].screenX;
        this.#handleSwipe();
        if (this.#autoplay) this.play();
      }, { passive: true });

      // Pause on hover
      if (this.#pauseOnHover && this.#autoplay) {
        this.#el.addEventListener('mouseenter', () => this.pause());
        this.#el.addEventListener('mouseleave', () => this.play());
      }
    }

    #handleSwipe(): void {
      const diff = this.#touchStartX - this.#touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }

    #updateUI(): void {
      // Update slides visibility
      this.#slides.forEach((slide, index) => {
        slide.classList.toggle('opacity-0', index !== this.#currentIndex);
        slide.classList.toggle('opacity-100', index === this.#currentIndex);
        slide.classList.toggle('z-10', index === this.#currentIndex);
        slide.classList.toggle('z-0', index !== this.#currentIndex);
        slide.setAttribute('aria-hidden', String(index !== this.#currentIndex));
      });

      // Update indicators
      this.#indicators.forEach((indicator, index) => {
        indicator.classList.toggle('bg-white', index === this.#currentIndex);
        indicator.classList.toggle('bg-white/50', index !== this.#currentIndex);
        indicator.setAttribute('aria-current', String(index === this.#currentIndex));
      });

      // Update navigation buttons state
      if (!this.#loop) {
        this.#prevBtn?.classList.toggle('opacity-50', this.#currentIndex === 0);
        this.#prevBtn?.classList.toggle('cursor-not-allowed', this.#currentIndex === 0);
        this.#nextBtn?.classList.toggle('opacity-50', this.#currentIndex === this.#slides.length - 1);
        this.#nextBtn?.classList.toggle('cursor-not-allowed', this.#currentIndex === this.#slides.length - 1);
      }

      // Emit event
      emit(this.#el, 'carousel:change', { 
        index: this.#currentIndex, 
        total: this.#slides.length 
      });
    }

    next(): this {
      const nextIndex = this.#currentIndex + 1;
      
      if (nextIndex >= this.#slides.length) {
        if (this.#loop) {
          this.#currentIndex = 0;
        }
      } else {
        this.#currentIndex = nextIndex;
      }
      
      this.#updateUI();
      return this;
    }

    prev(): this {
      const prevIndex = this.#currentIndex - 1;
      
      if (prevIndex < 0) {
        if (this.#loop) {
          this.#currentIndex = this.#slides.length - 1;
        }
      } else {
        this.#currentIndex = prevIndex;
      }
      
      this.#updateUI();
      return this;
    }

    goto(index: number): this {
      if (index >= 0 && index < this.#slides.length) {
        this.#currentIndex = index;
        this.#updateUI();
      }
      return this;
    }

    current(): number {
      return this.#currentIndex;
    }

    count(): number {
      return this.#slides.length;
    }

    play(): this {
      if (this.#autoplayTimer) {
        clearInterval(this.#autoplayTimer);
      }
      
      this.#autoplayTimer = window.setInterval(() => {
        this.next();
      }, this.#interval);
      
      this.#el.dataset.playing = 'true';
      emit(this.#el, 'carousel:play');
      return this;
    }

    pause(): this {
      if (this.#autoplayTimer) {
        clearInterval(this.#autoplayTimer);
        this.#autoplayTimer = null;
      }
      
      this.#el.dataset.playing = 'false';
      emit(this.#el, 'carousel:pause');
      return this;
    }

    destroy(): void {
      this.pause();
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Collapse
  // =====================
  interface CollapseInstance {
    toggle(): CollapseInstance;
    open(): CollapseInstance;
    close(): CollapseInstance;
    isOpen(): boolean;
    destroy(): void;
  }

  class Collapse implements CollapseInstance {
    #el: HTMLElement;
    #content: HTMLElement | null;
    #icon: HTMLElement | null;
    #isOpen: boolean;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#content = el.querySelector('[data-collapse-content]');
      this.#icon = el.querySelector('[data-collapse-icon]');
      this.#isOpen = this.#content ? 
        (this.#content.style.maxHeight !== '0px' && this.#content.style.maxHeight !== '') : 
        false;
      
      // Se começar aberto, definir max-height correto
      if (this.#isOpen && this.#content) {
        this.#content.style.maxHeight = this.#content.scrollHeight + 'px';
        this.#content.style.opacity = '1';
      }
    }

    toggle(): this {
      if (this.#isOpen) {
        this.close();
      } else {
        this.open();
      }
      return this;
    }

    open(): this {
      if (!this.#content) return this;
      
      this.#content.style.maxHeight = this.#content.scrollHeight + 'px';
      this.#content.style.opacity = '1';
      this.#isOpen = true;
      
      // Atualizar ícone
      if (this.#icon) {
        this.#icon.style.transform = 'rotate(180deg)';
      }
      
      // Atualizar aria
      const button = this.#el.querySelector('button');
      button?.setAttribute('aria-expanded', 'true');
      
      emit(this.#el, 'collapse:opened', { id: this.#el.dataset.collapse });
      return this;
    }

    close(): this {
      if (!this.#content) return this;
      
      this.#content.style.maxHeight = '0';
      this.#content.style.opacity = '0';
      this.#isOpen = false;
      
      // Atualizar ícone
      if (this.#icon) {
        this.#icon.style.transform = 'rotate(0deg)';
      }
      
      // Atualizar aria
      const button = this.#el.querySelector('button');
      button?.setAttribute('aria-expanded', 'false');
      
      emit(this.#el, 'collapse:closed', { id: this.#el.dataset.collapse });
      return this;
    }

    isOpen(): boolean {
      return this.#isOpen;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Accordion
  // =====================
  class Accordion implements AccordionInstance {
    #el: HTMLElement;
    #items: NodeListOf<HTMLElement>;
    #allowMultiple: boolean;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#items = el.querySelectorAll('[data-accordion-item]');
      this.#allowMultiple = el.dataset.multiple !== 'false';
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y(): void {
      this.#items.forEach((item, index) => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector('[data-accordion-content]');
        
        if (trigger && content) {
          const id = item.dataset.accordionItem || `accordion-${index}`;
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-controls', `content-${id}`);
          trigger.id = `trigger-${id}`;
          
          content.id = `content-${id}`;
          content.setAttribute('aria-labelledby', `trigger-${id}`);
          content.setAttribute('role', 'region');
        }
      });
    }

    #setupListeners(): void {
      this.#items.forEach(item => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        trigger?.addEventListener('click', () => {
          const itemId = item.dataset.accordionItem;
          if (itemId) this.toggle(itemId);
        });
      });
    }

    toggle(itemId?: string): this {
      if (!itemId) {
        const firstItem = this.#items[0]?.dataset.accordionItem;
        if (firstItem) this.toggle(firstItem);
        return this;
      }

      const item = this.#el.querySelector(`[data-accordion-item="${itemId}"]`);
      const trigger = item?.querySelector('[data-accordion-trigger]');
      const content = item?.querySelector<HTMLElement>('[data-accordion-content]');
      
      if (!trigger || !content) return this;

      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      
      if (!this.#allowMultiple && !isOpen) {
        this.closeAll();
      }

      trigger.setAttribute('aria-expanded', String(!isOpen));
      content.classList.toggle('hidden', isOpen);
      
      emit(this.#el, 'accordion:toggled', { item: itemId, open: !isOpen });
      return this;
    }

    open(itemId: string): this {
      const item = this.#el.querySelector(`[data-accordion-item="${itemId}"]`);
      const trigger = item?.querySelector('[data-accordion-trigger]');
      const content = item?.querySelector<HTMLElement>('[data-accordion-content]');
      
      if (trigger && content) {
        if (!this.#allowMultiple) {
          this.closeAll();
        }
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        emit(this.#el, 'accordion:opened', { item: itemId });
      }
      return this;
    }

    close(itemId: string): this {
      const item = this.#el.querySelector(`[data-accordion-item="${itemId}"]`);
      const trigger = item?.querySelector('[data-accordion-trigger]');
      const content = item?.querySelector<HTMLElement>('[data-accordion-content]');
      
      if (trigger && content) {
        trigger.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        emit(this.#el, 'accordion:closed', { item: itemId });
      }
      return this;
    }

    openAll(): this {
      this.#items.forEach(item => {
        const itemId = item.dataset.accordionItem;
        if (itemId) this.open(itemId);
      });
      return this;
    }

    closeAll(): this {
      this.#items.forEach(item => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector<HTMLElement>('[data-accordion-content]');
        if (trigger && content) {
          trigger.setAttribute('aria-expanded', 'false');
          content.classList.add('hidden');
        }
      });
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Tooltip
  // =====================
  class Tooltip implements TooltipInstance {
    #el: HTMLElement;
    #tooltipEl: HTMLElement | null = null;
    #content: string;
    #position: string;
    #boundShow: () => void;
    #boundHide: () => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#content = el.dataset.tooltip || el.getAttribute('title') || '';
      this.#position = el.dataset.tooltipPosition || 'top';
      
      // Remove title para não conflitar
      el.removeAttribute('title');
      
      this.#boundShow = this.show.bind(this);
      this.#boundHide = this.hide.bind(this);
      
      this.#setupListeners();
    }

    #setupListeners(): void {
      this.#el.addEventListener('mouseenter', this.#boundShow);
      this.#el.addEventListener('mouseleave', this.#boundHide);
      this.#el.addEventListener('focus', this.#boundShow);
      this.#el.addEventListener('blur', this.#boundHide);
    }

    #createTooltip(): HTMLElement {
      const tooltip = document.createElement('div');
      tooltip.className = 'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg pointer-events-none transition-opacity duration-200';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.textContent = this.#content;
      return tooltip;
    }

    #positionTooltip(): void {
      if (!this.#tooltipEl) return;

      const rect = this.#el.getBoundingClientRect();
      const tooltipRect = this.#tooltipEl.getBoundingClientRect();
      const gap = 8;

      let top = 0;
      let left = 0;

      switch (this.#position) {
        case 'top':
          top = rect.top - tooltipRect.height - gap;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = rect.bottom + gap;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.left - tooltipRect.width - gap;
          break;
        case 'right':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.right + gap;
          break;
      }

      // Ensure tooltip stays within viewport
      left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8));

      this.#tooltipEl.style.top = `${top}px`;
      this.#tooltipEl.style.left = `${left}px`;
    }

    show(): this {
      if (this.#tooltipEl || !this.#content) return this;

      this.#tooltipEl = this.#createTooltip();
      this.#tooltipEl.style.opacity = '0';
      document.body.appendChild(this.#tooltipEl);
      
      // Position after append to get correct dimensions
      requestAnimationFrame(() => {
        this.#positionTooltip();
        if (this.#tooltipEl) {
          this.#tooltipEl.style.opacity = '1';
        }
      });

      return this;
    }

    hide(): this {
      if (this.#tooltipEl) {
        this.#tooltipEl.remove();
        this.#tooltipEl = null;
      }
      return this;
    }

    update(content: string): this {
      this.#content = content;
      if (this.#tooltipEl) {
        this.#tooltipEl.textContent = content;
        this.#positionTooltip();
      }
      return this;
    }

    destroy(): void {
      this.hide();
      this.#el.removeEventListener('mouseenter', this.#boundShow);
      this.#el.removeEventListener('mouseleave', this.#boundHide);
      this.#el.removeEventListener('focus', this.#boundShow);
      this.#el.removeEventListener('blur', this.#boundHide);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Select
  // =====================
  class Select implements SelectInstance {
    #el: HTMLElement;
    #trigger: HTMLElement | null;
    #dropdown: HTMLElement | null;
    #optionsList: HTMLElement | null;
    #hiddenInput: HTMLInputElement | null;
    #options: SelectOption[] = [];
    #selectedValue = '';
    #isOpen = false;
    #boundHandleOutsideClick: (e: MouseEvent) => void;
    #boundHandleKeydown: (e: KeyboardEvent) => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#trigger = el.querySelector('[data-select-trigger]');
      this.#dropdown = el.querySelector('[data-select-dropdown]');
      this.#optionsList = el.querySelector('[data-select-options]');
      this.#hiddenInput = el.querySelector('input[type="hidden"]');

      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);

      this.#parseOptions();
      this.#setupA11y();
      this.#setupListeners();
    }

    #parseOptions(): void {
      const optionEls = this.#el.querySelectorAll('[data-option]');
      this.#options = Array.from(optionEls).map(opt => ({
        value: (opt as HTMLElement).dataset.option || '',
        label: opt.textContent?.trim() || '',
        disabled: opt.hasAttribute('disabled')
      }));

      // Set initial value
      const selected = this.#el.querySelector('[data-option].selected, [data-option][aria-selected="true"]') as HTMLElement;
      if (selected) {
        this.#selectedValue = selected.dataset.option || '';
      }
    }

    #setupA11y(): void {
      this.#trigger?.setAttribute('role', 'combobox');
      this.#trigger?.setAttribute('aria-haspopup', 'listbox');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#optionsList?.setAttribute('role', 'listbox');

      this.#options.forEach((opt, index) => {
        const optEl = this.#el.querySelector(`[data-option="${opt.value}"]`);
        optEl?.setAttribute('role', 'option');
        optEl?.setAttribute('id', `option-${index}`);
      });
    }

    #setupListeners(): void {
      this.#trigger?.addEventListener('click', () => this.#isOpen ? this.close() : this.open());
      
      this.#el.querySelectorAll('[data-option]').forEach(opt => {
        opt.addEventListener('click', () => {
          const value = (opt as HTMLElement).dataset.option;
          if (value && !opt.hasAttribute('disabled')) {
            this.setValue(value);
            this.close();
          }
        });
      });
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#el.contains(e.target as Node)) {
        this.close();
      }
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
        this.#trigger?.focus();
      }
    }

    #updateDisplay(): void {
      const selectedOpt = this.#options.find(o => o.value === this.#selectedValue);
      const displayEl = this.#trigger?.querySelector('[data-select-value]') || this.#trigger;
      if (displayEl && selectedOpt) {
        displayEl.textContent = selectedOpt.label;
      }

      // Update option states
      this.#el.querySelectorAll('[data-option]').forEach(opt => {
        const isSelected = (opt as HTMLElement).dataset.option === this.#selectedValue;
        opt.classList.toggle('selected', isSelected);
        opt.setAttribute('aria-selected', String(isSelected));
      });
    }

    value(): string {
      return this.#selectedValue;
    }

    setValue(val: string): this {
      this.#selectedValue = val;
      if (this.#hiddenInput) {
        this.#hiddenInput.value = val;
      }
      this.#updateDisplay();
      emit(this.#el, 'select:change', { value: val });
      return this;
    }

    open(): this {
      this.#dropdown?.classList.remove('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'true');
      this.#isOpen = true;
      document.addEventListener('click', this.#boundHandleOutsideClick);
      document.addEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'select:opened', {});
      return this;
    }

    close(): this {
      this.#dropdown?.classList.add('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#isOpen = false;
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'select:closed', {});
      return this;
    }

    options(opts: SelectOption[]): this {
      this.#options = opts;
      if (this.#optionsList) {
        this.#optionsList.innerHTML = opts.map((opt, index) => `
          <div 
            data-option="${opt.value}" 
            role="option" 
            id="option-${index}"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
            ${opt.disabled ? 'disabled' : ''}
          >
            ${opt.label}
          </div>
        `).join('');
        
        // Re-attach listeners
        this.#el.querySelectorAll('[data-option]').forEach(opt => {
          opt.addEventListener('click', () => {
            const value = (opt as HTMLElement).dataset.option;
            if (value && !opt.hasAttribute('disabled')) {
              this.setValue(value);
              this.close();
            }
          });
        });
      }
      return this;
    }

    disable(state = true): this {
      if (this.#trigger) {
        (this.#trigger as HTMLButtonElement).disabled = state;
        this.#trigger.setAttribute('aria-disabled', String(state));
      }
      return this;
    }

    destroy(): void {
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: MultiSelect
  // =====================
  class MultiSelect implements MultiSelectInstance {
    #el: HTMLElement;
    #trigger: HTMLElement | null;
    #dropdown: HTMLElement | null;
    #optionsList: HTMLElement | null;
    #hiddenInput: HTMLInputElement | null;
    #tagsContainer: HTMLElement | null;
    #searchInput: HTMLInputElement | null;
    #options: SelectOption[] = [];
    #selectedValues: string[] = [];
    #isOpen = false;
    #searchable: boolean;
    #maxItems: number;
    #placeholder: string;
    #boundHandleOutsideClick: (e: MouseEvent) => void;
    #boundHandleKeydown: (e: KeyboardEvent) => void;
    #boundHandleSearch: () => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#trigger = el.querySelector('[data-multiselect-trigger]');
      this.#dropdown = el.querySelector('[data-multiselect-dropdown]');
      this.#optionsList = el.querySelector('[data-multiselect-options]');
      this.#hiddenInput = el.querySelector('input[type="hidden"]');
      this.#tagsContainer = el.querySelector('[data-multiselect-tags]');
      this.#searchInput = el.querySelector('[data-multiselect-search]');
      
      this.#searchable = el.dataset.searchable !== 'false';
      this.#maxItems = parseInt(el.dataset.maxItems || '0') || 0;
      this.#placeholder = el.dataset.placeholder || 'Selecione...';

      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#boundHandleSearch = this.#handleSearch.bind(this);

      this.#parseOptions();
      this.#parseInitialValues();
      this.#setupA11y();
      this.#setupListeners();
      this.#updateDisplay();
    }

    #parseOptions(): void {
      const optionEls = this.#el.querySelectorAll('[data-option]');
      this.#options = Array.from(optionEls).map(opt => ({
        value: (opt as HTMLElement).dataset.option || '',
        label: opt.textContent?.trim() || '',
        disabled: opt.hasAttribute('disabled')
      }));
    }

    #parseInitialValues(): void {
      // Parse from hidden input (comma-separated or JSON)
      if (this.#hiddenInput?.value) {
        try {
          this.#selectedValues = JSON.parse(this.#hiddenInput.value);
        } catch {
          this.#selectedValues = this.#hiddenInput.value.split(',').filter(v => v.trim());
        }
      }

      // Also check for pre-selected options
      this.#el.querySelectorAll('[data-option].selected, [data-option][aria-selected="true"]').forEach(opt => {
        const val = (opt as HTMLElement).dataset.option;
        if (val && !this.#selectedValues.includes(val)) {
          this.#selectedValues.push(val);
        }
      });
    }

    #setupA11y(): void {
      this.#trigger?.setAttribute('role', 'combobox');
      this.#trigger?.setAttribute('aria-haspopup', 'listbox');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#trigger?.setAttribute('aria-multiselectable', 'true');
      this.#optionsList?.setAttribute('role', 'listbox');
      this.#optionsList?.setAttribute('aria-multiselectable', 'true');

      this.#options.forEach((opt, index) => {
        const optEl = this.#el.querySelector(`[data-option="${opt.value}"]`);
        optEl?.setAttribute('role', 'option');
        optEl?.setAttribute('id', `multiselect-option-${index}`);
      });
    }

    #setupListeners(): void {
      this.#trigger?.addEventListener('click', (e) => {
        // Don't toggle if clicking on a tag remove button
        if ((e.target as HTMLElement).closest('[data-remove-tag]')) return;
        this.#isOpen ? this.close() : this.open();
      });
      
      this.#el.querySelectorAll('[data-option]').forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = (opt as HTMLElement).dataset.option;
          if (value && !opt.hasAttribute('disabled')) {
            this.toggle(value);
          }
        });
      });

      // Search input
      this.#searchInput?.addEventListener('input', this.#boundHandleSearch);
      this.#searchInput?.addEventListener('click', (e) => e.stopPropagation());

      // Select all / Clear all buttons
      this.#el.querySelector('[data-select-all]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectAll();
      });

      this.#el.querySelector('[data-clear-all]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clear();
      });
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#el.contains(e.target as Node)) {
        this.close();
      }
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
        this.#trigger?.focus();
      }
    }

    #handleSearch(): void {
      const query = this.#searchInput?.value.toLowerCase() || '';
      
      this.#el.querySelectorAll('[data-option]').forEach(opt => {
        const label = opt.textContent?.toLowerCase() || '';
        const matches = label.includes(query);
        (opt as HTMLElement).style.display = matches ? '' : 'none';
      });
    }

    #updateDisplay(): void {
      // Update hidden input
      if (this.#hiddenInput) {
        this.#hiddenInput.value = JSON.stringify(this.#selectedValues);
      }

      // Update tags display
      if (this.#tagsContainer) {
        if (this.#selectedValues.length === 0) {
          this.#tagsContainer.innerHTML = `<span class="text-gray-500 dark:text-gray-400">${this.#placeholder}</span>`;
        } else {
          const tags = this.#selectedValues.map(val => {
            const opt = this.#options.find(o => o.value === val);
            return `
              <span class="inline-flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg">
                ${opt?.label || val}
                <button type="button" data-remove-tag="${val}" class="hover:text-blue-900 dark:hover:text-blue-100 transition-colors" aria-label="Remover ${opt?.label || val}">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
            `;
          }).join('');
          this.#tagsContainer.innerHTML = tags;

          // Re-attach tag remove listeners
          this.#tagsContainer.querySelectorAll('[data-remove-tag]').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const val = (btn as HTMLElement).dataset.removeTag;
              if (val) this.remove(val);
            });
          });
        }
      }

      // Update option checkmarks
      this.#el.querySelectorAll('[data-option]').forEach(opt => {
        const value = (opt as HTMLElement).dataset.option;
        const isSelected = value ? this.#selectedValues.includes(value) : false;
        opt.classList.toggle('selected', isSelected);
        opt.setAttribute('aria-selected', String(isSelected));
        
        // Update checkbox if exists
        const checkbox = opt.querySelector('input[type="checkbox"]') as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = isSelected;
        }
      });

      // Update counter display if exists
      const counter = this.#el.querySelector('[data-multiselect-count]');
      if (counter) {
        counter.textContent = `${this.#selectedValues.length} selecionado${this.#selectedValues.length !== 1 ? 's' : ''}`;
      }
    }

    value(): string[] {
      return [...this.#selectedValues];
    }

    setValue(vals: string[]): this {
      this.#selectedValues = [...vals];
      this.#updateDisplay();
      emit(this.#el, 'multiselect:change', { values: this.#selectedValues });
      return this;
    }

    add(val: string): this {
      if (this.#maxItems > 0 && this.#selectedValues.length >= this.#maxItems) {
        emit(this.#el, 'multiselect:max-reached', { max: this.#maxItems });
        return this;
      }
      
      if (!this.#selectedValues.includes(val)) {
        this.#selectedValues.push(val);
        this.#updateDisplay();
        emit(this.#el, 'multiselect:added', { value: val, values: this.#selectedValues });
      }
      return this;
    }

    remove(val: string): this {
      const index = this.#selectedValues.indexOf(val);
      if (index > -1) {
        this.#selectedValues.splice(index, 1);
        this.#updateDisplay();
        emit(this.#el, 'multiselect:removed', { value: val, values: this.#selectedValues });
      }
      return this;
    }

    toggle(val: string): this {
      if (this.#selectedValues.includes(val)) {
        this.remove(val);
      } else {
        this.add(val);
      }
      return this;
    }

    clear(): this {
      this.#selectedValues = [];
      this.#updateDisplay();
      emit(this.#el, 'multiselect:cleared', {});
      return this;
    }

    selectAll(): this {
      const enabledOptions = this.#options
        .filter(o => !o.disabled)
        .map(o => o.value);
      
      if (this.#maxItems > 0) {
        this.#selectedValues = enabledOptions.slice(0, this.#maxItems);
      } else {
        this.#selectedValues = enabledOptions;
      }
      
      this.#updateDisplay();
      emit(this.#el, 'multiselect:select-all', { values: this.#selectedValues });
      return this;
    }

    open(): this {
      this.#dropdown?.classList.remove('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'true');
      this.#isOpen = true;
      
      // Focus search input if exists
      if (this.#searchInput) {
        this.#searchInput.value = '';
        this.#handleSearch();
        requestAnimationFrame(() => this.#searchInput?.focus());
      }
      
      document.addEventListener('click', this.#boundHandleOutsideClick);
      document.addEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'multiselect:opened', {});
      return this;
    }

    close(): this {
      this.#dropdown?.classList.add('hidden');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#isOpen = false;
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'multiselect:closed', {});
      return this;
    }

    options(opts: SelectOption[]): this {
      this.#options = opts;
      if (this.#optionsList) {
        this.#optionsList.innerHTML = opts.map((opt, index) => `
          <div 
            data-option="${opt.value}" 
            role="option" 
            id="multiselect-option-${index}"
            aria-selected="${this.#selectedValues.includes(opt.value)}"
            class="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${this.#selectedValues.includes(opt.value) ? 'selected bg-blue-50 dark:bg-blue-900/30' : ''}"
            ${opt.disabled ? 'disabled' : ''}
          >
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${this.#selectedValues.includes(opt.value) ? 'checked' : ''} ${opt.disabled ? 'disabled' : ''}>
            <span>${opt.label}</span>
          </div>
        `).join('');
        
        // Re-attach listeners
        this.#el.querySelectorAll('[data-option]').forEach(opt => {
          opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = (opt as HTMLElement).dataset.option;
            if (value && !opt.hasAttribute('disabled')) {
              this.toggle(value);
            }
          });
        });
      }
      return this;
    }

    disable(state = true): this {
      if (this.#trigger) {
        (this.#trigger as HTMLButtonElement).disabled = state;
        this.#trigger.setAttribute('aria-disabled', String(state));
      }
      return this;
    }

    destroy(): void {
      this.#searchInput?.removeEventListener('input', this.#boundHandleSearch);
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Drawer
  // =====================
  class Drawer implements DrawerInstance {
    #el: HTMLElement;
    #overlay: HTMLElement | null;
    #content: HTMLElement | null;
    #position: 'left' | 'right' | 'top' | 'bottom';
    #duration: number;
    #isOpen = false;
    #previousActiveElement: Element | null = null;
    #boundHandleKeydown: (e: KeyboardEvent) => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#overlay = el.querySelector('[data-drawer-overlay]');
      this.#content = el.querySelector('[data-drawer-content]');
      this.#position = (el.dataset.position as 'left' | 'right' | 'top' | 'bottom') || 'left';
      this.#duration = parseInt(el.dataset.duration || '400');
      
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y(): void {
      this.#el.setAttribute('role', 'dialog');
      this.#el.setAttribute('aria-modal', 'true');
      this.#content?.setAttribute('tabindex', '-1');
    }

    #setupListeners(): void {
      // Overlay click
      this.#overlay?.addEventListener('click', () => this.close());
      
      // Close buttons
      this.#el.querySelectorAll('[data-drawer-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // External triggers
      document.querySelectorAll(`[data-drawer-toggle="${this.#el.id}"]`).forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
      document.querySelectorAll(`[data-drawer-open="${this.#el.id}"]`).forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
      }
    }

    #getTranslateClass(): { hidden: string; visible: string } {
      const translations: Record<string, { hidden: string; visible: string }> = {
        left: { hidden: '-translate-x-full', visible: 'translate-x-0' },
        right: { hidden: 'translate-x-full', visible: 'translate-x-0' },
        top: { hidden: '-translate-y-full', visible: 'translate-y-0' },
        bottom: { hidden: 'translate-y-full', visible: 'translate-y-0' }
      };
      return translations[this.#position];
    }

    open(): this {
      if (this.#isOpen) return this;
      
      this.#previousActiveElement = document.activeElement;
      this.#isOpen = true;
      
      // Show overlay
      this.#el.classList.remove('hidden', 'pointer-events-none');
      this.#overlay?.classList.remove('opacity-0');
      this.#overlay?.classList.add('opacity-100');
      
      // Slide in content
      const translate = this.#getTranslateClass();
      this.#content?.classList.remove(translate.hidden);
      this.#content?.classList.add(translate.visible);
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      // Focus content
      requestAnimationFrame(() => this.#content?.focus());
      
      document.addEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'drawer:opened', { position: this.#position });
      
      return this;
    }

    close(): this {
      if (!this.#isOpen) return this;
      
      this.#isOpen = false;
      
      // Slide out content
      const translate = this.#getTranslateClass();
      this.#content?.classList.remove(translate.visible);
      this.#content?.classList.add(translate.hidden);
      
      // Fade out overlay
      this.#overlay?.classList.remove('opacity-100');
      this.#overlay?.classList.add('opacity-0');
      
      // Hide after animation
      setTimeout(() => {
        if (!this.#isOpen) {
          this.#el.classList.add('hidden', 'pointer-events-none');
        }
      }, this.#duration);
      
      // Unlock scroll
      document.body.style.overflow = '';
      
      // Restore focus
      if (this.#previousActiveElement instanceof HTMLElement) {
        this.#previousActiveElement.focus();
      }
      
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      emit(this.#el, 'drawer:closed', { position: this.#position });
      
      return this;
    }

    toggle(): this {
      return this.#isOpen ? this.close() : this.open();
    }

    isOpen(): boolean {
      return this.#isOpen;
    }

    destroy(): void {
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Popover
  // =====================
  class Popover implements PopoverInstance {
    #el: HTMLElement;
    #trigger: HTMLElement | null;
    #content: HTMLElement | null;
    #position: 'top' | 'bottom' | 'left' | 'right';
    #isOpen = false;
    #boundHandleOutsideClick: (e: MouseEvent) => void;
    #boundHandleKeydown: (e: KeyboardEvent) => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#trigger = el.querySelector('[data-popover-trigger]');
      this.#content = el.querySelector('[data-popover-content]');
      this.#position = (el.dataset.position as 'top' | 'bottom' | 'left' | 'right') || 'bottom';
      
      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      
      this.#setupA11y();
      this.#setupListeners();
    }

    #setupA11y(): void {
      this.#trigger?.setAttribute('aria-haspopup', 'true');
      this.#trigger?.setAttribute('aria-expanded', 'false');
      this.#content?.setAttribute('role', 'dialog');
    }

    #setupListeners(): void {
      this.#trigger?.addEventListener('click', () => this.toggle());
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#el.contains(e.target as Node)) {
        this.hide();
      }
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.hide();
        this.#trigger?.focus();
      }
    }

    #positionContent(): void {
      if (!this.#content || !this.#trigger) return;
      
      // Reset position
      this.#content.style.top = '';
      this.#content.style.bottom = '';
      this.#content.style.left = '';
      this.#content.style.right = '';
      
      const gap = 8;
      
      switch (this.#position) {
        case 'top':
          this.#content.style.bottom = '100%';
          this.#content.style.left = '50%';
          this.#content.style.transform = 'translateX(-50%)';
          this.#content.style.marginBottom = `${gap}px`;
          break;
        case 'bottom':
          this.#content.style.top = '100%';
          this.#content.style.left = '50%';
          this.#content.style.transform = 'translateX(-50%)';
          this.#content.style.marginTop = `${gap}px`;
          break;
        case 'left':
          this.#content.style.right = '100%';
          this.#content.style.top = '50%';
          this.#content.style.transform = 'translateY(-50%)';
          this.#content.style.marginRight = `${gap}px`;
          break;
        case 'right':
          this.#content.style.left = '100%';
          this.#content.style.top = '50%';
          this.#content.style.transform = 'translateY(-50%)';
          this.#content.style.marginLeft = `${gap}px`;
          break;
      }
    }

    show(): this {
      if (this.#isOpen) return this;
      
      this.#isOpen = true;
      this.#positionContent();
      this.#content?.classList.remove('hidden', 'opacity-0', 'scale-95');
      this.#content?.classList.add('opacity-100', 'scale-100');
      this.#trigger?.setAttribute('aria-expanded', 'true');
      
      setTimeout(() => {
        document.addEventListener('click', this.#boundHandleOutsideClick);
        document.addEventListener('keydown', this.#boundHandleKeydown);
      }, 0);
      
      emit(this.#el, 'popover:shown', { position: this.#position });
      return this;
    }

    hide(): this {
      if (!this.#isOpen) return this;
      
      this.#isOpen = false;
      this.#content?.classList.add('opacity-0', 'scale-95');
      this.#content?.classList.remove('opacity-100', 'scale-100');
      
      setTimeout(() => {
        if (!this.#isOpen) {
          this.#content?.classList.add('hidden');
        }
      }, 150);
      
      this.#trigger?.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      
      emit(this.#el, 'popover:hidden', {});
      return this;
    }

    toggle(): this {
      return this.#isOpen ? this.hide() : this.show();
    }

    update(content: string | HTMLElement): this {
      if (this.#content) {
        if (typeof content === 'string') {
          this.#content.innerHTML = content;
        } else {
          this.#content.replaceChildren(content);
        }
      }
      return this;
    }

    destroy(): void {
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Progress
  // =====================
  class Progress implements ProgressInstance {
    #el: HTMLElement;
    #bar: HTMLElement | null;
    #label: HTMLElement | null;
    #currentValue = 0;
    #max = 100;
    #isIndeterminate = false;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#bar = el.querySelector('[data-progress-bar]');
      this.#label = el.querySelector('[data-progress-label]');
      this.#max = parseInt(el.dataset.max || '100');
      this.#currentValue = parseInt(el.dataset.value || '0');
      
      this.#setupA11y();
      this.#updateDisplay();
    }

    #setupA11y(): void {
      this.#el.setAttribute('role', 'progressbar');
      this.#el.setAttribute('aria-valuemin', '0');
      this.#el.setAttribute('aria-valuemax', String(this.#max));
      this.#el.setAttribute('aria-valuenow', String(this.#currentValue));
    }

    #updateDisplay(): void {
      if (this.#isIndeterminate) {
        this.#el.removeAttribute('aria-valuenow');
        this.#bar?.classList.add('animate-pulse');
        if (this.#bar) this.#bar.style.width = '100%';
        if (this.#label) this.#label.textContent = '';
        return;
      }

      this.#bar?.classList.remove('animate-pulse');
      const percent = Math.min(100, Math.max(0, (this.#currentValue / this.#max) * 100));
      
      if (this.#bar) {
        this.#bar.style.width = `${percent}%`;
        this.#bar.style.transition = 'width 0.3s ease-out';
      }
      
      if (this.#label) {
        this.#label.textContent = `${Math.round(percent)}%`;
      }
      
      this.#el.setAttribute('aria-valuenow', String(this.#currentValue));
      emit(this.#el, 'progress:change', { value: this.#currentValue, percent });
    }

    value(percent?: number): number | this {
      if (percent === undefined) return this.#currentValue;
      
      this.#currentValue = Math.min(this.#max, Math.max(0, percent));
      this.#isIndeterminate = false;
      this.#updateDisplay();
      return this;
    }

    increment(amount = 10): this {
      return this.value(this.#currentValue + amount) as this;
    }

    decrement(amount = 10): this {
      return this.value(this.#currentValue - amount) as this;
    }

    complete(): this {
      this.#currentValue = this.#max;
      this.#isIndeterminate = false;
      this.#updateDisplay();
      emit(this.#el, 'progress:complete', {});
      return this;
    }

    reset(): this {
      this.#currentValue = 0;
      this.#isIndeterminate = false;
      this.#updateDisplay();
      emit(this.#el, 'progress:reset', {});
      return this;
    }

    indeterminate(state = true): this {
      this.#isIndeterminate = state;
      this.#updateDisplay();
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Skeleton
  // =====================
  class Skeleton implements SkeletonInstance {
    #el: HTMLElement;
    #target: HTMLElement | null;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#target = el.dataset.target ? document.querySelector(el.dataset.target) : null;
    }

    show(): this {
      this.#el.classList.remove('hidden');
      if (this.#target) {
        this.#target.classList.add('hidden');
      }
      emit(this.#el, 'skeleton:shown', {});
      return this;
    }

    hide(): this {
      this.#el.classList.add('hidden');
      if (this.#target) {
        this.#target.classList.remove('hidden');
      }
      emit(this.#el, 'skeleton:hidden', {});
      return this;
    }

    toggle(): this {
      return this.#el.classList.contains('hidden') ? this.show() : this.hide();
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Clipboard
  // =====================
  class Clipboard implements ClipboardInstance {
    #el: HTMLElement;
    #target: HTMLInputElement | HTMLTextAreaElement | null;
    #text: string;
    #successMessage: string;
    #errorMessage: string;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#target = el.dataset.clipboardTarget 
        ? document.querySelector(el.dataset.clipboardTarget) 
        : null;
      this.#text = el.dataset.clipboardText || '';
      this.#successMessage = el.dataset.successMessage || 'Copiado!';
      this.#errorMessage = el.dataset.errorMessage || 'Erro ao copiar';
      
      this.#setupListeners();
    }

    #setupListeners(): void {
      this.#el.addEventListener('click', () => this.copy());
    }

    async copy(): Promise<boolean> {
      const textToCopy = this.#target?.value || this.#text || this.#el.textContent?.trim() || '';
      return this.copyText(textToCopy);
    }

    async copyText(text: string): Promise<boolean> {
      try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const originalContent = this.#el.innerHTML;
        this.#el.innerHTML = `
          <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          ${this.#successMessage}
        `;
        this.#el.classList.add('text-green-600');
        
        setTimeout(() => {
          this.#el.innerHTML = originalContent;
          this.#el.classList.remove('text-green-600');
        }, 2000);
        
        emit(this.#el, 'clipboard:copied', { text });
        return true;
      } catch {
        emit(this.#el, 'clipboard:error', { text });
        toast.error(this.#errorMessage);
        return false;
      }
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Stepper
  // =====================
  class Stepper implements StepperInstance {
    #el: HTMLElement;
    #steps: NodeListOf<HTMLElement>;
    #panels: NodeListOf<HTMLElement>;
    #currentStep = 1;
    #totalSteps: number;
    #completedSteps: Set<number> = new Set();
    #linear: boolean;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#steps = el.querySelectorAll('[data-step]');
      this.#panels = el.querySelectorAll('[data-step-panel]');
      this.#totalSteps = this.#steps.length;
      this.#linear = el.dataset.linear !== 'false';
      this.#currentStep = parseInt(el.dataset.initialStep || '1');
      
      this.#setupA11y();
      this.#setupListeners();
      this.#updateDisplay();
    }

    #setupA11y(): void {
      this.#el.setAttribute('role', 'navigation');
      this.#el.setAttribute('aria-label', 'Progresso');
      
      this.#steps.forEach((step, index) => {
        step.setAttribute('role', 'tab');
        step.setAttribute('aria-selected', String(index + 1 === this.#currentStep));
      });
      
      this.#panels.forEach(panel => {
        panel.setAttribute('role', 'tabpanel');
      });
    }

    #setupListeners(): void {
      this.#steps.forEach((step, index) => {
        step.addEventListener('click', () => {
          if (!this.#linear || this.canGoTo(index + 1)) {
            this.goto(index + 1);
          }
        });
      });

      // Next/Prev buttons
      this.#el.querySelectorAll('[data-step-next]').forEach(btn => {
        btn.addEventListener('click', () => this.next());
      });
      this.#el.querySelectorAll('[data-step-prev]').forEach(btn => {
        btn.addEventListener('click', () => this.prev());
      });
    }

    canGoTo(step: number): boolean {
      if (!this.#linear) return true;
      // Can go to completed steps or next uncompleted step
      return this.#completedSteps.has(step) || step <= Math.max(...Array.from(this.#completedSteps), 0) + 1;
    }

    #updateDisplay(): void {
      this.#steps.forEach((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === this.#currentStep;
        const isCompleted = this.#completedSteps.has(stepNum);
        
        step.classList.toggle('active', isActive);
        step.classList.toggle('completed', isCompleted);
        step.setAttribute('aria-selected', String(isActive));
        step.setAttribute('aria-current', isActive ? 'step' : 'false');
        
        // Update step indicator
        const indicator = step.querySelector('[data-step-indicator]');
        if (indicator) {
          if (isCompleted) {
            indicator.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            `;
          } else {
            indicator.textContent = String(stepNum);
          }
        }
      });

      this.#panels.forEach((panel, index) => {
        const isActive = index + 1 === this.#currentStep;
        panel.classList.toggle('hidden', !isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });

      // Update nav buttons
      this.#el.querySelectorAll('[data-step-prev]').forEach(btn => {
        (btn as HTMLButtonElement).disabled = !this.canPrev();
      });
    }

    current(): number {
      return this.#currentStep;
    }

    goto(step: number): this {
      if (step < 1 || step > this.#totalSteps) return this;
      if (this.#linear && !this.canGoTo(step)) return this;
      
      const prevStep = this.#currentStep;
      this.#currentStep = step;
      this.#updateDisplay();
      
      emit(this.#el, 'stepper:change', { 
        from: prevStep, 
        to: step, 
        completed: Array.from(this.#completedSteps) 
      });
      
      return this;
    }

    next(): this {
      if (this.canNext()) {
        this.complete(this.#currentStep);
        this.goto(this.#currentStep + 1);
      }
      return this;
    }

    prev(): this {
      if (this.canPrev()) {
        this.goto(this.#currentStep - 1);
      }
      return this;
    }

    complete(step?: number): this {
      const stepToComplete = step ?? this.#currentStep;
      this.#completedSteps.add(stepToComplete);
      this.#updateDisplay();
      
      emit(this.#el, 'stepper:completed', { 
        step: stepToComplete,
        allCompleted: this.#completedSteps.size === this.#totalSteps
      });
      
      return this;
    }

    reset(): this {
      this.#completedSteps.clear();
      this.#currentStep = 1;
      this.#updateDisplay();
      emit(this.#el, 'stepper:reset', {});
      return this;
    }

    canNext(): boolean {
      return this.#currentStep < this.#totalSteps;
    }

    canPrev(): boolean {
      return this.#currentStep > 1;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: FormValidator
  // =====================
  class FormValidator implements FormValidatorInstance {
    #el: HTMLFormElement;
    #fields: Map<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, string> = new Map();
    #errors: Record<string, string[]> = {};
    #validators: Record<string, (value: string, param?: string) => boolean | string> = {
      required: (v) => v.trim().length > 0 || 'Campo obrigatório',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido',
      min: (v, p) => v.length >= parseInt(p || '0') || `Mínimo ${p} caracteres`,
      max: (v, p) => v.length <= parseInt(p || '999') || `Máximo ${p} caracteres`,
      minValue: (v, p) => parseFloat(v) >= parseFloat(p || '0') || `Valor mínimo: ${p}`,
      maxValue: (v, p) => parseFloat(v) <= parseFloat(p || '999999') || `Valor máximo: ${p}`,
      pattern: (v, p) => new RegExp(p || '').test(v) || 'Formato inválido',
      url: (v) => /^https?:\/\/.+/.test(v) || 'URL inválida',
      numeric: (v) => /^\d+$/.test(v) || 'Apenas números',
      alpha: (v) => /^[a-zA-Z]+$/.test(v) || 'Apenas letras',
      alphanumeric: (v) => /^[a-zA-Z0-9]+$/.test(v) || 'Apenas letras e números',
      phone: (v) => /^[\d\s\-\+\(\)]+$/.test(v) || 'Telefone inválido',
      cpf: (v) => this.#validateCPF(v) || 'CPF inválido',
      cnpj: (v) => this.#validateCNPJ(v) || 'CNPJ inválido',
      date: (v) => !isNaN(Date.parse(v)) || 'Data inválida',
      confirmed: (v, p) => {
        const confirmField = this.#el.querySelector(`[name="${p}"]`) as HTMLInputElement;
        return v === confirmField?.value || 'Campos não conferem';
      }
    };

    constructor(el: HTMLFormElement) {
      this.#el = el;
      this.#parseFields();
      this.#setupListeners();
    }

    #validateCPF(cpf: string): boolean {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
      let sum = 0, remainder;
      for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf[9])) return false;
      sum = 0;
      for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      return remainder === parseInt(cpf[10]);
    }

    #validateCNPJ(cnpj: string): boolean {
      cnpj = cnpj.replace(/\D/g, '');
      if (cnpj.length !== 14) return false;
      const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      for (let i = 0; i < 12; i++) sum += parseInt(cnpj[i]) * weights1[i];
      let remainder = sum % 11;
      if (parseInt(cnpj[12]) !== (remainder < 2 ? 0 : 11 - remainder)) return false;
      sum = 0;
      for (let i = 0; i < 13; i++) sum += parseInt(cnpj[i]) * weights2[i];
      remainder = sum % 11;
      return parseInt(cnpj[13]) === (remainder < 2 ? 0 : 11 - remainder);
    }

    #parseFields(): void {
      this.#el.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[data-validate]').forEach(field => {
        const rules = field.dataset.validate || '';
        this.#fields.set(field, rules);
      });
    }

    #setupListeners(): void {
      this.#el.addEventListener('submit', (e) => {
        if (!this.validate()) {
          e.preventDefault();
          emit(this.#el, 'form:invalid', { errors: this.#errors });
        } else {
          emit(this.#el, 'form:valid', {});
        }
      });

      // Real-time validation on blur
      this.#fields.forEach((_, field) => {
        field.addEventListener('blur', () => this.#validateField(field));
        field.addEventListener('input', () => {
          if (this.#errors[field.name]?.length) {
            this.#validateField(field);
          }
        });
      });
    }

    #validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
      const rules = this.#fields.get(field) || '';
      const value = field.value;
      const fieldErrors: string[] = [];

      rules.split('|').forEach(rule => {
        const [ruleName, param] = rule.split(':');
        const validator = this.#validators[ruleName];
        
        if (validator) {
          const result = validator(value, param);
          if (result !== true && typeof result === 'string') {
            fieldErrors.push(result);
          }
        }
      });

      this.#errors[field.name] = fieldErrors;
      this.#showFieldError(field, fieldErrors);
      
      return fieldErrors.length === 0;
    }

    #showFieldError(field: HTMLElement, errors: string[]): void {
      const hasError = errors.length > 0;
      field.classList.toggle('border-red-500', hasError);
      field.classList.toggle('border-gray-300', !hasError);
      field.setAttribute('aria-invalid', String(hasError));

      // Find or create error container
      let errorEl = field.parentElement?.querySelector('.field-error');
      if (!errorEl && hasError) {
        errorEl = document.createElement('p');
        errorEl.className = 'field-error text-red-500 text-sm mt-1';
        field.parentElement?.appendChild(errorEl);
      }
      
      if (errorEl) {
        errorEl.textContent = errors[0] || '';
        (errorEl as HTMLElement).style.display = hasError ? 'block' : 'none';
      }
    }

    validate(): boolean {
      this.#errors = {};
      let isValid = true;

      this.#fields.forEach((_, field) => {
        if (!this.#validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        // Focus first invalid field
        const firstInvalid = this.#el.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstInvalid?.focus();
      }

      return isValid;
    }

    isValid(): boolean {
      return Object.values(this.#errors).every(e => e.length === 0);
    }

    errors(): Record<string, string[]> {
      return { ...this.#errors };
    }

    reset(): this {
      this.#errors = {};
      this.#fields.forEach((_, field) => {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
        field.removeAttribute('aria-invalid');
        field.parentElement?.querySelector('.field-error')?.remove();
      });
      return this;
    }

    setRules(fieldName: string, rules: string): this {
      const field = this.#el.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
      if (field) {
        this.#fields.set(field, rules);
        field.dataset.validate = rules;
      }
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: LazyLoad
  // =====================
  class LazyLoad implements LazyLoadInstance {
    #el: HTMLElement;
    #src: string;
    #loaded = false;
    #observer: IntersectionObserver | null = null;
    #placeholder: string;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#src = el.dataset.src || '';
      this.#placeholder = el.dataset.placeholder || '';
      
      this.#setupObserver();
    }

    #setupObserver(): void {
      this.#observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.#loaded) {
            this.load();
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      this.#observer.observe(this.#el);
    }

    load(): this {
      if (this.#loaded || !this.#src) return this;

      const isImage = this.#el.tagName === 'IMG';
      const isIframe = this.#el.tagName === 'IFRAME';
      const isVideo = this.#el.tagName === 'VIDEO';

      if (isImage || isIframe || isVideo) {
        (this.#el as HTMLImageElement).src = this.#src;
        
        if (isImage) {
          (this.#el as HTMLImageElement).onload = () => {
            this.#el.classList.remove('opacity-0');
            this.#el.classList.add('opacity-100', 'transition-opacity', 'duration-300');
            emit(this.#el, 'lazy:loaded', { src: this.#src });
          };
          (this.#el as HTMLImageElement).onerror = () => {
            emit(this.#el, 'lazy:error', { src: this.#src });
          };
        }
      } else {
        // For background images
        this.#el.style.backgroundImage = `url(${this.#src})`;
        emit(this.#el, 'lazy:loaded', { src: this.#src });
      }

      this.#loaded = true;
      this.#observer?.disconnect();
      
      return this;
    }

    unload(): this {
      const isImage = this.#el.tagName === 'IMG';
      
      if (isImage) {
        (this.#el as HTMLImageElement).src = this.#placeholder;
      } else {
        this.#el.style.backgroundImage = this.#placeholder ? `url(${this.#placeholder})` : 'none';
      }
      
      this.#loaded = false;
      this.#setupObserver();
      
      return this;
    }

    isLoaded(): boolean {
      return this.#loaded;
    }

    destroy(): void {
      this.#observer?.disconnect();
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: InfiniteScroll
  // =====================
  class InfiniteScroll implements InfiniteScrollInstance {
    #el: HTMLElement;
    #container: HTMLElement;
    #loader: (() => Promise<string>) | null = null;
    #loading = false;
    #hasMore = true;
    #observer: IntersectionObserver | null = null;
    #sentinel: HTMLElement | null = null;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#container = el.querySelector('[data-infinite-container]') || el;
      
      this.#createSentinel();
      this.#setupObserver();
    }

    #createSentinel(): void {
      this.#sentinel = document.createElement('div');
      this.#sentinel.className = 'infinite-scroll-sentinel h-4';
      this.#sentinel.setAttribute('aria-hidden', 'true');
      this.#el.appendChild(this.#sentinel);
    }

    #setupObserver(): void {
      if (!this.#sentinel) return;

      this.#observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.#loading && this.#hasMore) {
            this.load();
          }
        });
      }, {
        rootMargin: '100px',
        threshold: 0
      });

      this.#observer.observe(this.#sentinel);
    }

    async load(): Promise<void> {
      if (this.#loading || !this.#hasMore || !this.#loader) return;

      this.#loading = true;
      emit(this.#el, 'infinite:loading', {});

      // Show loading indicator
      const loadingEl = document.createElement('div');
      loadingEl.className = 'infinite-scroll-loading flex justify-center py-4';
      loadingEl.innerHTML = `
        <svg class="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
      this.#sentinel?.before(loadingEl);

      try {
        const html = await this.#loader();
        
        if (html.trim()) {
          this.#container.insertAdjacentHTML('beforeend', html);
          emit(this.#el, 'infinite:loaded', {});
        } else {
          this.#hasMore = false;
          emit(this.#el, 'infinite:end', {});
        }
      } catch (error) {
        emit(this.#el, 'infinite:error', { error });
      } finally {
        loadingEl.remove();
        this.#loading = false;
      }
    }

    reset(): this {
      this.#container.innerHTML = '';
      this.#hasMore = true;
      this.#loading = false;
      
      if (this.#sentinel) {
        this.#el.appendChild(this.#sentinel);
      }
      
      return this;
    }

    setLoader(fn: () => Promise<string>): this {
      this.#loader = fn;
      return this;
    }

    hasMore(): boolean {
      return this.#hasMore;
    }

    destroy(): void {
      this.#observer?.disconnect();
      this.#sentinel?.remove();
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: DatePicker
  // =====================
  class DatePicker implements DatePickerInstance {
    #el: HTMLInputElement;
    #wrapper: HTMLElement;
    #picker: HTMLElement | null = null;
    #currentDate: Date;
    #selectedDate: Date | null = null;
    #minDate: Date | null = null;
    #maxDate: Date | null = null;
    #isOpen = false;
    #format: string;
    #boundHandleOutsideClick: (e: MouseEvent) => void;

    constructor(el: HTMLElement) {
      // If element is a div, create an input inside it
      if (el.tagName === 'DIV') {
        this.#wrapper = el;
        this.#wrapper.style.position = 'relative';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
        input.placeholder = el.dataset.placeholder || 'Selecione uma data';
        input.readOnly = true;
        if (el.dataset.value) input.value = el.dataset.value;
        el.appendChild(input);
        this.#el = input;
        
        // Copy dataset from wrapper to input for reference
        Object.assign(this.#el.dataset, el.dataset);
      } else {
        this.#el = el as HTMLInputElement;
        this.#wrapper = el.parentElement || el;
      }
      
      this.#currentDate = new Date();
      this.#format = this.#el.dataset.format || 'dd/mm/yyyy';
      
      if (this.#el.value) {
        this.#selectedDate = this.#parseDate(this.#el.value);
      }
      if (this.#el.dataset.minDate || this.#el.dataset.min) {
        this.#minDate = this.#parseDate(this.#el.dataset.minDate || this.#el.dataset.min || '');
      }
      if (this.#el.dataset.maxDate || this.#el.dataset.max) {
        this.#maxDate = this.#parseDate(this.#el.dataset.maxDate || this.#el.dataset.max || '');
      }

      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#setupListeners();
    }

    #parseDate(str: string): Date | null {
      const parts = str.split(/[-\/]/);
      if (parts.length === 3) {
        if (this.#format.startsWith('dd')) {
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        } else {
          return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
      }
      return null;
    }

    #formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      if (this.#format === 'yyyy-mm-dd') return `${year}-${month}-${day}`;
      return `${day}/${month}/${year}`;
    }

    #setupListeners(): void {
      this.#el.addEventListener('focus', () => this.open());
      this.#el.addEventListener('click', () => this.open());
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#picker?.contains(e.target as Node) && e.target !== this.#el) {
        this.close();
      }
    }

    #createPicker(): HTMLElement {
      const picker = document.createElement('div');
      picker.className = 'absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-72';
      picker.innerHTML = this.#renderCalendar();
      return picker;
    }

    #renderCalendar(): string {
      const year = this.#currentDate.getFullYear();
      const month = this.#currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

      let html = `
        <div class="flex items-center justify-between mb-4">
          <button type="button" data-prev-month class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="font-semibold dark:text-white">${monthNames[month]} ${year}</span>
          <button type="button" data-next-month class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${dayNames.map(d => `<div class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">${d}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 gap-1">
      `;

      // Empty cells for days before first of month
      for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
      }

      // Day cells
      const today = new Date();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isSelected = this.#selectedDate && 
          date.getDate() === this.#selectedDate.getDate() &&
          date.getMonth() === this.#selectedDate.getMonth() &&
          date.getFullYear() === this.#selectedDate.getFullYear();
        const isToday = date.toDateString() === today.toDateString();
        const isDisabled = (this.#minDate && date < this.#minDate) || (this.#maxDate && date > this.#maxDate);

        let classes = 'w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-colors ';
        if (isDisabled) {
          classes += 'text-gray-300 dark:text-gray-600 cursor-not-allowed';
        } else if (isSelected) {
          classes += 'bg-blue-600 text-white font-semibold';
        } else if (isToday) {
          classes += 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 cursor-pointer';
        } else {
          classes += 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-gray-300';
        }

        html += `<button type="button" data-day="${day}" class="${classes}" ${isDisabled ? 'disabled' : ''}>${day}</button>`;
      }

      html += `</div>`;
      return html;
    }

    #attachPickerListeners(): void {
      if (!this.#picker) return;

      this.#picker.querySelector('[data-prev-month]')?.addEventListener('click', () => {
        this.#currentDate.setMonth(this.#currentDate.getMonth() - 1);
        this.#picker!.innerHTML = this.#renderCalendar();
        this.#attachPickerListeners();
      });

      this.#picker.querySelector('[data-next-month]')?.addEventListener('click', () => {
        this.#currentDate.setMonth(this.#currentDate.getMonth() + 1);
        this.#picker!.innerHTML = this.#renderCalendar();
        this.#attachPickerListeners();
      });

      this.#picker.querySelectorAll('[data-day]').forEach(btn => {
        btn.addEventListener('click', () => {
          const day = parseInt((btn as HTMLElement).dataset.day || '1');
          this.#selectedDate = new Date(this.#currentDate.getFullYear(), this.#currentDate.getMonth(), day);
          this.#el.value = this.#formatDate(this.#selectedDate);
          emit(this.#el, 'datepicker:change', { date: this.#selectedDate, formatted: this.#el.value });
          this.close();
        });
      });
    }

    value(): string {
      return this.#el.value;
    }

    setValue(date: string | Date): this {
      if (typeof date === 'string') {
        this.#selectedDate = this.#parseDate(date);
      } else {
        this.#selectedDate = date;
      }
      
      if (this.#selectedDate) {
        this.#el.value = this.#formatDate(this.#selectedDate);
        this.#currentDate = new Date(this.#selectedDate);
      }
      
      return this;
    }

    open(): this {
      if (this.#isOpen) return this;
      
      this.#isOpen = true;
      this.#picker = this.#createPicker();
      
      // Position relative to wrapper
      this.#wrapper.appendChild(this.#picker);
      
      this.#attachPickerListeners();
      
      setTimeout(() => {
        document.addEventListener('click', this.#boundHandleOutsideClick);
      }, 0);
      
      emit(this.#el, 'datepicker:opened', {});
      return this;
    }

    close(): this {
      if (!this.#isOpen) return this;
      
      this.#isOpen = false;
      this.#picker?.remove();
      this.#picker = null;
      
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      emit(this.#el, 'datepicker:closed', {});
      return this;
    }

    min(date: string | Date): this {
      this.#minDate = typeof date === 'string' ? this.#parseDate(date) : date;
      return this;
    }

    max(date: string | Date): this {
      this.#maxDate = typeof date === 'string' ? this.#parseDate(date) : date;
      return this;
    }

    disable(state = true): this {
      this.#el.disabled = state;
      if (state) this.close();
      return this;
    }

    destroy(): void {
      this.close();
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: DateRangePicker
  // =====================
  class DateRangePicker implements DateRangePickerInstance {
    #el: HTMLElement;
    #wrapper: HTMLElement;
    #startInput: HTMLInputElement;
    #endInput: HTMLInputElement;
    #picker: HTMLElement | null = null;
    #currentDate: Date;
    #startDate: Date | null = null;
    #endDate: Date | null = null;
    #hoverDate: Date | null = null;
    #minDate: Date | null = null;
    #maxDate: Date | null = null;
    #isOpen = false;
    #format: string;
    #selectingEnd = false;
    #presets: { label: string; getValue: () => [Date, Date] }[];
    #boundHandleOutsideClick: (e: MouseEvent) => void;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#wrapper = el;
      this.#wrapper.style.position = 'relative';
      this.#format = el.dataset.format || 'dd/mm/yyyy';
      
      // Create inputs container
      const inputsContainer = document.createElement('div');
      inputsContainer.className = 'flex items-center gap-2';
      
      // Start input
      this.#startInput = document.createElement('input');
      this.#startInput.type = 'text';
      this.#startInput.className = 'flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm';
      this.#startInput.placeholder = el.dataset.startPlaceholder || 'Data início';
      this.#startInput.readOnly = true;
      
      // Arrow
      const arrow = document.createElement('span');
      arrow.className = 'text-gray-400';
      arrow.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>';
      
      // End input
      this.#endInput = document.createElement('input');
      this.#endInput.type = 'text';
      this.#endInput.className = 'flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm';
      this.#endInput.placeholder = el.dataset.endPlaceholder || 'Data fim';
      this.#endInput.readOnly = true;
      
      inputsContainer.appendChild(this.#startInput);
      inputsContainer.appendChild(arrow);
      inputsContainer.appendChild(this.#endInput);
      el.appendChild(inputsContainer);
      
      this.#currentDate = new Date();
      
      // Parse initial values
      if (el.dataset.startValue) {
        this.#startDate = this.#parseDate(el.dataset.startValue);
        if (this.#startDate) this.#startInput.value = this.#formatDate(this.#startDate);
      }
      if (el.dataset.endValue) {
        this.#endDate = this.#parseDate(el.dataset.endValue);
        if (this.#endDate) this.#endInput.value = this.#formatDate(this.#endDate);
      }
      if (el.dataset.min) {
        this.#minDate = this.#parseDate(el.dataset.min);
      }
      if (el.dataset.max) {
        this.#maxDate = this.#parseDate(el.dataset.max);
      }
      
      // Presets
      this.#presets = [
        { label: 'Hoje', getValue: () => { const d = new Date(); return [d, d]; } },
        { label: 'Últimos 7 dias', getValue: () => { const e = new Date(); const s = new Date(); s.setDate(s.getDate() - 6); return [s, e]; } },
        { label: 'Últimos 30 dias', getValue: () => { const e = new Date(); const s = new Date(); s.setDate(s.getDate() - 29); return [s, e]; } },
        { label: 'Este mês', getValue: () => { const now = new Date(); return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)]; } },
        { label: 'Mês passado', getValue: () => { const now = new Date(); return [new Date(now.getFullYear(), now.getMonth() - 1, 1), new Date(now.getFullYear(), now.getMonth(), 0)]; } },
      ];
      
      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#setupListeners();
    }

    #parseDate(str: string): Date | null {
      const parts = str.split(/[-\/]/);
      if (parts.length === 3) {
        if (this.#format.startsWith('dd')) {
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        } else {
          return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
      }
      return null;
    }

    #formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      if (this.#format === 'yyyy-mm-dd') return `${year}-${month}-${day}`;
      return `${day}/${month}/${year}`;
    }

    #setupListeners(): void {
      this.#startInput.addEventListener('click', () => { this.#selectingEnd = false; this.open(); });
      this.#endInput.addEventListener('click', () => { this.#selectingEnd = true; this.open(); });
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#picker?.contains(e.target as Node) && 
          e.target !== this.#startInput && 
          e.target !== this.#endInput) {
        this.close();
      }
    }

    #createPicker(): HTMLElement {
      const picker = document.createElement('div');
      picker.className = 'absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4';
      picker.style.width = '600px';
      picker.innerHTML = this.#renderCalendar();
      return picker;
    }

    #renderCalendar(): string {
      const leftMonth = new Date(this.#currentDate);
      const rightMonth = new Date(this.#currentDate);
      rightMonth.setMonth(rightMonth.getMonth() + 1);
      
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

      let html = `
        <div class="flex gap-4">
          <!-- Presets -->
          <div class="w-32 border-r border-gray-200 dark:border-gray-700 pr-4 space-y-1">
            ${this.#presets.map((p, i) => `
              <button type="button" data-preset="${i}" class="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                ${p.label}
              </button>
            `).join('')}
          </div>
          
          <!-- Left Calendar -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <button type="button" data-prev-month class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <span class="font-semibold dark:text-white">${monthNames[leftMonth.getMonth()]} ${leftMonth.getFullYear()}</span>
              <div class="w-6"></div>
            </div>
            ${this.#renderMonth(leftMonth, dayNames)}
          </div>
          
          <!-- Right Calendar -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <div class="w-6"></div>
              <span class="font-semibold dark:text-white">${monthNames[rightMonth.getMonth()]} ${rightMonth.getFullYear()}</span>
              <button type="button" data-next-month class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            ${this.#renderMonth(rightMonth, dayNames)}
          </div>
        </div>
        
        <!-- Footer -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            ${this.#startDate && this.#endDate 
              ? `${this.#formatDate(this.#startDate)} → ${this.#formatDate(this.#endDate)}` 
              : this.#startDate 
                ? `${this.#formatDate(this.#startDate)} → ...`
                : 'Selecione um período'}
          </div>
          <div class="flex gap-2">
            <button type="button" data-clear class="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Limpar
            </button>
            <button type="button" data-apply class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Aplicar
            </button>
          </div>
        </div>
      `;

      return html;
    }

    #renderMonth(date: Date, dayNames: string[]): string {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      let html = `
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${dayNames.map(d => `<div class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">${d}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 gap-1">
      `;

      for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        const isStart = this.#startDate && cellDate.toDateString() === this.#startDate.toDateString();
        const isEnd = this.#endDate && cellDate.toDateString() === this.#endDate.toDateString();
        const isInRange = this.#startDate && this.#endDate && cellDate > this.#startDate && cellDate < this.#endDate;
        const isToday = cellDate.toDateString() === today.toDateString();
        const isDisabled = (this.#minDate && cellDate < this.#minDate) || (this.#maxDate && cellDate > this.#maxDate);

        let classes = 'w-8 h-8 text-sm flex items-center justify-center transition-colors ';
        
        if (isDisabled) {
          classes += 'text-gray-300 dark:text-gray-600 cursor-not-allowed';
        } else if (isStart || isEnd) {
          classes += 'bg-blue-600 text-white font-semibold rounded-lg';
        } else if (isInRange) {
          classes += 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
        } else if (isToday) {
          classes += 'ring-1 ring-blue-500 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300';
        } else {
          classes += 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer dark:text-gray-300';
        }

        html += `<button type="button" data-day="${day}" data-month="${month}" data-year="${year}" class="${classes}" ${isDisabled ? 'disabled' : ''}>${day}</button>`;
      }

      html += `</div>`;
      return html;
    }

    #attachPickerListeners(): void {
      if (!this.#picker) return;

      this.#picker.querySelector('[data-prev-month]')?.addEventListener('click', () => {
        this.#currentDate.setMonth(this.#currentDate.getMonth() - 1);
        this.#picker!.innerHTML = this.#renderCalendar();
        this.#attachPickerListeners();
      });

      this.#picker.querySelector('[data-next-month]')?.addEventListener('click', () => {
        this.#currentDate.setMonth(this.#currentDate.getMonth() + 1);
        this.#picker!.innerHTML = this.#renderCalendar();
        this.#attachPickerListeners();
      });

      this.#picker.querySelectorAll('[data-day]').forEach(btn => {
        btn.addEventListener('click', () => {
          const el = btn as HTMLElement;
          const day = parseInt(el.dataset.day || '1');
          const month = parseInt(el.dataset.month || '0');
          const year = parseInt(el.dataset.year || '2024');
          const clickedDate = new Date(year, month, day);
          
          if (!this.#startDate || (this.#startDate && this.#endDate) || clickedDate < this.#startDate) {
            // Start new selection
            this.#startDate = clickedDate;
            this.#endDate = null;
            this.#startInput.value = this.#formatDate(clickedDate);
            this.#endInput.value = '';
          } else {
            // Complete selection
            this.#endDate = clickedDate;
            this.#endInput.value = this.#formatDate(clickedDate);
          }
          
          this.#picker!.innerHTML = this.#renderCalendar();
          this.#attachPickerListeners();
        });
      });

      this.#picker.querySelectorAll('[data-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt((btn as HTMLElement).dataset.preset || '0');
          const [start, end] = this.#presets[idx].getValue();
          this.#startDate = start;
          this.#endDate = end;
          this.#startInput.value = this.#formatDate(start);
          this.#endInput.value = this.#formatDate(end);
          this.#currentDate = new Date(start);
          this.#picker!.innerHTML = this.#renderCalendar();
          this.#attachPickerListeners();
        });
      });

      this.#picker.querySelector('[data-clear]')?.addEventListener('click', () => {
        this.clear();
        this.#picker!.innerHTML = this.#renderCalendar();
        this.#attachPickerListeners();
      });

      this.#picker.querySelector('[data-apply]')?.addEventListener('click', () => {
        if (this.#startDate && this.#endDate) {
          emit(this.#el, 'daterange:change', { 
            start: this.#startDate, 
            end: this.#endDate,
            startFormatted: this.#startInput.value,
            endFormatted: this.#endInput.value
          });
          this.close();
        }
      });
    }

    value(): { start: string | null; end: string | null } {
      return {
        start: this.#startInput.value || null,
        end: this.#endInput.value || null
      };
    }

    setValue(start: string | Date | null, end: string | Date | null): this {
      if (start) {
        this.#startDate = typeof start === 'string' ? this.#parseDate(start) : start;
        if (this.#startDate) this.#startInput.value = this.#formatDate(this.#startDate);
      }
      if (end) {
        this.#endDate = typeof end === 'string' ? this.#parseDate(end) : end;
        if (this.#endDate) this.#endInput.value = this.#formatDate(this.#endDate);
      }
      return this;
    }

    clear(): this {
      this.#startDate = null;
      this.#endDate = null;
      this.#startInput.value = '';
      this.#endInput.value = '';
      emit(this.#el, 'daterange:clear', {});
      return this;
    }

    open(): this {
      if (this.#isOpen) return this;
      
      this.#isOpen = true;
      this.#picker = this.#createPicker();
      this.#wrapper.appendChild(this.#picker);
      this.#attachPickerListeners();
      
      setTimeout(() => {
        document.addEventListener('click', this.#boundHandleOutsideClick);
      }, 0);
      
      emit(this.#el, 'daterange:opened', {});
      return this;
    }

    close(): this {
      if (!this.#isOpen) return this;
      
      this.#isOpen = false;
      this.#picker?.remove();
      this.#picker = null;
      
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      emit(this.#el, 'daterange:closed', {});
      return this;
    }

    min(date: string | Date): this {
      this.#minDate = typeof date === 'string' ? this.#parseDate(date) : date;
      return this;
    }

    max(date: string | Date): this {
      this.#maxDate = typeof date === 'string' ? this.#parseDate(date) : date;
      return this;
    }

    disable(state = true): this {
      this.#startInput.disabled = state;
      this.#endInput.disabled = state;
      if (state) this.close();
      return this;
    }

    destroy(): void {
      this.close();
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: ColorPicker
  // =====================
  class ColorPicker implements ColorPickerInstance {
    #el: HTMLInputElement;
    #wrapper: HTMLElement;
    #picker: HTMLElement | null = null;
    #isOpen = false;
    #currentColor: string;
    #presets: string[];
    #boundHandleOutsideClick: (e: MouseEvent) => void;

    constructor(el: HTMLElement) {
      // If element is a div, create an input inside it
      if (el.tagName === 'DIV') {
        this.#wrapper = el;
        this.#wrapper.style.position = 'relative';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono';
        input.placeholder = '#000000';
        input.value = el.dataset.value || '#3B82F6';
        el.appendChild(input);
        this.#el = input;
        
        // Copy presets from wrapper
        if (el.dataset.presets) {
          this.#el.dataset.presets = el.dataset.presets;
        }
      } else {
        this.#el = el as HTMLInputElement;
        this.#wrapper = el.parentElement || el;
        this.#wrapper.style.position = 'relative';
      }
      
      this.#currentColor = this.#el.value || '#3B82F6';
      
      // Parse presets - can be comma-separated or JSON array
      const presetsData = this.#el.dataset.presets || '';
      if (presetsData.startsWith('[')) {
        try {
          this.#presets = JSON.parse(presetsData);
        } catch {
          this.#presets = this.#getDefaultPresets();
        }
      } else {
        this.#presets = presetsData.split(',').filter(c => c.trim()) || this.#getDefaultPresets();
      }
      
      if (this.#presets.length === 0) {
        this.#presets = this.#getDefaultPresets();
      }

      this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
      this.#setupPreview();
      this.#setupListeners();
    }
    
    #getDefaultPresets(): string[] {
      return [
        '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
        '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
        '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#000000',
        '#6B7280', '#FFFFFF'
      ];
    }

    #setupPreview(): void {
      const preview = document.createElement('div');
      preview.className = 'absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer';
      preview.style.backgroundColor = this.#currentColor;
      preview.dataset.colorPreview = '';
      
      this.#wrapper.insertBefore(preview, this.#el);
    }

    #setupListeners(): void {
      this.#el.addEventListener('focus', () => this.open());
      this.#wrapper.querySelector('[data-color-preview]')?.addEventListener('click', () => this.open());
      
      this.#el.addEventListener('input', () => {
        const color = this.#el.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
          this.#currentColor = color;
          this.#updatePreview();
        }
      });
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (!this.#picker?.contains(e.target as Node) && e.target !== this.#el) {
        this.close();
      }
    }

    #updatePreview(): void {
      const preview = this.#wrapper.querySelector('[data-color-preview]') as HTMLElement;
      if (preview) {
        preview.style.backgroundColor = this.#currentColor;
      }
    }

    #createPicker(): HTMLElement {
      const picker = document.createElement('div');
      picker.className = 'absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-64';
      
      picker.innerHTML = `
        <div class="grid grid-cols-5 gap-2 mb-4">
          ${this.#presets.map(color => `
            <button type="button" data-color="${color}" 
              class="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${color === this.#currentColor ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'}"
              style="background-color: ${color}">
            </button>
          `).join('')}
        </div>
        <div class="flex gap-2">
          <input type="color" value="${this.#currentColor}" class="w-10 h-10 rounded-lg cursor-pointer border-0 p-0">
          <input type="text" value="${this.#currentColor}" 
            class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-mono dark:text-white"
            pattern="^#[0-9A-Fa-f]{6}$">
        </div>
      `;
      
      return picker;
    }

    #attachPickerListeners(): void {
      if (!this.#picker) return;

      // Preset colors
      this.#picker.querySelectorAll('[data-color]').forEach(btn => {
        btn.addEventListener('click', () => {
          const color = (btn as HTMLElement).dataset.color || '';
          this.setValue(color);
          this.close();
        });
      });

      // Native color input
      const colorInput = this.#picker.querySelector('input[type="color"]') as HTMLInputElement;
      colorInput?.addEventListener('input', () => {
        this.setValue(colorInput.value);
      });

      // Text input
      const textInput = this.#picker.querySelector('input[type="text"]') as HTMLInputElement;
      textInput?.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
          this.setValue(textInput.value);
        }
      });
    }

    value(): string {
      return this.#currentColor;
    }

    setValue(color: string): this {
      this.#currentColor = color;
      this.#el.value = color;
      this.#updatePreview();
      emit(this.#el, 'colorpicker:change', { color });
      return this;
    }

    open(): this {
      if (this.#isOpen) return this;
      
      this.#isOpen = true;
      this.#picker = this.#createPicker();
      
      this.#wrapper.appendChild(this.#picker);
      
      this.#attachPickerListeners();
      
      setTimeout(() => {
        document.addEventListener('click', this.#boundHandleOutsideClick);
      }, 0);
      
      emit(this.#el, 'colorpicker:opened', {});
      return this;
    }

    close(): this {
      if (!this.#isOpen) return this;
      
      this.#isOpen = false;
      this.#picker?.remove();
      this.#picker = null;
      
      document.removeEventListener('click', this.#boundHandleOutsideClick);
      emit(this.#el, 'colorpicker:closed', {});
      return this;
    }

    destroy(): void {
      this.close();
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: RangeSlider
  // =====================
  class RangeSlider implements RangeSliderInstance {
    #el: HTMLElement;
    #input: HTMLInputElement;
    #track: HTMLElement | null = null;
    #thumb: HTMLElement | null = null;
    #valueDisplay: HTMLElement | null = null;
    #minVal: number;
    #maxVal: number;
    #stepVal: number;
    #currentValue: number;

    constructor(el: HTMLElement) {
      this.#el = el;
      
      // Find or create input
      let input = el.querySelector('input[type="range"]') || el.querySelector('input');
      if (!input) {
        input = document.createElement('input');
        input.type = 'range';
        el.appendChild(input);
      }
      this.#input = input as HTMLInputElement;
      
      this.#minVal = parseFloat(el.dataset.min || this.#input.min || '0');
      this.#maxVal = parseFloat(el.dataset.max || this.#input.max || '100');
      this.#stepVal = parseFloat(el.dataset.step || this.#input.step || '1');
      this.#currentValue = parseFloat(el.dataset.value || this.#input.value || '50');
      
      // Set input attributes
      this.#input.min = String(this.#minVal);
      this.#input.max = String(this.#maxVal);
      this.#input.step = String(this.#stepVal);
      this.#input.value = String(this.#currentValue);

      this.#createSlider();
      this.#setupListeners();
      this.#updateDisplay();
    }

    #createSlider(): void {
      this.#el.classList.add('relative', 'py-4');
      
      // Create custom track
      this.#track = document.createElement('div');
      this.#track.className = 'absolute left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full top-1/2 -translate-y-1/2';
      
      // Create fill
      const fill = document.createElement('div');
      fill.className = 'absolute left-0 h-full bg-blue-500 rounded-full transition-all';
      fill.dataset.rangeFill = '';
      this.#track.appendChild(fill);
      
      // Create thumb
      this.#thumb = document.createElement('div');
      this.#thumb.className = 'absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-lg hover:scale-110 transition-transform';
      this.#thumb.setAttribute('tabindex', '0');
      this.#thumb.setAttribute('role', 'slider');
      this.#thumb.setAttribute('aria-valuemin', String(this.#minVal));
      this.#thumb.setAttribute('aria-valuemax', String(this.#maxVal));
      
      // Create value display
      this.#valueDisplay = document.createElement('div');
      this.#valueDisplay.className = 'absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 transition-opacity';
      this.#thumb.appendChild(this.#valueDisplay);

      // Hide original input but keep for form submission
      this.#input.style.cssText = 'position:absolute;opacity:0;pointer-events:none;';

      this.#el.appendChild(this.#track);
      this.#el.appendChild(this.#thumb);
    }

    #setupListeners(): void {
      let isDragging = false;

      const updateFromEvent = (e: MouseEvent | TouchEvent) => {
        const rect = this.#track!.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = this.#minVal + percent * (this.#maxVal - this.#minVal);
        const steppedValue = Math.round(rawValue / this.#stepVal) * this.#stepVal;
        this.setValue(steppedValue);
      };

      this.#thumb?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        this.#thumb?.classList.add('cursor-grabbing');
        this.#valueDisplay?.classList.remove('opacity-0');
        this.#valueDisplay?.classList.add('opacity-100');
      });

      document.addEventListener('mousemove', (e) => {
        if (isDragging) updateFromEvent(e);
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          this.#thumb?.classList.remove('cursor-grabbing');
          this.#valueDisplay?.classList.add('opacity-0');
          this.#valueDisplay?.classList.remove('opacity-100');
        }
      });

      // Touch support
      this.#thumb?.addEventListener('touchstart', (_e) => {
        isDragging = true;
        this.#valueDisplay?.classList.remove('opacity-0');
      });

      document.addEventListener('touchmove', (e) => {
        if (isDragging) updateFromEvent(e);
      });

      document.addEventListener('touchend', () => {
        isDragging = false;
        this.#valueDisplay?.classList.add('opacity-0');
      });

      // Keyboard support
      this.#thumb?.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? this.#stepVal * 10 : this.#stepVal;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.setValue(this.#currentValue + step);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          this.setValue(this.#currentValue - step);
        }
      });

      // Click on track
      this.#track?.addEventListener('click', updateFromEvent);
    }

    #updateDisplay(): void {
      const percent = ((this.#currentValue - this.#minVal) / (this.#maxVal - this.#minVal)) * 100;
      
      if (this.#thumb) {
        this.#thumb.style.left = `${percent}%`;
        this.#thumb.setAttribute('aria-valuenow', String(this.#currentValue));
      }
      
      const fill = this.#track?.querySelector('[data-range-fill]') as HTMLElement;
      if (fill) {
        fill.style.width = `${percent}%`;
      }
      
      if (this.#valueDisplay) {
        this.#valueDisplay.textContent = String(this.#currentValue);
      }
      
      this.#input.value = String(this.#currentValue);
    }

    value(): number {
      return this.#currentValue;
    }

    setValue(val: number | [number, number]): this {
      const numVal = Array.isArray(val) ? val[0] : val;
      this.#currentValue = Math.max(this.#minVal, Math.min(this.#maxVal, numVal));
      this.#updateDisplay();
      emit(this.#el, 'range:change', { value: this.#currentValue });
      return this;
    }

    min(val: number): this {
      this.#minVal = val;
      this.#thumb?.setAttribute('aria-valuemin', String(val));
      this.#updateDisplay();
      return this;
    }

    max(val: number): this {
      this.#maxVal = val;
      this.#thumb?.setAttribute('aria-valuemax', String(val));
      this.#updateDisplay();
      return this;
    }

    step(val: number): this {
      this.#stepVal = val;
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: FileUpload
  // =====================
  class FileUpload implements FileUploadInstance {
    #el: HTMLElement;
    #input: HTMLInputElement;
    #dropzone: HTMLElement | null = null;
    #preview: HTMLElement | null = null;
    #files: File[] = [];
    #maxSize: number;
    #maxFiles: number;
    #accept: string;

    constructor(el: HTMLElement) {
      this.#el = el;
      
      // Find or create input
      let input = el.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        el.appendChild(input);
      }
      this.#input = input;
      
      this.#dropzone = el.querySelector('[data-dropzone]') || el;
      this.#preview = el.querySelector('[data-preview]');
      this.#maxSize = parseInt(el.dataset.maxSize || '10485760'); // 10MB default
      this.#maxFiles = parseInt(el.dataset.maxFiles || '10');
      this.#accept = el.dataset.accept || this.#input.accept || '*/*';
      
      // Set input attributes
      this.#input.accept = this.#accept;
      if (el.dataset.multiple === 'true') {
        this.#input.multiple = true;
      }

      this.#setupDropzone();
      this.#setupListeners();
    }

    #setupDropzone(): void {
      // If element already has dropzone content, use it as dropzone
      if (this.#el.children.length > 1 || (this.#el.children.length === 1 && this.#el.children[0] !== this.#input)) {
        // Element has content - use it as dropzone wrapper
        this.#dropzone = this.#el;
      } else if (!this.#el.querySelector('[data-dropzone]')) {
        const dropzone = document.createElement('div');
        dropzone.className = 'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center transition-colors hover:border-blue-400 dark:hover:border-blue-500';
        dropzone.dataset.dropzone = '';
        dropzone.innerHTML = `
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p class="text-gray-600 dark:text-gray-400 mb-2">Arraste arquivos aqui ou</p>
          <button type="button" class="text-blue-500 hover:text-blue-600 font-medium">clique para selecionar</button>
        `;
        this.#el.appendChild(dropzone);
        this.#dropzone = dropzone;
      }

      // Create preview container if not exists
      if (!this.#preview) {
        this.#preview = document.createElement('div');
        this.#preview.className = 'grid grid-cols-2 md:grid-cols-4 gap-4 mt-4';
        this.#preview.dataset.preview = '';
        this.#el.appendChild(this.#preview);
      }

      // Hide original input
      this.#input.style.cssText = 'position:absolute;opacity:0;pointer-events:none;';
    }

    #setupListeners(): void {
      // Click to select
      this.#dropzone?.addEventListener('click', (e) => {
        // Don't trigger if clicking on remove button or preview items
        const target = e.target as HTMLElement;
        if (target.closest('[data-remove]') || target.closest('[data-file-index]')) return;
        this.#input.click();
      });

      // Drag and drop - need to track drag enter/leave depth for nested elements
      let dragDepth = 0;

      this.#dropzone?.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragDepth++;
        this.#dropzone?.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
      });

      this.#dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'copy';
        }
      });

      this.#dropzone?.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragDepth--;
        if (dragDepth === 0) {
          this.#dropzone?.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        }
      });

      this.#dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragDepth = 0;
        this.#dropzone?.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        
        const files = Array.from(e.dataTransfer?.files || []);
        this.#addFiles(files);
      });

      // Input change
      this.#input.addEventListener('change', () => {
        const files = Array.from(this.#input.files || []);
        this.#addFiles(files);
      });
    }

    #addFiles(files: File[]): void {
      for (const file of files) {
        if (this.#files.length >= this.#maxFiles) {
          emit(this.#el, 'upload:max-files', { max: this.#maxFiles });
          break;
        }

        if (file.size > this.#maxSize) {
          emit(this.#el, 'upload:file-too-large', { file, maxSize: this.#maxSize });
          continue;
        }

        this.#files.push(file);
        this.#renderPreview(file, this.#files.length - 1);
      }

      emit(this.#el, 'upload:files-added', { files: this.#files });
    }

    #renderPreview(file: File, index: number): void {
      if (!this.#preview) return;

      const item = document.createElement('div');
      item.className = 'relative group bg-gray-100 dark:bg-gray-800 rounded-xl p-2';
      item.dataset.fileIndex = String(index);

      const isImage = file.type.startsWith('image/');
      
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          item.innerHTML = `
            <img src="${e.target?.result}" class="w-full h-24 object-cover rounded-lg" alt="${file.name}">
            <button type="button" data-remove="${index}" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <p class="text-xs text-gray-500 truncate mt-1">${file.name}</p>
          `;
        };
        reader.readAsDataURL(file);
      } else {
        item.innerHTML = `
          <div class="w-full h-24 flex items-center justify-center">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <button type="button" data-remove="${index}" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <p class="text-xs text-gray-500 truncate mt-1">${file.name}</p>
        `;
      }

      // Remove button listener
      item.querySelector('[data-remove]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.remove(index);
      });

      this.#preview.appendChild(item);
    }

    files(): File[] {
      return [...this.#files];
    }

    clear(): this {
      this.#files = [];
      if (this.#preview) this.#preview.innerHTML = '';
      this.#input.value = '';
      emit(this.#el, 'upload:cleared', {});
      return this;
    }

    async upload(): Promise<void> {
      // This is a placeholder - actual upload logic would be implemented by the user
      emit(this.#el, 'upload:start', { files: this.#files });
    }

    remove(index: number): this {
      const removed = this.#files.splice(index, 1)[0];
      this.#preview?.querySelector(`[data-file-index="${index}"]`)?.remove();
      
      // Re-index remaining items
      this.#preview?.querySelectorAll('[data-file-index]').forEach((el, i) => {
        (el as HTMLElement).dataset.fileIndex = String(i);
        el.querySelector('[data-remove]')?.setAttribute('data-remove', String(i));
      });
      
      emit(this.#el, 'upload:file-removed', { file: removed, index });
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: ContextMenu
  // =====================
  class ContextMenu implements ContextMenuInstance {
    #el: HTMLElement | null = null;
    #items: ContextMenuItem[] = [];
    #isOpen = false;
    #targetElement: HTMLElement | null = null;
    #boundHandleClick: (e: MouseEvent) => void;
    #boundHandleKeydown: (e: KeyboardEvent) => void;
    #boundHandleContextMenu: (e: MouseEvent) => void;
    #selectedIndex = -1;

    constructor(el: HTMLElement) {
      this.#targetElement = el;
      this.#items = this.#parseItems(el);
      
      this.#boundHandleClick = this.#handleOutsideClick.bind(this);
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#boundHandleContextMenu = this.#handleContextMenu.bind(this);
      
      this.#setupListeners();
    }

    #parseItems(el: HTMLElement): ContextMenuItem[] {
      const itemsAttr = el.dataset.contextItems;
      if (itemsAttr) {
        try {
          return JSON.parse(itemsAttr);
        } catch {
          return [];
        }
      }
      return [];
    }

    #setupListeners(): void {
      this.#targetElement?.addEventListener('contextmenu', this.#boundHandleContextMenu);
    }

    #handleContextMenu(e: MouseEvent): void {
      e.preventDefault();
      this.show(e.clientX, e.clientY);
    }

    #handleOutsideClick(e: MouseEvent): void {
      if (this.#el && !this.#el.contains(e.target as Node)) {
        this.hide();
      }
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (!this.#isOpen) return;

      const items = this.#getSelectableItems();
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.hide();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.#selectedIndex = (this.#selectedIndex + 1) % items.length;
          this.#updateSelection();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.#selectedIndex = (this.#selectedIndex - 1 + items.length) % items.length;
          this.#updateSelection();
          break;
        case 'Enter':
          e.preventDefault();
          if (this.#selectedIndex >= 0 && items[this.#selectedIndex]) {
            this.#executeItem(items[this.#selectedIndex]);
          }
          break;
      }
    }

    #getSelectableItems(): ContextMenuItem[] {
      return this.#items.filter(item => !item.divider && !item.disabled);
    }

    #updateSelection(): void {
      if (!this.#el) return;
      
      const buttons = this.#el.querySelectorAll('[data-context-item]');
      buttons.forEach((btn, i) => {
        btn.classList.toggle('bg-blue-100', i === this.#selectedIndex);
        btn.classList.toggle('dark:bg-blue-900/30', i === this.#selectedIndex);
      });
    }

    #executeItem(item: ContextMenuItem): void {
      if (item.disabled) return;
      
      this.hide();
      
      if (item.handler) {
        item.handler();
      }
      
      emit(this.#targetElement!, 'contextmenu:select', { item });
    }

    #createMenu(): HTMLElement {
      const menu = document.createElement('div');
      menu.className = 'fixed z-[9999] min-w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150';
      menu.setAttribute('role', 'menu');
      menu.innerHTML = this.#renderItems(this.#items);
      return menu;
    }

    #renderItems(items: ContextMenuItem[]): string {
      return items.map((item, index) => {
        if (item.divider) {
          return '<div class="my-1 border-t border-gray-200 dark:border-gray-700"></div>';
        }

        const disabledClass = item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer';
        const dangerClass = item.danger ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-700 dark:text-gray-300';

        return `
          <button
            type="button"
            data-context-item="${index}"
            data-item-id="${item.id}"
            class="w-full px-3 py-2 text-sm flex items-center gap-3 ${disabledClass} ${dangerClass} transition-colors"
            role="menuitem"
            ${item.disabled ? 'disabled' : ''}
          >
            ${item.icon ? `<span class="w-5 text-center">${item.icon}</span>` : '<span class="w-5"></span>'}
            <span class="flex-1 text-left">${item.label}</span>
            ${item.shortcut ? `<span class="text-xs text-gray-400 dark:text-gray-500 ml-4">${item.shortcut}</span>` : ''}
          </button>
        `;
      }).join('');
    }

    #positionMenu(x: number, y: number): void {
      if (!this.#el) return;

      const rect = this.#el.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust if menu would go off screen
      let finalX = x;
      let finalY = y;

      if (x + rect.width > viewportWidth) {
        finalX = viewportWidth - rect.width - 8;
      }
      if (y + rect.height > viewportHeight) {
        finalY = viewportHeight - rect.height - 8;
      }

      this.#el.style.left = `${Math.max(8, finalX)}px`;
      this.#el.style.top = `${Math.max(8, finalY)}px`;
    }

    #attachMenuListeners(): void {
      if (!this.#el) return;

      this.#el.querySelectorAll('[data-context-item]').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt((btn as HTMLElement).dataset.contextItem || '0');
          const selectableItems = this.#getSelectableItems();
          // Map button index to item
          let itemIndex = 0;
          let selectableIndex = 0;
          for (const item of this.#items) {
            if (!item.divider && !item.disabled) {
              if (selectableIndex === index) {
                this.#executeItem(item);
                return;
              }
              selectableIndex++;
            }
            itemIndex++;
          }
          // Fallback - use direct index
          if (this.#items[index]) {
            this.#executeItem(this.#items[index]);
          }
        });

        btn.addEventListener('mouseenter', () => {
          const index = parseInt((btn as HTMLElement).dataset.contextItem || '0');
          this.#selectedIndex = index;
          this.#updateSelection();
        });
      });
    }

    show(x: number, y: number, items?: ContextMenuItem[]): this {
      // Hide any existing menu
      this.hide();

      if (items) {
        this.#items = items;
      }

      if (this.#items.length === 0) return this;

      this.#isOpen = true;
      this.#selectedIndex = -1;
      this.#el = this.#createMenu();
      document.body.appendChild(this.#el);

      // Position after render to get correct dimensions
      requestAnimationFrame(() => {
        this.#positionMenu(x, y);
        this.#attachMenuListeners();
      });

      // Add global listeners
      setTimeout(() => {
        document.addEventListener('click', this.#boundHandleClick);
        document.addEventListener('keydown', this.#boundHandleKeydown);
        document.addEventListener('contextmenu', this.#boundHandleClick);
      }, 0);

      emit(this.#targetElement!, 'contextmenu:opened', {});
      return this;
    }

    hide(): this {
      if (!this.#isOpen) return this;

      this.#isOpen = false;
      this.#el?.remove();
      this.#el = null;

      document.removeEventListener('click', this.#boundHandleClick);
      document.removeEventListener('keydown', this.#boundHandleKeydown);
      document.removeEventListener('contextmenu', this.#boundHandleClick);

      emit(this.#targetElement!, 'contextmenu:closed', {});
      return this;
    }

    setItems(items: ContextMenuItem[]): this {
      this.#items = items;
      return this;
    }

    isOpen(): boolean {
      return this.#isOpen;
    }

    destroy(): void {
      this.hide();
      this.#targetElement?.removeEventListener('contextmenu', this.#boundHandleContextMenu);
      instances.delete(this.#targetElement!);
    }
  }

  // =====================
  // COMPONENTE: CommandPalette
  // =====================
  class CommandPalette implements CommandPaletteInstance {
    #el: HTMLElement | null = null;
    #commands: CommandItem[] = [];
    #filteredCommands: CommandItem[] = [];
    #selectedIndex = 0;
    #isOpen = false;
    #boundHandleKeydown: (e: KeyboardEvent) => void;

    constructor(el?: HTMLElement) {
      this.#boundHandleKeydown = this.#handleKeydown.bind(this);
      this.#setupGlobalShortcut();
      
      if (el) {
        this.#el = el;
        this.#parseCommands();
      }
    }

    #setupGlobalShortcut(): void {
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    #parseCommands(): void {
      this.#el?.querySelectorAll('[data-command]').forEach(cmd => {
        const el = cmd as HTMLElement;
        this.#commands.push({
          id: el.dataset.command || '',
          title: el.dataset.title || el.textContent?.trim() || '',
          description: el.dataset.description,
          icon: el.dataset.icon,
          shortcut: el.dataset.shortcut,
          category: el.dataset.category,
          handler: () => {
            const handlerName = el.dataset.handler;
            if (handlerName && typeof (window as unknown as Record<string, unknown>)[handlerName] === 'function') {
              ((window as unknown as Record<string, unknown>)[handlerName] as () => void)();
            }
            emit(document.body, 'command:executed', { command: el.dataset.command });
          }
        });
      });
      this.#filteredCommands = [...this.#commands];
    }

    #createPalette(): HTMLElement {
      const palette = document.createElement('div');
      palette.className = 'fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm';
      palette.innerHTML = `
        <div class="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <input type="text" placeholder="Digite um comando..." 
              class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 dark:text-white"
              data-command-search>
          </div>
          <div class="max-h-80 overflow-y-auto p-2" data-command-list></div>
          <div class="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
            <span>↑↓ navegar</span>
            <span>↵ executar</span>
            <span>esc fechar</span>
          </div>
        </div>
      `;
      return palette;
    }

    #renderCommands(): void {
      const list = this.#el?.querySelector('[data-command-list]');
      if (!list) return;

      // Group by category
      const grouped = this.#filteredCommands.reduce((acc, cmd) => {
        const cat = cmd.category || 'Geral';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(cmd);
        return acc;
      }, {} as Record<string, CommandItem[]>);

      let html = '';
      let globalIndex = 0;

      for (const [category, commands] of Object.entries(grouped)) {
        html += `<div class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">${category}</div>`;
        
        for (const cmd of commands) {
          const isSelected = globalIndex === this.#selectedIndex;
          html += `
            <button type="button" data-command-item="${cmd.id}" 
              class="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'}">
              ${cmd.icon ? `<span class="text-lg">${cmd.icon}</span>` : '<span class="w-5"></span>'}
              <div class="flex-1 text-left">
                <div class="font-medium">${cmd.title}</div>
                ${cmd.description ? `<div class="text-sm opacity-70">${cmd.description}</div>` : ''}
              </div>
              ${cmd.shortcut ? `<kbd class="px-2 py-1 text-xs ${isSelected ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} rounded">${cmd.shortcut}</kbd>` : ''}
            </button>
          `;
          globalIndex++;
        }
      }

      list.innerHTML = html;

      // Attach click listeners
      list.querySelectorAll('[data-command-item]').forEach((btn, index) => {
        btn.addEventListener('click', () => {
          this.#executeCommand(index);
        });
      });
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.close();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.#selectedIndex = Math.min(this.#selectedIndex + 1, this.#filteredCommands.length - 1);
        this.#renderCommands();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.#selectedIndex = Math.max(this.#selectedIndex - 1, 0);
        this.#renderCommands();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        this.#executeCommand(this.#selectedIndex);
        return;
      }
    }

    #executeCommand(index: number): void {
      const cmd = this.#filteredCommands[index];
      if (cmd) {
        this.close();
        cmd.handler();
      }
    }

    #filterCommands(query: string): void {
      const q = query.toLowerCase();
      this.#filteredCommands = this.#commands.filter(cmd => 
        cmd.title.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.category?.toLowerCase().includes(q)
      );
      this.#selectedIndex = 0;
      this.#renderCommands();
    }

    open(): this {
      if (this.#isOpen) return this;

      this.#isOpen = true;
      this.#el = this.#createPalette();
      document.body.appendChild(this.#el);
      
      this.#renderCommands();

      // Focus search input
      const searchInput = this.#el.querySelector('[data-command-search]') as HTMLInputElement;
      searchInput?.focus();

      // Search filter
      searchInput?.addEventListener('input', () => {
        this.#filterCommands(searchInput.value);
      });

      // Keyboard navigation
      document.addEventListener('keydown', this.#boundHandleKeydown);

      // Close on backdrop click
      this.#el.addEventListener('click', (e) => {
        if (e.target === this.#el) this.close();
      });

      emit(document.body, 'commandpalette:opened', {});
      return this;
    }

    close(): this {
      if (!this.#isOpen) return this;

      this.#isOpen = false;
      this.#el?.remove();
      this.#el = null;
      this.#filteredCommands = [...this.#commands];
      this.#selectedIndex = 0;

      document.removeEventListener('keydown', this.#boundHandleKeydown);
      emit(document.body, 'commandpalette:closed', {});
      return this;
    }

    toggle(): this {
      return this.#isOpen ? this.close() : this.open();
    }

    setCommands(commands: CommandItem[]): this {
      this.#commands = commands;
      this.#filteredCommands = [...commands];
      if (this.#isOpen) this.#renderCommands();
      return this;
    }

    registerCommand(command: CommandItem): this {
      this.#commands.push(command);
      this.#filteredCommands = [...this.#commands];
      if (this.#isOpen) this.#renderCommands();
      return this;
    }

    // Alias for registerCommand
    register(command: CommandItem): this {
      return this.registerCommand(command);
    }

    destroy(): void {
      this.close();
      if (this.#el) instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: VirtualScroll
  // =====================
  class VirtualScroll implements VirtualScrollInstance {
    #el: HTMLElement;
    #container: HTMLElement;
    #items: unknown[] = [];
    #itemHeight: number;
    #visibleCount: number;
    #startIndex = 0;
    #renderItem: ((item: unknown, index: number) => string) | null = null;

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#container = document.createElement('div');
      this.#itemHeight = parseInt(el.dataset.itemHeight || '48');
      this.#visibleCount = Math.ceil(el.clientHeight / this.#itemHeight) + 5;

      this.#setupContainer();
      this.#setupListeners();
    }

    #setupContainer(): void {
      this.#el.style.overflow = 'auto';
      this.#el.style.position = 'relative';

      // Spacer for scroll height
      const spacer = document.createElement('div');
      spacer.dataset.virtualSpacer = '';
      this.#el.appendChild(spacer);

      // Visible items container
      this.#container.style.position = 'absolute';
      this.#container.style.top = '0';
      this.#container.style.left = '0';
      this.#container.style.right = '0';
      this.#el.appendChild(this.#container);
    }

    #setupListeners(): void {
      this.#el.addEventListener('scroll', () => {
        const newStartIndex = Math.floor(this.#el.scrollTop / this.#itemHeight);
        if (newStartIndex !== this.#startIndex) {
          this.#startIndex = newStartIndex;
          this.#render();
        }
      });
    }

    #render(): void {
      const totalHeight = this.#items.length * this.#itemHeight;
      const spacer = this.#el.querySelector('[data-virtual-spacer]') as HTMLElement;
      if (spacer) spacer.style.height = `${totalHeight}px`;

      // Update container position
      this.#container.style.transform = `translateY(${this.#startIndex * this.#itemHeight}px)`;

      // Render visible items
      const endIndex = Math.min(this.#startIndex + this.#visibleCount, this.#items.length);
      const visibleItems = this.#items.slice(this.#startIndex, endIndex);

      if (this.#renderItem) {
        this.#container.innerHTML = visibleItems
          .map((item, i) => this.#renderItem!(item, this.#startIndex + i))
          .join('');
      } else {
        this.#container.innerHTML = visibleItems
          .map((item, _i) => `
            <div style="height: ${this.#itemHeight}px" class="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
              ${String(item)}
            </div>
          `)
          .join('');
      }
    }

    setItems(items: unknown[]): this {
      this.#items = items;
      this.#startIndex = 0;
      this.#el.scrollTop = 0;
      this.#render();
      return this;
    }

    setRenderItem(fn: (item: unknown, index: number) => string): this {
      this.#renderItem = fn;
      this.#render();
      return this;
    }

    scrollTo(index: number): this {
      this.#el.scrollTop = index * this.#itemHeight;
      return this;
    }

    refresh(): this {
      this.#visibleCount = Math.ceil(this.#el.clientHeight / this.#itemHeight) + 5;
      this.#render();
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // COMPONENTE: Persist
  // =====================
  class Persist implements PersistInstance {
    #el: HTMLElement;
    #key: string;
    #storage: Storage;
    #properties: string[];

    constructor(el: HTMLElement) {
      this.#el = el;
      this.#key = el.dataset.persistKey || `vp-${el.id || Date.now()}`;
      this.#storage = el.dataset.persistSession === 'true' ? sessionStorage : localStorage;
      this.#properties = (el.dataset.persist || 'value').split(',').map(p => p.trim());

      this.load();
      this.#setupAutoSave();
    }

    #setupAutoSave(): void {
      // Auto-save on form inputs
      if (this.#el instanceof HTMLInputElement || 
          this.#el instanceof HTMLSelectElement || 
          this.#el instanceof HTMLTextAreaElement) {
        this.#el.addEventListener('change', () => this.save());
        this.#el.addEventListener('input', () => this.save());
      }

      // Save before page unload
      window.addEventListener('beforeunload', () => this.save());
    }

    save(): this {
      const data: Record<string, unknown> = {};

      this.#properties.forEach(prop => {
        if (prop === 'value' && 'value' in this.#el) {
          data.value = (this.#el as HTMLInputElement).value;
        } else if (prop === 'checked' && 'checked' in this.#el) {
          data.checked = (this.#el as HTMLInputElement).checked;
        } else if (prop === 'innerHTML') {
          data.innerHTML = this.#el.innerHTML;
        } else if (prop === 'class') {
          data.class = this.#el.className;
        } else if (this.#el.dataset[prop]) {
          data[prop] = this.#el.dataset[prop];
        }
      });

      this.#storage.setItem(this.#key, JSON.stringify(data));
      emit(this.#el, 'persist:saved', { key: this.#key, data });
      return this;
    }

    load(): this {
      const stored = this.#storage.getItem(this.#key);
      if (!stored) return this;

      try {
        const data = JSON.parse(stored) as Record<string, unknown>;

        this.#properties.forEach(prop => {
          if (prop === 'value' && 'value' in this.#el && data.value !== undefined) {
            (this.#el as HTMLInputElement).value = String(data.value);
          } else if (prop === 'checked' && 'checked' in this.#el && data.checked !== undefined) {
            (this.#el as HTMLInputElement).checked = Boolean(data.checked);
          } else if (prop === 'innerHTML' && data.innerHTML !== undefined) {
            this.#el.innerHTML = String(data.innerHTML);
          } else if (prop === 'class' && data.class !== undefined) {
            this.#el.className = String(data.class);
          } else if (data[prop] !== undefined) {
            this.#el.dataset[prop] = String(data[prop]);
          }
        });

        emit(this.#el, 'persist:loaded', { key: this.#key, data });
      } catch {
        // Invalid JSON, ignore
      }

      return this;
    }

    clear(): this {
      this.#storage.removeItem(this.#key);
      emit(this.#el, 'persist:cleared', { key: this.#key });
      return this;
    }

    destroy(): void {
      instances.delete(this.#el);
    }
  }

  // =====================
  // TOAST SYSTEM
  // =====================
  class ToastManagerClass implements ToastManager {
    #config = {
      queue: [] as { element: HTMLElement; duration: number }[],
      maxVisible: 3,
      container: null as HTMLElement | null
    };

    #getContainer(): HTMLElement {
      if (!this.#config.container) {
        this.#config.container = document.createElement('div');
        this.#config.container.className = 'fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm';
        this.#config.container.setAttribute('role', 'region');
        this.#config.container.setAttribute('aria-label', 'Notificações');
        document.body.appendChild(this.#config.container);
      }
      return this.#config.container;
    }

    #createToast(msg: string, type: ToastType, duration: number): { element: HTMLElement; duration: number } {
      const colors: Record<ToastType, string> = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-yellow-500 text-gray-900'
      };

      const icons: Record<ToastType, string> = {
        success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
        error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
        info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'
      };

      const t = document.createElement('div');
      t.className = `${colors[type]} text-white px-4 py-3 rounded-xl shadow-2xl transform translate-x-full transition-all duration-300 flex items-center gap-3`;
      t.setAttribute('role', 'alert');
      t.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
      
      t.innerHTML = `
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icons[type]}
        </svg>
        <span class="flex-1">${msg}</span>
        <button class="shrink-0 hover:opacity-75 transition-opacity" aria-label="Fechar notificação">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      `;

      const closeBtn = t.querySelector('button');
      closeBtn?.addEventListener('click', () => this.#removeToast(t));

      return { element: t, duration };
    }

    #removeToast(t: HTMLElement): void {
      t.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        t.remove();
        this.#processQueue();
      }, 300);
    }

    #processQueue(): void {
      const container = this.#getContainer();
      const currentToasts = container.children.length;

      if (currentToasts < this.#config.maxVisible && this.#config.queue.length > 0) {
        const toastData = this.#config.queue.shift();
        if (toastData) {
          const { element, duration } = toastData;
          container.appendChild(element);
          
          requestAnimationFrame(() => {
            element.classList.remove('translate-x-full');
          });

          if (duration > 0) {
            setTimeout(() => this.#removeToast(element), duration);
          }
        }
      }
    }

    show(msg: string, type: ToastType = 'info', duration = 5000): this {
      const toastData = this.#createToast(msg, type, duration);
      this.#config.queue.push(toastData);
      this.#processQueue();
      return this;
    }

    success(msg: string, duration = 5000): this {
      return this.show(msg, 'success', duration);
    }

    error(msg: string, duration = 7000): this {
      return this.show(msg, 'error', duration);
    }

    info(msg: string, duration = 5000): this {
      return this.show(msg, 'info', duration);
    }

    warning(msg: string, duration = 6000): this {
      return this.show(msg, 'warning', duration);
    }

    clear(): void {
      this.#config.queue = [];
      if (this.#config.container) {
        this.#config.container.innerHTML = '';
      }
    }
  }

  const toast = new ToastManagerClass();

  // =====================
  // CONFIRM DIALOG
  // =====================
  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
      modal.setAttribute('role', 'alertdialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'confirm-title');
      modal.setAttribute('aria-describedby', 'confirm-message');

      const confirmClass = options.confirmClass || 'bg-gradient-to-r from-blue-600 to-purple-600';

      modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
          <h3 id="confirm-title" class="text-xl font-bold mb-4 dark:text-white">${options.title || 'Confirmar'}</h3>
          <p id="confirm-message" class="text-gray-600 dark:text-gray-300 mb-6">${options.message}</p>
          <div class="flex gap-3 justify-end">
            <button data-cancel class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              ${options.cancelText || 'Cancelar'}
            </button>
            <button data-confirm class="px-6 py-2.5 rounded-xl text-white ${confirmClass} hover:opacity-90 transition-opacity">
              ${options.confirmText || 'Confirmar'}
            </button>
          </div>
        </div>
      `;

      const cleanup = (result: boolean) => {
        modal.remove();
        resolve(result);
        if (result && options.onConfirm) options.onConfirm();
        if (!result && options.onCancel) options.onCancel();
      };

      modal.querySelector('[data-confirm]')?.addEventListener('click', () => cleanup(true));
      modal.querySelector('[data-cancel]')?.addEventListener('click', () => cleanup(false));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) cleanup(false);
      });
      
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          cleanup(false);
          document.removeEventListener('keydown', handler);
        }
      });

      document.body.appendChild(modal);
      
      // Focus confirm button
      requestAnimationFrame(() => {
        modal.querySelector<HTMLButtonElement>('[data-confirm]')?.focus();
      });
    });
  };

  // =====================
  // COMPONENTES MAP
  // =====================
  const Components: Record<string, new (el: HTMLElement) => SpireUIInstance> = {
    button: Button as unknown as new (el: HTMLElement) => SpireUIInstance,
    input: Input as unknown as new (el: HTMLElement) => SpireUIInstance,
    modal: Modal,
    dropdown: Dropdown,
    table: Table as unknown as new (el: HTMLElement) => SpireUIInstance,
    tabs: Tabs,
    collapse: Collapse,
    rating: Rating,
    accordion: Accordion,
    tooltip: Tooltip,
    select: Select,
    multiselect: MultiSelect,
    drawer: Drawer,
    popover: Popover,
    progress: Progress as unknown as new (el: HTMLElement) => SpireUIInstance,
    skeleton: Skeleton,
    clipboard: Clipboard,
    stepper: Stepper,
    form: FormValidator as unknown as new (el: HTMLElement) => SpireUIInstance,
    lazy: LazyLoad,
    infinitescroll: InfiniteScroll,
    datepicker: DatePicker as unknown as new (el: HTMLElement) => SpireUIInstance,
    daterangepicker: DateRangePicker as unknown as new (el: HTMLElement) => SpireUIInstance,
    colorpicker: ColorPicker as unknown as new (el: HTMLElement) => SpireUIInstance,
    range: RangeSlider,
    upload: FileUpload,
    virtualscroll: VirtualScroll,
    persist: Persist,
    contextmenu: ContextMenu,
    carousel: Carousel
  };

  // =====================
  // KEYBOARD SHORTCUTS MANAGER
  // =====================
  class KeyboardShortcutsManagerClass implements KeyboardShortcutsManager {
    #shortcuts: KeyboardShortcut[] = [];
    #enabled = true;
    #boundHandler: (e: KeyboardEvent) => void;

    constructor() {
      this.#boundHandler = this.#handleKeydown.bind(this);
      document.addEventListener('keydown', this.#boundHandler);
    }

    #getKey(shortcut: KeyboardShortcut): string {
      const parts: string[] = [];
      if (shortcut.ctrl) parts.push('ctrl');
      if (shortcut.alt) parts.push('alt');
      if (shortcut.shift) parts.push('shift');
      if (shortcut.meta) parts.push('meta');
      parts.push(shortcut.key.toLowerCase());
      return parts.join('+');
    }

    #handleKeydown(e: KeyboardEvent): void {
      if (!this.#enabled) return;
      
      // Skip if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      for (const shortcut of this.#shortcuts) {
        const ctrlMatch = !!shortcut.ctrl === (e.ctrlKey || e.metaKey);
        const altMatch = !!shortcut.alt === e.altKey;
        const shiftMatch = !!shortcut.shift === e.shiftKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          e.preventDefault();
          shortcut.handler(e);
          return;
        }
      }
    }

    register(shortcutOrKey: KeyboardShortcut | string, handler?: () => void): void {
      let shortcut: KeyboardShortcut;
      
      if (typeof shortcutOrKey === 'string') {
        // Parse string format like 'ctrl+shift+k' or 'escape'
        const parts = shortcutOrKey.toLowerCase().split('+');
        const key = parts.pop() || '';
        shortcut = {
          key,
          ctrl: parts.includes('ctrl'),
          alt: parts.includes('alt'),
          shift: parts.includes('shift'),
          meta: parts.includes('meta') || parts.includes('cmd'),
          handler: handler || (() => {})
        };
      } else {
        shortcut = shortcutOrKey;
      }
      
      // Remove existing shortcut with same key combo
      this.unregister(shortcut.key, {
        ctrl: shortcut.ctrl,
        alt: shortcut.alt,
        shift: shortcut.shift,
        meta: shortcut.meta
      });
      this.#shortcuts.push(shortcut);
    }

    unregister(key: string, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean }): void {
      this.#shortcuts = this.#shortcuts.filter(s => {
        if (s.key.toLowerCase() !== key.toLowerCase()) return true;
        if (modifiers) {
          if (!!s.ctrl !== !!modifiers.ctrl) return true;
          if (!!s.alt !== !!modifiers.alt) return true;
          if (!!s.shift !== !!modifiers.shift) return true;
          if (!!s.meta !== !!modifiers.meta) return true;
        }
        return false;
      });
    }

    list(): KeyboardShortcut[] {
      return [...this.#shortcuts];
    }

    enable(): void {
      this.#enabled = true;
    }

    disable(): void {
      this.#enabled = false;
    }
  }

  const shortcuts = new KeyboardShortcutsManagerClass();
  const commandPalette = new CommandPalette();

  // Register default shortcuts
  shortcuts.register({
    key: 'k',
    ctrl: true,
    description: 'Command Palette',
    handler: () => {
      commandPalette.toggle();
    }
  });

  // =====================
  // DEBOUNCE & THROTTLE
  // =====================
  function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
    let timeoutId: ReturnType<typeof setTimeout>;
    return ((...args: unknown[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
  }

  function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): T {
    let inThrottle = false;
    let lastArgs: unknown[] | null = null;
    
    return ((...args: unknown[]) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
          if (lastArgs) {
            fn(...lastArgs);
            lastArgs = null;
          }
        }, limit);
      } else {
        lastArgs = args;
      }
    }) as T;
  }

  // =====================
  // EVENT BUS
  // =====================
  class EventBus implements EventBusManager {
    #listeners: Map<string, Set<(...args: unknown[]) => void>> = new Map();

    on(event: string, handler: (...args: unknown[]) => void): () => void {
      if (!this.#listeners.has(event)) {
        this.#listeners.set(event, new Set());
      }
      this.#listeners.get(event)!.add(handler);
      
      // Return unsubscribe function
      return () => this.off(event, handler);
    }

    off(event: string, handler?: (...args: unknown[]) => void): void {
      if (!handler) {
        this.#listeners.delete(event);
      } else {
        this.#listeners.get(event)?.delete(handler);
      }
    }

    emit(event: string, ...args: unknown[]): void {
      this.#listeners.get(event)?.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Event handler error for "${event}":`, error);
          globalErrorHandler?.(error as Error, { component: 'EventBus' });
        }
      });
    }

    once(event: string, handler: (...args: unknown[]) => void): () => void {
      const onceHandler = (...args: unknown[]) => {
        handler(...args);
        this.off(event, onceHandler);
      };
      return this.on(event, onceHandler);
    }
  }

  const events = new EventBus();

  // =====================
  // HTTP CLIENT
  // =====================
  class Http implements HttpClient {
    #defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };

    async #request<T>(method: string, url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>> {
      const controller = new AbortController();
      const timeout = options?.timeout || 30000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        // Get CSRF token from meta tag (Laravel)
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        const headers: Record<string, string> = {
          ...this.#defaultHeaders,
          ...options?.headers
        };
        
        if (csrfToken) {
          headers['X-CSRF-TOKEN'] = csrfToken;
        }

        const response = await fetch(url, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal,
          credentials: 'same-origin'
        });

        clearTimeout(timeoutId);

        const responseData = await response.json().catch(() => null);

        return {
          data: responseData as T,
          status: response.status,
          ok: response.ok
        };
      } catch (error) {
        clearTimeout(timeoutId);
        
        if ((error as Error).name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
    }

    get<T = unknown>(url: string, options?: HttpOptions): Promise<HttpResponse<T>> {
      return this.#request<T>('GET', url, undefined, options);
    }

    post<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>> {
      return this.#request<T>('POST', url, data, options);
    }

    put<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>> {
      return this.#request<T>('PUT', url, data, options);
    }

    patch<T = unknown>(url: string, data?: unknown, options?: HttpOptions): Promise<HttpResponse<T>> {
      return this.#request<T>('PATCH', url, data, options);
    }

    delete<T = unknown>(url: string, options?: HttpOptions): Promise<HttpResponse<T>> {
      return this.#request<T>('DELETE', url, undefined, options);
    }
  }

  const http = new Http();

  // =====================
  // CURRENCY FORMATTER
  // =====================
  class Currency implements CurrencyManager {
    format(value: number, options?: CurrencyOptions): string {
      const opts = {
        locale: options?.locale || 'pt-BR',
        currency: options?.currency || 'BRL',
        ...options
      };

      if (opts.symbol !== undefined) {
        // Custom formatting
        const absValue = Math.abs(value);
        const decimal = opts.decimal || ',';
        const thousands = opts.thousands || '.';
        
        const [intPart, decPart] = absValue.toFixed(2).split('.');
        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
        const formatted = `${opts.symbol} ${formattedInt}${decimal}${decPart}`;
        
        return value < 0 ? `-${formatted}` : formatted;
      }

      return new Intl.NumberFormat(opts.locale, {
        style: 'currency',
        currency: opts.currency
      }).format(value);
    }

    parse(value: string): number {
      // Remove currency symbol and spaces
      let cleaned = value.replace(/[R$€$£¥\s]/g, '').trim();
      
      // Detect format (1.234,56 or 1,234.56)
      const lastComma = cleaned.lastIndexOf(',');
      const lastDot = cleaned.lastIndexOf('.');
      
      if (lastComma > lastDot) {
        // Brazilian format: 1.234,56
        cleaned = cleaned.replace(/\./g, '').replace(',', '.');
      } else {
        // US format: 1,234.56
        cleaned = cleaned.replace(/,/g, '');
      }
      
      const result = parseFloat(cleaned);
      return isNaN(result) ? 0 : result;
    }
  }

  const currency = new Currency();

  // =====================
  // INPUT MASKS
  // =====================
  class Mask implements MaskManager {
    #masks: WeakMap<HTMLInputElement, { cleanup: () => void; rawValue: string }> = new WeakMap();

    #patterns: Record<string, MaskDefinition> = {
      cpf: { pattern: '###.###.###-##', placeholder: '000.000.000-00' },
      cnpj: { pattern: '##.###.###/####-##', placeholder: '00.000.000/0000-00' },
      phone: { pattern: '(##) #####-####', placeholder: '(00) 00000-0000' },
      landline: { pattern: '(##) ####-####', placeholder: '(00) 0000-0000' },
      cep: { pattern: '#####-###', placeholder: '00000-000' },
      date: { pattern: '##/##/####', placeholder: 'DD/MM/AAAA' },
      time: { pattern: '##:##', placeholder: 'HH:MM' },
      creditcard: { pattern: '#### #### #### ####', placeholder: '0000 0000 0000 0000' },
      money: { pattern: 'R$ #.###.###,##', placeholder: 'R$ 0,00' }
    };

    apply(input: HTMLInputElement, mask: string | MaskDefinition): void {
      // Remove existing mask
      this.remove(input);

      const definition = typeof mask === 'string' 
        ? (this.#patterns[mask] || { pattern: mask }) 
        : mask;

      let rawValue = '';

      const formatValue = (value: string): string => {
        // Special handling for money
        if (mask === 'money') {
          return this.#formatMoney(value);
        }

        const pattern = definition.pattern;
        const digits = value.replace(/\D/g, '');
        let result = '';
        let digitIndex = 0;

        for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
          if (pattern[i] === '#') {
            result += digits[digitIndex];
            digitIndex++;
          } else {
            result += pattern[i];
            if (pattern[i] === digits[digitIndex]) {
              digitIndex++;
            }
          }
        }

        return result;
      };

      const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const cursorPos = target.selectionStart || 0;
        const oldLength = target.value.length;
        
        rawValue = target.value.replace(/\D/g, '');
        target.value = formatValue(target.value);
        
        // Adjust cursor position
        const newLength = target.value.length;
        const diff = newLength - oldLength;
        const newPos = Math.max(0, cursorPos + diff);
        
        requestAnimationFrame(() => {
          target.setSelectionRange(newPos, newPos);
        });
      };

      const handleKeydown = (e: KeyboardEvent) => {
        // Allow navigation keys
        if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
          return;
        }
        
        // Allow Ctrl/Cmd combinations
        if (e.ctrlKey || e.metaKey) {
          return;
        }
        
        // Only allow digits
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      };

      input.addEventListener('input', handleInput);
      input.addEventListener('keydown', handleKeydown);

      // Set placeholder
      if (definition.placeholder) {
        input.placeholder = definition.placeholder;
      }

      // Format initial value
      if (input.value) {
        input.value = formatValue(input.value);
      }

      this.#masks.set(input, {
        cleanup: () => {
          input.removeEventListener('input', handleInput);
          input.removeEventListener('keydown', handleKeydown);
        },
        rawValue: ''
      });
    }

    #formatMoney(value: string): string {
      const digits = value.replace(/\D/g, '');
      if (!digits) return '';
      
      const number = parseInt(digits, 10) / 100;
      return currency.format(number);
    }

    remove(input: HTMLInputElement): void {
      const data = this.#masks.get(input);
      if (data) {
        data.cleanup();
        this.#masks.delete(input);
      }
    }

    getValue(input: HTMLInputElement): string {
      return input.value.replace(/\D/g, '');
    }
  }

  const mask = new Mask();

  // =====================
  // PERFORMANCE MONITORING
  // =====================
  class Perf implements PerfManager {
    #marks: Map<string, number> = new Map();
    #measures: Map<string, number> = new Map();

    mark(name: string): void {
      this.#marks.set(name, performance.now());
      
      // Also use native Performance API if available
      if (typeof performance !== 'undefined' && performance.mark) {
        try {
          performance.mark(name);
        } catch {
          // Ignore if mark already exists
        }
      }
    }

    measure(name: string, startMark: string, endMark?: string): number {
      const start = this.#marks.get(startMark);
      const end = endMark ? this.#marks.get(endMark) : performance.now();
      
      if (start === undefined) {
        console.warn(`Performance mark "${startMark}" not found`);
        return 0;
      }

      const duration = (end || performance.now()) - start;
      this.#measures.set(name, duration);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }

      return duration;
    }

    getMarks(): Record<string, number> {
      return Object.fromEntries(this.#marks);
    }

    getMeasures(): Record<string, number> {
      return Object.fromEntries(this.#measures);
    }

    clear(): void {
      this.#marks.clear();
      this.#measures.clear();
      
      if (typeof performance !== 'undefined' && performance.clearMarks) {
        performance.clearMarks();
        performance.clearMeasures();
      }
    }
  }

  const perf = new Perf();

  // =====================
  // ACCESSIBILITY HELPERS
  // =====================
  class A11y implements A11yManager {
    #announcer: HTMLElement | null = null;

    #getAnnouncer(): HTMLElement {
      if (!this.#announcer) {
        this.#announcer = document.createElement('div');
        this.#announcer.setAttribute('role', 'status');
        this.#announcer.setAttribute('aria-live', 'polite');
        this.#announcer.setAttribute('aria-atomic', 'true');
        this.#announcer.className = 'sr-only';
        this.#announcer.style.cssText = `
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `;
        document.body.appendChild(this.#announcer);
      }
      return this.#announcer;
    }

    announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
      const announcer = this.#getAnnouncer();
      announcer.setAttribute('aria-live', priority);
      
      // Clear and set message (triggers announcement)
      announcer.textContent = '';
      requestAnimationFrame(() => {
        announcer.textContent = message;
      });
    }

    trapFocus(container: HTMLElement): () => void {
      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      container.addEventListener('keydown', handleKeydown);
      
      // Focus first element
      const firstFocusable = container.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();

      // Return cleanup function
      return () => {
        container.removeEventListener('keydown', handleKeydown);
      };
    }

    skipLink(target: string, label = 'Pular para conteúdo principal'): void {
      // Check if skip link already exists
      if (document.querySelector('[data-skip-link]')) return;

      const link = document.createElement('a');
      link.href = target;
      link.textContent = label;
      link.dataset.skipLink = '';
      link.className = `
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black 
        focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-500
      `.trim().replace(/\s+/g, ' ');

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetEl = document.querySelector(target);
        if (targetEl) {
          (targetEl as HTMLElement).focus();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });

      document.body.insertBefore(link, document.body.firstChild);
    }
  }

  const a11y = new A11y();

  // =====================
  // GLOBAL ERROR HANDLER
  // =====================
  let globalErrorHandler: ErrorHandler | null = null;

  function onError(handler: ErrorHandler): void {
    globalErrorHandler = handler;
  }

  // Capture unhandled errors in components
  window.addEventListener('error', (e) => {
    globalErrorHandler?.(e.error, { component: 'global' });
  });

  window.addEventListener('unhandledrejection', (e) => {
    globalErrorHandler?.(new Error(String(e.reason)), { component: 'promise' });
  });

  // =====================
  // API PÚBLICA
  // =====================
  return {
    init(): void {
      document.querySelectorAll<HTMLElement>('[data-v]').forEach(el => {
        const type = el.dataset.v;
        if (type && Components[type] && !instances.has(el)) {
          const ComponentClass = Components[type];
          const instance = new ComponentClass(el);
          instances.set(el, instance);
          
          // Manter compatibilidade com API antiga
          Object.defineProperty(el, `$${type}`, {
            get: () => instances.get(el),
            configurable: true
          });
        }
      });

      // Auto-inicializar carousels
      document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(el => {
        if (!instances.has(el)) {
          const instance = new Carousel(el);
          instances.set(el, instance);
        }
      });
    },

    get<T extends SpireUIInstance>(el: HTMLElement): T | undefined {
      return instances.get(el) as T | undefined;
    },

    destroy(el: HTMLElement): void {
      const instance = instances.get(el);
      if (instance?.destroy) {
        instance.destroy();
      }
    },

    destroyAll(): void {
      document.querySelectorAll<HTMLElement>('[data-v]').forEach(el => {
        this.destroy(el);
      });
    },

    // Helper para acessar collapse por ID
    collapse(id: string): CollapseInstance | null {
      const el = document.querySelector<HTMLElement>(`[data-collapse="${id}"]`);
      if (!el) return null;
      
      // Inicializar se ainda não foi
      if (!instances.has(el)) {
        const instance = new Collapse(el);
        instances.set(el, instance);
      }
      
      return instances.get(el) as CollapseInstance;
    },

    // Helper para acessar carousel por ID
    carousel(id: string): CarouselInstance | null {
      const el = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);
      if (!el) return null;
      
      // Inicializar se ainda não foi
      if (!instances.has(el)) {
        const instance = new Carousel(el);
        instances.set(el, instance);
      }
      
      return instances.get(el) as CarouselInstance;
    },

    toast,
    confirm,
    shortcuts,
    command: commandPalette,
    
    // Utilities
    debounce,
    throttle,
    events,
    http,
    currency,
    mask,
    perf,
    a11y,
    onError
  };
})();

// =====================
// AUTO INICIALIZAÇÃO
// =====================
['DOMContentLoaded', 'livewire:navigated', 'turbo:render', 'astro:page-load'].forEach(ev => 
  document.addEventListener(ev, () => setTimeout(SpireUI.init, 10))
);

// =====================
// THEME TOGGLE
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

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

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
});

// Expor globalmente
(window as unknown as { $v: typeof SpireUI; SpireUI: typeof SpireUI }).$v = SpireUI;
(window as unknown as { SpireUI: typeof SpireUI }).SpireUI = SpireUI;

export default SpireUI;
export { SpireUI };
export type { 
  SpireUIAPI, 
  ButtonInstance, 
  InputInstance, 
  ModalInstance, 
  DropdownInstance, 
  TableInstance,
  TabsInstance,
  AccordionInstance,
  TooltipInstance,
  SelectInstance,
  MultiSelectInstance,
  DrawerInstance,
  PopoverInstance,
  ProgressInstance,
  SkeletonInstance,
  ClipboardInstance,
  StepperInstance,
  FormValidatorInstance,
  LazyLoadInstance,
  InfiniteScrollInstance,
  DatePickerInstance,
  DateRangePickerInstance,
  ColorPickerInstance,
  RangeSliderInstance,
  FileUploadInstance,
  CommandPaletteInstance,
  CommandItem,
  VirtualScrollInstance,
  PersistInstance,
  KeyboardShortcut,
  KeyboardShortcutsManager,
  ConfirmOptions,
  SelectOption,
  ToastType,
  CarouselInstance
};
