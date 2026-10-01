# Implementation Plan: Hash Navigation

**Branch**: `fix/cross-page-anchor-scroll` | **Date**: 2026-10-01 | **Spec**: [spec.md](spec.md)

**Input**: User-reproduced cross-page anchor and Home return scroll; investigate causes and plan the smallest supported fix without redesigning navigation or visuals.

## Summary

The specified primary control is the Pathless project card thumbnail in Home's More Projects section, navigating to `/projects/#pathless`, initially seeing the archive top, then visibly moving to the Pathless record. A second confirmed symptom is the all-projects page's header `← Back` link returning to Home at the top and then scrolling to the position saved before departure. The Pathless More Projects card and Wallace's Quest Selected work link are separate controls; the latter is only a comparison path. The first was missed by checking only final URL and position; the second is tied by source evidence to Navigation's session-storage restoration flag and subsequent scripted scroll. The investigation must capture both sequences over time, distinguish native browser Back/Forward from the header return link, and identify the cause of the cross-page anchor reposition before any patch proposal. No implementation change is included in this plan update.

## Technical Context

**Language/Version**: Astro project using TypeScript and CSS; exact runtime versions are defined by `package.json` and lockfile.  
**Primary Dependencies**: Astro 5.13.x.  
**Storage**: N/A.  
**Testing**: Real-browser investigation in Chrome, beginning with the exact thumbnail-to-record path; no automated suite added or run.
**Target Platform**: Responsive portfolio in desktop, tablet, and mobile browsers.
**Project Type**: Static portfolio website.  
**Performance Goals**: Target section is the first visible destination; no visible top-to-target scroll.  
**Constraints**: Preserve native link and history behavior, sticky-header clearance, no-hash top start, and Home same-page smooth scrolling. No redesign or routing changes.  
**Scale/Scope**: Existing page and section IDs only; no new data or routes.

## Constitution Check

- **I. Evidence-First Portfolio Claims**: Pass; no content claims are changed.
- **II. Shared Patterns Before Project-Specific Variants**: Pass; no new variants are proposed.
- **III. Preserve Approved Visual Systems**: Pass; no visual changes are proposed.
- **IV. Accessibility Is Part of Completion**: Applicable navigation controls must be semantic links with meaningful accessible names, keyboard operation and visible focus, reduced-motion support, and usable touch targets. T008 checks these controls at desktop, tablet, and mobile widths, including touch activation and core navigation with optional scripts unavailable.
- **V. Progressive Enhancement**: Pass with a documented enhancement boundary; core links remain usable without optional JavaScript, while restoring the exact prior Home position from the header link is an enhancement. Without the script, the link still reaches Home. T008 verifies core navigation with optional scripts unavailable.
- **VI. Responsive Verification**: Partial; thumbnail destination and sticky-header clearance were checked at 2545px-wide desktop, 768×1024 tablet, and 390×844 mobile. Other responsive criteria remain open. Report only viewports actually tested.
- **VII. Small, Scoped Changes**: Pass; the issue is reproduced, but no source change is proposed until both visible sequences and their causes are documented.
- **VIII. Validation Before Completion**: Tasks require real-browser acceptance checks at desktop, tablet, and mobile widths, plus `git diff --check`, Astro diagnostics, and a production build.
- **IX. Human Review for Meaningful Changes**: Task T013 is the final human review gate for any source change.

**Gate**: The Pathless thumbnail path has reproduced with an initial archive-top screenshot followed by the Pathless destination. The header `← Back` link also exhibits an initial Home-top view followed by restoration of the prior scroll position; the script's session-storage flag and `scrollTo` are identified, while the cross-page anchor's first-paint cause is not. Before patching, repeat and time both flows, trace target/layout readiness and return-restoration behavior at desktop/tablet/mobile, and document the smallest supported fix. No implementation edits are part of this documentation workflow.

## Project Structure

### Documentation (this feature)

```text
specs/002-hash-navigation/
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Source Code (repository root)

No source files are changed by this plan. Relevant inspected paths:

```text
src/
├── components/Navigation.astro
├── layouts/BaseLayout.astro
├── pages/projects/index.astro
└── styles/global.css
astro.config.mjs
```

**Structure Decision**: No implementation structure change. First establish the exact rendered Pathless card thumbnail control in More Projects, its destination URL/hash, and the timing of URL change, first paint, target positioning, and any later scroll. Compare it with Wallace's Quest `See on all projects` text link in Selected work and the direct Pathless URL; they are separate controls with different record targets. Only after the reported sequence reproduces should investigation trace the responsible browser/layout/script behavior and consider a minimal source change. If the sequence does not reproduce, record that outcome and do not invent a patch.

## Root Cause and Current Finding

The Pathless thumbnail path reproduced: the first screenshot showed the archive top and a later screenshot showed the target record at `/projects/#pathless`. The project page uses `scroll-behavior: auto` and existing target scroll margins; `Navigation.astro`'s hash listener only updates active navigation, so it is not yet the established cross-page root cause. The header `← Back` path is directly connected to a session-storage restoration flag and a delayed `window.scrollTo` in `Navigation.astro`. Source trace should now focus on timing/layout factors that cause the anchor to move after initial paint, and on the minimum change that avoids a visible two-step return without disrupting Home's same-page smooth scrolling or browser history.

The initial top-to-target movement is reproduced by successive browser screenshots. Exact timing and the responsible layout/anchor sequence remain to be isolated; candidate explanations stay hypotheses until measured. The Home restoration script is an evidenced contributor to the second movement. See [research.md](research.md) and [quickstart.md](quickstart.md) for the investigation record.

## Implementation Decision

The behavior is reproduced, so a minimal change may be needed. This documentation-only plan update does not select or implement a fix yet. First complete temporal capture and root-cause tracing for both the cross-page hash and the header Back restoration, then decide the smallest change that preserves Home smooth scrolling, native link/history behavior, direct/reload destinations, and sticky-header clearance.

## Complexity Tracking

No Constitution violations or implementation complexity added.
