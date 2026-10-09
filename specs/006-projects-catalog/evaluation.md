# Evaluation Record: Projects Catalog

This record tracks implementation validation against SC-001–SC-013, including the clarification updates and convergence work. No participant study or before/after usability comparison is in scope.

**Current behavior note (2026-10-05):** entries below that mention Stop/Play or pause controls are observations of an earlier implementation and remain here as historical evidence only. The user later requested removal of animation controls from every page; those controls are not current requirements. The code and all site surfaces should be checked for their absence if this criterion is revisited.

## Success criteria

| Criterion | Validation evidence | Status | Notes |
|---|---|---|---|
| SC-001 — Recognizable entry for every published project | Browser accessibility tree; 19 records and matching initial total | Pass | Checked count and visible project identities in editorial order. |
| SC-002 — Search matches and counts | Browser search: `pathless`, `fluencia`, and `radio scanner` | Pass | Partial name, accent-insensitive name, and contribution text inside closed details each returned one record. |
| SC-003 — Facet OR/AND behavior and reset | Browser filter controls | Pass | Professional + Independent returned 18/19; Unity returned 10/19; Unity + Flutter returned 11/19 (OR within Technology); Professional + Unity returned 6/19 (AND across facets). Clear-all restored 19/19. |
| SC-004 — Result count and empty-state recovery | Browser no-match query and empty-state clear action | Pass | `no-such-project-term` showed 0/19 and a useful recovery action; clearing restored 19/19. |
| SC-005 — Essential content/links remain available without optional behavior | Chrome DevTools Protocol with script execution disabled | Pass | All 19 project entries, 19 native `<details>` disclosures, and 41 project links remained in the rendered DOM; filter controls retained their `hidden` attribute. |
| SC-006 — Keyboard, focus, names, state and assistive technology | Keyboard walkthrough, focus style inspection, Chromium accessibility tree | Pass | Search, facets, clear-all, and project details were keyboard-operable; focus outlines were visible (2–3 px). The accessibility tree exposed names, checkbox selection, expanded disclosure state, and the polite result count. Spoken output from a screen reader was not tested. |
| SC-007 — Responsive layout without overlap or page-level horizontal scrolling | Chrome viewport checks at 320 × 860, 390 × 844, 768 × 1024, and 1280 × 900 | Pass | No page-level horizontal overflow at any measured size. Opening a facet and project details at 320 px also remained within the viewport. The 320 px check exposed the global `body` minimum width; removing it fixed the overflow. No catalog media is currently approved, so media-column reflow could not be exercised. |
| SC-008 — Home-aligned page heading and supporting copy | Browser visual inspection | Pass | Eyebrow, title, and supporting sentence now follow the Home section-heading pattern. |
| SC-009 — Technology chips appear only inside expanded details | Browser accessibility tree for expanded Ello 2.0 and Read With Ello | Pass | No technology chips appear in compact rows; verified technologies are grouped inside Project details. |
| SC-010 — Verified media appears inline and unverified media stays absent | Canonical-doc audit and catalog media allowlist inspection | Partial | All four declared candidates remain excluded because neither canonical source documents provenance/authorization. No approved media exists to exercise inline playback, static fallback, or pause controls. |
| SC-011 — Consistent project separators | Shared catalog CSS inspection | Pass | One border thickness/color/spacing rule applies to every record, including hash targets. |
| SC-012 — Separate searchable multi-select Context and Technology controls | Browser interactions and accessibility tree | Pass | Both native disclosures open independently; selecting Professional + Independent returns 18/19, and Unity returns 10/19. |
| SC-013 — Facet option search does not itself filter projects | Browser interactions and screenshot | Pass | Technology option search reduced visible options without changing 19/19; a no-match option query showed local guidance while preserving 6/19 filtered projects. |

## Manual scenarios

| Scenario | Result | Evidence / notes |
|---|---|---|
| Catalog inventory and unfiltered total | Pass | Browser tree showed all 19 names and initial count 19/19. |
| Search and facet matrix | Pass (manual functional subset) | Rechecked Context OR (Professional + Independent = 18/19), Technology filtering (Unity = 10/19), Technology OR (Unity + Flutter = 11/19), and cross-facet AND (Professional + Unity = 6/19). Per-facet search left project totals unchanged; no-match option messaging appeared; project no-match showed 0/19 and clear-all restored 19/19. Earlier recorded name, accent-insensitive, and contribution-text queries remain valid. |
| Empty state and clearing criteria | Pass | No-match message appeared; its clear button restored 19/19. |
| Details, media, case/action links and deep links | Partial | Two project details expanded independently; technology, metadata, App Store/Google Play/promo links and a case-study link were present. Direct `#pathless` loaded with its stable target, and navigation to `#pathless` while Professional hid it cleared the incompatible filter and restored 19/19. All 4 case routes exist in the production build. No media candidate is approved, so archive inline playback/fallback/pause behavior has no record to validate. |
| Keyboard and screen-reader feedback | Pass (keyboard and accessibility-tree validation) | Traversed the skip link, navigation, search, facet triggers, clear-all, project links, and details without a focus trap; outlines were visible. Space selected Professional and updated the result count to 13/19. Enter independently opened and closed Project details. Chromium’s accessibility tree exposed accessible names, checked/expanded states, and the result text. Spoken output was not tested with a physical screen reader. |
| Reduced motion and animated-media pause/static alternative | Pass (browser emulation) | Existing Stop/Play control behavior was confirmed. Chrome DevTools emulated `prefers-reduced-motion: reduce` on Home: three previews kept their static posters and accurate alt text, animation sources remained unloaded, and available controls reported the reduced-motion pause state and were disabled. |
| JavaScript disabled | Pass (Chrome DevTools Protocol) | Script execution was disabled before loading `/projects/`. All 19 project entries, 19 native details disclosures, and 41 project links remained available. Filter controls stayed hidden, so no inactive filtering UI was presented. |

## Media provenance audit (T030)

| Candidate record | Candidate sources in `src/data/projects.ts` | Provenance and authorization in canonical docs | Outcome |
|---|---|---|---|
| Wallace’s Quest | Static WebP poster and gameplay GIF | Not documented in `docs/stage-10-content-register.md` or `docs/repository-evidence-pass.md` | Excluded from `/projects/` |
| Read With Ello | Static WebP poster and gameplay GIF | Not documented in the canonical docs | Excluded from `/projects/` |
| Pathless | Static WebP poster and gameplay GIF | Not documented in the canonical docs | Excluded from `/projects/` |
| Learn With Ello | Static WebP poster and gameplay GIF | Not documented in the canonical docs | Excluded from `/projects/` |

Coverage: all four project media entries currently declared for the catalog were checked against both canonical documents; none has verified provenance and authorization there. The content register explicitly defers rights checks to media integration. Asset existence, alt text, public project links, and source-availability notes do not establish media rights. The page implementation must therefore keep all four candidates out until evidence is recorded. This audit does not remove media from Home or case-study pages.

## Viewports actually tested

| Device category | CSS viewport width | Result / notes |
|---|---:|---|
| Narrow mobile | 320 × 860 px | Pass after removing the global 320 px body minimum; no horizontal overflow with Context and project details open |
| Representative phone | 390 × 844 px | Pass; all 19 entries visible and no horizontal overflow |
| Tablet | 768 × 1024 px | Pass; both filter controls and catalog reflow without horizontal overflow |
| Desktop | 1280 × 900 px | Pass; catalog and details fit without horizontal overflow |

## Build and diagnostics

| Command | Result | Notes |
|---|---|---|
| `npm run check` | Pass | 0 errors, 0 warnings, 2 existing hints (CommonJS suggestion in `make_contact_sheets.js`; unused `index` in `FeaturedProject.astro`). |
| `npm run build` | Pass | Static build generated 7 pages, including `/projects/` and the 4 case routes. |
| `git diff --check` | Pass | Exit code 0; Git reported only existing LF-to-CRLF normalization notices for Astro files. |

## Outstanding issues and limitations

- Archive media and poster identities are omitted from `/projects/` because the canonical evidence documents do not establish provenance/authorization for the current media sources. Show a GIF/image only after that evidence is recorded; the planned inline media layout is user-confirmed.
- Spoken screen-reader output was not exercised; accessibility names, checkbox/disclosure states, and live result text were verified in Chromium's accessibility tree. No approved media source exists for `/projects/`, so its inline media layout and playback controls remain unexercised until provenance and authorization are documented.
- No before/after participant study was performed. Manual browser checks are implementation evidence only.

## Revalidação — Fase 11 (2026-10-05)

| Cenário | Resultado | Evidência / observações |
|---|---|---|
| Cabeçalho editorial e texto de apoio | Pass | A árvore de acessibilidade da página `/projects/` expôs o eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o texto de apoio solicitado, com os links de contexto Back e Contact. |
| Rótulos e nomes acessíveis dos filtros | Pass | “Search for”, “Context” e “Technology” aparecem antes dos controles correspondentes. A árvore acessível anunciou os nomes e estado expandido/recolhido dos seletores. |
| Exclusividade dos seletores | Pass | Abrir Technology após Context recolheu Context; a árvore acessível mostrou somente Technology expandido. Seleções e pesquisa local foram mantidas pelo tratamento não destrutivo de fechamento. |
| Viewports desta rodada | Parcial | Inspecionado no viewport desktop atualmente aberto no navegador integrado. Não redimensionei para celular/tablet nesta rodada; consulte a seção anterior para medições históricas, que não são atribuídas a esta revalidação. |

## Build e diagnósticos — Fase 11

| Comando | Resultado | Observações |
|---|---|---|
| `npm run check` | Pass | 0 erros, 0 warnings e 2 hints existentes (sugestão CommonJS em `make_contact_sheets.js`; `index` não usado em `FeaturedProject.astro`). |
| `npm run build` | Pass | Build estático gerou 7 páginas, incluindo `/projects/` e as quatro rotas de cases. |
| `git diff --check` | Pass | Exit code 0; Git emitiu avisos de normalização LF/CRLF para arquivos Astro. |

Limite desta rodada: não foi feita inspeção com leitor de tela falante nem revalidação em viewports mobile/tablet. A análise da árvore de acessibilidade não substitui validação com tecnologia assistiva.

## Complemento de entradas — implementação 2026-10-05

### Baseline e elegibilidade (T048–T050)

Antes: contexto/período/contribuição na entrada e mídia dentro dos detalhes. Cabeçalho já implementado, entrelinha 24px aprovada pelo usuário; T040–T043 cobertos por código/capturas da Fase 11 e nova inspeção. Nenhum novo asset/conteúdo foi criado.

Inspecionados docs/stage-10-content-register.md, docs/repository-evidence-pass.md, docs/media-guidelines.md e fontes de src/data/projects.ts. Os documentos confirmam referências públicas, responsabilidades e padrões de mídia, mas não autorização/provenance individual dos arquivos de identidade/preview. Para cada conjunto existente (Wallace’s Quest, Read With Ello, Pathless, Ello Learn), a decisão nesta rodada é **não elegível por documentação insuficiente**: pôster identityImage, first-frame WebP e GIF permanecem omitidos. Demais projetos não recebem mídia inferida. approvedCatalogMedia e approvedCatalogIdentity permanecem vazios; ausência de assets elegíveis não é aprovação implícita. Dados originais permanecem preservados.

### Implementação

ProjectRecord usa primeira mídia elegível como principal antes do bloco de identidade/texto, complementares nos detalhes, fontes duplicadas removidas e GIF sem poster omitido. Ícone recebe fonte aprovada separadamente, alt vazio e 52×52; CSS restaura borda/raio10px/gap14px. Variante sem mídia não reserva coluna. Entrada recolhida exibe nome, resumo e Project details; contexto, tipo, período, contribuição, engenharia, tecnologias e links ficam nos detalhes. Product adicional apresenta só o restante da descrição, sem repetir o resumo. Stack/Engine/Tools são representados por tecnologias e não repetidos como specs. IDs, cases, filtros e dados originais preservados.

ArchiveMedia/ProjectMediaPreview são reutilizados sem alteração de código compartilhado; os comportamentos existentes de near-viewport, fallback, autoplay, Stop/Play e reduced motion foram inspecionados em fonte, não revalidados com mídia no catálogo vazio. Sem JS, markup nativo conserva texto/disclosures; teste real com JS desativado ainda pendente.

### Evidências executadas no navegador integrado

| Cenário | Resultado real |
|---|---|
| Estado inicial | 19 registros, contador Showing 19 of 19 projects, sem mídia não aprovada. |
| Reflow recolhido e expandido | 320, 390, 820, 1280 CSS px; document.scrollWidth não supera innerWidth. Duas expansões simultâneas verificadas nessas quatro larguras. |
| Busca | Ello=2, Unity=11, GraphQL (espaços/caixa alta)=2, lingua portuguesa=1, LÍNGUA PORTUGUESA com espaços=1, Pathless=1; contagem coincide com registros visíveis. GraphQL está nos detalhes e continua pesquisável recolhido. |
| Vazio e limpeza | Consulta no-matching-xyz produz 0/19 e mensagem concisa; Clear all filters restaura 19/19. |
| OR/AND | Professional + Independent =18/19; combinados com Unity=10/19, todos correspondem a um contexto selecionado e à tecnologia. |
| Busca local da faceta | Consulta sem opções mantém contador 10/19 e mostra vazio local; valores selecionados preservados. |
| Menus e rótulos | Em 390 e 1280px, abrir Technology fecha Context, rótulos ficam acima de summary e sem overflow; seleções de Context preservadas. |
| Detalhes/teclado | Enter em summary expande; duas entradas abertas simultaneamente; foco em SUMMARY com outline solid. Conteúdo adicional, contexto, período, contribuição e tecnologias verificados no primeiro registro. |
| Cases | Quatro destinos existentes verificados no DOM: read-with-ello, ilhas-do-alfabeto, craque-da-fluencia, wallaces-quest. Não foram abertos destinos externos. |
| Hash | Carga direta #pathless revela registro, contador 19/19; preservação do ID confirmada. Navegação hash dinâmica enquanto filtrado ainda não reexecutada. |
| Cabeçalho | Entrelinha computada 24px em todas as larguras; código do cabeçalho e margem superior não alterados. |

Captura local: artifacts/screenshots/catalog-entry-review.jpg (arquivo temporário ignorado no Git).

### Validação técnica

- npm run check: 0 erros, 0 warnings, 2 hints já existentes (make_contact_sheets.js CommonJS; index não usado em FeaturedProject).
- npm run build: sucesso, 7 páginas estáticas.
- git diff --check: sucesso na rodada antes deste registro; normalização LF/CRLF é aviso, não erro.

### Pendências reais e critérios

SC-001–SC-004/SC-008–SC-009/SC-011–SC-017/SC-019: conteúdo/comportamentos principais cobertos pelas verificações acima, com exceções explicitadas (mídia ausente e inspeção não exaustiva de todos os destinos). SC-007 tem reflow nas quatro larguras com registros textuais reais; variante com mídia não foi exercitada. SC-010/SC-016/SC-018 com mídia não foram executados porque não há fonte elegível. SC-005/SC-006 continuam parciais: falta execução sem JS e leitor de tela falante; árvore/DOM e ativação por teclado não substituem essas verificações.

T053/T055/T058/T060 permanecem pendentes por cobertura parcial das matrizes completas; T044 continua parcial. T062 registra comandos efetivos, não aprovação de todos os critérios. T063 aguarda revisão humana deste novo layout; aprovação anterior do cabeçalho não aprova entradas novas. Não há merge/push/commit nesta rodada.

Verificação adicional: com consulta sem resultados ativa, navegação para /projects/#pathless limpou a busca e restaurou 19/19, revelando o alvo; nenhum link de ação possui href ausente. Captura final mostra catálogo no topo. A pergunta sobre documentação de autorização foi enviada ao usuário; nenhuma mídia foi habilitada aguardando essa fonte.

## Reaproveitamento confirmado pelo usuário — 2026-10-05

Resposta à pergunta de elegibilidade: o usuário confirmou que os pôsteres e GIFs já eram apresentados antes nesta branch e pediu reaproveitar esse conjunto. A decisão anterior de omissão por falta de novo registro é superada por essa instrução explícita, limitada às fontes do baseline 6679f07. Não foi inferida permissão para novos assets nem afirmada prova adicional de direitos de terceiros.

Allowlist reaproveitada, com pôster / fallback / animação:
- Ello Learn: /projects/ello-learn/ello-learn-poster.webp; /projects/ello-learn/ello-learn-first-frame.webp; /projects/ello-learn/ello-learn-gameplay-preview.gif.
- Read With Ello: /projects/ello-read/read-with-ello-poster.webp; /projects/ello-read/read-with-ello-first-frame.webp; /projects/ello-read/read-with-ello-gameplay-preview.gif.
- Pathless: /projects/pathless/pathless-poster.webp; /projects/pathless/pathless-first-frame.webp; /projects/pathless/pathless-gameplay-preview.gif.
- Wallace’s Quest: /projects/wallace-quest/wallace-quest-poster.webp; /projects/wallace-quest/wallace-quest-first-frame.webp; /projects/wallace-quest/wallace-quest-gameplay-preview.gif.

Dados de configuração são os mesmos do inventário; novas fontes não entram automaticamente. No browser, quatro mídias principais e quatro ícones confirmados; caixas dos ícones 52px. No topo, Ello Learn e Read With Ello carregaram animação; Pathless a y=2615px e Wallace a y=3212px mantiveram fallback e img animado sem src, comprovando adiamento para previews distantes. Stop no primeiro preview remove src, restaura fallback e muda controle para Play; reprodução reativada. Com mídia: 320/390px uma coluna, 820/1280px duas colunas, sem overflow em todas as larguras, entrelinha do cabeçalho 24px. Captura: artifacts/screenshots/catalog-media-review.jpg.

Ainda não executados nesta rodada: mídia bloqueada/rede lenta, movimento reduzido inicial/dinâmico, ausência de observer, leitor de tela falante e JavaScript desativado. Essas pendências permanecem em T058 e revisão humana em T063. A aprovação de reaproveitar fontes não equivale à aprovação do novo layout.

## Implementação editorial — 2026-10-05

Código: projeção exclusiva catalogEditorialById em src/data/projects.ts, consumo somente na rota /projects/ e apresentação My contribution em ProjectRecord. Home/cases conservam dados originais. Mídias/allowlist/controladores não foram alterados. Cabeçalho e CSS de geometria não foram editados; estilos novos limitados a heading/lista editorial.

### Matriz dos 19 registros

Fonte L = dados públicos anteriores em src/data/projects.ts, limitados por docs/stage-10-content-register.md e docs/repository-evidence-pass.md; não representa nova auditoria de repositório privado. Fontes canônicas N estão vinculadas na seção Fontes consultadas da spec. Apenas quatro narrativas receberam novos destaques; contribuições curtas já publicadas foram preservadas, sem inferir mecanismos adicionais.

| Registro | Fonte / conteúdo aproveitado | Limites e apresentação |
| --- | --- | --- |
| Ello Learn | N Ello 2.0 + L; quests/rewards, agent integration, parent gate | 2 destaques, sem ownership integral de backend/ML/speech/release; Sep–Nov2025; Type sem stack. |
| Read With Ello | N Read With Ello + L; Library/quests/client GraphQL | 2 destaques; Unity client, não backend/speech/release; case preservado. |
| Tabuada | L; contribuição minigames/tutorials/farm/progression | Parágrafo anterior, zero destaques; nenhum resultado novo. |
| Craque da Leitura | L; produto de leitura e organização | Sem contribuição atribuída; facts/actions existentes. |
| Flui | L; gameplay/minigames/maintenance | Parágrafo anterior, zero destaques; sem liderança inferida. |
| Ilhas | L + Stage10; Desafio/shared systems | Parágrafo existente, zero destaques; não ampliar ownership; case preservado. |
| Craque da Fluência | L + Stage10; word model/assessment/integration | Parágrafo existente, zero destaques; não criar autoria recognition engine; case preservado. |
| Avaliação da Língua Portuguesa | L; produto interativo de avaliação | Sem contribuição atribuída/período inventado; Type sem Unity. |
| Avaliação Diagnóstica | L; school assessment | Sem contribuição/período inventados; ações existentes. |
| IAB Testes | L; tablet assessment/Cedro | Sem contribuição/período inventados. |
| IAB Digital | L; early-childhood platform/Cedro | Sem contribuição/período inventados. |
| MyPush | L; mobile client/service product | Sem contribuição/período inventados; contexto genérico conservado. |
| MVIF | L; inventory/business workflow | Sem contribuição/período inventados; contexto genérico conservado. |
| Pathless | N Pathless + L; scanner/HUD, assistance/rescue/mission | 2 destaques; calamity/scene shared; período inclui post-jam Aug–Sep2026; não alegar tudo no deadline binary. |
| RadWasteland | L; Ludum Dare55 solo/product | Sem contribuição inferida pelo contexto solo; facts/actions existentes. |
| Sweets and Shadows | L; MiniJam144/team2/72h | Sem converter Development/design em claim detalhada; produto action game. |
| Wallace | N Wallace + L; turn/completion/grid module | 2 destaques; 2020–2021 revisited2026; não current combat/optimal A*/performance; case/actions existentes. |
| Angry World | L; Ludum Dare38/space action | Sem autoria inferida; actions existentes. |
| Survive & Escape | L; Windows puzzle study | Type sem stack; C++/raylib em Technology; sem contribuição/período inventados. |

Retiradas repetições obrigatórias Product/Contribution/Engineering focus. Descrições dos quatro registros completos revisadas explicitamente; demais descrições existentes preservadas integralmente. Sem outcomes quantitativos ou novos CTAs. Rastreabilidade acima permanece interna e não é renderizada/indexada.

### Resultados efetivamente obtidos

- Astro check: 0 erros, 0 warnings, 2 hints preexistentes (make_contact_sheets.js e FeaturedProject.astro).
- Production build: sucesso, sete páginas, quatro cases existentes gerados.
- git diff --check: passou; mensagens CRLF não são erro de whitespace.
- DOM do catálogo: 19 registros; 8 My contribution (quatro com dois highlights, quatro somente parágrafo); restantes sem seção vazia; quatro hrefs de cases corretos.
- Busca Request coordination: 1/19; texto inexistente: 0/19; clear: 19/19.
- Context Independent OR Study: 6/19; AND Technology C#: 2/19; apenas um menu aberto, seleções preservadas.
- Teclado Enter abre/recolhe Read With Ello; foco visível. Duas entradas abertas simultaneamente confirmadas.
- Deep link #pathless carregado e registro localizado; lista19 restaurada. Não executada matriz inteira de hashes sob filtros.
- 320/390/820/1280px com Ello Learn expandido: sem overflow horizontal; detalhe abaixo de mídia/conteúdo e mesma largura do article (257/327/757/1200px). Cabeçalho support line-height24px observado. Viewport restaurado.
- Árvore de acessibilidade expõe h3/lista/fatos/estado de expansão; isso não equivale a teste com leitor de tela real.

### Pendências honestas

Não executados nesta rodada: leitor de tela real, toque físico, JS desativado no navegador, rede lenta/GIF bloqueado, observer indisponível, movimento reduzido inicial/dinâmico e matriz completa de hashes/filtros. Não declarar SC-001–SC-024 integralmente aprovado. T075/T076/T077 e pendências históricas de validação conservam status incompleto quando seu cenário total não foi executado. T078 e T063 dependem de revisão humana; nenhuma aprovação foi presumida. Nenhum merge/push/commit realizado.

### Revisão de rótulo e amplitude — 2026-10-05

### Auditoria de período e escopo entre superfícies — 2026-10-05

| Projeto / fase | Registro central (`src/data/projects.ts`) | Case existente | Experience | Evidência local e decisão |
| --- | --- | --- | --- | --- |
| Read With Ello | O intervalo anterior `Oct 2022–Aug 2025` não tem fonte de período específico do projeto nos documentos locais. Role e tecnologias confirmadas (`Unity`, `C#`, `uGUI`, `Addressables`, `GraphQL`, `Firebase`, `GrowthBook`) permanecem. | Case existente; histórias de Library, quests e GraphQL delimitam trabalho no cliente Unity e colaboração, sem afirmar propriedade de todo o produto. Removido `Period` dos campos de visão geral. | Relacionado ao emprego na Ello, `Oct 2022–Dec 2025`; isso é período do vínculo, não do produto/projeto. | `docs/stage-10-content-register.md` confirma o intervalo de emprego e limites das contribuições. `docs/other-work-inventory.md` declara que as datas do projeto não estão listadas. Período próprio removido; período do emprego preservado.
| Ello 2.0: Learn Reading & Math | O intervalo anterior `Sep–Nov 2025` não tem fonte de período específico do projeto nos documentos locais. Role, Flutter/Dart/Python/GraphQL/Protocol Buffers/GrowthBook/Provider e contribuição documentada permanecem. | Não há case próprio nem foi criado. | Relacionado ao emprego na Ello `Oct 2022–Dec 2025`; não representa as datas do projeto. | `docs/other-work-inventory.md` diz que o período específico não é mostrado e que o registro representa continuidade do produto; `docs/repository-evidence-pass.md` registra que escopo individual distinto ainda não estava estabelecido. Removido o período sem fonte. A relação existente em Experience e o conteúdo atual não foram removidos; a atribuição individual mais detalhada permanece limitada pelas fontes e requer revisão editorial se a classificação do produto mudar.
| Wallace’s Quest | `2020–2021 · revisited 2026`; tecnologias Unity/C#/Tilemap/ScriptableObjects/uGUI e fatos do projeto preservados. | Case existente diferencia combate/coordenação em 2020 e módulo de pathfinding em 2021, retomado em 2026. | Não há vínculo de emprego correspondente; nenhum item de Experience foi criado. | `docs/stage-10-content-register.md` e `src/data/projects.ts` mantêm a distinção de fases e limites de autoria; período permanece qualificado, sem achatar revisita na fase original.

O alinhamento não preenche lacunas: datas da empresa não são copiadas para projetos, os quatro cases permanecem os já publicados e diferenças de escopo sem evidência suficiente ficam registradas como pendência editorial.

### Implementação e verificação — 2026-10-05

#### Mudanças aplicadas

- A taxonomia central exporta `getTechnologyFacetTags`, que converte somente valores factuais estruturados `Unity`/`Unity <versão>` para a única faceta `Unity`. A ficha continua exibindo o valor exato registrado (`Unity 6` em Pathless); a busca do catálogo e o filtro recebem a mesma projeção.
- Cartões simples de More Projects exibem agora o título sob a miniatura, em estado padrão, sem depender de hover/foco. Cartões destacados não foram alterados.
- `/projects/` deixou de aninhar um segundo `<main>` dentro do landmark de `BaseLayout`; o catálogo é uma section nomeada por All Projects. Escape fecha a faceta aberta e devolve foco ao seu summary.
- A restauração da posição usa um limite de espera de 3,5s, libera o estado de restauração mesmo se as fontes demorarem, tolera ausência/rejeição de Font Loading API, e as operações de `sessionStorage` da navegação falham abertas quando indisponíveis.
- Períodos próprios de Read With Ello e Ello 2.0 foram removidos das fichas e da visão geral do case Read With Ello por falta de fonte local de datas de projeto. Experience mantém Ello `Oct 2022–Dec 2025` como duração do emprego. Wallace mantém `2020–2021 · revisited 2026` e os marcos descritos no case.

#### Evidência de runtime observada

| Cenário | Condição observada | Resultado |
| --- | --- | --- |
| Catálogo inicial | `/projects/`, browser local em viewport padrão (captura observada: 802×868) | 19/19 entradas visíveis; títulos e detalhes recolhidos; nenhum filtro ativo. |
| Busca e faceta Unity | Busquei `Unity` dentro de Technology; havia uma única opção correspondente. Selecioná-la atualizou o contador para 11/19 e manteve Pathless visível. O fato exato `Unity 6` continua nos detalhes. |
| Busca sem acentos | Pesquisa `avaliacao` | 2/19 resultados: Avaliação da Língua Portuguesa e Avaliação Diagnóstica. |
| Teclado/faceta | Abri Context e pressionei Escape | A faceta fechou e o foco retornou ao seu botão summary. Foco visível e leitor de tela dedicado não foram medidos nesta rodada. |
| Expansão / campo ausente | Expandi Ello 2.0: Learn Reading & Math | Role, Context e Type foram mostrados; não apareceu Period sem fonte. Selected contributions, highlights, tecnologia e três ações existentes foram apresentados. |
| Títulos na Home | More Projects em estado padrão, sem hover; verificação da árvore de acessibilidade e captura de tela | Pathless, Flui e Tabuada na Fazenda têm headings visíveis sob as miniaturas; nome não depende da imagem. Selected work manteve seus títulos atuais. |
| Estrutura de landmarks | Inspeção de source + build | BaseLayout fornece o único `<main id="main">`; a página do catálogo agora usa `<section aria-labelledby="projects-heading">`. Não foi feita auditoria de árvore de landmark com tecnologia assistiva real. |

#### Diagnósticos

- `git diff --check`: passou; apenas avisos de conversão LF→CRLF do Git em arquivos com finais de linha mistos.
- `npm run check`: 0 erros, 0 warnings e 1 hint preexistente (`make_contact_sheets.js`, CommonJS convertido para ES module).
- `npm run build`: passou; 7 páginas estáticas foram geradas, incluindo `/projects/` e os quatro cases existentes.

#### Cobertura restante, ainda não validada

- Não executados: viewports controlados de 320/390/820/1280px e zoom; JavaScript desligado; leitor de tela real e toque físico; rede lenta/bloqueio de GIF, pedido de rede distante/próximo, falhas load/decode, ausência de IntersectionObserver e `prefers-reduced-motion` inicial/dinâmico; retorno repetido à posição salva com fontes lentas/falhas; matriz completa de OR/AND, clear-all, zero resultados, quatro rotas de case e todos os hashes filtrados.
- A mudança de navegação e o fallback foram inspecionados e compilados, mas SC-027, SC-028 e SC-031 continuam parciais até executar esses cenários. Nenhuma validação de leitor de tela ou de conformidade WCAG completa é alegada.
- Os checkboxes de Context e Technology receberam `aria-label` explícito. A árvore de acessibilidade automatizada disponível nesta rodada ainda apresentou os checkboxes sem nome textual; não classifico SC-028 como aprovado sem confirmar com inspeção acessível mais completa/leitor de tela.
- A revisão visual/editorial humana de contribuições e da composição dos cartões ainda não foi recebida. Nenhuma aprovação de publicação, merge ou push foi inferida.

Por pedido do usuário, o rótulo vigente passa de My contribution para Selected contributions em /projects/ e nos documentos ativos. A ficha apresenta exemplos selecionados, não um inventário completo da atuação. No Read With Ello, o resumo agora menciona experiência de leitura, Book Library, quests/progression, rewards/Prize Store, GraphQL e trabalho complementar de onboarding/UI/lifecycle, já sustentados nos dados e fontes consultados. A declaração do usuário sobre amplitude motiva a revisão, sem publicar ownership de todas as áreas do app. Registros anteriores deste arquivo conservam o rótulo observado na época. Home e cases não foram alterados. Não foram executados novos testes nesta edição de texto.

### Verificação complementar após nova execução — 2026-10-05

No navegador local, abri `/projects/` e executei verificações focadas de busca, faceta, expansão e estrutura:

- Buscar `GraphQL` atualizou o contador para `2 of 19`; limpar filtros restaurou `19 of 19`.
- A faceta Technology ofereceu uma única opção `Unity`; selecioná-la atualizou o contador para `11 of 19`. O rótulo visível continuou singular, sem versão Unity 6 como opção separada.
- Context com `Independent` e `Study` marcou `6 of 19`; ao abrir Technology, Context fechou (`[false, true]` nos estados `open`). Combinar `C#` reduziu o contador a `2 of 19`; limpar retornou a `19 of 19`.
- A expansão do primeiro registro exibiu Role, Context, Type e Selected contributions. A inspeção encontrou 19 disclosures de projeto e zero botões de animação.
- `npm run check`: 0 erros, 0 warnings e 1 hint de CommonJS preexistente em `make_contact_sheets.js`. `npm run build`: sucesso, 7 páginas estáticas.
- A aba local foi devolvida à Home ao final.

Esta rodada não completou as matrizes integrais T055/T060/T087. Contadores comprovam os casos listados, não todos os nomes visíveis sob cada combinação. Seguem sem execução nesta sessão os cenários de rede lenta/falha e timing de mídia, reduced motion inicial/dinâmico, ausência de IntersectionObserver, leitor de tela real, toque físico, JavaScript desligado, fontes lentas/falhas com retornos repetidos e viewports controlados/zoom. T044, T053, T055, T058, T060, T063, T075–T078 e T082–T091 continuam pendentes conforme seu escopo; não se presume aprovação visual/editorial nem conclusão de critério apenas pela inspeção de código ou por estes checks focados.

### Fase 30 — evidências finais no Chrome/DevTools — 2026-10-05

Executado com Chrome isolado via Playwright/CDP em `http://localhost:4321/`; não foi usado o perfil pessoal. Condições deliberadamente simuladas são registradas como emulação, não como falha de serviço real.

| Cenário | Condição e resultado observado | Limite |
| --- | --- | --- |
| Catálogo e filtros | 19 projetos. Nome completo Pathless: 1/19; termo parcial `path`: 2/19; termo de conteúdo `Prize Store`: 1/19; ` GRAPHQL `: 2/19; `avaliacao`: 2/19; consulta sem correspondência: 0/19. Context `Independent` OR `Study`: 6/19. Tecnologia `C#` OR `Unity`: 11/19. Context combinado com `C#`: 5/19; acrescentar GraphQL: 0/19. Limpeza restaurou 19/19. Busca local de opção sem resultados não alterou resultados nem seleções. | Resultados correspondem às consultas acima, não a uma prova exaustiva de todos os termos possíveis. |
| Menus e teclado | Abrir Context focou e selecionou seu campo interno; abrir Technology fechou Context. Escape fechou o menu e devolveu foco ao summary. O teste de teclado também abriu/fechou disclosure e confirmou foco visível. | Leitura por tecnologia assistiva real não executada. |
| Semântica/landmarks | Árvore de acessibilidade do Chromium apresentou o campo Search for, caixas Context com nomes acessíveis e disclosures; sete rotas (`/`, `/projects/`, `/experience/` e quatro cases) responderam 200 e exibiram um `<main>` cada. Nenhum controle Stop/Play apareceu nessas rotas. | Árvore AX do browser não substitui leitor de tela. |
| Hash, expansão e conteúdo sem JS | Hash `#pathless` sob filtro sem resultados restaurou a lista e levou ao projeto; expansões independentes funcionaram e itens filtrados não mantiveram detalhes visíveis. Com JavaScript desativado: 19 artigos, 19 disclosures nativos, links no DOM, filtros escondidos e conteúdo textual disponível. | Ainda não foi executado leitor de tela. |
| Responsividade e toque emulado | Viewports 320, 390, 820 e 1280 CSS px: sem overflow horizontal; mídia acima do texto em celular e ao lado em desktop; detalhes na linha inferior ocupando a largura do item. Em 390 px com emulação touch, toque abriu Context e More details. | Zoom do browser e toque em aparelho físico não testados. |
| GIF distante/próximo | Em página fresca, Pathless manteve o pôster e nenhum `src` de GIF antes da faixa do observer; ao entrar na faixa de 75% do viewport, atribuiu `src` e iniciou uma requisição. | Browser local e DevTools; timing exato depende do ambiente. |
| Rede lenta/bloqueada e falha | Com rede limitada (700 ms e 32 KB/s), pôster ficou visível enquanto o GIF ainda carregava. Rota de GIF abortada manteve o pôster visível e a animação oculta. Resposta simulada `image/gif` inválida (dimensões zero) preservou o fallback; em outra execução, rejeitei diretamente `HTMLImageElement.decode()` e confirmei quatro chamadas interceptadas, pôster visível e animação oculta. | Falhas foram simuladas pelo DevTools/Playwright; não são relato de defeito em arquivo publicado. |
| Movimento reduzido | `prefers-reduced-motion: reduce` desde o início produziu zero requisições de GIF no catálogo; ativação durante carga deixou o pôster visível e impediu revelação tardia da animação. | Emulação DevTools, não configuração de sistema/dispositivo. |
| Sem observer | Ao remover `IntersectionObserver`, os previews seguiram o fallback de autoplay sem observer já implementado e iniciaram carregamento sem erro de script funcional; pôster permaneceu até cada mídia ficar pronta. | Ausência da API foi injetada pelo teste, não é dispositivo real. |
| Fontes lentas/falhas e volta à Home | Com fontes atrasadas 700 ms, três retornos repetidos restauraram a rolagem salva sem revelar o topo antes da posição final. Antes da correção, `document.fonts.ready` rejeitada deixava a posição em y=0 até o timeout de segurança. Depois da correção, três retornos com rejeição restauraram imediatamente y=2712, conteúdo visível e sem flags de carregamento/restauração. | Falha da Font Loading API foi simulada por rejeição controlada. |
| Build | `npm run check`: 0 erros, 0 warnings e 1 hint preexistente de CommonJS em `make_contact_sheets.js`. `npm run build`: sucesso, sete páginas estáticas. `git diff --check`: exit 0; somente avisos Git de conversão LF→CRLF. | Nenhum teste automatizado novo foi adicionado. |

#### Correção aplicada

`src/layouts/BaseLayout.astro` agora transforma uma eventual rejeição de `document.fonts.ready` em conclusão recuperável antes da espera pela posição salva. O timeout de segurança continua disponível. Repetição três vezes confirmou posição y=2712 já no primeiro estado visível, sem flash no topo e sem deriva.

#### O que ainda aguarda validação humana/dispositivo

**Registro histórico da avaliação anterior:** leitor de tela falante real; revisão visual/editorial; zoom de browser e aparelho touch físico estavam não executados naquela rodada. As decisões posteriores de 2026-10-07 aprovaram a revisão humana e retiraram zoom manual e aparelho físico do escopo. Leitor de tela real permanece sem validação. Não declaro auditoria WCAG completa, estudo com participantes ou ganho de contratação. Nenhum commit, merge ou push foi feito.

### Diggy — decisão de reutilização e arquivos — 2026-10-06; atualização em 2026-10-08

Por solicitação explícita do usuário em 2026-10-06, a ficha de Diggy passou a exibir os arquivos listados abaixo. A tabela registra a configuração histórica com GIF:

| Uso | Fonte fornecida pelo usuário | Arquivo no projeto em 2026-10-06 |
| --- | --- | --- |
| Ícone antes do título | `public/projects/diggy-poster.png` | `public/projects/diggy/diggy-poster.webp` |
| Preview animado | `public/projects/diggy-gameplay-preview.gif` | `public/projects/diggy/diggy-gameplay-preview.gif` |
| Fallback estático | Primeiro quadro do GIF | `public/projects/diggy/diggy-first-frame.webp` |

Em 2026-10-08, o usuário forneceu `public/projects/diggy/diggy-gameplay-preview.webp` e pediu sua inclusão no lugar do GIF. O registro ativo agora usa esse WebP animado e o fallback `public/projects/diggy/diggy-first-frame.webp`, extraído do primeiro quadro e conferido em 540 × 960 px. A lista atual de arquivos é, portanto, o ícone WebP, o preview WebP animado e seu primeiro quadro estático.

A autorização registrada é para reutilizar no portfólio os arquivos fornecidos e as derivações descritas acima, conforme as instruções explícitas do usuário. Ela não constitui verificação independente de direitos de terceiros. O registro central define `catalogReuseApproved` e `catalogIconReuseApproved` somente nesta ficha. O preview mantém carregamento por aproximação e usa o fallback sob movimento reduzido.

A lista de quatro projetos registrada em 2026-10-05 descreve a decisão vigente naquela data; a solicitação posterior adicionou Diggy e está refletida em FR-019/SC-010 e na política atual do plano/modelo/contrato. Nenhuma outra mídia nova é aprovada por essa extensão.

### Validação parcial de acessibilidade e revisão adiada — 2026-10-06

- Inspeção atual da árvore de acessibilidade do Chromium em `/projects/#diggy-the-dog`: o campo de busca aparece nomeado “Search for”; os botões das facetas aparecem como “Context All” e “Technology All”; a imagem de Diggy tem descrição acessível; “More details” aparece recolhido. Essa inspeção não equivale a operar um leitor de tela real.
- **Registro histórico da Fase 30, anterior à decisão de escopo de 2026-10-07:** teclado, funcionamento sem JavaScript, 320/390/820/1280 CSS px e toque emulado estavam registrados. Naquela data, leitor de tela real, zoom e toque físico não haviam sido executados. A decisão posterior removeu zoom e aparelho físico do escopo; T092 permanece pendente para validação com leitor de tela real.
- A revisão visual/editorial humana T093 foi adiada por solicitação do usuário em 2026-10-06. Nenhuma aprovação editorial ou visual é inferida.
- A árvore atual do Chromium mostra `Showing 20 of 20 projects`, incluindo Diggy; FR-001, FR-008, SC-001, escala do plano e instruções correntes de quickstart foram atualizados do inventário anterior de 19 para 20. As matrizes de resultados antigas permanecem registros datados, não resultados atuais.
- Após as atualizações documentais: `npm run check` passou com 0 erros, 0 warnings e 1 hint preexistente de CommonJS em `make_contact_sheets.js`; `npm run build` gerou as 7 páginas estáticas; `git diff --check` passou. Git exibiu somente avisos de normalização LF/CRLF.

### Reconciliação de validação — 2026-10-07

Ambiente: site local `http://localhost:4321/`, Codex in-app Chromium browser. Viewports configurados pelo controle de viewport do browser; não equivalem a dispositivos físicos.

| Rota/cenário | Método e resultado observado | Limite |
| --- | --- | --- |
| `/projects/`, 1440×900 | Árvore/DOM renderizados e interações no browser. Catálogo inicia com 21 entradas; busca `Pandora` reduz a 1/21; consulta sem correspondência mostra estado vazio e 0/21; limpar restaura 21/21. Facetas Independent + Study resultam em 8/21; com Unity, 7/21. Abrir Technology fecha Context sem apagar suas escolhas. Pandora expandido some e fecha ao filtrar por Diggy. | Busca/facetas observadas em combinações representativas, não todas as opções/termos possíveis. JavaScript desativado não foi controlado nesta sessão. |
| `/projects/#pandora`, 1440×900 | Inspeção do DOM renderizado e expansão de More details. Título Pandora, resumo, Role Game Engineer, Context Global Game Jam 2016 · team project, Type 2D flight and memory game e Period 29–31 Jan 2016 aparecem. Selected contributions preserva o contexto pessoal e dos estudos recentes em Unity, convite a Phillipe e irmão, time de cinco, tema Ritual e motivação pessoal; os três destaques especificam integração de áudio, criação da cena final e recorte/reposicionamento da arte do círculo ritual. Os chips visíveis são Unity e C#; `Flight`, `Memory ritual` e `Global Game Jam` ficam no campo livre `tags` do registro e não são apresentados como tecnologias/facetas. | Comparei as afirmações com “Pandora — Project Source of Truth”, buscado no Notion em 2026-10-07, que incorpora o relatório de auditoria. Relato pessoal permanece identificado como experiência pessoal; nenhum impacto profissional mensurado é atribuído. |
| Destaque Ending scene | A frase foi reduzida a “Created the game’s ending scene.” O relatório comprova criação da cena final, mas não atribui a Phillipe a implementação do fluxo de vitória; a formulação anterior que dizia que a cena fechava o fluxo após vitória foi removida. | O flow geral do jogo permanece descrição do produto, não claim de autoria individual. |
| `/projects/#pandora`, 390×844 | Pandora expandido, mídia acima do conteúdo, descrição e destaques com quebra natural; `scrollWidth=375`, `clientWidth=375`, sem elementos transbordando. | Teste por viewport do browser, não toque físico ou zoom. |
| `/projects/#pandora`, 320×720 | Pandora expandido; largura do registro 257px, detalhes 257px; `scrollWidth=305`, `clientWidth=305`, sem elementos fora da viewport. | Não representa browser zoom. |
| Mídia/CTA de Pandora | Inspeção DOM e estado de carregamento: pôster `pandora-poster.webp` carregado (1260×1000); animação `pandora-gameplay-preview.gif` (576×324) carregada; fallback `pandora-first-frame.webp` (576×324) carregado. Link “View on itch.io” aponta para `https://phillipeaam.itch.io/pandora`. | O relatório registra direitos de mídia como desconhecidos; renderização confirma somente carregamento. `catalogReuseApproved` registra a autorização de uso no catálogo, não uma verificação independente de licenças. Preferência de movimento e rede lenta/bloqueada não foram repetidas para Pandora nesta rodada. |

Atualização de mídia em 2026-10-09: a referência GIF foi substituída pelo WebP animado fornecido pelo usuário (`pandora-gameplay-preview.webp`, 960×540, 1.797.550 bytes). `pandora-first-frame.webp` foi gerado do primeiro frame desse WebP (960×540, 125.006 bytes). O registro usa a imagem estática em `src` e a animação em `previewSrc`; a linha de carregamento acima documenta a inspeção anterior do GIF e do pôster antigo, não uma validação visual/runtime dos novos arquivos.

#### Correção de conteúdo aplicada

Em `src/data/projects.ts`, removi do parágrafo Selected contributions a enumeração que repetia os mesmos três destaques. O parágrafo conserva integralmente o contexto pessoal informado pelo usuário e a diferença entre motivação pessoal e impacto profissional; a linha do ending scene não atribui autoria do fluxo de vitória. O nome de Marllon não aparece na ficha.

#### Estado da reconciliação e limitações

Busca/facetas, divulgação de Pandora, links e layout recolhido/expandido tiveram verificações atuais representativas. O estado dessas tarefas foi atualizado pelas emulações DevTools abaixo. A árvore de acessibilidade do navegador e teclado são os métodos assistivos mantidos nesta feature. Testes de fala com leitor real, zoom manual e touchscreen/aparelho físico foram retirados do escopo pelo usuário; a revisão visual/editorial foi aprovada em 2026-10-07.

O inventário atual observado é 21, incluindo Pandora; os registros de 19 e 20 entradas acima são históricos e não foram reescritos como resultados atuais.

### Verificações complementares com Chrome DevTools Protocol — 2026-10-07

Método: servidor local em `http://127.0.0.1:4321/`, Chrome temporário com perfil isolado e CDP em loopback. Os viewports são CSS px configurados pelo DevTools; toque e movimento reduzido abaixo são emulados.

| Rota / condição | Resultado observado | Limite e reconciliação |
| --- | --- | --- |
| `/projects/?nojs=cdp#pandora`, 1440×900 CSS px, JavaScript desativado antes da navegação | 21 registros renderizados; Pandora começou recolhido; `summary` nativo ficou visível. Clique de mouse enviado pelo CDP abriu `<details>` e adicionou o atributo `open`. | Confirma conteúdo e disclosure nativos sem scripts. Busca/facetas dependem de JavaScript e não foram consideradas funcionais sem ele. T058/T075 seguem abertas pelas demais modalidades e verificações. |
| `/projects/?reduceInitial=cdp#pandora`, 1440×900 CSS px, preferência `reduce` emulada antes da navegação | `matchMedia` confirmou `reduce`; seis elementos animados ficaram sem `src`; seis fallbacks ficaram visíveis; `performance` mostrou zero requisições GIF. Alternar a preferência durante a sessão removeu `src` e restaurou os fallbacks. | Evidência de tratamento inicial e de mudança da media query no navegador, não de preferência do sistema operacional nem de rede lenta/bloqueada. Contribui para T058, que permanece aberta. |
| `/projects/?touch=cdp#pandora`, 390×844 CSS px, toque emulado | Tocar em “More details” expandiu Pandora (`aria-expanded=false` → `true`, `<details open>`); `scrollWidth` e viewport ficaram em 390px. | Toque físico em aparelho foi retirado do escopo pelo usuário em 2026-10-07; esta emulação é a evidência de toque aplicável. T090/T092 foram reconciliadas com a árvore AX, teclado e demais evidências já registradas; não foi feito teste de fala. |

Assim, T058 e T075 receberam evidência adicional para movimento reduzido, JavaScript desligado e disclosure nativo. O usuário retirou validação em touchscreen/aparelho físico, zoom manual e teste de fala com leitor de tela real do escopo; toque emulado e árvore de acessibilidade do navegador permanecem como métodos utilizados. T058/T075/T090/T092/T095 foram reconciliadas com os resultados observados e o escopo aprovado; essa conclusão não declara saída de fala testada nem auditoria WCAG completa. T063/T078/T093/T096 foram concluídas após aprovação explícita da revisão humana.

### Decisão de escopo — sem teste em aparelho físico — 2026-10-07

Por decisão explícita do usuário, não será exigida validação em mídia/aparelho físico ou touchscreen físico. Interações de toque podem ser verificadas pelo Chrome DevTools em modo emulado; a evidência aplicável já consta na tabela acima. Essa decisão remove o requisito físico das tarefas T090, T092 e T095 e não implica suporte ou aprovação de hardware específico. Leitor de tela continua no escopo; zoom manual foi removido por decisão posterior do usuário, registrada a seguir.

### Decisão de revisão humana — 2026-10-07

O usuário aprovou explicitamente a revisão humana da composição atual do catálogo e do conteúdo das entradas/matriz editorial. Essa decisão conclui T063, T078, T093 e T096. Ela não representa autorização para publicar, fazer merge ou push, nem certifica direitos de terceiros sobre mídias.

### Decisão de escopo — zoom manual — 2026-10-07

O usuário removeu os testes manuais de zoom/ampliação do escopo porque a configuração disponível não permitiu executá-los. Critérios de zoom foram removidos das tarefas abertas e dos critérios ativos de aceitação relacionados; permanecem as verificações de viewport estreito e reflow já registradas. Nenhuma conclusão sobre comportamento em zoom foi inferida.

### Tentativa de validação com leitor de tela — 2026-10-07

Tentativa anterior à decisão de escopo: confirmei que `Narrator.exe` está presente no Windows, mas não consegui iniciar/controlar uma janela nativa nesta sessão. Nenhum anúncio de leitor foi observado. Em seguida, o usuário retirou esse teste de fala do escopo; portanto, a limitação não é mais um bloqueio nem uma tarefa pendente. A inspeção da árvore AX do Chromium e a navegação por teclado continuam sendo a evidência registrada; não se declara saída de fala testada. Não houve mudança de código.

### Decisão de escopo — sem validação de fala por leitor de tela — 2026-10-07

Por decisão explícita do usuário, não é necessário testar a saída falada com leitor de tela real. Os requisitos ativos de validação foram atualizados para usar árvore de acessibilidade do navegador, teclado, foco, toque emulado e aprimoramento progressivo conforme aplicável. T058, T075, T090, T092 e T095 foram reconciliadas com as evidências já registradas e concluídas para esse escopo. Essa decisão não remove os nomes/estados acessíveis esperados do produto e não equivale a uma auditoria WCAG completa.


### Ícones compactos de identidade — verificação registrada em 2026-10-08

| Rota / viewport | Método e resultado observado | Limite |
| --- | --- | --- |
| `/projects/`, 1440 × 900 CSS px | Inspeção do browser local/DevTools: Wallace Quest, Pathless, Pandora, Diggy, Read With Ello e Ello 2.0 carregaram os ícones; dimensões naturais 104 × 104 e renderizadas 52 × 52 CSS px. | A aprovação visual do crop é específica aos assets revisados; não valida automaticamente futuros ícones. |
| Featured, source inspection | A inspeção de `FeaturedProject.astro` confirma que o componente consome `projectsIndexTitleIcon` do registro central. | Nesta rodada não foi registrada inspeção visual/runtime da Home Featured. |
| `/projects/`, 390 × 844 CSS px | Inspeção em viewport mobile no browser local: os seis ícones carregaram no slot 52 × 52 sem overflow observado. | Viewport do browser, não aparelho físico; não generaliza para outras larguras. |

O crop de Read With Ello foi ajustado após feedback de enquadramento e conferido visualmente em 52 × 52 CSS px. Essa avaliação observada motiva a regra de centralização óptica. Dimensões/fidelidade de futuros assets devem ser verificadas individualmente conforme o cenário N do quickstart. A autorização registrada é de reutilização no portfólio e não certifica direitos de terceiros.


### Project identity link hit area — implementation record — 2026-10-08

Implementation now uses one `archive-record__identity-link` around icon and title in `ProjectRecord.astro`, retaining the existing self-fragment target. Browser validation of pointer, keyboard focus, touch and accessible name under FR-046 / SC-033 has not been performed for this change; T099 remains open.
