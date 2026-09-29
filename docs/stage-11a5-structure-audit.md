# Stage 11A.5 — Structure audit

Audit baseline: approved commit `06d6aaa` on `chore/stage-11a5-project-cleanup`.
The only initial working-tree item was the untracked local IDE folder `docs/.idea/`;
it was not staged or altered. The audit is internal maintenance documentation.

## Current directory structure

```text
assets/portfolio/featured/{read-with-ello,ilhas-do-alfabeto,wallaces-quest}/{original,candidates}/
artifacts/penpot/                 tracked Penpot exports and candidate sheets
artifacts/screenshots/            local review captures (ignored by Git)
docs/                             evidence/content records and this audit
docs/.idea/                       local IDE metadata, untracked at audit start
public/icons/                     local SVG social icons
public/images/                    profile images
src/components/                   Astro UI, work, experience, and case components
src/data/                         project, case-study, and experience data
src/layouts/                      shared page layout
src/pages/                        Home, Experience, Work, and case routes
src/styles/global.css             tokens and site/component styles
make_contact_sheets.js             candidate-media contact-sheet utility
```

There is no `scripts/` directory. Root configuration consists of
`.gitignore`, `astro.config.mjs`, `package.json`, `package-lock.json`, and
`tsconfig.json`.

## Inventory and initial classifications

### Components

| Area / files | Classification | Initial finding |
| --- | --- | --- |
| `Navigation`, `Footer`, `BaseLayout` | KEEP | Shared layout; Navigation and Footer are rendered by BaseLayout. |
| `FeaturedProject`, `SupportingProject`, `ShippedUnityWork`, `MediaPoster`, `ProjectMetadata` | KEEP | Used by Home and/or Work routes. `posterSrc` and `previewSrc` are Stage 11B contracts, not dead fields. |
| `CaseHero`, `EngineeringStory`, `EvidenceCaption`, `SystemDiagram`, `NextProject` | KEEP | Imported by current case route directly or through EngineeringStory. |
| `ExperienceEntry`, `Icon`, `ExternalLink` | KEEP | Active on Home or case pages. |
| `PreviewControl` | KEEP / STAGE 11B CONTRACT | Rendered conditionally by MediaPoster's `demoPreview`; retain pending media/preview behavior audit. |
| `ExperienceRow` | DELETE — CONFIRMED UNUSED | No import or render reference existed; its only remaining references were its own markup and dedicated CSS. Both were removed and re-searched. |

Current structure is shallow and understandable; no folder reshuffle is proposed.

### Data files

| Files | Classification | Initial finding |
| --- | --- | --- |
| `data/projects.ts` | KEEP | Home/Work data and poster/preview fields are in use or reserved for Stage 11B. |
| `data/cases.ts` | KEEP | Supplies the four generated case pages and their narrative/evidence structures. |
| `data/experience.ts` | KEEP | Rendered by Home and Experience route. |
| `social links` | KEEP | Currently authored in `pages/index.astro`; no separate duplicate data source found. |

No field removal is approved by this initial scan; property usage requires a field-by-field reference check.

### Styles

| File | Classification | Initial finding |
| --- | --- | --- |
| `src/styles/global.css` | KEEP; small confirmed-dead cleanup | Removed only selectors exclusive to the deleted legacy `ExperienceRow` and the redirected former Experience page. Current Experience uses `ExperienceEntry` and its styles. |
| Preview/media styles | KEEP / STAGE 11B CONTRACT | Candidate media/preview surface must remain until its conditional usage and future contract are documented. |

No CSS selector is yet classified as confirmed unused. Repeated media queries/selectors require cascade-aware inspection before consolidation.

### Scripts

| File | Classification | Initial finding |
| --- | --- | --- |
| `make_contact_sheets.js` | USEFUL FOR STAGE 11B; KEEP | Generates the three project candidate contact sheets from retained source/candidate assets. It uses CommonJS in this ESM package and produces one Astro hint. Its `pngjs` and `jpeg-js` modules are not declared/installed, so it is not currently runnable in this checkout; no dependency install or rewrite was justified in this maintenance pass. |

No separate `scripts/` directory or other helper scripts were found.

### Public assets

| Path | Classification | Initial finding |
| --- | --- | --- |
| `public/images/identity/phillipe-augusto-profile.jpg` | ACTIVE SITE ASSET | Referenced by Home. |
| `public/images/1666710393887.jpeg` | UNCERTAIN / RETAIN | No current source reference found in the first scan; likely supplied portrait source. Preserve pending provenance/use review. |
| `public/icons/*.svg` | ACTIVE SITE ASSETS | GitHub, LinkedIn, itch.io, and YouTube icons referenced by Home. |
| `assets/portfolio/featured/**/original` and `candidates` | FUTURE STAGE 11B ASSETS | Evidence originals and edited candidate crops; preserve all. |
| `public/.DS_Store`, `public/images/.DS_Store` | GENERATED / LOCAL METADATA | macOS metadata; ignored by the existing `.DS_Store` rule. Check whether tracked before considering removal. |

### Generated artifacts

| Path | Classification | Initial finding |
| --- | --- | --- |
| `artifacts/penpot/*.png` | KEEP — HISTORICAL REVIEW ARTIFACTS | 41 tracked exports (~11 MB); preserve history and do not bulk-delete. |
| `artifacts/screenshots/**` | GENERATED / SHOULD NOT BE VERSIONED | Local review captures (~23 MB); already excluded by `/artifacts/screenshots/` and none are tracked. Keep local files. |
| `.astro/`, `dist/`, `node_modules/` | GENERATED / SHOULD NOT BE VERSIONED | Build/cache/dependency output; existing ignore rules cover them. |

### Documentation

| Files | Classification | Initial finding |
| --- | --- | --- |
| `other-work-inventory.md` | KEEP | Current project/link curation and evidence boundaries. |
| `repository-evidence-pass.md` | KEEP | Evidence/repository follow-up needed for later media/content work. |
| `stage-10-content-register.md` | KEEP | Useful content/history record; do not remove as superseded without proving no operational value. |
| `docs/.idea/**` | LOCAL IDE METADATA — IGNORE | Untracked and intentionally outside prior commits; `.gitignore` now ignores nested `.idea/` directories. Contents remain untouched and unstaged. |

### Configuration and route structure

| Area | Classification | Initial finding |
| --- | --- | --- |
| `.gitignore` | REVIEW / KEEP | Ignores dependencies, builds, local env files, macOS metadata, and local screenshots; does not yet ignore nested `.idea` folders. |
| `src/pages/index.astro`, `experience.astro`, `work/index.astro`, `work/[slug].astro` | KEEP | Expected static output: Home, Experience, Work, and four case pages (7 pages). |
| `package.json`, lockfile, Astro/TS config | KEEP | Small, conventional Astro setup; no cleanup justified from names alone. |

## Usage audit method and pending checks

Component references are checked through imports/render sites and repository-wide searches.
Before removal, search the exact component/selector/data field throughout tracked source and
verify build route output. Before moving files, compare the clarity benefit against import churn.
External assets, evidence originals, and media/preview contracts are retained unless proven
both unused and outside future-stage needs.

## Deletion log

| File | Why removed | How unused was verified |
| --- | --- | --- |
| `src/components/ExperienceRow.astro` | Superseded experience-list iteration component; current routes use `ExperienceEntry`. | Repository-wide `rg` found no imports/render references. Its `experience-row`, `experience-note`, `experience-dates`, and `row-link` classes occurred only in this component and its dedicated CSS; those references were searched again after removal. |
| `src/styles/global.css` — legacy `.experience-row`, `.experience-note`, `.experience-dates`, `.row-link`, `.experience-full`, `.experience-detail` rules and responsive variants | Styles belonged to the unrendered ExperienceRow / old standalone Experience layout. `/experience/` redirects to `/#experience`. | Exact class search across `src` and `docs` found no active markup or route consumer. Shared `.text-link`/`.next-project` animation rules were retained without the obsolete `.row-link` selector. |

No other files, assets, route data, or project records were deleted.

## Final relevant directory tree

```text
assets/portfolio/featured/{read-with-ello,ilhas-do-alfabeto,wallaces-quest}/{original,candidates}/
artifacts/penpot/                 historical Penpot PNGs (tracked)
artifacts/screenshots/            local QA captures (ignored; not tracked)
docs/                             project/evidence records and structure audit
public/{icons,images}/            active SVG/social and profile-image assets
src/components/                   active Astro components (no forced subfolders)
src/data/                         projects, cases, experience
src/layouts/                      BaseLayout
src/pages/                        Home, Experience redirect, Work, case route
src/styles/global.css             design tokens and global/component styles
make_contact_sheets.js             Stage 11B contact-sheet helper (dependency gap noted)
```

## Final audit summary

- Components moved: none; the existing shallow component organization is clearer than a folder-only refactor.
- Components consolidated: none; existing `ExternalLink`, `MediaPoster`, and `Icon` have distinct reusable behavior and remain shared.
- Confirmed dead files removed: `ExperienceRow.astro` only.
- CSS removed: only legacy ExperienceRow and redirected standalone Experience layout selectors/responsive rules documented above.
- JavaScript/client helpers removed: none; Navigation and conditional media-preview behavior remain active.
- Data model/properties removed: none. `posterSrc`, `previewSrc`, media labels, tags, actions, and project/case boundaries remain intact for current use or Stage 11B.
- Public/evidence assets removed: none. `1666710393887.jpeg` is retained as an uncertain/source portrait; original and candidate media are retained.
- Artifacts removed: none. The 41 tracked Penpot exports are historical review artifacts. Local screenshots are ignored and untracked.
- Scripts/docs removed: none. Existing operational/evidence docs remain; the contact-sheet script is retained despite undeclared dependencies and its CommonJS hint.
- Ignore rules: nested `.idea/` directories are ignored; existing `.DS_Store`, build, dependency, environment, and screenshot rules remain.
- Routes: expected static output remains 7 pages — Home, Experience redirect, Work, and four case studies.
- Link checks: all 7 generated pages scanned; 76 internal route/anchor links resolved, and all 29 external HTTP(S) links retained `target="_blank"` plus `rel="noopener noreferrer"`.
- Validation: `git diff --check` passes. `ASTRO_TELEMETRY_DISABLED=1 npm run check` reports 0 errors, 0 warnings, and one pre-existing CommonJS hint for `make_contact_sheets.js`. Production build passes and generates all 7 expected pages.
- Visual regression assessment: active Home/Work/case templates and data were not modified. Removed CSS selectors matched only the unrendered legacy ExperienceRow and old Experience layout, so they could not affect current rendered pages. No screenshot artifacts were regenerated or changed in this maintenance-only pass.
- Working-tree baseline included `docs/.idea/`; it remains unmodified and is now ignored. No unrelated user files were staged.
- Uncertain items intentionally untouched: source portrait JPEG, older evidence originals/crops, historical Penpot exports, and any media/preview fields or handlers reserved for Stage 11B.
