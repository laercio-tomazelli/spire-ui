# InfiniteScroll

Carregamento infinito de conteúdo ao rolar a página.

## Uso Básico

```html
<div data-v="infinite-scroll" id="feed">
  <div data-infinite-container>
    <!-- Conteúdo inicial -->
    <div class="post">Post 1</div>
    <div class="post">Post 2</div>
    <div class="post">Post 3</div>
  </div>
  <!-- Sentinel é criado automaticamente -->
</div>
```

## Com Blade Component

```blade
<x-ui.infinite-scroll id="products-list">
  @foreach($products as $product)
    <x-ui.product-card :product="$product" />
  @endforeach
</x-ui.infinite-scroll>
```

## Data Attributes

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="infinite-scroll"` | Container | Identifica o componente |
| `data-infinite-container` | Div | Container onde o conteúdo é adicionado |

## Configurando o Loader

O componente precisa de uma função que retorna o HTML a ser adicionado:

```javascript
const scroll = SpireUI.get(document.getElementById('feed'));

let page = 1;

scroll.setLoader(async () => {
  page++;
  const response = await fetch(`/api/posts?page=${page}`);
  const data = await response.json();
  
  if (data.posts.length === 0) {
    return ''; // Retornar string vazia indica fim do conteúdo
  }
  
  return data.posts.map(post => `
    <div class="post p-4 border-b">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `).join('');
});
```

## API JavaScript

```javascript
const scroll = SpireUI.get(document.querySelector('[data-v="infinite-scroll"]'));

// Definir função de carregamento
scroll.setLoader(async () => {
  return await fetchMoreContent();
});

// Carregar manualmente
await scroll.load();

// Verificar se há mais conteúdo
if (scroll.hasMore()) {
  console.log('Ainda há mais conteúdo');
}

// Resetar (limpar conteúdo e reiniciar)
scroll.reset();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `setLoader(fn)` | `this` | Define a função de carregamento |
| `load()` | `Promise<void>` | Carrega mais conteúdo |
| `reset()` | `this` | Limpa o container e reinicia |
| `hasMore()` | `boolean` | Retorna se há mais conteúdo |
| `destroy()` | `void` | Remove o observer e a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `infinite:loading` | - | Iniciando carregamento |
| `infinite:loaded` | - | Conteúdo carregado com sucesso |
| `infinite:end` | - | Não há mais conteúdo |
| `infinite:error` | `{ error }` | Erro ao carregar |

```javascript
element.addEventListener('infinite:loading', () => {
  console.log('Carregando mais...');
});

element.addEventListener('infinite:loaded', () => {
  console.log('Conteúdo carregado!');
});

element.addEventListener('infinite:end', () => {
  console.log('Fim do conteúdo');
  showEndMessage();
});

element.addEventListener('infinite:error', (e) => {
  console.error('Erro:', e.detail.error);
  SpireUI.toast.error('Erro ao carregar mais conteúdo');
});
```

## Indicador de Loading

O componente mostra automaticamente um spinner durante o carregamento:

```html
<div class="infinite-scroll-loading flex justify-center py-4">
  <svg class="animate-spin h-6 w-6 text-blue-500">...</svg>
</div>
```

## Exemplos

### Feed de Notícias

```html
<div data-v="infinite-scroll" id="news-feed">
  <div data-infinite-container class="space-y-4">
    @foreach($posts as $post)
      <article class="p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-bold">{{ $post->title }}</h2>
        <p class="text-gray-600 mt-2">{{ $post->excerpt }}</p>
        <div class="mt-4 text-sm text-gray-400">
          {{ $post->created_at->diffForHumans() }}
        </div>
      </article>
    @endforeach
  </div>
</div>

<script>
const feed = SpireUI.get(document.getElementById('news-feed'));
let page = {{ $posts->currentPage() }};

feed.setLoader(async () => {
  page++;
  const res = await fetch(`/api/posts?page=${page}`);
  const data = await res.json();
  
  if (!data.data.length) return '';
  
  return data.data.map(post => `
    <article class="p-6 bg-white rounded-xl shadow">
      <h2 class="text-xl font-bold">${post.title}</h2>
      <p class="text-gray-600 mt-2">${post.excerpt}</p>
      <div class="mt-4 text-sm text-gray-400">${post.created_at}</div>
    </article>
  `).join('');
});
</script>
```

### Lista de Produtos

```html
<div data-v="infinite-scroll" id="products">
  <div data-infinite-container class="grid grid-cols-3 gap-4">
    <!-- Produtos iniciais -->
  </div>
</div>

<script>
const products = SpireUI.get(document.getElementById('products'));
let cursor = null;

products.setLoader(async () => {
  const url = cursor ? `/api/products?cursor=${cursor}` : '/api/products';
  const res = await fetch(url);
  const data = await res.json();
  
  cursor = data.next_cursor;
  
  if (!data.products.length) return '';
  
  return data.products.map(p => `
    <div class="p-4 border rounded-lg">
      <img src="${p.image}" class="w-full h-48 object-cover rounded">
      <h3 class="mt-2 font-medium">${p.name}</h3>
      <p class="text-lg font-bold text-green-600">R$ ${p.price}</p>
    </div>
  `).join('');
});
</script>
```

### Com Filtros

```html
<div class="flex gap-4 mb-4">
  <select id="category-filter" onchange="resetAndReload()">
    <option value="">Todas as categorias</option>
    <option value="tech">Tecnologia</option>
    <option value="sports">Esportes</option>
  </select>
</div>

<div data-v="infinite-scroll" id="filtered-list">
  <div data-infinite-container></div>
</div>

<script>
const list = SpireUI.get(document.getElementById('filtered-list'));
let page = 0;
let category = '';

list.setLoader(async () => {
  page++;
  const res = await fetch(`/api/items?page=${page}&category=${category}`);
  const data = await res.json();
  
  if (!data.items.length) return '';
  
  return data.items.map(item => `<div class="item">${item.name}</div>`).join('');
});

function resetAndReload() {
  category = document.getElementById('category-filter').value;
  page = 0;
  list.reset();
  list.load();
}
</script>
```

## Como Funciona

1. Um elemento "sentinel" invisível é criado no final do container
2. `IntersectionObserver` monitora quando o sentinel entra na viewport
3. Quando visível, a função `loader` é chamada
4. O HTML retornado é adicionado ao container
5. Se a função retornar string vazia, `hasMore` se torna `false`

## Performance

- Usa `IntersectionObserver` (eficiente, sem polling)
- `rootMargin: 100px` - carrega antes de chegar ao fim
- Previne múltiplas requisições simultâneas
- Sentinel leve (`height: 4px`)
