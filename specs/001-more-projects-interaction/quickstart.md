# Quickstart: More Projects Thumbnail Interaction

## Prerequisites

- Node.js and npm installed.
- Dependencies installed from the repository lockfile (`npm ci`).

## Automated validation

From the repository root, run:

```sh
npm run check
npm run build
```

Expected result: Astro diagnostics report no feature-related errors and the
production build completes successfully.

## Runtime and accessibility review

1. Start the site with `npm run dev` and open the Home page.
2. At a fine-pointer desktop viewport, hover each More Projects thumbnail.
   Confirm only its matching preview appears; move away and confirm the poster
   returns. Click and verify the existing details destination.
3. Navigate through the thumbnails using only a keyboard. Confirm visible focus,
   matching preview on focus, poster restoration on blur, and activation of the
   same existing destination.
4. Enable the operating system or browser reduced-motion preference. Confirm
   hover and focus leave the static poster visible while links remain usable.
5. At a touch/no-hover viewport, confirm the row says tap-to-open without
   mentioning hover and each thumbnail opens directly when tapped.
6. Confirm each thumbnail link has a project-specific accessible name even if
   poster content has no visible text. Confirm titles and separate Details links
   are absent below media.
7. Confirm See all projects appears in the utility row above the thumbnails and
   reaches the existing complete project listing.
8. Review representative desktop, tablet, and mobile widths. Confirm the row and
   thumbnails remain readable and reachable without horizontal scrolling, and
   Featured Work, Projects, Header, and Footer have not been redesigned.
9. Where practical, disable client-side scripting and confirm core thumbnail
   and See all projects navigation still work.

Record only viewport and input-mode checks actually performed. This guide does
not claim that these checks have already been run.
