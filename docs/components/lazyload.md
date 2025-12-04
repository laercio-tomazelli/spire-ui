# LazyLoad

Carregamento lazy de imagens e elementos quando entram na viewport.

## Uso Básico

```html
<!-- Imagem -->
<img data-v="lazy" 
     data-src="/images/photo.jpg" 
     src="/images/placeholder.jpg"
     alt="Foto"
     class="opacity-0">

<!-- Background -->
<div data-v="lazy" 
     data-src="/images/hero.jpg"
     class="h-64 bg-gray-200 bg-cover">
</div>

<!-- Iframe -->
<iframe data-v="lazy" 
        data-src="https://www.youtube.com/embed/..."
        class="w-full aspect-video">
</iframe>
```

## Com Blade Component

```blade
<x-ui.lazy-img 
  src="/images/product.jpg" 
  placeholder="/images/placeholder.svg"
  alt="Produto"
/>

<x-ui.lazy-bg 
  src="/images/hero.jpg"
  class="h-screen"
/>
```

## Data Attributes

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `data-v="lazy"` | - | Identifica o componente |
| `data-src` | string | URL real da imagem/mídia |
| `data-placeholder` | string | URL do placeholder (opcional) |

## API JavaScript

```javascript
const lazy = SpireUI.get(document.querySelector('[data-v="lazy"]'));

// Forçar carregamento
lazy.load();

// Descarregar (volta ao placeholder)
lazy.unload();

// Verificar se já carregou
if (lazy.isLoaded()) {
  console.log('Imagem carregada');
}
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `load()` | `this` | Força o carregamento imediato |
| `unload()` | `this` | Volta ao estado de placeholder |
| `isLoaded()` | `boolean` | Verifica se já foi carregado |
| `destroy()` | `void` | Remove o observer e a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `lazy:loaded` | `{ src }` | Imagem carregada com sucesso |
| `lazy:error` | `{ src }` | Erro ao carregar imagem |

```javascript
element.addEventListener('lazy:loaded', (e) => {
  console.log('Carregou:', e.detail.src);
});

element.addEventListener('lazy:error', (e) => {
  console.error('Erro ao carregar:', e.detail.src);
  // Usar imagem de fallback
  e.target.src = '/images/error.svg';
});
```

## Tipos de Elemento

### Imagens (`<img>`)

```html
<img data-v="lazy" 
     data-src="/images/large-photo.jpg"
     src="data:image/svg+xml,<svg>...</svg>"
     alt="Foto"
     class="opacity-0 transition-opacity duration-300">
```

O atributo `src` é substituído por `data-src` quando a imagem entra na viewport.

### Background Images

```html
<div data-v="lazy" 
     data-src="/images/hero.jpg"
     class="h-96 bg-cover bg-center">
</div>
```

Define `background-image` via JavaScript.

### Iframes

```html
<iframe data-v="lazy" 
        data-src="https://youtube.com/embed/VIDEO_ID"
        class="w-full aspect-video border-0">
</iframe>
```

### Vídeos

```html
<video data-v="lazy" 
       data-src="/videos/demo.mp4"
       controls
       class="w-full">
</video>
```

## Animação de Fade-in

Adicione classes para fade-in suave:

```html
<img data-v="lazy" 
     data-src="/images/photo.jpg"
     class="opacity-0 transition-opacity duration-300">
```

O componente adiciona `opacity-100` automaticamente após carregar.

## Exemplos

### Galeria de Fotos

```html
<div class="grid grid-cols-3 gap-4">
  @foreach($photos as $photo)
    <img data-v="lazy"
         data-src="{{ $photo->url }}"
         src="/images/placeholder-square.svg"
         alt="{{ $photo->title }}"
         class="w-full aspect-square object-cover rounded-lg opacity-0 transition-opacity duration-300">
  @endforeach
</div>
```

### Feed de Notícias

```html
<div class="space-y-6">
  @foreach($posts as $post)
    <article class="flex gap-4">
      <img data-v="lazy"
           data-src="{{ $post->thumbnail }}"
           data-placeholder="/images/post-placeholder.svg"
           class="w-48 h-32 object-cover rounded-lg opacity-0">
      <div>
        <h2>{{ $post->title }}</h2>
        <p>{{ $post->excerpt }}</p>
      </div>
    </article>
  @endforeach
</div>
```

### Hero com Background

```html
<section data-v="lazy" 
         data-src="/images/hero-large.jpg"
         class="h-screen bg-cover bg-center bg-gray-200 flex items-center justify-center">
  <div class="text-center text-white">
    <h1 class="text-5xl font-bold">Bem-vindo</h1>
  </div>
</section>
```

### Lista de Vídeos

```html
<div class="grid grid-cols-2 gap-4">
  @foreach($videos as $video)
    <div class="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe data-v="lazy"
              data-src="https://youtube.com/embed/{{ $video->youtube_id }}"
              class="w-full h-full"
              allowfullscreen>
      </iframe>
    </div>
  @endforeach
</div>
```

## Placeholder Inline (SVG)

Use SVG inline para evitar requisição extra:

```html
<img data-v="lazy"
     data-src="/images/real-photo.jpg"
     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E"
     alt="Foto">
```

## Como Funciona

1. `IntersectionObserver` monitora quando o elemento entra na viewport
2. `rootMargin: 50px` - carrega 50px antes de entrar na tela
3. `threshold: 0.1` - inicia quando 10% do elemento está visível
4. Quando visível, `data-src` é copiado para `src`
5. Para elementos não-img, define `background-image`
6. Observer é desconectado após carregar

## Performance

- Usa `IntersectionObserver` (nativo, eficiente)
- Não bloqueia o carregamento inicial da página
- Carrega imagens apenas quando necessário
- Melhora métricas de Web Vitals (LCP, FCP)

## Acessibilidade

- Sempre inclua `alt` em imagens
- Placeholders devem ter dimensões para evitar layout shift
- Use `loading="lazy"` nativo como fallback para navegadores antigos
