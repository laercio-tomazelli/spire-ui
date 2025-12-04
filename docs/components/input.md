# Input

Campos de entrada com validação e estados visuais.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700">Email</label>
  <input data-v="input" type="email" 
         class="w-full px-3 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
  <p class="error-text hidden text-sm text-red-500"></p>
</div>
```

## Com Erro

```html
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700">Email</label>
  <input data-v="input" type="email" 
         class="w-full px-3 py-2 border border-red-500 rounded-lg">
  <p class="error-text text-sm text-red-500">Email inválido</p>
</div>
```

## API JavaScript

```javascript
// Obter instância
const input = SpireUI.get(document.querySelector('[data-v="input"]'));

// Métodos
input.value('novo valor');   // Definir valor
input.error('Mensagem');     // Mostrar erro
input.error('');             // Limpar erro
input.focus();               // Focar no input
input.clear();               // Limpar valor e erro
input.disable(true);         // Desabilitar
input.disable(false);        // Habilitar
input.destroy();             // Limpar listeners
```

### Encadeamento

```javascript
input.clear().focus();
input.error('Campo obrigatório').focus();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `input:change` | Valor alterado via API | `{ value: string }` |
| `input:error` | Erro definido | `{ message: string }` |

```javascript
document.querySelector('[data-v="input"]').addEventListener('input:error', (e) => {
  console.log('Erro:', e.detail.message);
});
```

## Comportamento

- Quando o usuário digita em um input com erro, o erro é automaticamente limpo
- A classe `border-red-500` é adicionada/removida conforme o estado de erro
- O elemento `.error-text` é mostrado/ocultado automaticamente

## Estrutura HTML

```html
<div class="space-y-1">
  <!-- Label (opcional) -->
  <label class="block text-sm font-medium text-gray-700">
    Campo
    <span class="text-red-500">*</span>
  </label>
  
  <!-- Input -->
  <input data-v="input" type="text" 
         class="w-full px-3 py-2 border border-gray-300 rounded-lg">
  
  <!-- Mensagem de erro -->
  <p class="error-text hidden text-sm text-red-500"></p>
</div>
```

## Tipos de Input

```html
<!-- Text -->
<input data-v="input" type="text">

<!-- Email -->
<input data-v="input" type="email">

<!-- Password -->
<input data-v="input" type="password">

<!-- Number -->
<input data-v="input" type="number" min="0" max="100">

<!-- Tel -->
<input data-v="input" type="tel">

<!-- URL -->
<input data-v="input" type="url">
```

## Com Ícones

```html
<!-- Ícone à esquerda -->
<div class="relative">
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
    <!-- icon -->
  </svg>
  <input data-v="input" type="email" 
         class="w-full pl-10 pr-3 py-2 border rounded-lg">
</div>

<!-- Ícone à direita -->
<div class="relative">
  <input data-v="input" type="text" 
         class="w-full pl-3 pr-10 py-2 border rounded-lg">
  <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
    <!-- icon -->
  </svg>
</div>
```

## Com Prefixo/Sufixo

```html
<!-- Prefixo -->
<div class="flex">
  <span class="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
    https://
  </span>
  <input data-v="input" type="text" 
         class="flex-1 px-3 py-2 border rounded-r-lg">
</div>

<!-- Sufixo -->
<div class="flex">
  <input data-v="input" type="number" 
         class="flex-1 px-3 py-2 border rounded-l-lg">
  <span class="inline-flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-lg">
    kg
  </span>
</div>
```

## Validação com FormValidator

```html
<form data-v="form-validator">
  <div class="space-y-1">
    <input data-v="input" name="email" type="email" 
           data-rules="required|email"
           data-messages='{"required": "Email é obrigatório", "email": "Email inválido"}'
           class="w-full px-3 py-2 border rounded-lg">
    <p class="error-text hidden text-sm text-red-500"></p>
  </div>
</form>
```

## Exemplo Completo

```html
<form id="profile-form" class="space-y-4">
  
  <!-- Nome -->
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Nome completo
      <span class="text-red-500">*</span>
    </label>
    <input data-v="input" id="name-input" type="text" name="name" required
           placeholder="Seu nome"
           class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-colors">
    <p class="error-text hidden text-sm text-red-500 mt-1"></p>
  </div>
  
  <!-- Email -->
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Email
      <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
      </svg>
      <input data-v="input" id="email-input" type="email" name="email" required
             placeholder="seu@email.com"
             class="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 
                    rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                    transition-colors">
    </div>
    <p class="error-text hidden text-sm text-red-500 mt-1"></p>
  </div>
  
  <!-- Telefone -->
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Telefone
    </label>
    <div class="flex">
      <span class="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 
                   border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg 
                   text-gray-500 dark:text-gray-400 text-sm">
        +55
      </span>
      <input data-v="input" id="phone-input" type="tel" name="phone"
             placeholder="(00) 00000-0000"
             class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 
                    rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                    transition-colors">
    </div>
    <p class="error-text hidden text-sm text-red-500 mt-1"></p>
  </div>
  
  <!-- Submit -->
  <button data-v="button" type="submit"
          class="w-full py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
    Salvar Perfil
  </button>
  
</form>

<script>
const form = document.getElementById('profile-form');
const nameInput = SpireUI.get(document.getElementById('name-input'));
const emailInput = SpireUI.get(document.getElementById('email-input'));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let hasErrors = false;
  
  // Validação manual simples
  if (!form.name.value.trim()) {
    nameInput.error('Nome é obrigatório');
    hasErrors = true;
  }
  
  if (!form.email.value.trim()) {
    emailInput.error('Email é obrigatório');
    hasErrors = true;
  } else if (!form.email.value.includes('@')) {
    emailInput.error('Email inválido');
    hasErrors = true;
  }
  
  if (hasErrors) {
    return;
  }
  
  // Submit...
  console.log('Formulário válido');
});
</script>
```

## Acessibilidade

O componente gerencia automaticamente:
- `aria-invalid` quando há erro
- `aria-disabled` quando desabilitado
- `role="alert"` e `aria-live="polite"` na mensagem de erro

## Dark Mode

```html
<input data-v="input" 
       class="border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500">
```
