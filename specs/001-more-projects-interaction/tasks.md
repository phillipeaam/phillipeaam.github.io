# Tasks: More Projects Thumbnail Interaction

**Input**: Design documents from `/specs/001-more-projects-interaction/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/more-projects-ui.md`, and `quickstart.md`

**Tests**: No dedicated automated tests were requested. Validation uses the repository's existing Astro check and production build scripts plus the independent interaction checks below.

**Organization**: Tasks are grouped by the specification's three user stories. Tasks describe changes in the existing Astro architecture and use canonical project data and destinations.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing Astro setup already supports the feature.

- [ ] T001 Inspect the `check` and `build` scripts and dependencies in `package.json`. If either required validation script is missing or the existing dependencies cannot run it, make only the smallest feature-scoped package configuration adjustment needed, then confirm both scripts are available; do not add unrelated dependencies or setup files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preserve one canonical source for Home inclusion, order, project destination, and media before the story work.

- [ ] T002 [P] Preserve Home curation fields while deriving `homeSupportingProjects` from enriched project inventory in `src/data/projects.ts`.
- [ ] T003 [P] Inspect the shared project and media component props in `src/components/SupportingProject.astro` and `src/components/ProjectMediaPreview.astro`. If they do not support an optional existing preview source with a stable poster fallback and no project-ID branch, update the smallest relevant shared component contract, then confirm projects without a preview source retain the poster and link behavior.

**Checkpoint**: Each Home thumbnail can use the existing project record, route, and available media metadata.

---

## Phase 3: User Story 1 - Open a project from its thumbnail (Priority: P1) - MVP

**Goal**: Make each poster the single primary project link, with its existing destination and an explicit project-specific accessible name.

**Independent Test**: Activate every More Projects thumbnail by pointer and keyboard; verify each resolves to its existing details destination, each link has an explicit accessible name, visible focus is present, and no project title or separate Details link appears below the media.

### Implementation for User Story 1

- [ ] T004 [US1] Render each simple supporting project as one semantic media link with the existing destination and explicit project-derived accessible name in `src/components/SupportingProject.astro`.
- [ ] T005 [US1] Use available canonical poster metadata as the thumbnail and retain a static poster fallback when preview media is absent in `src/components/SupportingProject.astro` and `src/components/ProjectMediaPreview.astro`.
- [ ] T006 [US1] Keep project headings available to assistive technology while removing visible title and standalone Details text beneath simple-mode media in `src/components/SupportingProject.astro`.
- [ ] T007 [US1] Preserve native anchor activation and a visible keyboard focus treatment for the thumbnail link in `src/components/SupportingProject.astro` and `src/styles/global.css`.

**Checkpoint**: Story 1 is independently usable through ordinary browser link behavior.

---

## Phase 4: User Story 2 - Preview animated project media (Priority: P2)

**Goal**: Preview existing animated media on compatible fine-pointer hover and keyboard focus where a source is available; otherwise keep the poster stable. Restore the poster on exit or blur and suppress animation for reduced motion.

**Independent Test**: On a fine-pointer context, hover thumbnails with existing preview sources and verify the matching animation appears and the poster returns on exit. For thumbnails without a source, verify the poster remains visible without an error, empty state, fake animation, or visual change. Repeat with keyboard focus/blur. With reduced motion enabled, confirm animation is suppressed, posters remain visible, and links still activate.

### Implementation for User Story 2

- [ ] T008 [US2] Extend the shared media preview interaction to track fine-pointer hover and thumbnail-link focus, showing preview only when a source exists and motion is allowed in `src/components/ProjectMediaPreview.astro`.
- [ ] T009 [US2] Restore the poster when both pointer hover and keyboard focus have ended, and when reduced-motion preference becomes active, in `src/components/ProjectMediaPreview.astro`.
- [ ] T010 [US2] Keep preview enhancement optional so the poster and project anchor remain functional when client-side scripting is unavailable in `src/components/ProjectMediaPreview.astro` and `src/components/SupportingProject.astro`.

**Checkpoint**: Available previews work through pointer and keyboard without changing link name or destination; missing previews and reduced motion retain the poster.

---

## Phase 5: User Story 3 - Understand interaction and browse all projects (Priority: P2)

**Goal**: Show capability-appropriate instructions and the existing all-projects link in the utility row immediately above the thumbnails.

**Independent Test**: Verify the row is above the grid, the fine-pointer instruction communicates hover preview and click opening, no-hover instruction communicates tap opening without mentioning hover, and See all projects retains its existing destination and native activation.

### Implementation for User Story 3

- [ ] T011 [US3] Keep the compact utility row immediately before the thumbnail grid, with instruction on the left and the existing See all projects destination on the right, in `src/pages/index.astro`.
- [ ] T012 [US3] Select desktop copy that says `Hover to preview where available · Click a project to view details` versus tap-only copy with existing CSS hover and pointer media queries; keep no-hover copy free of hover references and add no JavaScript or project-specific variant in `src/pages/index.astro` and `src/styles/global.css`.
- [ ] T013 [US3] Preserve the unboxed utility-row treatment and responsive readable layout without cards, pills, or decorative containers in `src/styles/global.css`.

**Checkpoint**: Visitors can understand the input-appropriate interaction and reach the complete project list before browsing thumbnails.

---

## Phase 6: Polish & Cross-Cutting Validation

**Purpose**: Validate the complete scoped change and record only checks actually performed.

- [ ] T014 [P] Run Astro diagnostics with `npm run check` and resolve feature-related errors in affected Astro files.
- [ ] T015 [P] Run the production build with `npm run build` and resolve feature-related build failures.
- [ ] T016 Review More Projects at representative desktop, tablet, and mobile widths; check pointer, keyboard, reduced-motion, no-hover, accessible names, focus, and destinations using `specs/001-more-projects-interaction/quickstart.md` and record only modes/viewports actually tested.
- [ ] T017 Confirm the final patch passes `git diff --check` and remains scoped to More Projects and its required shared media behavior.
- [ ] T018 Present the completed visual and interaction change for human review, including the final diff, Astro check/build results, and the relevant desktop and mobile runtime results. Keep this as an external approval gate: the agent MUST NOT check off T018 or treat the feature as approved; only the human reviewer may close this task with explicit approval. Do not merge or push before approval. If review requests changes, return to the appropriate implementation or validation task, repeat affected validation, and present the updated result through this review gate again.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No code prerequisites; confirm the current Astro scripts and dependencies.
- **Foundational (Phase 2)**: Depends on setup; confirms canonical inventory fields and shared component contract before story work.
- **User Stories (Phases 3-5)**: Depend on foundational work. Story 1 is P1 MVP. Story 2 extends the shared preview behavior used by Story 1. Story 3 can be implemented independently after foundational work, but all stories should be integrated before final validation.
- **Polish and review (Phase 6)**: T014-T017 follow implementation. T018 is the final, non-parallel external human review gate after implementation and technical/runtime validation; it cannot be self-completed by the agent. If changes are requested, revisit the affected implementation/validation task and repeat T018 after revalidation.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 2; no dependency on another story.
- **User Story 2 (P2)**: Depends on Phase 2 and uses the thumbnail link established in US1 for focus-triggered preview.
- **User Story 3 (P2)**: Depends on Phase 2; otherwise independent of US1 and US2.

### Parallel Opportunities

- T002 and T003 touch separate canonical data and shared component files and can be reviewed in parallel.
- After Phase 2, US3 utility-row work can proceed independently from US1 thumbnail-link work. US2 depends on the link/focus target contract from US1.
- T014 and T015 are separate validation commands and may be run independently after implementation. T016 and T017 follow once the integrated patch is ready. T018 is deliberately non-parallel and must remain the final external approval gate.

### Parallel Example: independent story work after Phase 2

```text
US1: T004-T007 in SupportingProject.astro and required link styles
US3: T011-T013 in index.astro and global.css
US2: T008-T010 after the US1 thumbnail focus target is established
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete setup and foundational confirmation.
2. Implement the primary thumbnail link, accessible name, poster fallback, and removal of visible below-media copy.
3. Independently verify pointer and keyboard activation, destination, accessible name, and visible focus.

### Incremental Delivery

1. Add the shared hover/focus preview and reduced-motion behavior (US2); verify available preview media and poster fallback.
2. Add or preserve capability-specific utility guidance and See all projects placement (US3); verify both input modes and destination.
3. Run Astro check, production build, responsive and accessibility review, and diff validation.

### Scope Constraints

Use existing project data and destinations. Do not create project-ID branches, new project claims, new media assets, decorative containers, or unrelated redesigns. Where animated media is unavailable, preserve the poster and link behavior.
