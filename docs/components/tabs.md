# Tabs

Sistema de abas acessível com suporte a navegação por teclado, abas dinâmicas e estados.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="tabs">
  <!-- Tab List -->
  <div role="tablist" class="flex border-b">
    <button data-tab="overview" class="px-4 py-2 border-b-2 border-transparent 
                                        hover:border-gray-300 active:border-primary-600">
      Visão Geral
    </button>
    <button data-tab="details" class="px-4 py-2 border-b-2 border-transparent 
                                       hover:border-gray-300">
      Detalhes
    </button>
    <button data-tab="settings" class="px-4 py-2 border-b-2 border-transparent 
                                        hover:border-gray-300">
      Configurações
    </button>
  </div>
  
  <!-- Panels -->
  <div data-panels>
    <div data-panel="overview" class="p-4">
      Conteúdo da visão geral...
    </div>
    <div data-panel="details" class="hidden p-4">
      Conteúdo dos detalhes...
    </div>
    <div data-panel="settings" class="hidden p-4">
      Conteúdo das configurações...
    </div>
  </div>
</div>
```

## Estilo Pill/Button

```html
<div data-v="tabs">
  <div role="tablist" class="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
    <button data-tab="tab1" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors
                   active:bg-white active:shadow dark:active:bg-gray-700">
      Tab 1
    </button>
    <button data-tab="tab2" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors">
      Tab 2
    </button>
  </div>
  
  <div data-panels class="mt-4">
    <!-- panels -->
  </div>
</div>
```

## Estilo Cards

```html
<div data-v="tabs">
  <div role="tablist" class="flex -mb-px">
    <button data-tab="tab1" 
            class="px-4 py-2 bg-white border border-b-white rounded-t-lg 
                   active:border-gray-200 active:border-b-white">
      Tab 1
    </button>
    <button data-tab="tab2" 
            class="px-4 py-2 bg-gray-50 border-b rounded-t-lg">
      Tab 2
    </button>
  </div>
  
  <div data-panels class="border rounded-b-lg rounded-tr-lg p-4">
    <!-- panels -->
  </div>
</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="tabs"` | Container | Identifica o componente tabs |
| `role="tablist"` | Container tabs | Lista de abas (opcional, auto-detectado) |
| `data-tab` | Button | Identificador único da aba |
| `data-panels` | Container | Container dos painéis (opcional) |
| `data-panel` | Div | Painel de conteúdo, deve coincidir com data-tab |

## API JavaScript

```javascript
// Obter instância
const tabs = SpireUI.get(document.querySelector('[data-v="tabs"]'));

// Mostrar aba
tabs.show('details');

// Obter aba atual
const current = tabs.current(); // 'details'

// Desabilitar/Habilitar
tabs.disable('settings');
tabs.enable('settings');

// Esconder/Mostrar
tabs.hide('settings');   // Esconde tab e panel
tabs.unhide('settings'); // Mostra novamente

// Destruir
tabs.destroy();
```

### Encadeamento

```javascript
tabs.disable('settings').show('overview');
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `tabs:changed` | Aba mudou | `{ tab: string }` |
| `tabs:disabled` | Aba desabilitada | `{ tab: string }` |
| `tabs:enabled` | Aba habilitada | `{ tab: string }` |
| `tabs:hidden` | Aba escondida | `{ tab: string }` |
| `tabs:shown` | Aba mostrada | `{ tab: string }` |

```javascript
document.querySelector('[data-v="tabs"]').addEventListener('tabs:changed', (e) => {
  console.log('Mudou para:', e.detail.tab);
});
```

## Navegação por Teclado

- **←** / **→**: Navegar entre abas
- **Home**: Ir para primeira aba
- **End**: Ir para última aba
- **Enter** / **Space**: Ativar aba focada

## Acessibilidade

O componente configura automaticamente:

- `role="tab"` nas abas
- `role="tabpanel"` nos painéis
- `aria-selected` na aba ativa
- `aria-controls` vinculando aba ao painel
- `aria-labelledby` vinculando painel à aba
- `tabindex` gerenciado automaticamente

## Classes Automáticas

| Classe | Descrição |
|--------|-----------|
| `active` | Aplicada à aba ativa |
| `hidden` | Aplicada aos painéis inativos |
| `disabled` | Aplicada a abas desabilitadas |
| `tab-hidden` | Aplicada a abas escondidas |

## Aba Inicial

Por padrão, a primeira aba é ativada. Para definir outra:

```html
<button data-tab="details" class="active" aria-selected="true">
  Detalhes
</button>
```

## Abas Dinâmicas

```javascript
// Adicionar aba
function addTab(id, label, content) {
  const tablist = document.querySelector('[role="tablist"]');
  const panels = document.querySelector('[data-panels]');
  
  // Criar tab
  const tab = document.createElement('button');
  tab.dataset.tab = id;
  tab.textContent = label;
  tab.className = 'px-4 py-2 border-b-2 border-transparent hover:border-gray-300';
  tablist.appendChild(tab);
  
  // Criar panel
  const panel = document.createElement('div');
  panel.dataset.panel = id;
  panel.className = 'hidden p-4';
  panel.innerHTML = content;
  panels.appendChild(panel);
  
  // Re-inicializar (ou usar observer)
  SpireUI.init();
}

// Remover aba
function removeTab(id) {
  const tab = document.querySelector(`[data-tab="${id}"]`);
  const panel = document.querySelector(`[data-panel="${id}"]`);
  tab?.remove();
  panel?.remove();
}
```

## Tabs com Ícones

```html
<div role="tablist" class="flex border-b">
  <button data-tab="home" class="flex items-center gap-2 px-4 py-2 border-b-2">
    <svg class="w-4 h-4"><!-- icon --></svg>
    <span>Home</span>
  </button>
  <button data-tab="settings" class="flex items-center gap-2 px-4 py-2 border-b-2">
    <svg class="w-4 h-4"><!-- icon --></svg>
    <span>Settings</span>
  </button>
</div>
```

## Tabs com Badge

```html
<button data-tab="notifications" class="flex items-center gap-2 px-4 py-2">
  Notificações
  <span class="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">5</span>
</button>
```

## Tabs com Close

```html
<button data-tab="tab1" class="group flex items-center gap-2 px-4 py-2">
  Tab 1
  <span onclick="event.stopPropagation(); removeTab('tab1')" 
        class="p-0.5 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100">
    <svg class="w-3 h-3"><!-- x icon --></svg>
  </span>
</button>
```

## Exemplo Completo

```html
<div data-v="tabs" id="product-tabs" class="bg-white dark:bg-gray-800 rounded-lg shadow">
  
  <!-- Tab List -->
  <div role="tablist" class="flex border-b dark:border-gray-700 px-4">
    <button data-tab="description" 
            class="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400
                   border-b-2 border-transparent -mb-px transition-colors
                   hover:text-gray-900 dark:hover:text-white
                   active:text-primary-600 active:border-primary-600">
      Descrição
    </button>
    <button data-tab="specs" 
            class="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400
                   border-b-2 border-transparent -mb-px transition-colors
                   hover:text-gray-900 dark:hover:text-white
                   active:text-primary-600 active:border-primary-600">
      Especificações
    </button>
    <button data-tab="reviews" 
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium 
                   text-gray-600 dark:text-gray-400 border-b-2 border-transparent -mb-px">
      Avaliações
      <span class="px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">127</span>
    </button>
  </div>
  
  <!-- Panels -->
  <div data-panels class="p-6">
    
    <div data-panel="description">
      <h3 class="text-lg font-semibold mb-3">Sobre o Produto</h3>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    
    <div data-panel="specs" class="hidden">
      <table class="w-full">
        <tbody class="divide-y dark:divide-gray-700">
          <tr>
            <td class="py-2 text-gray-500">Peso</td>
            <td class="py-2 font-medium">1.5kg</td>
          </tr>
          <tr>
            <td class="py-2 text-gray-500">Dimensões</td>
            <td class="py-2 font-medium">30 x 20 x 10 cm</td>
          </tr>
          <tr>
            <td class="py-2 text-gray-500">Material</td>
            <td class="py-2 font-medium">Alumínio</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div data-panel="reviews" class="hidden">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-4xl font-bold">4.8</div>
        <div>
          <div class="flex text-yellow-400">★★★★★</div>
          <div class="text-sm text-gray-500">127 avaliações</div>
        </div>
      </div>
      <!-- reviews list -->
    </div>
    
  </div>
</div>

<script>
const productTabs = SpireUI.get(document.getElementById('product-tabs'));

// Mudar aba via URL hash
if (location.hash) {
  const tabId = location.hash.slice(1);
  productTabs.show(tabId);
}

document.getElementById('product-tabs').addEventListener('tabs:changed', (e) => {
  // Atualizar URL hash
  history.replaceState(null, '', `#${e.detail.tab}`);
});
</script>
```

## Tabs Verticais

```html
<div data-v="tabs" class="flex gap-6">
  <!-- Sidebar Tabs -->
  <div role="tablist" class="flex flex-col w-48 border-r dark:border-gray-700">
    <button data-tab="general" 
            class="px-4 py-2 text-left border-l-2 border-transparent 
                   hover:bg-gray-50 active:border-primary-600 active:bg-primary-50">
      Geral
    </button>
    <button data-tab="security" 
            class="px-4 py-2 text-left border-l-2 border-transparent 
                   hover:bg-gray-50">
      Segurança
    </button>
  </div>
  
  <!-- Content -->
  <div data-panels class="flex-1">
    <div data-panel="general">...</div>
    <div data-panel="security" class="hidden">...</div>
  </div>
</div>
```
