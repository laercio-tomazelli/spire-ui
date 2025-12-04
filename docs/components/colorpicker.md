# ColorPicker

Seletor de cores com paleta de cores predefinidas e input nativo.

## Uso Básico

```html
<div data-v="colorpicker" data-value="#3B82F6">
  <!-- Input é criado automaticamente -->
</div>
```

## Com Input Existente

```html
<div class="relative">
  <input type="text" 
    data-v="colorpicker"
    value="#3B82F6"
    class="px-4 py-3 pl-12 rounded-xl border"
    placeholder="#000000">
</div>
```

## Com Blade Component

```blade
<x-ui.colorpicker 
  name="primary_color" 
  value="#3B82F6" 
  label="Cor primária"
/>

<x-ui.colorpicker 
  name="accent_color" 
  :presets="['#EF4444', '#22C55E', '#3B82F6']"
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="colorpicker"` | - | - | Identifica o componente |
| `data-value` | string | `#3B82F6` | Cor inicial |
| `data-presets` | string | - | Cores predefinidas (JSON ou separadas por vírgula) |

## Presets Personalizados

```html
<!-- Como JSON -->
<div data-v="colorpicker" 
     data-presets='["#EF4444", "#22C55E", "#3B82F6", "#8B5CF6"]'>
</div>

<!-- Separados por vírgula -->
<div data-v="colorpicker" 
     data-presets="#EF4444,#22C55E,#3B82F6,#8B5CF6">
</div>
```

### Cores Padrão

Se nenhum preset for definido, usa estas cores:

```javascript
[
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
  '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#000000',
  '#6B7280', '#FFFFFF'
]
```

## API JavaScript

```javascript
const picker = SpireUI.get(document.querySelector('[data-v="colorpicker"]'));

// Abrir picker
picker.open();

// Fechar picker
picker.close();

// Definir cor
picker.setValue('#EF4444');

// Obter cor atual
const color = picker.getValue();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Abre o seletor de cores |
| `close()` | `this` | Fecha o seletor |
| `toggle()` | `this` | Alterna aberto/fechado |
| `setValue(color)` | `this` | Define a cor selecionada |
| `getValue()` | `string` | Retorna a cor atual |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `colorpicker:change` | `{ color }` | Disparado quando a cor muda |
| `colorpicker:open` | - | Disparado ao abrir |
| `colorpicker:close` | - | Disparado ao fechar |

```javascript
element.addEventListener('colorpicker:change', (e) => {
  console.log('Nova cor:', e.detail.color);
  document.body.style.backgroundColor = e.detail.color;
});
```

## Interface do Picker

O picker inclui:

1. **Grid de cores predefinidas**: Clique para selecionar
2. **Input nativo color**: Para seleção mais precisa
3. **Input de texto**: Para digitar código hex

```html
<div class="absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 w-64">
  <!-- Grid de cores -->
  <div class="grid grid-cols-5 gap-2 mb-4">
    <button style="background-color: #EF4444" class="w-8 h-8 rounded-lg"></button>
    <!-- ... mais cores -->
  </div>
  
  <!-- Inputs -->
  <div class="flex gap-2">
    <input type="color" class="w-10 h-10 rounded-lg">
    <input type="text" placeholder="#000000" class="flex-1 px-3 py-2 rounded-lg">
  </div>
</div>
```

## Exemplos

### Tema do Site

```html
<form method="POST">
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium mb-2">Cor Primária</label>
      <div data-v="colorpicker" data-value="{{ $theme->primary }}"></div>
      <input type="hidden" name="primary" id="primary-color">
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">Cor Secundária</label>
      <div data-v="colorpicker" data-value="{{ $theme->secondary }}"></div>
      <input type="hidden" name="secondary" id="secondary-color">
    </div>
  </div>
</form>

<script>
document.querySelectorAll('[data-v="colorpicker"]').forEach(el => {
  el.addEventListener('colorpicker:change', (e) => {
    const hidden = el.parentElement.querySelector('input[type="hidden"]');
    hidden.value = e.detail.color;
  });
});
</script>
```

### Preview em Tempo Real

```html
<div class="flex gap-4">
  <div data-v="colorpicker" data-value="#3B82F6" id="text-color"></div>
  <div class="flex-1 p-4 border rounded" id="preview">
    <p>Texto de exemplo</p>
  </div>
</div>

<script>
document.getElementById('text-color').addEventListener('colorpicker:change', (e) => {
  document.querySelector('#preview p').style.color = e.detail.color;
});
</script>
```

### Editor de Avatar

```html
<div class="flex items-center gap-4">
  <div class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" 
       id="avatar" style="background-color: #3B82F6">
    JS
  </div>
  
  <div data-v="colorpicker" data-value="#3B82F6" 
       data-presets='["#EF4444","#F97316","#22C55E","#3B82F6","#8B5CF6"]'>
  </div>
</div>

<script>
document.querySelector('[data-v="colorpicker"]').addEventListener('colorpicker:change', (e) => {
  document.getElementById('avatar').style.backgroundColor = e.detail.color;
});
</script>
```

## Validação

O input aceita apenas formatos hex válidos:

```javascript
// Formatos aceitos
'#3B82F6'   // 6 dígitos
'#3b82f6'   // minúsculas também

// Formatos NÃO aceitos
'rgb(59, 130, 246)'  // RGB
'blue'               // Nome de cor
'#3B8'               // 3 dígitos (ainda não suportado)
```

## Acessibilidade

- Navegação por teclado no grid de cores
- Foco visível nas cores
- Label associado ao input
- Fecha com Escape
