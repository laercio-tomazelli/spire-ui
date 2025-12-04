# Accordion

Seções expansíveis acessíveis com suporte a múltiplos itens abertos.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="accordion">
  
  <!-- Item 1 -->
  <div data-accordion-item="faq1" class="border-b">
    <button data-accordion-trigger 
            class="w-full flex items-center justify-between py-4 text-left font-medium">
      O que é Spire UI?
      <svg class="w-5 h-5 transition-transform" data-icon>
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden pb-4">
      <p class="text-gray-600">
        Spire UI é uma biblioteca TypeScript leve para criar interfaces modernas em Laravel.
      </p>
    </div>
  </div>
  
  <!-- Item 2 -->
  <div data-accordion-item="faq2" class="border-b">
    <button data-accordion-trigger 
            class="w-full flex items-center justify-between py-4 text-left font-medium">
      É gratuito?
      <svg class="w-5 h-5 transition-transform" data-icon>
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden pb-4">
      <p class="text-gray-600">
        Sim! Spire UI é open source e gratuito para uso comercial.
      </p>
    </div>
  </div>
  
</div>
```

## Modo Único (Um Item por Vez)

Por padrão, múltiplos itens podem estar abertos. Para permitir apenas um:

```html
<div data-v="accordion" data-multiple="false">
  <!-- items -->
</div>
```

## Item Aberto por Padrão

```html
<div data-accordion-item="faq1" class="border-b">
  <button data-accordion-trigger aria-expanded="true" 
          class="w-full flex justify-between py-4">
    Pergunta
    <svg class="w-5 h-5">...</svg>
  </button>
  <div data-accordion-content class="pb-4">
    <!-- Sem classe hidden -->
    <p>Resposta visível por padrão</p>
  </div>
</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="accordion"` | Container | Identifica o componente accordion |
| `data-multiple` | Container | `"false"` para permitir apenas um item aberto |
| `data-accordion-item` | Div | Identificador único do item |
| `data-accordion-trigger` | Button | Botão que expande/colapsa o item |
| `data-accordion-content` | Div | Conteúdo expansível |

## API JavaScript

```javascript
// Obter instância
const accordion = SpireUI.get(document.querySelector('[data-v="accordion"]'));

// Toggle específico
accordion.toggle('faq1');

// Abrir/Fechar específico
accordion.open('faq1');
accordion.close('faq1');

// Abrir/Fechar todos
accordion.openAll();
accordion.closeAll();

// Destruir
accordion.destroy();
```

### Encadeamento

```javascript
accordion.closeAll().open('faq2');
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `accordion:toggled` | Item foi alternado | `{ item: string, open: boolean }` |
| `accordion:opened` | Item foi aberto | `{ item: string }` |
| `accordion:closed` | Item foi fechado | `{ item: string }` |

```javascript
document.querySelector('[data-v="accordion"]').addEventListener('accordion:toggled', (e) => {
  console.log('Item:', e.detail.item, 'Aberto:', e.detail.open);
});
```

## Acessibilidade

O componente configura automaticamente:

- `aria-expanded` no trigger
- `aria-controls` vinculando trigger ao conteúdo
- `aria-labelledby` no conteúdo
- `role="region"` no conteúdo

## Estilo com Ícone Rotativo

```html
<button data-accordion-trigger 
        class="group w-full flex items-center justify-between py-4">
  <span>Pergunta aqui</span>
  <svg class="w-5 h-5 transition-transform group-aria-expanded:rotate-180">
    <path d="M19 9l-7 7-7-7"/>
  </svg>
</button>
```

## Estilo Cards

```html
<div data-v="accordion" class="space-y-4">
  <div data-accordion-item="item1" 
       class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden">
    <button data-accordion-trigger 
            class="w-full flex items-center justify-between p-4 hover:bg-gray-50 
                   dark:hover:bg-gray-700">
      <span class="font-medium">Título do Card</span>
      <svg class="w-5 h-5 transition-transform" aria-hidden="true">
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden">
      <div class="p-4 pt-0 text-gray-600 dark:text-gray-400">
        Conteúdo do accordion em formato de card.
      </div>
    </div>
  </div>
  <!-- mais items -->
</div>
```

## Com Ícones nos Títulos

```html
<div data-accordion-item="billing" class="border-b">
  <button data-accordion-trigger class="w-full flex items-center gap-3 py-4">
    <svg class="w-5 h-5 text-primary-600"><!-- credit card icon --></svg>
    <span class="flex-1 text-left font-medium">Cobrança e Pagamentos</span>
    <svg class="w-5 h-5 transition-transform">
      <path d="M19 9l-7 7-7-7"/>
    </svg>
  </button>
  <div data-accordion-content class="hidden pl-8 pb-4">
    <p class="text-gray-600">Informações sobre cobrança...</p>
  </div>
</div>
```

## Exemplo Completo - FAQ

```html
<div data-v="accordion" data-multiple="false" 
     class="divide-y dark:divide-gray-700 border dark:border-gray-700 rounded-lg overflow-hidden">
  
  <div data-accordion-item="q1" class="bg-white dark:bg-gray-800">
    <button data-accordion-trigger 
            class="group w-full flex items-center justify-between p-5 text-left
                   hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <span class="font-medium text-gray-900 dark:text-white">
        Como instalo o Spire UI?
      </span>
      <svg class="w-5 h-5 text-gray-500 transition-transform group-aria-expanded:rotate-180" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden">
      <div class="px-5 pb-5 text-gray-600 dark:text-gray-400">
        <p class="mb-3">Instale via npm:</p>
        <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
          <code>npm install && npm run build</code>
        </pre>
      </div>
    </div>
  </div>
  
  <div data-accordion-item="q2" class="bg-white dark:bg-gray-800">
    <button data-accordion-trigger 
            class="group w-full flex items-center justify-between p-5 text-left
                   hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <span class="font-medium text-gray-900 dark:text-white">
        Posso usar com Laravel?
      </span>
      <svg class="w-5 h-5 text-gray-500 transition-transform group-aria-expanded:rotate-180" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden">
      <div class="px-5 pb-5 text-gray-600 dark:text-gray-400">
        <p>
          Sim! O Spire UI foi projetado especificamente para Laravel com Blade components.
          Funciona perfeitamente com Vite e Tailwind CSS.
        </p>
      </div>
    </div>
  </div>
  
  <div data-accordion-item="q3" class="bg-white dark:bg-gray-800">
    <button data-accordion-trigger 
            class="group w-full flex items-center justify-between p-5 text-left
                   hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <span class="font-medium text-gray-900 dark:text-white">
        Qual o tamanho do bundle?
      </span>
      <svg class="w-5 h-5 text-gray-500 transition-transform group-aria-expanded:rotate-180" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div data-accordion-content class="hidden">
      <div class="px-5 pb-5 text-gray-600 dark:text-gray-400">
        <p>
          Aproximadamente 26KB gzip para o JavaScript completo.
          Zero dependências externas!
        </p>
      </div>
    </div>
  </div>
  
</div>

<script>
const faq = SpireUI.get(document.querySelector('[data-v="accordion"]'));

// Abrir primeiro item por padrão
faq.open('q1');

// Log quando qualquer item muda
document.querySelector('[data-v="accordion"]').addEventListener('accordion:toggled', (e) => {
  if (e.detail.open) {
    console.log(`FAQ "${e.detail.item}" expandido`);
  }
});
</script>
```

## Animação de Altura

Para animar a altura suavemente, use CSS:

```css
[data-accordion-content] {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

[data-accordion-content]:not(.hidden) {
  max-height: 500px; /* Ajuste conforme necessário */
}
```

Ou implemente com JavaScript para altura dinâmica real.
