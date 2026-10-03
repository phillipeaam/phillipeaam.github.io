# Tasks: Animated Header Scroll on Projects Archive

**Input**: Design documents from `specs/004-animated-project-header-scroll/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, and `quickstart.md`

**Tests**: No automated test tasks were requested in the feature specification. Browser scenarios and project quality gates are listed in the final validation task.

## Phase 1: Setup

**Purpose**: Confirm current archive destinations and return behavior before changing navigation.

- [x] T001 Confirm the header fragment links and destination IDs in `src/components/Navigation.astro` and `src/pages/projects/index.astro`, and note the current Back restoration flow in `src/layouts/BaseLayout.astro`.

## Phase 2: Foundational

**Purpose**: No shared infrastructure is required; the feature uses existing navigation, destinations, and motion preferences.

## Phase 3: User Story 1 - Smoothly navigate project groups from the header (Priority: P1)

**Goal**: Animate user-activated in-page header navigation on `/projects/` while preserving link destinations, direct hash arrival, and reduced-motion behavior.

**Independent Test**: Follow User Story 1 scenarios in `specs/004-animated-project-header-scroll/quickstart.md`: activate all archive in-page header links with normal motion, keyboard/touch input, and reduced motion; verify correct targets and sticky-header clearance. Check that direct hash entry remains immediate.

- [x] T002 [US1] Add in-page header activation behavior on the archive route in `src/components/Navigation.astro`, preserving fragment URLs and history, using smooth motion unless reduced motion is requested, and excluding links that navigate to another page.
- [x] T003 [US1] Verify and retain the archive instant-entry and target-offset rules in `src/styles/global.css`; keep animated movement scoped to explicit link activation in `src/components/Navigation.astro`.

## Phase 4: User Story 2 - Return directly using the Back arrow (Priority: P1)

**Goal**: Preserve the left-arrow link's immediate return to the saved Home scroll position.

**Independent Test**: Follow User Story 2 scenarios in `specs/004-animated-project-header-scroll/quickstart.md`: enter `/projects/` from a scrolled Home position and activate Back by pointer, keyboard, and touch. Confirm the original position is restored immediately and other archive header links still animate.

- [x] T004 [US2] Keep the Back link excluded from animated archive fragment handling in `src/components/Navigation.astro`; verify the existing synchronous Home scroll restoration in `src/layouts/BaseLayout.astro` remains unchanged.

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T005 Run `npm run check`, `npm run build`, and `git diff --check`, then complete the desktop, tablet, mobile, reduced-motion, keyboard, touch, direct-hash, and Back scenarios in `specs/004-animated-project-header-scroll/quickstart.md`; record only viewports actually checked.

## Dependencies

- T001 is the baseline review and precedes implementation.
- User Story 1 (T002 → T003) establishes activated in-page motion and its direct-entry boundary.
- User Story 2 (T004) follows the shared navigation implementation so its explicit exclusion can be confirmed; it remains independently verifiable.
- T005 depends on T002, T003, and T004.

## Parallel Opportunities

- No implementation tasks are marked `[P]`: the navigation behavior and its CSS/document-entry boundaries interact, and Back shares the navigation handler.
- The user stories can be reviewed independently after their shared implementation is complete.

## Implementation Strategy

### MVP

Complete T001 through T003 for User Story 1 and verify its independent scenarios. This delivers animated archive header links while protecting direct hash entry.

### Incremental Delivery

1. Establish the baseline in T001.
2. Implement and verify User Story 1 in T002 and T003.
3. Confirm the Back exception in T004.
4. Run project quality gates and responsive/accessibility scenarios in T005.

## Parallel Example

No parallel implementation example applies because all behavior shares the same Navigation and document scroll lifecycle.



## Phase 6: Convergence

- [x] T006 Repeat the Home → `/projects/` → Back journey and compare the restored More Projects position; the reported approximately 128 px drift did not reproduce, and Back remained immediate without a page-top frame (SC-002, US2/AC1).
- [x] T007 Emulate `prefers-reduced-motion: reduce` through Chrome DevTools Protocol and activate all five archive header links; each reached its target immediately and remained stable after 100 ms (FR-006, SC-004, US1/AC3).
- [x] T008 Emulate a 390×844 touch viewport through Chrome DevTools Protocol; touch-open the mobile menu and touch Study, confirming the correct fragment, closed menu, and destination below the sticky header (FR-005, SC-003).
