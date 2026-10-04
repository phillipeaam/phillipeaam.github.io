# Tasks: Reliable Animated Media Fallbacks

**Input**: Design documents from `/specs/003-media-fallbacks/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/media-preview.md`, `quickstart.md`

**Tests**: No new test suite was requested. Run the existing project checks and manual scenarios in `quickstart.md` in the final validation phase.

**Organization**: Tasks are grouped by the user stories in `spec.md`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches distinct files and has no dependency on an incomplete task.
- **[Story]**: Maps the task to a user story in `spec.md`.
- Paths are relative to the repository root.

## Phase 1: Setup

No project bootstrap or dependency changes are needed; the Astro site and media components already exist.

---

## Phase 2: Foundational Asset Preparation

**Purpose**: Bring the selected binary assets from the historical commit into the working tree before updating their consumers.

- [X] T001 [P] Copy `public/images/identity/phillipe-augusto-avatar.webp` from commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` into `public/images/identity/phillipe-augusto-avatar.webp`.
- [X] T002 [P] Copy `public/projects/ello-learn/ello-learn-poster.webp` and `public/projects/ello-learn/ello-learn-first-frame.webp` from commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` into `public/projects/ello-learn/`.
- [X] T003 [P] Copy `read-with-ello-poster.webp`, `read-with-ello-first-frame.webp`, `read-with-ello-quest.webp`, `read-with-ello-quest-mobile.webp`, and `read-with-ello-mobile-library.webp` from commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` into `public/projects/ello-read/`.
- [X] T004 [P] Copy `public/projects/pathless/pathless-poster.webp` and `public/projects/pathless/pathless-first-frame.webp` from commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` into `public/projects/pathless/`.
- [X] T005 [P] Copy `public/projects/wallace-quest/wallace-quest-poster.webp` and `public/projects/wallace-quest/wallace-quest-first-frame.webp` from commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` into `public/projects/wallace-quest/`.
- [X] T006 Compare `public/projects/ello-learn/ello-learn-first-frame.webp` with `public/projects/ello-learn/ello-learn-gameplay-preview.gif`, `public/projects/ello-read/read-with-ello-first-frame.webp` with `public/projects/ello-read/read-with-ello-gameplay-preview.gif`, `public/projects/pathless/pathless-first-frame.webp` with `public/projects/pathless/pathless-gameplay-preview.gif`, and `public/projects/wallace-quest/wallace-quest-first-frame.webp` with `public/projects/wallace-quest/wallace-quest-gameplay-preview.gif`; confirm project identity and record dimension/crop findings in `specs/003-media-fallbacks/research.md` before wiring references.

**Checkpoint**: All selected WebP files exist; first frames correspond to their GIFs; legacy PNGs remain until their references are replaced.

---

## Phase 3: User Story 1 - See an accurate static project image (Priority: P1) 🎯 MVP

**Goal**: Keep a matching static image visible through GIF loading/failure and whenever reduced motion is active.

**Independent Test**: For each in-scope GIF, observe the first-frame WebP before and during throttled loading, with reduced motion on, and after a failed GIF request. Confirm it never flashes blank or unrelated media.

### Implementation for User Story 1

- [X] T007 [US1] Update `src/components/ProjectMediaPreview.astro` and `src/styles/global.css` to render the static fallback initially, load the GIF as a separate layer only when existing preview behavior requests it and motion is allowed, reveal it only after successful readiness, retain the fallback on error, and expose only the active image to assistive technology.
- [X] T008 [P] [US1] Update the Wallace’s Quest and Read With Ello animated hero records in `src/data/cases.ts` to use their matching first-frame WebP as `src`, retain their existing GIF `previewSrc`, revise alternative text to describe the first frame, and remove the direct-animation bypass.
- [X] T009 [P] [US1] Update animated featured/archive media references in `src/data/projects.ts` for Wallace’s Quest, Read With Ello, Pathless, and Learn With Ello to use the matching first-frame WebP while preserving GIF paths, preview behavior, fit, dimensions, and project descriptions.

**Checkpoint**: In-scope GIFs have a project-matched fallback under reduced motion, loading, decode failure, and ordinary preview use.

---

## Phase 4: User Story 2 - Browse optimized, consistent portfolio imagery (Priority: P2)

**Goal**: Use the selected WebP replacements in every current consumer without migrating unrelated imagery.

**Independent Test**: Open the avatar, project archive identities, project thumbnail, and case-study story images. Confirm each path resolves, depicts its named project, and retains its expected crop and dimensions.

### Implementation for User Story 2

- [X] T010 [P] [US2] Replace archive identity image references in `src/data/projects.ts` for Wallace’s Quest, Read With Ello, Pathless, and Learn With Ello with their matching `*-poster.webp` assets; keep animated project media references on their first-frame WebPs.
- [X] T011 [P] [US2] Replace the Read With Ello quest, mobile quest, and mobile-library screenshot references in `src/data/cases.ts` with `read-with-ello-quest.webp`, `read-with-ello-quest-mobile.webp`, and `read-with-ello-mobile-library.webp`.
- [X] T012 [P] [US2] Change the navigation avatar path in `src/components/Navigation.astro` to `/images/identity/phillipe-augusto-avatar.webp`.
- [X] T013 [P] [US2] Pass the Pathless WebP identity poster into the shared supporting-card thumbnail contract so More Projects displays its project poster at rest and requests the existing GIF preview only on hover or focus; preserve the first-frame WebP fallback in the project archive media record.

**Checkpoint**: All currently used assets from the selected historical replacements resolve to WebP paths; unrelated static imagery retains its existing format.

---

## Phase 5: User Story 3 - Maintain project-wide media rules (Priority: P2)

**Goal**: Record durable media guidance and the general accessibility principle in their approved project locations.

**Independent Test**: Review the media guide and constitution together; a contributor can determine the required fallback, format, first-frame handling, and reduced-motion behavior for a new GIF without contradictory instructions.

### Implementation for User Story 3

- [X] T014 [P] [US3] Create `docs/media-guidelines.md` documenting WebP for static images introduced or replaced under this convention, a first-frame WebP for every GIF used as project media, asset naming/reference updates, accessible descriptions, and reduced-motion fallback behavior.
- [X] T015 [P] [US3] Use `$speckit-constitution` to amend `.specify/memory/constitution.md` with the general requirement for accurate static media fallbacks and reduced-motion support; keep WebP and frame-generation details in `docs/media-guidelines.md` and follow the constitution versioning/governance workflow.

**Checkpoint**: Constitution contains the general principle, and `docs/media-guidelines.md` contains the concrete media rules.

---

## Phase 6: User Story 4 - Scroll through the site without media-related stutter

**Purpose**: Establish a consistent baseline and determine whether preview GIFs cause observed scroll frame drops before making any performance behavior change.

- [X] T018 [US4] Record browser/device, browser version, viewport, device pixel ratio, display refresh rate, normal-motion setting, and total dropped/partially presented frame counts for a representative scroll on each of the six generated content page routes in `specs/003-media-fallbacks/tasks.md`, including the Experience section during the Home scroll and following `specs/003-media-fallbacks/quickstart.md`; cover the generated `/experience/` redirect through Home rather than as a separate scroll page.
- [X] T019 [US4] For each route whose baseline has dropped frames, capture three same-condition scroll traces with project preview GIFs allowed and three with preview GIF requests blocked; before every trace reload the route with that condition set, verify GIF requests loaded or were blocked in DevTools Network, record the dropped-frame count for each trace, and compare the six counts in `specs/003-media-fallbacks/tasks.md`.
- [X] T020 [US4] After comparing T019 and supplemental traces, record the dropped-frame counts and a decision with rationale: investigate separately; media transfer/decode is demonstrable but an FPS benefit is not yet established.
- [X] T021 [US4] Add a shared `IntersectionObserver` gate in `src/components/ProjectMediaPreview.astro` so autoplay GIF requests begin only when their media area enters a prefetch range around 75% of the viewport height. Keep each WebP visible until GIF readiness, preserve reduced-motion suppression and explicit hover/focus triggers, and retain existing behavior when `IntersectionObserver` is unavailable.

- [X] T022 [US4] Verify cold no-scroll GIF request counts/bytes on Home and `/projects/`, confirm each preview loads as it enters the T021 prefetch range, and review fallback/reduced-motion/hover/focus behavior using the new quickstart scenarios. Repeat the three allowed and three blocked Wallace's Quest traces, recording frame outcomes separately from network/decode savings.

## Phase 7: Polish and Cross-Cutting Validation

- [X] T023 Audit references in `src/`, `public/`, and `docs/` for every replaced PNG path from `d10b31a0d5eefbbc5dfd1a58d65c474513af3842`; confirm all active consumers resolve to existing assets and verify that the historical orphan `public/projects/ello-read/read-with-ello-book.png` has no active reference.
- [X] T024 After the reference audit in T023, remove the nine scoped PNG files: `public/images/identity/phillipe-augusto-avatar.png`, `public/projects/ello-learn/ello-learn-poster.png`, `public/projects/ello-read/read-with-ello-mobile-library.png`, `public/projects/ello-read/read-with-ello-poster.png`, `public/projects/ello-read/read-with-ello-quest-mobile.png`, `public/projects/ello-read/read-with-ello-quest.png`, `public/projects/ello-read/read-with-ello-book.png`, `public/projects/pathless/pathless-poster.png`, and `public/projects/wallace-quest/wallace-quest-poster.png`.
- [X] T025 Run `git diff --check`, `npm run check`, and `npm run build`, then complete all applicable media and scroll scenarios in `specs/003-media-fallbacks/quickstart.md`; report actual viewport/browser combinations reviewed.
- [X] T026 Obtain human review of the changed media, responsive presentation, reduced-motion behavior, constitution amendment, and any evidence-based scroll change; record the review outcome in `specs/003-media-fallbacks/tasks.md` before treating the work as approved for merge or push, as required by Principle IX in `.specify/memory/constitution.md`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No changes required.
- **Foundational assets (Phase 2)**: Complete T001–T006 before implementing references or preview behavior.
- **User Story 1 (Phase 3)**: Depends on Phase 2; provides the P1 fallback behavior.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and follows US1 because `projects.ts` and `cases.ts` are updated by both stories.
- **User Story 3 (Phase 5)**: Uses decisions already recorded in `spec.md`; can proceed after Phase 2 in parallel with source changes because its files are separate.
- **User Story 4 (Phase 6)**: T018 records the route baseline; T019 runs paired comparisons only for routes where drops are observed; T020 always records the decision; T021 is conditional on a decision to implement; T022 validates a code change when one is made.
- **Polish (Phase 7)**: T023–T024 audit and remove assets; T025 follows all implementation and documentation work; T026 follows validation and blocks approval for merge or push.

### User Story Dependencies

- **US1 (P1)**: Can be implemented after Phase 2; no dependency on another story.
- **US2 (P2)**: Its `projects.ts` and `cases.ts` tasks follow US1 data updates to avoid concurrent edits; Navigation and SupportingProject tasks are independent.
- **US3 (P2)**: Media guide and constitution amendment use distinct files and can proceed in parallel after the clarified decisions in the spec.
- **US4 (P2)**: Its assessment follows implementation of the current media behavior. A code change is only in scope if the paired trace supports GIF attribution.

### Parallel Opportunities

- T001–T005 copy assets into distinct directories and can run in parallel; T006 waits for all five.
- T007, T008, and T009 touch separate component/style/data files and can run in parallel after T001–T006.
- T010–T013 touch distinct files and can run in parallel after US1 is integrated.
- T014 and T015 touch distinct documentation/governance files and can run in parallel.
- T018 precedes T019; T019 precedes the decision T020; T020 precedes conditional implementation T021 and validation T022. T025 and T026 remain sequential after assessment and implementation.

## Implementation Strategy

### MVP First (User Story 1)

1. Copy and visually confirm the first-frame WebPs (Phase 2).
2. Implement the shared fallback/loading behavior and wire first-frame sources (Phase 3).
3. Validate US1 with reduced motion, throttled loading, GIF failure, and the existing autoplay/hover/focus flows.

### Incremental Delivery

1. Complete US1 to fix the incorrect initial and reduced-motion thumbnails.
2. Complete US2 to switch all selected static replacements and update all active references.
3. Complete US3 to document the project-wide convention and constitution principle.
4. Complete US4's controlled route review; make a performance change only if the paired trace confirms GIF attribution.
5. Audit before deleting old assets, then run the quickstart checks.

## Execution Notes

- Automated validation: `git diff --check`, `npm run check`, and `npm run build` passed on 2026-10-02. Astro check reported 0 errors and 0 warnings, with 2 pre-existing hints outside this feature.
- Validation rerun on 2026-10-03: `git diff --check` passed; `npm run check` reported 0 errors, 0 warnings, and 2 hints; `npm run build` generated seven HTML outputs (six content routes plus the `/experience/` redirect).
- Browser review completed in Chrome at the observed 1258 × 714 desktop viewport: the Wallace’s Quest hero shows the GIF after readiness, and a deliberately unavailable local GIF request leaves the WebP first-frame fallback visible and accessible. The GIF was restored after the failure check.
- Scroll assessment completed on 2026-10-03 in a visible, maximized Chrome 154 window on Windows (display 2560 × 1080; page viewport 2005 × 953 CSS px; DPR 1; reduced motion off; Balanced power plan). The observed `requestAnimationFrame` cadence was 59.9 Hz over 1.5 seconds. Preview GIFs were allowed with no throttling for the baseline. A DevTools `scrollTo({ behavior: "smooth" })` moved each page from `scrollY = 0` to its measured bottom while the document remained visible; DevTools had focus, so page `hasFocus()` was false. Experience was included in the Home trace; `/experience/` remains a redirect, not a separate content page. Per-route frame counts and selected trace events are in `specs/003-media-fallbacks/evidence/scroll/`.

| Route | Dropped frames | Partially presented frames | GIF Network result | Evidence |
|---|---:|---:|---|---|
| `/` (includes Experience) | 0 | 8 | 2 requested, 2 loaded | `evidence/scroll/home.json` |
| `/projects/` | 0 | 7 | 4 requested, 4 loaded | `evidence/scroll/projects.json` |
| `/work/ilhas-do-alfabeto/` | 0 | 0 | no preview GIF requested | `evidence/scroll/work-ilhas-do-alfabeto.json` |
| `/work/wallaces-quest/` | 1 | 2 | 1 requested, 1 loaded | `evidence/scroll/work-wallaces-quest.json` |
| `/work/read-with-ello/` | 0 | 1 | 1 requested, 1 loaded | `evidence/scroll/work-read-with-ello.json` |
| `/work/craque-da-fluencia/` | 0 | 0 | no preview GIF requested | `evidence/scroll/work-craque-da-fluencia.json` |

| Wallace’s Quest condition | Run 1 | Run 2 | Run 3 | Network verification |
|---|---:|---:|---:|---|
| Preview GIF allowed | 0 | 1 | 1 | GIF loaded in all three runs |
| Preview GIF blocked | 0 | 0 | 0 | `blockedReason: inspector` in all three runs |

- **T020 decision recorded (2026-10-03): investigate separately.** Supplemental visible-tab Chrome 154 traces on all six routes show no renderer-main-thread task above 16.7 ms (60 Hz interval) or 50 ms. Home had two tasks over 8 ms (13.9 ms maximum); the other routes had none. Layout/style/paint were modest. The supplementary scroll used CDP `window.scrollTo({ behavior: "smooth" })`; it was not a physical wheel or touch test. The trace's internal `DroppedFrame` markers are supplemental diagnostics only; they differ from the DevTools Frames track totals and do not replace T018/T019. See `specs/003-media-fallbacks/evidence/scroll-diagnostics/`.
- With cache disabled, Resource Timing confirmed that Home requests both autoplay GIFs before scroll: 18,923,951 encoded body bytes total. `/projects/` requests all four before scroll: 35,989,613 bytes. Animated-image decode events are present in worker threads. This proves avoidable early transfer/decode workload, not a site-wide or main-thread FPS regression. The small T019 directional frame signal motivates a separate, narrowly scoped experiment to defer autoplay GIF requests until their media area approaches the viewport; preserve the WebP fallback and judge network work and presented frames separately. No runtime performance change was made in this assessment.
- **T021 implemented and T022 validated (2026-10-03):** one shared `IntersectionObserver` starts autoplay GIF requests within a root margin equal to 75% of the viewport height. Cache-disabled, visible-tab Chrome 154 cold loads with no scroll requested 1 Home GIF (11,463,502 encoded body bytes) instead of 2 (18,923,951), avoiding 7,460,449 bytes (39.4%). `/projects/` requested 2 GIFs (9,021,504 bytes) instead of 4 (35,989,613), avoiding 26,968,109 bytes (74.9%). These savings apply only if users do not scroll into the deferred media areas; full-page scrolling requested all intended previews as they entered the range. Reduced-motion reloads requested zero preview GIFs on both routes. A paused request retained the fallback until successful decode; a failed request retained it; keyboard focus and physical pointer hover both loaded their previews. `IntersectionObserver` absence is handled by the immediate fallback branch in code but was not simulated in the browser. Evidence: `evidence/scroll-diagnostics/after-deferred-autoplay.json`, `interactive-checks.json`, and `hover-check.json`.
- **Post-change frame comparison:** three Wallace's Quest traces per condition used the same visible Chrome 154 tab, 2005 × 953 CSS px emulated viewport, DPR 1, 60 Hz observation, no throttling, and top-to-bottom CDP smooth scrolling. GIF allowed: dropped 0/1/2; partially presented 1/2/3. GIF blocked: dropped 0/0/0; partially presented 0/0/0. Network confirmed the GIF loaded in all allowed runs and failed as blocked in all blocked runs. The result is a small, variable signal on one route, with more partial and dropped frames in allowed runs; it supports reducing media work but does not establish a general FPS improvement or a causal site-wide result. Individual traces are `evidence/scroll-diagnostics/after-deferred-{allowed,blocked}-{1,2,3}.json`; combined results are in `after-deferred-autoplay-frames.json`.
- Automated and browser validation completed on 2026-10-03: `git diff --check` passed; `npm run check` reported 0 errors, 0 warnings, and 2 pre-existing hints; `npm run build` generated seven HTML outputs. In visible Chrome 154, T022's post-change loading, request failure, reduced-motion, focus, hover, near-range, and frame scenarios passed. T025 also verified the static poster and project links with JavaScript disabled, enabled reduced motion while the GIF request was paused, and visually reviewed Home, Projects, and both animated case-study heroes at 768 × 1024 and 390 × 844 CSS px (DPR 1); no horizontal overflow was present. Screenshots and machine-readable checks are in `evidence/scroll-diagnostics/final-validation.json` and the `home-*`, `projects-*`, `work-wallaces-quest-*`, and `work-read-with-ello-*` PNGs. The unsupported-`IntersectionObserver` branch remains code-reviewed but not runtime-simulated.
- Reusable measurement/rendering practices and the current recommendation are recorded in `docs/performance-guidelines.md`; route trace summaries and cache-disabled network measurements are in `specs/003-media-fallbacks/evidence/scroll-diagnostics/`. Follow that guide for future scrolling, animation, and media changes.
- **T026 human review approved (2026-10-03):** The user approved the changed media, responsive presentation, reduced-motion behavior, constitution amendment, and evidence-based scroll change after reviewing the validation results and screenshots. The feature is approved for merge or push under constitution Principle IX.
