# Feature Specification: Animated Header Scroll on Projects Archive

**Feature Branch**: `feature/004-animated-project-header-scroll`
**Created**: 2026-10-03
**Status**: Draft
**Input**: User description: "On Home, clicking a header link scrolls with animation to the corresponding area. Replicate this on the all-projects screen, where header links currently jump immediately. The left-arrow Back button must continue navigating directly, without animation, to the corresponding previous area."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Smoothly navigate project groups from the header (Priority: P1)

A visitor browsing the all-projects screen can use its header links to move to a corresponding group or area with the same animated scrolling experience available on Home.

**Why this priority**: This is the requested behavior and makes in-page header navigation consistent between Home and the all-projects screen.

**Independent Test**: Open `/projects/`, activate each header link that targets an area within that page, and observe animated scrolling to the corresponding area. Repeat with pointer, keyboard, and touch at representative desktop, tablet, and mobile widths. With reduced motion enabled, verify the destination is reached without animated scrolling.

**Acceptance Scenarios**:

1. **Given** a visitor is on `/projects/` and a linked group is elsewhere on the page, **When** they activate its header link, **Then** the page scrolls with the animated behavior used by Home and reaches the corresponding group.
2. **Given** a keyboard user is on `/projects/`, **When** they focus and activate a header link, **Then** the same animated navigation occurs and the control remains keyboard operable with visible focus.
3. **Given** a visitor has enabled reduced motion, **When** they activate a header link, **Then** navigation reaches the corresponding area without motion that conflicts with that preference.

---

### User Story 2 - Return directly using the Back arrow (Priority: P1)

A visitor can use the left-arrow Back control on `/projects/` to return to the previous Home scroll position directly, preserving its existing immediate, non-animated behavior.

**Why this priority**: The user explicitly requires that the Back control remain an instant-navigation exception while the other in-page header links become animated.

**Independent Test**: From Home, scroll to a section and open `/projects/`; activate the left-arrow Back control by pointer, keyboard, and touch. Verify Home returns directly to the saved scroll position without an animated scroll. Confirm that the other header links on `/projects/` animate.

**Acceptance Scenarios**:

1. **Given** a visitor reached `/projects/` from a Home scroll position, **When** they activate the left-arrow Back control, **Then** Home returns directly to that saved position without animated scrolling.
2. **Given** a visitor uses another header link on `/projects/`, **When** they activate it, **Then** the corresponding in-page scroll is animated.

### Edge Cases

- If a header link target is absent, its existing navigation behavior is preserved and no unrelated area is selected.
- If reduced motion is enabled, animated header scrolling is suppressed while navigation still reaches the intended area.
- The Back arrow remains direct across pointer, keyboard, and touch activation.
- Header links and the Back control remain usable at narrow viewport sizes and do not obscure the destination heading.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Header links on the all-projects screen (`/projects/`) that target areas within that page MUST use animated scrolling consistent with the existing Home header-link experience.
- **FR-002**: Activating an in-page header link on `/projects/` MUST bring its corresponding area into view.
- **FR-003**: The left-arrow Back control on `/projects/` MUST retain its current direct navigation to the previous Home scroll position and MUST NOT animate scrolling.
- **FR-004**: The Back-control exception MUST NOT disable animated scrolling for other in-page header links on `/projects/`.
- **FR-005**: Header navigation MUST remain operable by pointer, keyboard, and touch, with visible keyboard focus and meaningful accessible names.
- **FR-006**: When reduced motion is requested, `/projects/` header navigation MUST respect that preference while still reaching the destination.
- **FR-007**: The change MUST be limited to header navigation behavior on `/projects/` and MUST preserve the current Home behavior, other routes, page content, and visual design.

## Key Entities *(include if feature involves data)*

- **Projects-archive header link**: A header navigation control that takes a visitor to a corresponding area within `/projects/`.
- **Back control**: The left-arrow header control that returns directly to the visitor's saved Home scroll position.
- **Archive destination area**: A group or other in-page area associated with a header navigation control on `/projects/`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In all tested `/projects/` header-link journeys, 100% of links to in-page areas reach their corresponding areas with animated scrolling when reduced motion is not requested.
- **SC-002**: In all tested Home-to-`/projects/` journeys, 100% of left-arrow Back activations return to the saved Home scroll position without animated scrolling.
- **SC-003**: 100% of tested header links remain keyboard operable with visible focus, and touch users can activate them at representative desktop, tablet, and mobile viewport sizes.
- **SC-004**: With reduced motion requested, 100% of tested in-page header-link activations reach the correct area without animated scrolling.
- **SC-005**: Existing Home header-link behavior remains unchanged in all tested journeys.

## Assumptions

- “All projects screen” means the existing `/projects/` archive route, which groups project records and uses contextual header navigation.
- The animated behavior should match the existing Home header-link scrolling experience, without prescribing implementation details.
- The left-arrow Back control returns to the Home scroll position saved before visiting `/projects/`; both its destination and immediate behavior are preserved.
- Only in-page links on `/projects/` are in scope; header links that navigate to another page retain their current behavior.
- Desktop, tablet, and mobile coverage uses representative viewport sizes.
