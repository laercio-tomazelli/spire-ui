# Tooltip

Dicas de ferramentas leves e acessíveis que aparecem ao passar o mouse.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<button data-v="tooltip" data-tooltip="Salvar documento" 
        class="p-2 hover:bg-gray-100 rounded">
  <svg class="w-5 h-5"><!-- save icon --></svg>
</button>
```

## Com Atributo Title

O atributo `title` também funciona (é removido para evitar tooltip nativo):

```html
<button data-v="tooltip" title="Configurações" class="p-2">
  <svg class="w-5 h-5"><!-- cog icon --></svg>
</button>
```

## Posições

```html
<!-- Topo (padrão) -->
<button data-v="tooltip" data-tooltip="Tooltip acima" data-tooltip-position="top">
  Hover
</button>

<!-- Baixo -->
<button data-v="tooltip" data-tooltip="Tooltip abaixo" data-tooltip-position="bottom">
  Hover
</button>

<!-- Esquerda -->
<button data-v="tooltip" data-tooltip="Tooltip à esquerda" data-tooltip-position="left">
  Hover
</button>

<!-- Direita -->
<button data-v="tooltip" data-tooltip="Tooltip à direita" data-tooltip-position="right">
  Hover
</button>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="tooltip"` | Elemento | Identifica o componente tooltip |
| `data-tooltip` | Elemento | Texto do tooltip |
| `data-tooltip-position` | Elemento | Posição: `top`, `bottom`, `left`, `right` |
| `title` | Elemento | Alternativa ao data-tooltip |

## API JavaScript

```javascript
// Obter instância
const tooltip = SpireUI.get(document.querySelector('[data-v="tooltip"]'));

// Métodos
tooltip.show();               // Mostrar
tooltip.hide();               // Esconder
tooltip.update('Novo texto'); // Atualizar conteúdo
tooltip.destroy();            // Limpar listeners
```

### Encadeamento

```javascript
tooltip.update('Texto atualizado').show();
```

## Comportamento

- **Mouse Enter**: Mostra o tooltip
- **Mouse Leave**: Esconde o tooltip
- **Focus**: Mostra o tooltip (para acessibilidade)
- **Blur**: Esconde o tooltip
- **Auto-posicionamento**: Ajusta posição para não sair da tela

## Estilo do Tooltip

O tooltip é criado dinamicamente com estas classes:

```css
.tooltip {
  position: fixed;
  z-index: 50;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: white;
  background-color: #1f2937; /* gray-900 */
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  transition: opacity 0.2s;
}

.dark .tooltip {
  background-color: #374151; /* gray-700 */
}
```

## Toolbar com Tooltips

```html
<div class="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
  <button data-v="tooltip" data-tooltip="Negrito (Ctrl+B)" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- bold --></svg>
  </button>
  <button data-v="tooltip" data-tooltip="Itálico (Ctrl+I)" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- italic --></svg>
  </button>
  <button data-v="tooltip" data-tooltip="Sublinhado (Ctrl+U)" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- underline --></svg>
  </button>
  
  <div class="w-px h-6 bg-gray-300 mx-1"></div>
  
  <button data-v="tooltip" data-tooltip="Alinhar à esquerda" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- align-left --></svg>
  </button>
  <button data-v="tooltip" data-tooltip="Centralizar" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- align-center --></svg>
  </button>
  <button data-v="tooltip" data-tooltip="Alinhar à direita" 
          class="p-2 hover:bg-white rounded">
    <svg class="w-4 h-4"><!-- align-right --></svg>
  </button>
</div>
```

## Ícones com Tooltips

```html
<div class="flex items-center gap-4">
  <a href="#" data-v="tooltip" data-tooltip="Home" 
     class="text-gray-500 hover:text-gray-700">
    <svg class="w-5 h-5"><!-- home --></svg>
  </a>
  <a href="#" data-v="tooltip" data-tooltip="Notificações" 
     class="text-gray-500 hover:text-gray-700 relative">
    <svg class="w-5 h-5"><!-- bell --></svg>
    <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  </a>
  <a href="#" data-v="tooltip" data-tooltip="Configurações" 
     class="text-gray-500 hover:text-gray-700">
    <svg class="w-5 h-5"><!-- cog --></svg>
  </a>
</div>
```

## Tooltip em Texto Truncado

```html
<div class="w-48">
  <p data-v="tooltip" data-tooltip="Este é um texto muito longo que será truncado" 
     class="truncate cursor-help">
    Este é um texto muito longo que será truncado
  </p>
</div>
```

## Tooltip com Delay

Para adicionar delay, use CSS ou modifique o componente:

```css
[data-v="tooltip"]:hover {
  /* Delay para mostrar */
}
```

## Exemplo Completo

```html
<!-- Barra de ações -->
<div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 
            border dark:border-gray-700 rounded-lg shadow-sm">
  
  <div class="flex items-center gap-2">
    <!-- Voltar -->
    <button data-v="tooltip" data-tooltip="Voltar" data-tooltip-position="bottom"
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
    </button>
    
    <!-- Título -->
    <h1 class="text-lg font-semibold">Documento</h1>
  </div>
  
  <div class="flex items-center gap-1">
    <!-- Favoritar -->
    <button data-v="tooltip" data-tooltip="Adicionar aos favoritos"
            class="p-2 text-gray-500 hover:text-yellow-500 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    </button>
    
    <!-- Compartilhar -->
    <button data-v="tooltip" data-tooltip="Compartilhar"
            class="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
      </svg>
    </button>
    
    <!-- Download -->
    <button data-v="tooltip" data-tooltip="Baixar PDF"
            class="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    </button>
    
    <!-- Mais opções -->
    <button data-v="tooltip" data-tooltip="Mais opções"
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
    </button>
  </div>
  
</div>

<script>
// Atualizar tooltip dinamicamente
const starBtn = document.querySelector('[data-tooltip="Adicionar aos favoritos"]');
const tooltip = SpireUI.get(starBtn);

starBtn.addEventListener('click', () => {
  const isFavorited = starBtn.classList.toggle('text-yellow-500');
  tooltip.update(isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
});
</script>
```

## Acessibilidade

- O tooltip usa `role="tooltip"`
- Funciona com foco de teclado (focus/blur)
- O atributo `title` nativo é removido para evitar duplicação

## Performance

- Tooltips são criados no DOM apenas quando mostrados
- Removidos do DOM quando escondidos
- Usa `position: fixed` para evitar problemas de overflow
