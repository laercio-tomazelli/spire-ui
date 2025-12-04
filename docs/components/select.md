# Select

Select customizado com busca, teclado e acessibilidade.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="select" class="relative">
  <input type="hidden" name="country" value="">
  
  <!-- Trigger -->
  <button data-select-trigger type="button"
          class="w-full flex items-center justify-between px-4 py-2 border rounded-lg bg-white">
    <span data-select-value class="text-gray-500">Selecione...</span>
    <svg class="w-4 h-4 text-gray-400"><path d="M19 9l-7 7-7-7"/></svg>
  </button>
  
  <!-- Dropdown -->
  <div data-select-dropdown class="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
    <div data-select-options class="max-h-60 overflow-y-auto py-1">
      <div data-option="br" class="px-4 py-2 cursor-pointer hover:bg-gray-100">Brasil</div>
      <div data-option="us" class="px-4 py-2 cursor-pointer hover:bg-gray-100">Estados Unidos</div>
      <div data-option="pt" class="px-4 py-2 cursor-pointer hover:bg-gray-100">Portugal</div>
    </div>
  </div>
</div>
```

## Com Valor Inicial

```html
<div data-v="select">
  <input type="hidden" name="country" value="br">
  
  <button data-select-trigger class="...">
    <span data-select-value>Brasil</span>
    <svg>...</svg>
  </button>
  
  <div data-select-dropdown class="hidden ...">
    <div data-select-options>
      <div data-option="br" class="selected" aria-selected="true">Brasil</div>
      <div data-option="us">Estados Unidos</div>
    </div>
  </div>
</div>
```

## Opção Desabilitada

```html
<div data-option="disabled-option" disabled class="opacity-50 cursor-not-allowed">
  Opção Indisponível
</div>
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="select"` | Container | Identifica o componente |
| `data-select-trigger` | Button | Botão que abre o dropdown |
| `data-select-value` | Span | Texto exibido no trigger |
| `data-select-dropdown` | Div | Container do dropdown |
| `data-select-options` | Div | Lista de opções |
| `data-option` | Div | Opção individual (valor no atributo) |

## API JavaScript

```javascript
// Obter instância
const select = SpireUI.get(document.querySelector('[data-v="select"]'));

// Obter valor
const value = select.value();

// Definir valor
select.setValue('us');

// Abrir/Fechar
select.open();
select.close();

// Atualizar opções dinamicamente
select.options([
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'pt', label: 'Portugal', disabled: true }
]);

// Destruir
select.destroy();
```

### Encadeamento

```javascript
select.setValue('br').close();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `select:change` | Valor alterado | `{ value: string }` |
| `select:opened` | Dropdown aberto | `{}` |
| `select:closed` | Dropdown fechado | `{}` |

```javascript
document.querySelector('[data-v="select"]').addEventListener('select:change', (e) => {
  console.log('Novo valor:', e.detail.value);
});
```

## Com Ícones nas Opções

```html
<div data-select-options>
  <div data-option="br" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
    <img src="/flags/br.svg" class="w-5 h-5">
    <span>Brasil</span>
  </div>
  <div data-option="us" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
    <img src="/flags/us.svg" class="w-5 h-5">
    <span>Estados Unidos</span>
  </div>
</div>
```

## Com Grupos

```html
<div data-select-options>
  <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
    América do Sul
  </div>
  <div data-option="br" class="px-4 py-2 hover:bg-gray-100">Brasil</div>
  <div data-option="ar" class="px-4 py-2 hover:bg-gray-100">Argentina</div>
  
  <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50 mt-1">
    América do Norte
  </div>
  <div data-option="us" class="px-4 py-2 hover:bg-gray-100">Estados Unidos</div>
  <div data-option="ca" class="px-4 py-2 hover:bg-gray-100">Canadá</div>
</div>
```

## Exemplo Completo

```html
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    País
    <span class="text-red-500">*</span>
  </label>
  
  <div data-v="select" id="country-select" class="relative">
    <input type="hidden" name="country" value="">
    
    <!-- Trigger -->
    <button data-select-trigger type="button"
            class="w-full flex items-center justify-between px-4 py-2.5 
                   border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-left
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                   transition-colors">
      <span data-select-value class="text-gray-500 dark:text-gray-400">
        Selecione um país
      </span>
      <svg class="w-4 h-4 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    
    <!-- Dropdown -->
    <div data-select-dropdown 
         class="hidden absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 
                border dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
      
      <!-- Search (opcional) -->
      <div class="p-2 border-b dark:border-gray-700">
        <input type="text" placeholder="Buscar..." 
               class="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600">
      </div>
      
      <div data-select-options class="max-h-60 overflow-y-auto py-1">
        <div data-option="br" 
             class="flex items-center gap-3 px-4 py-2.5 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span class="text-xl">🇧🇷</span>
          <span>Brasil</span>
        </div>
        <div data-option="us" 
             class="flex items-center gap-3 px-4 py-2.5 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span class="text-xl">🇺🇸</span>
          <span>Estados Unidos</span>
        </div>
        <div data-option="pt" 
             class="flex items-center gap-3 px-4 py-2.5 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span class="text-xl">🇵🇹</span>
          <span>Portugal</span>
        </div>
        <div data-option="es" 
             class="flex items-center gap-3 px-4 py-2.5 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span class="text-xl">🇪🇸</span>
          <span>Espanha</span>
        </div>
        <div data-option="de" disabled
             class="flex items-center gap-3 px-4 py-2.5 
                    opacity-50 cursor-not-allowed">
          <span class="text-xl">🇩🇪</span>
          <span>Alemanha (indisponível)</span>
        </div>
      </div>
      
    </div>
  </div>
  
  <p class="error-text hidden text-sm text-red-500"></p>
</div>

<script>
const countrySelect = SpireUI.get(document.getElementById('country-select'));

document.getElementById('country-select').addEventListener('select:change', (e) => {
  console.log('País selecionado:', e.detail.value);
  
  // Carregar estados baseado no país
  loadStates(e.detail.value);
});

// Definir valor programaticamente
countrySelect.setValue('br');
</script>
```

## Opções Dinâmicas

```javascript
const select = SpireUI.get(document.getElementById('my-select'));

// Carregar opções via API
async function loadOptions() {
  const response = await fetch('/api/countries');
  const countries = await response.json();
  
  select.options(countries.map(c => ({
    value: c.code,
    label: c.name,
    disabled: !c.active
  })));
}
```

## Acessibilidade

O componente configura automaticamente:

- `role="combobox"` no trigger
- `aria-haspopup="listbox"`
- `aria-expanded` dinâmico
- `role="listbox"` na lista
- `role="option"` em cada opção
- `aria-selected` na opção selecionada

## Navegação por Teclado

- **Escape**: Fecha o dropdown
- **Click Outside**: Fecha o dropdown
