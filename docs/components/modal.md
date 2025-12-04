# Modal

Janelas modais acessíveis com focus trap, scroll lock e animações.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<!-- Trigger -->
<button onclick="SpireUI.get(document.getElementById('my-modal')).open()">
  Abrir Modal
</button>

<!-- Modal -->
<div data-v="modal" id="my-modal" 
     class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b">
      <h2 data-title class="text-lg font-semibold">Título do Modal</h2>
      <button data-close class="p-1 hover:bg-gray-100 rounded">
        <svg class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <!-- Body -->
    <div data-body class="p-4">
      <p>Conteúdo do modal aqui.</p>
    </div>
    
    <!-- Footer -->
    <div class="flex justify-end gap-2 p-4 border-t">
      <button data-close class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
        Confirmar
      </button>
    </div>
    
  </div>
</div>
```

## Tamanhos

```html
<!-- Small -->
<div data-v="modal" class="...">
  <div class="max-w-sm w-full">...</div>
</div>

<!-- Medium (default) -->
<div data-v="modal" class="...">
  <div class="max-w-md w-full">...</div>
</div>

<!-- Large -->
<div data-v="modal" class="...">
  <div class="max-w-lg w-full">...</div>
</div>

<!-- Extra Large -->
<div data-v="modal" class="...">
  <div class="max-w-2xl w-full">...</div>
</div>

<!-- Full Screen -->
<div data-v="modal" class="...">
  <div class="max-w-full w-full h-full">...</div>
</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="modal"` | Container | Identifica o componente modal |
| `data-title` | Element | Elemento do título (para aria-labelledby) |
| `data-body` | Element | Container do conteúdo |
| `data-close` | Button | Botão que fecha o modal |

## API JavaScript

```javascript
// Obter instância
const modal = SpireUI.get(document.getElementById('my-modal'));

// Abrir/Fechar
modal.open();
modal.close();

// Modificar conteúdo
modal.title('Novo Título');
modal.body('<p>Novo conteúdo</p>');
modal.body(document.createElement('div')); // ou elemento DOM

// Destruir
modal.destroy();
```

### Encadeamento

```javascript
modal.title('Confirmação').body('Tem certeza?').open();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `modal:opened` | Modal foi aberto | `{}` |
| `modal:closed` | Modal foi fechado | `{}` |

```javascript
document.getElementById('my-modal').addEventListener('modal:opened', () => {
  console.log('Modal aberto');
});

document.getElementById('my-modal').addEventListener('modal:closed', () => {
  console.log('Modal fechado');
});
```

## Acessibilidade

O componente configura automaticamente:

- `role="dialog"` no container
- `aria-modal="true"` 
- `aria-labelledby` vinculado ao título
- `tabindex="-1"` para receber foco

### Focus Trap

O foco fica preso dentro do modal enquanto está aberto:
- Tab move para o próximo elemento focável
- Shift+Tab move para o anterior
- Ao chegar no último, volta para o primeiro

### Scroll Lock

O scroll do body é travado automaticamente quando o modal abre.

### Escape

Pressionar Escape fecha o modal.

### Foco Restaurado

Ao fechar, o foco retorna ao elemento que estava ativo antes de abrir.

## Click Outside

Clicar no overlay (fora do modal) fecha o modal automaticamente.

## Animações

Adicione animações via CSS:

```css
/* Fade */
[data-v="modal"] {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

[data-v="modal"]:not(.hidden) {
  opacity: 1;
}

/* Scale */
[data-v="modal"] > div {
  transform: scale(0.95);
  transition: transform 0.2s ease-out;
}

[data-v="modal"]:not(.hidden) > div {
  transform: scale(1);
}
```

## Modal de Confirmação Programático

Use `SpireUI.confirm()` para confirmações rápidas:

```javascript
const confirmed = await SpireUI.confirm({
  title: 'Excluir item?',
  message: 'Esta ação não pode ser desfeita.',
  confirmText: 'Excluir',
  cancelText: 'Cancelar',
  type: 'danger' // 'info' | 'warning' | 'danger'
});

if (confirmed) {
  // Usuário confirmou
}
```

## Exemplo Completo

```html
<!-- Trigger Button -->
<button id="open-user-modal" class="px-4 py-2 bg-primary-600 text-white rounded-lg">
  Editar Perfil
</button>

<!-- Modal -->
<div data-v="modal" id="user-modal" 
     class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
  
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full 
              transform transition-all">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b dark:border-gray-700">
      <h2 data-title class="text-xl font-semibold text-gray-900 dark:text-white">
        Editar Perfil
      </h2>
      <button data-close 
              class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                     dark:hover:bg-gray-700 rounded-lg transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Body -->
    <div data-body class="p-5">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input type="text" value="João Silva" 
                 class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input type="email" value="joao@email.com" 
                 class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea rows="3" 
                    class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Conte um pouco sobre você..."></textarea>
        </div>
      </form>
    </div>
    
    <!-- Footer -->
    <div class="flex justify-end gap-3 p-5 border-t dark:border-gray-700 bg-gray-50 
                dark:bg-gray-800/50 rounded-b-xl">
      <button data-close 
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                     dark:hover:bg-gray-700 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     transition-colors">
        Salvar Alterações
      </button>
    </div>
    
  </div>
</div>

<script>
const modal = SpireUI.get(document.getElementById('user-modal'));

document.getElementById('open-user-modal').addEventListener('click', () => {
  modal.open();
});

document.getElementById('user-modal').addEventListener('modal:closed', () => {
  console.log('Edição cancelada ou salva');
});
</script>
```

## Múltiplos Modais

Modais podem ser empilhados, cada um com seu próprio z-index:

```html
<div data-v="modal" id="modal-1" class="z-50">...</div>
<div data-v="modal" id="modal-2" class="z-[60]">...</div>
```
