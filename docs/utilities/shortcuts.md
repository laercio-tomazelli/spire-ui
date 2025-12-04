# Shortcuts (Atalhos de Teclado)

Gerenciador de atalhos de teclado globais.

## Instalação

O Shortcuts Manager é parte da API global do Spire UI.

## Uso Básico

```javascript
// Adicionar atalho
SpireUI.shortcuts.add('ctrl+s', () => {
  saveDocument();
});

// Com meta key (Cmd no Mac, Ctrl no Windows)
SpireUI.shortcuts.add('meta+k', () => {
  openCommandPalette();
});
```

## API

```javascript
// Adicionar atalho
SpireUI.shortcuts.add(keys, callback, options?);

// Remover atalho
SpireUI.shortcuts.remove(keys);

// Verificar se existe
SpireUI.shortcuts.has(keys);

// Listar todos
SpireUI.shortcuts.list();

// Desabilitar/Habilitar
SpireUI.shortcuts.disable();
SpireUI.shortcuts.enable();

// Limpar todos
SpireUI.shortcuts.clear();
```

## Formato das Teclas

```javascript
// Teclas modificadoras
'ctrl+s'       // Ctrl + S
'alt+n'        // Alt + N
'shift+enter'  // Shift + Enter
'meta+k'       // Cmd (Mac) ou Ctrl (Windows)

// Múltiplas modificadoras
'ctrl+shift+s' // Ctrl + Shift + S
'ctrl+alt+d'   // Ctrl + Alt + D

// Teclas especiais
'escape'       // Escape
'enter'        // Enter
'space'        // Espaço
'arrowup'      // Seta para cima
'arrowdown'    // Seta para baixo
'arrowleft'    // Seta para esquerda
'arrowright'   // Seta para direita
'tab'          // Tab
'backspace'    // Backspace
'delete'       // Delete
'home'         // Home
'end'          // End
'pageup'       // Page Up
'pagedown'     // Page Down

// Teclas de função
'f1', 'f2', ... 'f12'
```

## Opções

```javascript
SpireUI.shortcuts.add('ctrl+s', saveDocument, {
  preventDefault: true,   // Prevenir ação padrão (default: true)
  stopPropagation: true,  // Parar propagação (default: false)
  target: document,       // Elemento alvo (default: document)
  scope: 'editor'         // Escopo do atalho (opcional)
});
```

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `preventDefault` | boolean | `true` | Prevenir ação padrão do navegador |
| `stopPropagation` | boolean | `false` | Parar propagação do evento |
| `target` | Element | `document` | Elemento que recebe o evento |
| `scope` | string | - | Escopo para agrupar atalhos |

## Escopos

```javascript
// Atalhos específicos para o editor
SpireUI.shortcuts.add('ctrl+b', boldText, { scope: 'editor' });
SpireUI.shortcuts.add('ctrl+i', italicText, { scope: 'editor' });

// Ativar escopo
SpireUI.shortcuts.setScope('editor');

// Voltar ao escopo global
SpireUI.shortcuts.setScope(null);

// Remover todos atalhos de um escopo
SpireUI.shortcuts.clearScope('editor');
```

## Exemplos de Uso

### Salvar Documento

```javascript
SpireUI.shortcuts.add('ctrl+s', async (e) => {
  e.preventDefault();
  
  const btn = SpireUI.get(document.getElementById('save-btn'));
  btn.loading(true);
  
  await saveDocument();
  
  btn.success('Salvo!');
});
```

### Command Palette

```javascript
SpireUI.shortcuts.add('ctrl+k', () => {
  SpireUI.command.open();
});

// ou
SpireUI.shortcuts.add('meta+k', () => {
  SpireUI.command.open();
});
```

### Navegação

```javascript
// Próximo item
SpireUI.shortcuts.add('j', () => {
  selectNextItem();
});

// Item anterior
SpireUI.shortcuts.add('k', () => {
  selectPreviousItem();
});

// Abrir item
SpireUI.shortcuts.add('enter', () => {
  openSelectedItem();
});

// Excluir
SpireUI.shortcuts.add('delete', async () => {
  if (selectedItem) {
    const confirmed = await SpireUI.confirm({
      title: 'Excluir?',
      type: 'danger'
    });
    if (confirmed) deleteItem();
  }
});
```

### Editor de Texto

```javascript
// Formatar texto
SpireUI.shortcuts.add('ctrl+b', () => format('bold'), { scope: 'editor' });
SpireUI.shortcuts.add('ctrl+i', () => format('italic'), { scope: 'editor' });
SpireUI.shortcuts.add('ctrl+u', () => format('underline'), { scope: 'editor' });

// Desfazer/Refazer
SpireUI.shortcuts.add('ctrl+z', () => undo(), { scope: 'editor' });
SpireUI.shortcuts.add('ctrl+shift+z', () => redo(), { scope: 'editor' });
SpireUI.shortcuts.add('ctrl+y', () => redo(), { scope: 'editor' });
```

### Modais

```javascript
// Fechar modal com Escape
SpireUI.shortcuts.add('escape', () => {
  const openModal = document.querySelector('[data-v="modal"]:not(.hidden)');
  if (openModal) {
    SpireUI.get(openModal).close();
  }
});
```

## Help Modal

Mostrar lista de atalhos disponíveis:

```javascript
SpireUI.shortcuts.add('?', () => {
  const shortcuts = SpireUI.shortcuts.list();
  
  const content = shortcuts.map(s => `
    <div class="flex justify-between py-2">
      <kbd class="px-2 py-1 bg-gray-100 rounded text-sm">${s.keys}</kbd>
      <span class="text-gray-600">${s.description || ''}</span>
    </div>
  `).join('');
  
  SpireUI.get(document.getElementById('shortcuts-modal'))
    .body(content)
    .open();
});
```

## Desabilitar Temporariamente

```javascript
// Desabilitar durante input
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('focus', () => SpireUI.shortcuts.disable());
  el.addEventListener('blur', () => SpireUI.shortcuts.enable());
});
```

## Cross-Platform

O modificador `meta` funciona como:
- **Mac**: Command (⌘)
- **Windows/Linux**: Ctrl

```javascript
// Funciona em todas as plataformas
SpireUI.shortcuts.add('meta+s', saveDocument);
// Mac: ⌘+S
// Windows: Ctrl+S
```

## Conflitos

Se um atalho já existe, ele será substituído:

```javascript
SpireUI.shortcuts.add('ctrl+s', save);
SpireUI.shortcuts.add('ctrl+s', saveAs); // Substitui o anterior
```

Para verificar antes:

```javascript
if (!SpireUI.shortcuts.has('ctrl+s')) {
  SpireUI.shortcuts.add('ctrl+s', save);
}
```
