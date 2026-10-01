# Implementation Plan: Hash Navigation

**Branch**: `fix/cross-page-anchor-scroll` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: User request to plan cross-page navigation behavior; inspect current runtime and avoid implementation changes if the behavior is already satisfied.

## Summary

The reported journey is clicking a featured project's thumbnail on Home, navigating to that record on the all-projects page, and seeing the archive top before a visible scroll down to the record. Prior desktop validation covered the separate `See on all projects` text link, not this exact thumbnail journey. The first plan stage therefore verifies the rendered thumbnail's actual link behavior and attempts to reproduce the report before diagnosing a cause or proposing a patch. The two category hashes, direct/reload, hash history, no-hash navigation, and Home same-page smooth scrolling passed on desktop. Tablet, mobile, keyboard/focus, reduced-motion, and optional-script behavior remain unverified.

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
- **V. Progressive Enhancement**: Pass; the observed behavior relies on ordinary URL hashes, CSS, and browser history. No additional script is warranted.
- **VI. Responsive Verification**: Open validation item; tablet and mobile were not available in the browser session. Any implementation change remains incomplete until applicable checks pass at desktop, tablet, and mobile. Report only viewports actually tested.
- **VII. Small, Scoped Changes**: Pass; no source change is recommended before the reported user journey is reproduced and its cause is evidenced.
- **VIII. Validation Before Completion**: Tasks require real-browser acceptance checks at desktop, tablet, and mobile widths, plus `git diff --check`, Astro diagnostics, and a production build.
- **IX. Human Review for Meaningful Changes**: Task T013 is the final human review gate for any source change.

**Gate**: Existing no-change evidence covers the text-link path at desktop only, not the reported thumbnail path. Investigate and record the exact user journey before deciding whether any patch is justified. Tablet, mobile, and accessibility checks remain untested and cannot be represented as passed. If a patch becomes necessary, applicable checks at all three viewport classes are required completion gates.

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

**Structure Decision**: No implementation structure change. First establish the exact rendered thumbnail control, its destination URL/hash, and the timing of URL change, first paint, target positioning, and any later scroll. Compare it with the existing `See on all projects` text link and direct deep links. Only after the reported sequence reproduces should investigation trace the responsible browser/layout/script behavior and consider a minimal source change. If the sequence does not reproduce, record that outcome and do not invent a patch.

## Root Cause and Current Finding

The exact reported thumbnail path has not yet been verified. Prior desktop evidence shows the `See on all projects` text link succeeds, but that is not a substitute for activating the featured-project thumbnail. Repository evidence shows global smooth scrolling at `src/styles/global.css:51`, but the Projects archive overrides it to `auto` at line 52. Existing group and record scroll margins account for the sticky-header offset (lines 20, 64, 364, and 368). `Navigation.astro:184-211` observes and responds to hashes for active-navigation state; it does not make a second scroll. No Astro client router or View Transitions integration is configured in the inspected page shell or `astro.config.mjs`. These findings narrow possible causes but do not establish the cause of the reported thumbnail flow.

The investigation must first observe the reported thumbnail path directly and distinguish an initial top-of-page paint from a later layout-driven reposition or explicit scroll. Global smooth scrolling is a possible explanation in builds without the archive override, but the override means this alone does not explain the current branch. The later scroll may also relate to when the target becomes available, layout changes, or route/hash-reactive behavior; these are hypotheses to check only if the exact flow reproduces, not conclusions. See [research.md](research.md) and [quickstart.md](quickstart.md) for current evidence and the investigation protocol.

## Implementation Decision

No implementation change is currently justified. First test and document the exact thumbnail journey at desktop, tablet, and mobile; compare it with the text-link and direct-URL paths; and capture enough timing and URL evidence to explain any visible movement. If it reproduces, trace the cause and propose the smallest in-scope fix supported by evidence. If it does not reproduce, document the tested conditions and make no code change. Do not add a scroll handler, routing transition, or alternate anchor offset without a reproducing case. If the only proposed fix requires routing redesign or other out-of-scope behavior, revise the plan before implementation.

## Complexity Tracking

No Constitution violations or implementation complexity added.
