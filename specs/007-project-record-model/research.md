# Research: Shared Project Records

**Date**: 2026-10-05  
**Baseline**: `develop` commit `6679f074609b4418e59b4cacb52afc00ef2525d8`, with the feature's saved working changes reapplied on top.

## Decision 1: One canonical record owns shared project facts

**Decision**: Keep one `ProjectRecord` per current project in `src/data/projects.ts`. Selectors and shared page components read the record directly. Experience selected-work items use the stable project ID, and a case study is an optional nested area on that same record.

**Rationale**: The current pages already share concepts but had separate featured/supporting/archive data and case-study copies. A canonical record removes value drift while preserving page-specific layouts and distinct editorial sections inside the owning record.

**Alternatives considered**:

- Keep one project object per page: retains duplication and the conflicting summaries observed in the repository.
- Move content to a CMS or remote store: adds an editing system outside the requested local portfolio scope.

## Decision 2: Public inclusion is an explicit opt-in, separate from placement

**Decision**: A record is publicly consumable only when `portfolioIncluded === true`. Apply that gate before Home/archive rendering, action creation, experience links, and static case-route generation. `homePlacement` and `archiveCategory` remain independent choices.

**Rationale**: The user needs to hide incomplete or maintained projects globally. This also prevents one hidden project from leaking through a case page or action link while retaining an employment name reference as plain text.

**Alternatives considered**:

- Infer inclusion from category or Home placement: cannot represent hidden but known project records reliably.
- Treat missing inclusion as public: risks accidental publication when a new record omits the field.

## Decision 3: Nest the optional case-study sections inside the project record

**Decision**: Place each project's case-study slug, hero and glance choices, context, ownership, boundaries, selected stories, story narratives, diagrams, evidence, reflection, and next-case destination under that record's optional `caseStudy` property. Remove the parallel `src/data/cases.ts` catalog. Shared summary, contribution, specifications, and canonical media remain sibling fields on the same project record.

**Clarification**: A case-study area is publishable only when it has a stable slug and at least two story entries, each with a non-empty title and framing. Other editorial sections remain optional and are omitted when unsupported or unavailable; this keeps an incomplete case from exposing an effectively empty route while avoiding placeholder content.

**Rationale**: A case study contains much more editorial content than the reusable project summary, but it still describes the same project. Nesting it keeps one authoring document per project, gives its editorial areas clear boundaries, and allows projects without a case study to omit the section entirely.

**Alternatives considered**:

- Keep a separate case catalog linked by project ID: still requires authors to edit two documents for one project.
- Put every narrative field at the top level: makes optional case-only fields ambiguous and clutters records without a study.

## Decision 4: Static media is selected per project and verified against current assets

**Decision**: Use each record's `media.src` as its intended static image/fallback. Choose a verified cover where it identifies the project and a gameplay frame where that is more accurate. Keep `previewSrc` separate for optional animation. Validate every local media reference against `public/`.

**Rationale**: Project cards and case heroes do not all need the same kind of static image. The record can explicitly select the correct per-project asset without duplicating that path in each consumer. The feature snapshot used PNG paths that the current base converted to WebP, creating seven broken references.

**Alternatives considered**:

- Always use the first GIF frame: can show incidental gameplay when recognizable cover art exists.
- Always use the cover image: may not communicate a gameplay-focused project as accurately as a representative frame.
- Use file extensions from the previous branch snapshot: invalid on current `develop` and produced HTTP 404s.

**Observed broken references and repair**:

- Four poster paths in `src/data/projects.ts`: Wallace, Read With Ello, Pathless, and Ello Learn now use their available `.webp` poster files.
- Three Read With Ello narrative images, now nested under that project's `caseStudy.stories` in `src/data/projects.ts`, use their available `.webp` files.
- A fresh scan of local media references in `src/` finds no missing image or animation files.

## Decision 5: Preserve the existing animated preview behavior

**Decision**: Preserve the behavior already present on `develop`. Project media with `autoplayPreview: true` requests its GIF when it enters the existing 75%-viewport margin. Other project previews request the GIF on hover or keyboard focus and return to the static image when that interaction ends. Under reduced motion, keep the static image and request no animation. Do not add a Play control.

**Rationale**: The original performance review found large GIFs, but the portfolio owner clarified that an added Play interaction was not requested and chose to preserve the established browsing behavior. Keep the existing static fallback and reduced-motion support while correcting poster paths and preserving each record's preview choice.

**Alternatives considered**:

- Add an explicit Play control: rejected because the portfolio owner did not request a new interaction and chose to preserve the existing browsing behavior.
- Use only hover/focus for every preview: rejected because some project records already opt into near-viewport loading.
- Autoplay every animation on route load: rejected because it removes per-record control and can download tens of megabytes at once; reduced motion still suppresses previews.

**Clarification status**: The portfolio owner explicitly chose to preserve `develop` preview behavior after noticing the unrequested Play control. Static-image selection remains per project based on verified assets.

## Decision 6: Do not add a new external runtime dependency

**Decision**: Implement record selection and media behavior with the existing Astro/TypeScript project structure and browser capabilities.

**Rationale**: Current consumers are Astro components and static route generation. No backend, persistence, or additional runtime library is required.

**Validation**: The inherited ignored `node_modules` initially had Astro 5.18.2. The final validation ran after `npm ci` aligned the installed Astro version to 7.3.5, as declared by the manifest and lockfile.
