# DatePicker

Seletor de data com calendário visual.

## Uso Básico

```html
<div data-v="datepicker" data-placeholder="Selecione uma data"></div>
```

## Com Input Existente

```html
<input type="text" 
       data-v="datepicker"
       value="15/03/2024"
       placeholder="Selecione uma data"
       class="px-4 py-3 rounded-xl border">
```

## Com Blade Component

```blade
<x-ui.datepicker 
  name="birth_date" 
  label="Data de Nascimento"
  placeholder="DD/MM/AAAA"
/>

<x-ui.datepicker 
  name="event_date" 
  value="2024-03-15"
  format="yyyy-mm-dd"
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="datepicker"` | - | - | Identifica o componente |
| `data-value` | string | - | Valor inicial |
| `data-format` | string | `dd/mm/yyyy` | Formato da data |
| `data-placeholder` | string | `Selecione uma data` | Placeholder |
| `data-min` | string | - | Data mínima selecionável |
| `data-max` | string | - | Data máxima selecionável |

## Formatos Suportados

```html
<!-- Formato brasileiro (padrão) -->
<div data-v="datepicker" data-format="dd/mm/yyyy"></div>

<!-- Formato ISO -->
<div data-v="datepicker" data-format="yyyy-mm-dd"></div>
```

## Limites de Data

```html
<!-- Data mínima -->
<div data-v="datepicker" data-min="01/01/2024"></div>

<!-- Data máxima -->
<div data-v="datepicker" data-max="31/12/2024"></div>

<!-- Intervalo -->
<div data-v="datepicker" data-min="01/03/2024" data-max="31/03/2024"></div>
```

## API JavaScript

```javascript
const picker = SpireUI.get(document.querySelector('[data-v="datepicker"]'));

// Abrir calendário
picker.open();

// Fechar calendário
picker.close();

// Definir data
picker.setValue('15/03/2024');
picker.setDate(new Date(2024, 2, 15));

// Obter data
const dateString = picker.getValue();  // "15/03/2024"
const dateObject = picker.getDate();   // Date object

// Limpar
picker.clear();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Abre o calendário |
| `close()` | `this` | Fecha o calendário |
| `toggle()` | `this` | Alterna aberto/fechado |
| `setValue(str)` | `this` | Define a data (string) |
| `setDate(date)` | `this` | Define a data (Date object) |
| `getValue()` | `string` | Retorna a data formatada |
| `getDate()` | `Date\|null` | Retorna Date object |
| `clear()` | `this` | Limpa a seleção |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `datepicker:change` | `{ date, formatted }` | Disparado quando a data muda |
| `datepicker:open` | - | Disparado ao abrir |
| `datepicker:close` | - | Disparado ao fechar |

```javascript
element.addEventListener('datepicker:change', (e) => {
  console.log('Data selecionada:', e.detail.formatted);
  console.log('Date object:', e.detail.date);
});
```

## Calendário Visual

O calendário mostra:
- Navegação entre meses (← →)
- Dias da semana (D S T Q Q S S)
- Dia atual destacado
- Data selecionada destacada
- Dias fora do intervalo min/max desabilitados

```html
<div class="absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 w-72">
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <button data-prev-month>←</button>
    <span>Março 2024</span>
    <button data-next-month>→</button>
  </div>
  
  <!-- Dias da semana -->
  <div class="grid grid-cols-7 gap-1 mb-2">
    <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
  </div>
  
  <!-- Dias do mês -->
  <div class="grid grid-cols-7 gap-1">
    <button data-day="1" class="w-8 h-8 rounded-lg">1</button>
    <button data-day="2" class="w-8 h-8 rounded-lg">2</button>
    <!-- ... -->
  </div>
</div>
```

## Exemplos

### Formulário de Cadastro

```html
<form>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium mb-2">Data de Nascimento</label>
      <div data-v="datepicker" 
           data-max="{{ date('d/m/Y') }}"
           name="birth_date">
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">Validade CNH</label>
      <div data-v="datepicker" 
           data-min="{{ date('d/m/Y') }}"
           name="cnh_expiry">
      </div>
    </div>
  </div>
</form>
```

### Agendamento

```html
<div data-v="datepicker" 
     id="appointment-date"
     data-min="{{ date('d/m/Y', strtotime('+1 day')) }}"
     data-max="{{ date('d/m/Y', strtotime('+30 days')) }}">
</div>

<script>
document.getElementById('appointment-date').addEventListener('datepicker:change', (e) => {
  loadAvailableSlots(e.detail.formatted);
});
</script>
```

### Com Valor Inicial

```html
<!-- Via data attribute -->
<div data-v="datepicker" data-value="15/03/2024"></div>

<!-- Via JavaScript -->
<script>
const picker = SpireUI.get(document.querySelector('[data-v="datepicker"]'));
picker.setDate(new Date());
</script>
```

## Localização

O calendário é exibido em português:

- Meses: Janeiro, Fevereiro, Março, etc.
- Dias: D, S, T, Q, Q, S, S

## Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `←` `→` | Navegar entre dias |
| `↑` `↓` | Navegar entre semanas |
| `Enter` | Selecionar dia |
| `Escape` | Fechar calendário |

## Acessibilidade

- `aria-expanded` no input
- `role="dialog"` no calendário
- `role="grid"` na grade de dias
- Navegação completa por teclado
- Labels descritivos
