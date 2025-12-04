# Progress

Barras de progresso com animações e estados.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="progress" data-value="60" class="w-full bg-gray-200 rounded-full h-2.5">
  <div data-progress-bar class="bg-primary-600 h-2.5 rounded-full" style="width: 60%"></div>
</div>
```

## Com Label

```html
<div class="space-y-1">
  <div class="flex justify-between text-sm">
    <span>Progresso</span>
    <span data-progress-label>60%</span>
  </div>
  <div data-v="progress" data-value="60" class="w-full bg-gray-200 rounded-full h-2.5">
    <div data-progress-bar class="bg-primary-600 h-2.5 rounded-full" style="width: 60%"></div>
  </div>
</div>
```

## Tamanhos

```html
<!-- Extra Small -->
<div data-v="progress" class="h-1 bg-gray-200 rounded-full">
  <div data-progress-bar class="h-1 bg-primary-600 rounded-full"></div>
</div>

<!-- Small -->
<div data-v="progress" class="h-2 bg-gray-200 rounded-full">
  <div data-progress-bar class="h-2 bg-primary-600 rounded-full"></div>
</div>

<!-- Medium (default) -->
<div data-v="progress" class="h-2.5 bg-gray-200 rounded-full">
  <div data-progress-bar class="h-2.5 bg-primary-600 rounded-full"></div>
</div>

<!-- Large -->
<div data-v="progress" class="h-4 bg-gray-200 rounded-full">
  <div data-progress-bar class="h-4 bg-primary-600 rounded-full"></div>
</div>
```

## Cores

```html
<!-- Primary -->
<div data-progress-bar class="bg-primary-600"></div>

<!-- Success -->
<div data-progress-bar class="bg-green-500"></div>

<!-- Warning -->
<div data-progress-bar class="bg-yellow-500"></div>

<!-- Danger -->
<div data-progress-bar class="bg-red-500"></div>

<!-- Info -->
<div data-progress-bar class="bg-blue-500"></div>
```

## Atributos

| Atributo | Descrição | Default |
|----------|-----------|---------|
| `data-v="progress"` | Identifica o componente | - |
| `data-value` | Valor inicial (0-100) | `0` |
| `data-max` | Valor máximo | `100` |

## API JavaScript

```javascript
// Obter instância
const progress = SpireUI.get(document.querySelector('[data-v="progress"]'));

// Obter valor atual
const current = progress.value(); // 60

// Definir valor
progress.value(75);

// Incrementar/Decrementar
progress.increment(10);  // +10
progress.decrement(5);   // -5

// Completar (100%)
progress.complete();

// Resetar (0%)
progress.reset();

// Modo indeterminado
progress.indeterminate(true);  // Ativa animação de loading
progress.indeterminate(false); // Desativa

// Destruir
progress.destroy();
```

### Encadeamento

```javascript
progress.value(50).increment(10);
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `progress:change` | Valor alterado | `{ value: number, percent: number }` |
| `progress:complete` | Completado (100%) | `{}` |
| `progress:reset` | Resetado (0%) | `{}` |

```javascript
document.querySelector('[data-v="progress"]').addEventListener('progress:change', (e) => {
  console.log('Valor:', e.detail.value, 'Porcentagem:', e.detail.percent);
});
```

## Indeterminado (Loading)

```html
<div data-v="progress" id="loading-progress" class="w-full bg-gray-200 rounded-full h-2.5">
  <div data-progress-bar class="bg-primary-600 h-2.5 rounded-full animate-pulse w-full"></div>
</div>

<script>
const progress = SpireUI.get(document.getElementById('loading-progress'));
progress.indeterminate(true);
</script>
```

## Com Label Interno

```html
<div data-v="progress" data-value="75" class="w-full bg-gray-200 rounded-full h-6 relative">
  <div data-progress-bar 
       class="bg-primary-600 h-6 rounded-full flex items-center justify-center" 
       style="width: 75%">
    <span data-progress-label class="text-xs font-medium text-white">75%</span>
  </div>
</div>
```

## Gradiente

```html
<div data-v="progress" class="w-full bg-gray-200 rounded-full h-3">
  <div data-progress-bar 
       class="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  </div>
</div>
```

## Segmentado

```html
<div class="flex gap-1">
  <div data-v="progress" data-value="100" class="flex-1 bg-gray-200 rounded h-2">
    <div data-progress-bar class="bg-green-500 h-2 rounded"></div>
  </div>
  <div data-v="progress" data-value="100" class="flex-1 bg-gray-200 rounded h-2">
    <div data-progress-bar class="bg-green-500 h-2 rounded"></div>
  </div>
  <div data-v="progress" data-value="50" class="flex-1 bg-gray-200 rounded h-2">
    <div data-progress-bar class="bg-yellow-500 h-2 rounded"></div>
  </div>
  <div data-v="progress" data-value="0" class="flex-1 bg-gray-200 rounded h-2">
    <div data-progress-bar class="bg-gray-400 h-2 rounded"></div>
  </div>
</div>
```

## Circular (CSS apenas)

```html
<div class="relative w-20 h-20">
  <svg class="w-20 h-20 transform -rotate-90">
    <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="8" 
            fill="none" class="text-gray-200"/>
    <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="8" 
            fill="none" class="text-primary-600"
            stroke-dasharray="226.2" stroke-dashoffset="56.55"/>
  </svg>
  <span class="absolute inset-0 flex items-center justify-center text-lg font-bold">75%</span>
</div>
```

## Exemplo Completo - Upload

```html
<div class="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
  
  <div class="flex items-center gap-4 mb-4">
    <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
      </svg>
    </div>
    <div class="flex-1">
      <h3 class="font-medium text-gray-900 dark:text-white">documento.pdf</h3>
      <p class="text-sm text-gray-500">2.4 MB</p>
    </div>
    <button class="p-1 text-gray-400 hover:text-gray-600">
      <svg class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
  
  <div class="space-y-2">
    <div class="flex justify-between text-sm">
      <span class="text-gray-600 dark:text-gray-400">Enviando...</span>
      <span data-progress-label class="font-medium text-gray-900 dark:text-white">0%</span>
    </div>
    <div data-v="progress" id="upload-progress" data-value="0" 
         class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div data-progress-bar 
           class="bg-primary-600 h-2 rounded-full transition-all duration-300">
      </div>
    </div>
  </div>
  
</div>

<script>
const uploadProgress = SpireUI.get(document.getElementById('upload-progress'));

// Simular upload
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    uploadProgress.complete();
    clearInterval(interval);
    SpireUI.toast.success('Upload concluído!');
  } else {
    uploadProgress.value(progress);
  }
}, 500);

document.getElementById('upload-progress').addEventListener('progress:complete', () => {
  console.log('Upload finalizado!');
});
</script>
```

## Múltiplas Etapas

```html
<div class="space-y-4">
  <div>
    <div class="flex justify-between text-sm mb-1">
      <span>Etapa 1: Processando</span>
      <span>Concluído</span>
    </div>
    <div data-v="progress" data-value="100" class="bg-gray-200 rounded-full h-2">
      <div data-progress-bar class="bg-green-500 h-2 rounded-full"></div>
    </div>
  </div>
  
  <div>
    <div class="flex justify-between text-sm mb-1">
      <span>Etapa 2: Validando</span>
      <span data-progress-label>65%</span>
    </div>
    <div data-v="progress" data-value="65" class="bg-gray-200 rounded-full h-2">
      <div data-progress-bar class="bg-primary-600 h-2 rounded-full"></div>
    </div>
  </div>
  
  <div>
    <div class="flex justify-between text-sm mb-1 text-gray-400">
      <span>Etapa 3: Finalizando</span>
      <span>Pendente</span>
    </div>
    <div data-v="progress" data-value="0" class="bg-gray-200 rounded-full h-2">
      <div data-progress-bar class="bg-gray-400 h-2 rounded-full"></div>
    </div>
  </div>
</div>
```

## Acessibilidade

O componente configura automaticamente:

- `role="progressbar"`
- `aria-valuemin="0"`
- `aria-valuemax="100"` (ou valor de data-max)
- `aria-valuenow` (atualizado dinamicamente)

Em modo indeterminado, `aria-valuenow` é removido.
