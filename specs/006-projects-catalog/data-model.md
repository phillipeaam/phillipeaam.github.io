# Data Model: Projects Catalog

This model describes the public archive and its browser interaction state. It does not prescribe a database or implementation library.

**Current revision (integration with develop, 2026-10-05):** `ProjectRecord` in `src/data/projects.ts` is the single content source. The catalog-only editorial projection described below is a historical implementation, replaced by canonical `summary`, `context`, `type`, `period`, Role metadata, `contribution`, `technicalHighlights`, `contributionOutcome`, `workContext` and `technologies` fields on each record. Approved historical media reuse is recorded on the canonical media/icon fields, not in page-level path maps. See `docs/project-records.md`. The compact layout, expanded Selected contributions, interaction states and current media behavior remain. A later user decision removes animation controls globally; no Stop/Play UI is required or rendered on any surface.

## Project entry

One public record rendered in the archive. Its underlying editorial source remains `src/data/projects.ts`.

| Field | Meaning | Validation / behavior |
|---|---|---|
| `id` | Stable project identity and deep-link anchor | Unique among rendered archive records; preserve current IDs and aliases. |
| `name` | Public project name | Required, non-empty. |
| `productSummary` | Concise product description visible in the compact entry | Required; evidence-based. Existing `product` field is the current source. |
| `workContext` | Professional, independent, or study context used by the Context facet | Derived from the verified archive classification; distinct from the existing free-form `context` description and product type. |
| `context` | Existing descriptive context text, where present | Searchable public detail only; never use arbitrary prose as a Context facet value. |
| `contribution` | Verified individual contribution | Optional; omitted when not supported. |
| `period` | Verified time period | Optional; render only if present and confirmed. |
| `technologies[]` | Verified technology/tool facts displayed in expanded details | Zero or more; derive only from explicit `Stack`, `Engine`, or `Tools` metadata in the project record. Preserve a confirmed specific value such as `Unity 6` here when it is part of the source fact. Do not infer from title, platform labels, arbitrary context, or broad product prose. |
| `productType` | Product nature (for example, game or software/product) | Distinct from context and technology; not automatically a facet in this feature. |
| `editorialGroup` | Optional existing display group/order | Must not imply unsupported technology or employment context. |
| `searchText` | Normalized public searchable corpus derived from name, summary, contribution, period, context, technologies, and other displayed public metadata/details | Derived, not separately authored; exclude deferred/internal data. Normalize case, trim, and diacritics consistently. |
| `details` | Optional expanded project content such as longer description, engineering focus, specs and media | Belongs to the same project entry; no invented content. |
| `media[]` | Approved image/video/GIF metadata | Optional. When provided and provenance/authorization are supported by canonical records, select the first eligible main item for the collapsed entry; render remaining approved items only in expanded details. For animation, show an accurate static alternative, retain its configured activation and reduced-motion behavior, and render no pause/play control. Do not reduce the media to an outbound GIF link. Omit unverified sources rather than using placeholders as evidence. |
| `detailGroups` | Structured groups for contribution, engineering focus, context, metadata, technologies, approved media, and actions | Derived from available verified record fields. Omit empty groups; use consistent labels and order. |
| `caseStudySlug` | Route key for one of the existing case studies | Optional; if present, resolves to a valid existing case route. |
| `actions[]` | Existing external action labels and destinations | Optional; include only valid destinations. |

### Current work-context mapping to verify during implementation

- `professional-game` and `professional-product` → `Professional` context.
- `independent-game` → `Independent` context.
- `study-archive` → `Study` context.

This mapping describes work context only. It does not infer `productType` or technology. Confirm any ambiguous records against project evidence before assigning filter values. Current group names must not be used as technology values.

## Search query

| Field | Meaning | Validation / behavior |
|---|---|---|
| `rawText` | Current user-entered text | Empty or whitespace-only query imposes no restriction. |
| `normalizedText` | Trimmed, case-folded, diacritic-insensitive query | Derived identically to each record's searchable corpus. |

Matching is substring-based against the normalized public searchable corpus. A project matches if the entire normalized query is found in that corpus.

## Facet selection

| Field | Meaning | Validation / behavior |
|---|---|---|
| `contexts[]` | Selected context values in the Context disclosure filter | Empty means unrestricted; multiple selections use OR. Options can be searched within the open control; selection uses native checkbox state. |
| `technologies[]` | Selected technology values in the Technology disclosure filter | Empty means unrestricted; multiple selections use OR. Options can be searched within the open control; selection uses native checkbox state. |
| Canonical Technology tag | Stable public filter value derived from verified technology metadata | For Unity, expose only `Unity`; confirmed versioned Engine/Stack values such as `Unity 6` match this one tag. Do not enumerate versions as filter values or maintain a descendant-version registry. Preserve the original confirmed version in detail facts where shown. |
| `facetQuery` | Temporary text used to find an option within one facet menu | Separate per facet; filters visible option labels only and does not itself narrow project results. |
| `openFacet` | Currently expanded facet selector | Either `context`, `technology`, or none; at most one facet selector is open. Opening the other selector closes this one but preserves its selections and option-search text. |

Across different facets and the text query, matching uses AND. A project must match the query, at least one selected context when present, and at least one selected technology when present.

Visible labels precede their controls: “Search for” labels the main query field, while “Context” and “Technology” identify their respective facet selectors. The selector labels remain visible whether a menu is open or closed.

## Result summary

| Field | Meaning |
|---|---|
| `matchingCount` | Number of public project entries matching current criteria |
| `archiveTotal` | Number of published public project entries before filtering; data-derived |
| `hasResults` | Whether `matchingCount` is greater than zero |
| `activeCriteria[]` | Removable representations of active query/facet selections |

The accessible status announces a concise summary such as “Showing 4 of 21 projects” or a useful zero-results message. Count records, not media or individual matching tokens.

## Expanded details state

Each project has independent open/closed state. Multiple entries may be open simultaneously. The disclosure is associated with its own entry and its state is conveyed semantically. When filtering removes an entry from visible results, its entire entry and expanded content are hidden from the rendered result set; its state may reset closed so it does not reopen unexpectedly after criteria change.

## Relationships

- The archive contains an ordered set of `ProjectEntry` records.
- Each `ProjectEntry` may reference zero or one case study, zero or more actions and zero or more media items.
- `SearchQuery` and `FacetSelection` derive a subset from the archive.
- `ResultSummary` describes that subset against the unfiltered archive total.
- Disclosure state belongs to a project entry and does not constrain other entries.

## Entry presentation projection — 2026-10-05

- `identityImage`: optional existing identity poster, independently evidence-gated; decorative alongside project name, not inferred from GIF fallback. “Absent or unverified identity image is omitted without reserved space.”
- `primaryMedia`: first eligible source in existing editorial media order. “Animated media requires an accurate static fallback.” Eligibility includes provenance/authorization and valid existing sources.
- `supplementaryMedia[]`: remaining eligible sources, excluding primary duplicates; detail-only.
- `collapsedContent`: project name, concise product summary, eligible identity image and primary media, and detail toggle if additional content exists.
- `detailContent`: available verified context, workContext label, product type, contribution, period, engineering focus, technology, metadata, additional product description only when richer than summary, supplementary media and destinations. “Omit missing fields and empty groups.” These details remain searchable.
- `mediaEligibility`: documented source-to-evidence decision, not authorization inferred from file presence or older rendering. No new backend/model storage is required; documentation lives in evaluation.md and canonical evidence references.
- Preview transitions: static → requested near viewport/allowed existing interaction → loading with static → ready animated. Failure, reduced motion or stop → static. Play respects reduced motion; only active visual layer is announced. Exiting viewport does not introduce new unload behavior. Without proximity observer, preserve existing fallback-to-autoplay behavior; without JS, static remains.

This projection supersedes prior wording about all media belonging to expanded details; independent disclosure/filter states are unchanged.

### Decisão posterior de reutilização (2026-10-05)
O usuário confirmou reutilização dos pôsteres/GIFs já apresentados no baseline 6679f07: Ello Learn, Read With Ello, Pathless e Wallace’s Quest. Em 2026-10-06, solicitou também a inclusão no catálogo do pôster e gameplay GIF fornecidos para Diggy. Em 2026-10-07, pediu completar a entrada Pandora e indicou as mídias já existentes na pasta do projeto; isso autoriza no catálogo somente os arquivos exatos listados em `evaluation.md`. Essas decisões não comprovam direitos de terceiros. Outras fontes continuam sujeitas à documentação. Ver spec.md, FR-019 e as seções de mídia em evaluation.md.

## Catalog-only editorial projection — historical, superseded by centralization

`catalogEditorialById` maps existing project IDs to `CatalogEditorialContent` in src/data/projects.ts; only /projects/ consumes it. Underlying Home/case data remain unchanged. Relationships with IDs, technologies, actions and media reuse source values; don't invent alternate destinations.

| Field | Constraint |
| --- | --- |
| `summary` | Required, non-empty, evidence-based product description. Do not automatically concatenate legacy fields. |
| `facts.role` | Optional verified individual function/scope; omit when unsupported. |
| `facts.context` | Optional verified organization/team/circumstance; do not repeat Role or prefix the work classification twice. |
| `facts.productType` | Optional verified product nature; exclude stack and work-context classification. |
| `facts.period` | Optional documented period; retain era/release qualifiers when necessary. |
| `contributionNarrative` | Optional; absent without verified individual contribution. No empty section. |
| `contributionNarrative.summary` | Required, non-empty when narrative exists; one or two sentences, preserving essential ownership boundaries. |
| `contributionNarrative.highlights[]` | Zero to three distinct supported highlights; target two or three when evidence permits, allow one or zero. Never fill a quota with inferred claims. |
| `TechnicalHighlight.title` / `body` | Required, non-empty; title specific to the project, body explains documented problem/mechanism; don't imply personal decision authorship without evidence. |
| `contributionNarrative.outcome` | Optional verified result; no mandatory metric and no invented impact. |
| `additionalContext` | Optional product context only when needed to understand contribution; not a repeated summary or mandatory Product section. |

Existing `technologies`, metadata, IDs, caseStudySlug and actions remain projected under their existing constraints. No new schema for media. The original four-source allowlist was extended by the user's Diggy and Pandora requests recorded in evaluation.md; exact-file reuse remains distinct from independent third-party rights verification. No other source additions. No surface renders Stop/Play; reduced motion and fallback remain.

Missing map entries use verified existing summary/facts without synthesizing Selected contributions from legacy engineering prose. Revised records must use explicit catalog values rather than fall back to mixed Type/Context data. Public corpus derives only from rendered public values, including highlight titles/bodies/outcome/additionalContext; exclude source URLs to private records and withdrawn text.

Traceability lives in evaluation.md as a per-project editorial matrix: source reference, supported claim, scope/era qualifiers and omissions. It is internal, not included in public text or search. Editorial states: legacy → drafted against evidence → reviewed against source → human reviewed. Do not infer human approval from build/check success.

## Cross-surface discovery and evidence — current extension 2026-10-05

These relationships describe the current feature extension; they do not imply that the runtime implementation or validation is complete.

| Entity / relation | Meaning | Constraints |
|---|---|---|
| `TechnologyFact` | Confirmed technology/engine value attached to a project | Preserve exact value/version such as `Unity 6` in detailed facts when displayed; source from canonical project metadata. |
| `TechnologyFacetTag` | Canonical label used by the Technology filter | For verified Unity Engine/Stack facts, use the single tag `Unity`. The filter must never emit per-version options; this does not need a registry of Unity releases. Do not infer from title, platform label, context, or arbitrary prose. |
| `ProjectPeriod` | Documented period for a project or phase | May differ from employment period; retain project/phase scope and historical qualifiers. |
| `EmploymentPeriod` | Documented employment interval for an organization/role in Experience | Must not overwrite or be used as a proxy for ProjectPeriod. |
| `ContributionScope` | Evidence-supported individual role and work scope, distinguished from team/product facts | Catalog, central project record, and a published case should agree where claims overlap; unresolved differences are reported as evidence conflicts, not silently normalized. |
| `SurfaceProjection` | Public rendering of central project data in Home, catalog, Experience, or an existing case | Preserve each surface's purpose; no new case or Experience relation is implied by a catalog record. |

## Validation observation record

`evaluation.md` records each scenario, route/project, viewport, network condition, motion preference, script/font state, interaction/assistive technology, observed request/visual/accessibility outcome, and evidence type (`source inspection` or `executed runtime`). A criterion is not marked passed on source inspection alone when its spec requires runtime. Unexecuted or blocked scenarios remain pending with reason.
