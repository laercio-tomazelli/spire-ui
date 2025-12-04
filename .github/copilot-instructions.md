# Spire UI - AI Assistant Guidelines

## 🎯 Project Overview

**Spire UI** is a lightweight, zero-dependency TypeScript UI library designed specifically for Laravel applications. It serves as a modern alternative to Alpine.js, providing reactive components with a minimal footprint (~25KB gzip).

### Core Philosophy
- **Lightweight**: Bundle size must stay under 30KB gzip
- **Zero Dependencies**: No external runtime dependencies
- **Laravel-First**: Designed for seamless Laravel Blade integration
- **TypeScript**: Strict type safety throughout
- **Modular Architecture**: Each component in its own file for maintainability
- **Vanilla JS**: No framework lock-in, pure DOM manipulation
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 📁 Project Structure

```
spire-ui/
├── resources/
│   ├── js/
│   │   ├── spire-ui.ts              # Legacy monolithic file (deprecated)
│   │   └── spire/                   # ⭐ MODULAR STRUCTURE (use this!)
│   │       ├── index.ts             # Main entry point
│   │       ├── types.ts             # All TypeScript interfaces
│   │       ├── core/
│   │       │   ├── index.ts         # Core re-exports
│   │       │   └── registry.ts      # instances WeakMap, emit helper
│   │       ├── components/          # 31 components (one per file)
│   │       │   ├── index.ts         # Component re-exports
│   │       │   ├── Button.ts
│   │       │   ├── Modal.ts
│   │       │   ├── Tabs.ts
│   │       │   └── ...
│   │       └── utilities/           # 11 utility modules
│   │           ├── index.ts         # Utility re-exports
│   │           ├── Toast.ts
│   │           ├── Confirm.ts
│   │           ├── Http.ts
│   │           └── ...
│   ├── css/
│   │   └── app.css                  # Tailwind CSS v4 entry point
│   └── views/
│       ├── components/
│       │   ├── layouts/
│       │   │   └── app.blade.php    # Main layout with @vite and @stack('scripts')
│       │   └── ui/                  # 50+ Blade components
│       │       ├── button.blade.php
│       │       ├── modal.blade.php
│       │       └── ...
│       └── welcome.blade.php        # Demo/showcase page
├── public/build/                    # Vite compiled assets
├── vite.config.js                   # Vite configuration
├── tsconfig.json                    # TypeScript strict mode config
└── vitest.config.ts                 # Unit testing configuration
```

## 🏗️ Architecture

### Modular TypeScript Structure (`resources/js/spire/`)

> ⚠️ **MANDATORY**: All new components MUST be created in the modular structure.
> Do NOT add code to the legacy `spire-ui.ts` file.

The library follows a modular component-based architecture:

```
spire/
├── index.ts          # Main entry - exports everything
├── types.ts          # All interfaces (SpireUIInstance, etc.)
├── core/
│   └── registry.ts   # instances WeakMap, emit() helper, globalErrorHandler
├── components/       # One file per component
│   ├── index.ts      # Re-exports all components
│   ├── Button.ts
│   ├── Modal.ts
│   └── ...
└── utilities/        # Shared utilities
    ├── index.ts      # Re-exports all utilities
    ├── Toast.ts
    ├── Http.ts
    └── ...
```

### Component File Template

Each component MUST follow this pattern in its own file:

```typescript
// resources/js/spire/components/ComponentName.ts

import { ComponentNameInstance } from '../types';
import { instances, emit } from '../core/registry';

export class ComponentName implements ComponentNameInstance {
  #el: HTMLElement;
  
  constructor(el: HTMLElement) {
    this.#el = el;
    this.#init();
    instances.set(el, this);  // Register instance
  }
  
  #init(): void {
    // Setup event listeners and initial state
  }
  
  // Public API methods (chainable)
  public methodName(): this {
    // Implementation
    emit(this.#el, 'componentname:event', { data });
    return this;
  }
  
  public destroy(): void {
    // Cleanup event listeners
    instances.delete(this.#el);
  }
}
```

### Registering New Components

After creating the component file:

1. **Add interface to `types.ts`**:
```typescript
export interface ComponentNameInstance extends SpireUIInstance {
  methodName(): this;
  // ... other methods
}
```

2. **Export from `components/index.ts`**:
```typescript
export { ComponentName } from './ComponentName';
```

3. **Re-export from `index.ts`** (main entry):
```typescript
export { ComponentName } from './components/ComponentName';
```

### Global API (window.SpireUI / window.$v)

```typescript
interface SpireUIAPI {
  init(): void;                              // Initialize all components
  get<T>(el: HTMLElement): T | undefined;    // Get component instance
  toast: ToastManager;                       // Toast notifications
  confirm(options): Promise<boolean>;        // Confirmation dialogs
  shortcuts: KeyboardShortcutsManager;       // Keyboard shortcuts
  command: CommandPaletteInstance;           // Command palette
  events: EventBusManager;                   // Event bus
  http: HttpClient;                          // HTTP client
  currency: CurrencyManager;                 // Currency formatting
  mask: MaskManager;                         // Input masks
  perf: PerfManager;                         // Performance monitoring
  a11y: A11yManager;                         // Accessibility helpers
  debounce<T>(fn: T, delay: number): T;
  throttle<T>(fn: T, limit: number): T;
  onError(handler: ErrorHandler): void;
}
```

### Blade Component Pattern

Components use `data-v` attribute for binding:

```blade
@props([
    'id' => null,
    'variant' => 'primary',
    'size' => 'md',
    'disabled' => false,
])

<button 
    data-v="button"
    {{ $attributes->class([...]) }}
    @disabled($disabled)
>
    {{ $slot }}
</button>
```

## 🎨 Component Categories

### Form Components
- `input` - Text input with icons, prefix/suffix, clearable, password toggle
- `select` - Custom select with search
- `multiselect` - Multiple selection with tags
- `combobox` - Autocomplete with filtering
- `tag-input` - Tag input with suggestions
- `datepicker` - Date picker with calendar
- `date-range-picker` - Date range selection
- `colorpicker` - Color picker with swatches
- `pin` - PIN/OTP input

### Display Components
- `modal` - Modal dialogs with sizes and animations
- `drawer` - Slide-out panels
- `tabs` - Tabbed interface with dynamic features
- `accordion` - Collapsible sections
- `carousel` - Image/content carousel
- `tooltip` - Hover tooltips
- `popover` - Click popovers
- `dropdown` - Dropdown menus

### Feedback Components
- `toast` - Toast notifications (success, error, warning, info)
- `alert` - Static alerts
- `progress` - Progress bars
- `skeleton` - Loading skeletons
- `empty-state` - Empty state placeholders

### Data Components
- `mini-chart` - SVG mini charts (line, bar, area, sparkline)
- `stats-card` - Statistics cards
- `timeline` - Timeline display
- `stepper` - Step wizard

### Navigation Components
- `breadcrumbs` - Breadcrumb navigation
- `context-menu` - Right-click context menus
- `command-palette` - ⌘K style command palette

## 📝 Coding Guidelines

### TypeScript (MANDATORY for new components)
1. **Modular Files**: One component per file in `spire/components/`
2. **Strict Mode**: All code must pass `strict: true`
3. **No Any**: Avoid `any` type, use `unknown` if needed
4. **Interfaces**: Define interfaces in `types.ts` for all component instances
5. **Private Fields**: Use `#privateField` syntax (not `private` keyword)
6. **Return Types**: Explicit return types on all public methods
7. **Registry**: Always call `instances.set(el, this)` in constructor
8. **Events**: Use `emit()` helper from core/registry for custom events

### Blade Components
1. **Props**: Always define `@props([])` at the top
2. **Defaults**: Provide sensible defaults for all props
3. **IDs**: Generate unique IDs with `uniqid()` when not provided
4. **Attributes**: Use `$attributes->merge()` for extensibility
5. **Dark Mode**: Always include `dark:` variants for colors
6. **Accessibility**: Include ARIA attributes where appropriate

### CSS/Tailwind
1. **Utility First**: Use Tailwind utilities, avoid custom CSS
2. **Responsive**: Mobile-first responsive design
3. **Dark Mode**: Support `dark:` variant throughout
4. **Animations**: Use CSS transitions, avoid JS animations
5. **Colors**: Use semantic color names (primary, success, error)

## 🔧 Common Patterns

### Event Handling
```typescript
// Use event delegation where possible
container.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const button = target.closest('[data-action]');
  if (button) {
    this.handleAction(button.dataset.action);
  }
});
```

### State Management
```typescript
// Use data attributes for state
el.dataset.state = 'open';
el.setAttribute('aria-expanded', 'true');

// Dispatch custom events
el.dispatchEvent(new CustomEvent('component:change', {
  detail: { value: newValue },
  bubbles: true
}));
```

### Inline Scripts in Blade
```blade
{{-- Use @pushOnce for component scripts --}}
@pushOnce('scripts')
<script>
document.querySelectorAll('[data-v="component"]').forEach(el => {
  // Component initialization
});
</script>
@endPushOnce
```

## ⚠️ Important Considerations

### DO
- ✅ Keep bundle size minimal
- ✅ Use semantic HTML
- ✅ Support keyboard navigation
- ✅ Handle edge cases gracefully
- ✅ Clean up event listeners in `destroy()`
- ✅ Use CSS transitions for animations
- ✅ Support both light and dark modes
- ✅ Make components chainable where appropriate

### DON'T
- ❌ Add external dependencies
- ❌ Add new code to legacy `spire-ui.ts` (use modular structure)
- ❌ Use inline styles (prefer Tailwind classes)
- ❌ Mutate DOM excessively
- ❌ Use `setTimeout` for animations (use CSS)
- ❌ Forget to handle disabled/readonly states
- ❌ Ignore accessibility (ARIA, keyboard nav)
- ❌ Use PHP calculations inside `{{ }}` (move to `@php` block)
- ❌ Forget to register instance in WeakMap
- ❌ Forget to cleanup in `destroy()` method

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🚀 Build

```bash
# Development with HMR
npm run dev

# Production build
npm run build

# Clear Laravel caches
php artisan view:clear
php artisan cache:clear
```

## 📦 Bundle Size Budget

| Asset | Max Size (gzip) |
|-------|-----------------|
| spire-ui.js | 30KB |
| app.css | 15KB |
| Total | 45KB |

Current: ~25KB JS + ~12KB CSS = ~37KB total

## 🔗 Quick Reference

```javascript
// Global API
SpireUI.init()                    // Initialize all components
SpireUI.get(element)              // Get component instance
SpireUI.toast.success('Message')  // Show toast
SpireUI.modal.open(options)       // Open modal
SpireUI.confirm(options)          // Show confirmation
SpireUI.theme.toggle()            // Toggle dark mode

// Shorthand
$v.init()
$v.toast.info('Hello!')
```

## 🎯 When Adding New Components

> ⚠️ **MANDATORY**: Follow the modular structure. Never add to the legacy monolithic file.

1. **Create TypeScript class** in `resources/js/spire/components/ComponentName.ts`
   - Use `#privateField` syntax for private properties
   - Import `instances` and `emit` from `../core/registry`
   - Call `instances.set(el, this)` in constructor
   - Implement `destroy()` method with cleanup

2. **Add interface** to `resources/js/spire/types.ts`
   - Extend `SpireUIInstance`
   - Document all public methods

3. **Export from index files**:
   - Add to `components/index.ts`
   - Add to main `index.ts`

4. **Create Blade component** in `resources/views/components/ui/`

5. **Add example** in `welcome.blade.php`

6. **📝 Create documentation** (MANDATORY) in `docs/components/componentname.md`
   - Follow the standard documentation template (see below)
   - Include: description, usage examples, data attributes, API methods, events
   - Add practical code examples

7. **Run tests** and verify bundle size stays under 30KB gzip

## 📝 Documentation Template

> ⚠️ **MANDATORY**: Every new component MUST have documentation in `docs/components/`.

Create a file `docs/components/componentname.md` with this structure:

```markdown
# ComponentName

Brief description of what the component does.

## Uso Básico

\`\`\`html
<div data-v="componentname">
  <!-- Basic HTML structure -->
</div>
\`\`\`

## Com Blade Component

\`\`\`blade
<x-ui.componentname prop="value" />
\`\`\`

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="componentname"` | - | - | Identifica o componente |
| `data-option` | string | - | Descrição da opção |

## API JavaScript

\`\`\`javascript
const instance = SpireUI.get(document.querySelector('[data-v="componentname"]'));

// Methods
instance.methodName();
instance.otherMethod();
\`\`\`

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `methodName()` | `this` | Descrição do método |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `componentname:event` | `{ data }` | Quando algo acontece |

\`\`\`javascript
element.addEventListener('componentname:event', (e) => {
  console.log(e.detail);
});
\`\`\`

## Exemplos

### Caso de Uso 1

\`\`\`html
<!-- Practical example -->
\`\`\`

### Caso de Uso 2

\`\`\`html
<!-- Another example -->
\`\`\`

## Acessibilidade

- List accessibility features
- Keyboard navigation
- ARIA attributes used
```

### Documentation Checklist

Before considering a component complete, ensure:

- [ ] `docs/components/componentname.md` file exists
- [ ] Description explains the component purpose
- [ ] Basic HTML usage example included
- [ ] Blade component example included (if applicable)
- [ ] All data attributes documented in table
- [ ] All public JavaScript methods documented
- [ ] All custom events documented with detail structure
- [ ] At least 2 practical usage examples
- [ ] Accessibility features listed
