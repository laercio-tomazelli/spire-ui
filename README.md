# 🚀 Vanilla Pro 2025

**Uma biblioteca JavaScript/TypeScript ultra-leve (~19KB gzip) para substituir Alpine.js em projetos Laravel.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzip-~19KB-brightgreen.svg)]()

## ✨ Features

- 🪶 **Ultra-leve**: ~19KB gzip (vs Alpine.js ~15KB + plugins)
- 🔒 **TypeScript nativo**: Tipagem completa e autocompletion
- ♿ **Acessível**: ARIA labels, keyboard navigation, focus trap
- 🌙 **Dark Mode**: Suporte nativo com persistência
- 📱 **Responsivo**: Touch gestures e mobile-first
- 🔌 **Zero dependências**: Não precisa de jQuery, React, ou Vue
- ⚡ **Rápido**: Inicialização automática, sem virtual DOM
- 🎨 **Tailwind CSS**: Integração perfeita

## 📦 Componentes (25 total)

### UI Básicos
| Componente | Descrição |
|------------|-----------|
| `button` | Botões com loading, success, error states |
| `input` | Inputs com validação e máscaras |
| `modal` | Modais acessíveis com trap de foco |
| `dropdown` | Dropdowns com keyboard navigation |
| `table` | Tabelas com loading e empty states |
| `tabs` | Tabs acessíveis com ARIA |
| `accordion` | Acordeões com single/multiple mode |
| `tooltip` | Tooltips posicionáveis |

### Seleção
| Componente | Descrição |
|------------|-----------|
| `select` | Select customizado |
| `multiselect` | Multi-seleção com tags e busca |
| `datepicker` | Seletor de data nativo |
| `colorpicker` | Seletor de cores com presets |

### Overlay
| Componente | Descrição |
|------------|-----------|
| `drawer` | Painel deslizante (4 posições) |
| `popover` | Popover posicionável |
| `confirm` | Diálogos de confirmação |

### Feedback
| Componente | Descrição |
|------------|-----------|
| `toast` | Sistema de notificações com queue |
| `progress` | Barras de progresso animadas |
| `skeleton` | Loading placeholders |

### Formulários
| Componente | Descrição |
|------------|-----------|
| `form` | Validação declarativa de formulários |
| `upload` | Upload com drag & drop e preview |
| `range` | Slider customizável |
| `stepper` | Wizard multi-etapas |

### Performance
| Componente | Descrição |
|------------|-----------|
| `lazy` | Lazy loading com Intersection Observer |
| `infinitescroll` | Scroll infinito para listas |
| `virtualscroll` | Virtual scrolling (1000+ itens) |

### Utilitários
| Componente | Descrição |
|------------|-----------|
| `clipboard` | Copiar para área de transferência |
| `persist` | Persistência em localStorage/sessionStorage |
| `shortcuts` | Sistema de atalhos de teclado |
| `command` | Command Palette (⌘K) |

## 🚀 Instalação

### Laravel + Vite

```bash
# Já incluído no projeto - apenas importe
```

```typescript
// resources/js/app.ts
import './vanilla-pro';
```

## 📖 Uso Básico

### HTML Declarativo

```html
<!-- Botão com estados -->
<button data-v="button" id="save">Salvar</button>

<!-- Input com validação -->
<input data-v="input" data-validate="required|email" name="email">

<!-- Modal -->
<div data-v="modal" id="my-modal">
  <div data-title>Título</div>
  <div data-body>Conteúdo</div>
</div>

<!-- Tabs -->
<div data-v="tabs">
  <button data-tab="tab1">Tab 1</button>
  <button data-tab="tab2">Tab 2</button>
  <div data-panel="tab1">Conteúdo 1</div>
  <div data-panel="tab2">Conteúdo 2</div>
</div>
```

### JavaScript API

```javascript
// Botões
document.getElementById('save').$button.loading(true);
document.getElementById('save').$button.success('Salvo!');

// Toasts
VanillaPro.toast.success('Operação realizada!');
VanillaPro.toast.error('Erro!');
VanillaPro.toast.info('Informação');
VanillaPro.toast.warning('Atenção');

// Confirm
const confirmed = await VanillaPro.confirm({
  title: 'Confirmar',
  message: 'Deseja continuar?',
  confirmText: 'Sim',
  cancelText: 'Não'
});

// Command Palette
VanillaPro.command.registerCommand({
  id: 'save',
  title: 'Salvar documento',
  shortcut: 'Ctrl+S',
  handler: () => save()
});

// Keyboard Shortcuts
VanillaPro.shortcuts.register({
  key: 's',
  ctrl: true,
  handler: () => save()
});
```

## 🎯 Validação de Formulários

```html
<form data-v="form">
  <input name="nome" data-validate="required|min:3" />
  <input name="email" data-validate="required|email" />
  <input name="cpf" data-validate="required|cpf" />
  <input name="cnpj" data-validate="required|cnpj" />
  <input name="site" data-validate="url" />
  <input name="senha" data-validate="required|min:8" />
  <input name="confirmar" data-validate="confirmed:senha" />
  <button type="submit">Enviar</button>
</form>
```

### Regras Disponíveis

| Regra | Descrição |
|-------|-----------|
| `required` | Campo obrigatório |
| `email` | Email válido |
| `min:N` | Mínimo N caracteres |
| `max:N` | Máximo N caracteres |
| `minValue:N` | Valor mínimo N |
| `maxValue:N` | Valor máximo N |
| `pattern:regex` | Regex customizado |
| `url` | URL válida |
| `numeric` | Apenas números |
| `alpha` | Apenas letras |
| `alphanumeric` | Letras e números |
| `phone` | Telefone |
| `cpf` | CPF válido |
| `cnpj` | CNPJ válido |
| `date` | Data válida |
| `confirmed:field` | Confirmar com outro campo |

## 📅 DatePicker

```html
<input data-v="datepicker" 
       data-format="dd/mm/yyyy"
       data-min="01/01/2024"
       data-max="31/12/2025" />
```

```javascript
element.$datepicker.setValue('15/06/2025');
element.$datepicker.open();
element.$datepicker.close();
```

## 🎨 ColorPicker

```html
<input data-v="colorpicker" 
       data-presets="#EF4444,#22C55E,#3B82F6,#8B5CF6" />
```

```javascript
element.$colorpicker.setValue('#FF5733');
console.log(element.$colorpicker.value()); // #FF5733
```

## 📤 File Upload

```html
<div data-v="upload" data-max-files="5" data-max-size="5242880">
  <input type="file" multiple accept="image/*" />
</div>
```

```javascript
element.$upload.files(); // Array de arquivos
element.$upload.clear(); // Limpar seleção
element.$upload.remove(0); // Remover arquivo
```

## ⌨️ Command Palette (⌘K)

```javascript
// Abrir com Ctrl+K ou programaticamente
VanillaPro.command.open();

// Registrar comandos
VanillaPro.command.registerCommand({
  id: 'new-file',
  title: 'Novo Arquivo',
  description: 'Criar um novo arquivo',
  icon: '📄',
  shortcut: 'Ctrl+N',
  category: 'Arquivo',
  handler: () => createFile()
});

VanillaPro.command.setCommands([
  { id: 'save', title: 'Salvar', handler: save },
  { id: 'open', title: 'Abrir', handler: open }
]);
```

## 📜 Virtual Scroll (1000+ items)

```html
<div data-v="virtualscroll" data-item-height="48" style="height: 400px;">
</div>
```

```javascript
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
element.$virtualscroll.setItems(items);
element.$virtualscroll.scrollTo(500); // Ir para item 500
```

## 💾 Persistência

```html
<!-- Salvar valor no localStorage -->
<input data-v="persist" data-persist-key="user-name" id="name" />

<!-- Salvar múltiplas propriedades -->
<div data-v="persist" 
     data-persist="value,class" 
     data-persist-session="true">
</div>
```

## 🌙 Dark Mode

O dark mode funciona automaticamente com Tailwind CSS:

```javascript
// Toggle manual
document.documentElement.classList.toggle('dark');

// Ou use o botão flutuante que é criado automaticamente
```

## 🎭 Eventos

Todos os componentes emitem eventos customizados:

```javascript
// Botão
element.addEventListener('button:loading', (e) => console.log(e.detail));
element.addEventListener('button:success', (e) => console.log(e.detail));

// Modal
element.addEventListener('modal:opened', () => {});
element.addEventListener('modal:closed', () => {});

// Form
element.addEventListener('form:valid', () => {});
element.addEventListener('form:invalid', (e) => console.log(e.detail.errors));

// Upload
element.addEventListener('upload:files-added', (e) => console.log(e.detail.files));
element.addEventListener('upload:file-too-large', (e) => {});

// DatePicker
element.addEventListener('datepicker:change', (e) => console.log(e.detail.date));

// Command Palette
document.addEventListener('commandpalette:opened', () => {});
document.addEventListener('command:executed', (e) => console.log(e.detail.command));
```

## 🔧 Configuração

### Inicialização

```javascript
// Auto-inicializa em DOMContentLoaded
// Para re-inicializar após AJAX:
VanillaPro.init();

// Destruir instância
VanillaPro.destroy(element);

// Destruir todas
VanillaPro.destroyAll();
```

## 🛠️ Utilities

### Debounce & Throttle

```javascript
// Debounce - atrasa execução até parar de chamar
const search = VanillaPro.debounce((query) => {
  console.log('Buscando:', query);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));

// Throttle - limita frequência de execução
const onScroll = VanillaPro.throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', onScroll);
```

### Event Bus

```javascript
// Escutar eventos globais
VanillaPro.events.on('cart:updated', (data) => {
  console.log('Carrinho atualizado:', data);
});

// Emitir eventos
VanillaPro.events.emit('cart:updated', { items: 3, total: 150.00 });

// Listener único (auto-remove após primeira chamada)
VanillaPro.events.once('user:logged-in', (user) => {
  console.log('Bem-vindo,', user.name);
});

// Remover listener
const handler = (data) => console.log(data);
VanillaPro.events.on('event', handler);
VanillaPro.events.off('event', handler);
```

### HTTP Client

```javascript
// GET request
const users = await VanillaPro.http.get('/api/users');

// POST request
const user = await VanillaPro.http.post('/api/users', {
  name: 'João',
  email: 'joao@email.com'
});

// PUT request
await VanillaPro.http.put('/api/users/1', { name: 'João Silva' });

// DELETE request
await VanillaPro.http.delete('/api/users/1');

// Com opções customizadas
const data = await VanillaPro.http.get('/api/data', {
  headers: { 'X-Custom': 'value' },
  timeout: 5000
});
```

### Currency Formatter

```javascript
// Formatar em BRL (padrão)
VanillaPro.currency.format(1234.56);
// → "R$ 1.234,56"

// Formatar em USD
VanillaPro.currency.format(1234.56, { locale: 'en-US', currency: 'USD' });
// → "$1,234.56"

// Parse de string para número
VanillaPro.currency.parse('R$ 1.234,56');
// → 1234.56
```

### Input Masks

```javascript
const input = document.getElementById('phone');

// Máscaras prontas
VanillaPro.mask.apply(input, 'phone');    // (00) 00000-0000
VanillaPro.mask.apply(input, 'cpf');      // 000.000.000-00
VanillaPro.mask.apply(input, 'cnpj');     // 00.000.000/0000-00
VanillaPro.mask.apply(input, 'cep');      // 00000-000
VanillaPro.mask.apply(input, 'money');    // R$ 0,00
VanillaPro.mask.apply(input, 'creditcard'); // 0000 0000 0000 0000
VanillaPro.mask.apply(input, 'date');     // DD/MM/AAAA
VanillaPro.mask.apply(input, 'time');     // HH:MM

// Máscara customizada (# = dígito)
VanillaPro.mask.apply(input, '###.###.###-##');

// Obter valor sem máscara
VanillaPro.mask.getValue(input);
// Input: "(11) 98765-4321" → "11987654321"

// Remover máscara
VanillaPro.mask.remove(input);
```

### Performance Monitor

```javascript
// Marcar início
VanillaPro.perf.mark('render-start');

// ... código a medir ...

// Marcar fim
VanillaPro.perf.mark('render-end');

// Medir tempo entre marcações
const duration = VanillaPro.perf.measure('render-time', 'render-start', 'render-end');
console.log(`Renderização: ${duration}ms`);

// Obter todas as marcações
const marks = VanillaPro.perf.getMarks();

// Limpar medições
VanillaPro.perf.clear();
```

### Accessibility (A11y)

```javascript
// Anunciar para screen readers
VanillaPro.a11y.announce('Item adicionado ao carrinho');
VanillaPro.a11y.announce('Erro ao salvar!', 'assertive');

// Focus trap em container
const releaseFocus = VanillaPro.a11y.trapFocus(modalElement);
// Quando fechar o modal:
releaseFocus();

// Criar skip link de navegação
VanillaPro.a11y.skipLink('#main-content', 'Pular para conteúdo');
```

### Error Handler

```javascript
// Handler global para erros de componentes
VanillaPro.onError((error, context) => {
  console.error('Erro no componente:', context?.component);
  console.error('Elemento:', context?.element);
  console.error('Mensagem:', error.message);
  
  // Enviar para serviço de monitoramento
  // Sentry.captureException(error);
});
```

## 📊 Comparação

| Feature | Vanilla Pro | Alpine.js | jQuery |
|---------|-------------|-----------|--------|
| Tamanho (gzip) | ~19KB | ~15KB + plugins | ~30KB |
| TypeScript | ✅ Nativo | ❌ | ❌ |
| Componentes | 25 | ~10 | 0 |
| Form Validation | ✅ | Plugin | Plugin |
| Command Palette | ✅ | ❌ | ❌ |
| Virtual Scroll | ✅ | ❌ | ❌ |
| HTTP Client | ✅ | ❌ | ✅ |
| Input Masks | ✅ | Plugin | Plugin |
| Event Bus | ✅ | ❌ | ❌ |
| Dark Mode | ✅ | Manual | Manual |
| Laravel Blade | ✅ | ✅ | ✅ |

## 🧪 Testes

```bash
npm run test        # Rodar testes
npm run test:ui     # UI interativa
```

## 📁 Estrutura do Projeto

```
vanilla-pro-app/
├── resources/
│   ├── js/
│   │   └── vanilla-pro.ts    # Biblioteca principal (~4300 linhas)
│   └── views/
│       └── components/
│           └── ui/           # Blade components
├── tests/
│   └── vanilla-pro.test.ts   # Testes Vitest
└── public/
    └── build/                # Assets compilados
```

## 📄 Licença

MIT © 2025

---

**Feito com ❤️ para a comunidade Laravel**
