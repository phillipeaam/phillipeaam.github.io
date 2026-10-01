# Tasks: Hash Navigation

**Input**: Design documents from `specs/002-hash-navigation/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, and `quickstart.md`)

**Current finding**: The Pathless thumbnail transition is reproduced: the archive top appears before the Pathless record. The archive header `Back` link also returns to Home at the top before restoring the previous position; `Navigation.astro` contains the session flag and later scroll. The cross-page anchor's initial reposition cause still needs evidence-based tracing. Do not patch before T002-T003.

**Tests**: Real-browser temporal validation, `git diff --check`, Astro diagnostics, and production build are required. Do not add an automated suite unless investigation shows it is appropriate.

## Phase 1: Investigation Setup

**Purpose**: Prepare repeatable browser conditions and distinguish the two return/navigation mechanisms.

- [ ] T001 Start the local Astro site and prepare Chrome at desktop, tablet, and mobile CSS viewport sizes; record browser/version if available and exact viewport dimensions in `specs/002-hash-navigation/quickstart.md`.

## Phase 2: Foundational - Root-Cause Investigation Before Patching

**Purpose**: Capture the reported temporal behavior before examining or changing implementation.

- [ ] T002 From a fresh Home load at each available viewport, click the Pathless card thumbnail in More Projects three times; capture first destination view, later movement, URL/hash, final target position, and sticky-header clearance. Separately record the scrolled Home position, click the Pathless More Projects thumbnail, use the archive header `Back` link, and capture Home's first view and restoration movement. Compare the Pathless card with direct `/projects/#pathless`, and separately check Wallace's Quest `See on all projects` text link in Selected work; record each run in `specs/002-hash-navigation/quickstart.md`.
- [ ] T003 After T002, trace the reproduced archive-top-to-target transition against target/layout readiness and image sizing in `src/pages/projects/index.astro`, `src/data/projects.ts`, and `src/styles/global.css`; inspect hash and route-reactive scripts including `src/components/Navigation.astro`, the shell in `src/layouts/BaseLayout.astro`, and Astro navigation configuration in `astro.config.mjs`. Trace the separate header `Back` session flag and Home restoration path in `src/components/Navigation.astro`. Document causes only when supported by temporal runtime evidence and source behavior in `specs/002-hash-navigation/research.md`.

## Phase 3: User Story 1 - Open a Project Directly from Home (Priority: P1)

**Goal**: Home project thumbnails open the matching project record without a visible archive-top-then-scroll sequence.

**Independent Test**: Compare the Pathless More Projects card thumbnail with its direct URL and separately compare Wallace's Quest Selected work text link at desktop, tablet, and mobile widths; observe first paint and later movement.

- [ ] T004 [US1] Only after T002 reproduces and T003 identifies a supported in-scope cause, apply the smallest source change to the responsible file and document the rationale in `specs/002-hash-navigation/research.md`; candidate source paths are `src/pages/projects/index.astro`, `src/data/projects.ts`, `src/styles/global.css`, `src/components/Navigation.astro`, `src/layouts/BaseLayout.astro`, and `astro.config.mjs`. If investigation cannot establish a cause, make no implementation change and update `specs/002-hash-navigation/plan.md` with the unresolved evidence gap.
- [ ] T005 [US1] At desktop, tablet, and mobile widths after the final source state, test every More Projects card thumbnail linked to a project-record hash, including Pathless; compare each destination with its direct URL and separately test Wallace's Quest text link in Selected work. Verify no top-then-scroll transition and that destination headings clear the sticky header. Record time-ordered results in specs/002-hash-navigation/quickstart.md.

## Phase 4: User Story 2 - Open or Reload a Deep Link (Priority: P1)

**Goal**: Direct links and reloads show their requested section.

**Independent Test**: Open and reload both group hashes and the Pathless project hash at desktop, tablet, and mobile widths; confirm the matching destination and readable heading.

- [ ] T006 [US2] In Chrome at desktop, tablet, and mobile widths, open `/projects/#professional-game`, `/projects/#independent-game`, and `/projects/#pathless` in fresh tabs, then reload each; record initial and final destination, any visible movement, and header clearance in `specs/002-hash-navigation/quickstart.md`.

## Phase 5: User Story 3 - Preserve Return, History, and Home Navigation (Priority: P2)

**Goal**: Returning from an archive record, using browser history, opening no-hash URLs, and using Home section links remain predictable.

**Independent Test**: From a scrolled Home position, open a project and use the archive header `Back` link; separately use browser Back/Forward. Test no-hash destinations and Home same-page smooth scrolling at each viewport.

- [ ] T007 [US3] At desktop, tablet, and mobile widths, repeat Home-at-saved-position -> Pathless -> archive header `Back`; verify Home's previous section appears without an initial top view and later scroll, and verify browser Back/Forward separately restores the expected URL, hash, and section. Test `/projects/` entries without hashes return to the top. Record timed observations in `specs/002-hash-navigation/quickstart.md`.
- [ ] T008 [US3] At desktop, tablet, and mobile widths, verify each More Projects project-card thumbnail, Wallace's Quest `See on all projects` text link, and `Projects` controls are semantic links with meaningful names; keyboard-focus and activate them with visible focus; at mobile verify touch targets; test reduced-motion behavior and core link use when optional scripts are unavailable. Record each outcome in `specs/002-hash-navigation/quickstart.md`.

## Phase 6: Evidence, Validation, and Review

**Purpose**: Keep artifacts aligned, run required project checks, and preserve the human review gate.

- [ ] T009 Update `specs/002-hash-navigation/research.md`, `specs/002-hash-navigation/quickstart.md`, and `specs/002-hash-navigation/plan.md` with reproduced sequences, evidence-supported causes, patch/no-patch decision, viewport conditions, outcomes, and remaining limitations.
- [ ] T010 Run `git diff --check` from the repository root after final changes and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T011 Run Astro diagnostics with `npm run check` and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T012 Run the production build with `npm run build` and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T013 Submit the investigation, validation results, and any minimal source diff for human review; record the outcome in `specs/002-hash-navigation/plan.md`. Do not treat meaningful source changes as approved for merge or push until accepted.

## Dependencies & Execution Order

- T001 prepares the browser and viewports.
- T002 is the reproduction and timing-capture gate; T003 traces the cause only after the behavior is captured.
- T004 cannot begin until T002-T003 support a cause. After a patch or no-patch decision, T005-T008 validate the final source state.
- T005-T008 run sequentially because they share browser state. A missing viewport or accessibility check stays explicitly pending.
- T009 follows runtime checks; T010-T012 follow the final source state; T013 is the final human review gate.
- No tasks are parallelized: the runtime investigation and browser checks share browser state and depend on prior evidence. Each user story is validated independently in T005, T006, and T007-T008; there are no parallel examples because no story tasks are independent of the shared sequential browser setup and evidence.

## Implementation Strategy

1. Complete T001-T003 and establish causes separately for cross-page hash arrival and header Back restoration.
2. Make a minimal source change in T004 only if runtime and source evidence support it. Otherwise document the unresolved finding without patching.
3. Complete T005-T008 against the final source state.
4. Complete T009-T013 before considering the feature ready for review.

## Completion Conditions

- Both reported time-ordered journeys are captured and their causes distinguished.
- Any patch follows reproduced behavior and an evidence-supported cause.
- Cross-page hashes, reloads, browser history, header Back restoration, no-hash starts, Home smooth scrolling, and applicable accessibility behavior are checked at representative desktop, tablet, and mobile widths.
- `git diff --check`, Astro diagnostics, and the production build results are recorded.
- Human review remains the final gate for meaningful source changes.
