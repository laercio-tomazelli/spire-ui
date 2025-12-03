# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2025-12-03

### 🚀 Utilities & Helpers

#### Funções Utilitárias (2)
- **debounce** - Debounce para funções (inputs, search, etc)
- **throttle** - Throttle para eventos frequentes (scroll, resize)

#### Event Bus
- **events.on()** - Escutar eventos globais
- **events.off()** - Remover listeners
- **events.emit()** - Emitir eventos
- **events.once()** - Listener único (auto-remove)

#### HTTP Client
- **http.get()** - Requisições GET com tipagem
- **http.post()** - Requisições POST
- **http.put()** - Requisições PUT
- **http.delete()** - Requisições DELETE
- Suporte a timeout, headers customizados, CSRF token automático

#### Currency Formatter
- **currency.format()** - Formatar valores monetários (BRL por padrão)
- **currency.parse()** - Parse de strings monetárias para número
- Suporte a múltiplas moedas e locales

#### Input Masks
- **mask.apply()** - Aplicar máscaras a inputs
- **mask.remove()** - Remover máscaras
- **mask.getValue()** - Obter valor sem máscara
- Máscaras prontas: CPF, CNPJ, phone, CEP, money, creditcard

#### Performance Monitor
- **perf.mark()** - Criar marcação de performance
- **perf.measure()** - Medir tempo entre marcações
- **perf.getMarks()** - Obter todas as marcações
- **perf.clear()** - Limpar medições

#### Accessibility (A11y)
- **a11y.announce()** - Anúncios para screen readers
- **a11y.trapFocus()** - Focus trap em containers
- **a11y.skipLink()** - Criar skip links de navegação

#### Error Handler
- **onError()** - Handler global para erros de componentes

### Tamanho do Bundle
| Arquivo | Original | Gzip |
|---------|----------|------|
| vanilla-pro.js | 75.92 KB | **~19 KB** |

---

## [1.0.0] - 2025-12-03

### 🎉 Lançamento Inicial

#### Componentes UI (8)
- **Button** - Botões com estados loading, success, error
- **Input** - Inputs com validação em tempo real
- **Modal** - Modais acessíveis com focus trap e ESC para fechar
- **Dropdown** - Dropdowns com keyboard navigation
- **Table** - Tabelas com estados loading e empty
- **Tabs** - Sistema de abas acessível com ARIA
- **Accordion** - Acordeões com modo single/multiple
- **Tooltip** - Tooltips posicionáveis (top/bottom/left/right)

#### Componentes de Seleção (4)
- **Select** - Select customizado com pesquisa
- **MultiSelect** - Multi-seleção com tags, busca e max items
- **DatePicker** - Seletor de data com formato brasileiro/internacional
- **ColorPicker** - Seletor de cores com presets customizáveis

#### Componentes Overlay (3)
- **Drawer** - Painel deslizante (left/right/top/bottom)
- **Popover** - Popover posicionável com conteúdo rico
- **Confirm** - Diálogos de confirmação async/await

#### Componentes de Feedback (3)
- **Toast** - Sistema de notificações com queue (max 3 visíveis)
- **Progress** - Barras de progresso com animação e stripes
- **Skeleton** - Loading placeholders animados

#### Componentes de Formulário (4)
- **Form Validator** - Validação declarativa com 16 regras:
  - `required`, `email`, `min`, `max`, `minValue`, `maxValue`
  - `pattern`, `url`, `numeric`, `alpha`, `alphanumeric`
  - `phone`, `cpf`, `cnpj`, `date`, `confirmed`
- **File Upload** - Upload com drag & drop e preview de imagens
- **Range Slider** - Slider customizável com touch support
- **Stepper** - Wizard multi-etapas com validação

#### Componentes de Performance (3)
- **Lazy Load** - Lazy loading com Intersection Observer
- **Infinite Scroll** - Paginação infinita automática
- **Virtual Scroll** - Renderização otimizada para 1000+ itens

#### Componentes Utilitários (4)
- **Clipboard** - Copiar para área de transferência com feedback
- **Persist** - Persistência em localStorage/sessionStorage
- **Keyboard Shortcuts** - Sistema de atalhos de teclado global
- **Command Palette** - Busca global estilo ⌘K com categorias

### Infraestrutura
- ✅ TypeScript 5.0+ com tipagem estrita
- ✅ Vite 7.2.6 para bundling
- ✅ Tailwind CSS v4 com dark mode
- ✅ Vitest para testes (33 testes passando)
- ✅ ESLint configurado
- ✅ Blade components para Laravel

### Tamanho do Bundle
| Arquivo | Original | Gzip |
|---------|----------|------|
| vanilla-pro.js | 69.52 KB | **17.17 KB** |
| app.js | 36.35 KB | 14.83 KB |
| app.css | 42.19 KB | 7.48 KB |

---

## Roadmap

### [1.2.0] - Planejado
- [ ] Range Slider com dois thumbs (min/max range)
- [ ] Time Picker
- [ ] Autocomplete/Combobox
- [ ] Responsive Tables (scroll horizontal)
- [ ] Touch gestures (swipe para drawer)

### [1.3.0] - Planejado
- [ ] NPM Package publicável
- [ ] CDN Build (UMD)
- [ ] Storybook para documentação interativa
- [ ] i18n (internacionalização)

---

## Links

- [Documentação](README.md)
- [Demo](http://localhost:8000)
- [Issues](https://github.com/seu-usuario/vanilla-pro/issues)
