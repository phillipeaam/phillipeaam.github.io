# Research: More Projects Thumbnail Interaction

## Decision 1: Reuse the existing project rendering path

**Decision**: Derive Home's `homeSupportingProjects` from the existing enriched
project inventory and render through `SupportingProject.astro` in its existing
simple mode. Use its media-link wrapper and explicit project-derived accessible
name; keep project URLs and media sources sourced from existing records.

**Rationale**: This preserves the site's shared project structure and avoids
duplicating project destinations or content. The current Home section already
uses a simple mode with a visually hidden project heading, so implementation can
remove visible below-media copy without discarding the semantic project name.
The current Home list comes directly from `otherWork`, while the later
`projectInventory` applies canonical media from `archiveDetails`; sourcing the
Home list from that enriched inventory exposes existing media without
duplicating it.

**Alternatives considered**: Hand-write Home-specific project markup (duplicates
shared structure); use poster text as the link name (not reliable or accessible).

## Decision 2: Extend the shared media preview behavior

**Decision**: Adapt existing shared media preview behavior to respond to fine-
pointer hover and keyboard focus, return to the poster after pointer exit or
focus loss, and suppress/restore the poster when reduced-motion preference
changes. Keep the preview enhancement optional and the surrounding project link
as ordinary HTML navigation. Use one generic media path for every record with
media; do not branch on project ID.

**Rationale**: `ProjectMediaPreview.astro` already swaps poster and preview
sources and checks reduced-motion preference, but its current preview trigger is
pointer entry only. Extending the shared behavior satisfies keyboard parity and
reduced-motion requirements while keeping the project destination usable when
scripting does not run.

**Alternatives considered**: A CSS-only reveal does not swap the existing
animated media sources; a separate Home-only preview script duplicates media
behavior and risks different reduced-motion handling.

## Decision 3: Keep utility guidance capability-based

**Decision**: Retain a small, unboxed utility row immediately before the
thumbnail grid. Use the existing CSS hover/fine-pointer media query to show the
hover/click guidance and the no-hover guidance otherwise; do not add JavaScript
for instructional copy.

**Rationale**: The Home page already contains this row and capability-specific
copy. Keeping it in place preserves the approved layout and gives no-hover users
instructions that do not refer to hover.

**Alternatives considered**: Put guidance inside each project tile (adds
repetition and conflicts with the requested clean thumbnail target); use one
generic instruction (cannot accurately describe both interaction modes).

## Repository observations

- `src/pages/index.astro` currently places the utility row above the More
  Projects thumbnail grid.
- `src/components/SupportingProject.astro` already wraps simple-mode media in
  an anchor with an accessible name derived from the project name and keeps the
  simple-mode heading visually hidden.
- `src/components/ProjectMediaPreview.astro` swaps poster and preview images,
  honors reduced motion, and currently starts previews on fine-pointer entry.
- `src/data/projects.ts` supplies Home project records and ordering.
- `src/styles/global.css` contains section-specific layout, pointer guidance,
  link focus, and responsive grid rules.
- `package.json` exposes `check` and `build` scripts. No dedicated test script is
  defined.

No unresolved technical-context questions remain for this plan.
