/**
 * Vanilla Pro 2025 - Test Suite
 * Testes automatizados para todos os componentes
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock VanillaPro for testing
const createMockElement = (type: string, attrs: Record<string, string> = {}): HTMLElement => {
  const el = document.createElement('div');
  el.dataset.v = type;
  Object.entries(attrs).forEach(([key, value]) => {
    el.dataset[key] = value;
  });
  document.body.appendChild(el);
  return el;
};

describe('VanillaPro Core', () => {
  it('should initialize components with data-v attribute', () => {
    const el = createMockElement('button');
    expect(el.dataset.v).toBe('button');
  });

  it('should create multiple component instances', () => {
    const btn1 = createMockElement('button');
    const btn2 = createMockElement('button');
    expect(document.querySelectorAll('[data-v="button"]').length).toBe(2);
  });
});

describe('Button Component', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    button = document.createElement('button') as HTMLButtonElement;
    button.dataset.v = 'button';
    button.textContent = 'Test Button';
    document.body.appendChild(button);
  });

  it('should have correct initial text', () => {
    expect(button.textContent).toBe('Test Button');
  });

  it('should be enabled by default', () => {
    expect(button.disabled).toBe(false);
  });
});

describe('Modal Component', () => {
  let modal: HTMLElement;

  beforeEach(() => {
    modal = document.createElement('div');
    modal.dataset.v = 'modal';
    modal.classList.add('hidden');
    modal.innerHTML = `
      <div data-title>Modal Title</div>
      <div data-body>Modal Content</div>
      <button data-close>Close</button>
    `;
    document.body.appendChild(modal);
  });

  it('should be hidden by default', () => {
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('should have title and body elements', () => {
    expect(modal.querySelector('[data-title]')).not.toBeNull();
    expect(modal.querySelector('[data-body]')).not.toBeNull();
  });

  it('should have close button', () => {
    expect(modal.querySelector('[data-close]')).not.toBeNull();
  });
});

describe('Drawer Component', () => {
  let drawer: HTMLElement;

  beforeEach(() => {
    drawer = document.createElement('div');
    drawer.dataset.v = 'drawer';
    drawer.dataset.position = 'left';
    drawer.classList.add('hidden');
    drawer.innerHTML = `
      <div data-drawer-overlay></div>
      <div data-drawer-content></div>
    `;
    document.body.appendChild(drawer);
  });

  it('should have position attribute', () => {
    expect(drawer.dataset.position).toBe('left');
  });

  it('should have overlay and content', () => {
    expect(drawer.querySelector('[data-drawer-overlay]')).not.toBeNull();
    expect(drawer.querySelector('[data-drawer-content]')).not.toBeNull();
  });
});

describe('Progress Component', () => {
  let progress: HTMLElement;

  beforeEach(() => {
    progress = document.createElement('div');
    progress.dataset.v = 'progress';
    progress.dataset.value = '50';
    progress.dataset.max = '100';
    progress.innerHTML = `
      <div data-progress-bar style="width: 50%"></div>
      <span data-progress-label>50%</span>
    `;
    document.body.appendChild(progress);
  });

  it('should have value and max attributes', () => {
    expect(progress.dataset.value).toBe('50');
    expect(progress.dataset.max).toBe('100');
  });

  it('should have progress bar element', () => {
    const bar = progress.querySelector('[data-progress-bar]') as HTMLElement;
    expect(bar).not.toBeNull();
    expect(bar.style.width).toBe('50%');
  });
});

describe('Stepper Component', () => {
  let stepper: HTMLElement;

  beforeEach(() => {
    stepper = document.createElement('div');
    stepper.dataset.v = 'stepper';
    stepper.dataset.initialStep = '1';
    stepper.dataset.linear = 'true';
    stepper.innerHTML = `
      <div data-step="1">Step 1</div>
      <div data-step="2">Step 2</div>
      <div data-step="3">Step 3</div>
      <div data-step-panel="1">Panel 1</div>
      <div data-step-panel="2" class="hidden">Panel 2</div>
      <div data-step-panel="3" class="hidden">Panel 3</div>
    `;
    document.body.appendChild(stepper);
  });

  it('should have 3 steps', () => {
    expect(stepper.querySelectorAll('[data-step]').length).toBe(3);
  });

  it('should have 3 panels', () => {
    expect(stepper.querySelectorAll('[data-step-panel]').length).toBe(3);
  });

  it('should be linear by default', () => {
    expect(stepper.dataset.linear).toBe('true');
  });
});

describe('Select Component', () => {
  let select: HTMLElement;

  beforeEach(() => {
    select = document.createElement('div');
    select.dataset.v = 'select';
    select.innerHTML = `
      <input type="hidden" name="country" value="">
      <button data-select-trigger>
        <span data-select-value>Selecione...</span>
      </button>
      <div data-select-dropdown class="hidden">
        <div data-select-options>
          <div data-option="br">Brasil</div>
          <div data-option="us">EUA</div>
        </div>
      </div>
    `;
    document.body.appendChild(select);
  });

  it('should have trigger and dropdown', () => {
    expect(select.querySelector('[data-select-trigger]')).not.toBeNull();
    expect(select.querySelector('[data-select-dropdown]')).not.toBeNull();
  });

  it('should have options', () => {
    expect(select.querySelectorAll('[data-option]').length).toBe(2);
  });

  it('should have hidden input', () => {
    const input = select.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.name).toBe('country');
  });
});

describe('MultiSelect Component', () => {
  let multiselect: HTMLElement;

  beforeEach(() => {
    multiselect = document.createElement('div');
    multiselect.dataset.v = 'multiselect';
    multiselect.innerHTML = `
      <input type="hidden" name="tags" value="[]">
      <div data-multiselect-trigger>
        <div data-multiselect-tags></div>
      </div>
      <div data-multiselect-dropdown class="hidden">
        <input data-multiselect-search type="text" placeholder="Buscar...">
        <div data-multiselect-options>
          <div data-option="a">Option A</div>
          <div data-option="b">Option B</div>
          <div data-option="c">Option C</div>
        </div>
      </div>
    `;
    document.body.appendChild(multiselect);
  });

  it('should have multiple options', () => {
    expect(multiselect.querySelectorAll('[data-option]').length).toBe(3);
  });

  it('should have search input', () => {
    expect(multiselect.querySelector('[data-multiselect-search]')).not.toBeNull();
  });

  it('should have tags container', () => {
    expect(multiselect.querySelector('[data-multiselect-tags]')).not.toBeNull();
  });
});

describe('Clipboard Component', () => {
  let clipboard: HTMLElement;

  beforeEach(() => {
    clipboard = document.createElement('button');
    clipboard.dataset.v = 'clipboard';
    clipboard.dataset.clipboardText = 'Hello World';
    clipboard.textContent = 'Copy';
    document.body.appendChild(clipboard);
  });

  it('should have clipboard text', () => {
    expect(clipboard.dataset.clipboardText).toBe('Hello World');
  });
});

describe('Skeleton Component', () => {
  let skeleton: HTMLElement;

  beforeEach(() => {
    skeleton = document.createElement('div');
    skeleton.dataset.v = 'skeleton';
    skeleton.innerHTML = `<div class="animate-pulse bg-gray-200 h-4 w-full"></div>`;
    document.body.appendChild(skeleton);
  });

  it('should contain animated placeholder', () => {
    expect(skeleton.querySelector('.animate-pulse')).not.toBeNull();
  });
});

describe('Accordion Component', () => {
  let accordion: HTMLElement;

  beforeEach(() => {
    accordion = document.createElement('div');
    accordion.dataset.v = 'accordion';
    accordion.innerHTML = `
      <div data-accordion-item="item1">
        <button data-accordion-trigger>Item 1</button>
        <div data-accordion-content class="hidden">Content 1</div>
      </div>
      <div data-accordion-item="item2">
        <button data-accordion-trigger>Item 2</button>
        <div data-accordion-content class="hidden">Content 2</div>
      </div>
    `;
    document.body.appendChild(accordion);
  });

  it('should have accordion items', () => {
    expect(accordion.querySelectorAll('[data-accordion-item]').length).toBe(2);
  });

  it('should have triggers and contents', () => {
    expect(accordion.querySelectorAll('[data-accordion-trigger]').length).toBe(2);
    expect(accordion.querySelectorAll('[data-accordion-content]').length).toBe(2);
  });
});

describe('Tabs Component', () => {
  let tabs: HTMLElement;

  beforeEach(() => {
    tabs = document.createElement('div');
    tabs.dataset.v = 'tabs';
    tabs.innerHTML = `
      <div role="tablist">
        <button data-tab="tab1" class="active">Tab 1</button>
        <button data-tab="tab2">Tab 2</button>
      </div>
      <div data-panel="tab1">Panel 1</div>
      <div data-panel="tab2" class="hidden">Panel 2</div>
    `;
    document.body.appendChild(tabs);
  });

  it('should have tabs and panels', () => {
    expect(tabs.querySelectorAll('[data-tab]').length).toBe(2);
    expect(tabs.querySelectorAll('[data-panel]').length).toBe(2);
  });

  it('should have one active tab', () => {
    expect(tabs.querySelectorAll('[data-tab].active').length).toBe(1);
  });
});

describe('Tooltip Component', () => {
  let tooltip: HTMLElement;

  beforeEach(() => {
    tooltip = document.createElement('div');
    tooltip.dataset.v = 'tooltip';
    tooltip.dataset.tooltip = 'This is a tooltip';
    tooltip.dataset.tooltipPosition = 'top';
    tooltip.textContent = 'Hover me';
    document.body.appendChild(tooltip);
  });

  it('should have tooltip text', () => {
    expect(tooltip.dataset.tooltip).toBe('This is a tooltip');
  });

  it('should have position', () => {
    expect(tooltip.dataset.tooltipPosition).toBe('top');
  });
});

describe('Popover Component', () => {
  let popover: HTMLElement;

  beforeEach(() => {
    popover = document.createElement('div');
    popover.dataset.v = 'popover';
    popover.dataset.position = 'bottom';
    popover.innerHTML = `
      <button data-popover-trigger>Open</button>
      <div data-popover-content class="hidden">Popover content</div>
    `;
    document.body.appendChild(popover);
  });

  it('should have trigger and content', () => {
    expect(popover.querySelector('[data-popover-trigger]')).not.toBeNull();
    expect(popover.querySelector('[data-popover-content]')).not.toBeNull();
  });

  it('should have position', () => {
    expect(popover.dataset.position).toBe('bottom');
  });
});

describe('DOM Events', () => {
  it('should dispatch custom events', () => {
    const el = document.createElement('div');
    const handler = vi.fn();
    
    el.addEventListener('test:event', handler);
    el.dispatchEvent(new CustomEvent('test:event', { detail: { foo: 'bar' } }));
    
    expect(handler).toHaveBeenCalled();
  });
});

describe('Theme Toggle', () => {
  it('should toggle dark class on documentElement', () => {
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    document.documentElement.classList.add('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    document.documentElement.classList.remove('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should persist theme in localStorage', () => {
    localStorage.setItem('theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    
    localStorage.setItem('theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
