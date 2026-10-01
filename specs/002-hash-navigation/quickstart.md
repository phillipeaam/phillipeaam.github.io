# Browser Validation Guide: Hash Navigation

**Feature**: [Hash Navigation](spec.md)
**Runtime**: Local Astro site at `http://127.0.0.1:4321/` in Google Chrome; browser version unavailable.
**Viewports**: Default desktop width 2545 CSS px (height unavailable); explicit tablet 768x1024 and mobile 390x844 overrides. Overrides were reset after testing.

## Prerequisites

1. Start the portfolio from the repository root with `npm run dev`.
2. Test each path from a fresh Home load and record viewport, clicked control, URL/hash, first destination view, later movement, and final target position.
3. For time-sensitive movement, capture successive screenshots or scroll-position samples immediately after navigation and after settling; repeat each path three times per viewport.

## Scenarios and Expected Results

| Scenario | Steps | Expected result |
|---|---|---|
| More Projects card thumbnails | From Home, click every project card thumbnail that links to a project-record hash; include Pathless | Each matching record appears directly without first showing archive top and then moving down; each heading clears sticky header |
| Header Back restoration | From a scrolled Home position, open Pathless, then activate the archive header Back link | Home restores the earlier position without showing Home top first and then scrolling down |
| Selected work text link | From Home, activate Wallace's Quest `See on all projects` in Selected work | `/projects/#wallaces-quest` opens directly on the record |
| Direct category links | Open `/projects/#professional-game` and `/projects/#independent-game` | Each requested group is the initial visible destination; heading clears sticky header |
| Direct project link and reload | Open and reload `/projects/#pathless` and `/projects/#wallaces-quest` | Requested record remains destination and heading is unobscured |
| Hash history | Navigate between both category hashes, then Back and Forward | Each history entry restores its expected URL and section |
| No-hash history | Navigate `/projects/#professional-game` -> `/projects/` -> `/projects/#independent-game`, then Back and Forward | Hash entries restore matching sections; `/projects/` entry returns to page top |
| No-hash Home link | Activate Home `See all projects` | `/projects/` begins at the top |
| Same-page Home link | Activate Home `Projects` navigation link | Existing same-page smooth scrolling remains visible |
| Keyboard and focus | Keyboard-focus and activate thumbnail, `See on all projects`, and `Projects` links | Semantic links have meaningful names, work from keyboard, and show focus |
| Touch | At mobile width, activate relevant links by touch | Each target works without activating an adjacent control |
| Reduced motion | Enable reduced motion and use cross-page and same-page navigation | Navigation remains usable without forced smooth animation |
| Optional scripts unavailable | Disable JavaScript and activate core links | Core destinations remain reachable |
| Responsive checks | Repeat navigation checks at desktop, tablet, and mobile widths | Destinations and sticky-header clearance remain correct |

## Current Branch Evidence (2026-10-01)

| Scenario | Desktop (2545px wide) | Tablet (768x1024) | Mobile (390x844) |
|---|---|---|---|
| Pathless thumbnail final result | `/projects/#pathless`; final target top about 87.6px, header bottom 88px | Final target top about 87.6px, header bottom 72px | Final target top about 88.5px, header bottom 72px |
| Pathless thumbnail temporal result | Reproduced: first screenshot showed archive top / Professional group; later screenshot showed Pathless | Transient sequence not checked | Transient sequence not checked |
| Header Back to Home | User reproduced top-then-restore. `Navigation.astro` source has saved Home position, session restore flag, then delayed `window.scrollTo`; temporal repeat pending | Not tested | Not tested |
| Wallace image vs text link | Wallace image opens `/work/wallaces-quest/`; adjacent `See on all projects` opens `/projects/#wallaces-quest` | Not separately checked | Not separately checked |
| Category direct open and reload | Both groups opened and reloaded at matching group; heading top 126.2px (professional), 142.1px (independent), sticky header bottom 88px | Not tested | Not tested |
| Project deep link and reload | `/projects/#wallaces-quest` stayed on record after reload; target top about 103.9px, header bottom 88px | Not tested | Not tested |
| Browser Back/Forward with no-hash entry | Back returned `/projects/` at scrollY 0; Forward restored independent group at scrollY 3681 | Not tested | Not tested |
| No-hash navigation | `/projects/` began at scrollY 0 | Not tested | Not tested |
| Home same-page scrolling | `/#projects` retained smooth scrolling; settled section top about 104.1px | Not tested | Not tested |
| Keyboard/focus, touch, reduced motion, scripts disabled | Not tested | Not tested | Not tested |

### Reproduction and Cause Status

The Pathless cross-page movement is confirmed by successive screenshots: the first visible archive state was at the top, then the requested record appeared. Prior testing checked only the final URL and position, which hid the intermediate state. Do not treat tablet/mobile final-position checks as proof that their temporal sequence passes.

The archive header Back link is distinct from browser Back/Forward. The user's observed Home top-then-restore sequence is corroborated by the source: the return link sets a session restoration flag; Home reads the saved position and calls `window.scrollTo` after rendering. The cross-page anchor's initial top-to-target reposition has not yet been isolated to a source cause. Do not assume the two movements share one cause.

The three-repeat loop, timed capture, header Back temporal repetition, and keyboard/focus, touch, reduced-motion, and disabled-script checks remain open. The investigation is not complete and no patch decision has been made.

## Tooling and Validation

- `git diff --check`: passed before this temporal reproduction update; rerun after all document edits.
- Astro diagnostics via bundled Node and local Astro CLI: passed, 0 errors, 0 warnings, 2 hints.
- Production build via bundled Node and local Astro CLI: passed, 7 static pages generated.
- PowerShell PATH does not expose `npm` or `node`; direct `npm run check` and `npm run build` were unavailable. Equivalent local Astro CLI commands succeeded.
