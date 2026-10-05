# Feature Specification: Shared Project Records

**Feature Branch**: `feature/007-project-record-model`  
**Created**: 2026-10-05  
**Status**: Draft  
**Input**: User request to rebuild the project-record feature workflow against the current `develop` baseline, explain the ficha model, and repair regressions introduced when the feature work was carried forward.

## Clarifications

### Session 2026-10-05

- Q: Qual deve ser o conteúdo mínimo para uma área `caseStudy` ser considerada válida e gerar página/CTA? → A: Exigir slug e pelo menos duas histórias narrativas; as outras áreas editoriais podem ser omitidas quando não houver conteúdo.
- The static image is selected per project from the current, verified assets. The clarification question received no answer during the wait, so this uses the recommended working assumption rather than a user-confirmed choice.
- The portfolio owner clarified that the Play control was not requested. Preserve the existing `develop` behavior: records marked `autoplayPreview` load their animation near the viewport; other previews respond to hover or keyboard focus; reduced motion suppresses animation requests.

## User Scenarios & Testing

### User Story 1 - Maintain project information once (Priority: P1)

As the portfolio owner, I want one reusable project record for each project so that shared project facts stay consistent wherever the portfolio presents that project.

**Why this priority**: A single maintained record is the core value of this feature and enables every other portfolio surface to stay aligned.

**Independent Test**: Change a shared project field in its record and verify that each surface showing that field reflects the same value without maintaining another copy.

**Acceptance Scenarios**:

1. **Given** a project appears on Home, in the archive, and on a case study, **When** its name, summary, or shared media is changed in its record, **Then** each applicable surface reflects that record value.
2. **Given** an existing project has optional information missing, **When** it is represented by a project record, **Then** the record remains valid and the relevant surface omits the unavailable detail cleanly.
3. **Given** two legacy sources disagree about a shared fact, **When** the initial records are created, **Then** the selected value follows the most complete existing evidence and unsupported details are omitted or qualified.

---

### User Story 2 - Control whether a project is presented (Priority: P1)

As the portfolio owner, I want to include or temporarily exclude a project through its record and declare the destinations it supports, so that incomplete or maintained projects do not appear publicly and unavailable actions are not offered.

**Why this priority**: Visibility and destination choices determine whether any public project presentation or navigation is valid.

**Independent Test**: Exclude one record and verify its project-specific presentation and routes disappear while an existing experience reference can remain as plain text; then include it and verify only declared destinations appear.

**Acceptance Scenarios**:

1. **Given** a project record is explicitly excluded or has no record, **When** any portfolio surface or direct case-study route is rendered, **Then** no project-specific block, link, action, or case-study page is presented; an existing experience name may remain only as unlinked text.
2. **Given** a project is included but its `caseStudy` area has no slug or fewer than two stories with non-empty titles and framings, **When** portfolio actions and routes are generated, **Then** no case-study CTA or page is available while other valid project actions remain available.
3. **Given** a project is included with a valid case-study relationship, **When** its Home or archive content is rendered, **Then** the case-study CTA points to that declared destination.
4. **Given** a project is included for the archive, Home, or both, **When** its record specifies placement and ordering, **Then** each surface follows those choices without changing existing public anchors or URLs.

---

### User Story 3 - Present correct project media without unnecessary downloads (Priority: P1)

As a portfolio visitor, I want each project surface to show the intended static image while preserving the existing preview behavior, so that project media remains recognizable and usable as I browse.

**Why this priority**: Current manual review found stale image paths and project GIFs as large as 15.5 MB that can load automatically.

**Independent Test**: Open Home, archive, and case-study pages with a clean cache; confirm static images load from existing assets, no broken image requests occur, and animated files follow the agreed activation behavior.

**Acceptance Scenarios**:

1. **Given** a project has a static image and an animation configured for near-viewport loading, **When** the media enters the existing viewport margin, **Then** the animation loads and replaces the static image after it is ready.
2. **Given** a project has an animation without near-viewport loading, **When** the visitor hovers the preview or focuses its project link, **Then** the animation loads and is shown with its meaningful description while that interaction remains active.
3. **Given** an animation fails or reduced motion is enabled, **When** its media area is presented, **Then** the accurate static fallback remains visible and usable.
4. **Given** a project image path references a file unavailable in the current repository, **When** the page is rendered, **Then** validation identifies the broken reference before it can ship.
5. **Given** a project has no media, **When** it is presented, **Then** no broken image, empty media frame, or misleading animation control is shown.

---

### User Story 4 - Understand and extend the project ficha (Priority: P2)

As the portfolio owner, I want a concise authoring guide that explains the shared project record, its optional fields, defaults, relationships, and display choices so that I can add and update projects consistently.

**Why this priority**: The model must remain usable after the initial migration and when optional attributes are added later.

**Independent Test**: Follow the guide to identify the required identity and inclusion fields, add an optional value, and determine which public surfaces and actions consume it.

**Acceptance Scenarios**:

1. **Given** a new optional field is added to the shared model, **When** an existing project omits it, **Then** that record remains valid and renders a documented default or omits the field without empty UI.
2. **Given** an author reads the guide, **When** they add a project with optional media or actions omitted, **Then** they can identify the correct record fields, visibility behavior, placement, and destination rules.
3. **Given** a project display name changes, **When** the record is updated, **Then** stable identity, case-study slug, and archive anchor continue to preserve existing references.
4. **Given** an included project's case-study area has a slug and at least two stories but omits other editorial sections, **When** its page is generated, **Then** only available sections render without empty headings, labels, or controls.

### Edge Cases

- A project is excluded while still referenced by an experience entry: keep only the experience name as plain text; suppress the link and any project-specific block.
- A project record is missing, or its public-inclusion value is missing: treat it as excluded from public project presentation.
- The optional `caseStudy` area is absent, has no slug, contains fewer than two stories, or any story lacks a non-empty title or framing: omit the case-study CTA and do not generate a route.
- A case study exists but the project is excluded: do not expose the case page through direct navigation or generated routes.
- Optional media, contribution, specifications, or actions are absent: omit their presentation and avoid empty labels or controls.
- A shared image or animation path is missing: retain a valid fallback where available and flag the invalid reference during validation.
- Reduced motion is enabled or an animated asset fails to load: keep the static fallback visible.
- A project appears on more than one surface with different media framing: use declared presentation settings while preserving one canonical media source.

## Requirements

### Functional Requirements

- **FR-001**: The portfolio MUST represent every current project, including unpublished and deferred projects, with at most one canonical project record and one stable unique identity.
- **FR-002**: A project record MUST support shared identity, summary, category/context, optional contribution and engineering focus, specifications or tags, media, external actions, and display placement as applicable.
- **FR-003**: Home, the projects archive, experience selected-work references, and case-study pages MUST consume shared project facts from the canonical project record instead of maintaining duplicate copies of those facts.
- **FR-004**: Optional attributes MUST be omittable or have a documented default; their absence MUST NOT invalidate an existing record or create empty labels, media frames, links, or controls.
- **FR-005**: Public portfolio inclusion MUST be an explicit per-record choice; missing or false inclusion MUST be treated as excluded.
- **FR-006**: A missing or excluded project record MUST suppress its project-specific presentation, links, actions, and case-study route on all portfolio surfaces. Existing experience-section name references MAY remain only as plain text without links or project-specific blocks.
- **FR-007**: Home placement, archive category, and ordering MUST remain independently configurable so inclusion does not imply placement on every surface.
- **FR-008**: A case-study CTA and route MUST be presented only when an included project record contains a `caseStudy` area with a destination slug and at least two stories, each with a non-empty title and framing; all other case-study editorial areas MAY be omitted when they have no supported content.
- **FR-009**: Other valid project actions MUST remain independent of case-study availability and MUST be displayed only when their destinations are declared.
- **FR-010**: Case-study narratives, diagrams, and evidence unique to the case MUST be grouped under that project's optional `caseStudy` area; shared project facts and canonical media sources MUST remain in the shared fields of the same project record.
- **FR-011**: The media model MUST distinguish an intended static poster or first frame from an optional animated preview, preserve accurate alternatives when animation is unavailable, and honor reduced-motion preference.
- **FR-012**: Public project media references MUST resolve to assets available in the current repository; format or asset updates MUST update every consuming record and case-specific reference.
- **FR-013**: Animated previews MUST preserve their declared activation behavior: `autoplayPreview: true` requests the animation when its media enters the existing viewport margin; otherwise, hover or keyboard focus on its project link requests it. The static image MUST remain until animation is ready, on pointer leave or focus loss when applicable, after failure, and whenever reduced motion is enabled. No Play control is presented.
- **FR-014**: The first adoption MUST preserve current project content, public visibility, Home/archive placement and order, case-study destinations, archive anchors, and intended presentation except for agreed media-loading and broken-asset corrections.
- **FR-015**: A project authoring guide MUST explain the canonical record, field purposes, optional/default behavior, visibility, placements, media, actions, case-study relationship, and safe extension of the model.

### Key Entities

- **Project Record**: The canonical ficha for one project, with stable identity, shared facts, optional content, media and actions, public inclusion, surface placement, and an optional nested case-study area.
- **Project Media**: A project-owned static image or other media source, with optional animated preview, descriptive alternatives, and display dimensions or fitting choices.
- **Project Action**: A destination and label for an available external or internal action, independent from the case-study relationship.
- **Case Study Area**: An optional section inside one project record containing its slug, presentation choices, editorial narrative, engineering stories, evidence, reflection, and next-case destination.
- **Experience Reference**: A reference from employment history to a project identity, with an optional intentional display label and a plain-text fallback when the project cannot be publicly consumed.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Every project found in the current project inventory has exactly one canonical record identity, including projects that are not publicly included.
- **SC-002**: For every shared field shown in more than one surface, the displayed value matches the canonical project record after one record edit.
- **SC-003**: All public project image and animation references resolve successfully; no project asset request returns 404 during representative Home, archive, or case-study review.
- **SC-004**: A preview with `autoplayPreview: true` is requested only when it enters the existing viewport margin; a preview without that flag is requested only during hover or keyboard focus. Reduced-motion preference results in zero animated preview requests.
- **SC-005**: Every displayed case-study CTA resolves to a project record whose `caseStudy` area has a slug and at least two stories, each with a non-empty title and framing; projects that do not meet these conditions expose zero case-study CTAs and zero generated case-study routes.
- **SC-006**: All current public project placements, ordering, case-study URLs, and archive anchors remain unchanged unless explicitly changed by an approved media correction.
- **SC-007**: Records missing optional values remain valid, with no empty field labels or unavailable-action controls on the rendered surfaces.
- **SC-008**: The authoring guide lets a reviewer locate each supported field, its default or omission behavior, and the surfaces that consume it without consulting duplicate page data.

## Assumptions

- The portfolio owner authors records in repository data; this feature does not add a visitor-facing content editor or remote content service.
- The current project records, pages, case-study content, and asset directory are the baseline for migration. Where facts conflict, use the most complete existing value supported by project evidence and omit or qualify unsupported details.
- Every current project receives an explicit inclusion choice during adoption to preserve its current public status. Future records without explicit inclusion default to hidden.
- “Adding a field to the model reflects in its instances” means the shared record contract makes new fields optional or supplies a default; values remain authored per project where evidence supports them.
- Existing archive visual variants and case-specific editorial content remain; the work standardizes data and repairs media loading/references rather than redesigning presentation.
- The static image is selected per project from verified assets; use a dedicated cover when it best identifies the project and a gameplay frame when that better represents the work.
- The current `develop` preview behavior is preserved: explicitly configured previews load near the viewport, while other previews load on hover or keyboard focus. Reduced motion suppresses all animation requests.
