# MultiSelect

Select com múltipla seleção, tags e busca.

## Uso Básico

```html
<div data-v="multiselect">
  <input type="hidden" name="categories">
  <div data-multiselect-trigger class="border rounded-lg p-3 cursor-pointer">
    <div data-multiselect-tags class="flex flex-wrap gap-1"></div>
    <span class="text-gray-400">Selecione...</span>
  </div>
  <div data-multiselect-dropdown class="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
    <input data-multiselect-search class="w-full p-3 border-b" placeholder="Buscar...">
    <div data-multiselect-options class="max-h-48 overflow-y-auto">
      <div data-option="1">Opção 1</div>
      <div data-option="2">Opção 2</div>
      <div data-option="3">Opção 3</div>
    </div>
  </div>
</div>
```

## Com Blade Component

```blade
<x-ui.multiselect 
  name="tags" 
  label="Tags"
  :options="[
    ['value' => 'php', 'label' => 'PHP'],
    ['value' => 'js', 'label' => 'JavaScript'],
    ['value' => 'python', 'label' => 'Python'],
  ]"
  :selected="['php', 'js']"
/>

<x-ui.multiselect 
  name="categories"
  label="Categorias"
  :options="$categories"
  max-items="5"
  searchable
/>
```

## Data Attributes

### Container

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="multiselect"` | - | - | Identifica o componente |
| `data-searchable` | boolean | `true` | Habilitar busca |
| `data-max-items` | number | `0` (ilimitado) | Máximo de itens selecionáveis |
| `data-placeholder` | string | `Selecione...` | Placeholder |

### Elementos Internos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-multiselect-trigger` | Div | Área clicável para abrir |
| `data-multiselect-dropdown` | Div | Container do dropdown |
| `data-multiselect-options` | Div | Lista de opções |
| `data-multiselect-tags` | Div | Container das tags selecionadas |
| `data-multiselect-search` | Input | Campo de busca |
| `data-option` | Div | Cada opção (valor no atributo) |
| `data-select-all` | Button | Botão selecionar todos |
| `data-clear-all` | Button | Botão limpar seleção |

## API JavaScript

```javascript
const multi = SpireUI.get(document.querySelector('[data-v="multiselect"]'));

// Abrir/Fechar
multi.open();
multi.close();

// Selecionar
multi.select('php');
multi.select('js');

// Desselecionar
multi.deselect('php');

// Toggle
multi.toggle('python');

// Selecionar todos
multi.selectAll();

// Limpar seleção
multi.clear();

// Obter valores selecionados
const values = multi.getValue();
// ['php', 'js']

// Definir valores
multi.setValue(['php', 'python', 'rust']);

// Verificar se está selecionado
if (multi.isSelected('php')) {
  console.log('PHP selecionado');
}
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Abre o dropdown |
| `close()` | `this` | Fecha o dropdown |
| `select(value)` | `this` | Seleciona uma opção |
| `deselect(value)` | `this` | Remove uma seleção |
| `toggle(value)` | `this` | Alterna seleção |
| `selectAll()` | `this` | Seleciona todas as opções |
| `clear()` | `this` | Limpa todas as seleções |
| `getValue()` | `string[]` | Retorna valores selecionados |
| `setValue(values)` | `this` | Define valores selecionados |
| `isSelected(value)` | `boolean` | Verifica se está selecionado |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `multiselect:change` | `{ values, added?, removed? }` | Seleção alterada |
| `multiselect:open` | - | Dropdown aberto |
| `multiselect:close` | - | Dropdown fechado |

```javascript
element.addEventListener('multiselect:change', (e) => {
  console.log('Selecionados:', e.detail.values);
  console.log('Adicionado:', e.detail.added);
  console.log('Removido:', e.detail.removed);
});
```

## Tags

Os itens selecionados são exibidos como tags:

```html
<div data-multiselect-tags class="flex flex-wrap gap-1">
  <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
    PHP
    <button data-remove-tag="php" class="hover:text-blue-600">×</button>
  </span>
  <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
    JavaScript
    <button data-remove-tag="js" class="hover:text-blue-600">×</button>
  </span>
</div>
```

## Exemplos

### Seleção de Categorias

```html
<div data-v="multiselect" data-max-items="3">
  <input type="hidden" name="categories">
  <div data-multiselect-trigger class="border rounded-lg p-3 min-h-[48px]">
    <div data-multiselect-tags class="flex flex-wrap gap-1"></div>
    <span class="text-gray-400 placeholder-text">Selecione até 3 categorias</span>
  </div>
  <div data-multiselect-dropdown class="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
    <div data-multiselect-options class="p-2 max-h-48 overflow-y-auto">
      @foreach($categories as $cat)
        <div data-option="{{ $cat->id }}" class="p-2 hover:bg-gray-100 rounded cursor-pointer">
          {{ $cat->name }}
        </div>
      @endforeach
    </div>
  </div>
</div>
```

### Com Busca e Ações

```html
<div data-v="multiselect" data-searchable="true">
  <input type="hidden" name="users">
  <div data-multiselect-trigger class="border rounded-lg p-3">
    <div data-multiselect-tags class="flex flex-wrap gap-1"></div>
  </div>
  <div data-multiselect-dropdown class="hidden">
    <input data-multiselect-search class="w-full p-3 border-b" placeholder="Buscar usuários...">
    
    <div class="flex justify-between p-2 border-b bg-gray-50">
      <button data-select-all class="text-sm text-blue-600">Selecionar todos</button>
      <button data-clear-all class="text-sm text-red-600">Limpar</button>
    </div>
    
    <div data-multiselect-options class="max-h-48 overflow-y-auto p-2">
      @foreach($users as $user)
        <div data-option="{{ $user->id }}" class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <img src="{{ $user->avatar }}" class="w-6 h-6 rounded-full">
          <span>{{ $user->name }}</span>
        </div>
      @endforeach
    </div>
  </div>
</div>
```

### Formulário de Filtros

```html
<form>
  <div class="grid grid-cols-3 gap-4">
    <div data-v="multiselect" data-placeholder="Marcas">
      <input type="hidden" name="brands[]">
      <!-- ... -->
    </div>
    
    <div data-v="multiselect" data-placeholder="Cores">
      <input type="hidden" name="colors[]">
      <!-- ... -->
    </div>
    
    <div data-v="multiselect" data-placeholder="Tamanhos" data-max-items="5">
      <input type="hidden" name="sizes[]">
      <!-- ... -->
    </div>
  </div>
</form>
```

## Opções Desabilitadas

```html
<div data-option="premium" disabled class="opacity-50 cursor-not-allowed">
  Premium (indisponível)
</div>
```

## Valor do Input Hidden

O valor é salvo como JSON no input hidden:

```html
<input type="hidden" name="categories" value='["php","js","python"]'>
```

No backend:
```php
$categories = json_decode($request->categories);
// ou
$categories = $request->input('categories'); // Se configurado
```

## Acessibilidade

- `role="combobox"` no trigger
- `role="listbox"` nas opções
- `role="option"` em cada opção
- `aria-multiselectable="true"`
- `aria-selected` em opções selecionadas
- Navegação por teclado (setas, Enter, Escape)
