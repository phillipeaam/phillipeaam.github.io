# Feature Specification: More Projects Thumbnail Interaction

**Feature Branch**: `001-more-projects-interaction`  
**Created**: 2026-09-30  
**Status**: Draft  
**Input**: User description: "$speckit-specify Redesign the Home page \"More Projects\" interaction without changing its overall visual identity. The project titles and orphan \"Details\" links should no longer appear below the media. Each project thumbnail should become the primary interactive target: hover on compatible pointer devices previews the project's animated media; clicking or activating the thumbnail opens that project's details destination; touch users must not depend on hover; each project link must retain an explicit accessible name independent of text rendered inside the poster. Move \"See all projects\" from below the thumbnails into a small utility row immediately above them. The left side of that row should briefly explain interaction: desktop/fine pointer: communicate hover-to-preview and click-to-open; touch/no-hover: communicate tap-to-open without mentioning hover. The right side contains \"See all projects\". Do not redesign Featured Work, Projects, Header or Footer. Do not create cards, pills or decorative containers. Preserve reduced-motion behavior."

## Clarifications

### Session 2026-09-30

- Q: Should focusing a project thumbnail with the keyboard also preview its animation? → A: Yes. Preview on hover and keyboard focus; reduced motion suppresses animation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a project from its thumbnail (Priority: P1)

Visitors browsing More Projects can activate a project thumbnail to open that
project's existing details destination. They can identify each link through an
accessible name that remains clear even when the poster itself contains no text.

**Why this priority**: Opening project details is the primary purpose of this
section.

**Independent Test**: Activate each thumbnail by pointer and keyboard and verify
it reaches the same destination as that project's existing Details link. Inspect
the accessibility tree to confirm each link has an explicit project-specific name.

**Acceptance Scenarios**:

1. **Given** a visitor sees a project thumbnail, **When** they click it,
   **Then** the browser opens that project's existing details destination.
2. **Given** a keyboard user reaches a project thumbnail link, **When** they
   activate it, **Then** it opens the same destination and has a visible focus
   indicator.
3. **Given** poster media renders without readable text, **When** assistive
   technology announces its link, **Then** the link still has an explicit,
   meaningful name identifying the project.

---

### User Story 2 - Preview animated project media (Priority: P2)

Visitors using a device with a compatible fine pointer can preview a project's
animated media by hovering over its thumbnail when that project has an existing
animated preview source. Keyboard users receive the same preview on focus when
that source is available, before deciding whether to open the project. If no
preview source exists, the poster remains visible and the thumbnail remains
fully operable.

**Why this priority**: The preview adds context to browsing while keeping the
thumbnail as the single primary project target.

**Independent Test**: On a fine-pointer device, hover thumbnails with existing
animated preview sources and verify the corresponding media previews; move away
and verify the default poster returns. For thumbnails without a preview source,
verify the poster stays visible without an error, empty state, or visual change.
Repeat by focusing and blurring with a keyboard. With reduced motion enabled,
verify animation is suppressed, the poster remains visible, and thumbnails stay
operable.

**Acceptance Scenarios**:

1. **Given** a fine-pointer visitor sees a project thumbnail, **When** they
   hover over it and an existing animated preview source is available, **Then**
   that project's animated media previews without changing the destination or
   accessible name of the link.
2. **Given** a keyboard user focuses a project thumbnail, **When** it receives
   focus and an existing animated preview source is available, **Then** that
   project's animated media previews without activating the link or changing
   its accessible name.
3. **Given** a visitor has requested reduced motion, **When** they hover or focus
   a thumbnail with an animated preview source, **Then** animation is suppressed
   and its poster remains visible while the project remains operable.
4. **Given** a project's animated preview source is unavailable, **When** a
   visitor hovers or focuses its thumbnail, **Then** the poster remains visible
   without an error, empty state, fake animation, or visual regression, and the
   thumbnail remains clickable and keyboard accessible.

---

### User Story 3 - Understand interaction and browse all projects (Priority: P2)

Visitors can read a brief instruction suited to their input capability and use
the See all projects link above the thumbnails to continue to the complete
projects listing.

**Why this priority**: Clear instructions support both pointer and touch users,
and the utility link remains easy to find before browsing the thumbnails.

**Independent Test**: Inspect the utility row on fine-pointer and no-hover
devices. Verify the correct instruction is shown in each mode and See all
projects navigates to the existing complete listing.

**Acceptance Scenarios**:

1. **Given** a fine-pointer device, **When** the utility row is displayed,
   **Then** its left side communicates hover-to-preview and click-to-open.
2. **Given** a touch or no-hover device, **When** the utility row is displayed,
   **Then** its left side communicates tap-to-open and does not mention hover.
3. **Given** the visitor wants the full listing, **When** they activate See all
   projects in the row above the thumbnails, **Then** they reach the existing
   projects listing.

### Edge Cases

- If a device or browser does not support hover, the thumbnails remain directly
  activatable and the touch/no-hover instruction is shown.
- If a project has no existing animated preview source, its poster remains
  visible on hover and focus without an error, empty state, fake animation, or
  visual regression; its link remains operable. Do not invent an animation
  source to satisfy the interaction.
- If reduced motion is requested for a project that has an animated preview
  source, animation is suppressed and the poster remains visible and usable as
  the link target.
- The section remains operable when optional client-side scripting is unavailable; core navigation
  must use normal link behavior.
- At narrow widths, both the instruction and See all projects remain readable
  and reachable without overlap or horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each project thumbnail MUST be the primary interactive link to
  that project's existing details destination.
- **FR-002**: The project title and separate Details link MUST NOT appear below
  each project's media in More Projects.
- **FR-003**: Each project link MUST have an explicit accessible name that
  identifies its project and does not depend on text rendered inside the poster.
- **FR-004**: On compatible fine-pointer devices, hovering over a thumbnail or
  keyboard focus on a thumbnail MUST preview that project's existing animated
  media when an animated preview source is available. When it is unavailable,
  the poster MUST remain visible without an error, empty state, fake animation,
  or visual regression.
- **FR-005**: Touch and no-hover users MUST be able to open project details by
  tapping the thumbnail without first triggering a preview.
- **FR-006**: A utility row MUST appear immediately above the thumbnails, with
  an input-appropriate instruction on the left and See all projects on the right.
- **FR-007**: The fine-pointer instruction MUST communicate that hover previews
  animated media where available and that clicking opens project details. The
  touch/no-hover instruction MUST communicate tap-to-open and MUST NOT mention
  hover.
- **FR-008**: See all projects MUST retain its existing destination and
  navigate using ordinary link activation.
- **FR-009**: Reduced-motion preferences MUST suppress animated previews while
  preserving access to the static poster and project destination.
- **FR-010**: The change MUST preserve the existing visual identity and MUST NOT
  redesign Featured Work, Projects, Header, or Footer.
- **FR-011**: The change MUST NOT introduce cards, pills, or decorative
  containers around this interaction.
- **FR-012**: Core content and navigation MUST remain usable without optional
  client-side scripting, with keyboard operation, visible focus, semantic links, and usable
  touch targets.

### Key Entities

- **Project thumbnail link**: A project's primary media target, accessible name,
  and existing details destination.
- **Interaction instruction**: Brief utility-row guidance selected for the
  visitor's available pointer capability.
- **Project listing link**: The See all projects navigation target for the
  complete project listing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every project represented in More Projects has one primary
  thumbnail link that opens its existing details destination.
- **SC-002**: No project title or orphan Details link is displayed below project
  media in More Projects.
- **SC-003**: Every thumbnail link exposes an explicit project-specific
  accessible name, including when its poster contains no text.
- **SC-004**: Fine-pointer visitors receive guidance that hover previews media
  where available and clicking opens project details;
  touch/no-hover visitors receive tap-to-open guidance with no hover reference.
- **SC-005**: See all projects appears in the utility row immediately above the
  thumbnails and retains its existing destination.
- **SC-006**: Reduced-motion users can access every project without animated
  preview, and core thumbnail navigation works without optional client-side scripting.
- **SC-007**: The utility row and thumbnail links remain readable and operable
  at representative desktop, tablet, and mobile widths without changing the
  named out-of-scope sections.

## Assumptions

- Existing project records and their details destinations remain authoritative;
  this feature changes how visitors activate them, not their destinations.
- “Touch/no-hover” means a browsing context that does not offer hover, even if a
  hybrid device also has a fine pointer available.
- When reduced motion is requested, the static poster is an adequate preview
  state; no alternate animation is required.
- Animated preview is optional and uses only a source already present in the
  project's media data. When none exists, the poster remains the stable visual
  state and no replacement animation is created.
- The existing See all projects destination and Home visual identity remain
  unchanged.
