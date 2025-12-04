# Toast

Sistema de notificações toast (pop-up) para feedback ao usuário.

## Instalação

O Toast Manager é parte da API global do Spire UI.

## Uso Básico

```javascript
// Tipos de toast
SpireUI.toast.success('Operação realizada com sucesso!');
SpireUI.toast.error('Erro ao processar requisição');
SpireUI.toast.warning('Atenção: ação necessária');
SpireUI.toast.info('Nova mensagem disponível');
```

## Com Opções

```javascript
SpireUI.toast.success('Salvo!', {
  duration: 5000,      // Duração em ms (default: 3000)
  position: 'top-right' // Posição
});
```

## Posições

```javascript
SpireUI.toast.position = 'top-right';    // Padrão
SpireUI.toast.position = 'top-left';
SpireUI.toast.position = 'bottom-right';
SpireUI.toast.position = 'bottom-left';
SpireUI.toast.position = 'top-center';
SpireUI.toast.position = 'bottom-center';
```

## API

```javascript
// Métodos principais
SpireUI.toast.success(message, options?);
SpireUI.toast.error(message, options?);
SpireUI.toast.warning(message, options?);
SpireUI.toast.info(message, options?);

// Remover todos os toasts
SpireUI.toast.clear();

// Toast customizado
SpireUI.toast.show({
  message: 'Mensagem',
  type: 'success',
  duration: 3000,
  icon: '✓'
});
```

## Opções

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `duration` | number | `3000` | Duração em milissegundos |
| `position` | string | `'top-right'` | Posição do toast |
| `closable` | boolean | `true` | Mostrar botão de fechar |
| `icon` | string | - | Ícone customizado |

## Exemplos de Uso

### Após salvar dados

```javascript
async function saveUser(data) {
  try {
    await SpireUI.http.post('/api/users', data);
    SpireUI.toast.success('Usuário salvo com sucesso!');
  } catch (error) {
    SpireUI.toast.error('Erro ao salvar usuário');
  }
}
```

### Com ações

```javascript
// Mostrar toast com ação de desfazer
SpireUI.toast.info('Item excluído', {
  duration: 5000,
  action: {
    label: 'Desfazer',
    onClick: () => undoDelete()
  }
});
```

### Progresso de upload

```javascript
// Toast persistente durante upload
const toastId = SpireUI.toast.info('Enviando arquivo...', {
  duration: 0, // Não fecha automaticamente
  progress: true
});

// Atualizar progresso
SpireUI.toast.update(toastId, { progress: 50 });

// Finalizar
SpireUI.toast.update(toastId, {
  type: 'success',
  message: 'Upload concluído!',
  duration: 3000
});
```

## Estilo

Os toasts são criados com classes Tailwind:

```html
<!-- Toast de sucesso -->
<div class="flex items-center gap-3 px-4 py-3 bg-green-50 dark:bg-green-900/30 
            text-green-800 dark:text-green-400 rounded-lg shadow-lg">
  <svg class="w-5 h-5"><!-- check icon --></svg>
  <span>Mensagem</span>
  <button class="ml-auto">×</button>
</div>
```

## Cores por Tipo

| Tipo | Cor de Fundo | Cor do Texto |
|------|--------------|--------------|
| `success` | `bg-green-50` | `text-green-800` |
| `error` | `bg-red-50` | `text-red-800` |
| `warning` | `bg-yellow-50` | `text-yellow-800` |
| `info` | `bg-blue-50` | `text-blue-800` |

## Animações

Os toasts entram com animação de slide e fade:

```css
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```
