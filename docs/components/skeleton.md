# Skeleton

Indicadores de carregamento em formato de placeholder.

## Uso Básico

```html
<div data-v="skeleton" class="animate-pulse">
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
</div>
```

## Com Target

```html
<!-- Skeleton -->
<div data-v="skeleton" data-target="#content" class="animate-pulse">
  <div class="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
  <div class="h-4 bg-gray-200 rounded mb-2"></div>
  <div class="h-4 bg-gray-200 rounded mb-2"></div>
</div>

<!-- Conteúdo real (hidden inicialmente) -->
<div id="content" class="hidden">
  <h1>Título do Conteúdo</h1>
  <p>Parágrafo de texto...</p>
</div>
```

## Com Blade Component

```blade
<x-ui.skeleton target="#user-profile">
  <div class="flex items-center gap-4">
    <x-ui.skeleton-circle size="48" />
    <div class="flex-1">
      <x-ui.skeleton-line width="60%" height="20" />
      <x-ui.skeleton-line width="40%" class="mt-2" />
    </div>
  </div>
</x-ui.skeleton>

<div id="user-profile" class="hidden">
  <!-- Conteúdo real -->
</div>
```

## Data Attributes

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `data-v="skeleton"` | - | Identifica o componente |
| `data-target` | string | Seletor CSS do conteúdo a mostrar quando skeleton esconder |

## API JavaScript

```javascript
const skeleton = SpireUI.get(document.querySelector('[data-v="skeleton"]'));

// Mostrar skeleton
skeleton.show();

// Esconder skeleton (e mostrar target)
skeleton.hide();

// Toggle
skeleton.toggle();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `show()` | `this` | Mostra o skeleton (esconde target) |
| `hide()` | `this` | Esconde skeleton (mostra target) |
| `toggle()` | `this` | Alterna visibilidade |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Descrição |
|--------|-----------|
| `skeleton:shown` | Skeleton mostrado |
| `skeleton:hidden` | Skeleton escondido |

## Tipos de Skeleton

### Texto

```html
<div class="space-y-3 animate-pulse">
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
</div>
```

### Card

```html
<div class="p-4 border rounded-lg animate-pulse">
  <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
  <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
</div>
```

### Avatar + Texto

```html
<div class="flex items-center gap-4 animate-pulse">
  <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
  <div class="flex-1">
    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
  </div>
</div>
```

### Tabela

```html
<div class="animate-pulse">
  <div class="flex gap-4 p-4 border-b">
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
  @for($i = 0; $i < 5; $i++)
  <div class="flex gap-4 p-4 border-b">
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
  @endfor
</div>
```

## Exemplos

### Carregamento de Perfil

```html
<div data-v="skeleton" data-target="#profile" id="profile-skeleton" class="animate-pulse">
  <div class="flex items-center gap-6">
    <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
    <div class="flex-1">
      <div class="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
</div>

<div id="profile" class="hidden">
  <!-- Conteúdo real do perfil -->
</div>

<script>
async function loadProfile() {
  const skeleton = SpireUI.get(document.getElementById('profile-skeleton'));
  const data = await SpireUI.http.get('/api/profile');
  
  document.getElementById('profile').innerHTML = renderProfile(data);
  skeleton.hide();
}

loadProfile();
</script>
```

### Lista de Produtos

```html
<div id="products-container">
  <!-- Skeletons -->
  <div data-v="skeleton" data-target="#products-list" class="grid grid-cols-3 gap-4 animate-pulse">
    @for($i = 0; $i < 6; $i++)
    <div class="border rounded-lg p-4">
      <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div class="h-8 bg-gray-200 rounded"></div>
    </div>
    @endfor
  </div>
  
  <!-- Conteúdo real -->
  <div id="products-list" class="hidden grid grid-cols-3 gap-4">
    <!-- Produtos serão inseridos aqui -->
  </div>
</div>
```

### Comentários

```html
<div data-v="skeleton" data-target="#comments" class="space-y-4 animate-pulse">
  @for($i = 0; $i < 3; $i++)
  <div class="flex gap-3">
    <div class="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
    <div class="flex-1">
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div class="h-3 bg-gray-200 rounded mb-1"></div>
      <div class="h-3 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
  @endfor
</div>

<div id="comments" class="hidden space-y-4">
  <!-- Comentários reais -->
</div>
```

## Animação Pulse

Use a classe `animate-pulse` do Tailwind:

```css
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
```

## Cores

```html
<!-- Light mode -->
<div class="bg-gray-200 rounded"></div>

<!-- Dark mode -->
<div class="bg-gray-200 dark:bg-gray-700 rounded"></div>

<!-- Com gradiente -->
<div class="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
```

## Shimmer Effect

Para um efeito de shimmer (brilho deslizante):

```html
<div class="relative overflow-hidden bg-gray-200 rounded">
  <div class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
</div>

<style>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
```

## Boas Práticas

1. **Mantenha proporções**: O skeleton deve ter tamanho similar ao conteúdo real
2. **Use formas adequadas**: Círculos para avatares, retângulos para texto
3. **Evite excesso**: Não crie skeletons muito detalhados
4. **Transição suave**: Use fade ao trocar skeleton por conteúdo
