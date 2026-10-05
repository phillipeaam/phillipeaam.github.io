# Tasks: Shared Project Records

**Input**: Design documents in `specs/007-project-record-model/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated test tasks are included because none were requested. Final validation uses the repository diagnostics/build and manual checks in `quickstart.md`.

## Phase 1: Baseline and Model Foundation

**Purpose**: Capture the current project inventory and establish the shared contract before migrating consumers.

- [X] T001 Audit current featured, supporting, archive-only, deferred, case-study, and experience-linked project coverage against the unique canonical IDs, destinations, and placements in `src/data/projects.ts` and `src/data/experience.ts`.
- [X] T002 Define the canonical project identity, optional content, media, action, visibility, and independent Home/archive placement fields in `src/data/projects.ts`.
- [X] T003 Define stable project identity references for case-study routes and experience selected work in `src/data/projects.ts` and `src/data/experience.ts`.

## Phase 2: User Story 1 - Maintain Project Information Once (Priority: P1) 🎯 MVP

**Goal**: Every shared project fact has one authoritative record consumed by Home, archive, experience, and case-study surfaces.

**Independent Test**: Change one shared record value and confirm every surface showing it updates; verify that its nested case-study sections stay attached to that project.

### Implementation for User Story 1

- [X] T004 [US1] Migrate all currently public project facts and media into one record per stable ID in `src/data/projects.ts`, preserving visible content and order.
- [X] T005 [US1] Move each project's slug, case context, narrative, story media, evidence, and reflection into its nested `caseStudy` area in `src/data/projects.ts`; remove the parallel case catalog.
- [X] T006 [P] [US1] Render Home featured and supporting projects from canonical records in `src/pages/index.astro`, `src/components/FeaturedProject.astro`, and `src/components/SupportingProject.astro`.
- [X] T007 [P] [US1] Render archive sections and anchors from canonical records in `src/pages/projects/index.astro`, `src/components/ProjectRecord.astro`, and `src/components/RichProjectRecord.astro`.
- [X] T008 [P] [US1] Resolve case-study shared facts and experience selected-work names/destinations by stable project ID in `src/pages/work/[slug].astro`, `src/components/CaseHero.astro`, `src/components/ExperienceEntry.astro`, and `src/data/experience.ts`.

## Phase 3: User Story 2 - Control Project Publication and Actions (Priority: P1)

**Goal**: A project record determines global inclusion and declares only the destinations that are available.

**Independent Test**: Exclude a record and confirm project blocks, links, actions, and case routes disappear; leave its experience name as plain text. Then confirm actions appear only for declared destinations.

### Implementation for User Story 2

- [X] T009 [US2] Add an explicit inclusion choice to every canonical record, preserving current public/deferred status in `src/data/projects.ts`.
- [X] T010 [US2] Apply strict inclusion filtering before Home and archive selection in `src/data/projects.ts`, `src/pages/index.astro`, and `src/pages/projects/index.astro`.
- [X] T011 [US2] Generate case routes directly from included project records with a populated `caseStudy` area and declared slug in `src/pages/work/[slug].astro` and `src/data/projects.ts`.
- [X] T012 [US2] Suppress project-specific blocks and links for missing/excluded records while retaining only plain-text experience names in `src/components/ExperienceEntry.astro` and `src/data/experience.ts`.
- [X] T013 [US2] Show case-study and external actions only when each declared destination resolves in `src/components/FeaturedProject.astro`, `src/components/ProjectRecord.astro`, `src/components/RichProjectRecord.astro`, and `src/data/projects.ts`.
- [X] T025 [US2] Gate case-study CTAs, experience destinations, next-case navigation, and generated routes on an included record with a `caseStudy.slug` and at least two stories, each with a non-empty title and framing, in `src/data/projects.ts`, `src/pages/work/[slug].astro`, `src/components/FeaturedProject.astro`, `src/components/ProjectRecord.astro`, `src/components/RichProjectRecord.astro`, `src/components/ExperienceEntry.astro`, and `src/components/NextProject.astro`.

## Phase 4: User Story 3 - Present Correct Media Without Surprise Downloads (Priority: P1)

**Goal**: Verified static project images appear by default; animations retain their existing per-record near-viewport or hover/focus behavior.

**Independent Test**: Load, scroll, hover, and focus representative pages and confirm previews follow their per-record behavior, reduced motion suppresses GIF requests, and static fallbacks remain accurate.

### Implementation for User Story 3

- [X] T014 [US3] Reconcile project media and nested case-story media references to assets present in the current repository in `src/data/projects.ts`.
- [X] T015 [US3] Render the static fallback and shared animated preview behavior, including per-record near-viewport loading, hover/focus activation, and reduced-motion suppression in `src/components/ProjectMediaPreview.astro`.
- [X] T016 [US3] Use the shared preview behavior from Home, archive, and case-study components in `src/components/FeaturedProject.astro`, `src/components/SupportingProject.astro`, `src/components/ProjectRecord.astro`, `src/components/RichProjectRecord.astro`, and `src/components/CaseHero.astro`.
- [X] T017 [US3] Preserve reduced-motion handling, loading/failure fallback, keyboard focus behavior, and independent project navigation in `src/components/ProjectMediaPreview.astro` and `src/styles/global.css`.
- [X] T018 [US3] Restore the existing Home preview guidance for hover and project navigation in `src/pages/index.astro`.

## Phase 5: User Story 4 - Understand and Extend the Ficha (Priority: P2)

**Goal**: Project authors can understand the shared record, fields, defaults, relationships, and supported display choices.

**Independent Test**: Use the guide to add an optional field or project action and identify its consumers without copying shared facts into pages.

### Implementation for User Story 4

- [X] T019 [US4] Document the model map, field meanings/defaults, visibility rules, media choices, actions, case relationship, and authoring workflow in `docs/project-records.md`.
- [X] T020 [US4] Align the model guide and its examples with the data contract and current consumers in `specs/007-project-record-model/data-model.md` and `docs/project-records.md`.
- [X] T026 [US4] Make non-core case-study editorial fields optional and guard omitted sections in `src/data/projects.ts`, `src/pages/work/[slug].astro`, `src/components/CaseHero.astro`, `src/components/EngineeringStory.astro`, `src/components/NarrativeEngineeringStory.astro`, `src/components/NarrativeFlowDiagram.astro`, `src/components/EvidenceCaption.astro`, `src/components/SystemDiagram.astro`, and `src/components/NextProject.astro`; document the two-story publication minimum and optional sections in `specs/007-project-record-model/data-model.md`, `specs/007-project-record-model/contracts/project-visibility.md`, `specs/007-project-record-model/quickstart.md`, and `docs/project-records.md`.

## Phase 6: Polish and Cross-Cutting Review

**Purpose**: Confirm preserved content, routes, media integrity, and accessibility behavior.

- [X] T021 Scan all local project image/preview/identity/case media references against files in `public/` and document the repeatable validation command in `specs/007-project-record-model/quickstart.md`.
- [X] T022 Run `npm ci`, `npm run check`, `npm run check:project-assets`, `npm run build`, and `git diff --check` against dependencies in `package-lock.json`.
- [X] T023 Review the projects archive at 390×844, 768×1024, and 1440×900; confirm no horizontal overflow, correct static images, per-record animation behavior, preserved routes, and no broken image references; record responsive results in `specs/007-project-record-model/quickstart.md`.
- [X] T024 Verify reduced-motion and failed-animation scenarios in a browser and record that the static fallback remains visible in `specs/007-project-record-model/quickstart.md`.
- [X] T027 [US1] Temporarily change a shared project name and summary in its canonical record, verify the values propagate to Home, archive, and case-study output without page-level edits, restore the record, and record the result in `specs/007-project-record-model/quickstart.md`.

## Dependencies and Execution Order

- Phase 1 blocks consumer migration until inventory and record identities are established.
- US1 depends on the shared contract and establishes the public data flow.
- US2 depends on canonical records so one strict inclusion choice can govern every surface.
- T025 depends on the record inclusion and case-route/CTA work in T009-T013; it applies the clarified two-story publication minimum to every destination.
- US3 can proceed alongside US1 after the media field contract is established; its asset correction and preview behavior must be used by all consumers before completion.
- US4 can be authored after the model contract is stable and completed before final review; T026 follows T025 because both change the case-study model and route consumers.
- T025 and T026 were clarification follow-ups; their publication gate, omission-safe rendering, and model documentation are complete.
- T027 is a final cross-surface verification of the shared-record guarantee; it depends on T006-T008.
- Polish depends on all four stories and the project-record guide.

## Parallel Opportunities

- After T002-T005 establish IDs and fields, T006, T007, and T008 touch mostly separate presentation consumers and can proceed independently.
- T014 and T015 touch data assets and media interaction respectively and can proceed independently after ProjectMedia is defined.
- T019 can proceed once T002 and the field inventory are stable.

## Implementation Strategy

1. Establish inventory and canonical record fields, including the optional nested case-study areas.
2. Migrate shared facts and consumers (US1) as the MVP.
3. Add publication/action rules (US2) and correct media delivery (US3).
4. Document the ficha (US4), then complete build, route, asset, responsive, and accessibility review.

## Notes

- `[P]` marks tasks that can proceed in parallel after their prerequisites.
- `[US1]` through `[US4]` map directly to the user stories in `specs/007-project-record-model/spec.md`.
- Tasks marked `[X]` reflect work present in the current branch and recorded validation, including browser checks for reduced motion and failed animation.
