# Tasks: Hash Navigation

**Input**: Design documents from `specs/002-hash-navigation/` (`spec.md`,
`plan.md`, `research.md`, `data-model.md`, and `quickstart.md`)

**Current finding**: Existing desktop evidence covers the `See on all projects`
text link, not the reported featured-project thumbnail click. The exact
thumbnail flow must be investigated before any implementation decision.

**Tests**: Real-browser acceptance checks, `git diff --check`, Astro
diagnostics, and a production build are explicitly required. Do not add an
automated test suite unless the runtime evidence makes one appropriate.

## Phase 1: Investigation Setup

**Purpose**: Prepare a reproducible browser session and record test conditions.

- [ ] T001 Start the local site using the `dev` script in `package.json`, prepare a real-browser session at representative desktop, tablet, and mobile widths, and record browser/version, actual viewport dimensions, and any unavailable width in `specs/002-hash-navigation/quickstart.md`.

## Phase 2: Foundational Root-Cause Investigation

**Purpose**: Reproduce the specific reported user journey before examining
possible causes or allowing a patch.

- [ ] T002 From a fresh Home load, click the featured project's thumbnail itself and record whether it is interactive, the exact clicked control, resulting URL/hash, initial visible content, target position, and any later movement; repeat the click path three times at each available viewport and compare with the same card's `See on all projects` link and direct opening of its resulting URL; record each run and screen evidence in `specs/002-hash-navigation/quickstart.md` and `specs/002-hash-navigation/research.md`.
- [ ] T003 Only if T002 reproduces the archive-top-then-scroll behavior, trace the observed path against global scroll rules and anchor offsets in `src/styles/global.css`, hash/scroll handlers and route-reactive scripts in `src/components/Navigation.astro` and other scripts under `src/`, page structure and target IDs in `src/pages/projects/index.astro` and `src/data/projects.ts`, the shared shell in `src/layouts/BaseLayout.astro`, and Astro navigation configuration in `astro.config.mjs`; connect a proposed cause to runtime evidence and document it in `specs/002-hash-navigation/research.md` before any patch. If T002 does not reproduce, record that no root-cause patch is indicated and do not infer a cause.

## Phase 3: User Story 1 - Open a Project Directly from Home (Priority: P1)

**Goal**: The featured project's thumbnail navigation displays its project
record directly, without an archive-top view followed by a visible scroll.

**Independent Test**: At desktop, tablet, and mobile widths, use the same
featured-project thumbnail, text link, and direct record URL, and compare the
destination and visible transition.

- [ ] T004 [US1] If T002 reproduces the report and T003 documents a supported in-scope cause, apply the smallest source change to the responsible file identified among `src/styles/global.css`, `src/components/Navigation.astro`, `src/layouts/BaseLayout.astro`, or the specific route/script file established by T003; if T002 does not reproduce, record `no patch needed` in `specs/002-hash-navigation/research.md` and make no implementation change; if a fix would require out-of-scope routing or visual redesign, stop and update `specs/002-hash-navigation/plan.md` before implementation.
- [ ] T005 [US1] In a real browser at representative desktop, tablet, and mobile widths, validate after the final source state that the Home thumbnail and `See on all projects` text link each reach the correct `/projects/#<project-record>` destination directly, that the two category hashes `/projects/#professional-game` and `/projects/#independent-game` open at their groups, and that all destination headings clear the sticky header; record actual viewport sizes and results in `specs/002-hash-navigation/quickstart.md`.

## Phase 4: User Story 2 - Open or Reload a Deep Link (Priority: P1)

**Goal**: Direct links and reloads display the requested section.

**Independent Test**: Open and reload both category hashes and the individual
project-record hash captured by T002 at each available viewport class; confirm
the requested group or project is visible.

- [ ] T006 [US2] In a real browser at representative desktop, tablet, and mobile widths, open `/projects/#professional-game`, `/projects/#independent-game`, and the exact `/projects/#<project-record>` hash captured by T002 directly in fresh tabs, then reload each URL; confirm the matching group or project record is the destination, no archive-top-then-scroll transition occurs, and its heading is unobscured by the sticky header; record results and unavailable viewports in `specs/002-hash-navigation/quickstart.md`.

## Phase 5: User Story 3 - Preserve History and Home Navigation (Priority: P2)

**Goal**: Browser history, no-hash destinations, Home same-page scrolling, and
accessible navigation continue to behave as expected.

**Independent Test**: At each available viewport class, test hashed and
no-hash history entries, Home's same-page link, keyboard/focus, reduced motion,
and navigation when optional scripts are unavailable.

- [ ] T007 [US3] In a real browser at representative desktop, tablet, and mobile widths, navigate `/projects/#professional-game` -> `/projects/` -> `/projects/#independent-game`, then use Back and Forward to verify each hash is restored and the no-hash entry returns to the top; separately activate Home's `See all projects` link and `Projects` same-page link, confirming no-hash top arrival and preserved smooth scrolling; record results in `specs/002-hash-navigation/quickstart.md`.
- [ ] T008 [US3] At representative desktop, tablet, and mobile widths, verify Home's featured-project thumbnail, `See on all projects`, and `Projects` controls are semantic links with meaningful accessible names; keyboard-focus and activate each applicable link and confirm visible focus and successful navigation; at mobile width activate each control by touch and confirm no adjacent control is accidentally triggered; test cross-page and same-page behavior with reduced-motion enabled and confirm core navigation works when optional scripts are unavailable; record each result in `specs/002-hash-navigation/quickstart.md`.

## Phase 6: Evidence, Validation, and Review

**Purpose**: Finalize the investigation record, check repository health, and
obtain human review before accepting any meaningful change.

- [ ] T009 Update `specs/002-hash-navigation/research.md`, `specs/002-hash-navigation/quickstart.md`, and `specs/002-hash-navigation/plan.md` with the exact thumbnail reproduction result, root cause only if supported, patch/no-patch decision, actual browser and viewport conditions, acceptance outcomes, and outstanding validation limits.
- [ ] T010 Run `git diff --check` from the repository root after the final changes and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T011 Run Astro diagnostics with `npm run check` and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T012 Run the production build with `npm run build` and record the result in `specs/002-hash-navigation/quickstart.md`.
- [ ] T013 Submit the investigation evidence and any minimal source diff for human review; record the review outcome in `specs/002-hash-navigation/plan.md` and do not treat meaningful changes as approved for merge or push until accepted.

## Dependencies & Execution Order

### Phase Dependencies

- T001 prepares the browser and recorded viewport conditions.
- T002 follows T001 and is the required reproduction gate.
- T003 follows T002 and is performed only when the exact reported behavior
  reproduces. No patch may begin until the evidence-based cause is recorded.
- T004 follows T002-T003. It is a documented no-op for implementation when
  there is no reproduction; after any patch, T005-T008 validate the final state.
- T005-T008 are run sequentially because they share browser state. Any
  unavailable viewport or required accessibility check remains outstanding and
  must not be reported as passing.
- T009 follows the browser checks. T010-T012 run sequentially after the final
  source state is settled. T013 is the final human review gate.

### User Story Dependencies

- **US1 (P1)**: T005 depends on the investigation and T004's patch/no-patch
  decision; this is the primary user outcome.
- **US2 (P1)**: T006 depends on the final source state established by T004.
- **US3 (P2)**: T007-T008 depend on the final source state established by T004.

### Parallel Opportunities

- No parallel execution is recommended. Investigation and browser validation
  share the same runtime and evidence record, and implementation is conditional
  on the result of T002 and T003.

## Implementation Strategy

### MVP

1. Complete T001-T002 and establish whether the exact thumbnail report
   reproduces.
2. If it does not reproduce, complete T004 as `no patch needed`, document the
   tested conditions, and validate the remaining acceptance behavior.
3. If it reproduces, complete T003 before making the smallest supported change
   in T004, then validate all user stories against the final source state.
4. Complete T009-T013 before treating the work as finished.

### Completion Conditions

- The exact thumbnail interaction and text-link/direct-URL comparisons are
  documented with browser and viewport conditions.
- Any implementation change is tied to a reproduced failure and a cause
  supported by runtime evidence; no failure means no patch.
- If a patch is made, applicable navigation and accessibility scenarios pass
  at representative desktop, tablet, and mobile widths. Unavailable widths or
  checks remain explicit completion blockers.
- Applicable navigation controls are semantic links with meaningful
  accessible names, keyboard operation and visible focus, reduced-motion
  support, and usable touch targets; verify touch activation at mobile width.
- `git diff --check`, `npm run check`, and `npm run build` results are recorded.
- Human review accepts any meaningful source changes before merge or push.
