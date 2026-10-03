# Implementation Plan: Home Navigation from Header Identity

**Branch**: `feature/005-home-wordmark-navigation` | **Date**: 2026-10-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-home-wordmark-navigation/spec.md`

## Summary

Make the shared header avatar and adjacent name independently clickable links to the portfolio Home root. Keep their links usable without JavaScript, preserve keyboard focus visibility, and ensure this path arrives at the top immediately without the existing cross-page Home-position restoration or smooth-scroll behavior. Keep the change localized to the shared navigation and its existing scroll restoration behavior.

## Technical Context

**Language/Version**: Astro components with TypeScript in component scripts; project uses Node.js ES modules.

**Primary Dependencies**: Astro 5 (`package.json`); no new dependency is required.

**Storage**: No new persistent data. Existing session storage used by shared navigation must not restore an old Home position for identity-link navigation.

**Testing**: `npm run check`, `npm run build`, `git diff --check`, and manual navigation/accessibility checks, as required by the repository constitution.

**Target Platform**: Responsive portfolio website in current desktop and mobile browsers.

**Project Type**: Static Astro website with shared `.astro` components and global CSS.

**Performance Goals**: Home navigation begins immediately on activation; no custom transition or added runtime dependency.

**Constraints**: Preserve normal link navigation, the existing Home menu item behavior, header visual identity, visible focus, and mobile usability. A prior saved Home scroll position must not override the identity link destination.

**Scale/Scope**: One shared header identity on pages that render `src/components/Navigation.astro`; no data migration, new routes, or external service.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Evidence-First Portfolio Claims**: Pass. No public portfolio claims or project content change.
- **II. Shared Patterns Before Project-Specific Variants**: Pass. The behavior belongs in the existing shared header.
- **III. Preserve Approved Visual Systems**: Pass. The existing header appearance remains; only link affordance and appropriate focus treatment are in scope.
- **IV. Accessibility Is Part of Completion**: Pass with required keyboard operation, semantic links, accessible names, visible focus, and responsive touch targets.
- **V. Progressive Enhancement**: Pass. Both destinations use ordinary links and remain functional without optional JavaScript.
- **VI. Responsive Verification**: Pass with representative desktop, tablet, and mobile evaluation recorded only for viewports actually checked.
- **VII. Small, Scoped Changes**: Pass. Scope is limited to the shared identity markup and the interaction needed to prevent saved-position restoration for this path.
- **VIII. Validation Before Completion**: Pass as a delivery requirement; run `git diff --check`, Astro diagnostics, a production build, and appropriate runtime/visual checks before reporting implementation complete.
- **IX. Human Review for Meaningful Changes**: Pass as a review requirement before merge or push; implementation and validation do not constitute approval.

**Post-design gate**: Pass. The design adds no data, service, framework, or route and satisfies the accessibility, progressive enhancement, responsive verification, and scoped-change requirements above.

## Project Structure

### Documentation (this feature)

```text
specs/005-home-wordmark-navigation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

No external contract is introduced, so no `contracts/` document is needed.

### Source Code (repository root)

```text
src/
├── components/
│   └── Navigation.astro  # Shared header identity and navigation behavior
└── styles/
    └── global.css        # Existing global scroll behavior and focus styles, if adjustment is needed
```

**Structure Decision**: This is a small shared-header change in the existing Astro application. Implement within `Navigation.astro` and touch global CSS only if the immediate-navigation behavior cannot be scoped adequately to identity activation in the component.

## Complexity Tracking

No constitution violations or additional architectural complexity.
