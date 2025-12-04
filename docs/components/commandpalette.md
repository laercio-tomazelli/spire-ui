# CommandPalette

Paleta de comandos estilo VS Code / Spotlight para navegação e ações rápidas.

## Uso Básico

```html
<div data-v="command-palette">
  <div data-command="new-file" data-title="Novo Arquivo" data-icon="📄" data-shortcut="⌘N" data-category="Arquivo"></div>
  <div data-command="save" data-title="Salvar" data-icon="💾" data-shortcut="⌘S" data-category="Arquivo"></div>
  <div data-command="settings" data-title="Configurações" data-icon="⚙️" data-category="Geral"></div>
</div>
```

## Atalho Global

O Command Palette é aberto automaticamente com:
- **Mac**: `⌘ + K`
- **Windows/Linux**: `Ctrl + K`

## Com Blade Component

```blade
<x-ui.command-palette>
  <x-ui.command id="new" title="Novo Documento" icon="📄" shortcut="⌘N" category="Arquivo" />
  <x-ui.command id="open" title="Abrir" icon="📂" shortcut="⌘O" category="Arquivo" />
  <x-ui.command id="save" title="Salvar" icon="💾" shortcut="⌘S" category="Arquivo" />
  <x-ui.command id="settings" title="Configurações" icon="⚙️" category="Preferências" />
  <x-ui.command id="theme" title="Alternar Tema" icon="🌙" category="Preferências" />
</x-ui.command-palette>
```

## Data Attributes

### Container

| Atributo | Descrição |
|----------|-----------|
| `data-v="command-palette"` | Identifica o componente |

### Comandos

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `data-command` | string | ID único do comando |
| `data-title` | string | Título exibido |
| `data-description` | string | Descrição opcional |
| `data-icon` | string | Emoji ou ícone |
| `data-shortcut` | string | Atalho de teclado |
| `data-category` | string | Categoria para agrupamento |
| `data-handler` | string | Nome da função global a executar |

## API JavaScript

```javascript
// Via API global
const palette = SpireUI.command;

// Abrir
palette.open();

// Fechar
palette.close();

// Toggle
palette.toggle();

// Registrar comandos dinamicamente
palette.register([
  {
    id: 'logout',
    title: 'Sair',
    icon: '🚪',
    category: 'Conta',
    handler: () => logout()
  }
]);

// Remover comando
palette.unregister('logout');
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `open()` | `this` | Abre a paleta |
| `close()` | `this` | Fecha a paleta |
| `toggle()` | `this` | Alterna aberta/fechada |
| `register(commands)` | `this` | Registra novos comandos |
| `unregister(id)` | `this` | Remove um comando |
| `setCommands(commands)` | `this` | Define todos os comandos |
| `destroy()` | `void` | Remove a instância |

## Interface CommandItem

```typescript
interface CommandItem {
  id: string;           // ID único
  title: string;        // Título do comando
  description?: string; // Descrição opcional
  icon?: string;        // Emoji ou HTML do ícone
  shortcut?: string;    // Atalho (ex: "⌘K")
  category?: string;    // Categoria para agrupamento
  handler: () => void;  // Função a executar
}
```

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `command:executed` | `{ command }` | Disparado quando um comando é executado |
| `command:open` | - | Disparado ao abrir a paleta |
| `command:close` | - | Disparado ao fechar a paleta |

```javascript
document.body.addEventListener('command:executed', (e) => {
  console.log('Comando executado:', e.detail.command);
});
```

## Navegação

| Tecla | Ação |
|-------|------|
| `↑` `↓` | Navegar entre comandos |
| `Enter` | Executar comando selecionado |
| `Escape` | Fechar paleta |
| Digitar | Filtrar comandos |

## Busca

A busca filtra por:
- Título do comando
- Descrição
- Categoria

```
Digite "arquivo" → mostra todos os comandos da categoria "Arquivo"
Digite "salvar" → mostra o comando "Salvar"
```

## Exemplos

### Comandos de Aplicação

```javascript
SpireUI.command.register([
  {
    id: 'dashboard',
    title: 'Ir para Dashboard',
    icon: '🏠',
    category: 'Navegação',
    handler: () => window.location.href = '/dashboard'
  },
  {
    id: 'users',
    title: 'Gerenciar Usuários',
    icon: '👥',
    category: 'Navegação',
    handler: () => window.location.href = '/users'
  },
  {
    id: 'new-user',
    title: 'Criar Novo Usuário',
    icon: '➕',
    shortcut: '⌘N',
    category: 'Ações',
    handler: () => SpireUI.get(document.getElementById('new-user-modal')).open()
  },
  {
    id: 'theme',
    title: 'Alternar Tema Escuro',
    icon: '🌙',
    category: 'Preferências',
    handler: () => document.documentElement.classList.toggle('dark')
  },
  {
    id: 'logout',
    title: 'Sair da Conta',
    icon: '🚪',
    category: 'Conta',
    handler: async () => {
      if (await SpireUI.confirm({ title: 'Sair?', type: 'warning' })) {
        window.location.href = '/logout';
      }
    }
  }
]);
```

### Com Handlers no HTML

```html
<div data-v="command-palette">
  <div data-command="save" 
       data-title="Salvar Documento" 
       data-handler="saveDocument"
       data-shortcut="⌘S">
  </div>
</div>

<script>
function saveDocument() {
  // A função é chamada quando o comando é executado
  console.log('Salvando...');
}
</script>
```

### Comandos Dinâmicos

```javascript
// Adicionar comandos baseado no contexto
if (userIsAdmin) {
  SpireUI.command.register([
    { id: 'admin', title: 'Painel Admin', icon: '🔧', handler: () => {} }
  ]);
}

// Adicionar comandos de arquivos recentes
recentFiles.forEach(file => {
  SpireUI.command.register([{
    id: `file-${file.id}`,
    title: file.name,
    icon: '📄',
    category: 'Recentes',
    handler: () => openFile(file.id)
  }]);
});
```

## Visual

```html
<!-- Estrutura gerada -->
<div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
  <div class="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
    
    <!-- Search -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <input type="text" placeholder="Digite um comando..." 
        class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
    </div>
    
    <!-- Lista de comandos -->
    <div class="max-h-80 overflow-y-auto p-2">
      <div class="text-xs font-semibold text-gray-400 uppercase px-3 py-2">Categoria</div>
      <button class="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100">
        <span>📄</span>
        <span>Título do Comando</span>
        <kbd class="ml-auto px-2 py-1 bg-gray-200 rounded text-xs">⌘N</kbd>
      </button>
    </div>
    
    <!-- Footer com ajuda -->
    <div class="p-3 border-t flex justify-between text-xs text-gray-500">
      <span>↑↓ navegar</span>
      <span>↵ executar</span>
      <span>esc fechar</span>
    </div>
    
  </div>
</div>
```

## Acessibilidade

- `role="dialog"` no container
- `role="listbox"` na lista de comandos
- `role="option"` em cada comando
- Navegação completa por teclado
- Focus trap quando aberto
