# Stepper

Wizard em passos com navegação linear ou livre.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="stepper">
  
  <!-- Steps Header -->
  <div class="flex items-center mb-8">
    <div data-step="1" class="flex items-center">
      <span data-step-indicator class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">1</span>
      <span class="ml-2 font-medium">Dados</span>
    </div>
    <div class="flex-1 h-1 mx-4 bg-gray-200"></div>
    <div data-step="2" class="flex items-center">
      <span data-step-indicator class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">2</span>
      <span class="ml-2 text-gray-500">Pagamento</span>
    </div>
    <div class="flex-1 h-1 mx-4 bg-gray-200"></div>
    <div data-step="3" class="flex items-center">
      <span data-step-indicator class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">3</span>
      <span class="ml-2 text-gray-500">Confirmação</span>
    </div>
  </div>
  
  <!-- Panels -->
  <div data-step-panel="1" class="p-6 bg-white rounded-lg">
    <h2 class="text-xl font-bold mb-4">Passo 1: Seus Dados</h2>
    <!-- form fields -->
    <button data-step-next class="px-4 py-2 bg-primary-600 text-white rounded">Próximo</button>
  </div>
  
  <div data-step-panel="2" class="hidden p-6 bg-white rounded-lg">
    <h2 class="text-xl font-bold mb-4">Passo 2: Pagamento</h2>
    <!-- payment form -->
    <button data-step-prev class="px-4 py-2 bg-gray-200 rounded">Voltar</button>
    <button data-step-next class="px-4 py-2 bg-primary-600 text-white rounded">Próximo</button>
  </div>
  
  <div data-step-panel="3" class="hidden p-6 bg-white rounded-lg">
    <h2 class="text-xl font-bold mb-4">Passo 3: Confirmação</h2>
    <!-- confirmation -->
    <button data-step-prev class="px-4 py-2 bg-gray-200 rounded">Voltar</button>
    <button class="px-4 py-2 bg-green-600 text-white rounded">Finalizar</button>
  </div>
  
</div>
```

## Modo Linear vs Livre

```html
<!-- Linear (padrão): só avança após completar etapa anterior -->
<div data-v="stepper" data-linear="true">

<!-- Livre: pode clicar em qualquer etapa -->
<div data-v="stepper" data-linear="false">
```

## Atributos

| Atributo | Elemento | Descrição |
|----------|----------|-----------|
| `data-v="stepper"` | Container | Identifica o componente |
| `data-linear` | Container | `true` para modo linear |
| `data-initial-step` | Container | Etapa inicial (padrão: 1) |
| `data-step` | Div | Identificador da etapa (1, 2, 3...) |
| `data-step-indicator` | Span | Indicador numérico/ícone |
| `data-step-panel` | Div | Painel de conteúdo |
| `data-step-next` | Button | Avança para próxima etapa |
| `data-step-prev` | Button | Volta para etapa anterior |

## API JavaScript

```javascript
// Obter instância
const stepper = SpireUI.get(document.querySelector('[data-v="stepper"]'));

// Navegação
stepper.goto(2);      // Ir para etapa específica
stepper.next();       // Próxima etapa (marca atual como completa)
stepper.prev();       // Etapa anterior

// Estado
stepper.current();    // Retorna número da etapa atual
stepper.canNext();    // Pode avançar?
stepper.canPrev();    // Pode voltar?

// Completar etapa
stepper.complete(1);  // Marca etapa como completa
stepper.complete();   // Marca etapa atual como completa

// Reset
stepper.reset();      // Volta para etapa 1

// Destruir
stepper.destroy();
```

### Encadeamento

```javascript
stepper.complete().next();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `stepper:change` | Etapa mudou | `{ from: number, to: number, completed: number[] }` |
| `stepper:completed` | Etapa marcada como completa | `{ step: number, allCompleted: boolean }` |
| `stepper:reset` | Stepper resetado | `{}` |

```javascript
document.querySelector('[data-v="stepper"]').addEventListener('stepper:change', (e) => {
  console.log(`Mudou de ${e.detail.from} para ${e.detail.to}`);
  console.log('Etapas completas:', e.detail.completed);
});
```

## Classes Automáticas

| Classe | Descrição |
|--------|-----------|
| `active` | Etapa atual |
| `completed` | Etapa concluída (ícone de check) |

## Estilo Horizontal

```html
<div data-v="stepper" class="space-y-8">
  
  <!-- Steps -->
  <div class="flex items-center">
    
    <!-- Step 1 -->
    <div data-step="1" class="flex items-center cursor-pointer">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
        1
      </div>
      <div class="ml-3">
        <div class="font-medium">Conta</div>
        <div class="text-sm text-gray-500">Crie sua conta</div>
      </div>
    </div>
    
    <!-- Connector -->
    <div class="flex-1 h-1 mx-6 bg-gray-200">
      <div class="h-1 bg-primary-600 w-0 transition-all duration-300"></div>
    </div>
    
    <!-- Step 2 -->
    <div data-step="2" class="flex items-center cursor-pointer opacity-50">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
        2
      </div>
      <div class="ml-3">
        <div class="font-medium">Perfil</div>
        <div class="text-sm text-gray-500">Complete seu perfil</div>
      </div>
    </div>
    
    <!-- Connector -->
    <div class="flex-1 h-1 mx-6 bg-gray-200"></div>
    
    <!-- Step 3 -->
    <div data-step="3" class="flex items-center cursor-pointer opacity-50">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
        3
      </div>
      <div class="ml-3">
        <div class="font-medium">Confirmação</div>
        <div class="text-sm text-gray-500">Revise os dados</div>
      </div>
    </div>
    
  </div>
  
  <!-- Panels -->
  <div data-step-panel="1" class="bg-white p-6 rounded-lg shadow">
    <!-- content -->
  </div>
  
</div>
```

## Estilo Vertical

```html
<div data-v="stepper" class="flex gap-8">
  
  <!-- Steps sidebar -->
  <div class="flex flex-col">
    
    <div data-step="1" class="flex items-start gap-4">
      <div class="flex flex-col items-center">
        <div data-step-indicator class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">1</div>
        <div class="w-px h-12 bg-gray-200 mt-2"></div>
      </div>
      <div>
        <div class="font-medium">Passo 1</div>
        <div class="text-sm text-gray-500">Descrição</div>
      </div>
    </div>
    
    <div data-step="2" class="flex items-start gap-4">
      <div class="flex flex-col items-center">
        <div data-step-indicator class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">2</div>
        <div class="w-px h-12 bg-gray-200 mt-2"></div>
      </div>
      <div>
        <div class="font-medium">Passo 2</div>
        <div class="text-sm text-gray-500">Descrição</div>
      </div>
    </div>
    
    <div data-step="3" class="flex items-start gap-4">
      <div class="flex flex-col items-center">
        <div data-step-indicator class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">3</div>
      </div>
      <div>
        <div class="font-medium">Passo 3</div>
        <div class="text-sm text-gray-500">Descrição</div>
      </div>
    </div>
    
  </div>
  
  <!-- Content -->
  <div class="flex-1">
    <div data-step-panel="1">Conteúdo 1</div>
    <div data-step-panel="2" class="hidden">Conteúdo 2</div>
    <div data-step-panel="3" class="hidden">Conteúdo 3</div>
  </div>
  
</div>
```

## Exemplo Completo - Checkout

```html
<div data-v="stepper" id="checkout-stepper" data-linear="true" 
     class="max-w-2xl mx-auto">
  
  <!-- Header -->
  <div class="flex items-center justify-between mb-8 px-4">
    
    <div data-step="1" class="flex items-center gap-3 cursor-pointer">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold transition-colors">
        1
      </div>
      <span class="hidden sm:block font-medium">Entrega</span>
    </div>
    
    <div class="flex-1 h-1 mx-4 bg-gray-200 rounded">
      <div class="h-1 bg-primary-600 rounded w-0 transition-all duration-500" id="progress-1-2"></div>
    </div>
    
    <div data-step="2" class="flex items-center gap-3 cursor-pointer">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors">
        2
      </div>
      <span class="hidden sm:block text-gray-500">Pagamento</span>
    </div>
    
    <div class="flex-1 h-1 mx-4 bg-gray-200 rounded">
      <div class="h-1 bg-primary-600 rounded w-0 transition-all duration-500" id="progress-2-3"></div>
    </div>
    
    <div data-step="3" class="flex items-center gap-3 cursor-pointer">
      <div data-step-indicator 
           class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors">
        3
      </div>
      <span class="hidden sm:block text-gray-500">Revisão</span>
    </div>
    
  </div>
  
  <!-- Step 1: Entrega -->
  <div data-step-panel="1" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Endereço de Entrega</h2>
    
    <form class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nome</label>
          <input type="text" class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Sobrenome</label>
          <input type="text" class="w-full px-4 py-2 border rounded-lg">
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">CEP</label>
        <input type="text" class="w-full px-4 py-2 border rounded-lg">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Endereço</label>
        <input type="text" class="w-full px-4 py-2 border rounded-lg">
      </div>
    </form>
    
    <div class="flex justify-end mt-6">
      <button data-step-next 
              class="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
        Continuar para Pagamento
      </button>
    </div>
  </div>
  
  <!-- Step 2: Pagamento -->
  <div data-step-panel="2" class="hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Forma de Pagamento</h2>
    
    <div class="space-y-4">
      <label class="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="payment" value="card" checked>
        <span>Cartão de Crédito</span>
      </label>
      <label class="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="payment" value="pix">
        <span>PIX</span>
      </label>
      <label class="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="payment" value="boleto">
        <span>Boleto</span>
      </label>
    </div>
    
    <div class="flex justify-between mt-6">
      <button data-step-prev 
              class="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
        Voltar
      </button>
      <button data-step-next 
              class="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
        Revisar Pedido
      </button>
    </div>
  </div>
  
  <!-- Step 3: Revisão -->
  <div data-step-panel="3" class="hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Revisão do Pedido</h2>
    
    <div class="space-y-4 mb-6">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 class="font-semibold mb-2">Endereço</h3>
        <p class="text-gray-600 dark:text-gray-400">Rua Exemplo, 123 - São Paulo/SP</p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 class="font-semibold mb-2">Pagamento</h3>
        <p class="text-gray-600 dark:text-gray-400">Cartão de Crédito ****1234</p>
      </div>
    </div>
    
    <div class="flex justify-between">
      <button data-step-prev 
              class="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
        Voltar
      </button>
      <button onclick="finishOrder()" 
              class="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Finalizar Compra
      </button>
    </div>
  </div>
  
</div>

<script>
const stepper = SpireUI.get(document.getElementById('checkout-stepper'));

document.getElementById('checkout-stepper').addEventListener('stepper:change', (e) => {
  // Atualizar barras de progresso
  if (e.detail.completed.includes(1)) {
    document.getElementById('progress-1-2').style.width = '100%';
  }
  if (e.detail.completed.includes(2)) {
    document.getElementById('progress-2-3').style.width = '100%';
  }
});

function finishOrder() {
  stepper.complete();
  SpireUI.toast.success('Pedido finalizado com sucesso!');
}
</script>
```

## Acessibilidade

O componente configura automaticamente:

- `role="navigation"` no container
- `role="tab"` em cada step
- `aria-selected` dinâmico
- `aria-current="step"` na etapa atual
- `role="tabpanel"` nos painéis
- `aria-hidden` nos painéis inativos
