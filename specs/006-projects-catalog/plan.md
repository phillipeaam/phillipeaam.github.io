# Implementation Plan: Projects Catalog

**Branch**: `feature/006-projects-catalog` | **Date**: 2026-10-04 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-projects-catalog/spec.md`

## Summary

Redesenhar `/projects/` como catálogo compacto e consultável que mantém todos os projetos publicados reconhecíveis. A página renderizará registros e detalhes no HTML estático do Astro; um script cliente pequeno aprimorará busca, menus pesquisáveis de seleção múltipla para Context e Technology, contador e estado vazio. Cada ficha poderá expandir detalhes localmente por um disclosure nativo, com estrutura editorial consistente, tags e mídia inline apenas quando aprovadas por evidência. O cabeçalho reutiliza a composição da seção “More Projects” na Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio. Rótulos visíveis precedem a busca e cada faceta; somente um menu de faceta fica aberto por vez, sem perder seleções. O plano conserva IDs, ordem editorial e destinos válidos, e padroniza os divisores.

## Technical Context

**Language/Version**: TypeScript 5.9.2 para scripts/componentes; HTML/CSS; Astro 7.3.5.

**Primary Dependencies**: Dependências já presentes em `package.json`: Astro e `@astrojs/check`; nenhum framework cliente, serviço externo ou pacote adicional previsto.

**Storage**: N/A. O inventário permanece em dados estáticos TypeScript em `src/data/projects.ts` e no HTML pré-renderizado.

**Testing**: `npm run check`, `npm run build`, inspeção manual da interação nos navegadores e matriz manual de teclado, leitor de tela, redução de movimento, ausência de JavaScript e viewports. O repositório não possui runner de testes automatizados.

**Target Platform**: Navegadores modernos em desktop, tablet e celular; saída estática do Astro.

**Project Type**: Site de portfólio Astro, predominantemente estático.

**Performance Goals**: Filtragem local dos 19 registros atuais sem requisições de rede. A spec não estabelece um SLO numérico; esta feature não introduz um limite de performance ou benchmark novo.

**Constraints**: Conteúdo e links centrais úteis sem JavaScript; somente fatos, tags, tecnologias e mídias confirmados; preservar identificadores e links de case; múltiplos detalhes podem ficar abertos; controles indisponíveis não aparentam funcionar; filtros Context e Technology usam menus com busca e seleção múltipla independente, mas no máximo um menu pode ficar aberto por vez; rótulos visíveis ficam acima de cada controle; cabeçalho segue exatamente a hierarquia editorial aprovada na Home; respeitar movimento reduzido, pausa de mídia contínua, apresentação inline de mídia autorizada e design editorial existente.

**Scale/Scope**: 19 projetos publicados atualmente. Inventário e total devem derivar dos dados reais, com preparação para inclusões futuras sem framework genérico. Mudanças limitadas a `/projects/`, seus componentes/dados e estilos diretamente necessários.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate for this feature | Status |
|---|---|---|
| I. Evidence-first claims | Facetas, resumos, períodos, contribuições e mídia usam somente fontes verificadas; não inferir tecnologias de prosa ou nome do projeto. | PASS |
| II. Shared patterns | Reutilizar componentes e contrato comuns das fichas; variação apenas por dados existentes. | PASS |
| III. Approved visual systems | Preservar identidade editorial e reaproveitar padrões atuais; sem redesign alheio ao arquivo. | PASS |
| IV. Accessibility | HTML semântico/disclosures, rótulos, teclado, foco visível, estado anunciável, toque, alternativa estática e controle de animação contínua. | PASS |
| V. Progressive enhancement | Todos os registros e disclosures nativos são conteúdo base; ativar filtros somente depois da inicialização do script. | PASS |
| VI. Responsive verification | Validar desktop, tablet e celular, incluindo reflow estreito; relatar apenas viewports efetivamente testados na implementação. | PASS |
| VII. Small scope | Limitar a página, inventário, componentes e estilos necessários. | PASS |
| VIII. Validation | Na implementação, executar diff check, diagnóstico Astro, build e validações manuais relevantes; distinguir verificações feitas e não feitas. | PASS |
| IX. Human review | Entregar mudança visual/estrutural para revisão humana antes de aprovação para merge/push. | PASS |

Não há violações conhecidas que exijam justificativa. O controle de pausa para animação contínua poderá alterar o componente de mídia compartilhado apenas no necessário para cumprir o requisito de acessibilidade.

## Project Structure

### Documentation (this feature)

```text
specs/006-projects-catalog/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── projects-catalog.md
```

`tasks.md` é uma etapa posterior de `$speckit-tasks` e não é criado por este plano.

### Source Code (repository root)

```text
src/
├── data/projects.ts                 # inventário e metadados verificados
├── pages/projects/index.astro       # conteúdo base, controles e total
├── components/ProjectRecord.astro  # entrada, disclosure e detalhes estruturados
├── components/Navigation.astro     # navegação contextual Back/Contact
├── components/ProjectMediaPreview.astro # mídia inline aprovada e pausa quando aplicável
├── components/ArchiveMedia.astro   # renderização inline de mídia de arquivo
└── styles/global.css               # layout responsivo, estado e foco
```

**Structure Decision**: Manter a arquitetura Astro atual: dados estáticos, rota existente e componentes reutilizáveis. Um script de cliente pequeno, escopado à página de projetos, indexa texto público renderizado e atualiza visibilidade/contador sem hidratar uma aplicação ou introduzir backend. A taxonomia verificada deve ser normalizada no inventário; não criar sistema genérico de busca.

## Complexity Tracking

Sem violações da constituição; nenhuma complexidade adicional a justificar.

## Planning Decisions

- Cada projeto permanece como entrada textual visível; poster é complementar.
- Busca e filtros complementam a descoberta inicial, sem substituir a apresentação do conjunto.
- Contexto e tecnologia são facetas distintas; produto/tipo não é misturado com contexto.
- Cada faceta usa um menu separado com busca e seleção múltipla. A implementação deve preferir inputs checkbox nativos agrupados em disclosure nativo, evitando um widget ARIA combobox/listbox personalizado quando o conjunto de opções inclui controles checkbox interativos. Os rótulos visíveis “Search for”, “Context” e “Technology” ficam acima dos respectivos controles.
- Os menus Context e Technology são mutuamente exclusivos quanto ao estado aberto: abrir um fecha o outro; valores marcados e busca interna de opções permanecem ao alternar entre facetas. Fechar e reabrir o mesmo menu também preserva esse estado.
- Valores múltiplos da mesma faceta usam OR; busca e facetas entre si usam AND.
- Tecnologia/tag não aparece como chip no resumo compacto; continua indexável para busca, selecionável no filtro e visível em Project details.
- Project details agrupa os dados disponíveis em rótulos/seções consistentes, omite grupos vazios e exibe mídia autorizada inline; GIFs não ficam reduzidos a um link para outra aba.
- Cabeçalho de `/projects/` reutiliza a composição e o texto da seção “More Projects” na Home — eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e texto de apoio existente — e abandona a apresentação anterior; divisores das entradas mantêm o mesmo ritmo e tratamento visual.
- Disclosures são independentes e podem permanecer abertos juntos; ocultar uma entrada filtrada também oculta seus detalhes.
- IDs permanecem estáveis. Ao abrir um hash de projeto, o catálogo deve limpar critérios incompatíveis antes de posicionar o destino, para que deep links antigos continuem visíveis.
- Sem JavaScript, todos os registros e links continuam disponíveis; filtros interativos ficam ocultos ou indisponíveis, sem sugerir que funcionam.
- A mídia aprovada aparece em coluna ao lado do texto em telas largas e empilhada antes dele em celular; realizar revisão visual antes de tratar a implementação como aprovada para merge/push.
