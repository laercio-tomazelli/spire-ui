# DateRangePicker

Seletor de intervalo de datas com dois calendários e presets.

## Uso Básico

```html
<div data-v="date-range-picker"></div>
```

## Com Valores Iniciais

```html
<div data-v="date-range-picker"
     data-start-value="01/03/2024"
     data-end-value="31/03/2024">
</div>
```

## Com Blade Component

```blade
<x-ui.date-range-picker 
  name="period"
  startValue="{{ $startDate }}"
  endValue="{{ $endDate }}"
/>

<x-ui.date-range-picker 
  name="report_period"
  min="{{ date('d/m/Y', strtotime('-1 year')) }}"
  max="{{ date('d/m/Y') }}"
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="date-range-picker"` | - | - | Identifica o componente |
| `data-start-value` | string | - | Data inicial |
| `data-end-value` | string | - | Data final |
| `data-format` | string | `dd/mm/yyyy` | Formato das datas |
| `data-min` | string | - | Data mínima selecionável |
| `data-max` | string | - | Data máxima selecionável |
| `data-start-placeholder` | string | `Data início` | Placeholder do início |
| `data-end-placeholder` | string | `Data fim` | Placeholder do fim |

## Presets Incluídos

O componente inclui presets de intervalos comuns:

| Preset | Descrição |
|--------|-----------|
| Hoje | Dia atual |
| Últimos 7 dias | Últimos 7 dias incluindo hoje |
| Últimos 30 dias | Últimos 30 dias incluindo hoje |
| Este mês | Do dia 1 até o último dia do mês atual |
| Mês passado | Mês anterior completo |

## API JavaScript

```javascript
const picker = SpireUI.get(document.querySelector('[data-v="date-range-picker"]'));

// Abrir calendário
picker.open();

// Fechar calendário
picker.close();

// Definir intervalo
picker.setRange('01/03/2024', '31/03/2024');
picker.setRange(new Date(2024, 2, 1), new Date(2024, 2, 31));

// Obter intervalo
const range = picker.getRange();
// { start: '01/03/2024', end: '31/03/2024', startDate: Date, endDate: Date }

// Limpar
picker.clear();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Abre o calendário |
| `close()` | `this` | Fecha o calendário |
| `toggle()` | `this` | Alterna aberto/fechado |
| `setRange(start, end)` | `this` | Define o intervalo |
| `getRange()` | `object` | Retorna o intervalo selecionado |
| `clear()` | `this` | Limpa a seleção |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `daterange:change` | `{ start, end, startDate, endDate }` | Disparado quando o intervalo muda |
| `daterange:open` | - | Disparado ao abrir |
| `daterange:close` | - | Disparado ao fechar |

```javascript
element.addEventListener('daterange:change', (e) => {
  console.log('Período:', e.detail.start, 'até', e.detail.end);
  loadReportData(e.detail.startDate, e.detail.endDate);
});
```

## Interface Visual

O componente exibe:
- **Dois inputs**: Data início e data fim com seta entre eles
- **Painel expandido**: Presets à esquerda, dois calendários lado a lado

```html
<!-- Inputs -->
<div class="flex items-center gap-2">
  <input placeholder="Data início" readonly>
  <span>→</span>
  <input placeholder="Data fim" readonly>
</div>

<!-- Painel expandido -->
<div class="absolute z-50 mt-1 bg-white rounded-xl shadow-2xl p-4" style="width: 600px">
  <div class="flex gap-4">
    
    <!-- Presets -->
    <div class="w-32 border-r pr-4 space-y-1">
      <button>Hoje</button>
      <button>Últimos 7 dias</button>
      <button>Últimos 30 dias</button>
      <button>Este mês</button>
      <button>Mês passado</button>
    </div>
    
    <!-- Calendário esquerdo (mês atual) -->
    <div class="flex-1">
      <div class="flex justify-between mb-4">
        <button>←</button>
        <span>Março 2024</span>
      </div>
      <div class="grid grid-cols-7 gap-1">...</div>
    </div>
    
    <!-- Calendário direito (próximo mês) -->
    <div class="flex-1">
      <div class="flex justify-between mb-4">
        <span>Abril 2024</span>
        <button>→</button>
      </div>
      <div class="grid grid-cols-7 gap-1">...</div>
    </div>
    
  </div>
</div>
```

## Exemplos

### Relatório de Vendas

```html
<div class="flex items-center gap-4">
  <label class="font-medium">Período:</label>
  <div data-v="date-range-picker" 
       id="sales-period"
       data-start-value="{{ $defaultStart }}"
       data-end-value="{{ $defaultEnd }}">
  </div>
  <button type="button" onclick="generateReport()" class="btn btn-primary">
    Gerar Relatório
  </button>
</div>

<script>
function generateReport() {
  const picker = SpireUI.get(document.getElementById('sales-period'));
  const range = picker.getRange();
  
  fetch(`/api/reports/sales?start=${range.start}&end=${range.end}`)
    .then(r => r.json())
    .then(data => renderReport(data));
}
</script>
```

### Filtro de Dashboard

```html
<div class="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
  <span class="text-sm text-gray-600">Exibindo dados de:</span>
  <div data-v="date-range-picker" id="dashboard-filter"></div>
</div>

<script>
document.getElementById('dashboard-filter').addEventListener('daterange:change', (e) => {
  // Atualizar todos os gráficos do dashboard
  updateDashboard(e.detail.startDate, e.detail.endDate);
});
</script>
```

### Reserva de Hotel

```html
<div class="space-y-4">
  <h3 class="font-semibold">Datas da Estadia</h3>
  <div data-v="date-range-picker"
       data-start-placeholder="Check-in"
       data-end-placeholder="Check-out"
       data-min="{{ date('d/m/Y') }}"
       id="booking-dates">
  </div>
  <p class="text-sm text-gray-600" id="nights-count"></p>
</div>

<script>
document.getElementById('booking-dates').addEventListener('daterange:change', (e) => {
  const start = e.detail.startDate;
  const end = e.detail.endDate;
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  document.getElementById('nights-count').textContent = `${nights} noite(s)`;
});
</script>
```

## Seleção de Intervalo

1. Clique no input de início para selecionar a data inicial
2. Clique no input de fim para selecionar a data final
3. Ou use os presets para seleção rápida

Os dias entre as datas selecionadas são destacados visualmente.

## Acessibilidade

- Navegação por teclado nos calendários
- `aria-label` descritivos
- `role="dialog"` no painel
- Suporte a screen readers
