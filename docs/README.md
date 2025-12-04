# Spire UI - Documentação

Uma biblioteca TypeScript leve (~26KB gzip) para criar interfaces modernas em Laravel.

## 📦 Instalação

```bash
npm install
npm run build
```

## 🚀 Início Rápido

```html
<!-- No seu layout Blade -->
@vite(['resources/js/spire/global.ts', 'resources/css/app.css'])
```

```javascript
// Inicialização automática
// SpireUI inicializa automaticamente no DOMContentLoaded

// Ou manualmente
SpireUI.init();

// Acessar instância de um componente
const modal = SpireUI.get(document.getElementById('my-modal'));
modal.open();
```

## 📚 Componentes

### Layout
- [Sidebar](components/sidebar.md) - Menu lateral com modo colapsado
- [Navbar](components/navbar.md) - Barra de navegação integrada
- [Tabs](components/tabs.md) - Abas de navegação
- [Accordion](components/accordion.md) - Seções expansíveis
- [Stepper](components/stepper.md) - Wizard em passos

### Formulários
- [Button](components/button.md) - Botões com loading
- [Input](components/input.md) - Campos de entrada
- [Select](components/select.md) - Seleção customizada
- [MultiSelect](components/multiselect.md) - Seleção múltipla
- [DatePicker](components/datepicker.md) - Seletor de data
- [DateRangePicker](components/daterangepicker.md) - Intervalo de datas
- [ColorPicker](components/colorpicker.md) - Seletor de cores
- [RangeSlider](components/rangeslider.md) - Slider de valores
- [Rating](components/rating.md) - Avaliação por estrelas
- [FileUpload](components/fileupload.md) - Upload de arquivos

### Overlay
- [Modal](components/modal.md) - Janelas modais
- [Drawer](components/drawer.md) - Painéis deslizantes
- [Dropdown](components/dropdown.md) - Menus dropdown
- [Popover](components/popover.md) - Popovers
- [Tooltip](components/tooltip.md) - Dicas de ferramenta
- [ContextMenu](components/contextmenu.md) - Menu de contexto

### Feedback
- [Toast](components/toast.md) - Notificações
- [Progress](components/progress.md) - Barras de progresso
- [Skeleton](components/skeleton.md) - Loading skeletons

### Dados
- [Table](components/table.md) - Tabelas interativas
- [Carousel](components/carousel.md) - Carrossel de imagens
- [InfiniteScroll](components/infinitescroll.md) - Scroll infinito
- [VirtualScroll](components/virtualscroll.md) - Scroll virtual

### Utilitários
- [Clipboard](components/clipboard.md) - Copiar para área de transferência
- [CommandPalette](components/commandpalette.md) - Paleta de comandos (⌘K)
- [Collapse](components/collapse.md) - Colapsar elementos
- [LazyLoad](components/lazyload.md) - Carregamento lazy
- [Persist](components/persist.md) - Persistência de estado
- [FormValidator](components/formvalidator.md) - Validação de formulários

### Window Manager
- [Window](components/window.md) - Janelas arrastáveis estilo desktop

## 🎨 Temas

Spire UI suporta modo claro e escuro automaticamente via Tailwind CSS.

```javascript
// Toggle tema
SpireUI.theme.toggle();

// Definir tema
SpireUI.theme.set('dark');
SpireUI.theme.set('light');
SpireUI.theme.set('system');
```

## 📡 Eventos Globais

```javascript
// Event Bus
SpireUI.events.on('custom:event', (data) => console.log(data));
SpireUI.events.emit('custom:event', { foo: 'bar' });
SpireUI.events.off('custom:event', handler);

// Atalhos de teclado
SpireUI.shortcuts.add('ctrl+s', () => save());
SpireUI.shortcuts.remove('ctrl+s');
```

## 🔧 Utilitários

```javascript
// Debounce e Throttle
const debouncedFn = SpireUI.debounce(fn, 300);
const throttledFn = SpireUI.throttle(fn, 100);

// HTTP Client
const response = await SpireUI.http.get('/api/users');
await SpireUI.http.post('/api/users', { name: 'John' });

// Formatação de moeda
SpireUI.currency.format(1234.56); // "R$ 1.234,56"

// Máscaras de input
SpireUI.mask.apply(input, '(99) 99999-9999');
```

## 📏 Bundle Size

| Asset | Tamanho (gzip) |
|-------|----------------|
| global.js | ~26KB |
| app.css | ~12KB |
| **Total** | **~38KB** |
