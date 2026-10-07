# UI Contract: Projects Catalog

This is the user-facing interaction contract for `/projects/`. It is independent of implementation framework and complements [the feature spec](../spec.md) and [data model](../data-model.md).

**Current precedence:** this contract and the 2026-10-05 global animation-control decision supersede prior expanded-group/media-control statements in this document. Older statements remain historical; do not restore the three-section presentation or animation buttons on any site surface.

## Current editorial contract — 2026-10-05

- Collapsed entry remains media | identity/title/product description/More details on desktop, stacked on mobile. JS toggle stays beside description; no-JS native disclosure remains usable at the beginning of full-width details below both columns.
- Expanded order: compact verified facts; Selected contributions if supported; verified technologies/useful metadata; supplementary eligible media if any; existing actions. Necessary product context may accompany the contribution; no mandatory Product section.
- Selected contributions contains one or two sentences of individual scope and zero to three specific technical highlights. Two or three are preferred when supported; absence of evidence never creates a quota or inferred authorship. Optional outcome requires evidence, not necessarily numbers.
- Facts have distinct meanings: individual role, organization/team/circumstance, product nature, documented period; no stack in Type or Role repeated in Context. Omit absent facts and empty groups.
- Keep public product behavior distinguishable from attributable individual work; preserve team, historical era and release boundaries. No automatic concatenation of source paragraphs or copying full cases.
- Revised public detail text is searchable, including highlight headings/bodies; internal sources/drafts/withdrawn claims are excluded. Preserve existing facet semantics, counts, order, hashes, four cases, external destinations and independent expansion.
- Preserve the exact media allowlist recorded in evaluation.md, including the user-requested Diggy poster/GIF and their static fallback. User authorization to display these exact supplied files is not independent proof of third-party rights. Other new sources require their own documentation. No Stop/Play or equivalent animation control on any site surface, as requested; fallback, configured loading and reduced motion remain. This contract does not certify complete autoplay accessibility or unresolved republication rights.
- Header typography, support line-height 24px, spacing, media width 300px, flexible entry height, text width and dividers remain approved baseline. No new text-width caps, clipping, hover-only content or horizontal page scrolling.
- No new public endpoints, analytics or third-party integration. Home/cases are not redesigned and receive no unrelated copy edits; narrowly scoped title presentation in More Projects and evidence-backed factual corrections required by FR-044 are allowed.

## Initial page state

- The page contains one recognizable text entry for every published project in editorial order.
- Each entry exposes its stable existing project ID as a link target.
- The total is derived from the complete public inventory.
- Search and facet controls become interactive only after their behavior is initialized. If initialization is unavailable, all entries and their core links remain usable and controls do not appear functional.
- Compact entry information includes project name, concise product summary, approved identity icon and primary media; context, contribution, period, product type and actions belong to details. Technology chips are not shown in the compact entry. Missing facts are omitted.
- The page heading reuses the approved “More Projects” section-heading pattern and copy from Home: eyebrow “BREADTH, AT A GLANCE”, title “All Projects”, and its existing supporting sentence. The “PROJECT ARCHIVE” eyebrow and prior page intro are removed.
- Every record boundary uses the same divider style and spacing.

## Search and filters

- Search is visibly labeled “Search for” above the field and searches the normalized public text corpus, including project name, product summary, contribution and displayed public metadata/details.
- Search ignores case, surrounding whitespace and Portuguese diacritic differences.
- “Context” and “Technology” are visible labels above separate disclosures with searchable, multi-select checkbox options generated from verified public data only. Technologies remain searchable/project-filterable and appear among the expanded detail groups.
- The Technology disclosure exposes one canonical `Unity` option for confirmed Unity engine/stack values, including a specific fact such as Unity 6. It never exposes a separate option for each Unity version. The exact confirmed version may remain in project details.
- At most one facet disclosure is open at a time. Opening one closes the other without clearing its selections or internal option-search text; activating the open disclosure closes it.
- The open facet panel filters its own visible options by its internal query; that query does not change the project result set until checkbox values are selected.
- When no option matches the internal facet query, show a local no-options message while preserving the selected-value state and project count.
- Multiple selections in one facet use OR. Query, Context and Technology combine with AND.
- Every input change updates visible entries and a concise count of matches against the unfiltered total.
- A zero-match result displays a helpful message and a clear-all action.
- Selected values can be removed individually. Clear-all resets query and both facets.
- Focus remains on the control that initiated an update unless the user activates another control; filtering must not unexpectedly move focus.

## More details and links

- A project with additional details exposes an independently operable disclosure next to/within that project entry. Opening one item does not close another.
- Expanded content uses consistent labels and hierarchy for available product/context, contribution, engineering focus, metadata, technology chips, approved media, and actions; empty sections are omitted.
- Verified primary media appears inline in the collapsed entry; only supplementary media appears in details. Unverified media is omitted; approved GIF previews retain a static alternative and accessible motion controls rather than being reduced to an external link.
- On desktop, primary media is left of identity/summary; on mobile it is above them. Details remain associated with their own entry; no duplication of primary media or unchanged summary.
- Disclosure state is announced semantically. Controls work with keyboard and touch and show visible focus.
- Existing case-study links, valid external actions, and project deep links remain associated with the correct record.
- When an incoming project hash points to a record hidden by current filters, clear the criteria needed to reveal it, then position the record. The same rule applies on initial load with a project hash.
- Empty/missing media, details, or destinations do not produce empty controls or misleading calls to action.

## Media and motion

- Images and animation are complementary to textual recognition.
- Render media inline only when provenance/authorization is supported by canonical project evidence; omit unverified sources instead of presenting placeholders as evidence.
- Every animated preview has an accurate static alternative that represents the approved media.
- Reduced-motion preference suppresses or replaces nonessential animation.
- **Historical requirement, superseded by the user decision recorded above:** Automatically moving media that continues alongside other content has an accessible visible pause/stop control; the user can understand and operate that control without hover. This is not a current implementation requirement.

## Responsive and no-script behavior

- The archive reflows without page-level horizontal scrolling at narrow widths, including 320 CSS pixels; controls and project summaries remain readable.
- Desktop, tablet and mobile preserve the same project identities, links, and discoverability.
- Without JavaScript, all project entries, static text, anchors, native disclosures and core navigation are available. Search/filter behavior may be unavailable, but inert active-looking controls are not exposed.

## Accessible feedback

- Use semantic landmarks/headings, visible labels, descriptive accessible names and keyboard-operable controls.
- Visible focus must remain apparent.
- Result changes and empty state are conveyed through a concise polite status message without turning the entire results list into a live region.
- Each facet disclosure and nested checkbox group communicates its label, expanded/selected state, option-search purpose, and no-option-match state without a custom ARIA listbox/menu composite.
- Do not rely on hover, color alone, animation, or thumbnail artwork to convey identity or state.

## Preserved identity and media behavior — 2026-10-05

Identity icon follows the earlier 52×52 poster treatment, border, 10px radius and 14px title gap; it may coexist with primary media and is decorative when redundant to title. Omit absent/unverified icons and omit empty media columns.

Preserve configured autoplay and triggers; autoplay GIF loads near viewport (existing 75%-height margin), not upon expanding details. Static first-frame fallback is present before scripts, during loading and decode, and on failure. Swap only after readiness without changing geometry. Reduced motion suppresses automatic request/reveal and wins over late completion; stop restores fallback. Keep accessible motion controls, one announced image layer, existing aspect/fit/dimensions/captions, and no new offscreen-unload behavior. Without observer preserve existing autoplay; without JS preserve static image and native details. No GIF with invalid fallback is eligible. Eligibility applies independently to icon and primary/supplementary media.

Header typography, approved spacing and 24px supporting-copy line height remain unchanged. Search/filter OR/AND, counts, hash recovery, four cases and independent multi-open project details are regressions to preserve.

### Decisão posterior de reutilização (2026-10-05)
O usuário confirmou reutilização dos pôsteres/GIFs já apresentados no baseline 6679f07: Ello Learn, Read With Ello, Pathless e Wallace’s Quest. A omissão temporária e lista vazia descritas anteriormente são histórico anterior à resposta. A implementação usa allowlist exata registrada em evaluation.md, mantendo configurações do inventário. Outras fontes continuam sujeitas à documentação; não presumir autorização de novos assets. Ver spec.md, Confirmação de reaproveitamento.

## Revisão vigente — prioridades 2–5 — 2026-10-05

Esta extensão integra a feature 006 e prevalece quando requisitos abaixo entrarem em conflito com contrato histórico.

- **Regra antiga, substituída pela decisão registrada abaixo:** manter a seleção de Unity como resolução de família/versão. A faceta vigente expõe uma única tag canônica `Unity`, sem opções por versão; fatos versionados podem permanecer nos detalhes.
- Cada cartão simples da Home More Projects mantém o nome visível no estado padrão, na presença ou ausência de imagem. Aproveitar o nome acessível atual e evitar um anúncio repetido. Cards Featured/Selected work que já mostram título permanecem sem nova ficha.
- Nenhuma superfície exibe botão Stop/Play ou equivalente. Validar a animação e o fallback com rede observada, aproximação à faixa existente, carregamento e decode lentos, falha, preferência reduced motion inicial/dinâmica, ausência de JavaScript e caminho sem observer. Resultado não executado permanece pendente; ausência de botão não é prova isolada de conformidade integral.
- Validar teclado, foco visível, rótulo/semântica real dos filtros e disclosures pela árvore de acessibilidade do navegador, Escape quando aplicável, perda de foco ao filtrar, reflow e landmark principal único por rota avaliada. Testes de fala com leitor de tela real, zoom manual e aparelho físico foram removidos do escopo por decisão do usuário (2026-10-07). Validar demora/falha de fontes e restauração de posição após retorno, sem flash ou deslocamento observável.
- Comparar período do projeto/fase e período de emprego como conceitos diferentes; comparar escopo individual/equipe entre registro central, catálogo, cases publicados e Experience. Mudança de conteúdo exige fonte canônica apropriada. Diferença inconclusiva fica como pendência; não criar case, CTA ou relação de Experience ausente.
- A validação cobre Home e `/projects/` além de Experience/cases somente para comparação factual e regressão necessária. Não redesenhar as áreas não pedidas. Registrar as condições executadas em `evaluation.md` e encaminhar mudanças visuais/editoriais para revisão humana.

### Allowlist complementar de mídia — 2026-10-07

O pedido do usuário para completar Pandora e a indicação de que os arquivos estavam em `public/projects/pandora/` autorizam o uso no catálogo apenas dos paths específicos listados em `evaluation.md`. Essa autorização editorial não prova direitos/licenças de terceiros; preservar a ressalva do relatório-fonte.
