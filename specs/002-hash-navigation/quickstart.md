# Browser Validation Guide: Hash Navigation

**Feature**: [Hash Navigation](spec.md)
**Runtime**: Chrome, Astro dev server at `http://127.0.0.1:4324/`, started with
`npm run dev -- --host 127.0.0.1 --port 4324`. Browser version unavailable.
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

Desktop had three captured pre-patch card runs. Tablet and mobile each have one
captured pre-patch reproduction; T002's request for three runs at each width
is not fully met.

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

Touch activation was not available through the browser control surface.
Reduced-motion preference and disabled-script behavior were not emulated; keep
these checks pending.

## Tooling Results

- `git diff --check`: passed after the final documentation update.
- `npm run check`: passed, 0 errors, 0 warnings, 2 hints (one CommonJS hint in
  `make_contact_sheets.js`, one unused `index` hint in
  `src/components/FeaturedProject.astro`).
- `npm run build`: passed; Astro generated 7 static pages.
- No automated suite was added or run.
- Human review (T013): pending.
