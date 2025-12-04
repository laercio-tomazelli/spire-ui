# Drawer

Painéis deslizantes acessíveis que aparecem das bordas da tela.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<!-- Trigger -->
<button data-drawer-open="my-drawer" class="px-4 py-2 bg-primary-600 text-white rounded-lg">
  Abrir Drawer
</button>

<!-- Drawer -->
<div data-v="drawer" id="my-drawer" data-position="right" 
     class="hidden fixed inset-0 z-50 pointer-events-none">
  
  <!-- Overlay -->
  <div data-drawer-overlay 
       class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 pointer-events-auto">
  </div>
  
  <!-- Content -->
  <aside data-drawer-content 
         class="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl 
                transform translate-x-full transition-transform duration-300 pointer-events-auto">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-lg font-semibold">Título</h2>
      <button data-drawer-close class="p-1 hover:bg-gray-100 rounded">
        <svg class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <!-- Body -->
    <div class="p-4">
      <p>Conteúdo do drawer...</p>
    </div>
    
  </aside>
</div>
```

## Posições

```html
<!-- Direita (padrão) -->
<div data-v="drawer" data-position="right">
  <aside data-drawer-content class="absolute top-0 right-0 h-full w-80 translate-x-full">
  </aside>
</div>

<!-- Esquerda -->
<div data-v="drawer" data-position="left">
  <aside data-drawer-content class="absolute top-0 left-0 h-full w-80 -translate-x-full">
  </aside>
</div>

<!-- Topo -->
<div data-v="drawer" data-position="top">
  <aside data-drawer-content class="absolute top-0 left-0 right-0 h-auto -translate-y-full">
  </aside>
</div>

<!-- Bottom -->
<div data-v="drawer" data-position="bottom">
  <aside data-drawer-content class="absolute bottom-0 left-0 right-0 h-auto translate-y-full">
  </aside>
</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="drawer"` | Container | Identifica o componente drawer |
| `data-position` | Container | Posição: `left`, `right`, `top`, `bottom` |
| `data-duration` | Container | Duração da animação em ms (padrão: 400) |
| `data-drawer-overlay` | Div | Overlay de fundo |
| `data-drawer-content` | Aside | Container do conteúdo |
| `data-drawer-close` | Button | Botão que fecha o drawer |
| `data-drawer-toggle` | Button | Toggle externo (valor = id do drawer) |
| `data-drawer-open` | Button | Abre drawer externo (valor = id do drawer) |

## API JavaScript

```javascript
// Obter instância
const drawer = SpireUI.get(document.getElementById('my-drawer'));

// Métodos
drawer.open();    // Abrir
drawer.close();   // Fechar
drawer.toggle();  // Toggle
drawer.isOpen();  // Retorna boolean
drawer.destroy(); // Limpar listeners
```

### Encadeamento

```javascript
drawer.open(); // retorna this
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `drawer:opened` | Drawer aberto | `{ position: string }` |
| `drawer:closed` | Drawer fechado | `{ position: string }` |

```javascript
document.getElementById('my-drawer').addEventListener('drawer:opened', (e) => {
  console.log('Drawer aberto na posição:', e.detail.position);
});
```

## Comportamento

- **Overlay Click**: Fecha ao clicar no overlay
- **Escape**: Fecha ao pressionar Escape
- **Scroll Lock**: Body scroll travado enquanto aberto
- **Focus Trap**: Foco fica preso no drawer
- **Focus Restore**: Retorna foco ao elemento original ao fechar

## Triggers Externos

Você pode controlar drawers de qualquer lugar da página:

```html
<!-- Botões de controle -->
<button data-drawer-open="cart-drawer">Abrir Carrinho</button>
<button data-drawer-toggle="cart-drawer">Toggle Carrinho</button>

<!-- Drawer -->
<div data-v="drawer" id="cart-drawer">...</div>
```

## Drawer de Carrinho

```html
<div data-v="drawer" id="cart-drawer" data-position="right" 
     class="hidden fixed inset-0 z-50 pointer-events-none">
  
  <div data-drawer-overlay 
       class="absolute inset-0 bg-black/50 opacity-0 transition-opacity pointer-events-auto">
  </div>
  
  <aside data-drawer-content 
         class="absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 
                shadow-xl transform translate-x-full transition-transform pointer-events-auto
                flex flex-col">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <h2 class="text-lg font-semibold">Carrinho (3)</h2>
      <button data-drawer-close 
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Items (scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Item -->
      <div class="flex gap-4">
        <img src="/product.jpg" class="w-16 h-16 rounded-lg object-cover">
        <div class="flex-1">
          <h3 class="font-medium">Produto Exemplo</h3>
          <p class="text-sm text-gray-500">Qtd: 2</p>
          <p class="font-semibold text-primary-600">R$ 199,90</p>
        </div>
        <button class="text-gray-400 hover:text-red-500">
          <svg class="w-5 h-5"><!-- trash --></svg>
        </button>
      </div>
      <!-- mais items -->
    </div>
    
    <!-- Footer -->
    <div class="border-t dark:border-gray-700 p-4 space-y-4">
      <div class="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>R$ 599,70</span>
      </div>
      <button class="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
        Finalizar Compra
      </button>
    </div>
    
  </aside>
</div>
```

## Drawer de Filtros (Mobile)

```html
<div data-v="drawer" id="filters-drawer" data-position="left"
     class="hidden fixed inset-0 z-50 lg:hidden pointer-events-none">
  
  <div data-drawer-overlay 
       class="absolute inset-0 bg-black/50 opacity-0 transition-opacity pointer-events-auto">
  </div>
  
  <aside data-drawer-content 
         class="absolute top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 
                shadow-xl transform -translate-x-full transition-transform pointer-events-auto">
    
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-lg font-semibold">Filtros</h2>
      <button data-drawer-close class="p-1 hover:bg-gray-100 rounded">
        <svg class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <div class="p-4 space-y-6">
      <!-- Categoria -->
      <div>
        <h3 class="font-medium mb-2">Categoria</h3>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded">
            <span>Eletrônicos</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded">
            <span>Roupas</span>
          </label>
        </div>
      </div>
      
      <!-- Preço -->
      <div>
        <h3 class="font-medium mb-2">Faixa de Preço</h3>
        <div class="flex gap-2">
          <input type="number" placeholder="Min" class="w-full px-3 py-2 border rounded">
          <input type="number" placeholder="Max" class="w-full px-3 py-2 border rounded">
        </div>
      </div>
      
      <!-- Aplicar -->
      <button class="w-full py-2 bg-primary-600 text-white rounded-lg">
        Aplicar Filtros
      </button>
    </div>
    
  </aside>
</div>
```

## Exemplo Completo

```html
<!-- Toggle Button -->
<button data-drawer-open="settings-drawer" 
        class="fixed bottom-4 right-4 p-3 bg-primary-600 text-white rounded-full shadow-lg
               hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
</button>

<!-- Settings Drawer -->
<div data-v="drawer" id="settings-drawer" data-position="right" data-duration="300"
     class="hidden fixed inset-0 z-50 pointer-events-none">
  
  <!-- Overlay -->
  <div data-drawer-overlay 
       class="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 
              transition-opacity duration-300 pointer-events-auto">
  </div>
  
  <!-- Content -->
  <aside data-drawer-content 
         class="absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 
                shadow-2xl transform translate-x-full transition-transform duration-300 
                pointer-events-auto flex flex-col">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b dark:border-gray-800">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Configurações</h2>
      <button data-drawer-close 
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                     dark:hover:bg-gray-800 rounded-lg transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Body -->
    <div class="flex-1 overflow-y-auto p-5 space-y-6">
      
      <!-- Theme -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tema</h3>
        <div class="grid grid-cols-3 gap-2">
          <button class="p-3 border-2 border-primary-500 rounded-lg text-center">
            <span class="text-2xl">☀️</span>
            <span class="block text-xs mt-1">Claro</span>
          </button>
          <button class="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <span class="text-2xl">🌙</span>
            <span class="block text-xs mt-1">Escuro</span>
          </button>
          <button class="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <span class="text-2xl">💻</span>
            <span class="block text-xs mt-1">Sistema</span>
          </button>
        </div>
      </div>
      
      <!-- Notifications -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Notificações</h3>
        <div class="space-y-3">
          <label class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Email</span>
            <input type="checkbox" checked class="toggle">
          </label>
          <label class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Push</span>
            <input type="checkbox" class="toggle">
          </label>
        </div>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div class="p-5 border-t dark:border-gray-800">
      <button class="w-full py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     transition-colors">
        Salvar Configurações
      </button>
    </div>
    
  </aside>
</div>

<script>
const settingsDrawer = SpireUI.get(document.getElementById('settings-drawer'));

document.getElementById('settings-drawer').addEventListener('drawer:opened', () => {
  console.log('Configurações abertas');
});
</script>
```

## Acessibilidade

O componente configura automaticamente:

- `role="dialog"` no container
- `aria-modal="true"`
- `tabindex="-1"` no conteúdo para receber foco
