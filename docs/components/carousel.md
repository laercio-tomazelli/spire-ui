# Carousel

Carrossel de imagens/conteúdo com autoplay, touch/swipe e navegação por teclado.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="carousel" class="relative overflow-hidden rounded-lg">
  
  <!-- Slides -->
  <div data-carousel-track class="relative h-64">
    <div data-carousel-slide class="absolute inset-0 opacity-100 z-10 transition-opacity duration-500">
      <img src="/slide-1.jpg" class="w-full h-full object-cover">
    </div>
    <div data-carousel-slide class="absolute inset-0 opacity-0 z-0 transition-opacity duration-500">
      <img src="/slide-2.jpg" class="w-full h-full object-cover">
    </div>
    <div data-carousel-slide class="absolute inset-0 opacity-0 z-0 transition-opacity duration-500">
      <img src="/slide-3.jpg" class="w-full h-full object-cover">
    </div>
  </div>
  
  <!-- Navigation -->
  <button data-carousel-prev class="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full">
    <svg class="w-5 h-5"><!-- arrow left --></svg>
  </button>
  <button data-carousel-next class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full">
    <svg class="w-5 h-5"><!-- arrow right --></svg>
  </button>
  
  <!-- Indicators -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    <button data-carousel-indicator class="w-2 h-2 rounded-full bg-white"></button>
    <button data-carousel-indicator class="w-2 h-2 rounded-full bg-white/50"></button>
    <button data-carousel-indicator class="w-2 h-2 rounded-full bg-white/50"></button>
  </div>
  
</div>
```

## Com Autoplay

```html
<div data-v="carousel" data-autoplay="true" data-interval="5000">
  <!-- slides -->
</div>
```

## Opções via Atributos

| Atributo | Descrição | Default |
|----------|-----------|---------|
| `data-autoplay` | Habilitar autoplay | `false` |
| `data-interval` | Intervalo em ms | `5000` |
| `data-loop` | Loop infinito | `true` |
| `data-pause-on-hover` | Pausar ao hover | `true` |

## API JavaScript

```javascript
// Obter instância
const carousel = SpireUI.get(document.querySelector('[data-v="carousel"]'));

// Navegação
carousel.next();      // Próximo slide
carousel.prev();      // Slide anterior
carousel.goto(2);     // Ir para slide específico (0-indexed)

// Estado
carousel.current();   // Retorna índice atual

// Autoplay
carousel.play();      // Iniciar autoplay
carousel.pause();     // Pausar autoplay

// Limpar
carousel.destroy();
```

### Encadeamento

```javascript
carousel.goto(0).play();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `carousel:change` | Slide mudou | `{ index: number, total: number }` |
| `carousel:play` | Autoplay iniciado | `{}` |
| `carousel:pause` | Autoplay pausado | `{}` |

```javascript
document.querySelector('[data-v="carousel"]').addEventListener('carousel:change', (e) => {
  console.log(`Slide ${e.detail.index + 1} de ${e.detail.total}`);
});
```

## Navegação

### Por Botões

```html
<button data-carousel-prev>Anterior</button>
<button data-carousel-next>Próximo</button>
```

### Por Indicadores

```html
<button data-carousel-indicator>1</button>
<button data-carousel-indicator>2</button>
```

### Por Teclado

- **←** Arrow Left: Slide anterior
- **→** Arrow Right: Próximo slide

### Por Touch/Swipe

Suporte nativo a gestos de swipe em dispositivos móveis.

## Sem Loop

```html
<div data-v="carousel" data-loop="false">
  <!-- Quando no primeiro slide, prev é desabilitado -->
  <!-- Quando no último slide, next é desabilitado -->
</div>
```

## Cards Carousel

```html
<div data-v="carousel" class="relative">
  <div data-carousel-track class="relative h-80">
    
    <!-- Card 1 -->
    <div data-carousel-slide class="absolute inset-0 px-4 opacity-100 z-10">
      <div class="bg-white rounded-lg shadow-lg p-6 h-full">
        <h3 class="text-xl font-bold">Card 1</h3>
        <p class="text-gray-600 mt-2">Descrição do card...</p>
      </div>
    </div>
    
    <!-- Card 2 -->
    <div data-carousel-slide class="absolute inset-0 px-4 opacity-0 z-0">
      <div class="bg-white rounded-lg shadow-lg p-6 h-full">
        <h3 class="text-xl font-bold">Card 2</h3>
        <p class="text-gray-600 mt-2">Descrição do card...</p>
      </div>
    </div>
    
  </div>
</div>
```

## Carousel de Depoimentos

```html
<div data-v="carousel" data-autoplay="true" data-interval="7000"
     class="relative bg-gray-50 dark:bg-gray-800 py-12 px-8 rounded-xl">
  
  <div data-carousel-track class="relative min-h-[200px]">
    
    <!-- Depoimento 1 -->
    <div data-carousel-slide class="absolute inset-0 opacity-100 z-10 flex flex-col items-center text-center">
      <img src="/avatar1.jpg" class="w-16 h-16 rounded-full mb-4">
      <blockquote class="text-xl text-gray-700 dark:text-gray-300 italic max-w-2xl">
        "Produto incrível! Mudou completamente a forma como trabalho."
      </blockquote>
      <cite class="mt-4 text-gray-500 not-italic">
        <span class="font-semibold text-gray-900 dark:text-white">Maria Silva</span>
        <span class="block text-sm">CEO, Empresa X</span>
      </cite>
    </div>
    
    <!-- Depoimento 2 -->
    <div data-carousel-slide class="absolute inset-0 opacity-0 z-0 flex flex-col items-center text-center">
      <img src="/avatar2.jpg" class="w-16 h-16 rounded-full mb-4">
      <blockquote class="text-xl text-gray-700 dark:text-gray-300 italic max-w-2xl">
        "Suporte excepcional e interface muito intuitiva."
      </blockquote>
      <cite class="mt-4 text-gray-500 not-italic">
        <span class="font-semibold text-gray-900 dark:text-white">João Santos</span>
        <span class="block text-sm">CTO, Startup Y</span>
      </cite>
    </div>
    
  </div>
  
  <!-- Indicators -->
  <div class="flex justify-center gap-2 mt-8">
    <button data-carousel-indicator class="w-2 h-2 rounded-full bg-primary-600"></button>
    <button data-carousel-indicator class="w-2 h-2 rounded-full bg-gray-300"></button>
  </div>
  
</div>
```

## Exemplo Completo

```html
<div data-v="carousel" id="hero-carousel" 
     data-autoplay="true" data-interval="5000" data-pause-on-hover="true"
     class="relative overflow-hidden rounded-2xl shadow-xl">
  
  <!-- Track -->
  <div data-carousel-track class="relative h-96 md:h-[500px]">
    
    <!-- Slide 1 -->
    <div data-carousel-slide class="absolute inset-0 opacity-100 z-10 transition-opacity duration-700">
      <img src="/hero-1.jpg" alt="Hero 1" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div class="p-8 md:p-16 max-w-lg text-white">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">Título do Slide 1</h2>
          <p class="text-lg mb-6 text-gray-200">Descrição do primeiro slide com mais detalhes.</p>
          <a href="#" class="inline-block px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100">
            Saiba Mais
          </a>
        </div>
      </div>
    </div>
    
    <!-- Slide 2 -->
    <div data-carousel-slide class="absolute inset-0 opacity-0 z-0 transition-opacity duration-700">
      <img src="/hero-2.jpg" alt="Hero 2" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div class="p-8 md:p-16 max-w-lg text-white">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">Título do Slide 2</h2>
          <p class="text-lg mb-6 text-gray-200">Descrição do segundo slide.</p>
          <a href="#" class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700">
            Ver Produtos
          </a>
        </div>
      </div>
    </div>
    
  </div>
  
  <!-- Prev/Next -->
  <button data-carousel-prev 
          class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 
                 backdrop-blur rounded-full text-white transition-colors">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
  </button>
  <button data-carousel-next 
          class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 
                 backdrop-blur rounded-full text-white transition-colors">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </button>
  
  <!-- Indicators -->
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
    <button data-carousel-indicator 
            class="w-3 h-3 rounded-full bg-white transition-colors" 
            aria-label="Slide 1"></button>
    <button data-carousel-indicator 
            class="w-3 h-3 rounded-full bg-white/50 transition-colors" 
            aria-label="Slide 2"></button>
  </div>
  
</div>

<script>
const carousel = SpireUI.get(document.getElementById('hero-carousel'));

// Controle externo
document.getElementById('pause-btn')?.addEventListener('click', () => {
  carousel.pause();
});

document.getElementById('play-btn')?.addEventListener('click', () => {
  carousel.play();
});

// Log de mudanças
document.getElementById('hero-carousel').addEventListener('carousel:change', (e) => {
  console.log(`Slide ${e.detail.index + 1} de ${e.detail.total}`);
});
</script>
```

## Acessibilidade

- `aria-hidden` nos slides não visíveis
- `aria-current` no indicador ativo
- Navegação por teclado com setas
