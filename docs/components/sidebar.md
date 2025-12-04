# Sidebar

Menu lateral com suporte a modo colapsado, submenus multi-nível, tooltips e integração com Navbar.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="sidebar" id="app-sidebar" data-persist="main" class="sidebar-collapsed lg:sidebar-expanded">
  <!-- Overlay para mobile -->
  <div data-sidebar-overlay class="fixed inset-0 bg-black/50 lg:hidden hidden z-40"></div>
  
  <!-- Container do Sidebar -->
  <aside class="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 shadow-lg z-50 
                w-64 sidebar-collapsed:w-20 transition-all duration-300">
    
    <!-- Logo -->
    <div class="h-16 flex items-center justify-between px-4 border-b">
      <span class="sidebar-collapsed:hidden">Minha App</span>
      <button data-sidebar-toggle class="p-2 hover:bg-gray-100 rounded">
        <svg class="w-5 h-5"><!-- ícone --></svg>
      </button>
    </div>
    
    <!-- Menu -->
    <nav class="p-4 space-y-2">
      <!-- Item simples -->
      <a href="/dashboard" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
        <svg class="w-5 h-5 shrink-0"><!-- ícone --></svg>
        <span class="sidebar-collapsed:hidden">Dashboard</span>
      </a>
      
      <!-- Item com submenu -->
      <div data-sidebar-item>
        <button data-submenu-trigger class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
          <svg class="w-5 h-5 shrink-0"><!-- ícone --></svg>
          <span class="sidebar-collapsed:hidden flex-1 text-left">Configurações</span>
          <svg data-arrow class="w-4 h-4 transition-transform sidebar-collapsed:hidden"><!-- chevron --></svg>
        </button>
        <div data-submenu class="hidden pl-8 mt-1 space-y-1">
          <a href="/settings/general" class="block px-3 py-2 rounded hover:bg-gray-100">Geral</a>
          <a href="/settings/security" class="block px-3 py-2 rounded hover:bg-gray-100">Segurança</a>
        </div>
      </div>
    </nav>
  </aside>
</div>
```

## Com Tooltips (Modo Colapsado)

```html
<!-- Adicione data-tooltip ao item -->
<a href="/dashboard" data-tooltip="Dashboard" 
   class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
  <svg class="w-5 h-5 shrink-0"><!-- ícone --></svg>
  <span class="sidebar-collapsed:hidden">Dashboard</span>
</a>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="sidebar"` | Container | Identifica o componente sidebar |
| `data-persist` | Container | Chave para persistir estado no localStorage |
| `data-sidebar-toggle` | Button | Botão para toggle colapso/expansão |
| `data-sidebar-overlay` | Div | Overlay para fechar no mobile |
| `data-sidebar-item` | Div | Container de item com submenu |
| `data-submenu-trigger` | Button | Botão que abre submenu |
| `data-submenu` | Div | Container do submenu |
| `data-arrow` | SVG | Ícone de seta do submenu |
| `data-tooltip` | Elemento | Texto do tooltip quando colapsado |

## API JavaScript

```javascript
// Obter instância
const sidebar = SpireUI.get(document.getElementById('app-sidebar'));

// Métodos
sidebar.toggle();        // Toggle colapso
sidebar.collapse();      // Colapsar
sidebar.expand();        // Expandir
sidebar.toggleMobile();  // Toggle mobile
sidebar.openMobile();    // Abrir no mobile
sidebar.closeMobile();   // Fechar no mobile
sidebar.isCollapsed();   // Retorna boolean
sidebar.destroy();       // Limpar listeners
```

### Encadeamento

```javascript
sidebar.collapse().closeMobile();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `sidebar:collapse` | Sidebar foi colapsado | `{}` |
| `sidebar:expand` | Sidebar foi expandido | `{}` |
| `sidebar:mobile-open` | Aberto no mobile | `{}` |
| `sidebar:mobile-close` | Fechado no mobile | `{}` |
| `sidebar:submenu-open` | Submenu aberto | `{ item, submenu }` |
| `sidebar:submenu-close` | Submenu fechado | `{ item, submenu }` |

```javascript
document.getElementById('app-sidebar').addEventListener('sidebar:collapse', (e) => {
  console.log('Sidebar colapsado');
});
```

## CSS Classes Automáticas

| Classe | Descrição |
|--------|-----------|
| `sidebar-collapsed` | Aplicada quando colapsado |
| `submenu-open` | Aplicada ao item com submenu aberto |

## Integração com Navbar

```html
<div data-v="navbar" data-sidebar="app-sidebar" class="fixed top-0 right-0 left-0 lg:pl-64">
  <div data-navbar-logo class="opacity-0 w-0 overflow-hidden transition-all">
    <img src="/logo.svg" alt="Logo">
  </div>
  <!-- resto do navbar -->
</div>
```

Quando o sidebar colapsa, o navbar automaticamente:
- Mostra o logo
- Ajusta o padding left

## Persistência

Use `data-persist` para salvar o estado no localStorage:

```html
<div data-v="sidebar" data-persist="main-sidebar">
```

O estado é restaurado automaticamente ao carregar a página.

## Acessibilidade

- `role="navigation"` aplicado automaticamente
- `aria-expanded` nos triggers de submenu
- `aria-controls` vincula trigger ao submenu
- Suporte a navegação por teclado (Escape fecha mobile)

## Exemplo Completo

```html
<div data-v="sidebar" id="sidebar" data-persist="app" class="sidebar-collapsed">
  <div data-sidebar-overlay class="fixed inset-0 bg-black/50 lg:hidden hidden z-40"></div>
  
  <aside class="fixed left-0 top-0 h-full w-64 sidebar-collapsed:w-20 
                bg-white dark:bg-gray-900 border-r transition-all duration-300 z-50">
    
    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-4 border-b">
      <div class="flex items-center gap-2 sidebar-collapsed:hidden">
        <img src="/logo.svg" class="h-8">
        <span class="font-bold">App</span>
      </div>
      <div class="sidebar-collapsed:flex hidden items-center justify-center w-full">
        <img src="/logo-icon.svg" class="h-8">
      </div>
      <button data-sidebar-toggle class="p-2 hover:bg-gray-100 rounded lg:block hidden">
        <svg class="w-5 h-5 sidebar-collapsed:rotate-180 transition-transform">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
    </div>
    
    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <a href="/" data-tooltip="Dashboard" 
         class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 
                sidebar-collapsed:justify-center">
        <svg class="w-5 h-5 shrink-0"><!-- icon --></svg>
        <span class="sidebar-collapsed:hidden">Dashboard</span>
      </a>
      
      <div data-sidebar-item>
        <button data-submenu-trigger data-tooltip="Relatórios"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100
                       sidebar-collapsed:justify-center">
          <svg class="w-5 h-5 shrink-0"><!-- icon --></svg>
          <span class="sidebar-collapsed:hidden flex-1 text-left">Relatórios</span>
          <svg data-arrow class="w-4 h-4 transition-transform sidebar-collapsed:hidden">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <div data-submenu class="hidden pl-8 mt-1 space-y-1 sidebar-collapsed:hidden">
          <a href="/reports/sales" class="block px-3 py-2 rounded hover:bg-gray-100">Vendas</a>
          <a href="/reports/users" class="block px-3 py-2 rounded hover:bg-gray-100">Usuários</a>
        </div>
      </div>
    </nav>
  </aside>
</div>

<script>
document.getElementById('sidebar').addEventListener('sidebar:collapse', () => {
  console.log('Sidebar minimizado');
});
</script>
```
