---
description: "Task list for the searchable projects catalog"
---

# Tasks: Projects Catalog

**Input**: Design documents from `/specs/006-projects-catalog/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/projects-catalog.md`, `quickstart.md`

**Nota de precedência (2026-10-05):** T013, T032 e T056 registram trabalho histórico da implementação em uma versão anterior e não são instruções para reintroduzir controles. A decisão vigente remove Stop/Play de todas as superfícies. Nas validações pendentes, conferir a ausência desses controles globalmente, preservando fallback, acionamento configurado e movimento reduzido.

**Tests**: Sem a introdução de um runner automatizado: o repositório não possui um. As verificações manuais listadas são necessárias para os critérios de descoberta, acessibilidade e responsividade definidos na spec.

**Organization**: Tarefas agrupadas pelas histórias de usuário e prioridades descritas em `spec.md`.

## Formato

- `[P]`: pode ser executada em paralelo; trabalha em arquivos diferentes e não depende de tarefa incompleta.
- `[US#]`: identifica a história da spec atendida pela tarefa.
- Todas as tarefas citam o caminho de arquivo em que o trabalho será feito ou registrado.

## Convenções deste repositório

- Site único Astro: `src/` na raiz do repositório.
- Não criar dependência, API, serviço de busca, banco ou framework novo para o catálogo local.
- Usar o inventário já existente em `src/data/projects.ts` e os comandos `npm run check` e `npm run build`.

---

## Fase 1: Setup

**Propósito**: Preparar o registro das validações funcionais e técnicas. Nenhuma inicialização de projeto, pacote ou configuração de ferramenta é necessária.

- [X] T001 Crie `specs/006-projects-catalog/evaluation.md` como registro das validações de SC-001–SC-007, com campos para cenários executados, larguras realmente testadas, verificações de acessibilidade, comandos de build/diagnóstico, critérios não atendidos e validações não realizadas.

---

## Fase 2: Fundacional

**Propósito**: Normalizar os dados públicos verificados que serão compartilhados pela listagem e pelas facetas.

- [X] T002 Acrescente `workContext` (professional, independent ou study) e `technologies` ao modelo `ProjectInventoryEntry` em `src/data/projects.ts`; derive o primeiro somente da classificação verificada e o segundo somente dos metadados explícitos `Stack`, `Engine` ou `Tools`, omitindo valores não confirmados e sem inferi-los de título, plataforma ou prosa.

**Checkpoint**: A taxonomia pública está explícita e revisada; histórias que dependem do arquivo podem começar.

---

## Fase 3: User Story 1 — Reconhecer e percorrer o catálogo (Priority: P1) 🎯 MVP

**Goal**: Apresentar todas as fichas como entradas textuais compactas, reconhecíveis sem poster, hover ou rolagem horizontal.

**Independent Test**: Sem critérios ativos, comparar as entradas com o inventário publicado e confirmar que todas as 19 atuais têm nome e resumo identificável; verificar que conteúdo ausente não foi inventado.

### Implementação

- [X] T003 [US1] Refatore `src/components/ProjectRecord.astro` para apresentar nome e resumo conciso em cada entrada, mostrar somente contexto, contribuição, período e tecnologias confirmadas que existirem no resumo e mover as descrições/foco de engenharia/metadados extensos existentes para um painel nativo `<details>/<summary>` associado à ficha; mantenha o ID estável e configure cada disclosure para operar independentemente, sem grupo de abre/fecha exclusivo.
- [X] T004 [P] [US1] Ajuste `src/pages/projects/index.astro` para percorrer todos os registros publicados em uma lista única na ordem editorial existente, sem cabeçalhos de grupo, e derivar a contagem total do inventário; em `src/components/Navigation.astro`, deixe no cabeçalho contextual somente Back e Contact.
- [X] T005 [P] [US1] Atualize `src/styles/global.css` para o novo formato compacto de entradas, preservando a identidade editorial e refluindo textos longos e metadados sem rolagem horizontal da página.
- [X] T006 [US1] Revise a página em `src/pages/projects/index.astro` contra SC-001 e registre em `specs/006-projects-catalog/evaluation.md` qualquer divergência entre inventário público, total e entradas reconhecíveis.

**Checkpoint**: O conjunto publicado é reconhecível como catálogo sem depender da busca ou das miniaturas.

---

## Fase 4: User Story 2 — Encontrar projetos por texto e facetas (Priority: P1)

**Goal**: Combinar busca pública com filtros independentes de Context e Technology, mostrando contagem, filtros ativos e estado vazio.

**Independent Test**: Usar a matriz de `specs/006-projects-catalog/quickstart.md`; comparar cada conjunto e contador com a busca manual no inventário, verificando OR na mesma faceta e AND entre query/facetas.

### Implementação

- [X] T007 [US2] Adicione em `src/pages/projects/index.astro` controles rotulados para busca, Context e Technology, valores derivados de `src/data/projects.ts`, contador match/total, remoção de critérios e ação de limpar tudo; mantenha o painel de filtros indisponível/invisível até a inicialização do aprimoramento.
- [X] T008 [P] [US2] Implemente no script de cliente de `src/pages/projects/index.astro` a normalização de caixa, espaços externos e diacríticos, a busca no texto público da ficha e a combinação OR dentro de cada faceta e AND entre facetas e busca; atualize entradas visíveis, contador e estado sem resultados a cada alteração.
- [X] T009 [P] [US2] Estilize os controles, valores ativos, contador e estado vazio em `src/styles/global.css`, mantendo contraste, foco visível e reflow dos controles em telas estreitas.
- [X] T010 [US2] Percorra os cenários de busca/facetas de `specs/006-projects-catalog/quickstart.md` na página `/projects/` e registre os resultados da matriz e discrepâncias em `specs/006-projects-catalog/evaluation.md` após concluir markup, script e estilos.

**Checkpoint**: Busca, facetas, contador, remoção e estado vazio funcionam sem alterar a ordem editorial dos resultados.

---

## Fase 5: User Story 4 — Usar navegação acessível e conteúdo essencial sem scripts (Priority: P1)

**Goal**: Tornar controles e conteúdo operáveis por teclado/toque e comunicar estados; manter o catálogo essencial quando scripts não estão disponíveis.

**Independent Test**: Percorrer controles existentes por teclado e leitor de tela e carregar a rota com JavaScript desativado; confirmar conteúdo, links e estado sem controles falsamente ativos.

### Implementação

- [X] T011 [P] [US4] Complete em `src/pages/projects/index.astro` os rótulos persistentes, associações entre controles e descrições, estados semânticos e região de status concisa/polite para contagem e vazio, sem transformar a lista inteira em região viva.
- [X] T012 [P] [US4] Ajuste `src/styles/global.css` para estados de foco claramente visíveis e alvos utilizáveis por toque, sem depender de hover ou somente de cor para significado.
- [X] T013 [P] [US4] **Registro histórico de implementação:** a versão então validada de `src/components/ProjectMediaPreview.astro` incluiu um controle visível de pausa/parada, junto à alternativa estática e ao comportamento de movimento reduzido. O controle foi removido globalmente por decisão posterior do usuário em 2026-10-05; este item não autoriza sua reintrodução.
- [X] T014 [US4] Use a matriz de acessibilidade/no-script de `specs/006-projects-catalog/quickstart.md` e registre em `specs/006-projects-catalog/evaluation.md` resultados de teclado, foco, leitor de tela, redução de movimento e disponibilidade sem JavaScript.

**Checkpoint**: Critérios essenciais de teclado, estado e conteúdo sem scripts estão cobertos conforme FR-014–FR-017 e SC-005–SC-006.

---

## Fase 6: User Story 3 — Aprofundar um projeto e seguir seus links (Priority: P2)

**Goal**: Expor detalhes no contexto da ficha e preservar cases, ações externas válidas e deep links existentes.

**Independent Test**: Abrir várias fichas e comparar detalhes, mídia, cases e ações com os registros de origem; abrir hashes existentes com e sem filtros ativos e confirmar que o alvo continua visível.

### Implementação

- [X] T015 [P] [US3] Mantenha a mídia opcional dentro do painel de detalhes de `src/components/ProjectRecord.astro`; para cada origem em `src/data/projects.ts`, confira provenance/autorização nas fontes canônicas `docs/stage-10-content-register.md` e `docs/repository-evidence-pass.md`, confirme que a alternativa estática representa corretamente a mídia e omita fontes sem evidência suficiente, sem inserir placeholders como evidência.
- [X] T016 [US3] Preserve os quatro links de case, ações externas válidas e destinos associados à ficha em `src/components/ProjectRecord.astro`; não renderize CTA para destino ausente e mantenha IDs/aliases de projeto existentes.
- [X] T017 [P] [US3] Integre a filtragem e os hashes em `src/pages/projects/index.astro` para que, em carga inicial ou navegação para um hash oculto, critérios incompatíveis sejam limpos e o registro com ID estável seja revelado e alcançado.
- [X] T018 [US3] Percorra os cenários de detalhes, mídia, links e deep links em `specs/006-projects-catalog/quickstart.md` e registre os resultados por projeto representativo em `specs/006-projects-catalog/evaluation.md`.

**Checkpoint**: Detalhes locais e destinos existentes continuam associados ao projeto correto sem inventar conteúdo.

---

## Fase 7: Polish e validações transversais

**Propósito**: Verificar integração, dimensões representativas e critérios de sucesso restantes.

- [X] T019 [P] Execute `npm run check` e `npm run build` conforme `specs/006-projects-catalog/quickstart.md`; registre comandos executados e resultados em `specs/006-projects-catalog/evaluation.md`.
- [X] T020 [P] Avalie a página em larguras móveis estreitas, telefone, tablet e desktop conforme `specs/006-projects-catalog/quickstart.md`, incluindo menus multisseleção e Project details com mídia; registre somente as larguras realmente testadas e problemas de reflow em `specs/006-projects-catalog/evaluation.md`.
- [X] T021 Revise `specs/006-projects-catalog/evaluation.md` contra SC-001–SC-007 e liste os critérios funcionais, de acessibilidade ou responsividade não atendidos, as validações não realizadas e as limitações observadas; não caracterize verificações manuais como pesquisa com participantes.
- [X] T022 Revise `git diff --check` e confirme que o diff da feature está restrito à página `/projects/`, dados/componentes/estilos diretamente necessários e documentação da feature; relate checks não executados e encaminhe a revisão visual/editorial humana antes de aprovação para merge/push.

---

## Fase 8: Ajustes após revisão da feature 006

**Propósito**: Fechar os pontos identificados na apresentação atual do catálogo sem criar outra feature.

### User Story 1 — Reconhecer e percorrer o catálogo (Priority: P1)

**Independent Test**: No estado inicial, confirmar cabeçalho alinhado à Home, divisores uniformes e itens compactos sem chips de tecnologia; verificar que os 19 projetos continuam reconhecíveis.

- [X] T023 [P] [US1] Remova chips de tecnologia do resumo compacto e disponibilize os valores verificados no conteúdo expansível de cada projeto em `src/components/ProjectRecord.astro`, mantendo nome, resumo, contexto, contribuição e período conforme dados existentes.
- [X] T024 [P] [US1] Substitua o rótulo “PROJECT ARCHIVE” e a frase introdutória atual por eyebrow, título e texto de apoio no padrão editorial já usado na Home em `src/pages/projects/index.astro`.
- [X] T025 [P] [US1] Padronize espessura, cor e espaçamento dos divisores de todas as fichas em `src/styles/global.css`, sem regras excepcionais por projeto.

**Checkpoint**: A apresentação inicial segue a identidade editorial estabelecida e mantém o conjunto legível sem chips como requisito de reconhecimento.

### User Story 2 — Encontrar projetos por texto e facetas (Priority: P1)

**Independent Test**: Abrir Context e Technology separadamente, pesquisar opções em cada painel, marcar valores múltiplos, confirmar OR/AND e restaurar todos os 19 registros com clear-all.

- [X] T026 [US2] Troque os grupos de checkboxes sempre visíveis por disclosures separados Context e Technology, cada um com campo de busca rotulado e checkboxes nativos multisseleção, em `src/pages/projects/index.astro`.
- [X] T027 [P] [US2] Implemente busca independente das opções em cada disclosure e mantenha o comportamento de filtragem dos projetos, OR dentro da faceta, AND entre facetas e query, remoção individual, clear-all, contador e estado sem opções/resultados em `src/pages/projects/index.astro`.
- [X] T028 [P] [US2] Estilize gatilhos, painéis, buscas internas, seleção múltipla, valores selecionados e estados vazios das facetas em `src/styles/global.css`, preservando reflow e foco visível.

**Checkpoint**: Cada filtro compacto pode ser aberto, pesquisado e combinado sem ocultar os projetos como forma principal de descoberta.

### User Story 4 — Usar navegação acessível e conteúdo essencial sem scripts (Priority: P1)

**Independent Test**: Operar cada menu e suas opções apenas com teclado e leitor de tela; com JavaScript desativado, confirmar lista, disclosure nativo e links úteis sem controles de filtro inertes.

- [X] T029 [US4] Complete nomes acessíveis, estado expandido dos disclosures, rótulos e agrupamento das opções, foco, mensagens de opções sem correspondência e operação por teclado/toque dos menus em `src/pages/projects/index.astro` e `src/styles/global.css`; preserve a ocultação progressiva dos controles até inicialização.

**Checkpoint**: Os menus multisseleção e seus estados são operáveis sem mouse e o conteúdo-base permanece útil sem script.

### User Story 3 — Aprofundar um projeto e seguir seus links (Priority: P2)

**Independent Test**: Abrir registros com e sem mídia; verificar hierarquia de detalhes, chips de tecnologia, mídia inline apenas com provenance/autorização confirmadas, alternativa estática, pausa e ações existentes.

- [X] T030 [P] [US3] Audite cada mídia candidata em `src/data/projects.ts` contra `docs/stage-10-content-register.md` e `docs/repository-evidence-pass.md`; mantenha apenas origens com provenance e autorização verificadas e registre cobertura e lacunas em `specs/006-projects-catalog/evaluation.md`.
- [X] T031 [P] [US3] Reorganize `src/components/ProjectRecord.astro` para agrupar conteúdo disponível com rótulos consistentes, incluir tecnologias dentro de Project details, renderizar mídia aprovada inline e omitir grupos vazios, sem alterar destinos de case/ações ou IDs existentes.
- [X] T032 [P] [US3] **Registro histórico de implementação:** `src/components/ArchiveMedia.astro` e `src/components/ProjectMediaPreview.astro` chegaram a exibir animação inline com alternativa estática, movimento reduzido e controle de pausa/reprodução. A apresentação inline permanece; o controle foi removido globalmente por decisão posterior do usuário em 2026-10-05.
- [X] T033 [US3] Reflua mídia e detalhes em telas largas e estreitas em `src/styles/global.css`; disponha a mídia em uma coluna ao lado dos detalhes no desktop e acima do texto no celular, conforme decisão registrada em `specs/006-projects-catalog/spec.md`.
- [X] T034 [US3] Valide nos registros que têm mídia aprovada a apresentação inline, alternativa estática, pausa/reprodução e comportamento responsivo; confirme também os quatro cases, ações externas, expansão independente e deep links conforme `specs/006-projects-catalog/quickstart.md`, registrando falhas e fontes sem prova em `specs/006-projects-catalog/evaluation.md`.

**Checkpoint**: Detalhes mantêm hierarquia consistente; mídia verificada aparece junto à ficha e claims não verificados continuam omitidos.

---

## Fase 9: Verificação dos ajustes

- [X] T035 Reexecute a matriz geral de descoberta, facetas, acessibilidade e consistência visual de `specs/006-projects-catalog/quickstart.md`, confronte os resultados com SC-001–SC-009 e SC-011–SC-013 (T034 cobre mídia, detalhes e links) e atualize `specs/006-projects-catalog/evaluation.md` somente com evidência efetivamente verificada.
- [X] T036 Após concluir T035, execute `npm run check`, `npm run build` e `git diff --check`; registre comandos e resultados reais em `specs/006-projects-catalog/evaluation.md`.

---

## Dependências e ordem de execução

### Dependências das fases

- Setup (Fase 1) cria o registro de validação antes das verificações de implementação; não há gate de pesquisa com participantes.
- Fundacional (Fase 2) precede todas as histórias: a taxonomia normalizada alimenta apresentação e facetas.
- US1 (Fase 3) cria os registros do catálogo; US2 (Fase 4) e US4 (Fase 5) dependem da lista/identidade estável criada por US1.
- US4 (Fase 5) segue os filtros de US2 porque valida rótulos e estados das interações já existentes.
- US3 (Fase 6) depende da estrutura de ficha de US1 e integra-se ao filtro/hash de US2; prioridade P2 vem após as histórias P1.
- Polish (Fase 7) depende das histórias incluídas no escopo final.
- Ajustes da Fase 8 reabrem requisitos da mesma feature 006 e complementam o resultado anterior: US1 → US2 → US4 → US3; a confirmação de mídia em T030 pode ocorrer em paralelo às implementações independentes de US1/US2/US4, e bloqueia a inclusão de qualquer fonte em T031/T032. T020 valida reflow depois dos ajustes de apresentação/mídia; T034 valida os detalhes antes da verificação geral T035.
- A Fase 11 complementa a mesma feature 006 após nova revisão: T040/T041 alinham o cabeçalho ao padrão aprovado da Home; T042/T043 atualizam a rotulagem e exclusividade dos menus; T044 valida teclado/nomes acessíveis; T045/T046 validam apresentação e interação; T047 executa os checks finais.

### Grafo de dependências

```text
T001 (registro de validação)
  → T002 (dados verificados)
  → US1: T003 → (T004 ∥ T005) → T006
  → US2: T007 → (T008 ∥ T009) → T010
  → US4: US2 → (T011 ∥ T012 ∥ T013) → T014
  → US3: US1 + US2 → (T015 ∥ T017); T015 → T016; depois T018
  → Polish: T019 + T020 em paralelo; depois T021 e T022
  → Ajustes 006: T030 ∥ (T023 ∥ T024 ∥ T025 → T026 → (T027 ∥ T028) → T029) → (T031 ∥ T032) → T033 → T034 → T020 → T035 → T036
  → Revisão de apresentação 006: T040 → (T041 ∥ T042) → T043 → T044 → (T045 → T046) → T047
```

### Oportunidades paralelas e exemplos por história

- **US1**: depois de T003, uma pessoa pode adaptar a listagem em T004 enquanto outra aplica estilos em T005; T006 depende das duas.
- **US2**: depois do markup T007, T008 (lógica de filtragem em `index.astro`) e T009 (estilos em `global.css`) podem ser feitos em paralelo; T010 valida a integração depois das duas.
- **US4**: T011 (semântica em `index.astro`), T012 (foco em `global.css`) e T013 (mídia em `ProjectMediaPreview.astro`) são tarefas em arquivos separados e podem ser distribuídas em paralelo após US2; T014 depende das três.
- **US3**: T015 (disclosure em `ProjectRecord.astro`) e T017 (hashes em `index.astro`) podem ser feitos em paralelo após US1/US2; T016 depende de T015 e T018 depende de T015–T017.
- **Polish**: T019 (diagnósticos/build) e T020 (reflow manual) são validações independentes e podem ser executadas em paralelo; T021 e T022 consolidam os resultados depois.

## Estratégia de implementação

### MVP

1. Prepare o registro de validação com T001.
2. Normalize dados verificados em T002.
3. Conclua US1: conjunto textual reconhecível com total derivado.
4. Conclua US2: busca, duas facetas, contador, limpeza e estado vazio.
5. Valide acessibilidade/resiliência P1 em US4.
6. Pare para revisão do catálogo P1; US3 complementa com detalhes e destinos existentes sem atrasar a apresentação inicial.

### Entrega incremental

1. Fase 1 + fundação → registro de validação e metadados verificados.
2. US1 → catálogo reconhecível sem filtros.
3. US2 → descoberta refinada e contagem.
4. US4 → teclado, status e robustez sem scripts.
5. US3 → detalhes, mídia e compatibilidade dos links.
6. Polish → checks, viewports e avaliação comparativa.

## Notes

- Todas as tarefas têm caixa de seleção e ID sequencial; `[P]` aparece somente onde há arquivos/trabalho separáveis sem dependência incompleta.
- Etiquetas `[US1]`–`[US4]` correspondem à ordem das histórias em `spec.md`.
- Não foi criado runner de teste nem incluído estudo com participantes; tarefas de validação manual vêm dos cenários/SC-001–SC-015 explicitamente definidos na spec e do roteiro `quickstart.md`.
- Itens de `checklists/discovery.md` são revisão da qualidade dos requisitos; não são tarefas de implementação e não tiveram seus marcadores alterados.
- T023–T036 complementam a mesma feature 006 após a revisão do usuário; não criam nova pasta/spec. Eles substituem os aspectos de apresentação anteriores que exibiam chips compactos, checkboxes sempre visíveis e GIFs como links externos.
- O layout lado a lado/empilhado indicado em T033 é uma decisão esclarecida pelo usuário; ainda requer revisão visual final antes de tratar a implementação como aprovada para merge/push.
- T040–T047 refinam o cabeçalho e os controles por solicitação posterior, dentro da mesma feature 006; tarefas permanecem abertas até implementação e validação, sem indicar aprovação humana.
## Phase 10: Convergence

- [X] T037 [US1] Complete the responsive audit at 320 px, representative phone, tablet, and desktop widths; inspect catalog entries, both filter controls, expanded details, and approved media when available, fix any observed reflow issues, and record measured results in `specs/006-projects-catalog/evaluation.md` per SC-007, FR-017, T020, and Constitution VI (partial).
- [X] T038 [US4] Complete a keyboard-only walkthrough of search, both multi-select facets, clear-all, empty-state recovery, project links, and independent detail disclosures; verify focus order/visibility and screen-reader names, states, and result announcements, fix observed issues, and record results for `src/pages/projects/index.astro` and `src/components/ProjectRecord.astro` in `specs/006-projects-catalog/evaluation.md` per US4/AC1–AC2, FR-015, SC-006, and Constitution IV (partial).
- [X] T039 [US4] Disable JavaScript in a browser and verify all project entries, essential links, and native detail disclosures remain usable and no inert filter control appears active; fix any observed issue and record results for `src/pages/projects/index.astro` in `specs/006-projects-catalog/evaluation.md` per US4/AC4, FR-016, SC-005, and Constitution V (partial).

## Fase 11: Cabeçalho e filtros após revisão de apresentação

**Propósito**: Reaproveitar o cabeçalho editorial aprovado da Home e reduzir a sobreposição visual dos controles de filtro, sem alterar a descoberta ou a seleção múltipla existentes.

**Independent Test (US1/US2)**: Abrir `/projects/`, comparar o cabeçalho com “More Projects” na Home, confirmar o título “All Projects”, os rótulos visíveis acima dos controles e que abrir uma faceta fecha a outra sem descartar seleções.

- [X] T040 [US1] Reestruture o cabeçalho de `src/pages/projects/index.astro` para usar a composição compartilhada da Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o texto de apoio existente em `src/pages/index.astro`.
- [X] T041 [P] [US1] Reutilize o estilo compartilhado `.section-heading--major` em `src/styles/global.css` para o cabeçalho do catálogo e remova overrides que recriem a composição editorial já definida.
- [X] T042 [P] [US2] Posicione rótulos visíveis “Search for”, “Context” e “Technology” acima do campo e seletores correspondentes em `src/pages/projects/index.astro`, preservando busca principal, busca de opções e multisseleção.
- [X] T043 [US2] Atualize a interação dos menus de faceta em `src/pages/projects/index.astro` para permitir no máximo um menu aberto por vez; abrir o outro fecha o atual e preserva valores selecionados e consulta local de opções.
- [X] T044 [US4] Verifique nomes acessíveis, estado de expansão, foco por teclado e aprimoramento progressivo dos rótulos e menus em `src/pages/projects/index.astro` e `src/styles/global.css`; controles de filtro continuam indisponíveis sem o script inicializado. Evidência consolidada de Chromium AX, teclado/Escape e JavaScript desativado em `specs/006-projects-catalog/evaluation.md`. A validação por fala de leitor de tela foi posteriormente removida do escopo pelo usuário em 2026-10-07.
- [X] T045 [US1] Valide a hierarquia e os textos do cabeçalho contra a Home em viewports representativos, conforme cenário 12 de `specs/006-projects-catalog/quickstart.md`, e registre o resultado em `specs/006-projects-catalog/evaluation.md`.
- [X] T046 [US2] Valide a posição dos rótulos e a exclusividade/preservação de estado das facetas em viewports representativos, conforme cenário 13 de `specs/006-projects-catalog/quickstart.md`, e registre o resultado em `specs/006-projects-catalog/evaluation.md`.
- [X] T047 Execute `npm run check`, `npm run build` e `git diff --check` após T045–T046 e registre os resultados reais em `specs/006-projects-catalog/evaluation.md`.

## Complemento ativo — 2026-10-05

T001–T047 permanecem como histórico, exceto T044 atualizado com evidência de execução atual. T003/T015/T031/T033 descrevem apresentação substituída; não executar suas instruções de localização de mídia/metadados novamente. T040–T047 foram auditadas em T048/T060/T062, sem presumir conclusão por implementação preexistente. Para este complemento executar T048–T063. Avaliações anteriores não validam novos cenários. Nenhum merge/push/commit nesta rodada.

### Fase 12 — Setup

- [X] T048 Confronte código atual, histórico 6679f07/b0daafa e entregas T040–T047 com `specs/006-projects-catalog/spec.md`; registre baseline, itens cobertos/prova e lacunas em `specs/006-projects-catalog/evaluation.md`, preservando aprovação do cabeçalho de 24px e margens.

### Fase 13 — Fundação

- [X] T049 Audite mídia principal, complementar e identityImage de `src/data/projects.ts` contra `docs/stage-10-content-register.md`, `docs/repository-evidence-pass.md` e `docs/media-guidelines.md`; registre fonte, autorização/provenance, fallback e decisão individual em `specs/006-projects-catalog/evaluation.md`. “Absent or unverified identity image is omitted without reserved space.” Não criar autorização ou assets; ausência de evidência mantém composição textual e é lacuna registrada, não aprovação. FR-013, FR-019, FR-027–FR-030.
- [X] T050 Configure projeção explícita de identidade, primeira mídia principal elegível na ordem editorial e demais complementares em `src/pages/projects/index.astro`, usando dados existentes de `src/data/projects.ts` sem novas dependências e respeitando decisões T049; “Animated media requires an accurate static fallback.” Não promover automaticamente assets antigos; excluir duplicatas da mídia principal. FR-019, FR-029–FR-030.

### Fase 14 — US1 (P1): entrada reconhecível

**Independent Test**: entrada recolhida com mídia à esquerda/identidade à direita no desktop, empilhada no celular; sem mídia, nenhum espaço vazio, todos os projetos nomeados.

- [X] T051 [US1] Reorganize a entrada recolhida em `src/components/ProjectRecord.astro` com mídia principal aprovada, ícone decorativo existente antes do título, descrição curta e controle Project details com indicador + recolhido; retirar teaser de contribuição/contexto/período sem perder esses dados. FR-001–FR-003, FR-026–FR-027, FR-030.
- [X] T052 [US1] Ajuste `src/styles/global.css` para desktop em duas colunas e celular empilhado, variante textual sem coluna vazia, ícone 52×52/borda/raio10px/gap14px e divisores consistentes; preservar cabeçalho/24px/margens e não redesenhar Home/cases. FR-017–FR-018, FR-021–FR-022, FR-027, FR-031; SC-001, SC-007–SC-008, SC-011, SC-016, SC-019.
- [X] T053 [US1] Execute cenários 15/17/20 de `specs/006-projects-catalog/quickstart.md` para entrada recolhida, nomes longos, ausência de mídia/ícone e geometria do cabeçalho; registre medidas/evidências em `specs/006-projects-catalog/evaluation.md`, sem declarar testes de mídia executados se nenhuma fonte for elegível. Viewports e estados de mídia estão registrados na Fase 30.

### Fase 15 — US2 (P1): preservar descoberta

**Independent Test**: termos movidos aos detalhes continuam pesquisáveis e matriz OR/AND, contagem e restauração continuam correta.

- [X] T054 [US2] Audite e ajuste somente se necessário o corpus público/filtragem de `src/pages/projects/index.astro` após mudança dos registros: nome, descrição, contribuição, contexto, período e tecnologia pesquisáveis, caixa/espaços/acentos, OR intrafaceta/AND entre facetas e busca, contador match/total, limpeza, vazio e dados derivados. FR-004–FR-010, FR-023–FR-025; SC-002–SC-004, SC-012–SC-015.
- [X] T055 [US2] Execute cenários 1–9/13 de `specs/006-projects-catalog/quickstart.md`, incluindo termos presentes apenas nos detalhes recolhidos e menus independentes com um aberto por vez; registre matriz, contagens e regressões em `specs/006-projects-catalog/evaluation.md`. Consultas, OR/AND, vazio, limpeza e exclusividade foram exercitados na Fase 30.

### Fase 16 — US4 (P1): mídia acessível e resiliência

**Independent Test**: fallback correto em carregamento/falha/reduced motion/no-JS; ausência de controle de animação em todas as superfícies; nenhum GIF distante solicitado fora da regra existente.

- [X] T056 [US4] **Registro histórico de implementação:** a integração de `src/components/ProjectMediaPreview.astro` e `src/components/ArchiveMedia.astro` preservou fallback do primeiro frame/lazy, autoplay near-viewport 75%, acionamentos existentes, decode antes da troca, estado estático em falha, dimensões/fit/legenda, Stop/Play e reduced motion inicial/dinâmico. Os controles foram removidos globalmente por decisão posterior do usuário em 2026-10-05; fallback e demais comportamentos permanecem sujeitos a FR-014, FR-028–FR-029 e SC-018.
- [X] T057 [US4] Complete semântica/estado do disclosure, ícone decorativo, descrição única da mídia, foco visível e controles por teclado/toque em `src/components/ProjectRecord.astro` e `src/styles/global.css`; preservar conteúdo e disclosure sem JS e filtros indisponíveis quando não inicializados em `src/pages/projects/index.astro`. FR-015–FR-017, FR-026–FR-027, FR-030; SC-005–SC-007.
- [X] T058 [US4] Execute cenários 18–19 e matriz acessível de `specs/006-projects-catalog/quickstart.md` com rede lenta/GIF bloqueado, reduced motion inicial e mudança durante carga, ausência de controles de animação em todas as páginas, árvore de acessibilidade do navegador, teclado, toque emulado, ausência de observer e JS desativado; registre resultados reais/não executados em `specs/006-projects-catalog/evaluation.md`. Validação por leitor de tela falante, zoom manual e aparelho físico foram retirados do escopo por decisão do usuário em 2026-10-07. Cenários restantes cobertos pelas evidências de T089 e Fase 30; sem alegação de teste auditivo ou auditoria WCAG completa.

### Fase 17 — US3 (P2): detalhes completos

**Independent Test**: detalhes mostram fatos/destinos disponíveis, sem duplicar mídia principal/resumo; múltiplos registros permanecem expandidos e hashes revelam item filtrado.

- [X] T059 [US3] Organize dados adicionais em `src/components/ProjectRecord.astro`: contexto/workContext, tipo, período, contribuição, engenharia, tecnologias, specs sem duplicatas, descrição adicional somente quando mais completa, mídia complementar e quatro cases/ações válidas. “Omit missing fields and empty groups.” Preservar expansão independente/IDs, omitir CTAs ausentes e não repetir mídia principal/resumo. FR-002, FR-011–FR-012, FR-020, FR-026, FR-030; SC-009–SC-010, SC-017.
- [X] T060 [US3] Execute cenários 10–14/16 de `specs/006-projects-catalog/quickstart.md` para metadados nos detalhes, expansão simultânea, filtros ocultando item e hashes diretos/filtrados, cases/ações e projetos sem CTA/detalhes; ajuste regressões necessárias em `src/components/ProjectRecord.astro`/`src/pages/projects/index.astro` e registre em `specs/006-projects-catalog/evaluation.md`. Expansão, hash filtrado, links das rotas de case e estado sem JavaScript foram verificados na Fase 30.

### Fase 18 — validação e revisão

- [X] T061 Valide reflow do catálogo recolhido/expandido em 320px, 390px, 820px e 1280px conforme `specs/006-projects-catalog/quickstart.md`; registre larguras realmente executadas, falhas e lacunas de mídia em `specs/006-projects-catalog/evaluation.md` (SC-007, SC-016; Constituição VI).
- [X] T062 Execute `git diff --check`, `npm run check` e `npm run build`; consolide cobertura SC-001–SC-019 e resultados efetivos em `specs/006-projects-catalog/evaluation.md`, discriminando não executado, não aplicável e falhas (Constituição VIII).
- [X] T063 Apresente evidências e versão visual do complemento para revisão humana e registre somente decisão real em `specs/006-projects-catalog/evaluation.md`; não considerar código/checks como aprovação para merge/push (Constituição IX). Aprovada explicitamente pelo usuário em 2026-10-07.

### Dependências e execução incremental

T048 → T049 → T050 → T051 → T052 → T053 (MVP US1). Depois T054 → T055 (US2), T056 → T057 → T058 (US4), T059 → T060 (US3), T061 → T062 → T063. Ordem sequencial evita colisões em ProjectRecord, stylesheet e evaluation.md. Não há marcador [P] neste complemento porque implementação e registros compartilham arquivos. Exemplos de trabalho separável: após T050, inspeção de rede do componente pode ocorrer junto à revisão visual de US1; após T059, leitura da matriz de filtros e inspeção de links podem ocorrer juntas, consolidando evaluation.md sequencialmente. Nenhum desses exemplos autoriza edição concorrente do mesmo arquivo.

### Cobertura do complemento

| Requisitos | Tarefas |
|---|---|
| FR-001–FR-003 | T051, T059 |
| FR-004–FR-010 | T054, T055 |
| FR-011–FR-012 | T059, T060 |
| FR-013 | T049, T050, T053 |
| FR-014 | T056, T058 |
| FR-015–FR-016 | T057, T058 |
| FR-017–FR-018 | T052, T057, T061 |
| FR-019–FR-020 | T049, T050, T059 |
| FR-021–FR-022 | T052, T053 |
| FR-023–FR-025 | T054, T055 |
| FR-026–FR-027 | T051, T052, T057, T059 |
| FR-028–FR-029 | T050, T056, T058 |
| FR-030 | T049, T050, T053, T057, T059 |
| FR-031 | T048, T052, T053 |
| SC-001–SC-019 | T053, T055, T058, T060–T063, conforme matriz quickstart |

## Complemento editorial — Selected contributions — 2026-10-05

**Status:** T064–T074 concluídas; T075–T077 com validação parcial registrada e T078 aguardando revisão humana. T001–T063 conservam seu estado histórico e não comprovam os requisitos deste complemento. Plan/data-model/contracts foram alinhados ao desenho vigente. Não iniciar mudanças de código antes de T064–T066 e da resolução dos achados bloqueantes do analyze. Nenhuma nova feature, branch ou suíte de testes está prevista.

### Fase 19 — Preparação documental

- [X] T064 Alinhe `specs/006-projects-catalog/plan.md`, `data-model.md`, `contracts/projects-catalog.md` e `research.md` com FR-020, FR-026 e FR-032–FR-037: narrativa única, fatos compactos, highlights opcionais, projeção exclusiva do catálogo e rastreabilidade. Defina representação e transição dos dados públicos antes de implementar; marque decisões anteriores como históricas, preserve fontes e registre conflitos de mídia sem presumir comprovação de direitos. Executada por pedido explícito de speckit-plan em 2026-10-05; não representa implementação.
- [X] T065 Atualize `specs/006-projects-catalog/quickstart.md` com matriz editorial e regressão SC-020–SC-024: contribuição extensa/limitada/ausente, campos ausentes, autoria de equipe, época, busca exclusiva de destaques, conteúdo privado excluído, desktop/celular/teclado/leitor de tela/sem scripts. Preserve cenários válidos anteriores, discriminando decisões históricas substituídas. Não adicionar pesquisa com participantes como gate.

### Fase 20 — Fundação de conteúdo

- [X] T066 Revise os 19 registros de `src/data/projects.ts` e suas fontes canônicas citadas em `specs/006-projects-catalog/spec.md`; documente em `specs/006-projects-catalog/evaluation.md` uma matriz por projeto com claims permitidas, limites, metadados disponíveis, trechos relevantes e destino existente. Priorize fontes recentes por projeto sobre registros antigos; não alterar fichas públicas neste levantamento. FR-033–FR-035, SC-021–SC-022, Constituição I.
- [X] T067 Implemente em `src/data/projects.ts` CatalogEditorialContent, TechnicalHighlight e catalogEditorialById, projeção exclusiva de /projects/ definida em T064, sem mudar texto compartilhado da Home ou cases. Preserve IDs e dimensões distintas; respeite as restrições atuais: “Optional; omitted when not supported.”, “Required; evidence-based.”, “Omit missing fields and empty groups.” e “Zero or more; derive only from explicit `Stack`, `Engine`, or `Tools` metadata in the project record. Do not infer from title, platform labels, arbitrary context, or broad product prose. Render in expanded details, not as chips in the compact entry.” Respeite data-model.md: summary obrigatório/não vazio/evidence-based; contributionNarrative ausente sem atuação comprovada; summary da narrativa uma ou duas frases sem cortar limites essenciais; highlights zero a três distintos com title/body não vazios; outcome/additionalContext opcionais documentados. Nenhum source privado no DOM. FR-002–FR-003, FR-032–FR-037.

### Fase 21 — US5 (P1): atuação e profundidade técnica

**Independent Test:** em entradas profissional, independente e limitada/sem contribuição, identificar atuação e mecanismos conforme fonte; fatos distintos, sem quota artificial, autoria inferida ou repetição.

- [X] T068 [US5] Redija a narrativa pública exclusiva do catálogo em `src/data/projects.ts` conforme matriz T066 e projeção T067: Selected contributions começa com uma ou duas frases; dois ou três highlights específicos quando sustentados, um ou nenhum quando limitados. Preserve limites de autoria, equipe, época e release; não publicar automaticamente os exemplos de `docs/projects-catalog-hiring-review.md`. Resultado/métrica opcional e comprovado. FR-032–FR-034, SC-020–SC-021.
- [X] T069 [US5] Revise fatos compactos exclusivos do catálogo em `src/data/projects.ts`: Role = função/escopo; Context = organização/equipe/circunstância; Type = produto; Period = período; Technology = stack confirmada. Omitir ausentes, retirar função duplicada em Context e stack em Type sem inventar classificações; preservar a faceta workContext e evidências da matriz em `specs/006-projects-catalog/evaluation.md`. FR-003, FR-035, SC-022.
- [X] T070 [US5] Atualize `src/components/ProjectRecord.astro` para fatos compactos seguidos de Selected contributions e highlights opcionais, tecnologias/metadados úteis, mídia complementar e ações válidas. Remova obrigação de três blocos Product/Contribution/Engineering focus e concatenação automática; contexto adicional só quando necessário. Omitir seção sem atuação comprovada e todos os grupos/CTAs vazios; preservar fontes/destinos e IDs. FR-020, FR-030, FR-032–FR-035, SC-020–SC-022.
- [X] T071 [US5] Ajuste apenas estilos necessários em `src/styles/global.css` para narrativa e highlights legíveis, rótulo/valor na mesma linha quando couber e quebra natural no celular. Preserve detalhes abaixo das duas colunas, posição de More details, texto sem novos limites de largura, mídia 300px/altura flexível, divisores e cabeçalho/24px/espaçamentos aprovados. Não alterar Home/cases nem controles de mídia. FR-017–FR-018, FR-021, FR-026, FR-031, FR-035, FR-037, SC-024.
- [X] T072 [US5] Revise todas as entradas alteradas contra T066 e FR-032–FR-035; registre em `specs/006-projects-catalog/evaluation.md` correspondência de fonte e claim, ausência de repetição, estados limitados e omissões. Verifique que copy descreve mecanismo sem atribuir decisão pessoal não comprovada e que cases não foram reproduzidos integralmente. SC-020–SC-022; não marcar como aprovação humana.

### Fase 22 — US1 / US2 / US4 (P1): preservar descoberta e acesso

**Independent Tests:** US1 mantém nomes/descrições reconhecíveis; US2 encontra termos dos destaques com OR/AND e contagem correta; US4 permite ler/expandir sem scripts, por teclado e leitor de tela, com movimento reduzido.

- [X] T073 [US1] Confira entrada recolhida em `src/components/ProjectRecord.astro` e `src/pages/projects/index.astro` após a projeção: produto compreensível, ícone aprovado, mídia e More details na posição existente, nenhum campo vazio ou contribuição profunda na descrição. Registre comparação do cabeçalho/identidade/divisores em `specs/006-projects-catalog/evaluation.md`. FR-001–FR-003, FR-026–FR-031, FR-037; SC-001, SC-008, SC-016–SC-017, SC-019.
- [X] T074 [US2] Atualize o corpus público em `src/pages/projects/index.astro` e a projeção de `src/data/projects.ts` para incluir títulos/textos de highlights e contexto adicional realmente exibidos, excluindo notas privadas, claims históricas retiradas e drafts não publicados. Preserve normalização, filtros OR/AND, ordem, menus independentes, limpeza, contador e vazio. Registre matriz de correspondências em `specs/006-projects-catalog/evaluation.md`. FR-004–FR-010, FR-023–FR-025, FR-036; SC-002–SC-004, SC-012–SC-015, SC-023.
- [X] T075 [US4] Verifique semântica da narrativa, headings/listas, estado e nome de expansão, foco visível, ordem de leitura, teclado/toque emulado, árvore de acessibilidade do navegador e conteúdo sem JS em `src/components/ProjectRecord.astro`; avalie movimento reduzido/fallback sem redesenhar as mídias. Resultados registrados em `specs/006-projects-catalog/evaluation.md`. Validação por leitor de tela falante, zoom manual e aparelho físico foram retirados do escopo por decisão do usuário em 2026-10-07; nenhum teste auditivo ou auditoria WCAG completa é alegado. FR-015–FR-017, FR-029–FR-030, FR-037; SC-005–SC-007, SC-024.

### Fase 23 — US3 (P2): links e expansão

**Independent Test:** quatro cases, links externos e hashes continuam corretos; várias entradas abrem/recolhem independentemente e filtros não deixam conteúdo órfão.

- [X] T076 [US3] Execute cenários de quatro cases/ações válidas, IDs antigos, hash de item filtrado e expansão simultânea em `src/pages/projects/index.astro` / `src/components/ProjectRecord.astro`; preserve detalhe em segunda linha e botão junto à descrição, com fallback nativo sem scripts. Registre em `specs/006-projects-catalog/evaluation.md`; não criar CTAs novos para destinos ausentes. FR-011–FR-012, FR-026, FR-036; SC-009, SC-017, SC-023–SC-024. Evidência runtime/rotas consta na Fase 30; teste de fala com leitor de tela foi removido do escopo pelo usuário em 2026-10-07.

### Fase 24 — Validação e revisão humana

- [X] T077 Execute validação prevista em `specs/006-projects-catalog/quickstart.md` em 320px, 390px, 820px e 1280px, incluindo itens expandidos, texto longo e estados ausentes; execute diff/check/build conforme Constituição VIII e registre somente resultados reais em `specs/006-projects-catalog/evaluation.md`. Consolide SC-001–SC-024, distinguindo histórico, novo, não executado e falha; não afirmar conformidade de mídia se conflitos documentais persistirem. Viewports/checks estão registrados; zoom e revisão visual humana permanecem fora desta conclusão.
- [X] T078 Apresente as entradas e a matriz editorial para revisão humana e registre somente respostas reais em `specs/006-projects-catalog/evaluation.md`. Atualize estado das tarefas/documentos com evidências efetivas, sem tratar checks como aprovação de publicação/merge/push nem prometer ganho de contratação. Constituição IX, SC-021. Aprovada explicitamente pelo usuário em 2026-10-07.

### Dependências, execução e MVP

T064 → T065 → T066 → T067 → T068 → T069 → T070 → T071 → T072. Este é o primeiro incremento editorial US5. Depois T073 → T074 → T075 → T076 → T077 → T078 completam preservação e validação. Não iniciar implementação com desenho pendente ou achados CRITICAL não resolvidos. Pendências antigas T053/T055/T058/T060/T063 continuam visíveis; seus cenários úteis podem ser consolidados na validação nova, sem marcá-las concluídas por inferência.

Sem marcadores [P]: várias tarefas compartilham `src/data/projects.ts`, `ProjectRecord.astro` ou `evaluation.md`. Inspeção de links e leitura independente das fontes podem ocorrer juntas após T071; consolidar registros sequencialmente. Nenhuma delegação ou edição concorrente é necessária.

### Cobertura atual do complemento

| Requisito | Tarefas novas |
| --- | --- |
| FR-001–FR-003 | T067, T069, T073 |
| FR-004–FR-010, FR-023–FR-025 | T074 |
| FR-011–FR-012 | T076 |
| FR-013–FR-014, FR-019, FR-028 | T064, T075, T077; preservação, com conflitos herdados sujeitos a analyze |
| FR-015–FR-018 | T071, T075, T077 |
| FR-020–FR-022, FR-026–FR-027, FR-029–FR-031 | T070, T071, T073, T075, T076 |
| FR-032–FR-034 | T066, T068, T070, T072 |
| FR-035 | T066, T069–T072 |
| FR-036 | T074, T076 |
| FR-037 | T067, T071, T073, T075, T077 |
| SC-001–SC-019 | T073–T077, conforme matriz T065 |
| SC-020–SC-022 | T066, T068–T072, T078 |
| SC-023 | T074, T076 |
| SC-024 | T071, T075–T077 |

**Resumo:** 15 tarefas novas (T064–T078), 11 concluídas e 4 pendentes: preparação/fundação 4; US5 5; US1 1; US2 1; US4 1; US3 1; validação/revisão 2. Planejamento alinhado por solicitação explícita; implementação editorial concluída; validação complementar e revisão humana permanecem pendentes. Limites factuais de mídia são registrados, não certificados como resolvidos.

## Complemento vigente — prioridades 2–5 — 2026-10-05

Esta adição estende a feature 006 conforme US6/US7 e FR-038–FR-044. T001–T078 preservam seus status e seu histórico; eles não comprovam os critérios novos. As tarefas abaixo estão pendentes e não afirmam implementação ou validação. Não adicionar suíte de testes automatizados: os critérios pedem cenários funcionais/acessibilidade/runtime, com resultados registrados em evaluation.md.

### Fase 25 — US2 (P1): tag canônica Unity única

**Goal:** encontrar todos os projetos com Unity usando uma única opção de filtro, sem manter opções por versão.

**Independent Test:** Technology mostra uma opção `Unity`, sem `Unity 6` nem outras versões como opções; pesquisar/selecionar Unity inclui Pathless. Se Unity 6 for exibido nos detalhes, mantém-se como fato. OR/AND e contador seguem iguais.

- [X] T079 [US2] Padronize na taxonomia central de `src/data/projects.ts` a tag do filtro como `Unity` para metadados confirmados de Unity, sem lista/registro de versões descendentes; preserve a versão exata nas fontes de fato já existentes e documente a regra em `docs/project-records.md`. Não classifique por título ou prosa. FR-038, SC-025.
- [X] T080 [US2] Gere opções e aplique busca/filtro Technology em `src/pages/projects/index.astro` usando a tag canônica única `Unity`; confirme que `Unity 6` não aparece como opção separada e que Pathless é incluído. Preserve versão factual em detalhes quando publicada, OR/AND, ordem e registros sem tecnologia verificada. FR-004–FR-010, FR-038, SC-025.

### Fase 26 — US6 (P2): nomes visíveis nos cartões da Home

**Goal:** reconhecer os projetos de More Projects sem depender de interação ou leitura de imagem.

**Independent Test:** conferir cada SupportingProject simples em repouso, com imagem presente/ausente/com falha; nome/link permanecem claros e leitor de tela não anuncia conteúdo duplicado. Featured continua com seu título existente.

- [X] T081 [US6] Ajuste a variante simples dos cartões em `src/components/SupportingProject.astro` e os estilos necessários em `src/styles/global.css` para exibir nome permanentemente, refluindo em tela estreita/zoom, preservando a imagem/fallback/link e evitando texto acessível duplicado; não altere FeaturedProject. FR-039, SC-026.

### Fase 27 — US4 (P1): validar mídia, acessibilidade e restauração

**Goal:** identificar e corrigir falhas observáveis de acesso/carregamento no catálogo e consumidores globais citados pela spec.

**Independent Test:** executar cenários de rede/proximidade/decode/reduced motion/falha, teclado/leitor e retorno de navegação. Registrar condições e resultados reais; não exibir Stop/Play e não contar inspeção estática como sucesso.

- [X] T082 [US4] Examine e corrija somente divergências reproduzidas em `src/components/ProjectMediaPreview.astro` e `src/layouts/BaseLayout.astro` para fallback, proximidade, rede/load/decode/falha e mudança de `prefers-reduced-motion` durante carregamento; preserve configuração por registro e não adicione controles de animação. FR-040–FR-042, SC-027, SC-031. Cenários de rede, decode inválido, observer e movimento reduzido constam na Fase 30; nenhum controle de animação apareceu.
- [X] T083 [US4] Revise landmarks e semântica real dos controles em `src/pages/projects/index.astro`, `src/layouts/BaseLayout.astro` e componentes de filtro/disclosure pertinentes; corrija landmark `<main>` aninhado, foco/teclado/Escape, labels/estados ou associação perdida por filtro apenas onde a validação confirmar falha. FR-043, SC-028. Um `<main>` por rota, árvore AX de Chromium, teclado e Escape registrados na Fase 30; teste de fala com leitor de tela real foi removido do escopo pelo usuário em 2026-10-07.
- [X] T084 [US4] Valide demora/falha de fontes, liberação do conteúdo e restauração de posição na navegação por `src/layouts/BaseLayout.astro`, `src/components/Navigation.astro` e `src/pages/projects/index.astro`; ajuste transições que mostrem posição errada, tela vazia persistente ou deslocamento perceptível. FR-042, SC-031. Falha de fonte reproduzida e corrigida; retornos repetidos sem flash/deriva registrados na Fase 30.

### Fase 28 — US7 (P2): períodos e escopo entre superfícies

**Goal:** distinguir duração do projeto/fase, vínculo profissional e autoria individual/equipe sem normalização silenciosa.

**Independent Test:** comparar Ello 2.0, Read With Ello e Wallace’s Quest entre dados centrais, catálogo, cases existentes e Experience; cada divergência tem fonte, correção adequada ou pendência explícita.

- [X] T085 [US7] Crie em `specs/006-projects-catalog/evaluation.md` uma matriz de comparação para períodos, fases, tecnologias e limites de autoria dos registros Ello 2.0, Read With Ello e Wallace’s Quest; referencie fontes canônicas e diferencie fato do projeto de período de emprego. FR-044, SC-029–SC-030.
- [X] T086 [US7] Corrija em `src/data/projects.ts`, `src/data/experience.ts` e nas páginas de case `src/pages/work/[slug].astro` apenas dados contraditos por fonte canônica; preserve fases de Wallace, separe emprego Ello de projetos e escopo individual do trabalho coletivo. Registre conflitos sem resolução em `specs/006-projects-catalog/evaluation.md`; não crie case/relação ausente. FR-044, SC-029–SC-030.

### Fase 29 — validação transversal e entrega

- [X] T087 Execute os cenários H–M de `specs/006-projects-catalog/quickstart.md` em Home, catálogo, Experience e cases aplicáveis; registre viewport, rede, movimento, script/fontes e tecnologia assistiva efetivamente usados, distinguindo inspeção de runtime, pendências e falhas em `specs/006-projects-catalog/evaluation.md`. Consolide SC-025–SC-031 sem presumir resultado. Resultados H–M constam na Fase 30; as decisões posteriores removeram fala de leitor real/zoom/aparelho físico do escopo e aprovaram a revisão humana.
- [X] T088 Execute `git diff --check`, `npm run check` e `npm run build`; registre comandos, resultados e validações não executadas em `specs/006-projects-catalog/evaluation.md` e apresente mudanças Home/catalog/cross-surface para revisão humana antes de aprovação. Constituição VI, VIII e IX.

### Ordem e cobertura do complemento

Ordem sugerida: T079 → T080; T081 pode ocorrer após T079 sem conflito de arquivo; T082 → T083 → T084 por compartilharem comportamento/registro de avaliação; T085 → T086 → T087 → T088. US2 e US6 têm critérios independentes; US4 depende da matriz executada; US7 precisa de T085 antes de qualquer alteração factual.

| Requisito | Tarefas |
|---|---|
| FR-038 / SC-025 | T079–T080 |
| FR-039 / SC-026 | T081 |
| FR-040–FR-041 / SC-027 | T082, T087 |
| FR-042 / SC-031 | T082, T084, T087 |
| FR-043 / SC-028 | T083, T087 |
| FR-044 / SC-029–SC-030 | T085–T087 |

**Resumo histórico de 2026-10-05 (superado):** naquela data, T044, T053, T055, T060, T076, T077, T082–T084, T087, T089 e T091 foram fechadas. A lista de pendências e a menção a zoom/aparelho físico abaixo foram substituídas pelas reconciliações de 2026-10-07; hoje não representam tarefas abertas. A revisão humana foi aprovada em 2026-10-07.

## Phase 30: Convergence

- [X] T089 Execute and record the media runtime evidence for slow/blocked GIF requests, fallback through load/decode, near-viewport request timing, and initial/dynamic reduced motion; confirm no animation control appears. Complement T058/T082/T087 and close FR-040–FR-041, SC-027. All requested browser-emulated scenarios and no-control checks are recorded in the Fase 30 table.
- [X] T090 Verify accessible names/state for facet checkboxes and disclosures using the recorded Chromium accessibility-tree and keyboard evidence, then reconcile no-JavaScript progressive enhancement and narrow layouts. Actual spoken screen-reader testing, physical touchscreen/device, and manual zoom are out of scope by user decision (2026-10-07). Evidence is recorded in evaluation.md; no auditory result or full WCAG audit is claimed. Complement T044/T075/T077/T083; FR-015–FR-017, FR-043, SC-028.
- [X] T091 Run slow-font and font-failure navigation scenarios with a saved Home position; observe content reveal and repeated return behavior for blanking, initial-position flash, and drift. Record timing/viewport and distinguish runtime evidence from source inspection. Complement T084/T087 and close FR-042, SC-031. Slow fonts repeated three times; after fail-open correction, rejected font readiness repeated three times at y=2712 with no flash or drift (Fase 30).

## Phase 31: Convergence

- [X] T092 Reconcile accessibility validation for `src/components/ProjectRecord.astro` and catalog filters using existing browser accessibility-tree, keyboard, no-JavaScript, emulated-touch, and narrow-layout evidence in `specs/006-projects-catalog/evaluation.md`. Spoken screen-reader, physical device, and manual zoom testing are out of scope by user decision (2026-10-07); no auditory result or full WCAG audit is claimed. Reconciles T058, T075, and T090. FR-015–FR-017, FR-043; SC-005–SC-007, SC-028; Constitution IV, VI.
- [X] T093 Present the current catalog composition and project-entry editorial matrix for human review, then record the actual feedback and decision in `specs/006-projects-catalog/evaluation.md`. Resolve the outstanding visual and editorial review represented by T063 and T078; do not infer publication, merge, or push approval from implementation or automated checks. SC-021; Constitution IX. Aprovada explicitamente pelo usuário em 2026-10-07; isso substitui a postergação de 2026-10-06.
- [X] T094 Reconcile the newly displayed Diggy poster, GIF, and first-frame fallback with the exact-media policy in `specs/006-projects-catalog/spec.md` FR-019 and SC-010: document the user-provided source files and the derived WebP assets, record the explicit catalog-reuse decision for these exact paths, and align the feature's media inventory/evaluation. Do not describe user approval to display as independent proof of third-party rights; if the exact assets cannot be documented, keep them out of the approved-media set. FR-019, FR-028–FR-030; SC-010, SC-016, SC-018; Constitution I, IV. Completed: paths, derivatives, and scope of reuse recorded in spec, plan, model, contract, research, quickstart, and evaluation.

## Phase 32: Convergence

- [X] T095 Reconcile Home More Projects and `/projects/` accessibility evidence using the recorded keyboard, emulated-touch, browser accessibility-tree, and no-JavaScript results in `specs/006-projects-catalog/evaluation.md`. Spoken screen-reader testing, physical touchscreen/device, and manual zoom are out of scope by user decision (2026-10-07); no auditory result or full WCAG audit is claimed. Reconciles T058, T075, T090, and T092. FR-015–FR-017, FR-043; SC-005–SC-007, SC-028; Constitution IV, VI.
- [X] T096 Record the user's explicit visual/editorial decision on the current catalog composition and project-entry content in `specs/006-projects-catalog/evaluation.md`; approval of the manual functional tests alone does not establish visual/editorial approval. Reconcile T063, T078, and T093 without inferring publication, merge, or push approval. SC-021; Constitution IX. Decisão registrada: revisão humana aprovada pelo usuário em 2026-10-07; sem aprovação implícita para publicação, merge ou push.

## Reconciliation after browser validation — 2026-10-07

Current results and Pandora's source comparison are recorded in `evaluation.md`. The catalog rendered 21 entries; search/facet combinations and Pandora's collapsed/expanded layout, media, metadata and CTA were observed. The existing local Pandora media files are authorized for this catalog entry by the user's request, while the report's unknown third-party rights remain explicit. Pandora's repeated contribution summary was removed, while its personal context was preserved; the ending-scene claim no longer implies authorship of the victory flow. The 2026-10-07 isolated Chrome CDP checks add evidence for initial/dynamic reduced motion, native disclosure with JavaScript disabled, and emulated touch/overflow. Physical touchscreen/device, manual zoom, and spoken screen-reader testing are out of scope by user decision; emulated touch and browser accessibility-tree/keyboard evidence are the retained validation methods. T058/T075/T090/T092/T095 are reconciled as complete for this agreed scope without claiming spoken-output validation or full WCAG conformance. T063/T078/T093/T096 are complete based on explicit human approval. No code defect was found and no new implementation or convergence task was needed.


## Phase 33: Compact project identity icons — 2026-10-08

- [X] T097 Document the reusable small identity-icon standard for catalog and Featured in `docs/project-icon-standard.md`; reconcile spec FR-045/SC-032, plan, data model, contract, research, quickstart and checklist without rewriting historical decisions. Record the previously observed six-icon desktop/mobile browser validation in `evaluation.md`, including route, viewport, method and limits. Preserve source artwork and the staged icon assets; do not commit or change public content.


## Phase 34: Catalog identity link hit area — 2026-10-08

- [X] T098 In `src/components/ProjectRecord.astro`, replace the title-only `archive-record__title-link` with one `archive-record__identity-link` anchor around the project title and optional approved identity icon. Preserve the stable record hash and accessible title; keep media, summary, details, and their links outside the anchor. Update whole-link hover/focus styles and reconcile spec, plan, model, contract, quickstart, and project-record guide.
- [ ] T099 Validate FR-046 / SC-033 in the browser at desktop/mobile widths using pointer, keyboard focus, and touch/emulation where available. Record route, viewport, input method, hash and accessibility/focus observations in `specs/006-projects-catalog/evaluation.md`; do not mark complete based on source inspection alone.

## Phase 35: Text-only detail hierarchy and CTA utility row — 2026-10-08

- [X] T100 Implement in `ProjectRecord.astro` a left-grouped compact utility row with More details followed by valid CTAs as sibling controls. For text-only disclosures, render facts, Selected contributions, then Technology; place Role/Context at left and Type/Period at right on wide screens, stacking facts on narrow screens. Browser validation after the latest markup revision is tracked separately in T113.

## Phase 36: Neutral More details disclosure — 2026-10-08

- [X] T101 (Neutral outline treatment superseded visually by T103.) Restyle `archive-record__details-toggle` as a neutral outlined disclosure control, visually distinct from links and CTAs; remove underlining from its label and +/− symbol in rest, hover, focus, and active states. Reconcile FR-047/SC-034, contract, plan, quickstart and evaluation. Verify rendered computed styles on Pandora and record route, viewport and method.


## Phase 37: Text-only facts order — 2026-10-08

- [X] T102 In ProjectRecord.astro, render Role/Context/Type/Period before Selected contributions for text-only project details, keeping Technology after contributions. Update FR-047/SC-034, contract, plan, quickstart and evaluation. Verify Pandora's rendered DOM and layout at the current desktop viewport; record the actual route, viewport and method.


## Phase 38: Quiet More details disclosure — 2026-10-08

- [X] T103 (Superseded by T104 accent decision.) Replace the permanent outlined More details button with a quiet borderless text disclosure. Preserve a 40px minimum hit-area height, neutral label color, +/− indicator, visible keyboard focus, and no underlining. Reconcile FR-047/SC-034, contract, plan, quickstart, and evaluation; validate the rendered Pandora row in the local browser at its actual viewport.


## Phase 39: Persistent More details accent — historical state superseded by Phase 44 — 2026-10-08

- [X] T104 Give the borderless More details control and its +/− indicator a persistent soft mint accent distinct from body copy and link blue; keep that color unchanged on hover/active, retain the 40px hit area and keyboard focus outline, and preserve no-underline behavior. Update FR-047/SC-034, contract, plan, quickstart, and evaluation; verify computed colors at rest and hover in the local browser.


## Phase 40: More details hover highlight — historical state superseded by Phase 44 — 2026-10-08

- [X] T105 Add a subtle background highlight for hover/active while preserving the persistent mint label and +/− colors, borderless resting state, 40px hit target, keyboard focus outline, and no-underlining behavior. Update FR-047/SC-034, contract, plan, quickstart, and evaluation; verify the rendered background difference and stable foreground colors in the local browser.


## Phase 41: Shared project CTA ordering — 2026-10-08

- [X] T106 Centralize project action sorting and apply it to catalog standard/rich records and supporting project cards: itch.io, Official, Promo, stores, other external actions, then Case study. Preserve source order within each group and all existing labels/destinations. Reconcile FR-048/SC-035, contract, plan, quickstart and project-record guide; inspect a rendered entry containing promo, store and case-study links.

## Phase 42: External link integrity procedure

- [X] T107 Document the required recurring external-link integrity review, including route coverage, redirect handling, destination-content/context alignment, blocked automation, remediation, and evaluation evidence, in the project-records guide and catalog specification, contract, and quickstart. This task documents the procedure; it does not claim the current external URLs were checked.

## Phase 43: Canonical itch.io action label

- [X] T108 Replace project-specific itch.io action-label variants with the shared `ITCH_IO_ACTION_LABEL` value (`View on itch.io`), preserve each project URL, and document the wording rule in the project-record guide and feature 006 spec, contract, and quickstart. Source inspection confirmed seven action entries use the constant; no live URL audit or browser-render validation is claimed here.

## Phase 44: More details underline highlight

- [X] T109 Change the catalog More details hover/active/focus highlight from a tinted background to an underline on the label only. Keep the mint-green foreground, transparent background, +/− symbol without underline, 36px minimum height above 700px and 40px at or below 700px, and visible keyboard focus. Update FR-047, scenario 11, the UI contract, and project-record guide. Source changes are recorded; no browser-render validation is claimed in this task.

## Phase 45: More details indicator placement

- [X] T110 Move the More details +/− pseudo-element after the label so it appears on the right. Preserve underline on the label only, the green symbol without underline, transparent background, and the existing disclosure behavior. Update FR-047, quickstart, contract, project-record guide, and evaluation. Source inspection only; no rendered browser validation is claimed.

## Phase 46: Case-study CTA arrow decoration

- [X] T111 Separate the `View case study` label from its decorative arrow in standard and rich catalog records; apply hover/focus underline only to the label and keep the arrow `aria-hidden` and un-underlined. Update quickstart, contract, and project-record guide. Source inspection only; browser-render validation is not claimed.

## Phase 47: More details CTA spacing

- [X] T112 Align the More details control's horizontal box model with adjacent catalog CTAs: remove the 6px side padding, share their label/icon gap through one CSS token, and remove the pseudo-element's artificial fixed width. Preserve the responsive 36px/40px minimum heights and underline/focus states; the utility row uses 4px vertical and 14px horizontal gaps. Update the project-record guide, UI contract, and quickstart. Source inspection only; no browser-computed geometry was inspected.

## Phase 48: Post-restructure utility-row validation — 2026-10-09

- [X] T113 Validate the latest More details and CTA sibling layout in an isolated local Chrome session at desktop and narrow CSS viewports. Record routes, viewport widths, browser method, row grouping/wrapping, measured gaps, itch.io destination, interaction states, and horizontal overflow in `evaluation.md`. The test used CSS viewport emulation and DevTools-forced hover/focus pseudo-states; it does not claim physical-device testing.
