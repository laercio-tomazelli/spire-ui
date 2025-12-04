# FileUpload

Upload de arquivos com drag & drop, preview e validação.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<div data-v="file-upload" data-multiple="true">
  <input type="file" name="files">
</div>
```

O componente cria automaticamente uma dropzone estilizada.

## Dropzone Customizada

```html
<div data-v="file-upload" data-multiple="true" data-max-files="5" data-max-size="5242880">
  <input type="file" name="files">
  
  <div data-dropzone class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center 
                            hover:border-primary-500 transition-colors cursor-pointer">
    <svg class="w-12 h-12 mx-auto mb-4 text-gray-400">
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
    </svg>
    <p class="text-gray-600 mb-2">Arraste arquivos aqui ou</p>
    <span class="text-primary-600 font-medium">clique para selecionar</span>
  </div>
  
  <div data-preview class="grid grid-cols-4 gap-4 mt-4"></div>
</div>
```

## Atributos

| Atributo | Descrição | Default |
|----------|-----------|---------|
| `data-v="file-upload"` | Identifica o componente | - |
| `data-multiple` | Permitir múltiplos arquivos | `false` |
| `data-max-files` | Número máximo de arquivos | `10` |
| `data-max-size` | Tamanho máximo em bytes | `10485760` (10MB) |
| `data-accept` | Tipos aceitos (mime types) | `*/*` |

## API JavaScript

```javascript
// Obter instância
const upload = SpireUI.get(document.querySelector('[data-v="file-upload"]'));

// Obter arquivos
const files = upload.files();

// Limpar todos
upload.clear();

// Remover arquivo específico
upload.remove(0); // pelo índice

// Destruir
upload.destroy();
```

### Encadeamento

```javascript
upload.clear(); // retorna this
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `upload:files-added` | Arquivos adicionados | `{ files: File[] }` |
| `upload:file-removed` | Arquivo removido | `{ file: File, index: number }` |
| `upload:file-too-large` | Arquivo muito grande | `{ file: File, maxSize: number }` |
| `upload:max-files` | Limite de arquivos atingido | `{ max: number }` |
| `upload:cleared` | Todos arquivos removidos | `{}` |

```javascript
document.querySelector('[data-v="file-upload"]').addEventListener('upload:files-added', (e) => {
  console.log('Arquivos:', e.detail.files);
});
```

## Preview Automático

O componente cria previews automaticamente para:
- **Imagens**: Miniatura da imagem
- **Outros**: Ícone de arquivo com nome

## Apenas Imagens

```html
<div data-v="file-upload" data-accept="image/*">
  <input type="file" accept="image/*">
</div>
```

## Tipos Específicos

```html
<!-- Apenas PDF -->
<div data-v="file-upload" data-accept="application/pdf">

<!-- Imagens e PDF -->
<div data-v="file-upload" data-accept="image/*,application/pdf">

<!-- Apenas documentos -->
<div data-v="file-upload" data-accept=".doc,.docx,.pdf,.txt">
```

## Com Validação

```html
<div data-v="file-upload" 
     data-max-size="2097152"
     data-max-files="3">
  <input type="file" multiple>
</div>

<script>
const upload = document.querySelector('[data-v="file-upload"]');

upload.addEventListener('upload:file-too-large', (e) => {
  const sizeMB = (e.detail.maxSize / 1024 / 1024).toFixed(1);
  SpireUI.toast.error(`Arquivo muito grande. Máximo: ${sizeMB}MB`);
});

upload.addEventListener('upload:max-files', (e) => {
  SpireUI.toast.warning(`Máximo de ${e.detail.max} arquivos permitido`);
});
</script>
```

## Com Formulário

```html
<form id="upload-form" enctype="multipart/form-data">
  <div data-v="file-upload" data-multiple="true">
    <input type="file" name="attachments[]" multiple>
    
    <div data-dropzone class="border-2 border-dashed p-8 text-center rounded-lg">
      <p>Arraste arquivos ou clique para selecionar</p>
    </div>
    
    <div data-preview class="mt-4 space-y-2"></div>
  </div>
  
  <button type="submit" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded">
    Enviar
  </button>
</form>
```

## Upload via AJAX

```html
<div data-v="file-upload" id="ajax-upload" data-multiple="true">
  <input type="file">
</div>

<button id="upload-btn" class="px-4 py-2 bg-primary-600 text-white rounded">
  Enviar Arquivos
</button>

<script>
const upload = SpireUI.get(document.getElementById('ajax-upload'));

document.getElementById('upload-btn').addEventListener('click', async () => {
  const files = upload.files();
  
  if (files.length === 0) {
    SpireUI.toast.warning('Selecione pelo menos um arquivo');
    return;
  }
  
  const formData = new FormData();
  files.forEach((file, i) => {
    formData.append(`files[${i}]`, file);
  });
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      SpireUI.toast.success('Arquivos enviados!');
      upload.clear();
    }
  } catch (error) {
    SpireUI.toast.error('Erro ao enviar arquivos');
  }
});
</script>
```

## Exemplo Completo

```html
<div class="max-w-lg mx-auto">
  
  <div data-v="file-upload" id="document-upload" 
       data-multiple="true" 
       data-max-files="5" 
       data-max-size="10485760"
       data-accept="image/*,.pdf,.doc,.docx">
    
    <input type="file" name="documents[]" multiple class="hidden">
    
    <!-- Dropzone -->
    <div data-dropzone 
         class="relative border-2 border-dashed border-gray-300 dark:border-gray-600 
                rounded-xl p-8 text-center transition-colors cursor-pointer
                hover:border-primary-500 dark:hover:border-primary-500
                hover:bg-primary-50 dark:hover:bg-primary-900/10">
      
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
      </svg>
      
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        Arraste arquivos aqui ou
      </p>
      <span class="text-primary-600 font-medium hover:underline">
        clique para selecionar
      </span>
      
      <p class="text-xs text-gray-400 mt-4">
        PNG, JPG, PDF, DOC até 10MB (máx. 5 arquivos)
      </p>
      
    </div>
    
    <!-- Preview -->
    <div data-preview class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"></div>
    
  </div>
  
  <!-- Actions -->
  <div class="flex gap-2 mt-4">
    <button id="clear-btn" 
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
      Limpar
    </button>
    <button id="submit-btn" 
            class="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
      Enviar Documentos
    </button>
  </div>
  
</div>

<script>
const upload = SpireUI.get(document.getElementById('document-upload'));

// Eventos
document.getElementById('document-upload').addEventListener('upload:files-added', (e) => {
  console.log(`${e.detail.files.length} arquivo(s) adicionado(s)`);
});

document.getElementById('document-upload').addEventListener('upload:file-too-large', (e) => {
  const name = e.detail.file.name;
  const maxMB = (e.detail.maxSize / 1024 / 1024).toFixed(0);
  SpireUI.toast.error(`"${name}" é muito grande. Máximo: ${maxMB}MB`);
});

document.getElementById('document-upload').addEventListener('upload:max-files', (e) => {
  SpireUI.toast.warning(`Máximo de ${e.detail.max} arquivos permitidos`);
});

// Limpar
document.getElementById('clear-btn').addEventListener('click', () => {
  upload.clear();
});

// Enviar
document.getElementById('submit-btn').addEventListener('click', async () => {
  const files = upload.files();
  
  if (files.length === 0) {
    SpireUI.toast.warning('Adicione pelo menos um arquivo');
    return;
  }
  
  const formData = new FormData();
  files.forEach((file, i) => formData.append(`documents[${i}]`, file));
  
  try {
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    await fetch('/api/documents', {
      method: 'POST',
      body: formData
    });
    
    SpireUI.toast.success('Documentos enviados com sucesso!');
    upload.clear();
  } catch (error) {
    SpireUI.toast.error('Erro ao enviar documentos');
  } finally {
    const btn = document.getElementById('submit-btn');
    btn.disabled = false;
    btn.textContent = 'Enviar Documentos';
  }
});
</script>
```

## Drag & Drop Visual

Classes são adicionadas automaticamente durante o drag:
- `border-blue-500`
- `bg-blue-50`
- `dark:bg-blue-900/20`

## Preview Item

Cada preview é renderizado automaticamente:

```html
<!-- Imagem -->
<div class="relative group">
  <img src="data:..." class="w-full h-24 object-cover rounded-lg">
  <button data-remove class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
    <svg class="w-4 h-4"><!-- x --></svg>
  </button>
  <p class="text-xs truncate mt-1">imagem.jpg</p>
</div>

<!-- Arquivo -->
<div class="relative group">
  <div class="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
    <svg class="w-8 h-8 text-gray-400"><!-- file icon --></svg>
  </div>
  <button data-remove>...</button>
  <p class="text-xs truncate mt-1">documento.pdf</p>
</div>
```
