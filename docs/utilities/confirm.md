# Confirm

Diálogos de confirmação modernos e acessíveis.

## Instalação

O Confirm é parte da API global do Spire UI.

## Uso Básico

```javascript
const confirmed = await SpireUI.confirm({
  title: 'Confirmar exclusão',
  message: 'Tem certeza que deseja excluir este item?'
});

if (confirmed) {
  // Usuário confirmou
  deleteItem();
}
```

## Com Tipo

```javascript
// Info (default)
await SpireUI.confirm({
  title: 'Confirmar',
  message: 'Deseja continuar?',
  type: 'info'
});

// Warning
await SpireUI.confirm({
  title: 'Atenção',
  message: 'Esta ação pode causar problemas.',
  type: 'warning'
});

// Danger
await SpireUI.confirm({
  title: 'Excluir item?',
  message: 'Esta ação não pode ser desfeita.',
  type: 'danger'
});
```

## Opções

```javascript
await SpireUI.confirm({
  title: 'Título',           // Título do modal
  message: 'Mensagem',       // Mensagem/corpo
  type: 'danger',            // info | warning | danger
  confirmText: 'Sim, excluir', // Texto do botão confirmar
  cancelText: 'Cancelar',    // Texto do botão cancelar
  icon: '🗑️',                // Ícone customizado
});
```

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `title` | string | `'Confirmar'` | Título do diálogo |
| `message` | string | - | Mensagem do corpo |
| `type` | string | `'info'` | Tipo visual |
| `confirmText` | string | `'Confirmar'` | Texto do botão confirmar |
| `cancelText` | string | `'Cancelar'` | Texto do botão cancelar |
| `icon` | string | - | Ícone customizado |

## Cores por Tipo

| Tipo | Cor do Botão Confirmar |
|------|------------------------|
| `info` | `bg-primary-600` |
| `warning` | `bg-yellow-600` |
| `danger` | `bg-red-600` |

## Exemplos de Uso

### Exclusão

```javascript
async function handleDelete(id) {
  const confirmed = await SpireUI.confirm({
    title: 'Excluir usuário?',
    message: 'Todos os dados serão perdidos permanentemente.',
    type: 'danger',
    confirmText: 'Sim, excluir',
    cancelText: 'Não, manter'
  });
  
  if (confirmed) {
    await deleteUser(id);
    SpireUI.toast.success('Usuário excluído');
  }
}
```

### Sair sem salvar

```javascript
window.addEventListener('beforeunload', async (e) => {
  if (hasUnsavedChanges) {
    const confirmed = await SpireUI.confirm({
      title: 'Alterações não salvas',
      message: 'Você tem alterações não salvas. Deseja sair mesmo assim?',
      type: 'warning',
      confirmText: 'Sair sem salvar',
      cancelText: 'Continuar editando'
    });
    
    if (!confirmed) {
      e.preventDefault();
    }
  }
});
```

### Ação crítica

```javascript
async function resetDatabase() {
  const confirmed = await SpireUI.confirm({
    title: '⚠️ Resetar banco de dados?',
    message: 'ATENÇÃO: Todos os dados serão apagados. Esta ação é IRREVERSÍVEL.',
    type: 'danger',
    confirmText: 'RESETAR TUDO',
    cancelText: 'Cancelar'
  });
  
  if (confirmed) {
    // Segunda confirmação para ações muito críticas
    const doubleConfirm = await SpireUI.confirm({
      title: 'Última chance!',
      message: 'Digite "RESETAR" para confirmar.',
      type: 'danger',
      confirmText: 'Confirmar',
      input: true,
      inputPlaceholder: 'Digite RESETAR'
    });
    
    if (doubleConfirm === 'RESETAR') {
      await fetch('/api/reset', { method: 'POST' });
    }
  }
}
```

## Retorno

A função retorna uma `Promise<boolean>`:
- `true` - Usuário clicou em confirmar
- `false` - Usuário clicou em cancelar ou pressionou Escape

```javascript
const result = await SpireUI.confirm({ ... });
console.log(result); // true ou false
```

## Estilo do Modal

O modal de confirmação é renderizado com:

```html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
    
    <!-- Ícone -->
    <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
      <svg><!-- icon --></svg>
    </div>
    
    <!-- Título -->
    <h3 class="text-lg font-semibold text-center mb-2">Título</h3>
    
    <!-- Mensagem -->
    <p class="text-gray-600 text-center mb-6">Mensagem</p>
    
    <!-- Botões -->
    <div class="flex gap-3">
      <button class="flex-1 px-4 py-2 bg-gray-100 rounded-lg">Cancelar</button>
      <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Confirmar</button>
    </div>
    
  </div>
</div>
```

## Acessibilidade

- Focus trap dentro do modal
- Escape fecha o modal
- `aria-modal="true"`
- `role="alertdialog"`
- Foco retorna ao elemento original após fechar
