# Feature Specification: Section Heading and Navigation Standard

**Feature Branch**: `codex/home-section-heading-standard`
**Created**: 2026-10-06
**Status**: Draft
**Input**: User requests consistent visual and editorial section headings, a full-width, left-aligned support paragraph below each title at all viewport widths, canonical section fragments matching current navigation labels, compatibility with old fragments, and a permanent documented standard.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read consistently aligned section headings (Priority: P1)

A visitor scanning the portfolio sees the same heading composition in Featured, Projects, Teammates, About, Experience, and the All Projects catalog introduction. At every width, the content-sized title group comes first and a full-width, left-aligned support paragraph sits 4px below it.

**Why this priority**: Different ending positions currently make equivalent sections look inconsistent and interrupt scanning.

**Independent Test**: Compare all six headings at the same desktop viewport, including short and long support text, then inspect the same headings at tablet and mobile widths.

**Acceptance Scenarios**:

1. **Given** the six headings at any viewport width, **When** a visitor compares them, **Then** each shows its title group followed immediately by a full-width, left-aligned support paragraph.
2. **Given** support text that spans multiple lines, **When** the heading is rendered, **Then** it remains one continuous paragraph, wraps naturally within the available width, and aligns left.
3. **Given** a narrow viewport, **When** the visitor reads a heading, **Then** support text appears below the title, aligns with the left content edge, and wraps naturally without horizontal overflow.
4. **Given** the catalog introduction, **When** it is compared with Home at the same viewport width, **Then** its support-text alignment follows the same pattern while retaining its page-title role.

---

### User Story 2 - Navigate using names that match the sections (Priority: P1)

A visitor activates a navigation item or opens a section URL and sees a fragment that matches the current section name, the correct destination, and the corresponding active navigation item wherever that item is available.

**Why this priority**: Current fragments such as `#work` and `#recommendations` no longer match the visible labels.

**Independent Test**: Activate every navigation destination from Home and from other pages where its link is available; open and reload each canonical URL directly; repeat in desktop and mobile navigation.

**Acceptance Scenarios**:

1. **Given** desktop or mobile navigation on Home, **When** any item is activated, **Then** its section is reached and the URL shows the canonical fragment in the mapping below.
2. **Given** a link to a Home section on another page, **When** it is activated, **Then** the destination is the Home section, not a similarly named target on the originating page.
3. **Given** a directly opened or reloaded canonical section URL, **When** the page is displayed, **Then** its heading is visible below the sticky header and its navigation item is correctly identified as active where available.
4. **Given** navigation history across sections and pages, **When** Back or Forward is used, **Then** destination and active state remain consistent with the existing navigation contract.

---

### User Story 3 - Keep existing shared links usable (Priority: P2)

A visitor using a previously shared section URL reaches the intended section even though it now has a new canonical name.

**Why this priority**: Renaming sections must not break bookmarks or external links.

**Independent Test**: Open and reload each legacy fragment listed below, and compare the reached section with its canonical destination; repeat with optional scripting unavailable.

**Acceptance Scenarios**:

1. **Given** any recognized legacy fragment, **When** it is opened directly, **Then** the matching current section is reached and remains unobscured.
2. **Given** a legacy destination, **When** the current menu is used to navigate again, **Then** newly generated links use canonical fragments.
3. **Given** core navigation without optional scripting, **When** a canonical or legacy link is opened, **Then** the correct destination remains reachable.
4. **Given** a saved Home position, **When** a return link restores that position or an explicit Home section link is activated, **Then** restoration retains its existing behavior and does not override the explicit destination.

---

### User Story 4 - Maintain the shared standard (Priority: P2)

A maintainer adding or modifying a section has one documented visual and editorial contract, including naming and navigation rules.

**Why this priority**: The requested consistency should survive future content changes.

**Independent Test**: Review the permanent standard against each scoped heading and a proposed new section with short and long support text.

**Acceptance Scenarios**:

1. **Given** a new section, **When** its heading follows the standard, **Then** it retains the common alignment and responsive behavior without bespoke alignment rules or forced line breaks.
2. **Given** a proposed change to the standard, **When** it is reviewed, **Then** the documentation records the reason, affected sections, and acceptance criteria requiring revalidation.

### Edge Cases

- Long unbroken text must not produce clipped content or horizontal page scrolling at the representative viewport widths recorded in validation.md. Manual browser-zoom/enlarged-text testing is out of scope by user decision (2026-10-07).
- Intermediate widths must retain a readable layout without overlapping title and support text.
- A section reached through a legacy name must still correspond to its current menu item.
- Existing `#other-work` and `#about-phillipe` links remain compatible alongside the explicitly renamed fragments.
- An unknown fragment must not be mistaken for a recognized section or incorrectly highlight a renamed destination.
- URLs without a fragment retain the existing initial-page behavior; unrelated project-record fragments remain unchanged.
- Header identity links retain their immediate return-to-Home behavior, independent of the explicit Home menu fragment.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The standard MUST apply to the five scoped Home headings and the All Projects catalog introduction.
- **FR-002**: Every scoped heading MUST follow one shared structure comprising an eyebrow, a semantic title, and support text. The title identifies the section; the eyebrow provides brief framing; support text adds useful context without repeating the title's meaning. Claims and intent MUST be preserved; support wording MAY be edited to satisfy the line-width rule.
- **FR-003**: At every viewport width, use a shared 4px gap between eyebrow and title, and a shared 4px gap between the title group and the full-width support paragraph. The title group MUST retain its natural height. Support text MUST align left and wrap within the available width.
- **FR-004**: Heading order, spacing, and responsive behavior MUST follow one shared documented contract rather than section-specific alignment adjustments.
- **FR-005**: At mobile widths, support text MUST appear below the title at the left content edge, wrap naturally, and remain readable without clipping, overlap, or horizontal overflow.
- **FR-006**: Support MUST remain one continuous paragraph with natural wrapping and left-aligned text at every width; do not add line-specific spans, section-specific CSS, or manual line breaks.
- **FR-007**: Headings MUST retain their semantic hierarchy and accessible relationships; the catalog introduction remains a page title and Home section titles remain section headings.
- **FR-008**: Navigation destinations MUST use the canonical mapping below. All affected internal links, section identifiers, active-section behavior, and documentation MUST agree with it.

| Menu label | Canonical fragment | Legacy fragments retained |
|------------|--------------------|---------------------------|
| Home | `#home` | `#top` |
| Featured | `#featured` | `#case-studies`, `#work` |
| Projects | `#projects` | `#other-work` |
| Teammates | `#teammates` | `#recommendations` |
| About | `#about` | `#about-phillipe` |
| Experience | `#experience` | None renamed |
| Contact | `#contact` | None renamed |

- **FR-009**: Newly generated menu and cross-page section links MUST display canonical fragments after activation; recognized legacy links MUST continue reaching the corresponding section. Legacy URL normalization is permitted but not required.
- **FR-010**: Desktop and mobile menus MUST agree on destination naming and correctly identify the active section wherever the relevant menu item exists, including canonical and legacy arrivals.
- **FR-011**: Canonical and legacy destinations MUST work on direct opening and reload and MUST remain visible below the sticky header. Core links MUST remain usable without optional scripting.
- **FR-012**: The existing return-to-Home, saved-position restoration, same-page navigation, and browser-history behaviors MUST remain intact except for the specified fragment renaming. Explicit section destinations MUST take precedence over saved-position restoration.
- **FR-013**: The feature MUST preserve introduction, cards, contact content, the meaning and claims of current heading support copy, and unrelated routes and project-record fragments. Support wording MAY be edited to satisfy FR-016. Contact's canonical link participates in navigation consistency; its visual layout is outside the heading standard.
- **FR-014**: A permanent reference MUST document heading roles, heading order, spacing, responsive behavior, canonical names, legacy compatibility, and acceptance criteria. Future changes to the contract MUST update that reference, state their rationale, and receive human review.
- **FR-015**: Delivery MUST record actual visual and navigation checks at representative desktop, tablet, and mobile widths, including short and long text, keyboard navigation, direct links, and legacy links. Untested cases MUST be explicitly identified; writing this specification does not establish implementation validation.
- **FR-016**: All six support paragraphs MUST use one continuous text value, full available width, natural wrapping, and left-aligned text. Each MUST follow its title group with a shared 4px gap; eyebrow and title MUST also have a shared 4px gap. The paragraph MUST expose the complete support sentence as one accessible name.

### Key Entities *(include if feature involves data)*

- **Section heading contract**: The common roles, visual alignment, spacing, and responsive behavior of the scoped headings.
- **Section destination**: A visible navigation label, its canonical fragment, and any supported legacy fragments, all referring to the same section.
- **Permanent standard**: The maintained reference governing future section headings and naming changes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At equal viewport widths, all six title groups begin at the same content origin and all six support paragraphs begin 4px below their title group and span the available content width.
- **SC-002**: At representative desktop, tablet, and mobile widths, all six headings exhibit zero overlaps, clipped support text, or heading-induced horizontal page overflow.
- **SC-003**: All seven canonical menu destinations reach their correct section and expose the expected fragment; all five listed legacy fragments remain usable on direct opening and reload.
- **SC-004**: Every available scoped desktop, mobile, and cross-page navigation link agrees with the destination mapping; active-state checks yield zero mismatches for recognized sections.
- **SC-005**: Return-to-Home, saved-position restoration, and Back/Forward journeys retain their previously documented behavior, with zero observed regressions in the recorded acceptance checks.
- **SC-006**: One permanent reference covers every heading and navigation requirement, with no undocumented section-specific alignment exceptions. Validation records distinguish performed checks from pending checks.
- **SC-007**: At each checked viewport width, every support paragraph remains continuous, left-aligned, and naturally wrapped within the available content width.

## Assumptions

- The current branch and commit `4864fab` provide the approved wording baseline. The user later chose Featured as the one-word label for the selected in-depth work section; `#featured` is canonical and `#case-studies` plus `#work` remain aliases.
- The request to preserve existing anchor destinations means preserving the reached sections and legacy-link compatibility; the explicit canonical-fragment mapping takes precedence over retaining old fragment names as primary URLs.
- Compatibility includes existing Home aliases identified in the current source, not arbitrary historical URLs.
- The shared stacked layout is evaluated at the same viewport width and equivalent content containers. The gap between eyebrow/title and title/support is 4px at every viewport width.
- Specs `002-hash-navigation`, `004-animated-project-header-scroll`, and `005-home-wordmark-navigation` provide existing navigation constraints; this feature changes canonical section naming without replacing those journey contracts.
- The project constitution governs shared patterns, accessibility, responsive verification, evidence, and human review. No implementation or visual verification is claimed by this specification.

## Editorial clarification — 2026-10-07
At every viewport width, place one full-width support paragraph 4px below the title group. Keep its text left-aligned and naturally wrapped.
