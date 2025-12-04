# Table

Tabelas interativas com estados de loading e mensagens vazias.

## Instalação

O componente é carregado automaticamente via `SpireUI.init()`.

## Uso Básico

```html
<table data-v="table" class="w-full">
  <thead class="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    <tr>
      <td class="px-6 py-4">João Silva</td>
      <td class="px-6 py-4">joao@email.com</td>
      <td class="px-6 py-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Ativo</span></td>
    </tr>
  </tbody>
</table>
```

## API JavaScript

```javascript
// Obter instância
const table = SpireUI.get(document.querySelector('[data-v="table"]'));

// Loading
table.loading(true);   // Mostra spinner
table.loading(false);  // Remove loading

// Atualizar conteúdo
table.html(`
  <tr>
    <td class="px-6 py-4">Maria Santos</td>
    <td class="px-6 py-4">maria@email.com</td>
    <td class="px-6 py-4">Ativo</td>
  </tr>
`);

// Estado vazio
table.empty('Nenhum usuário encontrado');

// Destruir
table.destroy();
```

### Encadeamento

```javascript
table.loading(true); // retorna this
```

## Eventos

| Evento | Descrição | Detail |
|--------|-----------|--------|
| `table:loading` | Estado de loading mudou | `{ loading: boolean }` |
| `table:updated` | Conteúdo atualizado | `{}` |
| `table:empty` | Tabela vazia | `{ message: string }` |

```javascript
document.querySelector('[data-v="table"]').addEventListener('table:loading', (e) => {
  console.log('Loading:', e.detail.loading);
});
```

## Estado de Loading

Quando `loading(true)` é chamado:
- O tbody é substituído por um spinner
- `aria-busy="true"` é adicionado

```html
<!-- Estado de loading renderizado -->
<tbody>
  <tr>
    <td colspan="99" class="py-12 text-center text-gray-500">
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-5 w-5">...</svg>
        Carregando...
      </span>
    </td>
  </tr>
</tbody>
```

## Estado Vazio

```html
<!-- Estado vazio renderizado -->
<tbody>
  <tr>
    <td colspan="99" class="py-12 text-center text-gray-500">
      Nenhum registro encontrado
    </td>
  </tr>
</tbody>
```

## Uso com Fetch

```javascript
const table = SpireUI.get(document.getElementById('users-table'));

async function loadUsers() {
  table.loading(true);
  
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    if (users.length === 0) {
      table.empty('Nenhum usuário encontrado');
      return;
    }
    
    const rows = users.map(user => `
      <tr>
        <td class="px-6 py-4">${user.name}</td>
        <td class="px-6 py-4">${user.email}</td>
        <td class="px-6 py-4">${user.status}</td>
      </tr>
    `).join('');
    
    table.html(rows);
  } catch (error) {
    table.empty('Erro ao carregar dados');
  }
}
```

## Estilo Zebrado

```html
<table data-v="table" class="w-full">
  <tbody class="divide-y">
    <tr class="odd:bg-gray-50 dark:odd:bg-gray-800">...</tr>
    <tr class="odd:bg-gray-50 dark:odd:bg-gray-800">...</tr>
  </tbody>
</table>
```

## Com Ações

```html
<table data-v="table" class="w-full">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th class="text-right">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>João Silva</td>
      <td>joao@email.com</td>
      <td class="text-right">
        <button class="p-1 text-gray-500 hover:text-primary-600">
          <svg class="w-4 h-4"><!-- edit --></svg>
        </button>
        <button class="p-1 text-gray-500 hover:text-red-600">
          <svg class="w-4 h-4"><!-- trash --></svg>
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Exemplo Completo

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
  
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
    <h2 class="text-lg font-semibold">Usuários</h2>
    <div class="flex gap-2">
      <input type="search" placeholder="Buscar..." 
             class="px-3 py-1.5 border rounded-lg text-sm">
      <button class="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm">
        Novo
      </button>
    </div>
  </div>
  
  <!-- Table -->
  <table data-v="table" id="users-table" class="w-full">
    <thead class="bg-gray-50 dark:bg-gray-900/50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Nome
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Email
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Status
        </th>
        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Ações
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <img src="/avatar.jpg" class="w-8 h-8 rounded-full">
            <span class="font-medium text-gray-900 dark:text-white">João Silva</span>
          </div>
        </td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-400">joao@email.com</td>
        <td class="px-6 py-4">
          <span class="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium">
            Ativo
          </span>
        </td>
        <td class="px-6 py-4 text-right">
          <button class="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </button>
          <button class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </td>
      </tr>
      <!-- mais linhas -->
    </tbody>
  </table>
  
  <!-- Pagination -->
  <div class="flex items-center justify-between p-4 border-t dark:border-gray-700">
    <span class="text-sm text-gray-500">Mostrando 1-10 de 50</span>
    <div class="flex gap-1">
      <button class="px-3 py-1 border rounded hover:bg-gray-50">Anterior</button>
      <button class="px-3 py-1 bg-primary-600 text-white rounded">1</button>
      <button class="px-3 py-1 border rounded hover:bg-gray-50">2</button>
      <button class="px-3 py-1 border rounded hover:bg-gray-50">3</button>
      <button class="px-3 py-1 border rounded hover:bg-gray-50">Próximo</button>
    </div>
  </div>
  
</div>

<script>
const table = SpireUI.get(document.getElementById('users-table'));

// Carregar dados ao iniciar
loadUsers();

async function loadUsers() {
  table.loading(true);
  
  const response = await fetch('/api/users');
  const users = await response.json();
  
  if (users.length === 0) {
    table.empty('Nenhum usuário cadastrado');
    return;
  }
  
  const rows = users.map(renderUserRow).join('');
  table.html(rows);
}

function renderUserRow(user) {
  return `
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td class="px-6 py-4">${user.name}</td>
      <td class="px-6 py-4">${user.email}</td>
      <td class="px-6 py-4">${user.status}</td>
      <td class="px-6 py-4 text-right">...</td>
    </tr>
  `;
}
</script>
```

## Acessibilidade

- `aria-busy="true"` durante loading
- Usar `<th scope="col">` para cabeçalhos
- Usar `<th scope="row">` para primeira coluna se aplicável
