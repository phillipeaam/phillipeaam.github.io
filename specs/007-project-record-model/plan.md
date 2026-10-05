# Implementation Plan: Shared Project Records

**Branch**: `feature/007-project-record-model` | **Date**: 2026-10-05 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/007-project-record-model/spec.md`

## Summary

Keep one canonical `ProjectRecord` for every current project in `src/data/projects.ts`. Home, the archive, experience references, and case-study routes consume that record through the existing Astro components and route data. Each record may contain a nested `caseStudy` area; it qualifies for a page and CTA only with a route slug and at least two stories, each with a non-empty title and framing, while its other editorial sections remain optional. Explicit opt-in controls public inclusion. Preserve the existing media behavior: `autoplayPreview` records load near the viewport, other previews activate on hover or keyboard focus, and reduced motion suppresses animation. Repair all references to image assets removed or converted on the current `develop` baseline and add a validation step to prevent further missing paths.

## Technical Context

**Language/Version**: TypeScript 5.9; Node.js 24.21.0 in the current environment
**Primary Dependencies**: Astro (package manifest and lockfile declare 7.3.5); no new runtime dependency planned
**Storage**: Static TypeScript data in the repository, built into the static portfolio
**Testing**: `npm run check`, `npm run build`, asset-reference scan, and browser/network checks from `quickstart.md`; no automated test suite exists for this slice
**Target Platform**: Static portfolio pages in modern desktop and mobile browsers
**Project Type**: Static website
**Performance Goals**: Preserve the existing per-record preview behavior: configured autoplay requests only when a preview enters the viewport margin; other previews request on hover or focus; reduced-motion preference requests no GIF previews.
**Constraints**: Preserve existing content, publication status, ordering, anchors, and URLs; keep semantic controls, keyboard access, visible focus, touch support, static fallback, and reduced-motion behavior. Do not redesign portfolio surfaces.
**Scale/Scope**: All current project records, including unpublished records; Home, archive, experience selected-work references, and generated case studies; four current animated project previews.

**Dependency verification note**: The inherited ignored `node_modules` initially contained Astro 5.18.2 despite the manifest and lockfile declaring 7.3.5. `npm ci` aligned the installation to Astro 7.3.5 before the final diagnostics and build.

## Constitution Check

| Principle | Gate | Plan response |
| --- | --- | --- |
| I. Evidence-First Portfolio Claims | PASS | Preserve qualified facts; do not infer authorship from product material. |
| II. Shared Patterns Before Project-Specific Variants | PASS | Use one record type, one media preview component, and stable project IDs. |
| III. Preserve Approved Visual Systems | PASS | Keep existing presentation variants and page layout; change only needed controls and broken media sources. |
| IV. Accessibility Is Part of Completion | PASS | Preserve keyboard focus behavior, visible focus, reduced-motion suppression, and an accurate static fallback while the animation loads or is unavailable. |
| V. Progressive Enhancement | PASS | Static project content and navigation render without client-side preview scripting. |
| VI. Responsive Verification | PASS | Review actual desktop, tablet, and mobile widths and list only tested widths in the completion report. |
| VII. Small, Scoped Changes | PASS | Limit work to project data, consumers, media interaction, authoring guide, and feature documents. |
| VIII. Validation Before Completion | PASS | Run `git diff --check`, Astro diagnostics, production build, and relevant browser/network review with aligned dependencies. |
| IX. Human Review for Meaningful Changes | PASS | Keep changes reviewable and report visual/media behavior for owner review; validation does not imply merge approval. |

**Pre-design gate**: PASS. No constitution conflict or exception is required.

## Repository Structure

### Feature documents

```text
specs/007-project-record-model/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── project-visibility.md
│   └── project-media.md
├── checklists/
│   ├── requirements.md
│   └── data-quality.md
└── tasks.md
```

### Source areas

```text
src/
├── data/
│   ├── projects.ts          # canonical records, selectors, visibility, ordering
│   └── experience.ts        # selected-work project IDs and intentional labels
├── components/
│   ├── ProjectMediaPreview.astro # static fallback and explicit animation control
│   ├── FeaturedProject.astro
│   ├── SupportingProject.astro
│   ├── ProjectRecord.astro
│   ├── RichProjectRecord.astro
│   ├── CaseHero.astro
│   └── ExperienceEntry.astro
└── pages/
    ├── index.astro
    ├── projects/index.astro
    └── work/[slug].astro

docs/
└── project-records.md       # authoring guide and model map

public/
├── projects/                # verified static posters/frames and animations
└── images/                  # other local media
```

**Structure Decision**: Reuse the repository's existing data modules, page routes, and shared Astro components. No new service, CMS, database, class hierarchy, framework, or dependency is needed.

## Architecture and Data Flow

1. `projectRecords` is the only source of shared project facts and public display choices. `isPortfolioIncluded` remains a strict opt-in (`portfolioIncluded === true`); selectors apply it before selecting Home/archive records or routes.
2. `FeaturedProject`, `SupportingProject`, and the standard/rich archive renderers consume record fields. Missing optional values omit their corresponding presentation.
3. `ExperienceEntry` resolves a stable `projectId` through `resolveExperienceWork`; included projects get a valid link, while hidden/missing projects retain only an intentional label or record name as plain text.
4. A project's optional `caseStudy` area owns its slug and at least two stories, each with a non-empty title and framing, to qualify for a page/CTA. Its other editorial sections may be omitted when content is unavailable. Case routes are generated only from included records meeting that minimum. Shared hero image sources come from the parent project media; the nested area may override descriptive presentation only.
5. Case-study CTAs require an included record with a `caseStudy` slug and at least two stories, each with non-empty title and framing. Other editorial areas are optional, and other project actions remain a separate list that does not imply case-study availability.
6. `ProjectMediaPreview` always server-renders the static media source. It requests `previewSrc` near the viewport only when the canonical media record sets `autoplayPreview: true`; otherwise hover or focus on its project link triggers the request. Reduced motion suppresses either mode, and a load/decode error leaves the fallback intact.
7. All media paths are validated against files in `public/`. Static media format updates are made on the same canonical record, including any nested story media references.

## Phase 0: Research Summary

Repository review found two completed but incomplete migrations to reconcile with the current base: the feature's canonical record work was created on the former `main` content/asset snapshot, while current `develop` has converted multiple PNG assets to smaller WebP assets and includes the existing GIF deferral work. The old record entries therefore produced 404s for PNG paths after the fast-forward. The same `ProjectMediaPreview` still fetches full GIFs automatically within a 75%-viewport prefetch margin; current GIFs range from 1.56 MB to 15.50 MB, and recorded archive loading totaled about 36 MB.

Decisions and evidence are recorded in [research.md](./research.md): retain a single record per project with nested case narrative; require a slug and at least two stories with non-empty titles and framings before publication; make the other case sections optional; make public availability opt-in; select a verified static image per project; preserve the existing near-viewport and hover/focus preview behavior; and validate local media references after migrations.

## Phase 1: Design Summary

- [data-model.md](./data-model.md) describes the fields, relationships, defaults, and record lifecycle from the current code.
- [contracts/project-visibility.md](./contracts/project-visibility.md) specifies inclusion, experience-name fallback, case-study route, and CTA behavior.
- [contracts/project-media.md](./contracts/project-media.md) specifies the static fallback, per-record preview activation, reduced-motion, accessibility, and media-path requirements.
- [quickstart.md](./quickstart.md) gives build, content-propagation, route, asset, and browser/network review scenarios.
- [docs/project-records.md](../../docs/project-records.md) explains the ficha model and authoring process for future edits.

## Implementation Sequence

1. Correct record and case-narrative media references to verified assets present on `develop`; add a repeatable local-asset validation check to the existing quality flow.
2. Consolidate the current project list into the canonical record shape and remove redundant record projections without dropping public or deferred content.
3. Connect Home, archive, employment references, and case routes to record selectors; place each case's editorial content under its owning record while preserving existing URLs, anchors, and story content.
4. Preserve the existing per-record near-viewport and hover/focus preview behavior with a static server-rendered fallback and reduced-motion suppression.
5. Reconcile CTAs and destinations with explicit record capabilities, verify empty/hidden/missing relationships and the two-story case-study minimum, verify shared-field propagation across applicable surfaces, and finish the authoring guide.
6. Align dependencies to `package-lock.json`; run checks/build, route/asset scans, desktop/tablet/mobile review, reduced-motion and keyboard checks, then report tested evidence.

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Stale paths reappear during image conversion | Scan all local `/projects/` and `/images/` references against `public/`; check for 404s on representative pages. |
| Animated files load outside their declared behavior | Observe network requests with a cache-disabled fresh load and confirm near-viewport, hover/focus, and reduced-motion cases against the record choice. |
| Case narrative or facts are lost during consolidation | Keep case-only evidence under each record's `caseStudy` area, compare existing public content/destinations, and run the specified surface scenarios. |
| Local dependencies mask lockfile errors | Install from the lockfile and record exact environment; rerun diagnostics and build after alignment. |

## Complexity Tracking

No constitution violations or additional infrastructure are planned.
