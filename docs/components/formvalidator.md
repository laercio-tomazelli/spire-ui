# FormValidator

Validação de formulários com regras declarativas e feedback em tempo real.

## Uso Básico

```html
<form data-v="form-validator">
  <div class="mb-4">
    <label>Nome</label>
    <input type="text" name="name" data-validate="required|min:3">
  </div>
  
  <div class="mb-4">
    <label>Email</label>
    <input type="email" name="email" data-validate="required|email">
  </div>
  
  <button type="submit">Enviar</button>
</form>
```

## Com Blade Component

```blade
<x-ui.form action="/users" method="POST" validate>
  <x-ui.input name="name" label="Nome" validate="required|min:3" />
  <x-ui.input name="email" type="email" label="Email" validate="required|email" />
  <x-ui.input name="phone" label="Telefone" validate="phone" />
  <x-ui.button type="submit">Enviar</x-ui.button>
</x-ui.form>
```

## Data Attributes

### Formulário

| Atributo | Descrição |
|----------|-----------|
| `data-v="form-validator"` | Identifica o formulário para validação |

### Campos

| Atributo | Descrição |
|----------|-----------|
| `data-validate` | Regras de validação separadas por `\|` |

## Regras de Validação

| Regra | Descrição | Exemplo |
|-------|-----------|---------|
| `required` | Campo obrigatório | `required` |
| `email` | Email válido | `email` |
| `min:n` | Mínimo n caracteres | `min:3` |
| `max:n` | Máximo n caracteres | `max:100` |
| `minValue:n` | Valor numérico mínimo | `minValue:0` |
| `maxValue:n` | Valor numérico máximo | `maxValue:100` |
| `pattern:regex` | Expressão regular | `pattern:^[A-Z]` |
| `url` | URL válida | `url` |
| `numeric` | Apenas números | `numeric` |
| `alpha` | Apenas letras | `alpha` |
| `alphanumeric` | Letras e números | `alphanumeric` |
| `phone` | Telefone válido | `phone` |
| `cpf` | CPF válido | `cpf` |
| `cnpj` | CNPJ válido | `cnpj` |
| `date` | Data válida | `date` |
| `confirmed:field` | Igual a outro campo | `confirmed:password` |

## Combinando Regras

```html
<!-- Múltiplas regras separadas por | -->
<input data-validate="required|email">

<!-- Com parâmetros -->
<input data-validate="required|min:8|max:20">

<!-- Confirmação de senha -->
<input type="password" name="password" data-validate="required|min:8">
<input type="password" name="password_confirmation" data-validate="required|confirmed:password">
```

## API JavaScript

```javascript
const form = SpireUI.get(document.querySelector('[data-v="form-validator"]'));

// Validar manualmente
const isValid = form.validate();

// Obter erros
const errors = form.getErrors();
// { email: ['Email inválido'], password: ['Mínimo 8 caracteres'] }

// Limpar erros
form.clearErrors();

// Adicionar regra customizada
form.addValidator('custom', (value, param) => {
  return value.startsWith('A') || 'Deve começar com A';
});

// Definir erros do servidor
form.setErrors({
  email: ['Este email já está em uso']
});
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `validate()` | `boolean` | Valida todos os campos |
| `validateField(el)` | `boolean` | Valida um campo específico |
| `getErrors()` | `object` | Retorna todos os erros |
| `clearErrors()` | `this` | Limpa todos os erros |
| `setErrors(errors)` | `this` | Define erros manualmente |
| `addValidator(name, fn)` | `this` | Adiciona validador customizado |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `form:valid` | `{}` | Formulário válido no submit |
| `form:invalid` | `{ errors }` | Formulário inválido no submit |
| `field:valid` | `{ field }` | Campo validado com sucesso |
| `field:invalid` | `{ field, errors }` | Campo com erros |

```javascript
form.addEventListener('form:invalid', (e) => {
  console.log('Erros:', e.detail.errors);
  SpireUI.toast.error('Corrija os erros no formulário');
});

form.addEventListener('form:valid', () => {
  SpireUI.toast.success('Formulário válido!');
});
```

## Validação em Tempo Real

Os campos são validados:
1. **No blur**: Quando o campo perde o foco
2. **No input**: Se já houver erro, revalida enquanto digita
3. **No submit**: Todos os campos são validados

## Feedback Visual

```html
<!-- Campo com erro -->
<input class="border-red-500" aria-invalid="true">
<p class="field-error text-red-500 text-sm mt-1">Campo obrigatório</p>

<!-- Campo válido -->
<input class="border-gray-300" aria-invalid="false">
```

## Exemplos

### Formulário de Cadastro

```html
<form data-v="form-validator">
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label>Nome</label>
      <input name="first_name" data-validate="required|min:2|alpha">
    </div>
    <div>
      <label>Sobrenome</label>
      <input name="last_name" data-validate="required|min:2|alpha">
    </div>
  </div>
  
  <div>
    <label>Email</label>
    <input name="email" type="email" data-validate="required|email">
  </div>
  
  <div>
    <label>CPF</label>
    <input name="cpf" data-validate="required|cpf">
  </div>
  
  <div>
    <label>Telefone</label>
    <input name="phone" data-validate="phone">
  </div>
  
  <div>
    <label>Senha</label>
    <input type="password" name="password" data-validate="required|min:8">
  </div>
  
  <div>
    <label>Confirmar Senha</label>
    <input type="password" name="password_confirmation" data-validate="required|confirmed:password">
  </div>
  
  <button type="submit">Cadastrar</button>
</form>
```

### Validação com AJAX

```javascript
const form = document.querySelector('[data-v="form-validator"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const validator = SpireUI.get(form);
  if (!validator.validate()) return;
  
  try {
    const formData = new FormData(form);
    await SpireUI.http.post('/api/users', Object.fromEntries(formData));
    SpireUI.toast.success('Cadastro realizado!');
    form.reset();
  } catch (error) {
    if (error.status === 422) {
      // Erros de validação do servidor
      validator.setErrors(error.data.errors);
    }
  }
});
```

### Validador Customizado

```javascript
const form = SpireUI.get(document.querySelector('form'));

// Validar idade mínima
form.addValidator('age', (value, minAge) => {
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= parseInt(minAge) || `Idade mínima: ${minAge} anos`;
});
```

```html
<input name="birth_date" data-validate="required|date|age:18">
```

## Mensagens de Erro

Mensagens padrão em português:

| Regra | Mensagem |
|-------|----------|
| `required` | Campo obrigatório |
| `email` | Email inválido |
| `min:n` | Mínimo {n} caracteres |
| `max:n` | Máximo {n} caracteres |
| `url` | URL inválida |
| `numeric` | Apenas números |
| `cpf` | CPF inválido |
| `cnpj` | CNPJ inválido |
| `confirmed` | Campos não conferem |

## Acessibilidade

- `aria-invalid` atualizado automaticamente
- Erros associados aos campos
- Foco no primeiro campo inválido após submit
- Screen readers anunciam erros
