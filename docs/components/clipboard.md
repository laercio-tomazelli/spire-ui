# Clipboard

Copiar texto para a área de transferência com feedback visual.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<button data-v="clipboard" data-clipboard-text="Texto a ser copiado"
        class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
  Copiar
</button>
```

## Copiar de um Input

```html
<div class="flex gap-2">
  <input type="text" id="api-key" value="sk-abc123xyz" readonly
         class="flex-1 px-3 py-2 border rounded-lg bg-gray-50">
  <button data-v="clipboard" data-clipboard-target="#api-key"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg">
    Copiar
  </button>
</div>
```

## Copiar Próprio Conteúdo

```html
<code data-v="clipboard" class="px-3 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
  npm install spire-ui
</code>
```

## Atributos

| Atributo | Descrição |
|----------|-----------|
| `data-v="clipboard"` | Identifica o componente |
| `data-clipboard-text` | Texto a ser copiado |
| `data-clipboard-target` | Seletor CSS do input/textarea |
| `data-success-message` | Mensagem de sucesso (padrão: "Copiado!") |
| `data-error-message` | Mensagem de erro (padrão: "Erro ao copiar") |

## API JavaScript

```javascript
// Obter instância
const clipboard = SpireUI.get(document.querySelector('[data-v="clipboard"]'));

// Copiar
clipboard.copy();               // Copia o texto configurado
clipboard.copyText('Qualquer'); // Copia texto específico

// Destruir
clipboard.destroy();
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `clipboard:copied` | Texto copiado com sucesso | `{ text: string }` |
| `clipboard:error` | Erro ao copiar | `{ text: string }` |

```javascript
document.querySelector('[data-v="clipboard"]').addEventListener('clipboard:copied', (e) => {
  console.log('Copiado:', e.detail.text);
});
```

## Feedback Visual

Quando o texto é copiado com sucesso:
1. Ícone de check é mostrado
2. Texto muda para "Copiado!"
3. Classe `text-green-600` é adicionada
4. Após 2 segundos, retorna ao estado original

## Copiar Código

```html
<div class="relative group">
  <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
    <code id="code-example">const x = 'hello';</code>
  </pre>
  <button data-v="clipboard" data-clipboard-target="#code-example"
          class="absolute top-2 right-2 p-2 bg-gray-700 text-gray-300 rounded 
                 opacity-0 group-hover:opacity-100 transition-opacity">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
  </button>
</div>
```

## Mensagens Customizadas

```html
<button data-v="clipboard" 
        data-clipboard-text="https://exemplo.com"
        data-success-message="Link copiado!"
        data-error-message="Não foi possível copiar"
        class="px-4 py-2 bg-gray-100 rounded-lg">
  Copiar Link
</button>
```

## Copiar Dados de Tabela

```html
<table class="w-full">
  <tbody>
    <tr>
      <td>Chave API</td>
      <td id="api-key-cell" class="font-mono">sk-abc123</td>
      <td>
        <button data-v="clipboard" data-clipboard-target="#api-key-cell"
                class="p-1 hover:bg-gray-100 rounded">
          <svg class="w-4 h-4"><!-- copy icon --></svg>
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Exemplo Completo - Compartilhar

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md">
  
  <h3 class="text-lg font-semibold mb-4">Compartilhar</h3>
  
  <!-- URL Input -->
  <div class="flex gap-2 mb-4">
    <input type="text" id="share-url" readonly
           value="https://seusite.com/artigo/123"
           class="flex-1 px-3 py-2 border dark:border-gray-600 rounded-lg 
                  bg-gray-50 dark:bg-gray-700 text-sm">
    <button data-v="clipboard" data-clipboard-target="#share-url"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   inline-flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      Copiar
    </button>
  </div>
  
  <!-- Social Buttons -->
  <div class="flex gap-3">
    <a href="#" class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      <svg class="w-5 h-5"><!-- facebook --></svg>
    </a>
    <a href="#" class="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
      <svg class="w-5 h-5"><!-- twitter --></svg>
    </a>
    <a href="#" class="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
      <svg class="w-5 h-5"><!-- whatsapp --></svg>
    </a>
    <button data-v="clipboard" data-clipboard-text="Confira este artigo incrível! https://seusite.com/artigo/123"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
      <svg class="w-5 h-5"><!-- share --></svg>
    </button>
  </div>
  
</div>

<script>
document.querySelector('[data-clipboard-target="#share-url"]').addEventListener('clipboard:copied', () => {
  SpireUI.toast.success('Link copiado!');
});
</script>
```

## Bloco de Código com Destaque

```html
<div class="relative bg-gray-900 rounded-xl overflow-hidden">
  
  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-2 bg-gray-800">
    <span class="text-gray-400 text-sm">JavaScript</span>
    <button data-v="clipboard" data-clipboard-target="#code-block"
            data-success-message="Código copiado!"
            class="text-gray-400 hover:text-white text-sm flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      Copiar
    </button>
  </div>
  
  <!-- Code -->
  <pre class="p-4 overflow-x-auto">
    <code id="code-block" class="text-gray-100 text-sm">const carousel = SpireUI.get(document.getElementById('my-carousel'));
carousel.next();
carousel.play();</code>
  </pre>
  
</div>
```

## Fallback para Navegadores Antigos

O componente usa `navigator.clipboard.writeText()`. Em navegadores que não suportam:
1. Um toast de erro é exibido
2. O evento `clipboard:error` é disparado

## Programático

```javascript
// Copiar qualquer texto
const clipboard = SpireUI.get(document.querySelector('[data-v="clipboard"]'));
await clipboard.copyText('Texto customizado');
```
