# Quickstart: Project Record Validation

Use this guide after implementing the tasks. It validates data flow and visitor-visible behavior rather than prescribing implementation code.

## Prerequisites

- Node.js compatible with the current repository and dependencies installed from `package-lock.json`.
- The current feature branch with the `specs/007-project-record-model/` documents.
- Current local static assets under `public/`.

First verify the installed toolchain matches the lockfile. If it does not, run `npm ci`, then continue with the commands below.

## Build and static asset references

```powershell
npm run check
npm run check:project-assets
npm run build
```

Expected: no Astro errors, all static routes generate, and the production build completes.

`npm run check:project-assets` scans project and case data for local `/projects/` and `/images/` references and confirms each file exists under `public/`. A browser review of `/`, `/projects/`, `/featured/wallaces-quest/`, and `/featured/read-with-ello/` must not show local media 404s.

## Shared-field propagation

1. Pick an included project shown on Home, in the archive, and in a case study.
2. Temporarily change its `summary` and display name in its single project record.
3. Build and open all three surfaces.
4. Confirm each shared field uses the record value and the project's nested `caseStudy` area remains attached to it.
5. Restore the record after review.

Expected: no second edit to a page, card, or case copy is needed for the shared field.

### Propagation check recorded for this feature

For a temporary build check, the Read With Ello `name` and `summary` were changed in its canonical record to unique markers, with no edits to page or component data. The generated Home (`dist/index.html`), archive (`dist/projects/index.html`), and case-study (`dist/featured/read-with-ello/index.html`) each contained both updated values. The original record was restored after the build.

## Visibility and destinations

Review current records and temporarily check these states in the data:

| Scenario | Expected result |
| --- | --- |
| `portfolioIncluded: true` and Home placement set | Included on the selected Home surface/order |
| `portfolioIncluded: true` and archive category set | Included in the selected archive group/order |
| Included record with `archiveCategory` referenced by Experience Selected work | Explicit experience label (or canonical project name) links to `/projects/#${anchorId ?? id}`, whether or not a case study exists |
| Inclusion missing or false | No Home/archive project block, project action, case CTA, or generated case route |
| Experience reference to excluded/missing project, or included project without `archiveCategory` | Available label/name remains plain text; it has no archive link or project-specific block |
| Included record has a `caseStudy` slug and at least two stories, each with a non-empty title and framing | CTA and generated case route use that slug and its nested sections |
| `caseStudy` area omitted, missing a slug, has fewer than two stories, or any story lacks a non-empty title or framing | No case-study CTA, next-case link, or generated route |
| Case area has a slug and at least two valid stories but omits other editorial sections | Case page is generated; omitted sections have no empty labels or blocks |
| Included project has another valid action but no case study | Other declared action remains available |
| Optional field/media/action missing | No empty label, frame, or action control |

Restore modified records after review. Existing production URLs and archive hashes must remain unchanged.

## Media behavior and network requests

1. Start a local server with `npm run dev -- --host 127.0.0.1 --port 4326 --strictPort` and open Home and `/projects/` in a clean browser session.
2. Disable cache in browser developer tools and inspect the Network panel for `.gif` requests.
3. For media with `autoplayPreview: true`, confirm the GIF loads only as the preview enters the existing 75%-viewport margin. The static image stays visible until the animation is ready.
4. For media without that flag, confirm hover or keyboard focus of its project link requests the GIF; pointer leave or focus loss restores the static image.
5. Confirm no Play control is displayed. If a GIF request fails, the static image remains visible and no retry loop starts.
6. Reload with reduced motion enabled. Confirm the static image remains and no GIF request occurs in either mode.

Expected: each project follows its `autoplayPreview` choice or hover/focus behavior; reduced motion suppresses every preview request.

### Browser verification recorded for this feature

Chrome review of `/projects/#pathless` at 1440×900 confirmed no Play controls are present. Pathless and Wallace were inside the prefetch margin and requested their GIFs; the static poster remained visible until each animation was ready. With reduced motion enabled, no GIF requests occurred. In a separate browser check, setting the preview flag to false and hovering the preview caused one GIF request. Failed requests kept the static fallback visible.

## Responsive and accessibility review

Review the same route set at representative desktop, tablet, and mobile widths. Record the actual dimensions used. At each width confirm:

- project content remains legible without horizontal overflow;
- project links retain visible keyboard focus and usable hit areas;
- preview behavior does not intercept or replace project navigation;
- reduced motion and failure leave a useful static image.

The completion report should list only viewport sizes that were actually reviewed.

### Responsive review recorded for this feature

Chrome review of `/projects/` at the following viewports found no horizontal overflow and no failed local requests. The media area follows the viewport behavior declared by the record; there is no separate preview control:

| Viewport | Document width | Horizontal overflow | Local request failures |
| --- | ---: | --- | ---: |
| 390×844 | 390 px | No | 0 |
| 768×1024 | 768 px | No | 0 |
| 1440×900 | 1440 px | No | 0 |

## Model reference

See [data-model.md](./data-model.md) for fields, defaults, and relationships; [contracts/project-visibility.md](./contracts/project-visibility.md) for public visibility and destinations; [contracts/project-media.md](./contracts/project-media.md) for static fallback, preview activation, reduced motion, and media integrity behavior; and [the project record authoring guide](../../docs/project-records.md) for day-to-day edits.
