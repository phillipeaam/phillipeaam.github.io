# Implementation Plan: Animated Header Scroll on Projects Archive

**Branch**: `feature/004-animated-project-header-scroll` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

**Input**: [Feature specification](spec.md)

## Summary

Make header links that target areas within the `/projects/` archive scroll with the same smooth motion as Home. Keep direct hash entry and cross-page navigation immediate, honor reduced-motion preferences, and preserve the left-arrow Back link's direct return to Home's saved scroll position. The current archive-wide instant-scroll rule exists to avoid animated hash navigation on page entry, so the behavior must be limited to deliberate in-page header activation.

## Technical Context

**Language/Version**: Astro components, TypeScript, CSS; Node.js 24 (project runtime)

**Primary Dependencies**: Astro 5; no new dependencies

**Storage**: Browser session storage already stores the previous Home scroll position; no new storage

**Testing**: `npm run check`, `npm run build`, `git diff --check`, and manual navigation/accessibility checks in a browser

**Target Platform**: Responsive static website in current desktop and mobile browsers

**Project Type**: Static website / portfolio

**Performance Goals**: Header activation begins scrolling promptly, without a perceptible delay; no added work during page load

**Constraints**: Preserve direct cross-page hash arrival, direct hash loads, browser URL/history semantics for in-page links, reduced motion, Home behavior, and Back-arrow scroll restoration. Keep page visuals and routes unchanged.

**Scale/Scope**: One route (`/projects/`), shared navigation behavior only, all in-page header links in desktop and mobile navigation

## Constitution Check

- **I. Evidence-First Portfolio Claims**: Pass. No portfolio claims or project data change.
- **II. Shared Patterns Before Project-Specific Variants**: Pass. Reuse shared navigation and motion behavior; no project-specific component.
- **III. Preserve Approved Visual Systems**: Pass. No visual redesign; only navigation motion changes on the archive.
- **IV. Accessibility Is Part of Completion**: Pass with required keyboard, focus, touch, and reduced-motion validation.
- **V. Progressive Enhancement**: Pass. Existing semantic links remain the navigation fallback; optional scripting may enhance activation motion.
- **VI. Responsive Verification**: Pass with representative desktop, tablet, and mobile checks required in quickstart.
- **VII. Small, Scoped Changes**: Pass. Restrict behavior to activated in-page links on `/projects/`.
- **VIII. Validation Before Completion**: Pass with Astro check, production build, diff check, and runtime navigation verification required before implementation is complete.
- **IX. Human Review for Meaningful Changes**: Pass. Human review remains a gate before merge or push.

## Project Structure

### Documentation (this feature)

```text
specs/004-animated-project-header-scroll/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

No external API contract is introduced; a `contracts/` directory is unnecessary.

### Source Code (repository root)

```text
src/
├── components/Navigation.astro   # shared header links and activation behavior
├── layouts/BaseLayout.astro      # existing immediate Home scroll restoration
└── styles/global.css             # current Home smooth/archive instant scroll rules
```

**Structure Decision**: This is a bounded behavior change in the shared Navigation component and archive scroll styling. Keep direct cross-page hash placement and Home restoration in BaseLayout unchanged; adjust only the smallest shared navigation/style surface needed to animate user-activated archive links.

## Complexity Tracking

No constitution violations or additional dependencies.
