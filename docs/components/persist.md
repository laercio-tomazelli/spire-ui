# Persist

Persistência automática de estado de elementos em localStorage/sessionStorage.

## Uso Básico

```html
<!-- Persiste o valor do input -->
<input type="text" 
       data-v="persist"
       data-persist-key="user-name"
       name="name">

<!-- Persiste o estado de um checkbox -->
<input type="checkbox" 
       data-v="persist"
       data-persist="checked"
       data-persist-key="newsletter-opt-in">
```

## Com Blade Component

```blade
<x-ui.input 
  name="search" 
  persist 
  persist-key="search-query"
/>

<x-ui.textarea 
  name="notes" 
  persist 
  persist-key="user-notes"
  persist-session
/>
```

## Data Attributes

| Atributo | Tipo | Default | Descrição |
|----------|------|---------|-----------|
| `data-v="persist"` | - | - | Identifica o componente |
| `data-persist-key` | string | Auto-gerado | Chave no storage |
| `data-persist` | string | `value` | Propriedades a persistir (separadas por vírgula) |
| `data-persist-session` | boolean | `false` | Usar sessionStorage ao invés de localStorage |

## Propriedades Persistíveis

| Propriedade | Descrição |
|-------------|-----------|
| `value` | Valor de inputs/textareas/selects |
| `checked` | Estado de checkboxes/radios |
| `innerHTML` | Conteúdo HTML do elemento |
| `class` | Classes CSS do elemento |
| Qualquer `data-*` | Atributos data customizados |

## API JavaScript

```javascript
const persist = SpireUI.get(document.querySelector('[data-v="persist"]'));

// Salvar manualmente
persist.save();

// Carregar do storage
persist.load();

// Limpar dados salvos
persist.clear();
```

## Métodos

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `save()` | `this` | Salva o estado atual no storage |
| `load()` | `this` | Carrega o estado do storage |
| `clear()` | `this` | Remove os dados do storage |
| `destroy()` | `void` | Remove a instância |

## Eventos

| Evento | Detalhe | Descrição |
|--------|---------|-----------|
| `persist:saved` | `{ key, data }` | Dados salvos |
| `persist:loaded` | `{ key, data }` | Dados carregados |
| `persist:cleared` | `{ key }` | Dados removidos |

```javascript
element.addEventListener('persist:loaded', (e) => {
  console.log('Dados restaurados:', e.detail.data);
});
```

## Auto-Save

O componente salva automaticamente em:

1. **Eventos de input**: `change`, `input`
2. **Antes de sair da página**: `beforeunload`

## Exemplos

### Formulário de Busca

```html
<form>
  <input type="text" 
         data-v="persist"
         data-persist-key="search-filters-query"
         name="q"
         placeholder="Buscar...">
  
  <select data-v="persist" data-persist-key="search-filters-sort" name="sort">
    <option value="recent">Mais recentes</option>
    <option value="popular">Mais populares</option>
  </select>
  
  <input type="checkbox" 
         data-v="persist"
         data-persist="checked"
         data-persist-key="search-filters-instock"
         name="in_stock">
  <label>Apenas em estoque</label>
</form>
```

Os valores são restaurados quando o usuário volta à página.

### Preferências do Usuário

```html
<div class="settings">
  <!-- Tema -->
  <input type="checkbox" 
         data-v="persist"
         data-persist="checked"
         data-persist-key="pref-dark-mode"
         onchange="toggleDarkMode(this.checked)">
  <label>Modo escuro</label>
  
  <!-- Notificações -->
  <input type="checkbox" 
         data-v="persist"
         data-persist="checked"
         data-persist-key="pref-notifications"
         checked>
  <label>Notificações por email</label>
</div>
```

### Rascunho de Texto

```html
<textarea data-v="persist"
          data-persist-key="draft-post-{{ $post->id ?? 'new' }}"
          name="content"
          rows="10"
          placeholder="Escreva seu post..."></textarea>

<p class="text-sm text-gray-500">
  Seu rascunho é salvo automaticamente.
</p>
```

### Estado de Accordion

```html
<div data-v="persist"
     data-persist="class"
     data-persist-key="faq-section-1"
     class="accordion-item">
  <!-- O estado aberto/fechado é persistido via classes -->
</div>
```

### Dados Customizados

```html
<div data-v="persist"
     data-persist="selectedTab,scrollPosition"
     data-persist-key="dashboard-state"
     data-selected-tab="overview"
     data-scroll-position="0">
  <!-- Estado customizado persistido -->
</div>
```

### Usando Session Storage

```html
<!-- Dados temporários (limpos ao fechar o navegador) -->
<input type="text" 
       data-v="persist"
       data-persist-session="true"
       data-persist-key="temp-search"
       name="temp_query">
```

## Storage

### localStorage (padrão)
- Persiste entre sessões do navegador
- Mantido até limpeza manual
- Ideal para preferências do usuário

### sessionStorage
- Limpo ao fechar a aba/navegador
- Ideal para dados temporários
- Use `data-persist-session="true"`

## Chave de Storage

A chave é formada por:
- `data-persist-key` se definido
- Ou `vp-{id}` se o elemento tem ID
- Ou `vp-{timestamp}` como fallback

```javascript
// Acessar diretamente
const saved = localStorage.getItem('user-search-query');
const data = JSON.parse(saved);
```

## Formato dos Dados

Os dados são salvos como JSON:

```json
{
  "value": "texto do input",
  "checked": true,
  "class": "active expanded"
}
```

## Limpeza Manual

```javascript
// Limpar um elemento específico
SpireUI.get(element).clear();

// Limpar todos os dados de persist
Object.keys(localStorage)
  .filter(k => k.startsWith('vp-'))
  .forEach(k => localStorage.removeItem(k));
```

## Considerações

- ⚠️ Não use para dados sensíveis (senhas, tokens)
- ⚠️ Storage tem limite de ~5MB
- ✅ Ideal para UX (lembrar preferências)
- ✅ Ótimo para rascunhos de formulários
