# Browser Validation Guide: Hash Navigation

**Feature**: [Hash Navigation](spec.md)
**Runtime**: Chrome, Astro dev server at `http://127.0.0.1:4324/`, started with
`npm run dev -- --host 127.0.0.1 --port 4324`. The initial browser version was
unavailable; the isolated Chrome follow-up version and method are recorded
below.
**Viewports**: Desktop 1280x900, tablet 768x1024, mobile 390x844 CSS pixels.
These are browser viewport overrides, not physical-device tests.

## Root-Cause Capture Before Patch

The same-browser captures showed the URL and page scroll metrics already at
Pathless while the first screenshot still showed the archive's Professional
group. Later screenshots showed Pathless with the same `scrollY`. The global
stylesheet enabled `@view-transition { navigation: auto; }` and a 180 ms root
transition, which generated the visible top snapshot. The hash listener did
not call scroll APIs, the archive computed `scroll-behavior` was `auto`, and
record image dimensions reserved their layout space.

The archive header `Back` path was distinct: `Navigation.astro` stored a Home
scroll position and then restored it after two animation frames. The first
Home screenshot was at the top; a later screenshot showed the saved section.

| Pre-patch viewport | First visible state | Runtime position at first sample | Later state |
|---|---|---|---|
| Desktop 1280x900 | Professional/archive top during transition | `/projects/#pathless`, scrollY 3788, Pathless top 103.9 px, header bottom 88 px | Pathless at the same scrollY |
| Tablet 768x1024 | Professional/archive top through the first 300 ms capture | `/projects/#pathless`, scrollY 4301, Pathless top 87.6 px, header bottom 72 px | Pathless after about 1.5 s, same scrollY |
| Mobile 390x844 | Professional/archive top in the early capture | `/projects/#pathless`, scrollY 6562, Pathless top 88.5 px, header bottom 72 px | Pathless later, same scrollY |

The initial connected-browser session captured three desktop and one tablet
and mobile pre-patch card runs. An isolated Chrome CDP follow-up later completed
the three-run requirement at every viewport; see the follow-up section below.

## Post-patch Results

The patch removed the automatic root transition and its 180 ms animations. It
also made Header Back restore the saved Home position synchronously. First
destination screenshots now showed the matching record; Home return screenshots
showed the saved More Projects position directly.

### More Projects thumbnails and Wallace text link

All three Home More Projects card thumbnails were clicked at all widths. The
adjacent Wallace's Quest `See on all projects` text link was tested separately
at the same widths.

| Destination | Desktop target top / header bottom | Tablet target top / header bottom | Mobile target top / header bottom |
|---|---:|---:|---:|
| Pathless card | 103.5 / 88 px | 87.6 / 72 px | 88.5 / 72 px |
| Flui card | 104.4 / 88 px | 87.8 / 72 px | 87.7 / 72 px |
| Tabuada card | 104.2 / 88 px | 88.0 / 72 px | 88.0 / 72 px |
| Wallace `See on all projects` | 103.9 / 88 px | 87.5 / 72 px | 87.7 / 72 px |

The selected destination was the first visible record in post-patch screenshots;
the heading remained approximately 15-16 px below the sticky header.

### Direct hashes and reloads

All direct loads and reloads below landed at the requested target with the
sticky header clear of the heading.

| Hash | Desktop | Tablet | Mobile |
|---|---|---|---|
| `#professional-game` | target top 88 px; header bottom 88 px | 72 / 72 px | 72 / 72 px |
| `#independent-game` | 103.5 / 88 px | 88.0 / 72 px | 88.3 / 72 px |
| `#pathless` | 103.5 / 88 px | 87.6 / 72 px | 88.5 / 72 px |

### Return, history, and no-hash behavior

| Scenario | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header Back from Pathless | Home returned to saved Projects area, scrollY 2539 | Projects area, scrollY 3604 | Projects area, scrollY 3443 |
| Browser Back/Forward | Home position restored; Forward returns to Pathless | Same | Same |
| No-hash `/projects/` | Starts at scrollY 0 | Starts at scrollY 0 | Starts at scrollY 0 |
| No-hash history entry | Back restores `#independent-game`; Forward returns to `/projects/` at 0 | Same | Same |

### Home same-page scrolling

The existing Home `Projects` same-page anchor still has computed
`scroll-behavior: smooth`. Tablet and mobile samples moved from the Home top to
the section after the scroll settled. Desktop also reached the section after a
later browser observation; timing samples were not continuous enough to
measure the animation duration.

### Keyboard, names, and target size

- More Projects thumbnail controls are semantic `<a>` elements with names
  `View Pathless project details`, `View Flui — A Cidade das Palavras project
  details`, and `View Tabuada na Fazenda project details`.
- The Wallace link is a semantic anchor named `See on all projects`.
- At mobile width, the Pathless thumbnail link measured 327x184 CSS px; Flui
  and Tabuada also measured 327x184 CSS px. The Wallace text link measured
  about 160x44 CSS px.
- Keyboard Tab reached the Pathless thumbnail with a visible 2 px outline;
  Enter activated it and opened `/projects/#pathless`.

The initial connected-browser surface did not provide touch activation,
reduced-motion emulation, or script disabling. These checks were later completed
through isolated Chrome CDP; see the follow-up section below.

## Tooling Results

- `git diff --check`: passed after the final documentation update.
- `npm run check`: passed, 0 errors, 0 warnings, 2 hints (one CommonJS hint in
  `make_contact_sheets.js`, one unused `index` hint in
  `src/components/FeaturedProject.astro`).
- `npm run build`: passed; Astro generated 7 static pages.
- No automated suite was added or run.
- Human review (T013): pending.

## Immediate Arrival Capture Follow-up

Captured the `See all projects` activation in Chrome against the local Astro
server on 2026-10-02. The browser reported a 2560x919 CSS viewport (wide
desktop; not the previously used 1280x900, 768x1024, or 390x844 viewports).
The click action started at 09:37:53.733 UTC. A screenshot request issued
concurrently with the click captured the Home frame before navigation, so it
is not treated as the destination's first frame. The first screenshot requested
after the click completed showed the Projects archive at its top.

| Sample | URL | scrollY | First archive heading top | Sticky header bottom |
|---|---|---:|---:|---:|
| First post-navigation browser sample | `/projects/` | 0 | 126.2 px | 88 px |
| 500 ms after that sample | `/projects/` | 0 | 126.2 px | 88 px |

The first post-navigation screenshot and the 500 ms sample showed the same
heading and scroll position. The click timestamp is the start of the browser
automation click call, not a timestamp from the DOM click event itself. The
available browser surface did not export the screenshot to a repository file.
The isolated Chrome CDP follow-up below later completed T017 with event
timestamps, saved traces, and tablet and mobile coverage.

## Follow-up observations — 2026-10-02

A further post-patch browser observation used Chrome at 2560x919 CSS pixels.
The `See all projects` click call began at 2026-10-02T23:28:03.629Z. The first
available sample after navigation showed `/projects/`, `scrollY=0`, the `All
Projects` H1 top at 87 px, the first category heading top at 126.2 px, and the
sticky header bottom at 88 px. At 500 ms, URL, scroll position, and geometry
were unchanged. The browser screenshot showed the Professional archive content
at the top. The timestamp is the automation call start, not the DOM event time;
the browser API did not export a Performance trace or save the screenshot to the
repository. This observation is supplemental and does not satisfy T017/T020's
trace and responsive viewport requirements.

The same browser session activated the archive `Back` link at
2026-10-02T23:29:26.080Z. At the first available sample and again at 500 ms,
Home was at `scrollY=2451`; `#projects-title` was 357.9 px from the viewport top
and the sticky header bottom was 88 px. The sample used 2560x919 CSS pixels and
is supplemental post-patch evidence; it does not add the requested pre-patch
repetition runs.

The pre-patch source snapshot is available in commit `d781f3a`. At this point,
the connected browser API had not provided the needed emulation or trace
controls, so the listed requirements remained open. The isolated Chrome CDP
follow-up below completes T002, T008, and T017; only the human-review gates
T013/T021 remain pending.

Project checks rerun after these documentation updates (2026-10-02):

- `npm run check`: passed, 0 errors, 0 warnings, 2 hints (the existing
  CommonJS hint in `make_contact_sheets.js` and unused `index` hint in
  `src/components/FeaturedProject.astro`).
- `npm run build`: passed; Astro generated 7 static pages.
- `git diff --check`: passed.

## Chrome DevTools automation follow-up — 2026-10-03 UTC

The new runs used isolated Chrome Headless 154.0.8037.95 through the Chrome
DevTools Protocol, with a temporary profile separate from the user's Chrome
profile. The patched site used the Astro server at `http://127.0.0.1:4321/`;
the pre-patch source snapshot at commit `d781f3a` was extracted to a temporary
directory and served at `http://127.0.0.1:4322/`. CSS viewport emulation used
1280x900 desktop, 768x1024 tablet, and 390x844 mobile.

### T017/T020 — no-hash `See all projects` arrival

Each row is a separate Chrome Performance trace with screenshots enabled. The
activation time is the trace's `EventDispatch` click timestamp in microseconds
on Chrome's trace clock; each JSON also stores the automation call-start UTC
time, immediate and 500 ms measurements, and screenshot events.

| Viewport | Click timestamp (trace µs) | First sample: URL / scrollY | `All Projects` H1 top | First category H2 top | Header bottom | At 500 ms |
|---|---:|---|---:|---:|---:|---|
| 1280x900 | 45229062186 | `/projects/` / 0 | 87 px | 126.2 px | 88 px | Same URL and geometry |
| 768x1024 | 45337515510 | `/projects/` / 0 | 71 px | 104 px | 72 px | Same URL and geometry |
| 390x844 | 45344265244 | `/projects/` / 0 | 71 px | 120 px | 72 px | Same URL and geometry |

The trace and explicit first-frame and 500 ms PNGs are saved as
`artifacts/screenshots/hash-navigation/all-projects-<width>x<height>-run-1.*`.
The screenshot events are embedded in each JSON trace.

### T002/T018 — pre-patch Pathless and Header Back

The parent source commit was served separately, and its global stylesheet in
Chrome contained `@view-transition { navigation: auto; }` with the 180 ms root
animations. Pathless was activated three times at each viewport. Browser
measurements already placed the hash target below the sticky header, while the
trace screenshots show the outgoing Home frame and then the archive's
Professional group overlaid during the transition before Pathless stabilizes.

| Viewport | Runs | `scrollY` at first page sample | Pathless top / header bottom | At 500 ms |
|---|---:|---:|---:|---|
| 1280x900 | 3 | 3785 | 103.5 / 88 px | Same position |
| 768x1024 | 3 | 4251 | 88.3 / 72 px | Same position |
| 390x844 | 3 | 6397 | 88.1 / 72 px | Same position |

The traces are `pathless-prepatch-<width>x<height>-run-<1-3>.json`; each
contains its click and screenshot-event timestamps plus trace frames. First
page and 500 ms screenshots are saved alongside each trace.

The separate pre-patch Header Back journey was captured once per viewport.
Home stored its scroll position, then the first return sample showed `scrollY`
0 before the delayed restoration; at 500 ms it had returned to the saved
position.

| Viewport | Saved Home `scrollY` | First return `scrollY` | At 500 ms | Header bottom |
|---|---:|---:|---:|---:|
| 1280x900 | 2431 | 0 | 2431 | 88 px |
| 768x1024 | 3439 | 0 | 3439 | 72 px |
| 390x844 | 3331 | 0 | 3331 | 72 px |

Header Back traces and screenshots use
`header-back-prepatch-<width>x<height>-run-1.*`. Responsive archive Back
controls were opened from the menu before activation.

### T008/T019 — touch, reduced motion, and scripts disabled

- **Touch, 390x844 mobile emulation, one touch point:** Pathless, Flui,
  Tabuada, Wallace's `See on all projects`, and the mobile menu's Projects
  same-page link each activated the expected destination. The three More
  Projects card links measured 342x192.4 CSS px, Wallace's link measured
  159.6x44 px, and the Projects menu link measured 294x48 px. A touch at the
  24 px gap between Pathless and Flui hit a non-link `DIV`; the URL remained
  `/` and neither card activated.
- **Reduced motion, 1280x900, 768x1024, and 390x844:**
  `prefers-reduced-motion: reduce` matched and the root computed
  `scroll-behavior: auto`. Same-page `/#projects` scroll positions were stable
  at 500 and 1000 ms. Cross-page `/projects/#pathless` positions and geometry
  were stable immediately and at 500 ms; target/header bottoms were 103.5/88,
  88.3/72, and 88.1/72 px respectively.
- **Optional scripts disabled:** With Chrome script execution disabled,
  Pathless still opened `/projects/#pathless` at all three widths. At desktop,
  the native Projects same-page link opened `/#projects` and reached
  `scrollY=2609` after the existing CSS smooth scroll settled; its heading top
  was 130.5 px. The mobile/tablet cross-page links were tested directly because
  their menu navigation is hidden until the menu script opens it.

These checks used browser emulation and real injected mouse/touch input in the
isolated Chrome session; they are not physical-device tests. Keyboard, names,
focus indicators, and target-size measurements remain as recorded earlier.

### Current status

T002, T008, T017, and convergence tasks T018-T020 are complete. The residual
Pathless issue and its five-cycle follow-up are recorded below. T013/T021 human
review remains pending. Browser traces and screenshots are local artifacts
under the ignored `artifacts/screenshots/hash-navigation/` folder.

## Repeated Pathless navigation follow-up — 2026-10-03

The user reported a visible top-to-target movement when repeatedly clicking the
Pathless media card and returning with the archive header `Back`. The first
patch had been checked for settled target positions and the no-hash `/projects/`
link, but had not captured the first frames of these two hashed journeys.

### Residual behavior captured before correction

With the first patch still in place, an isolated Chrome Headless 154 CDP
screencast captured the Pathless media click at 1280x900. The outgoing Home
frames were at `scrollY=2431`, followed by three archive-top frames at
`scrollY=0`, and then Pathless at `scrollY=3785`. On archive-header Back, two
Home-top frames at `scrollY=0` appeared before Home returned to the saved
`scrollY=2431`. These files preserve the counterexample:

- `repeat-current-pathless-entry-frame-003.jpg` through
  `repeat-current-pathless-entry-frame-005.jpg` show the archive top.
- `repeat-current-back-frame-003.jpg` and
  `repeat-current-back-frame-004.jpg` show Home at the top.
- Frame metadata is in `repeat-current-pathless-entry-frames.json` and
  `repeat-current-back-frames.json`.

### Correction

The initial archive hash alignment and saved Home restoration now run in a
parser-blocking inline script at the end of `BaseLayout.astro`, after the
destination markup exists and before the first useful frame. It uses the
target's computed `scroll-margin-top`; the Home same-page
`scroll-behavior: smooth` rule and native links/history remain intact. The
former restore block was removed from the deferred `Navigation.astro` module.

### Five consecutive cycles after correction

At each viewport, five Pathless media-to-record → header-Back cycles were
captured as a continuous CDP screencast. On tablet and mobile the responsive
menu was opened before activating Back; mobile used touch emulation with one
touch point. No captured frame had `scrollY=0` during either leg. Each cycle
returned to the same saved Home position and Pathless target position.

| Viewport | Home saved `scrollY` | Pathless `scrollY` | Screencast frames | Frames at `scrollY=0` |
|---|---:|---:|---:|---:|
| Desktop 1280x900 | 2431 | 3785 | 134 | 0 |
| Tablet 768x1024 | 3405 | 4301 | 88 | 0 |
| Mobile 390x844 | 3287 | 6397 | 81 | 0 |

Frame files are `postpatch-five-cycle-<viewport>-frame-<nnn>.jpg`, with per
cycle ranges, timestamps, and scroll offsets in the matching
`postpatch-five-cycle-<viewport>-frames.json` files. The capture includes each
outgoing frame as well as the destination frames; destination positions switch
directly between the saved Home and Pathless scroll positions.

Final direct-hash and no-hash smoke checks after the source change:

| Viewport | `/projects/#pathless`: target top / header bottom | `scrollY` | `/projects/` no-hash `scrollY` |
|---|---:|---:|---:|
| 1280x900 | 103.5 / 88 px | 3785 | 0 |
| 768x1024 | 87.6 / 72 px | 4301 | 0 |
| 390x844 | 88.1 / 72 px | 6397 | 0 |

The Home root still computes `scroll-behavior: smooth`. Final direct-hash PNGs
are `final-pathless-1280x900.png`, `final-pathless-768x1024.png`, and
`final-pathless-390x844.png`; measurements are in `final-smoke-check.json`.

T022-T024 are complete. T013/T021 human review remains pending under
Constitution IX. These results use browser viewport/touch emulation, not
physical devices.

Final project validation after the correction:

- `npm run check`: passed with 0 errors, 0 warnings, and 2 existing hints
  (CommonJS in `make_contact_sheets.js`; unused `index` in
  `FeaturedProject.astro`).
- `npm run build`: passed; Astro generated 7 static pages.
- `git diff --check`: passed after the final spec and evidence updates.
- No automated test suite was added; the five-cycle real-browser captures
  provide the requested temporal validation.
