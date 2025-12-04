# RangeSlider

Slider customizado para seleção de valores numéricos.

## Uso Básico

```html
<div data-v="range-slider" 
     data-min="0" 
     data-max="100" 
     data-value="50">
</div>
```

## Com Input Existente

```html
<div data-v="range-slider">
  <input type="range" name="volume" min="0" max="100" value="75">
</div>
```

## Com Blade Component

```blade
<x-ui.range-slider 
  name="price" 
  min="0" 
  max="1000" 
  value="500"
  step="10"
/>

<x-ui.range-slider 
  name="opacity" 
  min="0" 
  max="1" 
  value="0.5"
  step="0.1"
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="range-slider"` | - | - | Identifica o componente |
| `data-min` | number | `0` | Valor mínimo |
| `data-max` | number | `100` | Valor máximo |
| `data-value` | number | `50` | Valor inicial |
| `data-step` | number | `1` | Incremento |

## API JavaScript

```javascript
const slider = SpireUI.get(document.querySelector('[data-v="range-slider"]'));

// Definir valor
slider.setValue(75);

// Obter valor
const value = slider.getValue();

// Definir mínimo/máximo
slider.setMin(10);
slider.setMax(200);
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `setValue(value)` | `this` | Define o valor atual |
| `getValue()` | `number` | Retorna o valor atual |
| `setMin(value)` | `this` | Define o valor mínimo |
| `setMax(value)` | `this` | Define o valor máximo |
| `setStep(value)` | `this` | Define o incremento |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `range:change` | `{ value, percent }` | Valor alterado |
| `range:input` | `{ value, percent }` | Durante o arraste |

```javascript
element.addEventListener('range:change', (e) => {
  console.log('Valor:', e.detail.value);
  console.log('Porcentagem:', e.detail.percent);
});
```

## Visual

O componente cria uma interface customizada:

```html
<div data-v="range-slider" class="relative py-4">
  <!-- Track -->
  <div class="absolute left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
    <!-- Fill (preenchimento) -->
    <div data-range-fill class="absolute left-0 h-full bg-blue-500 rounded-full"></div>
  </div>
  
  <!-- Thumb (arrastável) -->
  <div class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-lg">
    <!-- Value display (aparece ao arrastar) -->
    <div class="absolute -top-6 text-sm font-medium">75</div>
  </div>
  
  <!-- Input original (hidden) -->
  <input type="range" style="opacity: 0; pointer-events: none;">
</div>
```

## Interação

### Mouse
- Clique no track para ir direto ao valor
- Arraste o thumb para ajustar
- Cursor muda para `grab`/`grabbing`

### Teclado
- `←` `↓`: Diminuir valor
- `→` `↑`: Aumentar valor
- `Shift + setas`: Aumentar step (10x)

### Touch
- Suporte completo a dispositivos touch

## Exemplos

### Controle de Volume

```html
<div class="flex items-center gap-4">
  <span class="text-gray-500">🔈</span>
  <div data-v="range-slider" 
       data-min="0" 
       data-max="100" 
       data-value="{{ $volume }}"
       id="volume-control"
       class="flex-1">
  </div>
  <span class="text-gray-500">🔊</span>
</div>

<script>
document.getElementById('volume-control').addEventListener('range:change', (e) => {
  audio.volume = e.detail.value / 100;
});
</script>
```

### Filtro de Preço

```html
<div class="space-y-2">
  <label class="text-sm font-medium">Preço máximo: R$ <span id="price-display">500</span></label>
  <div data-v="range-slider" 
       data-min="0" 
       data-max="1000" 
       data-value="500"
       data-step="50"
       id="price-filter">
  </div>
</div>

<script>
document.getElementById('price-filter').addEventListener('range:input', (e) => {
  document.getElementById('price-display').textContent = e.detail.value;
});

document.getElementById('price-filter').addEventListener('range:change', (e) => {
  filterProducts({ maxPrice: e.detail.value });
});
</script>
```

### Ajuste de Qualidade

```html
<div class="grid grid-cols-3 gap-4">
  <label class="text-center">
    <div data-v="range-slider" 
         data-min="1" 
         data-max="100" 
         data-value="75"
         name="quality">
    </div>
    <span class="text-sm text-gray-600">Qualidade</span>
  </label>
  
  <label class="text-center">
    <div data-v="range-slider" 
         data-min="-100" 
         data-max="100" 
         data-value="0"
         name="brightness">
    </div>
    <span class="text-sm text-gray-600">Brilho</span>
  </label>
  
  <label class="text-center">
    <div data-v="range-slider" 
         data-min="-100" 
         data-max="100" 
         data-value="0"
         name="contrast">
    </div>
    <span class="text-sm text-gray-600">Contraste</span>
  </label>
</div>
```

### Com Valores Decimais

```html
<div data-v="range-slider" 
     data-min="0" 
     data-max="1" 
     data-value="0.5"
     data-step="0.1"
     id="opacity-slider">
</div>

<div id="preview" class="w-32 h-32 bg-blue-500" style="opacity: 0.5"></div>

<script>
document.getElementById('opacity-slider').addEventListener('range:change', (e) => {
  document.getElementById('preview').style.opacity = e.detail.value;
});
</script>
```

## Estilização

### Cores Customizadas

```html
<div data-v="range-slider" class="range-slider-custom">
  <style>
    .range-slider-custom [data-range-fill] {
      background: linear-gradient(to right, #22c55e, #16a34a);
    }
    .range-slider-custom > div:last-of-type {
      border-color: #22c55e;
    }
  </style>
</div>
```

## Formulário

O input original permanece no DOM (oculto) para submissão:

```html
<form>
  <div data-v="range-slider" data-min="0" data-max="100" data-value="50">
    <input type="range" name="rating">
  </div>
  
  <button type="submit">Enviar</button>
</form>
```

No servidor:
```php
$rating = $request->input('rating'); // "50"
```

## Acessibilidade

- `role="slider"` no thumb
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Navegação completa por teclado
- Focável via Tab
- Labels descritivos
