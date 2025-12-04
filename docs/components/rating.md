# Rating

Componente de avaliação com estrelas.

## Uso Básico

```html
<div data-v="rating" data-value="4" data-max="5">
  <button data-rating-star class="text-2xl text-gray-300">
    <span data-rating-fill class="text-yellow-400">★</span>
  </button>
  <!-- Repetir para cada estrela -->
</div>
```

## Com Blade Component

```blade
<x-ui.rating 
  name="product_rating" 
  value="4" 
  max="5"
/>

<x-ui.rating 
  name="review_rating" 
  value="3.5" 
  half
/>

<x-ui.rating 
  value="4.2" 
  readonly 
  show-value
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="rating"` | - | - | Identifica o componente |
| `data-value` | number | `0` | Valor inicial |
| `data-max` | number | `5` | Número máximo de estrelas |
| `data-half` | boolean | `false` | Permitir meias estrelas |
| `data-readonly` | boolean | `false` | Apenas leitura |

### Elementos Internos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-rating-star` | Button | Cada estrela clicável |
| `data-rating-fill` | Span | Parte preenchida da estrela |
| `data-rating-input` | Input | Input hidden para form |
| `data-rating-value-display` | Span | Exibe o valor numérico |

## API JavaScript

```javascript
const rating = SpireUI.get(document.querySelector('[data-v="rating"]'));

// Definir valor
rating.setValue(4);

// Com meia estrela
rating.setValue(3.5);

// Obter valor
const value = rating.value();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `setValue(value)` | `this` | Define o valor |
| `value()` | `number` | Retorna o valor atual |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `rating:change` | `{ value }` | Valor alterado |

```javascript
element.addEventListener('rating:change', (e) => {
  console.log('Nova avaliação:', e.detail.value);
  submitRating(e.detail.value);
});
```

## Meia Estrela

Com `data-half="true"`, o usuário pode selecionar meias estrelas clicando na metade esquerda:

```html
<div data-v="rating" data-half="true" data-value="3.5">
  <!-- Estrelas com suporte a 0.5 -->
</div>
```

## Modo Somente Leitura

```html
<div data-v="rating" data-readonly="true" data-value="4.2">
  <!-- Apenas exibe, não permite interação -->
</div>
```

## Exemplos

### Avaliação de Produto

```html
<div class="flex items-center gap-4">
  <div data-v="rating" 
       data-max="5" 
       data-half="true"
       name="product_rating"
       id="product-rating">
    @for($i = 1; $i <= 5; $i++)
      <button data-rating-star class="text-3xl text-gray-300 hover:scale-110 transition-transform">
        <span data-rating-fill class="text-yellow-400">★</span>
      </button>
    @endfor
    <input type="hidden" data-rating-input name="rating">
  </div>
  <span data-rating-value-display class="text-lg font-medium">0</span>
</div>

<script>
document.getElementById('product-rating').addEventListener('rating:change', async (e) => {
  await SpireUI.http.post('/api/products/{{ $product->id }}/rate', {
    rating: e.detail.value
  });
  SpireUI.toast.success('Obrigado pela avaliação!');
});
</script>
```

### Exibição de Rating (Readonly)

```html
<div class="flex items-center gap-2">
  <div data-v="rating" data-readonly="true" data-value="{{ $product->rating }}" data-half="true">
    @for($i = 1; $i <= 5; $i++)
      <span data-rating-star class="text-xl text-gray-300">
        <span data-rating-fill class="text-yellow-400">★</span>
      </span>
    @endfor
  </div>
  <span class="text-sm text-gray-600">
    {{ number_format($product->rating, 1) }} ({{ $product->reviews_count }} avaliações)
  </span>
</div>
```

### Feedback com Emojis

```html
<div data-v="rating" data-max="5" id="feedback-rating">
  <button data-rating-star class="text-4xl grayscale hover:grayscale-0 transition">
    <span data-rating-fill>😞</span>
  </button>
  <button data-rating-star class="text-4xl grayscale hover:grayscale-0 transition">
    <span data-rating-fill>😐</span>
  </button>
  <button data-rating-star class="text-4xl grayscale hover:grayscale-0 transition">
    <span data-rating-fill>🙂</span>
  </button>
  <button data-rating-star class="text-4xl grayscale hover:grayscale-0 transition">
    <span data-rating-fill>😊</span>
  </button>
  <button data-rating-star class="text-4xl grayscale hover:grayscale-0 transition">
    <span data-rating-fill>😍</span>
  </button>
</div>
```

### Lista de Reviews

```html
@foreach($reviews as $review)
  <div class="border-b py-4">
    <div class="flex items-center gap-3">
      <img src="{{ $review->user->avatar }}" class="w-10 h-10 rounded-full">
      <div>
        <span class="font-medium">{{ $review->user->name }}</span>
        <div data-v="rating" data-readonly="true" data-value="{{ $review->rating }}">
          @for($i = 1; $i <= 5; $i++)
            <span data-rating-star class="text-sm text-gray-300">
              <span data-rating-fill class="text-yellow-400">★</span>
            </span>
          @endfor
        </div>
      </div>
    </div>
    <p class="mt-2 text-gray-600">{{ $review->comment }}</p>
  </div>
@endforeach
```

## Visual

### Estrela com Clip Path

O preenchimento usa `clip-path` para suportar meias estrelas:

```css
[data-rating-fill] {
  clip-path: inset(0 50% 0 0); /* Meia estrela */
  clip-path: inset(0 0% 0 0);  /* Estrela cheia */
  clip-path: inset(0 100% 0 0); /* Vazia */
}
```

### Ícones SVG

```html
<button data-rating-star class="w-8 h-8 text-gray-300">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
  <span data-rating-fill class="absolute inset-0 text-yellow-400">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  </span>
</button>
```

## Formulário

```html
<form method="POST">
  <div data-v="rating" data-max="5">
    <!-- Estrelas -->
    <input type="hidden" data-rating-input name="rating" value="">
  </div>
  <button type="submit">Enviar Avaliação</button>
</form>
```

## Acessibilidade

- Cada estrela é um `<button>` focável
- Navegação por Tab
- Clique ou Enter para selecionar
- `aria-label` descritivo
