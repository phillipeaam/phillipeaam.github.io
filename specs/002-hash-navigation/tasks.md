# Tasks: Hash Navigation

**Input**: Design documents from `specs/002-hash-navigation/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, and `quickstart.md`)

**Current finding**: The earlier patch removed the 180 ms native cross-document View Transition and restored Home scroll synchronously from an Astro module. The user reported a residual top-to-target flash on repeated Pathless media navigation and archive Back. A new Chrome screencast reproduced it: Home→archive emitted three frames at `scrollY=0` before the Pathless target at `scrollY=3785`; archive Back emitted two Home-top frames at `scrollY=0` before returning to saved `scrollY=2431`. The old first-frame capture tested only the no-hash `/projects/` route and did not cover these journeys. T022-T024 track the residual reproduction, fix, and five-cycle validation; T013/T021 human review remains pending.

**Tests**: Real-browser temporal validation, `git diff --check`, Astro diagnostics, and production build are required. Do not add an automated suite unless investigation shows it is appropriate.

## Phase 1: Investigation Setup

**Purpose**: Prepare repeatable browser conditions and distinguish the two return/navigation mechanisms.

- [X] T001 Start the local Astro site and prepare Chrome at desktop, tablet, and mobile CSS viewport sizes; record browser/version if available and exact viewport dimensions in `specs/002-hash-navigation/quickstart.md`.

## Phase 2: Foundational - Root-Cause Investigation Before Patching

**Purpose**: Capture the reported temporal behavior before examining or changing implementation.

- [X] T002 From fresh Home loads, compare the Pathless card with direct `/projects/#pathless` and Wallace's Selected work text link, and capture the separate Header Back restoration with time-ordered screenshots, URL/hash, target position, and header clearance. For pre-patch Pathless captures, complete three runs at each viewport when a reversible pre-patch build is available, and document the counts in `quickstart.md`. Use the Immediate-Frame Capture Method in `plan.md` for reproducible timestamps and screenshots.
- [X] T003 Trace target/layout readiness and image sizing, global scroll rules, hash scripts, BaseLayout links, and Astro navigation configuration. Identify the initial native cross-document View Transition and deferred Header Back restoration path; later frame-by-frame evidence refined the remaining first-paint causes in `research.md`.

## Phase 3: User Story 1 - Open a Project Directly from Home (Priority: P1)

**Goal**: Home project thumbnails open the matching project record without a visible archive-top-then-scroll sequence.

**Independent Test**: Compare the Pathless More Projects card thumbnail with its direct URL and separately compare Wallace's Quest Selected work text link at desktop, tablet, and mobile widths; observe first paint and later movement.

- [X] T004 [US1] After runtime and source evidence established the navigation causes, remove the automatic cross-document root transition and restore Home's saved scroll position synchronously. Record the rationale in `research.md`.
- [X] T005 [US1] At desktop, tablet, and mobile widths after the patch, test all More Projects card thumbnails linked to record hashes and Wallace's Quest `See on all projects` link. Verify the matching first destination and sticky-header clearance; record results in `quickstart.md`.

## Phase 4: User Story 2 - Open or Reload a Deep Link (Priority: P1)

**Goal**: Direct links and reloads show their requested section.

**Independent Test**: Open and reload both group hashes and the Pathless project hash at desktop, tablet, and mobile widths; confirm the matching destination and readable heading.

- [X] T006 [US2] Open and reload `/projects/#professional-game`, `/projects/#independent-game`, and `/projects/#pathless` at desktop, tablet, and mobile widths; record destination positions and header clearance in `quickstart.md`.

## Phase 5: User Story 3 - Preserve Return, History, and Home Navigation (Priority: P2)

**Goal**: Returning from an archive record, using browser history, opening no-hash URLs, and using Home section links remain predictable.

**Independent Test**: From a scrolled Home position, open a project and use the archive header `Back` link; separately use browser Back/Forward. Test no-hash destinations and Home same-page smooth scrolling at each viewport.

- [X] T007 [US3] At desktop, tablet, and mobile widths, verify Header Back restoration, browser Back/Forward, and `/projects/` no-hash top entry/history separately. Record outcomes in `quickstart.md`.
- [X] T008 [US3] Complete the remaining accessibility and progressive-enhancement checks: activate links by touch and verify adjacent targets do not activate; emulate reduced motion for cross-page and same-page navigation; disable optional scripts and verify core destinations remain reachable. Cover representative desktop, tablet, and mobile widths, and record the exact modes, viewports, and observed outcomes in `quickstart.md`. Preserve the already recorded keyboard, accessible-name, focus, and target-size results.

## Phase 6: Evidence, Validation, and Review

**Purpose**: Keep artifacts aligned, run required project checks, and preserve the human review gate.

- [X] T009 Update `research.md`, `quickstart.md`, and `plan.md` with time-ordered evidence, source-supported causes, patch, viewport conditions, outcomes, and remaining limits.
- [X] T010 Run `git diff --check` from the repository root after final document edits and record the result in `quickstart.md`.
- [X] T011 Run Astro diagnostics with `npm run check` and record the result in `quickstart.md`.
- [X] T012 Run the production build with `npm run build` and record the result in `quickstart.md`.
- [X] T017 Capture the `See all projects` activation at representative desktop, tablet, and mobile CSS viewport sizes with Chrome DevTools Performance recording and screenshots enabled. Record the activation timestamp from the trace, inspect the first destination frame, and sample `location.href`, `scrollY`, destination heading top, and sticky-header bottom immediately after navigation and at 500 ms. Save one trace per viewport/run under `artifacts/screenshots/hash-navigation/` and summarize the method and results in `quickstart.md` per FR-005 and SC-004.
- [X] T013 Submit the investigation, validation results, and any minimal source diff for human review; record the outcome in `specs/002-hash-navigation/plan.md`. Do not treat meaningful source changes as approved for merge or push until accepted. The user reviewed and accepted the change on 2026-10-03.

## Dependencies & Execution Order

- T001 prepares the browser and viewports.
- The initial T002 reproduction evidence is the gate for T003's source investigation; T003 may proceed once that evidence captures the reported behavior, even if optional repeat runs remain outstanding.
- T004 may begin after the initial T002 evidence and T003 jointly support a cause. Any outstanding T002 repeat runs remain validation work and do not invalidate the evidence already used for T004. After a patch or no-patch decision, T005-T008 validate the final source state.
- T005-T008 run sequentially because they share browser state. A missing viewport or accessibility check stays explicitly pending.
- T009 follows runtime checks; T010-T012 follow the final source state; T017 completes the additional all-projects arrival capture before T013, which remains the final human review gate.
- No tasks are parallelized: the runtime investigation and browser checks share browser state and depend on prior evidence. Each user story is validated independently in T005, T006, and T007-T008; there are no parallel examples because no story tasks are independent of the shared sequential browser setup and evidence.

## Implementation Strategy

1. Complete T001-T003 and establish causes separately for cross-page hash arrival and header Back restoration.
2. Make a minimal source change in T004 only if runtime and source evidence support it. Otherwise document the unresolved finding without patching.
3. Complete T005-T008 against the final source state.
4. Complete T009-T012 and T017 before submitting the complete result for T013 human review.

## Completion Conditions

- Both reported time-ordered journeys are captured and their causes distinguished.
- Any patch follows reproduced behavior and an evidence-supported cause.
- Cross-page hashes, reloads, browser history, header Back restoration, no-hash starts, Home smooth scrolling, and applicable accessibility behavior are checked at representative desktop, tablet, and mobile widths.
- The no-hash `See all projects` activation has first-frame evidence at representative desktop, tablet, and mobile widths per T017.
- `git diff --check`, Astro diagnostics, and the production build results are recorded.
- Human review remains the final gate for meaningful source changes.

## Phase 7: Convergence

- [X] T018 Complete the remaining pre-patch comparison evidence for Pathless and Header Back: capture three runs per viewport when a reversible pre-patch build is available, or record why it cannot be recovered and finish the separate Header Back comparison, per FR-001, FR-010, SC-001, SC-008, and plan: root-cause evidence (partial).
- [X] T019 Validate touch activation and adjacent-target behavior, reduced-motion cross-page and same-page navigation, and core destinations with optional scripts disabled; record exact modes, viewports, and outcomes, per FR-009, SC-007, Constitution IV, and Constitution V (partial).
- [X] T020 Capture and retain Chrome Performance traces and first-destination-frame screenshots for `See all projects` at desktop, tablet, and mobile widths; record trace activation time and immediate/500 ms geometry, per FR-005 and SC-004 (partial).
- [X] T021 Obtain human review of the source change and record the outcome in `plan.md` before merge or push, per Constitution IX (partial). The user reviewed and accepted the change on 2026-10-03.
- [X] T022 Reproduce the residual Pathless media-to-record and archive-header-Back top-frame flashes after the earlier patch with CDP screencast frames; record timestamps, scroll offsets, and representative images per FR-001, FR-010, and FR-011.
- [X] T023 Move initial hash alignment and saved Home restoration to a pre-paint point in the document lifecycle while preserving semantic links, native history, no-hash top entry, and same-page Home smooth scrolling, per FR-001, FR-004, FR-006, FR-010, and FR-011.
- [X] T024 Validate five consecutive Pathless media-to-record and header-Back cycles with frame-by-frame captures at desktop, tablet, and mobile widths; update evidence and verify no page-top frames per SC-001, SC-008, and SC-009.
