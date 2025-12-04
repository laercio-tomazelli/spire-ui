# Navbar

Barra de navegação fixa com integração automática ao Sidebar.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<nav data-v="navbar" class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 
                            border-b shadow-sm z-40">
  <div class="h-full flex items-center justify-between px-4">
    <!-- Logo -->
    <div data-navbar-logo>
      <img src="/logo.svg" alt="Logo" class="h-8">
    </div>
    
    <!-- Center Content -->
    <div data-navbar-center class="hidden md:flex items-center gap-4">
      <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
      <a href="/products" class="text-gray-600 hover:text-gray-900">Produtos</a>
    </div>
    
    <!-- Actions -->
    <div data-navbar-actions class="flex items-center gap-3">
      <button class="p-2 hover:bg-gray-100 rounded-full">
        <svg class="w-5 h-5"><!-- bell icon --></svg>
      </button>
      <img src="/avatar.jpg" class="w-8 h-8 rounded-full">
    </div>
  </div>
</nav>
```

## Integração com Sidebar

```html
<!-- Sidebar -->
<div data-v="sidebar" id="app-sidebar">
  <!-- ... -->
</div>

<!-- Navbar vinculado ao Sidebar -->
<nav data-v="navbar" data-sidebar="app-sidebar" 
     class="fixed top-0 left-0 right-0 h-16 lg:pl-64 transition-all duration-300">
  
  <!-- Logo aparece quando sidebar colapsa -->
  <div data-navbar-logo class="opacity-0 w-0 overflow-hidden transition-all duration-300">
    <img src="/logo.svg" alt="Logo" class="h-8">
  </div>
  
  <!-- Toggle mobile -->
  <button data-navbar-mobile-toggle class="lg:hidden p-2">
    <svg class="w-6 h-6"><!-- menu icon --></svg>
  </button>
  
  <!-- ... resto do conteúdo -->
</nav>
```

## Estrutura com 4 Áreas

```html
<nav data-v="navbar" data-sidebar="sidebar" class="fixed top-0 left-0 right-0 h-16 lg:pl-64">
  <div class="h-full flex items-center px-4">
    
    <!-- 1. Logo Area (aparece quando sidebar colapsa) -->
    <div data-navbar-logo class="opacity-0 w-0 overflow-hidden transition-all">
      <img src="/logo.svg" class="h-8">
    </div>
    
    <!-- Mobile Toggle -->
    <button data-navbar-mobile-toggle class="lg:hidden p-2 mr-2">
      <svg class="w-6 h-6"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    
    <!-- 2. Center Area -->
    <div data-navbar-center class="flex-1 flex items-center justify-center">
      <!-- Searchbar, breadcrumbs, etc -->
    </div>
    
    <!-- 3. SAC Area (Support/Help) -->
    <div data-navbar-sac class="flex items-center gap-2 mr-4">
      <button class="text-sm text-gray-600 hover:text-primary-600">Ajuda</button>
    </div>
    
    <!-- 4. Actions Area -->
    <div data-navbar-actions class="flex items-center gap-3">
      <button class="p-2 hover:bg-gray-100 rounded-full relative">
        <svg class="w-5 h-5"><!-- notification --></svg>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div data-v="dropdown">
        <button class="flex items-center gap-2">
          <img src="/avatar.jpg" class="w-8 h-8 rounded-full">
        </button>
        <!-- dropdown menu -->
      </div>
    </div>
    
  </div>
</nav>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="navbar"` | Nav | Identifica o componente navbar |
| `data-sidebar` | Nav | ID do sidebar para integração |
| `data-navbar-logo` | Div | Container do logo (toggle automático) |
| `data-navbar-center` | Div | Área central |
| `data-navbar-sac` | Div | Área de suporte |
| `data-navbar-actions` | Div | Área de ações (direita) |
| `data-navbar-mobile-toggle` | Button | Toggle sidebar no mobile |

## API JavaScript

```javascript
// Obter instância
const navbar = SpireUI.get(document.querySelector('[data-v="navbar"]'));

// Métodos
navbar.showLogo();   // Mostrar logo
navbar.hideLogo();   // Esconder logo
navbar.destroy();    // Limpar listeners
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `navbar:sidebar-change` | Sidebar mudou estado | `{ collapsed: boolean }` |

```javascript
document.querySelector('[data-v="navbar"]').addEventListener('navbar:sidebar-change', (e) => {
  console.log('Sidebar colapsado:', e.detail.collapsed);
});
```

## Comportamento Automático

Quando vinculado a um Sidebar (`data-sidebar="id"`):

1. **Logo Toggle**: O elemento `[data-navbar-logo]` aparece/desaparece automaticamente
2. **Padding Adjustment**: A classe `lg:pl-64` muda para `lg:pl-20` quando colapsado
3. **Mobile Toggle**: O botão `[data-navbar-mobile-toggle]` abre/fecha o sidebar mobile

## Exemplo Completo

```html
<!-- Sidebar -->
<div data-v="sidebar" id="main-sidebar" data-persist="app">
  <div data-sidebar-overlay class="fixed inset-0 bg-black/50 lg:hidden hidden z-40"></div>
  <aside class="fixed left-0 top-0 h-full w-64 sidebar-collapsed:w-20 
                bg-gray-900 text-white transition-all duration-300 z-50">
    <!-- sidebar content -->
  </aside>
</div>

<!-- Navbar -->
<nav data-v="navbar" data-sidebar="main-sidebar" 
     class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 
            border-b shadow-sm z-40 lg:pl-64 transition-all duration-300">
  <div class="h-full flex items-center px-4 gap-4">
    
    <!-- Logo (hidden by default, shows when sidebar collapses) -->
    <div data-navbar-logo class="opacity-0 w-0 overflow-hidden transition-all duration-300 flex items-center">
      <img src="/logo.svg" alt="Logo" class="h-8">
    </div>
    
    <!-- Mobile menu button -->
    <button data-navbar-mobile-toggle 
            class="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    
    <!-- Search (center) -->
    <div data-navbar-center class="flex-1 max-w-xl mx-auto">
      <div class="relative">
        <input type="search" placeholder="Buscar..." 
               class="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>
    
    <!-- Help -->
    <div data-navbar-sac class="hidden md:flex items-center">
      <a href="/help" class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600">
        Precisa de ajuda?
      </a>
    </div>
    
    <!-- Actions -->
    <div data-navbar-actions class="flex items-center gap-2">
      <!-- Notifications -->
      <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
        <svg class="w-5 h-5"><!-- bell --></svg>
        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      
      <!-- User menu -->
      <div data-v="dropdown" class="relative">
        <button data-dropdown-trigger class="flex items-center gap-2 p-1 hover:bg-gray-100 
                                             dark:hover:bg-gray-700 rounded-full">
          <img src="/avatar.jpg" alt="User" class="w-8 h-8 rounded-full">
        </button>
        <div data-dropdown-menu class="hidden absolute right-0 mt-2 w-48 bg-white 
                                       dark:bg-gray-800 rounded-lg shadow-lg border">
          <a href="/profile" class="block px-4 py-2 hover:bg-gray-50">Perfil</a>
          <a href="/settings" class="block px-4 py-2 hover:bg-gray-50">Configurações</a>
          <hr class="my-1">
          <a href="/logout" class="block px-4 py-2 text-red-600 hover:bg-gray-50">Sair</a>
        </div>
      </div>
    </div>
    
  </div>
</nav>

<!-- Main Content -->
<main class="pt-16 lg:pl-64 sidebar-collapsed:lg:pl-20 transition-all duration-300">
  <!-- page content -->
</main>
```

## Responsividade

- **Desktop (lg+)**: Navbar respeita o padding do sidebar
- **Mobile**: Toggle button abre/fecha sidebar com overlay

## Dark Mode

O componente suporta dark mode automaticamente via Tailwind:

```html
<nav class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
```
