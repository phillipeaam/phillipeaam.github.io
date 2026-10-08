# Tasks: Section Heading and Navigation Standard

**Input**: `specs/008-section-heading-standard/` design documents.
**Prerequisites**: spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md.
**Tests**: Browser acceptance checks explicitly required by FR-015 and constitution; no new automated test framework.
**Organization**: User-story increments; checkbox state records implementation and validation status.

## Phase 1: Setup

- [x] T001 Inventory six heading consumers, seven destinations, legacy aliases, internal links and #work selectors; record approved copy and baseline in specs/008-section-heading-standard/validation.md (FR-001, FR-013).
- [x] T002 Record existing return/history/identity constraints from specs/002-hash-navigation/spec.md, specs/004-animated-project-header-scroll/spec.md and specs/005-home-wordmark-navigation/spec.md in specs/008-section-heading-standard/validation.md (FR-012).

## Phase 2: Foundational

- [x] T003 Define seven destinations/labels/six legacy aliases in src/data/homeSections.ts using data-model.md: "Canonical IDs MUST be unique." "Legacy IDs MUST be unique and MUST NOT collide with canonical IDs." "Each legacy ID MUST resolve to exactly one canonical destination." "Aliases MUST NOT create separate observer sections." (FR-008).
- [x] T004 [P] Add src/components/SectionHeading.astro with documented props and preserve data-model.md constraints: "Support MUST be one continuous, full-width paragraph below the title, left-aligned at every viewport width." "Title IDs MUST remain unique and preserve existing accessible relationships." "Home titles MUST use h2; All Projects MUST use h1." "Placement classes MUST NOT override support-column alignment." (FR-002, FR-007).

## Phase 3: US1 — Consistent headings (P1)

**Goal**: Six headings obey one visual contract.
**Independent validation**: Six headings use the same order, 4px gaps, and full-width left-aligned support; wrapping has no overflow.

- [x] T005 [US1] Implement the shared stacked title and full-width, left-aligned support layout with shared 4px gaps between eyebrow/title and title/support, natural wrapping, and shared padding in src/styles/global.css (FR-003–006).
- [x] T006 [US1] Migrate five Home headings in src/pages/index.astro and src/components/TestimonialsSection.astro to SectionHeading; preserve meaning/claims and title IDs, provide one continuous support string, and retain surrounding content layout (FR-001–002, FR-007, FR-013, FR-016).
- [x] T007 [US1] Migrate catalog h1 introduction in src/pages/projects/index.astro to SectionHeading with preserved meaning/title ID and one continuous support string (FR-001, FR-007, FR-016).
- [x] T008 [US1] Revalidate Home and catalog heading geometry for the stacked title and full-width support paragraph with shared 4px gaps between eyebrow/title and title/support. Record coordinates, wrapping, and remaining gaps in specs/008-section-heading-standard/validation.md at representative desktop, tablet, and mobile viewports. (FR-015–016, SC-001, SC-007.) Manual zoom remains out of scope by user decision.

## Phase 4: US2 — Canonical navigation (P1)

**Goal**: Visible names and generated section fragments agree.
**Independent validation**: All seven destinations work through available menus, cross-page links, direct opening/reload and history.

- [x] T009 [US2] Consume canonical mapping in src/components/Navigation.astro for desktop/mobile IDs, hrefs, Home #home and active identities; preserve local contextual Contact, fragment-free Back and immediate identity links (FR-008–010, FR-012).
- [x] T010 [US2] Apply canonical anchors and matching data-nav-section in src/pages/index.astro and src/components/TestimonialsSection.astro; update affected #work CSS selectors in src/styles/global.css; preserve unrelated /work/ routes and record IDs (FR-008, FR-013).
- [x] T011 [US2] Audit and update affected cross-page Home section links in src/pages/experience.astro, src/pages/work/[slug].astro and other source consumers discovered by T001; record changed/no-change files in specs/008-section-heading-standard/validation.md (FR-008–009, FR-013).
- [x] T012 [US2] Give explicit recognized Home fragments precedence over saved return intent in both early-loading and restoration guards of src/layouts/BaseLayout.astro; clear stale intent, preserve no-hash Back/identity behavior and avoid extra history entries (FR-011–012).
- [X] T013 [US2] Validate seven canonical destinations, desktop/mobile menus, available cross-page links, direct/reload arrivals, keyboard/focus, Escape, reduced motion, active states, malformed/unknown hashes, history and repeated restoration/identity journeys; record actual evidence in specs/008-section-heading-standard/validation.md (FR-010–012, FR-015, SC-003–005). Browser validation at 1440×900/390×844 CSS px recorded 2026-10-07.

## Phase 5: US3 — Legacy compatibility (P2)

**Goal**: Existing shared fragments remain native destinations.
**Independent validation**: Five legacy hashes work on direct open/reload, with and without optional scripting.

- [x] T014 [US3] Render all five aria-hidden alias anchors at canonical origins through src/components/SectionHeading.astro, src/pages/index.astro and src/components/TestimonialsSection.astro; apply shared sticky offset to aliases in src/styles/global.css without duplicate IDs/headings/observer sections (FR-009, FR-011).
- [x] T015 [US3] Confirm src/components/Navigation.astro and src/layouts/BaseLayout.astro resolve legacy arrivals to canonical active identity/explicit-hash precedence while retaining legacy URLs; adjust only if needed (FR-009–012).
- [X] T016 [US3] Execute six legacy open/reload checks, canonical menu follow-up, stale restore intent and canonical/legacy native arrivals without optional scripting; record sticky clearance and results in specs/008-section-heading-standard/validation.md (FR-011, FR-015, SC-003–005). All six aliases and seven canonicals were opened/reloaded with JS enabled and arrived without JS at 1440×900 CSS px; stale restore and canonical menu follow-up also passed on 2026-10-07.

## Phase 6: US4 — Permanent standard (P2)

**Goal**: Future changes have a documented contract.
**Independent validation**: Reference covers all six consumers, seven destinations, six aliases, and future-change procedure.

- [x] T017 [US4] Write docs/section-heading-standard.md covering semantic/editorial roles, shared layout, spacing/placement distinction, responsive rules, copy baseline, naming table, compatibility, acceptance criteria and rationale/revalidation/human-review procedure (FR-014, SC-006).
- [x] T018 [US4] Link permanent reference from src/components/SectionHeading.astro and src/data/homeSections.ts; update affected current guidance in docs/ while preserving historical spec/evidence records; record documentation audit in specs/008-section-heading-standard/validation.md (FR-008, FR-014).
- [x] T019 [US4] Cross-check permanent docs against all six actual consumers and canonical/legacy mappings, including a proposed short/long-text section, and record requirements coverage in specs/008-section-heading-standard/validation.md (FR-014–015, SC-006).

## Phase 7: Polish and delivery

- [x] T020 Run git diff --check, npm run check and npm run build; record outputs/errors in specs/008-section-heading-standard/validation.md (constitution VIII).
- [x] T021 Review scope/meaning and claim preservation, no unapproved alignment exceptions, native links, accessible names/semantics, touch targets and reduced motion across changed consumers; record failures or untested cases explicitly in specs/008-section-heading-standard/validation.md (FR-007, FR-013, FR-015–016).
- [x] T022 Present implemented visual/navigation result for human review and record pending/approved status in specs/008-section-heading-standard/validation.md; do not declare approval or merge/push before actual review (constitution IX).

## Dependencies and execution order

T001 → T002 → foundational T003/T004. US1 T005–T008 is the visual MVP. US2 T009–T013 follows integration; T009/T010 precede link audit and restoration validation. US3 T014–T016 follows canonical migration (T012 must recognize legacy IDs from the outset). US4 T017 can be drafted after foundation, but T018/T019 finalize against implementation. T020–T022 follow all stories.

US1 can be demonstrated independently before navigation renaming. US3 deliberately depends on US2's canonical naming; this is compatibility work, not an independent rename. Shared-file tasks execute sequentially.

## Parallel opportunities by story

- Foundation: T003 and T004 touch separate files and can proceed together after setup.
- US1: After T005, catalog migration T007 can proceed separately from Home migration T006; validate only after both.
- US2: Inventory already complete; Navigation and page migrations may be prepared separately, but integrate before T012/T013. No additional [P] markers because active-state integration shares dependencies.
- US3: Alias markup/styles and restoration touches overlap earlier files; execute sequentially.
- US4: T017 documentation draft can proceed beside implementation; final cross-check must wait for code.

## Implementation strategy

Deliver visual MVP first, then canonical naming and legacy compatibility together before release. Finalize permanent reference, run all prescribed checks, and obtain human review. No deployment or push is part of this task list.

## Phase 8: Convergence

Assessment: 2026-10-06. Reviewed 15 functional requirements, 6 success criteria, 14 acceptance scenarios, plan decisions and all9 constitutional principles against current source and validation evidence. No unrequested code or missing implementation identified; runtime acceptance coverage remains partial. Two HIGH partial findings; no code contradiction established. Human merge/push approval remains pending and is not inferred from code validation.

- [X] T023 Complete reduced-motion and JavaScript-disabled canonical/legacy navigation checks using a browser supporting those controls; record results in specs/008-section-heading-standard/validation.md and resolve any failures per FR-005, FR-011, FR-015, SC-002–003 and Constitution IV/VI/VIII. Manual browser-zoom/enlarged-text checks are out of scope by user decision. Earlier responsive checks are historical; T008 remains open to revalidate the current visual layout.
- [X] T024 Complete stable desktop/mobile menu active-state checks, all available cross-page journeys, unknown/malformed fragments, browser Back/Forward, both identity controls from another page, stale restoration intent and exact saved-position equivalence across five repeated returns; record departure coordinates after locator scroll-to-click and actual results in specs/008-section-heading-standard/validation.md, fixing failures per FR-010–012, FR-015, SC-004–005 and Constitution VIII (partial; F2 HIGH; completes remaining T013/T016 coverage). Evidence recorded: Back/Forward, unknown/malformed fragments, desktop/mobile menu/active state and keyboard, seven cross-page links, contextual Contact/Back, avatar/wordmark identity, stale intent and five exact return cycles.

DevTools reconciliation — 2026-10-07: validation.md records isolated Chrome CDP results for initial/dynamic reduced motion and native arrivals without JavaScript, plus keyboard/menu, direct/reload, history, stale-intent and cross-page checks. T008, T013, T016, T023 and T024 are complete for the agreed scope.

## Reconciliation after browser validation — 2026-10-07

Navigation and prior layout results are recorded in validation.md. T008 remains open because the current stacked heading design has not been visually revalidated. Manual zoom testing is out of scope by user decision; no result is claimed for this design revision.

## Current reconciliation — 2026-10-08

T008 is complete for the current stacked heading layout. Chrome DevTools measurements and screenshot inspection are recorded in validation.md for all five Home headings and All Projects at 1440, 1024, 768, and 390 CSS px. No horizontal overflow was observed at these viewports. No manual zoom or physical-device result is claimed.
