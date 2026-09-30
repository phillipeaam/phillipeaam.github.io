# Implementation Plan: More Projects Thumbnail Interaction

**Branch**: `001-more-projects-interaction` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-more-projects-interaction/spec.md`

## Summary

Make each More Projects poster the primary link to its existing project
destination, with preview on fine-pointer hover and keyboard focus only when an
existing animated preview source is available. Without one, retain the poster
with no error, empty state, invented animation, or visual change. Preserve the
existing More Projects visual system, keep the utility guidance row above the
thumbnails, remove visible project copy below the media, and suppress animation
when reduced motion is requested. Reuse the existing enriched project inventory
and shared SupportingProject and media preview components; keep ordinary links
as the baseline so navigation works without optional scripting. Keep interaction
guidance in the existing utility row, qualify preview availability in the
fine-pointer copy, and use CSS pointer media queries for its variants.

## Technical Context

**Language/Version**: Astro components with TypeScript; Node.js version is not
specified in repository configuration.

**Primary Dependencies**: Astro 5.13.5, `@astrojs/check` 0.9.4, TypeScript 5.9.2.

**Storage**: N/A. The feature reads existing project data and static media.

**Testing**: `npm run check`, `npm run build`, and manual interaction/accessibility
and visual checks at representative desktop, tablet, and mobile widths.

**Target Platform**: Responsive web browsers, including fine-pointer, keyboard,
and touch/no-hover input modes.

**Project Type**: Static Astro portfolio site.

**Performance Goals**: No new measurable performance target is specified. Keep
the poster as the initial media and load or swap an existing animated preview only when a source is available and the
visitor hovers or focuses a thumbnail.

**Constraints**: Preserve reduced-motion behavior; keep project destinations
usable without optional client-side scripting; retain explicit accessible names
and visible keyboard focus; derive media and destinations from existing project
inventory; animate only from an existing preview source, retaining the poster
when one is unavailable and never inventing media; qualify fine-pointer guidance
so it does not imply every project has an animation; do not create project-ID-
specific rendering branches; prefer CSS pointer media queries over scripting
for instructional copy; do not redesign Featured Work, Projects, Header, or
Footer; add no cards, pills, or decorative containers.

**Scale/Scope**: One Home page section, its shared thumbnail/media behavior, and
section-specific styles. Existing project records and destinations remain the
source of truth.

## Constitution Check

| Principle | Gate | Plan response |
|---|---|---|
| Evidence-first portfolio claims | Pass | Reuse existing project records and destinations; add no new claims. |
| Shared patterns before variants | Pass | Extend the shared project/media components and their contract. |
| Preserve approved visual systems | Pass | Keep the existing More Projects visual identity and utility row styling. |
| Accessibility is completion | Pass | Preserve semantic links and focus indication; provide explicit names and keyboard preview behavior. |
| Progressive enhancement | Pass | Native link navigation remains available if preview scripting is unavailable. |
| Responsive verification | Pass | Quickstart includes desktop, tablet, and mobile review. |
| Small scoped changes | Pass | Limit changes to More Projects and shared media behavior required by it. |
| Validation before completion | Pass | Run Astro diagnostics and production build; perform relevant runtime and visual checks. |
| Human review | Pass | Final task T018 is an external approval gate after implementation, validation, and presentation of the diff and runtime results; the agent cannot self-approve, merge, or push. |

No constitution violations are identified; no exceptions require justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-more-projects-interaction/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── more-projects-ui.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── SupportingProject.astro
│   └── ProjectMediaPreview.astro
├── data/
│   └── projects.ts
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

**Structure Decision**: This is a focused change in the existing Astro site.
Derive Home's curated supporting projects from the existing enriched project
inventory so media, destinations, and ordering stay canonical. Render through
the current shared project component, scope layout changes to More Projects,
and extend the shared media preview for keyboard focus and reduced motion. Keep
the current CSS-driven utility guidance and do not create project-specific
branches or a separate feature-specific card system.

## Complexity Tracking

No constitution violations or additional architectural complexity require
justification.
