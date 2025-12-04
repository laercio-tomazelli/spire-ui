# Dropdown

Menu dropdown acessível com suporte a click outside e navegação por teclado.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="dropdown" class="relative">
  <!-- Trigger -->
  <button data-trigger class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
    Opções
    <svg class="w-4 h-4 inline-block ml-1"><!-- chevron --></svg>
  </button>
  
  <!-- Menu -->
  <div data-menu class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
    <a href="#" class="block px-4 py-2 hover:bg-gray-50">Editar</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-50">Duplicar</a>
    <hr class="my-1">
    <a href="#" class="block px-4 py-2 text-red-600 hover:bg-gray-50">Excluir</a>
  </div>
</div>
```

## Com Ícones

```html
<div data-v="dropdown" class="relative">
  <button data-trigger class="p-2 hover:bg-gray-100 rounded-full">
    <svg class="w-5 h-5"><!-- dots icon --></svg>
  </button>
  
  <div data-menu class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">
    <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
      <svg class="w-4 h-4 text-gray-500"><!-- edit icon --></svg>
      Editar
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
      <svg class="w-4 h-4 text-gray-500"><!-- copy icon --></svg>
      Duplicar
    </a>
    <hr class="my-1">
    <a href="#" class="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50">
      <svg class="w-4 h-4"><!-- trash icon --></svg>
      Excluir
    </a>
  </div>
</div>
```

## Posições

```html
<!-- Alinhado à direita (padrão) -->
<div data-menu class="absolute right-0 mt-2">...</div>

<!-- Alinhado à esquerda -->
<div data-menu class="absolute left-0 mt-2">...</div>

<!-- Acima -->
<div data-menu class="absolute bottom-full right-0 mb-2">...</div>

<!-- Largura completa -->
<div data-menu class="absolute left-0 right-0 mt-2">...</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="dropdown"` | Container | Identifica o componente dropdown |
| `data-trigger` | Button | Elemento que abre o dropdown |
| `data-menu` | Div | Container do menu dropdown |

## API JavaScript

```javascript
// Obter instância
const dropdown = SpireUI.get(document.querySelector('[data-v="dropdown"]'));

// Métodos
dropdown.open();    // Abrir
dropdown.close();   // Fechar
dropdown.toggle();  // Toggle
dropdown.destroy(); // Limpar listeners
```

### Encadeamento

```javascript
dropdown.open().close(); // Abre e fecha
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `dropdown:opened` | Dropdown aberto | `{}` |
| `dropdown:closed` | Dropdown fechado | `{}` |

```javascript
document.querySelector('[data-v="dropdown"]').addEventListener('dropdown:opened', () => {
  console.log('Dropdown aberto');
});
```

## Comportamento

- **Click Outside**: Fecha automaticamente ao clicar fora
- **Escape**: Fecha ao pressionar Escape e retorna foco ao trigger
- **Acessibilidade**: `aria-haspopup`, `aria-expanded`, `role="menu"` configurados automaticamente

## Com Grupos

```html
<div data-menu class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">
  <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
    Ações
  </div>
  <a href="#" class="block px-4 py-2 hover:bg-gray-50">Editar</a>
  <a href="#" class="block px-4 py-2 hover:bg-gray-50">Duplicar</a>
  
  <div class="border-t my-1"></div>
  
  <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
    Perigoso
  </div>
  <a href="#" class="block px-4 py-2 text-red-600 hover:bg-red-50">Excluir</a>
</div>
```

## Dropdown de Usuário

```html
<div data-v="dropdown" class="relative">
  <button data-trigger class="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full">
    <img src="/avatar.jpg" alt="User" class="w-8 h-8 rounded-full">
    <span class="hidden sm:inline">João Silva</span>
    <svg class="w-4 h-4"><!-- chevron --></svg>
  </button>
  
  <div data-menu class="hidden absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 
                        rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-3 border-b dark:border-gray-700">
      <p class="font-medium text-gray-900 dark:text-white">João Silva</p>
      <p class="text-sm text-gray-500">joao@email.com</p>
    </div>
    
    <!-- Links -->
    <div class="py-1">
      <a href="/profile" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
        <svg class="w-4 h-4 text-gray-500"><!-- user icon --></svg>
        Meu Perfil
      </a>
      <a href="/settings" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
        <svg class="w-4 h-4 text-gray-500"><!-- cog icon --></svg>
        Configurações
      </a>
    </div>
    
    <!-- Footer -->
    <div class="border-t dark:border-gray-700 py-1">
      <a href="/logout" class="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
        <svg class="w-4 h-4"><!-- logout icon --></svg>
        Sair
      </a>
    </div>
  </div>
</div>
```

## Exemplo Completo

```html
<div data-v="dropdown" id="actions-dropdown" class="relative inline-block">
  
  <!-- Trigger -->
  <button data-trigger 
          class="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg
                 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:outline-none">
    <span>Ações</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>
  
  <!-- Menu -->
  <div data-menu 
       class="hidden absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800
              rounded-lg shadow-lg border dark:border-gray-700 focus:outline-none z-50">
    
    <div class="py-1">
      <button class="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 
                     dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="w-4 h-4"><!-- edit --></svg>
        Editar
      </button>
      
      <button class="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 
                     dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="w-4 h-4"><!-- copy --></svg>
        Duplicar
      </button>
      
      <button class="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 
                     dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="w-4 h-4"><!-- archive --></svg>
        Arquivar
      </button>
    </div>
    
    <div class="border-t dark:border-gray-700"></div>
    
    <div class="py-1">
      <button class="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 
                     hover:bg-red-50 dark:hover:bg-red-900/20">
        <svg class="w-4 h-4"><!-- trash --></svg>
        Excluir
      </button>
    </div>
    
  </div>
</div>

<script>
document.getElementById('actions-dropdown').addEventListener('dropdown:opened', () => {
  console.log('Menu de ações aberto');
});
</script>
```

## Animações

Adicione animações com CSS:

```css
[data-v="dropdown"] [data-menu] {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

[data-v="dropdown"] [data-menu]:not(.hidden) {
  transform: scale(1);
  opacity: 1;
}
```

Ou use Tailwind com classes de animação:

```html
<div data-menu class="hidden ... transform transition-all duration-100 
                      scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100">
```
