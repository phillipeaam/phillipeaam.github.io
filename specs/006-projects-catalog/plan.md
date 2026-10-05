# Implementation Plan: Projects Catalog

**Branch**: `feature/006-projects-catalog` | **Date**: 2026-10-05 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-projects-catalog/spec.md`

**Revisão vigente — 2026-10-05:** o complemento Selected contributions ao final define o desenho atual e substitui trechos anteriores de hierarquia, controles/provenance de mídia e gates. Os trechos substituídos são histórico; não executar decisões antigas nem interpretar PASS histórico como conformidade atual. T064 registra o alinhamento documental, não implementação.

**Decisão vigente sobre mídia — 2026-10-05:** não renderizar botão Stop/Play ou qualquer controle equivalente em nenhuma página. Referências anteriores neste plano a botão de pausa, controle explícito/acessível ou preservação de controles para Home/cases são históricas e substituídas. Preservar fallback estático, acionamento por configuração, falhas e reduced motion; não declarar conformidade completa da animação contínua.

## Summary

Redesenhar `/projects/` como catálogo compacto e consultável que mantém todos os projetos publicados reconhecíveis. A página renderizará registros e detalhes no HTML estático do Astro; um script cliente pequeno aprimorará busca, menus pesquisáveis de seleção múltipla para Context e Technology, contador e estado vazio. Cada ficha poderá expandir detalhes localmente por um disclosure nativo, com estrutura editorial consistente e tags nos detalhes. Na entrada recolhida, mídia principal aprovada fica à esquerda; à direita ficam ícone de identidade antes do título, descrição curta e More details. Contexto, contribuição, período, tipo e ações ficam nos detalhes; mídia complementar também, sem repetir mídia principal. O cabeçalho reutiliza a composição da seção “More Projects” na Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio. Rótulos visíveis precedem a busca e cada faceta; somente um menu de faceta fica aberto por vez, sem perder seleções. O plano conserva IDs, ordem editorial e destinos válidos, e padroniza os divisores.

## Technical Context

**Language/Version**: TypeScript 5.9.2 para scripts/componentes; HTML/CSS; Astro 7.3.5.

**Primary Dependencies**: Dependências já presentes em `package.json`: Astro e `@astrojs/check`; nenhum framework cliente, serviço externo ou pacote adicional previsto.

**Storage**: N/A. O inventário permanece em dados estáticos TypeScript em `src/data/projects.ts` e no HTML pré-renderizado.

**Testing**: `npm run check`, `npm run build`, inspeção manual da interação nos navegadores e matriz manual de teclado, leitor de tela, redução de movimento, ausência de JavaScript e viewports. O repositório não possui runner de testes automatizados.

**Target Platform**: Navegadores modernos em desktop, tablet e celular; saída estática do Astro.

**Project Type**: Site de portfólio Astro, predominantemente estático.

**Performance Goals**: Filtragem local dos 19 registros atuais sem requisições de rede. A spec não estabelece um SLO numérico; esta feature não introduz um limite de performance ou benchmark novo.

**Constraints**: Conteúdo e links centrais úteis sem JavaScript; somente fatos, tags, tecnologias e mídias confirmados; preservar identificadores e links de case; múltiplos detalhes podem ficar abertos; controles indisponíveis não aparentam funcionar; filtros Context e Technology usam menus com busca e seleção múltipla independente, mas no máximo um menu pode ficar aberto por vez; rótulos visíveis ficam acima de cada controle; cabeçalho segue exatamente a hierarquia editorial aprovada na Home; respeitar movimento reduzido, fallback estático, acionamento de mídia configurado, apresentação inline de mídia autorizada e design editorial existente. Não adicionar controles de animação.

**Scale/Scope**: 19 projetos publicados atualmente. Inventário e total devem derivar dos dados reais, com preparação para inclusões futuras sem framework genérico. Mudanças limitadas a `/projects/`, seus componentes/dados e estilos diretamente necessários.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate for this feature | Status |
|---|---|---|
| I. Evidence-first claims | Facetas, resumos, períodos, contribuições e mídia usam somente fontes verificadas; não inferir tecnologias de prosa ou nome do projeto. | PASS |
| II. Shared patterns | Reutilizar componentes e contrato comuns das fichas; variação apenas por dados existentes. | PASS |
| III. Approved visual systems | Preservar identidade editorial e reaproveitar padrões atuais; sem redesign alheio ao arquivo. | PASS |
| IV. Accessibility | HTML semântico/disclosures, rótulos, teclado, foco visível, estado anunciável, toque, alternativa estática e movimento reduzido. Nenhum controle de animação em qualquer superfície, conforme decisão do usuário; isso não declara conformidade completa do autoplay. | PASS |
| V. Progressive enhancement | Todos os registros e disclosures nativos são conteúdo base; ativar filtros somente depois da inicialização do script. | PASS |
| VI. Responsive verification | Validar desktop, tablet e celular, incluindo reflow estreito; relatar apenas viewports efetivamente testados na implementação. | PASS |
| VII. Small scope | Limitar a página, inventário, componentes e estilos necessários. | PASS |
| VIII. Validation | Na implementação, executar diff check, diagnóstico Astro, build e validações manuais relevantes; distinguir verificações feitas e não feitas. | PASS |
| IX. Human review | Entregar mudança visual/estrutural para revisão humana antes de aprovação para merge/push. | PASS |

**Histórico substituído:** versões anteriores deste plano propunham controle de pausa para animação contínua. A decisão atual do usuário remove esses controles globalmente. A validação não deve tratá-los como requisito nem declarar conformidade completa do autoplay.

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
├── components/ProjectMediaPreview.astro # mídia inline aprovada; sem controle de animação
├── components/ArchiveMedia.astro   # renderização inline de mídia de arquivo
└── styles/global.css               # layout responsivo, estado e foco
```

**Structure Decision**: Manter a arquitetura Astro atual: dados estáticos, rota existente e componentes reutilizáveis. Um script de cliente pequeno, escopado à página de projetos, indexa texto público renderizado e atualiza visibilidade/contador sem hidratar uma aplicação ou introduzir backend. A taxonomia verificada deve ser normalizada no inventário; não criar sistema genérico de busca.

## Complexity Tracking

Sem violações da constituição; nenhuma complexidade adicional a justificar.

**Correção de estado:** a afirmação acima descreve o desenho anterior. O complemento registra limites conhecidos de mídia e não declara conformidade integral; ver gates atuais abaixo. Não há nova dependência ou complexidade de runtime prevista.

## Planning Decisions

- Cada projeto permanece como entrada textual visível; poster é complementar.
- Busca e filtros complementam a descoberta inicial, sem substituir a apresentação do conjunto.
- Contexto e tecnologia são facetas distintas; produto/tipo não é misturado com contexto.
- Cada faceta usa um menu separado com busca e seleção múltipla. A implementação deve preferir inputs checkbox nativos agrupados em disclosure nativo, evitando um widget ARIA combobox/listbox personalizado quando o conjunto de opções inclui controles checkbox interativos. Os rótulos visíveis “Search for”, “Context” e “Technology” ficam acima dos respectivos controles.
- Os menus Context e Technology são mutuamente exclusivos quanto ao estado aberto: abrir um fecha o outro; valores marcados e busca interna de opções permanecem ao alternar entre facetas. Fechar e reabrir o mesmo menu também preserva esse estado.
- Valores múltiplos da mesma faceta usam OR; busca e facetas entre si usam AND.
- Tecnologia/tag não aparece como chip no resumo compacto; continua indexável para busca, selecionável no filtro e visível em More details.
- More details agrupa contexto, contribuição, período, tipo, foco de engenharia, tecnologias, ações e mídia complementar em rótulos consistentes, omitindo grupos vazios; mídia principal fica na entrada recolhida; GIFs não ficam reduzidos a um link para outra aba.
- Cabeçalho de `/projects/` reutiliza a composição e o texto da seção “More Projects” na Home — eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e texto de apoio existente — e abandona a apresentação anterior; divisores das entradas mantêm o mesmo ritmo e tratamento visual.
- Disclosures são independentes e podem permanecer abertos juntos; ocultar uma entrada filtrada também oculta seus detalhes.
- IDs permanecem estáveis. Ao abrir um hash de projeto, o catálogo deve limpar critérios incompatíveis antes de posicionar o destino, para que deep links antigos continuem visíveis.
- Sem JavaScript, todos os registros e links continuam disponíveis; filtros interativos ficam ocultos ou indisponíveis, sem sugerir que funcionam.
- A mídia principal aprovada aparece à esquerda da identidade/descrição na entrada recolhida em telas largas e acima delas em celular; realizar revisão visual antes de tratar a implementação como aprovada para merge/push.

## Complemento de entradas — desenho 2026-10-05

### Phase 0 — decisões e referências

Reutilizar `ProjectMediaPreview.astro`, `ArchiveMedia.astro` e o contrato 003, sem dependência nova. A referência de identidade é `RichProjectRecord.astro` em `6679f07`; autoplay próximo ao viewport vem de `b0daafa`. Ver [research.md](research.md). Não criar regra global de pausa inicial, não disparar GIF por expansão, nem adicionar descarregamento ao sair da tela.

### Phase 1 — contrato e fluxo de dados

- `ProjectRecord.astro`: composição comum de mídia principal/identidade/resumo/disclosure. Remover contexto, período e teaser de contribuição da área recolhida, preservando-os nos detalhes e no corpus pesquisável.
- `projects.ts`: conservar dados originais e `identityImage`; se necessário, expor esse campo opcional na projeção pública sem inferir identidade a partir do fallback do GIF.
- `projects/index.astro`: resolver mídia e identidade elegíveis separadamente, com referências explícitas a fontes canônicas em registro documental. A lista de mídia aprovada está vazia hoje; não preencher automaticamente a partir da existência de arquivos. Se não houver prova suficiente, manter a entrada textual e documentar a lacuna.
- Selecionar primeira mídia principal elegível na ordem editorial; demais mídias elegíveis vão aos detalhes. GIF requer fallback estático válido. Não duplicar o mesmo asset como mídia principal e complementar.
- `global.css`: desktop em duas colunas, celular empilhado; sem mídia, uma coluna sem espaço reservado. Ícone 52×52, raio 10px, borda existente, fit cover e gap 14px. Preservar cabeçalho, entrelinha compartilhada de 24px e margem superior aprovada, sem alterar Home/cases.
- Mídia mantém loading lazy do fallback, GIF sem src inicial, aproximação por IntersectionObserver com rootMargin de 75% da altura da janela, acionamentos e configuração existentes, load/decode antes da troca, fallback em falha e movimento reduzido, controles de parar/reproduzir. Só ajustar componente compartilhado se necessário e verificar regressão nos usos existentes.
- Sem JS, fallback e disclosure nativo continuam úteis; nome/estado acessível, foco visível, ícone decorativo e uma única descrição de mídia anunciada.

### Gates pós-desenho

Os nove princípios da constituição continuam atendidos pelo desenho: evidência individual para mídia/ícone; composição compartilhada; preservação do cabeçalho; controles acessíveis; conteúdo base sem JS; validação em desktop/tablet/celular; escopo local; diff/check/build e inspeção real na implementação; revisão humana antes de merge/push. PASS é avaliação do plano, não comprovação de implementação.

### Estratégia e validação

MVP: resolver elegibilidade e construir entrada recolhida responsiva; depois completar detalhes e regressões de filtros, acessibilidade e mídia. Usar [quickstart.md](quickstart.md), registrar resultados novos separadamente em evaluation.md, com viewports realmente utilizados. Evidências antigas e tarefas concluídas são históricas, não aprovação do complemento. `tasks.md` terá fase adicional para a mesma feature; a atualização deste plano substitui apenas as decisões antigas de localização da mídia/metadados.

### Decisão posterior de reutilização (2026-10-05)
O usuário confirmou reutilização dos pôsteres/GIFs já apresentados no baseline 6679f07: Ello Learn, Read With Ello, Pathless e Wallace’s Quest. A omissão temporária e lista vazia descritas anteriormente são histórico anterior à resposta. A implementação usa allowlist exata registrada em evaluation.md, mantendo configurações do inventário. Outras fontes continuam sujeitas à documentação; não presumir autorização de novos assets. Ver spec.md, Confirmação de reaproveitamento.

## Desenho vigente — Selected contributions — 2026-10-05

### Phase 0 — pesquisa e decisões

Base: docs/projects-catalog-hiring-review.md e fontes canônicas registradas na spec. Nenhuma tecnologia nova, serviço, banco ou pesquisa com participantes é necessária. A pesquisa já existente fundamenta a hipótese editorial; não mede ganhos de contratação. Decisões e alternativas estão no complemento de research.md.

### Phase 1 — projeção e apresentação

- Manter fontes e consumidores atuais de Home/cases. Em `src/data/projects.ts`, definir `CatalogEditorialContent` e um mapa `catalogEditorialById` de conteúdo exclusivo do catálogo, indexado pelo ID existente. Não substituir globalmente product/contribution/specs usados por outros consumidores.
- Campos da projeção: `summary`, `facts` (role/context/productType/period), `contributionNarrative` opcional (summary/highlights/outcome), `additionalContext` opcional e tecnologias/actions existentes preservadas. `TechnicalHighlight` contém title/body, sem atributo que implique autoria por padrão. Tipos/regras completos em data-model.md.
- Em `src/pages/projects/index.astro`, resolver a projeção para cada registro. Para ID sem narrativa revisada, aproveitar descrição/fatos verificados, sem gerar narrativa por concatenação ou converter engineeringFocus em claim individual. Não remover registros por ausência de narrativa.
- `ProjectRecord.astro` recebe a projeção do catálogo e mantém entrada recolhida. Detalhes ocupam segunda linha de largura disponível: fatos → Selected contributions quando disponível → tecnologias/metadados úteis → mídia complementar quando existente → ações. Contexto adicional necessário acompanha narrativa, sem bloco Product obrigatório. Descrição curta deve ser editada explicitamente; fallback inicial pode usar resumo existente sem implicar aprovação editorial nova.
- Preservar botão junto à descrição no fluxo com JS, estado acessível e disclosure nativo na segunda linha sem JS. Nenhum framework de UI novo.
- O script atual indexa texto público renderizado; manter a derivação após todos os detalhes renderizados, incluindo títulos/body dos highlights. Não incluir campos internos de evidência, texto removido ou fontes privadas no DOM. Preservar OR/AND, normalização, total, ordem, hashes e expansão independente.
- CSS escopado a `.archive-content`: fatos compactos e highlights com quebra natural; manter mídia 300px/altura flexível, cabeçalho/24px/espaçamentos, divisores e ausência de novos limites de largura. Não alterar componentes compartilhados de mídia por este complemento.

### Mídia: política vigente

A allowlist atual das quatro fontes históricas permanece exata, com identidade/fallback/preview separados. Reutilização é decisão do usuário, não prova de direitos. Nenhuma nova fonte é promovida. Preservar near-viewport/autoplay/fallback/reduced motion e ausência de Stop/Play em todas as superfícies. Revisão editorial não resolve direitos ainda não documentados nem certifica acessibilidade do movimento contínuo.

### Gates atuais, antes e depois do desenho

| Princípio | Resultado do desenho vigente |
| --- | --- |
| I — Evidência | Conteúdo novo requer matriz de claims/fontes e limites; não afirmar direitos demonstrados para reutilização histórica. Lacunas de mídia já registradas permanecem. |
| II / III — Padrões e sistema aprovado | Uma composição/projeção comum; cabeçalho e estilos aprovados preservados. |
| IV / V — Acesso e conteúdo base | Narrativa semântica, teclado/foco, fallback e redução de movimento preservados; disclosure nativo sem JS. Nenhum controle de animação em nenhuma página por decisão do usuário. Não declarar conformidade integral do autoplay. |
| VI — Responsividade | Planejada em 320/390/820/1280; execução e evidências posteriores. |
| VII — Escopo | /projects/ e projeção exclusiva; nenhuma alteração editorial na Home/cases. |
| VIII / IX — Validação e revisão | Diff/check/build, revisão editorial, acessibilidade/reflow e aprovação humana posterior; nenhum resultado presumido. |

Nenhum gate novo do desenho editorial exige alterar constituição ou decisões do usuário. Limites herdados não são certificados como PASS; permanecem explícitos para revisão. Sem unknown técnico pendente.

### Sequência e validação

Documentos → matriz dos 19 registros → projeção → narrativa/fatos → renderização/estilos → revisão editorial → regressões de descoberta/acesso/links → diff/check/build → revisão humana. SC-001–SC-024 são consolidados na matriz única de quickstart.md; não executar duas vezes cenários equivalentes apenas por dois IDs. Implementação e validação do desenho não foram executadas nesta rodada.
