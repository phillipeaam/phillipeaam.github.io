# Quickstart: Validate the Projects Catalog

This guide is for implementation and review after the catalog is built. It does not claim that the checks below have already run.

**Precedência vigente — 2026-10-05:** os cenários adicionais em “Extensão priorities 2–5” complementam e, onde conflitam, substituem o roteiro anterior. Nenhuma superfície deve apresentar Stop/Play; registro histórico não é resultado runtime.

**Método de interação vigente — 2026-10-07:** teste de toque pode ser feito por emulação do navegador em viewport estreito. Touchscreen e aparelho físico estão fora do escopo e não são gate de aceitação.

## Prerequisites and local run

- Node.js and npm versions supported by the project.
- Install repository dependencies with `npm install` if they are not present.
- Start the site using `npm run dev` and open the `/projects/` route printed by Astro.

## Build diagnostics

Run from the repository root:

```sh
npm run check
npm run build
git diff --check
```

Expected: Astro diagnostics and production build complete successfully; the diff check reports no whitespace errors. Record any command not run and its reason in the implementation handoff.

## Functional discovery scenarios

1. Open `/projects/` with no criteria. Confirm each published project has a recognizable text entry and the status shows the current data-derived total (currently 21).
2. Search for a full name and a partial name. Confirm only matching records remain and the count matches the displayed entries.
3. Search a contribution/product term and a verified technology. Confirm the public detail corpus can match and no deferred/internal record appears.
4. Repeat a query with different letter case, surrounding spaces, and without Portuguese accents. Confirm equivalent matching.
5. Select two values within Context, then two within Technology. Confirm a record matching either selected value within its facet remains; both facets and query together narrow with AND.
6. Search for an option inside each open facet panel. Confirm only facet options are narrowed until one or more checkboxes are selected; verify selected options can be toggled independently.
7. Enter text with no matching options in each open facet. Confirm its local empty state appears while project results and their count remain unchanged.
8. Remove one selected criterion, then use clear-all. Confirm the count updates and the full archive is restored.
9. Use a query/facet combination with no matches. Confirm a concise empty message appears and the clear action restores results.
10. Expand details for two records at once, then close each independently. Filter one expanded record out and confirm its details are not left visible.
11. Open representative records with and without media, case link, external action, and optional metadata. Confirm More details is a quiet borderless text disclosure in a persistent mint-green color distinct from links; hover, activation, and keyboard focus underline only the label, never the +/− indicator, which appears to the right of the label. Confirm the background stays transparent in every state, the mint foreground remains unchanged, the control is at least 36px tall above 700px and 40px at or below 700px, and keyboard focus has a visible outline. Confirm the utility row uses 4px between wrapped rows and 14px between controls. Confirm valid case-study and external-action CTAs follow it closely in the left side of the collapsed utility row, in itch.io → Official → Promo → stores → other external actions → Case study order; verify destinations and narrow-screen wrapping. Expand a text-only record and verify facts → Selected contributions → Technology; on wide screens confirm Role/Context at left and Type/Period at right, then confirm the facts stack in that order on narrow screens. For each rendered media source, confirm provenance/authorization against `docs/stage-10-content-register.md` and `docs/repository-evidence-pass.md`; confirm GIF/animation is inline with an accurate static alternative, and absent/unverified media has no placeholder. No animation control is rendered anywhere.
12. Compare detail hierarchy and record separators across multiple projects; confirm tags/technology chips appear in details, not compact entries, and the heading matches the Home “More Projects” eyebrow, “All Projects” title, and supporting copy.
13. Confirm “Search for”, “Context”, and “Technology” are visible above their respective controls. Open Context, then Technology; confirm only Technology remains open while the Context choices persist. Reopen Context and confirm the reverse, then close an already-open selector.
14. Load an existing project hash directly and while filters would otherwise hide it. Confirm the intended project is revealed and reached without changing its stable ID.

## Accessibility and resilience scenarios

- With keyboard only, tab through the search, each facet trigger, its internal search field and checkboxes, clear actions, project links and disclosures; use Space to select a checkbox, verify visible focus and ensure focus is not unexpectedly moved during filtering.
- Inspect the browser accessibility tree for labels, selected facet state, disclosure state, result-count updates, and zero-result feedback; combine with keyboard interaction. Spoken screen-reader validation was removed from scope by user decision (2026-10-07), so do not claim auditory validation or full WCAG conformance.
- Enable reduced motion and verify comprehension and operation do not rely on animation; no GIF request should be made while reduced motion is active. Confirm the static alternative accurately represents the approved media. Do not add or expect an animation pause/play control.
- Disable JavaScript and reload. Confirm all records, core text, deep-link targets, native disclosures and core links remain available, and unavailable filters are not presented as working.
- Test narrow widths including 320 CSS px, a representative phone width, tablet, and desktop. Confirm all entries remain discoverable without page-level horizontal scrolling, overlap, or loss of essential text.

## Validation record

The feature does not include a participant study or before/after usability comparison. Record results for SC-001–SC-031 in `specs/006-projects-catalog/evaluation.md`, including scenarios actually run, actual viewport widths, accessibility checks, build diagnostics, and any unmet criterion or validation not performed. Do not present manual checks as participant research.

## Related artifacts

- [Feature spec](spec.md)
- [Implementation plan](plan.md)
- [Data model](data-model.md)
- [UI contract](contracts/projects-catalog.md)

## Complemento: matriz de validação nova (não executada)

15. Compare a entrada recolhida com o histórico 6679f07: mídia principal à esquerda e identidade/resumo/controle à direita em desktop; ícone 52×52, raio 10px, gap 14px. Em 320px, 390px, 820px e 1280px, confirmar reflow sem overflow; registrar apenas larguras efetivamente verificadas.
16. Expandir projeto: contribuição, contexto, tipo, período, stack, foco de engenharia e ações disponíveis nos detalhes; resumo e mídia principal não duplicados. Conferir quatro cases, destinos válidos e múltiplas expansões independentes.
17. Inspecionar fontes/citações de autorização para mídia e identidade. Exercitar entrada sem mídia, sem ícone, sem GIF, sem CTA e sem detalhes; não inventar assets. Se o inventário elegível permanecer vazio, registrar testes visuais de mídia como não executados, não como sucesso; testar componente com fontes canônicas verificadas somente se disponíveis.
18. Com rede observada, confirmar GIF distante não solicitado; aproximar a entrada até a faixa de 75% da altura do viewport e observar fallback até load/decode, depois troca sem salto de layout. Aplicar carregamento lento e bloquear GIF para confirmar fallback. Conferir proporção, fit, legenda e acionamentos configurados.
19. Movimento reduzido no carregamento inicial e ativado durante carga/reprodução: fallback correto, sem revelar animação pela conclusão tardia e sem solicitar GIF. Confirmar que nenhuma superfície apresenta controle Stop/Play. Verificar ausência de observer como fallback de autoplay existente e JS desativado como fallback estático/disclosure nativo.
20. Reexecutar cenários 1–14 após mover metadados para detalhes: corpus continua pesquisável, OR/AND, contador, limpeza, estado vazio, exclusividade dos menus, hashes e teclado permanecem corretos. Conferir cabeçalho contra versão aprovada, incluindo entrelinha 24px e margens. Verificar que Home/cases não foram redesenhados e, se componente compartilhado mudar, seus previews continuam corretos.
21. Executar diff/check/build, atualizar evaluation.md com evidências, lacunas e validações não feitas, e encaminhar mudança visual para revisão humana; não marcar aprovação por resultado automático.

## Roteiro vigente — complemento editorial (não executado)

Este roteiro substitui exigências históricas de três grupos separados, controles Stop/Play e mídia apenas nos detalhes. Não repetir cenários equivalentes por IDs distintos. Preservar o restante da matriz de busca/facetas e links.

| Cenário | Procedimento e resultado esperado | Critérios |
| --- | --- | --- |
| A — Conteúdo e fontes | Revisar 21 registros; confrontar afirmações com matriz canônica. Selected contributions só com autoria sustentada; highlights 0–3 conforme conteúdo; sem duplicação ou impacto inventado. Fatos semanticamente distintos, períodos qualificados. | SC-020–SC-022 |
| B — Estados ausentes | Avaliar profissional/independente/estudo, contribuição limitada/ausente, sem mídia/ícone/período/resultado/CTA. Omitir campos/grupos sem quota artificial; todos os nomes reconhecíveis. | SC-001, SC-009, SC-016–SC-017, SC-020–SC-022 |
| C — Busca e facetas | Nomes, produto, termos exclusivos dos títulos/body dos highlights; caixa/acentos; OR intrafaceta e AND entre facetas/query. Contagens corretas, clear, vazio; notas privadas/withdrawn não encontram registro. Um menu aberto, escolhas preservadas. | SC-002–SC-004, SC-012–SC-015, SC-023 |
| D — Links e expansão | Quatro cases, ações existentes, hashes diretos/filtrados, múltiplos details independentes; esconder projeto esconde seus detalhes. Não criar destinos. | SC-005, SC-017, SC-023–SC-024 |
| E — Reflow e baseline | 320/390/820/1280px: detalhes sob as duas colunas, More details junto à descrição com JS; fallback nativo sem JS. Sem overlap/corte/overflow; cabeçalho/24px/margens, mídia300px/flexível e largura textual aprovados preservados. | SC-007–SC-008, SC-011, SC-016, SC-019, SC-024 |
| F — Acesso e mídia | Teclado, toque emulado, árvore de acessibilidade do navegador, foco/estado e sem JS. Allowlist exata vigente, inclusive arquivos Diggy documentados em evaluation.md, e classificação correta da decisão de reutilização frente a direitos de terceiros; rede lenta/falha/proximidade/reduced motion inicial/dinâmico. Nenhum controle de animação em qualquer superfície. Teste de fala com leitor de tela real e aparelho físico foram removidos do escopo; não declarar validação auditiva ou conformidade integral. | SC-005–SC-006, SC-010, SC-018, SC-024 |
| G — Entrega | Diff/check/build conforme constituição; registrar apenas resultados reais e lacunas em evaluation.md. Revisão humana de narrativa e composição antes de considerar aprovada. | Constituição VI/VIII/IX |

Pré-condição editorial: plan/data-model/contrato alinhados e matriz por projeto preparada. Registrar viewports realmente usados e checks não executados. Estudos com participantes continuam fora desta implementação. Evidência antiga não comprova os requisitos novos; sem execução nesta rodada.

## Extensão priorities 2–5 — validação planejada, não executada

Este conjunto cobre US2, US4, US6, US7 e SC-025–SC-031. Usar registros do `evaluation.md` com projeto/rota, query/seleção, viewport, rede/movimento, estado de fontes/scripts, tecnologia assistiva, observação concreta e tipo de evidência. Não marcar como sucesso com base em inspeção de código quando o cenário pede runtime.

| Cenário | Procedimento e resultado esperado | Critérios |
|---|---|---|
| H — Tag Unity única | Confirmar que Technology apresenta exatamente uma opção `Unity`, nunca uma opção `Unity 6` ou outras versões; pesquisar/filtrar `Unity` inclui Pathless. Quando Unity 6 estiver publicado como fato detalhado, ele continua visível sem criar outra tag. Conferir que só metadados confirmados recebem Unity e que OR/AND permanecem. | SC-025 |
| I — Títulos Home | Na seção More Projects, conferir todos os cartões simples em estado padrão, sem hover/foco. Repetir com imagem presente, placeholder, erro e ausência em viewport estreito; verificar nome/link e ausência de anúncio duplicado. Confirmar Featured/Selected work sem duplicação. Testes manuais de zoom e aparelho físico estão fora do escopo por decisão do usuário (2026-10-07). | SC-026 |
| J — Mídia sob rede/movimento | Com DevTools/network observável, testar mídia distante e aproximação; fallback fica até readiness; falha/bloqueio/load/decode preservam fallback sem salto. Testar reduced motion no início e alterado durante request: sem pedido/revelação animada tardia. Repetir fallback sem JS e comportamento sem observer, conforme implementação especificada. Nenhum Stop/Play em qualquer rota. Registrar rede, timing e resultado real. | SC-027, SC-031 |
| K — Acesso e semântica | Em Home e `/projects/`, navegar por teclado, verificar foco, árvore AX, labels, disclosure/filtros, Escape quando aplicável, item ocultado, contagem, viewport de 320px e JS desligado; toque pode ser emulado no browser. Testes de fala com leitor real, em aparelho/touchscreen físico e zoom manual estão fora do escopo por decisão do usuário (2026-10-07). Nome/estado devem corresponder à interação; não alegar auditoria WCAG completa sem abrangência comprovada. | SC-028 |
| L — Datas e escopo | Confrontar Ello 2.0, Read With Ello e Wallace’s Quest entre registro central, catálogo, cases existentes e Experience. Separar intervalos de projetos/fases dos de emprego, versões/tecnologias e escopo individual/equipe. Atualizar só a fonte apropriada quando houver evidência; listar diferenças sem decisão como pendência. Não criar case/Experience inexistente. | SC-029, SC-030 |
| M — Navegação/restauração | Com DevTools/runtime, simular fonte lenta e falha, conteúdo antes/depois da inicialização, retorno a posição salva e mídia bloqueada/decode falho. Confirmar ausência de tela vazia persistente ou flash na posição errada. Inspeção de fonte é evidência complementar, não resultado deste cenário. | SC-031 |

Ao fechar a rodada, registrar SC-025–SC-031 separadamente de SC-001–SC-024, viewports e estados realmente executados, itens pendentes e correções; executar também `git diff --check`, `npm run check` e `npm run build`. A revisão humana continua obrigatória para mudanças visuais/editoriais. Nenhum teste ou browser foi executado ao atualizar este roteiro.


## N — Compact identity icons (FR-045 / SC-032)

For each record with `projectsIndexTitleIcon`, confirm the path resolves to a square 104 × 104 WebP derivative and record-specific reuse approval is present. Confirm the original poster/cover remains unchanged. In the browser, inspect `/projects/` and `/#featured` where applicable at desktop (1440 × 900 CSS px) and mobile (390 × 844 CSS px). Confirm rendering at 52 × 52 CSS px, reuse of the same canonical asset, loading without layout shift, recognizable/unclipped subject, and optical centering; compare product/company artwork with its approved identity. Confirm absent/unapproved icons leave no blank slot and the visible title remains. Record actual route, viewport, method, natural/rendered dimensions and observations in `evaluation.md`; source inspection alone does not prove visual centering.


## O — Project identity link (FR-046 / SC-033)

On `/projects/`, inspect catalog entries with and without media at desktop and mobile widths where available. Click the approved icon and different points in the title area; each must set the same record hash. Tab to the identity link and confirm the visible focus encloses the clickable identity. Verify the accessible link name comes from the project title, the decorative icon is not announced twice, and the summary/media/details actions remain separate. Repeat with emulated touch if available. Record route, CSS viewport, input method, resulting URL and focus/accessibility observations in `evaluation.md`.

## External link integrity check (required)

On every portfolio QA/release pass, and after changing a destination, collect the rendered public HTTP(S) links from the home page, catalog, published case studies, experience, recommendations, and contact/social areas. Deduplicate identical URLs. For each one, record its route and link label, follow redirects, and confirm that the final page loads, is the intended product, organization, or profile, and that its current content still supports the link label and surrounding portfolio claim/context. A live but contextually stale or mismatched destination must be corrected, relabeled, or explicitly excepted; HTTP success alone is not enough. Prefer GET or browser navigation; HEAD alone is insufficient. If automation is blocked (for example, 403, 429, or a bot challenge), inspect it in a browser and record that method and outcome. Treat confirmed 404/410, DNS/TLS errors, redirect loops, and unrelated destinations as failures to fix or explicit exceptions. Check mailto:/tel: schemes and targets separately. Add the date, method, final URL/status or browser outcome, and exceptions to the evaluation record. Do not claim full verification if any destination is unchecked or inconclusive.

## Itch.io action-label consistency (FR-050 / SC-037)

Inspect all project records with itch.io destinations and confirm each references the single shared `ITCH_IO_ACTION_LABEL` constant, currently `View on itch.io`. Confirm no per-record `Play on itch.io` or other label variant remains. Preserve each project-specific href. Verify current page content and context as part of the external-link integrity check; the label itself does not claim a playable build exists.

For each `View case study` CTA, confirm the hover/focus underline appears under the label only; the decorative arrow remains without underline and is hidden from the accessible name.

Check More details against neighboring CTAs: left/right outer padding is zero, the label-to-symbol gap uses the shared catalog CTA gap, and the symbol has no fixed-width spacer. The control is at least 36px tall above 700px and 40px at or below 700px; wrapped utility rows use 4px vertical and 14px horizontal gaps.
