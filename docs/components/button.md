# Button

Botões com estados de loading, sucesso e erro.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<button data-v="button" 
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  Salvar
</button>
```

## Estados

### Loading

```javascript
const btn = SpireUI.get(document.querySelector('[data-v="button"]'));

// Ativar loading
btn.loading(true);  // Texto muda para "Carregando..."

// Desativar loading
btn.loading(false); // Restaura texto original
```

### Sucesso

```javascript
// Mostra mensagem de sucesso por 2 segundos
btn.success('Salvo!', 2000);

// Com mensagem customizada
btn.success('Enviado com sucesso!', 3000);
```

### Erro

```javascript
// Mostra mensagem de erro por 2 segundos
btn.error('Erro!', 2000);

// Com mensagem customizada
btn.error('Falha ao salvar', 3000);
```

## API JavaScript

```javascript
// Obter instância
const btn = SpireUI.get(document.querySelector('[data-v="button"]'));

// Métodos
btn.loading(true);              // Ativar loading
btn.loading(false);             // Desativar loading
btn.success('Mensagem', 2000);  // Estado de sucesso
btn.error('Mensagem', 2000);    // Estado de erro
btn.reset();                    // Resetar para estado original
btn.destroy();                  // Limpar
```

### Encadeamento

```javascript
btn.loading(true); // retorna this
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `button:loading` | Estado de loading mudou | `{ loading: boolean }` |
| `button:success` | Sucesso mostrado | `{ message: string }` |
| `button:error` | Erro mostrado | `{ message: string }` |
| `button:reset` | Botão resetado | `{}` |

```javascript
document.querySelector('[data-v="button"]').addEventListener('button:loading', (e) => {
  console.log('Loading:', e.detail.loading);
});
```

## Comportamento

Quando `loading(true)` é chamado:
- `disabled` é definido como `true`
- `aria-disabled="true"` é adicionado
- `aria-busy="true"` é adicionado
- Texto muda para "Carregando..."

## Exemplo com Async

```javascript
const saveBtn = SpireUI.get(document.getElementById('save-btn'));

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  saveBtn.loading(true);
  
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      body: new FormData(e.target)
    });
    
    if (response.ok) {
      saveBtn.success('Salvo!');
    } else {
      saveBtn.error('Erro ao salvar');
    }
  } catch (error) {
    saveBtn.error('Erro de conexão');
  }
});
```

## Variantes de Estilo

```html
<!-- Primary -->
<button data-v="button" class="px-4 py-2 bg-primary-600 text-white rounded-lg">
  Primary
</button>

<!-- Secondary -->
<button data-v="button" class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg">
  Secondary
</button>

<!-- Outline -->
<button data-v="button" class="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg">
  Outline
</button>

<!-- Ghost -->
<button data-v="button" class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg">
  Ghost
</button>

<!-- Danger -->
<button data-v="button" class="px-4 py-2 bg-red-600 text-white rounded-lg">
  Danger
</button>
```

## Tamanhos

```html
<!-- Small -->
<button data-v="button" class="px-3 py-1.5 text-sm">Small</button>

<!-- Medium (default) -->
<button data-v="button" class="px-4 py-2">Medium</button>

<!-- Large -->
<button data-v="button" class="px-6 py-3 text-lg">Large</button>
```

## Com Ícones

```html
<!-- Ícone à esquerda -->
<button data-v="button" class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg">
  <svg class="w-4 h-4"><!-- icon --></svg>
  Salvar
</button>

<!-- Ícone à direita -->
<button data-v="button" class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg">
  Próximo
  <svg class="w-4 h-4"><!-- arrow --></svg>
</button>

<!-- Apenas ícone -->
<button data-v="button" class="p-2 bg-primary-600 text-white rounded-lg">
  <svg class="w-5 h-5"><!-- icon --></svg>
</button>
```

## Exemplo Completo

```html
<form id="contact-form" class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-1">Nome</label>
    <input type="text" name="name" required 
           class="w-full px-3 py-2 border rounded-lg">
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input type="email" name="email" required 
           class="w-full px-3 py-2 border rounded-lg">
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-1">Mensagem</label>
    <textarea name="message" rows="4" required 
              class="w-full px-3 py-2 border rounded-lg"></textarea>
  </div>
  
  <button data-v="button" id="submit-btn" type="submit"
          class="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
    Enviar Mensagem
  </button>
</form>

<script>
const form = document.getElementById('contact-form');
const submitBtn = SpireUI.get(document.getElementById('submit-btn'));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  submitBtn.loading(true);
  
  try {
    const response = await SpireUI.http.post('/api/contact', new FormData(form));
    
    if (response.ok) {
      submitBtn.success('Mensagem enviada!');
      form.reset();
    } else {
      submitBtn.error('Erro ao enviar');
    }
  } catch (error) {
    submitBtn.error('Erro de conexão');
  }
});

// Log de eventos
document.getElementById('submit-btn').addEventListener('button:success', () => {
  console.log('Formulário enviado com sucesso');
});
</script>
```

## Loading Customizado

Para spinner customizado, modifique o texto de loading:

```javascript
// Antes de chamar loading, você pode customizar o elemento
btn.loading(true);
btn.querySelector('span').innerHTML = `
  <svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
  Salvando...
`;
```

## Acessibilidade

O componente gerencia automaticamente:
- `disabled` quando em loading
- `aria-disabled` para screen readers
- `aria-busy` durante operações
