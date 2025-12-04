# ContextMenu

Menu de contexto (clique direito) customizado.

## Uso Básico

```html
<div data-v="context-menu" 
     data-context-items='[
       {"id": "copy", "label": "Copiar", "icon": "📋", "shortcut": "⌘C"},
       {"id": "paste", "label": "Colar", "icon": "📄", "shortcut": "⌘V"},
       {"divider": true},
       {"id": "delete", "label": "Excluir", "icon": "🗑️", "danger": true}
     ]'>
  <div class="p-8 bg-gray-100 rounded-lg">
    Clique com o botão direito aqui
  </div>
</div>
```

## Com Blade Component

```blade
<x-ui.context-menu :items="[
  ['id' => 'edit', 'label' => 'Editar', 'icon' => '✏️'],
  ['id' => 'duplicate', 'label' => 'Duplicar', 'icon' => '📑'],
  ['divider' => true],
  ['id' => 'delete', 'label' => 'Excluir', 'icon' => '🗑️', 'danger' => true],
]">
  <div class="p-4 border rounded">
    Conteúdo com menu de contexto
  </div>
</x-ui.context-menu>
```

## Data Attributes

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `data-v="context-menu"` | - | Identifica o componente |
| `data-context-items` | JSON | Array de itens do menu |

## Interface ContextMenuItem

```typescript
interface ContextMenuItem {
  id?: string;        // ID do item
  label?: string;     // Texto exibido
  icon?: string;      // Emoji ou HTML do ícone
  shortcut?: string;  // Atalho de teclado (apenas visual)
  disabled?: boolean; // Item desabilitado
  danger?: boolean;   // Estilo de perigo (vermelho)
  divider?: boolean;  // Linha divisória
  handler?: () => void; // Função a executar
}
```

## Itens de Menu

```javascript
// Item normal
{ id: 'edit', label: 'Editar', icon: '✏️' }

// Com atalho (apenas visual)
{ id: 'copy', label: 'Copiar', icon: '📋', shortcut: '⌘C' }

// Desabilitado
{ id: 'paste', label: 'Colar', disabled: true }

// Estilo de perigo
{ id: 'delete', label: 'Excluir', icon: '🗑️', danger: true }

// Divisor
{ divider: true }
```

## API JavaScript

```javascript
const menu = SpireUI.get(document.querySelector('[data-v="context-menu"]'));

// Mostrar em posição específica
menu.show(x, y);

// Esconder
menu.hide();

// Definir itens dinamicamente
menu.setItems([
  { id: 'new', label: 'Novo', icon: '➕' },
  { id: 'refresh', label: 'Atualizar', icon: '🔄' }
]);
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `show(x, y)` | `this` | Mostra o menu na posição |
| `hide()` | `this` | Esconde o menu |
| `setItems(items)` | `this` | Define os itens do menu |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `contextmenu:select` | `{ item }` | Disparado quando um item é selecionado |
| `contextmenu:show` | `{ x, y }` | Disparado ao mostrar o menu |
| `contextmenu:hide` | - | Disparado ao esconder |

```javascript
element.addEventListener('contextmenu:select', (e) => {
  const { item } = e.detail;
  
  switch (item.id) {
    case 'copy':
      copyToClipboard();
      break;
    case 'delete':
      deleteItem();
      break;
  }
});
```

## Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `↑` `↓` | Navegar entre itens |
| `Enter` | Selecionar item |
| `Escape` | Fechar menu |

## Exemplos

### Gerenciador de Arquivos

```html
<div class="grid grid-cols-4 gap-4">
  @foreach($files as $file)
    <div data-v="context-menu" 
         data-context-items='[
           {"id": "open", "label": "Abrir", "icon": "📂"},
           {"id": "rename", "label": "Renomear", "icon": "✏️"},
           {"id": "download", "label": "Baixar", "icon": "⬇️"},
           {"divider": true},
           {"id": "delete", "label": "Excluir", "icon": "🗑️", "danger": true}
         ]'
         data-file-id="{{ $file->id }}">
      <div class="p-4 bg-gray-100 rounded-lg text-center">
        <div class="text-4xl mb-2">📄</div>
        <div class="text-sm truncate">{{ $file->name }}</div>
      </div>
    </div>
  @endforeach
</div>

<script>
document.querySelectorAll('[data-v="context-menu"]').forEach(el => {
  el.addEventListener('contextmenu:select', async (e) => {
    const fileId = el.dataset.fileId;
    const action = e.detail.item.id;
    
    switch (action) {
      case 'open':
        window.location.href = `/files/${fileId}`;
        break;
      case 'rename':
        const newName = prompt('Novo nome:');
        if (newName) await renameFile(fileId, newName);
        break;
      case 'download':
        downloadFile(fileId);
        break;
      case 'delete':
        if (await SpireUI.confirm({ title: 'Excluir arquivo?', type: 'danger' })) {
          await deleteFile(fileId);
        }
        break;
    }
  });
});
</script>
```

### Editor de Texto

```html
<div data-v="context-menu"
     data-context-items='[
       {"id": "cut", "label": "Recortar", "icon": "✂️", "shortcut": "⌘X"},
       {"id": "copy", "label": "Copiar", "icon": "📋", "shortcut": "⌘C"},
       {"id": "paste", "label": "Colar", "icon": "📄", "shortcut": "⌘V"},
       {"divider": true},
       {"id": "select-all", "label": "Selecionar Tudo", "shortcut": "⌘A"}
     ]'>
  <textarea class="w-full h-64 p-4 border rounded"></textarea>
</div>
```

### Tabela com Ações

```html
<table>
  @foreach($users as $user)
    <tr data-v="context-menu"
        data-context-items='[
          {"id": "view", "label": "Ver Detalhes", "icon": "👁️"},
          {"id": "edit", "label": "Editar", "icon": "✏️"},
          {"id": "permissions", "label": "Permissões", "icon": "🔐"},
          {"divider": true},
          {"id": "deactivate", "label": "Desativar", "icon": "⛔", "danger": true}
        ]'
        data-user-id="{{ $user->id }}">
      <td>{{ $user->name }}</td>
      <td>{{ $user->email }}</td>
    </tr>
  @endforeach
</table>
```

## Posicionamento

O menu é posicionado automaticamente para não sair da tela:

```javascript
// Se não couber à direita, abre à esquerda
// Se não couber abaixo, abre acima
```

## Visual

```html
<!-- Estrutura gerada -->
<div class="fixed z-[9999] min-w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border py-1">
  
  <button class="w-full px-3 py-2 text-sm flex items-center gap-3 hover:bg-gray-100">
    <span class="w-5">📋</span>
    <span class="flex-1 text-left">Copiar</span>
    <span class="text-xs text-gray-400">⌘C</span>
  </button>
  
  <div class="my-1 border-t"></div>
  
  <button class="w-full px-3 py-2 text-sm flex items-center gap-3 text-red-600 hover:bg-red-50">
    <span class="w-5">🗑️</span>
    <span class="flex-1 text-left">Excluir</span>
  </button>
  
</div>
```

## Acessibilidade

- `role="menu"` no container
- `role="menuitem"` nos itens
- Navegação por teclado
- Itens desabilitados têm `aria-disabled`
