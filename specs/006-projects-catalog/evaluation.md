# Evaluation Record: Projects Catalog

This record tracks implementation validation against SC-001–SC-013, including the clarification updates and convergence work. No participant study or before/after usability comparison is in scope.

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
