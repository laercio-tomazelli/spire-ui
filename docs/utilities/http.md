# Http

Cliente HTTP leve para requisições AJAX.

## Instalação

O Http Client é parte da API global do Spire UI.

## Uso Básico

```javascript
// GET
const users = await SpireUI.http.get('/api/users');

// POST
const newUser = await SpireUI.http.post('/api/users', {
  name: 'João',
  email: 'joao@email.com'
});

// PUT
await SpireUI.http.put('/api/users/1', { name: 'João Silva' });

// PATCH
await SpireUI.http.patch('/api/users/1', { status: 'active' });

// DELETE
await SpireUI.http.delete('/api/users/1');
```

## API

```javascript
SpireUI.http.get(url, options?);
SpireUI.http.post(url, data?, options?);
SpireUI.http.put(url, data?, options?);
SpireUI.http.patch(url, data?, options?);
SpireUI.http.delete(url, options?);
```

## Opções

```javascript
await SpireUI.http.get('/api/users', {
  headers: {
    'Authorization': 'Bearer token123'
  },
  timeout: 5000,
  responseType: 'json'
});
```

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `headers` | object | `{}` | Headers customizados |
| `timeout` | number | `30000` | Timeout em ms |
| `responseType` | string | `'json'` | Tipo de resposta |

## CSRF Token

O cliente inclui automaticamente o token CSRF do Laravel:

```html
<!-- O token é lido daqui -->
<meta name="csrf-token" content="{{ csrf_token() }}">
```

## Tratamento de Erros

```javascript
try {
  const data = await SpireUI.http.get('/api/users');
} catch (error) {
  if (error.status === 401) {
    // Não autenticado
    window.location.href = '/login';
  } else if (error.status === 422) {
    // Erros de validação
    console.log(error.data.errors);
  } else {
    SpireUI.toast.error('Erro ao carregar dados');
  }
}
```

## Com FormData

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'documento.pdf');

await SpireUI.http.post('/api/upload', formData);
```

## Query Parameters

```javascript
// GET /api/users?page=1&limit=10
const users = await SpireUI.http.get('/api/users', {
  params: {
    page: 1,
    limit: 10
  }
});
```

## Interceptors

```javascript
// Interceptor de request
SpireUI.http.interceptors.request.use((config) => {
  config.headers['X-Custom-Header'] = 'value';
  return config;
});

// Interceptor de response
SpireUI.http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      window.location.href = '/login';
    }
    throw error;
  }
);
```

## Exemplos de Uso

### CRUD Completo

```javascript
// Listar
async function listUsers() {
  return await SpireUI.http.get('/api/users');
}

// Criar
async function createUser(data) {
  return await SpireUI.http.post('/api/users', data);
}

// Atualizar
async function updateUser(id, data) {
  return await SpireUI.http.put(`/api/users/${id}`, data);
}

// Excluir
async function deleteUser(id) {
  return await SpireUI.http.delete(`/api/users/${id}`);
}
```

### Com Loading

```javascript
async function loadData() {
  const table = SpireUI.get(document.getElementById('users-table'));
  
  table.loading(true);
  
  try {
    const users = await SpireUI.http.get('/api/users');
    renderTable(users);
  } catch (error) {
    table.empty('Erro ao carregar dados');
  }
}
```

### Upload com Progresso

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  return await SpireUI.http.post('/api/upload', formData, {
    onProgress: (percent) => {
      progressBar.value(percent);
    }
  });
}
```

### Cancelar Requisição

```javascript
const controller = new AbortController();

// Fazer requisição cancelável
SpireUI.http.get('/api/slow-endpoint', {
  signal: controller.signal
});

// Cancelar após 5 segundos
setTimeout(() => {
  controller.abort();
}, 5000);
```

## Resposta

A resposta é automaticamente parseada como JSON:

```javascript
const response = await SpireUI.http.get('/api/user');
console.log(response); // { id: 1, name: 'João' }
```

Para acessar a resposta completa:

```javascript
const { data, status, headers } = await SpireUI.http.get('/api/user', {
  fullResponse: true
});
```

## Headers Padrão

Headers incluídos automaticamente:
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Requested-With: XMLHttpRequest`
- `X-CSRF-TOKEN: {token}` (do meta tag)
