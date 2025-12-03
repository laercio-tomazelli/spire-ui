# Spire UI - AI Assistant Guidelines

## 🎯 Project Overview

**Spire UI** is a lightweight, zero-dependency TypeScript UI library designed specifically for Laravel applications. It serves as a modern alternative to Alpine.js, providing reactive components with a minimal footprint (~25KB gzip).

### Core Philosophy
- **Lightweight**: Bundle size must stay under 30KB gzip
- **Zero Dependencies**: No external runtime dependencies
- **Laravel-First**: Designed for seamless Laravel Blade integration
- **TypeScript**: Strict type safety throughout
- **Vanilla JS**: No framework lock-in, pure DOM manipulation
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 📁 Project Structure

```
spire-ui/
├── resources/
│   ├── js/
│   │   └── spire-ui.ts          # Main TypeScript library (~6500 lines)
│   ├── css/
│   │   └── app.css              # Tailwind CSS entry point
│   └── views/
│       ├── components/
│       │   ├── layouts/
│       │   │   └── app.blade.php    # Main layout with @vite and @stack('scripts')
│       │   └── ui/                   # 50+ Blade components
│       │       ├── button.blade.php
│       │       ├── modal.blade.php
│       │       ├── tabs.blade.php
│       │       └── ...
│       └── welcome.blade.php     # Demo/showcase page
├── public/build/                 # Vite compiled assets
├── vite.config.js               # Vite configuration
├── tsconfig.json                # TypeScript strict mode config
└── vitest.config.ts             # Unit testing configuration
```

## 🏗️ Architecture

### TypeScript Core (`spire-ui.ts`)

The library follows a component-based architecture with a central registry:

```typescript
// Global API exposed as window.SpireUI and window.$v
interface SpireUIAPI {
  init(): void;                              // Initialize all components
  get<T>(el: HTMLElement): T | undefined;    // Get component instance
  toast: ToastAPI;                           // Toast notifications
  modal: ModalAPI;                           // Modal dialogs
  confirm: ConfirmAPI;                       // Confirmation dialogs
  // ... other utilities
}

// Component instances are stored in a WeakMap
const instances = new WeakMap<HTMLElement, SpireUIInstance>();
```

### Component Pattern

Each component follows this pattern:

```typescript
class ComponentName implements SpireUIInstance {
  private el: HTMLElement;
  
  constructor(el: HTMLElement) {
    this.el = el;
    this.init();
  }
  
  private init(): void {
    // Setup event listeners and initial state
  }
  
  // Public API methods
  public methodName(): this {
    // Implementation
    return this; // Chainable
  }
  
  public destroy(): void {
    // Cleanup event listeners
  }
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

### TypeScript
1. **Strict Mode**: All code must pass `strict: true`
2. **No Any**: Avoid `any` type, use `unknown` if needed
3. **Interfaces**: Define interfaces for all component instances
4. **Private Methods**: Prefix with underscore convention or use `private`
5. **Return Types**: Explicit return types on all public methods

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
- ❌ Use inline styles (prefer Tailwind classes)
- ❌ Mutate DOM excessively
- ❌ Use `setTimeout` for animations (use CSS)
- ❌ Forget to handle disabled/readonly states
- ❌ Ignore accessibility (ARIA, keyboard nav)
- ❌ Use PHP calculations inside `{{ }}` (move to `@php` block)

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

1. Create TypeScript class in `spire-ui.ts`
2. Add interface extending `SpireUIInstance`
3. Register in `Components` object
4. Create Blade component in `resources/views/components/ui/`
5. Add example in `welcome.blade.php`
6. Update this documentation
7. Run tests and verify bundle size
