# VirtualScroll

Scroll virtualizado para listas longas com alta performance.

## Uso Básico

```html
<div data-v="virtual-scroll" 
     data-item-height="48"
     class="h-96 border rounded-lg">
</div>
```

## Com Blade Component

```blade
<x-ui.virtual-scroll 
  id="user-list"
  item-height="64"
  class="h-[600px]"
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="virtual-scroll"` | - | - | Identifica o componente |
| `data-item-height` | number | `48` | Altura de cada item em pixels |

## API JavaScript

```javascript
const virtual = SpireUI.get(document.querySelector('[data-v="virtual-scroll"]'));

// Definir itens
virtual.setItems(arrayWith10000Items);

// Definir função de render
virtual.setRenderItem((item, index) => `
  <div class="flex items-center gap-3 px-4 h-12 border-b">
    <span class="font-medium">${item.name}</span>
    <span class="text-gray-500">${item.email}</span>
  </div>
`);

// Scroll para um índice específico
virtual.scrollTo(500);

// Atualizar após redimensionar
virtual.refresh();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `setItems(items)` | `this` | Define o array de itens |
| `setRenderItem(fn)` | `this` | Define a função de renderização |
| `scrollTo(index)` | `this` | Scroll para um índice específico |
| `refresh()` | `this` | Recalcula e re-renderiza |
| `destroy()` | `void` | Remove a instância |

## Como Funciona

1. Apenas os itens visíveis são renderizados no DOM
2. Um "spacer" mantém a altura total para o scroll
3. Ao rolar, os itens visíveis são recalculados e re-renderizados
4. O container de itens é posicionado com `transform: translateY()`

```
┌─────────────────────────────────┐
│ Viewport (itens visíveis)        │
│ ┌───────────────────────────┐   │
│ │ Item 100                  │   │
│ │ Item 101                  │   │
│ │ Item 102                  │   │
│ │ Item 103                  │   │
│ │ Item 104                  │   │
│ └───────────────────────────┘   │
│                                  │
│ ▼ Spacer (altura total)          │
└─────────────────────────────────┘
```

## Estrutura Interna

```html
<div data-v="virtual-scroll" class="overflow-auto relative h-96">
  <!-- Spacer para altura total -->
  <div data-virtual-spacer style="height: 480000px;"></div>
  
  <!-- Container dos itens visíveis -->
  <div style="position: absolute; transform: translateY(4800px);">
    <div style="height: 48px;">Item 100</div>
    <div style="height: 48px;">Item 101</div>
    <div style="height: 48px;">Item 102</div>
    <!-- ... apenas ~10 itens -->
  </div>
</div>
```

## Exemplos

### Lista de Usuários

```html
<div data-v="virtual-scroll" 
     data-item-height="64"
     id="users-list"
     class="h-[600px] border rounded-lg">
</div>

<script>
const users = @json($users); // Array com milhares de usuários

const list = SpireUI.get(document.getElementById('users-list'));

list.setRenderItem((user, index) => `
  <div class="flex items-center gap-4 px-4 h-16 border-b hover:bg-gray-50">
    <img src="${user.avatar}" class="w-10 h-10 rounded-full">
    <div class="flex-1">
      <div class="font-medium">${user.name}</div>
      <div class="text-sm text-gray-500">${user.email}</div>
    </div>
    <span class="text-sm text-gray-400">#${index + 1}</span>
  </div>
`);

list.setItems(users);
</script>
```

### Log de Eventos

```html
<div data-v="virtual-scroll" 
     data-item-height="32"
     id="event-log"
     class="h-80 bg-gray-900 text-green-400 font-mono text-sm rounded-lg">
</div>

<script>
const log = SpireUI.get(document.getElementById('event-log'));
let events = [];

log.setRenderItem((event, index) => `
  <div class="flex items-center h-8 px-3 border-b border-gray-800">
    <span class="text-gray-500 w-16">${event.time}</span>
    <span class="${event.level === 'error' ? 'text-red-400' : ''}">[${event.level}]</span>
    <span class="ml-2">${event.message}</span>
  </div>
`);

// Adicionar eventos em tempo real
function addEvent(event) {
  events.push(event);
  log.setItems(events);
  log.scrollTo(events.length - 1); // Scroll para o final
}
</script>
```

### Tabela de Dados

```html
<div class="border rounded-lg overflow-hidden">
  <!-- Header fixo -->
  <div class="flex bg-gray-100 font-medium text-sm">
    <div class="w-16 p-3 border-r">ID</div>
    <div class="flex-1 p-3 border-r">Nome</div>
    <div class="w-32 p-3 border-r">Status</div>
    <div class="w-24 p-3">Ações</div>
  </div>
  
  <!-- Body virtualizado -->
  <div data-v="virtual-scroll" 
       data-item-height="48"
       id="data-table"
       class="h-[400px]">
  </div>
</div>

<script>
const table = SpireUI.get(document.getElementById('data-table'));

table.setRenderItem((row, index) => `
  <div class="flex items-center h-12 border-b hover:bg-gray-50">
    <div class="w-16 px-3 text-gray-500">${row.id}</div>
    <div class="flex-1 px-3 font-medium">${row.name}</div>
    <div class="w-32 px-3">
      <span class="px-2 py-1 text-xs rounded-full ${row.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
        ${row.active ? 'Ativo' : 'Inativo'}
      </span>
    </div>
    <div class="w-24 px-3">
      <button class="text-blue-600 hover:underline">Editar</button>
    </div>
  </div>
`);

table.setItems(largeDataset);
</script>
```

### Com Busca

```html
<div class="space-y-4">
  <input type="text" 
         placeholder="Buscar..." 
         class="w-full px-4 py-2 border rounded-lg"
         id="search-input">
  
  <div data-v="virtual-scroll" 
       data-item-height="48"
       id="search-results"
       class="h-80 border rounded-lg">
  </div>
</div>

<script>
const allItems = [...]; // Array grande
const list = SpireUI.get(document.getElementById('search-results'));

list.setRenderItem((item) => `
  <div class="flex items-center h-12 px-4 border-b">
    ${item.name}
  </div>
`);

list.setItems(allItems);

document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allItems.filter(item => 
    item.name.toLowerCase().includes(query)
  );
  list.setItems(filtered);
});
</script>
```

## Performance

| Itens | DOM sem VirtualScroll | DOM com VirtualScroll |
|-------|----------------------|----------------------|
| 1.000 | ~1.000 elementos | ~20 elementos |
| 10.000 | ~10.000 elementos | ~20 elementos |
| 100.000 | Travamentos | ~20 elementos |

## Limitações

1. **Altura fixa**: Todos os itens devem ter a mesma altura
2. **Sem altura automática**: Defina `data-item-height` explicitamente
3. **Re-render ao rolar**: O conteúdo é recriado a cada scroll

## Requisitos

- Container deve ter altura definida (`h-96`, `h-[600px]`, etc.)
- Itens devem ter altura consistente
- Função `renderItem` deve retornar HTML string

## Quando Usar

✅ Listas com **milhares** de itens  
✅ Tabelas de dados grandes  
✅ Logs em tempo real  
✅ Seletores com muitas opções  

❌ Listas pequenas (< 100 itens)  
❌ Itens com alturas variáveis  
❌ Layouts complexos que precisam de DOM completo
