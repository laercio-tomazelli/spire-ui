# Window Manager

Sistema de gerenciamento de janelas estilo desktop, permitindo criar janelas arrastáveis, redimensionáveis, minimizáveis e maximizáveis.

## Uso Básico

```html
<!-- Janela simples -->
<div data-v="window" data-title="Minha Janela">
  <p>Conteúdo da janela</p>
</div>

<!-- Taskbar (opcional) -->
<div data-v="window-taskbar"></div>
```

## Com Blade Component

```blade
<x-ui.window title="Formulário de Contato" icon="📧" width="600px" height="450px">
  <form>
    <x-ui.input label="Nome" name="name" />
    <x-ui.input label="Email" type="email" name="email" />
    <x-ui.button type="submit">Enviar</x-ui.button>
  </form>
</x-ui.window>

<!-- Múltiplas janelas -->
<x-ui.window title="Editor" icon="📝" :x="100" :y="100">
  <textarea class="w-full h-full border-0 resize-none focus:outline-none"></textarea>
</x-ui.window>

<x-ui.window title="Configurações" icon="⚙️" :x="150" :y="150">
  <p>Opções de configuração...</p>
</x-ui.window>

<!-- Taskbar para gerenciar janelas minimizadas -->
<x-ui.window-taskbar />
```

## Data Attributes - Window

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="window"` | - | - | Identifica o componente de janela |
| `data-title` | string | `"Janela"` | Título exibido na barra de título |
| `data-icon` | string | `"📋"` | Ícone (emoji ou caractere) da janela |
| `data-width` | string | `"400px"` | Largura inicial |
| `data-height` | string | `"300px"` | Altura inicial |
| `data-min-width` | number | `200` | Largura mínima em pixels |
| `data-min-height` | number | `150` | Altura mínima em pixels |
| `data-window-id` | string | auto | ID único da janela |

## Data Attributes - Taskbar

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="window-taskbar"` | - | - | Identifica a taskbar |

## Props Blade - Window

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `id` | string | auto | ID único da janela |
| `title` | string | `"Janela"` | Título da janela |
| `icon` | string | `"📋"` | Ícone da janela |
| `width` | string | `"500px"` | Largura inicial |
| `height` | string | `"400px"` | Altura inicial |
| `minWidth` | int | `200` | Largura mínima |
| `minHeight` | int | `150` | Altura mínima |
| `x` | int\|null | `null` | Posição X inicial |
| `y` | int\|null | `null` | Posição Y inicial |

## API JavaScript

```javascript
const window = SpireUI.get(document.querySelector('[data-v="window"]'));

// Métodos de controle
window.minimize();     // Minimiza para a taskbar
window.maximize();     // Maximiza para tela cheia
window.restore();      // Restaura do estado minimizado/maximizado
window.close();        // Fecha a janela
window.focus();        // Traz para frente

// Métodos de título
window.setTitle('Novo Título');
const title = window.getTitle();

// Verificar estado
const isMin = window.isMinimized();
const isMax = window.isMaximized();
```

## Métodos - Window

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `minimize()` | `this` | Minimiza a janela para a taskbar |
| `maximize()` | `this` | Maximiza a janela para tela cheia |
| `restore()` | `this` | Restaura do estado minimizado ou maximizado |
| `close()` | `this` | Fecha e remove a janela |
| `focus()` | `this` | Traz a janela para frente (z-index) |
| `setTitle(title)` | `this` | Define um novo título |
| `getTitle()` | `string` | Retorna o título atual |
| `isMinimized()` | `boolean` | Verifica se está minimizada |
| `isMaximized()` | `boolean` | Verifica se está maximizada |
| `destroy()` | `void` | Remove a instância e limpa eventos |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `window:focus` | `{ id }` | Quando a janela recebe foco |
| `window:minimized` | `{ id, title }` | Quando minimizada |
| `window:maximized` | `{ id }` | Quando maximizada |
| `window:restored` | `{ id }` | Quando restaurada |
| `window:closed` | `{ id, title }` | Quando fechada |
| `window:moved` | `{ x, y, width, height }` | Após mover ou redimensionar |
| `window:titlechanged` | `{ id, title }` | Quando o título muda |
| `window:created` | `{ id, title, instance }` | Quando uma nova janela é criada (em document.body) |

```javascript
// Ouvir eventos na janela
element.addEventListener('window:minimized', (e) => {
  console.log('Janela minimizada:', e.detail.title);
});

element.addEventListener('window:closed', (e) => {
  console.log('Janela fechada:', e.detail.id);
});

// Ouvir eventos globais (para taskbar)
document.body.addEventListener('window:created', (e) => {
  console.log('Nova janela criada:', e.detail.title);
});
```

## Exemplos

### Editor de Texto

```blade
<x-ui.window 
  title="Editor de Texto" 
  icon="📝" 
  width="700px" 
  height="500px"
>
  <div class="flex flex-col h-full">
    <div class="flex gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
      <button class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">Novo</button>
      <button class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">Abrir</button>
      <button class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">Salvar</button>
    </div>
    <textarea 
      class="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none bg-transparent"
      placeholder="Digite seu texto aqui..."
    ></textarea>
  </div>
</x-ui.window>
```

### Formulário de Contato

```blade
<x-ui.window 
  title="Contato" 
  icon="📧" 
  width="450px" 
  height="380px"
  :x="200"
  :y="120"
>
  <form class="space-y-4">
    <x-ui.input label="Nome" name="name" required />
    <x-ui.input label="E-mail" type="email" name="email" required />
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Mensagem
      </label>
      <textarea 
        name="message" 
        rows="4" 
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 resize-none"
      ></textarea>
    </div>
    <x-ui.button type="submit" class="w-full">Enviar Mensagem</x-ui.button>
  </form>
</x-ui.window>
```

### Galeria de Imagens

```blade
<x-ui.window 
  title="Galeria" 
  icon="🖼️" 
  width="600px" 
  height="450px"
>
  <div class="grid grid-cols-3 gap-2">
    @for ($i = 1; $i <= 9; $i++)
      <div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img src="https://picsum.photos/200?random={{ $i }}" class="w-full h-full object-cover" />
      </div>
    @endfor
  </div>
</x-ui.window>
```

### Sistema Multi-Janelas com Taskbar

```blade
<div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
  <!-- Janela 1 -->
  <x-ui.window 
    id="win-files" 
    title="Arquivos" 
    icon="📁" 
    :x="50" 
    :y="50"
  >
    <ul class="space-y-1">
      <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">📄 documento.pdf</li>
      <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">🖼️ imagem.png</li>
      <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">📊 planilha.xlsx</li>
    </ul>
  </x-ui.window>

  <!-- Janela 2 -->
  <x-ui.window 
    id="win-terminal" 
    title="Terminal" 
    icon="💻" 
    width="600px"
    :x="300" 
    :y="100"
  >
    <div class="bg-gray-900 text-green-400 font-mono text-sm p-4 h-full rounded">
      <p>$ npm run dev</p>
      <p class="text-gray-500">Starting development server...</p>
      <p class="text-green-300">✓ Ready on http://localhost:3000</p>
      <p class="mt-2 flex items-center">$ <span class="ml-1 animate-pulse">▌</span></p>
    </div>
  </x-ui.window>

  <!-- Janela 3 -->
  <x-ui.window 
    id="win-calc" 
    title="Calculadora" 
    icon="🔢" 
    width="280px" 
    height="350px"
    :x="500" 
    :y="200"
  >
    <div class="grid grid-cols-4 gap-1">
      <input type="text" class="col-span-4 text-right text-2xl p-2 bg-gray-100 dark:bg-gray-700 rounded mb-2" value="0" readonly />
      @foreach(['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '0', '.', '='] as $btn)
        <button class="p-3 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors {{ in_array($btn, ['÷', '×', '-', '+', '=']) ? 'bg-blue-500 text-white hover:bg-blue-600' : '' }}">
          {{ $btn }}
        </button>
      @endforeach
    </div>
  </x-ui.window>

  <!-- Taskbar -->
  <x-ui.window-taskbar />
</div>
```

### Controle Programático

```javascript
// Abrir nova janela dinamicamente
function openWindow(title, content) {
  const win = document.createElement('div');
  win.dataset.v = 'window';
  win.dataset.title = title;
  win.innerHTML = content;
  document.body.appendChild(win);
  SpireUI.init(); // Re-inicializa para capturar a nova janela
}

// Fechar todas as janelas
function closeAllWindows() {
  document.querySelectorAll('[data-v="window"]').forEach(el => {
    SpireUI.get(el)?.close();
  });
}

// Minimizar todas
function minimizeAll() {
  document.querySelectorAll('[data-v="window"]').forEach(el => {
    SpireUI.get(el)?.minimize();
  });
}

// Cascade (organizar em cascata)
function cascadeWindows() {
  let offset = 30;
  document.querySelectorAll('[data-v="window"]').forEach((el, i) => {
    el.style.left = `${50 + (i * offset)}px`;
    el.style.top = `${50 + (i * offset)}px`;
    SpireUI.get(el)?.restore()?.focus();
  });
}
```

## Funcionalidades

### Arrastar (Drag)
- Clique e arraste na barra de título para mover a janela
- A janela é mantida dentro dos limites da viewport
- Suporte a touch para dispositivos móveis

### Redimensionar
- Arraste as bordas (N, S, E, W) para redimensionar em uma direção
- Arraste os cantos (NE, NW, SE, SW) para redimensionar em duas direções
- Respeita os limites mínimos configurados

### Controles da Barra de Título
- **Minimizar**: Esconde a janela e adiciona à taskbar
- **Maximizar/Restaurar**: Alterna entre tela cheia e tamanho original
- **Fechar**: Remove a janela

### Z-Index Automático
- Clicar em uma janela a traz para frente automaticamente
- Gerenciamento automático de camadas

### Taskbar
- Mostra todas as janelas abertas
- Indica janelas minimizadas com indicador visual
- Clique para restaurar ou focar janela
- Relógio integrado

## Acessibilidade

- Botões de controle com `title` para tooltip
- Suporte a navegação por teclado nos botões
- ARIA implícito através de elementos semânticos
- Foco visual nos controles interativos
- Suporte a modo escuro

## Notas de Implementação

- Peso estimado: ~4-5KB (gzip)
- Zero dependências externas
- Usa CSS para transições (não JavaScript)
- Eventos são removidos automaticamente no `destroy()`
- Múltiplas janelas são gerenciadas por um registry global
