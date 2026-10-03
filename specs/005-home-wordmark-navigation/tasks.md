# Tasks: Home Navigation from Header Identity

**Input**: Design documents from `specs/005-home-wordmark-navigation/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: No automated test task is included because the feature specification does not request test authoring. Required project checks and manual verification are included as completion tasks.

**Organization**: Tasks are grouped by user story for traceability. This small shared-header change has no project setup or foundational infrastructure work.

## Phase 1: User Story 1 - Return Home from the header identity (Priority: P1)

**Goal**: Make the avatar and adjacent name independently operable links to the Home root, including with a keyboard and assistive technology.

**Independent Test**: From a nested page and from a lower Home section, activate the avatar and the name separately; confirm each reaches the Home root. Tab to both controls and verify meaningful link names and visible focus.

- [X] T001 [US1] Make the avatar and adjacent name independent semantic links to the configured Home root in `src/components/Navigation.astro`; retain keyboard activation, meaningful accessible names, visible focus, and availability in desktop and mobile layouts.

**Checkpoint**: Both identity controls navigate to Home and are keyboard accessible.

---

## Phase 2: User Story 2 - Arrive without a scroll animation (Priority: P1)

**Goal**: Ensure either identity link opens the Home beginning immediately and does not restore a previously saved Home position, while preserving existing menu and contextual return-link behavior.

**Independent Test**: With smooth scrolling enabled and a previous Home scroll position recorded, activate each identity link from a nested page and from a lower Home section; confirm the viewport reaches the Home beginning immediately. Also verify the existing Home menu and contextual return links retain their behavior.

- [X] T002 [US2] Scope Home-position restoration and instant top arrival to identity-link activation in `src/components/Navigation.astro`; clear or bypass any stale restore state for this navigation without changing the existing Home menu item or contextual return links.
- [X] T003 [US2] Confirm component-level instant scrolling is reliable; no scoped CSS rule was needed in `src/styles/global.css`.

**Checkpoint**: Avatar and name always arrive at the Home beginning without smooth scrolling or stale position restoration.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Complete repository validation and responsive/accessibility review required by the project constitution.

- [X] T004 Run `npm run check`, `npm run build`, and `git diff --check`, then complete the desktop, tablet, mobile, keyboard, and manual navigation scenarios in `specs/005-home-wordmark-navigation/quickstart.md`; fix any issues in `src/components/Navigation.astro` or `src/styles/global.css` and record only viewports actually evaluated.
- [X] T005 Obtain and record human review of the header interaction and accessibility behavior in the change review before treating this feature as approved for merge or push, as required by Principle IX in `.specify/memory/constitution.md`; user confirmed successful manual validation on 2026-10-03.

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (Phase 1)**: No infrastructure dependencies; implement first because User Story 2 refines its link activation behavior.
- **User Story 2 (Phase 2)**: Depends on the identity links from T001 being present.
- **Polish (Phase 3)**: Depends on T001 and T002; T003 is conditional and is needed only if component-level handling cannot meet the instant-navigation requirement.

### User Story Dependencies

- **User Story 1 (P1)**: Independent Home-link and accessibility behavior.
- **User Story 2 (P1)**: Depends on User Story 1's identity links to apply the immediate-arrival behavior to those controls.

### Parallel Opportunities

- No implementation tasks are marked parallelizable because the behavior is confined to the same shared header component and has a dependency between the two stories.
- T003 is conditional; it must not be started unless T002 establishes that the component needs a scoped CSS rule.

## Implementation Strategy

### MVP First

1. Complete T001 to provide the shared header identity links.
2. Complete T002 to guarantee immediate return to the Home beginning.
3. Complete T004 validation before treating the feature as ready for human review.

### Incremental Delivery

Deliver both P1 stories together: the identity links without the immediate-position guarantee do not fully satisfy the requested return behavior. Keep the optional CSS adjustment in T003 conditional and scoped. Complete T005 human review after implementation and validation and before merge or push.

## Phase 4: Convergence

- [X] T006 Record the human review outcome for the header interaction and accessibility in `src/components/Navigation.astro`; user confirmed successful manual validation on 2026-10-03, per Constitution IX.
