# Collapse

Componente de expansão/colapso para mostrar e esconder conteúdo.

## Uso Básico

```html
<div data-v="collapse">
  <button type="button" class="flex items-center justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <span>Clique para expandir</span>
    <svg data-collapse-icon class="w-5 h-5 transition-transform">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div data-collapse-content class="overflow-hidden transition-all" style="max-height: 0; opacity: 0;">
    <div class="p-4">
      Conteúdo colapsável aqui.
    </div>
  </div>
</div>
```

## Com Blade Component

```blade
<x-ui.collapse title="Seção 1">
  Conteúdo da seção 1.
</x-ui.collapse>

<x-ui.collapse title="Seção 2" :open="true">
  Seção 2 começa aberta.
</x-ui.collapse>
```

## Data Attributes

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="collapse"` | Container | Identifica o componente |
| `data-collapse-content` | Div | Conteúdo que será colapsado |
| `data-collapse-icon` | SVG/Icon | Ícone que rotaciona ao expandir |
| `data-collapse` | Container | ID opcional para identificação |

## API JavaScript

```javascript
const collapse = SpireUI.get(document.querySelector('[data-v="collapse"]'));

// Abrir
collapse.open();

// Fechar
collapse.close();

// Toggle
collapse.toggle();

// Verificar estado
if (collapse.isOpen()) {
  console.log('Está aberto');
}
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Expande o conteúdo |
| `close()` | `this` | Colapsa o conteúdo |
| `toggle()` | `this` | Alterna entre aberto/fechado |
| `isOpen()` | `boolean` | Retorna se está expandido |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `collapse:opened` | `{ id }` | Disparado quando o conteúdo é expandido |
| `collapse:closed` | `{ id }` | Disparado quando o conteúdo é colapsado |

```javascript
element.addEventListener('collapse:opened', (e) => {
  console.log('Collapse aberto:', e.detail.id);
});

element.addEventListener('collapse:closed', (e) => {
  console.log('Collapse fechado:', e.detail.id);
});
```

## Animação

O componente usa transições CSS para animação suave:

```css
[data-collapse-content] {
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

[data-collapse-icon] {
  transition: transform 0.3s ease;
}
```

## Exemplos

### FAQ

```html
<div class="space-y-2">
  <div data-v="collapse">
    <button class="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg">
      <span>O que é o Spire UI?</span>
      <svg data-collapse-icon class="w-5 h-5 transition-transform">...</svg>
    </button>
    <div data-collapse-content style="max-height: 0; opacity: 0;">
      <p class="p-4">Spire UI é uma biblioteca TypeScript leve para Laravel.</p>
    </div>
  </div>
  
  <div data-v="collapse">
    <button class="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg">
      <span>Como instalar?</span>
      <svg data-collapse-icon class="w-5 h-5 transition-transform">...</svg>
    </button>
    <div data-collapse-content style="max-height: 0; opacity: 0;">
      <p class="p-4">Execute npm install e npm run build.</p>
    </div>
  </div>
</div>
```

### Seções de Filtro

```html
<aside class="w-64 border-r p-4">
  <div data-v="collapse">
    <button class="w-full flex justify-between text-sm font-medium mb-2">
      Categorias
      <svg data-collapse-icon>...</svg>
    </button>
    <div data-collapse-content style="max-height: 500px; opacity: 1;">
      <label class="flex items-center gap-2">
        <input type="checkbox"> Eletrônicos
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox"> Roupas
      </label>
    </div>
  </div>
  
  <div data-v="collapse" class="mt-4">
    <button class="w-full flex justify-between text-sm font-medium mb-2">
      Preço
      <svg data-collapse-icon>...</svg>
    </button>
    <div data-collapse-content style="max-height: 0; opacity: 0;">
      <input type="range" min="0" max="1000">
    </div>
  </div>
</aside>
```

## Acessibilidade

- Usa `aria-expanded` automaticamente
- O botão de toggle recebe foco
- Navegação por teclado com Enter/Space

## Diferença do Accordion

O `Collapse` é um componente individual, enquanto o `Accordion` gerencia múltiplos Collapses e pode fechar os outros quando um é aberto (modo exclusivo).

```html
<!-- Collapse: cada um é independente -->
<div data-v="collapse">...</div>
<div data-v="collapse">...</div>

<!-- Accordion: gerencia múltiplos como grupo -->
<div data-v="accordion" data-exclusive="true">
  <div data-accordion-item>...</div>
  <div data-accordion-item>...</div>
</div>
```
