# Research: Projects Catalog

## 1. Client-side search in a static Astro archive

**Decision**: Keep project data and all catalog entries in Astro-generated HTML, then use a small native client script to enhance query, facets, result summary, clear action, and empty state. Do not add an API, server rendering adapter, external search service, framework hydration, or dependency for 19 local records.

**Rationale**: Astro components render HTML at build time and processed client scripts can provide browser-side behavior. The repository already uses Astro and TypeScript, and the catalogue is small and static. Rendering the content first satisfies the no-JavaScript requirement and avoids making discoverability depend on script execution. Inputs should be hidden or disabled until initialization succeeds; a `<noscript>` note may explain that filtering requires JavaScript, while every project remains visible.

**Alternatives considered**: Search on a server or hosted search index (unnecessary network/deployment dependency); hydrate a client framework (more runtime and complexity than the interaction requires); expose inert filter controls without enhancement (misleading).

Sources: [Astro client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/), [Astro components](https://docs.astro.build/en/basics/astro-components/), [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/).

## 7. Searchable multi-select facets

**Decision**: Implement Context and Technology as separate compact disclosures. Each opened panel has a labeled search input and a group of native checkboxes; selected-value counts/states remain clear, and users can operate options with Tab and Space. Do not expose a custom ARIA `menu` or `combobox` role for checkbox filters.

**Rationale**: The user chose searchable multi-selection for both facets. Native disclosure, text input, fieldset/legend, and checkboxes retain browser keyboard and accessibility behavior. WAI-ARIA APG describes listbox options as flat names and warns that interactive elements inside options are not supported; a searchable checkbox filter should therefore preserve checkboxes as the actual interactive elements instead of nesting them inside listbox options. The menu trigger must announce its label and expanded state; the filtered option list should communicate when no option matches the facet query.

**Alternatives considered**: Always-visible checkbox fields (too much vertical space); a custom combobox/listbox composite (more focus/state code and does not naturally contain interactive checkboxes); native `<select multiple>` (selection discoverability and interaction are less suited to a compact searchable menu).

Sources: [WAI-ARIA APG: Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/), [WAI-ARIA APG: Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), [WAI-ARIA APG: Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

## 8. Project detail hierarchy and verified media

**Decision**: Keep a compact project entry as the default. Expanding it reveals structured, consistently labeled groups for product context, contribution, engineering focus, verified metadata/technology, approved media, and valid actions; omit empty groups. Render an approved preview inline within the expanded project instead of sending a GIF visitor to another tab. Preserve an accurate static frame and accessible pause/play behavior for animation.

**Rationale**: This directly addresses the requested details formatting and the current `ArchiveMedia.astro` behavior, which turns GIF records into an external “Open animation” link. The current public entry renderer (`ProjectRecord.astro`) does not render `project.media`; the catalog must consume the existing evidence-bearing media field when verified. The user clarified the layout: a media column alongside details on desktop, stacked above text on mobile; route the implementation for visual review.

**Alternatives considered**: Leave animated media as a link (does not meet the requested inline entry experience); expose every media source without evidence review (conflicts with Principle I); use a carousel or separate detail route (adds navigation and does not improve per-entry organization).

Sources: [WAI-ARIA APG: Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [WAI-ARIA APG: Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/).

## 9. Editorial alignment and entry rhythm

**Decision**: Match the catalog heading structure and supporting copy to the established Home section-heading pattern, remove “PROJECT ARCHIVE” and its current introductory sentence, and give each record the same separator thickness, color, and spacing tokens. Keep technology chips inside expanded detail content.

**Rationale**: The Home page already establishes an eyebrow/title/supporting-copy pattern, including “More Projects”. Reuse that system to make the all-projects page feel continuous with the portfolio. Moving technology chips to the disclosure retains their information while reducing noise in compact entries; separators should come from a single shared style rule rather than record-specific variants.

**Alternatives considered**: Keep the current archive label and copy (user identified them as out of context); retain chips on every row (user asked to move them); preserve visual separator exceptions (currently inconsistent).

The media/text placement is user-confirmed. Visual review of the implemented page remains required by the project constitution.

## 2. Independent project detail disclosure

**Decision**: Use a native disclosure pattern, preferably `<details>/<summary>` where it fits the existing component structure, without a shared `name` that makes it a single-open accordion. Keep the visible summary useful by including the project name and compact identifying information. Existing project IDs must remain on stable entry containers.

**Rationale**: Native disclosure works without script, exposes open/closed state to assistive technology, and allows multiple independent records to remain open as the spec requires. Keeping details within their project row preserves association and reading context.

**Alternatives considered**: A scripted accordion that closes siblings (conflicts with the clarified requirement); modal or route navigation (leaves the catalogue context and is unnecessary for local details).

Source: [MDN: `<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details).

## 3. Accessible filtering feedback and keyboard behavior

**Decision**: Use visibly labeled controls and native form elements when suitable. Preserve focus when result rows change. Announce concise result-count and empty-state changes through a polite status region; do not make the full result list a live region. Keep visible focus and keyboard operation.

**Rationale**: Filtering modifies content without navigation. People using assistive technology need a concise notification of the result change, while announcing every matching row would be noisy. Controls that initialize only after script is ready avoid unusable controls in the base page.

**Alternatives considered**: Moving focus to the result list on every change (disruptive); announcing the whole rendered result area (overly verbose); silent count changes (less discoverable to screen-reader users).

Sources: [W3C ARIA22 status message technique](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22.html), [W3C keyboard focus checks](https://www.w3.org/WAI/test-evaluate/easy-checks/keyboard-focus/), [W3C form labels](https://www.w3.org/WAI/tutorials/forms/labels/), [WCAG keyboard understanding](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [WCAG focus visible understanding](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html).

## 4. Motion and responsive behavior

**Decision**: Preserve the existing static fallback and reduced-motion behavior for animated previews, and provide a visible accessible pause/stop control for any automatically moving media that continues alongside other content. Verify responsive reflow without page-level horizontal scrolling on narrow screens.

**Rationale**: Reduced motion does not replace a user control for automatically moving content that continues beyond five seconds. The catalogue must remain usable on narrow screens and must not require horizontal browsing to recognize entries.

Sources: [WCAG pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [WCAG animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions), [WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow).

## 5. Data taxonomy and evidence boundary

**Decision**: Derive Context from the verified archive classification, but do not assume that current `archiveCategory` perfectly describes product nature or technology. Normalize distinct context and technology values from confirmed project data; keep category/type separate and preserve editorial order. Only public projects feed search and facets. Do not infer facets from a project name or unverified prose.

**Rationale**: Current source data uses categories such as `professional-game`, `professional-product`, `independent-game`, and `study-archive`; the inventory also holds project product/type separately, and verified technology may live in `specs` or other canonical fields. At least one existing category/group label can imply a technology that does not apply uniformly. A taxonomy cleanup must avoid turning editorial group labels into false facts. Search should index public content for published records, not deferred/internal records.

**Alternatives considered**: Scraping arbitrary prose for technology (false positives); one combined tag list (conflates employment context, product type, and stack); including deferred records in the public catalogue (publishes content outside the current archive).

Repository evidence inspected: `src/data/projects.ts`, `src/pages/projects/index.astro`, `src/components/ProjectRecord.astro`, `src/components/Navigation.astro`, `src/components/ProjectMediaPreview.astro`, `src/pages/work/[slug].astro`, `src/data/cases.ts`, `src/styles/global.css`, and `package.json`.

## 6. Deep links under filtering

**Decision**: Keep stable IDs on project entries. When navigation targets a project hash that is currently filtered out, clear incompatible search/facet criteria, update the results, and then move to the target. On initial page load with a project hash, do the same after enhancement initialization.

**Rationale**: Existing links should resolve to visible project content after the new filter layer is applied. This is a concrete policy needed to reconcile filtering with the spec’s deep-link preservation requirement.

**Alternatives considered**: Leave a hidden target and let browser anchor navigation appear broken; silently ignore the hash; duplicate or rewrite IDs (breaks established URLs).

## Resolved unknowns

- No new runtime dependency is needed.
- No database, network API, or server-side search is needed.
- A native disclosure supports the approved multiple-open behavior and no-script operation.
- Search applies to the public visible/detail text corpus; internal/deferred records are excluded.
- The filter control taxonomy needs explicit verified data fields rather than one mixed tag list.
- The existing project has `npm run check` and `npm run build`, but no dedicated test runner.

## 10. Complemento 2026-10-05: identidade e previews existentes

**Decision**: A mídia principal ocupa a entrada recolhida; ícone existente identifica o título, mesmo quando há GIF ao lado. Metadados e mídia complementar ficam nos detalhes. Reutilizar o comportamento atual e o contrato 003.

**Rationale**: Inspeção de `6679f07:src/components/RichProjectRecord.astro` mostra ícone decorativo 52×52, lazy/async. `src/styles/global.css` preserva raio 10px, borda e gap 14px. `b0daafa` e `specs/003-media-fallbacks/contracts/media-preview.md` comprovam o desenho técnico de proximidade, fallback do primeiro frame, decode, falha e movimento reduzido. A implementação atual de ProjectMediaPreview conserva o observer de 75% e adiciona controles de parar/reproduzir. Esses registros documentam comportamento; não comprovam direitos de mídia.

**Alternatives considered**: Pausa inicial para todos os GIFs (não corresponde ao pedido/configuração validada); reconstruir um player (duplicação); usar fallback de gameplay como ícone de identidade (confunde funções); mostrar todos os assets existentes como aprovados (viola evidência); manter mídia só na expansão (decisão substituída).

**Eligibility**: A lista `approvedCatalogMedia` atual está vazia. Conferir docs/stage-10-content-register.md e docs/repository-evidence-pass.md por fonte, inclusive identidade; documentar vínculo ou lacuna. Ausência de prova exige omissão, sem bloquear entrega da composição textual. Não criar mídia nem alterar conteúdos para preencher lacunas. Este complemento prevalece sobre decisões anteriores deste documento de mídia apenas nos detalhes.

Revisão de pesquisa local confirmou: PublicProjectCatalogEntry já retém identityImage/media por extensão do inventário; não exige reinvenção do tipo. docs/media-guidelines.md complementa contrato 003, mas instruções de uso não são prova de autorização individual.

### Decisão posterior de reutilização (2026-10-05)
O usuário confirmou reutilização dos pôsteres/GIFs já apresentados no baseline 6679f07: Ello Learn, Read With Ello, Pathless e Wallace’s Quest. A omissão temporária e lista vazia descritas anteriormente são histórico anterior à resposta. A implementação usa allowlist exata registrada em evaluation.md, mantendo configurações do inventário. Outras fontes continuam sujeitas à documentação; não presumir autorização de novos assets. Ver spec.md, Confirmação de reaproveitamento.
