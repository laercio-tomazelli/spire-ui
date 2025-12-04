# Popover

Popovers acessíveis acionados por clique com posicionamento automático.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="popover" class="relative inline-block">
  <!-- Trigger -->
  <button data-popover-trigger class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
    Clique aqui
  </button>
  
  <!-- Content -->
  <div data-popover-content 
       class="hidden absolute z-50 w-64 p-4 bg-white rounded-lg shadow-lg border">
    <h3 class="font-semibold mb-2">Título do Popover</h3>
    <p class="text-sm text-gray-600">Conteúdo do popover aqui.</p>
  </div>
</div>
```

## Posições

```html
<!-- Bottom (padrão) -->
<div data-v="popover" data-position="bottom">...</div>

<!-- Top -->
<div data-v="popover" data-position="top">...</div>

<!-- Left -->
<div data-v="popover" data-position="left">...</div>

<!-- Right -->
<div data-v="popover" data-position="right">...</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="popover"` | Container | Identifica o componente |
| `data-position` | Container | Posição: `top`, `bottom`, `left`, `right` |
| `data-popover-trigger` | Element | Elemento que abre o popover |
| `data-popover-content` | Div | Conteúdo do popover |

## API JavaScript

```javascript
// Obter instância
const popover = SpireUI.get(document.querySelector('[data-v="popover"]'));

// Métodos
popover.show();                  // Mostrar
popover.hide();                  // Esconder
popover.toggle();                // Toggle
popover.update('<p>Novo</p>');   // Atualizar conteúdo
popover.destroy();               // Limpar listeners
```

### Encadeamento

```javascript
popover.update('Novo conteúdo').show();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `popover:shown` | Popover mostrado | `{ position: string }` |
| `popover:hidden` | Popover escondido | `{}` |

```javascript
document.querySelector('[data-v="popover"]').addEventListener('popover:shown', (e) => {
  console.log('Posição:', e.detail.position);
});
```

## Comportamento

- **Click para abrir**: Clique no trigger abre/fecha
- **Click Outside**: Clique fora fecha o popover
- **Escape**: Pressionar Escape fecha e retorna foco
- **Animação**: Fade + scale (classes opacity/scale)

## Popover com Formulário

```html
<div data-v="popover" data-position="bottom" class="relative inline-block">
  <button data-popover-trigger class="text-primary-600 hover:underline">
    Alterar email
  </button>
  
  <div data-popover-content 
       class="hidden absolute z-50 w-80 p-4 bg-white rounded-lg shadow-xl border">
    <h3 class="font-semibold mb-3">Alterar Email</h3>
    <form class="space-y-3">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Novo email</label>
        <input type="email" class="w-full px-3 py-2 border rounded-lg" placeholder="novo@email.com">
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" onclick="SpireUI.get(this.closest('[data-v=popover]')).hide()"
                class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
          Cancelar
        </button>
        <button type="submit" class="px-3 py-1.5 text-sm bg-primary-600 text-white rounded">
          Salvar
        </button>
      </div>
    </form>
  </div>
</div>
```

## Popover de Confirmação

```html
<div data-v="popover" data-position="top" class="relative inline-block">
  <button data-popover-trigger class="px-4 py-2 bg-red-600 text-white rounded-lg">
    Excluir
  </button>
  
  <div data-popover-content 
       class="hidden absolute z-50 w-64 p-4 bg-white rounded-lg shadow-xl border">
    <p class="font-medium mb-2">Confirmar exclusão?</p>
    <p class="text-sm text-gray-500 mb-4">Esta ação não pode ser desfeita.</p>
    <div class="flex justify-end gap-2">
      <button onclick="SpireUI.get(this.closest('[data-v=popover]')).hide()"
              class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
        Não
      </button>
      <button onclick="deleteItem()" class="px-3 py-1.5 text-sm bg-red-600 text-white rounded">
        Sim, excluir
      </button>
    </div>
  </div>
</div>
```

## Popover de Usuário

```html
<div data-v="popover" data-position="bottom" class="relative">
  <button data-popover-trigger class="flex items-center gap-2">
    <img src="/avatar.jpg" class="w-8 h-8 rounded-full">
    <span>João Silva</span>
  </button>
  
  <div data-popover-content 
       class="hidden absolute right-0 z-50 w-72 bg-white rounded-lg shadow-xl border overflow-hidden">
    
    <!-- Header -->
    <div class="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
      <img src="/avatar.jpg" class="w-16 h-16 rounded-full border-2 border-white mb-2">
      <h3 class="font-semibold">João Silva</h3>
      <p class="text-sm opacity-90">joao@empresa.com</p>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-3 gap-1 p-3 border-b">
      <div class="text-center">
        <div class="font-bold">127</div>
        <div class="text-xs text-gray-500">Posts</div>
      </div>
      <div class="text-center">
        <div class="font-bold">1.2k</div>
        <div class="text-xs text-gray-500">Seguidores</div>
      </div>
      <div class="text-center">
        <div class="font-bold">89</div>
        <div class="text-xs text-gray-500">Seguindo</div>
      </div>
    </div>
    
    <!-- Actions -->
    <div class="p-2">
      <a href="/profile" class="block px-3 py-2 hover:bg-gray-100 rounded">Ver Perfil</a>
      <a href="/messages" class="block px-3 py-2 hover:bg-gray-100 rounded">Mensagens</a>
    </div>
    
  </div>
</div>
```

## Exemplo Completo

```html
<div data-v="popover" id="settings-popover" data-position="bottom" class="relative inline-block">
  
  <!-- Trigger -->
  <button data-popover-trigger 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
    <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  </button>
  
  <!-- Content -->
  <div data-popover-content 
       class="hidden absolute right-0 z-50 w-80 bg-white dark:bg-gray-800 
              rounded-xl shadow-2xl border dark:border-gray-700 overflow-hidden
              transition-all duration-150 ease-out opacity-0 scale-95">
    
    <div class="p-4 border-b dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 dark:text-white">Configurações Rápidas</h3>
    </div>
    
    <div class="p-4 space-y-4">
      
      <!-- Notificações -->
      <label class="flex items-center justify-between cursor-pointer">
        <span class="text-sm text-gray-700 dark:text-gray-300">Notificações</span>
        <input type="checkbox" checked class="toggle">
      </label>
      
      <!-- Som -->
      <label class="flex items-center justify-between cursor-pointer">
        <span class="text-sm text-gray-700 dark:text-gray-300">Som</span>
        <input type="checkbox" class="toggle">
      </label>
      
      <!-- Tema -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-700 dark:text-gray-300">Tema</span>
        <select class="text-sm border rounded-lg px-2 py-1 dark:bg-gray-700 dark:border-gray-600">
          <option>Claro</option>
          <option>Escuro</option>
          <option>Sistema</option>
        </select>
      </div>
      
    </div>
    
    <div class="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
      <a href="/settings" class="text-sm text-primary-600 hover:underline">
        Ver todas as configurações →
      </a>
    </div>
    
  </div>
</div>

<script>
const settingsPopover = SpireUI.get(document.getElementById('settings-popover'));

document.getElementById('settings-popover').addEventListener('popover:shown', () => {
  console.log('Configurações abertas');
});
</script>
```

## Animação

O popover usa classes para animação suave:

```css
[data-popover-content] {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

[data-popover-content].opacity-0 {
  opacity: 0;
}

[data-popover-content].scale-95 {
  transform: scale(0.95);
}

[data-popover-content].opacity-100 {
  opacity: 1;
}

[data-popover-content].scale-100 {
  transform: scale(1);
}
```

## Acessibilidade

O componente configura automaticamente:

- `aria-haspopup="true"` no trigger
- `aria-expanded` dinâmico
- `role="dialog"` no conteúdo

## Diferença entre Popover e Tooltip

| Popover | Tooltip |
|---------|---------|
| Acionado por clique | Acionado por hover |
| Pode ter conteúdo interativo | Apenas texto informativo |
| Permanece aberto até fechar | Fecha ao sair o mouse |
| Bom para formulários/ações | Bom para dicas rápidas |
