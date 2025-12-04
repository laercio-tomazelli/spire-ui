# @spire-ui/core

Lightweight, zero-dependency TypeScript UI library designed specifically for Laravel applications. A modern alternative to Alpine.js with reactive components and minimal footprint (~25KB gzip).

## ✨ Features

- 🪶 **Lightweight** - Under 30KB gzipped
- 🚫 **Zero Dependencies** - No external runtime dependencies
- 🔷 **TypeScript** - Full type safety
- 🌗 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - ARIA support and keyboard navigation
- 🎯 **Laravel-First** - Designed for Blade integration

## 📦 Installation

```bash
npm install @spire-ui/core
# or
yarn add @spire-ui/core
# or
pnpm add @spire-ui/core
```

## 🚀 Quick Start

### Option 1: Global (Auto-init)

Import the global bundle to automatically initialize all components:

```typescript
// In your app.js or main entry
import '@spire-ui/core/global';
```

This exposes `window.SpireUI` and `window.$v` for easy access.

### Option 2: Modular (Tree-shakeable)

Import only what you need:

```typescript
import { Modal, Dropdown, toast } from '@spire-ui/core';

// Initialize specific components
document.querySelectorAll('[data-v="modal"]').forEach(el => new Modal(el));

// Use utilities
toast.success('Hello World!');
```

### Option 3: Direct Component Import

For maximum tree-shaking:

```typescript
import { Modal } from '@spire-ui/core/components/Modal';
import { toast } from '@spire-ui/core/utilities/Toast';
```

## 📚 Components

### Form Components
- `Input` - Text input with icons, prefix/suffix, clearable
- `Select` - Custom select with search
- `MultiSelect` - Multiple selection with tags
- `DatePicker` - Date picker with calendar
- `DateRangePicker` - Date range selection
- `ColorPicker` - Color picker with swatches
- `RangeSlider` - Range slider input
- `Rating` - Star rating component

### Display Components
- `Modal` - Modal dialogs
- `Drawer` - Slide-out panels
- `Tabs` - Tabbed interface
- `Accordion` - Collapsible sections
- `Carousel` - Image/content carousel
- `Tooltip` - Hover tooltips
- `Popover` - Click popovers
- `Dropdown` - Dropdown menus

### Feedback Components
- `toast` - Toast notifications
- `confirm` - Confirmation dialogs
- `Progress` - Progress bars
- `Skeleton` - Loading skeletons

### Data Components
- `Table` - Data tables with sorting
- `VirtualScroll` - Virtual scrolling for large lists
- `InfiniteScroll` - Infinite scroll loading

### Navigation Components
- `CommandPalette` - ⌘K style command palette
- `ContextMenu` - Right-click context menus

### Window Manager
- `Window` - Desktop-style draggable windows
- `WindowTaskbar` - GNOME-style taskbar with app menu

## 🔧 Usage with Laravel Blade

Components use `data-v` attribute for binding:

```blade
{{-- Modal --}}
<div data-v="modal" data-modal-id="my-modal">
    <div data-modal-content>
        <h2>Modal Title</h2>
        <p>Modal content here</p>
    </div>
</div>

{{-- Dropdown --}}
<div data-v="dropdown">
    <button data-dropdown-trigger>Open Menu</button>
    <div data-dropdown-content>
        <a href="#">Option 1</a>
        <a href="#">Option 2</a>
    </div>
</div>

{{-- Tabs --}}
<div data-v="tabs">
    <div data-tabs-list>
        <button data-tab="tab1">Tab 1</button>
        <button data-tab="tab2">Tab 2</button>
    </div>
    <div data-tab-panel="tab1">Content 1</div>
    <div data-tab-panel="tab2">Content 2</div>
</div>
```

## 🌐 Global API

When using the global bundle:

```javascript
// Initialize all components
SpireUI.init();

// Get component instance
const modal = SpireUI.get(document.querySelector('[data-v="modal"]'));
modal.open();

// Toast notifications
SpireUI.toast.success('Saved!');
SpireUI.toast.error('Error occurred');
SpireUI.toast.warning('Warning!');
SpireUI.toast.info('Information');

// Confirmation dialog
const confirmed = await SpireUI.confirm({
    title: 'Delete item?',
    message: 'This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel'
});

// Keyboard shortcuts
SpireUI.shortcuts.register('ctrl+s', () => saveDocument());

// HTTP client
const data = await SpireUI.http.get('/api/users');

// Event bus
SpireUI.events.on('user:updated', (data) => console.log(data));
SpireUI.events.emit('user:updated', { id: 1, name: 'John' });

// Shorthand alias
$v.toast.success('Works too!');
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
