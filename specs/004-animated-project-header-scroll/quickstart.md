# Quickstart: Animated Header Scroll on Projects Archive

## Prerequisites

- Node.js and npm installed
- Dependencies installed from the repository lockfile

## Run locally

1. From the repository root, run `npm run dev`.
2. Open the local Home page in a browser at desktop, tablet, or mobile viewport sizes.
3. Scroll to a Home section and open **See all projects** to reach `/projects/`.

## Navigation scenarios

1. On `/projects/`, activate each in-page header link (Professional, Software, Independent, Study, and Contact when its target is present). With normal motion preferences, confirm each scroll visibly animates to the target and leaves its heading clear of the sticky header.
2. Repeat activation using keyboard focus and Enter, then touch emulation or a touch device. Confirm focus remains visible and the mobile menu closes as it does today.
3. Enable the operating system or browser reduced-motion preference and repeat. Confirm each target is reached without animated scrolling.
4. From Home, open a project hash link that leads to `/projects/#...` or open a valid archive hash directly and reload it. Confirm the destination appears immediately rather than animating from the top.
5. From a Home scroll position, open `/projects/` and activate the left-arrow Back link. Confirm Home returns directly to its previously saved position without animated scrolling.
6. On Home, use header links and confirm the existing Home smooth-scroll behavior remains unchanged.

## Required project validation before implementation is considered complete

- Run `npm run check` and `npm run build` from the repository root.
- Run `git diff --check`.
- Complete the browser scenarios above at representative desktop, tablet, and mobile widths, including reduced motion, keyboard, and touch interaction. Record only viewports actually checked.

## Validation run — 2026-10-03

- `npm run check`: passed with 0 errors and 0 warnings; Astro reported 2 existing TypeScript hints in `make_contact_sheets.js` and `FeaturedProject.astro`.
- `npm run build`: passed; all 7 static pages generated.
- `git diff --check`: passed.
- Browser widths observed: desktop 1280×720, tablet 768×1024, mobile 390×844.
- Activated archive links to Professional, Software, Independent, Study, and Contact. At desktop, a sample smooth scroll advanced from `scrollY=2` to `scrollY=3678` over 250 ms before settling. Tested keyboard Enter on Study and mobile-menu activation on tablet and mobile. Tested fragment-history Back and direct `/projects/#study-archive` entry; direct entry landed immediately with its heading below the sticky header.
- The Back arrow returned directly to the Home More Projects area without a page-top frame. In this browser run the section remained visible, though its final viewport offset differed from the pre-navigation sample by about 128 px; the Back flow itself was not changed by this feature.
- Reduced-motion behavior was verified by code inspection (`matchMedia('(prefers-reduced-motion: reduce)')` selects `auto`); the earlier browser control did not provide reduced-motion emulation. Mobile layout was checked at 390×844 with pointer-driven menu activation; a physical touch device was not available.

## Convergence follow-up — 2026-10-03

- Repeated the Home → “See all projects” → “← Back” journey in the local browser and compared the Home screenshots before departure and after return. The More Projects position was visually unchanged, so the earlier approximately 128 px drift was not reproducible in this run; no restoration code change was warranted.
- At a 390×844 browser viewport, opened the mobile menu and activated Study. The URL changed to `/projects/#study-archive`, the menu closed, and the smooth scroll settled with the destination 88 px below the top (72 px header plus 16 px spacing).
- The in-app browser used during the first follow-up exposed viewport resizing and click activation, but no reduced-motion override or touch-event emulation. The code path was inspected while those two runtime checks remained pending; they were later completed through an isolated Chrome DevTools Protocol session below.
- Re-ran the pending checks in an isolated headless Chrome through the DevTools Protocol. With `prefers-reduced-motion: reduce` confirmed true, all five header links updated to the correct hash and each scroll position was stable between 100 ms and 600 ms after activation. This confirms immediate navigation for Professional, Software, Independent, Study, and Contact.
- Enabled touch emulation at 390×844 with one touch point. A touch opened the menu; a touch on Study navigated to `/projects/#study-archive` and closed the menu. After scrolling settled, the Study heading was 87.5 px from the top with a 72 px sticky header and an 88 px anchor offset. T007 and T008 are now complete.
