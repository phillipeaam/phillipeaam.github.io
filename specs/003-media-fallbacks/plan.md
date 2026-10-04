# Implementation Plan: Reliable Animated Media Fallbacks

**Branch**: `feature/003-media-fallbacks` | **Date**: 2026-10-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-media-fallbacks/spec.md`

## Summary

Keep a project-specific WebP first-frame image visible until its matching GIF
preview has loaded successfully and is ready to show. Preserve the existing
preview triggers and reduced-motion behavior, reuse the relevant image assets
from `d10b31a0d5eefbbc5dfd1a58d65c474513af3842`, update every live reference,
and record the durable media rules in a media guide. Amend the constitution
separately to state the general fallback and reduced-motion principle.

## Technical Context

**Language/Version**: Astro 5.13.5, TypeScript 5.9.2, browser JavaScript
**Primary Dependencies**: Astro; native HTML image elements and browser motion-preference support
**Storage**: Static files under `public/`; media metadata in `src/data/projects.ts` and `src/data/cases.ts`
**Testing**: `git diff --check`, `npm run check`, `npm run build`, and manual media-state/reduced-motion review per [quickstart.md](quickstart.md). No new test suite is specified.
**Target Platform**: Static portfolio served to desktop and mobile web browsers
**Project Type**: Astro static web application
**Performance Goals**: Record scroll performance on all six generated content page routes and compare routes with dropped frames under the same conditions with preview GIF requests blocked. The build also emits a redirect document at `/experience/`; cover it through the Experience section in the Home recording instead of treating it as a separate scroll page. Defer autoplay GIF requests until their media areas approach the viewport to avoid eager offscreen transfers; report network/decode savings separately from any FPS outcome. The static fallback must remain visible until animation is ready.
**Constraints**: Preserve GIF sources and existing hover/focus triggers; autoplay scheduling may wait until the media area approaches the viewport; selected static assets from the historical commit use WebP; honor reduced-motion preferences; preserve a fallback when `IntersectionObserver` is unavailable; avoid unrelated image migration or presentation redesign.
**Scale/Scope**: The avatar and project media/references represented in the specified commit, plus the shared preview component, one media guide, and the general constitution principle.

## Constitution Check

### Gate before research

- **I. Evidence-First Portfolio Claims**: Pass. The change updates project imagery and descriptions only; alternative text must describe the matching media.
- **II. Shared Patterns Before Project-Specific Variants**: Pass. Use the existing shared `ProjectMediaPreview` and media data contract.
- **III. Preserve Approved Visual Systems**: Pass. Keep current aspect ratios, fit behavior, and presentation; add only the two-state media loading behavior.
- **IV. Accessibility Is Part of Completion**: Pass with a planned principle-level amendment. Reduced motion continues to display the static fallback; keyboard and semantic behavior remain intact.
- **V. Progressive Enhancement**: Pass. The static image is present in server-rendered HTML and remains usable if scripting is unavailable.
- **VI. Responsive Verification**: Pass. Validate the existing media contexts at representative desktop, tablet, and mobile sizes.
- **VII. Small, Scoped Changes**: Pass. Reuse only the specified media changes and necessary references; do not migrate unrelated images.
- **VIII. Validation Before Completion**: Pass as a delivery requirement. The implementation phase will run `git diff --check`, `npm run check`, `npm run build`, and the applicable runtime/visual checks.
- **IX. Human Review for Meaningful Changes**: Pass. Visual media and constitution changes require an explicit human review checkpoint before they are treated as approved for merge or push.

No gate violations require a complexity exception.

### Gate after design

All principles remain satisfied by the selected design. The constitution amendment
will be a separately reviewable change using the repository's Spec Kit
constitution workflow; it will add only the general static-fallback and
reduced-motion principle. Detailed format and frame-generation rules belong in
the new media guide.

## Research Summary

See [research.md](research.md) for the commit inventory, asset selection,
component behavior, and browser image-readiness findings.

## Project Structure

### Documentation (this feature)

```text
specs/003-media-fallbacks/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── media-preview.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ProjectMediaPreview.astro
│   ├── Navigation.astro
│   └── SupportingProject.astro
├── data/
│   ├── projects.ts
│   └── cases.ts
└── styles/
    └── global.css

public/
├── images/identity/
└── projects/{ello-learn,ello-read,pathless,wallace-quest}/

docs/
└── media-guidelines.md

.specify/memory/
└── constitution.md
```

**Structure Decision**: Keep the feature in the current Astro application. The
shared image behavior belongs in `ProjectMediaPreview.astro`; project-specific
asset paths and descriptions remain in the existing data modules. Static assets
remain in `public/`. The media guide belongs in `docs/`, and the general
principle amendment belongs in the existing constitution file.

## Design Decisions

1. Render the static fallback as the initial image. Load the animated source
   separately only when existing autoplay, hover, or keyboard-focus behavior
   requests a preview and reduced motion is not requested. Reveal the animation
   only after successful load/readiness; keep the fallback on failure or when
   motion is reduced. This prevents a `src` swap from blanking the only visible
   image during network loading.
2. Keep the static fallback in the HTML output so the primary visual remains
   available without JavaScript. Use client-side behavior only for optional
   animation, as required by progressive enhancement.
3. Preserve the existing poster dimensions, `contain`/`cover` behavior, alt
   text meaning, and preview triggers. Replace `showAnimatedDirectly` bypasses
   with the same shared loading and motion contract, after confirming all call
   sites.
4. Reuse the matching WebP additions and PNG replacements from the historical
   commit. The commit has 12 WebP additions and 9 PNG removals. Do not apply the
   entire commit because its code changes must be adapted to current callers and
   the media-loading requirement is stronger.
   Do not migrate unrelated static imagery. The removed
   `read-with-ello-book.png` has no current source reference and no replacement;
   remove this specific historical orphan as requested by the user.
5. Add `docs/media-guidelines.md` for WebP static assets, mandatory GIF
   first-frame fallbacks, naming/reference updates, and reduced-motion behavior.
   Update the constitution in a separate Spec Kit constitution amendment to
   cover the general fallback principle only.
6. Profile scroll performance on all six generated content page routes with one
   consistent browser/device setup, including Experience as a section in the
   Home route. `/experience/` produces a redirect document and is not a
   separate content page to profile. Record dropped and partially presented frame totals for the
   baseline scroll on every route. For a route with dropped frames, record
   three scrolls with project preview GIFs allowed and three with them blocked,
   including the dropped-frame count for every recording. Then record a
   decision on whether
   to make a media-specific change, make no performance change, or investigate
   separately. The paired runs show only a small FPS signal, but browser network
   measurements confirm that large autoplay GIFs are requested before users
   reach their media areas. Add a narrow IntersectionObserver gate with a
   prefetch margin of approximately 75% of the viewport height; validate the
   actual no-scroll request reduction. Any in-scope change must preserve the
   fallback, reduced-motion, and visible hover/focus-preview behavior. Do not
   claim an FPS gain unless repeated frame measurements support it.

## Complexity Tracking

No constitution gate violations or additional project layers are introduced.
