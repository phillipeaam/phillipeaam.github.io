# Feature Specification: Hash Navigation

**Feature Branch**: `002-hash-navigation`  
**Created**: 2026-09-30  
**Status**: Draft  
**Input**: User reports that, from Home's featured-project area, clicking a project's thumbnail to navigate to that specific project on the all-projects page first shows the top of that page and then visibly scrolls to the project. The target should appear directly. Direct deep links and reloads should land at the requested section; the sticky header must not cover the destination heading; Back and Forward remain natural; URLs without a hash start at the top; preserve existing same-page smooth scrolling on Home; desktop and mobile; keep scope to navigation behavior, without redesigning Header, sections, visual styling, or routing. Prefer native browser behavior and a minimal solution. Do not prescribe implementation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a section from another page (Priority: P1)

A visitor on Home clicks a featured project's thumbnail to open that specific
project in the all-projects page. The requested project appears as the
destination, without a visible intermediate view at the top of that page
followed by a scroll to the project.

**Why this priority**: This is the reported disruptive behavior and the primary
navigation journey to correct.

**Independent Test**: From Home, click a featured project's thumbnail and
observe its destination in the all-projects page; separately activate the
existing `See on all projects` text link and open
`/projects/#professional-game` and `/projects/#independent-game` directly.
Observe the destination transition and heading position at representative
desktop, tablet, and mobile widths.

**Acceptance Scenarios**:

1. **Given** a visitor is on Home, **When** they click a featured project's
   thumbnail to open that project's record in the all-projects page, **Then**
   the project record appears directly, without first showing the archive top
   and visibly scrolling down to the record.
2. **Given** the target section is displayed at desktop, tablet, or mobile
   width, **When** the visitor views its heading, **Then** the sticky header
   does not obscure the heading.
3. **Given** a visitor is on Home, **When** they activate the existing `See on
   all projects` text link for a featured project, **Then** its project-record
   target is displayed directly without a visible scroll from the destination
   page top.

---

### User Story 2 - Open or reload a deep link (Priority: P1)

A visitor opens a URL containing a valid section hash directly, or reloads that
URL, and arrives at the requested section.

**Why this priority**: Shared, bookmarked, or reloaded section URLs must remain
reliable independently of how a visitor arrived at them.

**Independent Test**: Open `/projects/#professional-game` and
`/projects/#independent-game` in fresh tabs and reload each at representative
desktop, tablet, and mobile widths; verify the requested section and unobscured
heading each time.

**Acceptance Scenarios**:

1. **Given** a visitor opens a valid URL with a section hash directly, **When**
   the page is displayed, **Then** the requested section is the destination.
2. **Given** a visitor is viewing a valid hashed URL, **When** they reload the
   page, **Then** the requested section remains the destination.

---

### User Story 3 - Keep history and Home navigation predictable (Priority: P2)

A visitor can use browser history naturally, visit a page without a hash and
continue using existing same-page smooth scrolling on Home. Keyboard users and
visitors who request reduced motion retain usable navigation.

**Why this priority**: Fixing cross-page hash arrival must preserve familiar
navigation behavior across the rest of the portfolio.

**Independent Test**: Navigate between hashed destinations, use Back and
Forward, open a URL without a hash, and activate existing same-page section
links on Home. Repeat at representative desktop, tablet, and mobile widths;
also verify keyboard activation, visible focus, reduced-motion behavior, and
navigation when optional scripts are unavailable.

**Acceptance Scenarios**:

1. **Given** a visitor has navigated between portfolio destinations, **When**
   they use Back or Forward, **Then** history moves naturally through those
   destinations and restores the relevant section when the history entry has a
   valid hash.
2. **Given** a visitor opens a portfolio URL without a hash, **When** the page
   is displayed, **Then** it starts at the top.
3. **Given** a visitor activates an existing same-page section link on Home,
   **When** the section is reached, **Then** the current smooth-scrolling
   experience remains in place.
4. **Given** a keyboard user reaches a hash navigation link, **When** they
   inspect and activate it, **Then** it is a semantic link with a meaningful
   accessible name, navigation succeeds, and the focused link has a visible
   focus indicator.
5. **Given** a visitor requests reduced motion, **When** they use cross-page or
   same-page hash navigation, **Then** navigation remains operable without
   forced smooth animated scrolling.
6. **Given** optional scripts are unavailable, **When** a visitor activates a
   core cross-page or same-page hash link, **Then** the requested destination
   remains reachable.
7. **Given** a visitor has navigated to a page without a hash from a hashed
   destination, **When** they use Back and Forward, **Then** the no-hash history
   entry returns to the top of its page and the hashed entry restores its
   requested section.

### Edge Cases

- A URL with no hash starts at the top regardless of whether it is loaded
  directly or reached through browser history.
- A valid hash must continue to identify its requested section after reload and
  browser history navigation.
- On narrow mobile viewports, the sticky header must not cover the destination
  heading; the heading remains readable without horizontal scrolling.
- Same-page Home links retain their current smooth-scroll behavior while
  cross-page arrival avoids a visible scroll from the top.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When a visitor clicks a featured project's thumbnail on Home to
  open that project in the all-projects page, the requested project
  MUST be the first visible destination, without first showing the archive top
  and then visibly scrolling to the project.
- **FR-002**: A valid hashed URL MUST open at its requested section when loaded
  directly and when reloaded.
- **FR-003**: The destination section heading MUST remain fully readable and
  unobscured by the sticky header on representative desktop, tablet, and mobile
  viewports.
- **FR-004**: Browser Back and Forward MUST preserve natural history navigation;
  when a history destination has a valid section hash, that section MUST be
  restored as the destination.
- **FR-005**: A portfolio URL without a hash MUST start at the top of its page.
- **FR-006**: Existing same-page smooth scrolling for section links on Home
  MUST remain available and unchanged in user experience.
- **FR-007**: The change MUST be limited to hash navigation behavior and MUST
  NOT redesign the Header, page sections, visual styling, or routing.
- **FR-008**: The navigation experience MUST remain usable at representative
  desktop, tablet, and mobile viewport sizes.
- **FR-009**: Hash navigation MUST remain keyboard operable with visible focus,
  use semantic links with meaningful accessible names and usable touch targets,
  honor reduced-motion preferences, and keep core navigation usable when
  optional scripts are unavailable.

### Key Entities *(include if data involved)*

- **Section hash destination**: A portfolio page section identified by a valid
  URL hash and reached through a link, direct URL, reload, or browser history.
- **Navigation history entry**: A browser destination that may include a page
  URL and section hash, and can be revisited using Back or Forward.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of tested cross-page valid-hash navigations at
  representative desktop, tablet, and mobile widths, the requested section is
  displayed without a visible scroll from the destination page top.
- **SC-002**: In 100% of tested direct loads and reloads of valid hashed URLs at
  representative desktop, tablet, and mobile widths, the requested section is
  displayed and its heading is not covered by the sticky header.
- **SC-003**: In 100% of tested Back and Forward journeys involving valid hash
  destinations, browser history reaches the expected page and section.
- **SC-004**: In 100% of tested portfolio URL loads without a hash, the page
  begins at the top.
- **SC-005**: Existing same-page smooth-scroll behavior on Home remains
  observable in all tested same-page section-link journeys.
- **SC-006**: All outcomes above pass at representative desktop, tablet, and
  mobile viewport sizes, with no navigation-only change to Header, section
  design, visual styling, or routing behavior.
- **SC-007**: At representative desktop, tablet, and mobile widths, 100% of
  tested Home hash-navigation controls are semantic links with meaningful
  accessible names, remain keyboard operable with visible focus, and reach
  their destinations without optional scripts. At mobile width, each tested
  control can be activated by touch without accidentally activating an
  adjacent control. Test the featured-project thumbnail link, the `See on all
  projects` link, and the `Projects` same-page link; check reduced-motion
  behavior for cross-page and same-page navigation.

## Assumptions

- The example project hashes in the request represent existing valid section
  destinations, and current section links remain the intended navigation targets.
- The featured-project thumbnail is the control described in the reported
  journey; the existing `See on all projects` text link is also an available
  cross-page link to a project-record hash.
- Home does not link directly to the `professional-game` or
  `independent-game` group hashes. This feature does not add new Home links; the
  group URLs are validated as direct hash destinations, and cross-page link
  activation is validated with existing links.
- “Directly” means the visitor does not see a perceptible intermediate
  top-of-page view or animated scroll from the top before the target is reached.
- The sticky Header remains present and retains its current design and
  behavior; only destination visibility relative to it is in scope.
- Existing same-page smooth scrolling on Home is an approved part of the
  current experience and must be preserved.
- Desktop, tablet, and mobile coverage means representative viewport sizes; the
  spec does not prescribe exact device models or pixel widths.
