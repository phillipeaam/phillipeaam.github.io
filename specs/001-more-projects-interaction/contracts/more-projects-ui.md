# More Projects UI Contract

This is the behavioral contract for the Home page More Projects section.

## Project thumbnail links

- Each project has one semantic link whose target is its existing details
  destination.
- The link has an explicit accessible name identifying the project, independent
  of visible text inside poster media.
- The poster is the primary visible target. Project title and separate Details
  link are not displayed below the media.
- Hover on a compatible fine pointer and keyboard focus preview the matching
  animated media when a preview exists and reduced motion is not requested.
- Pointer exit or focus loss returns to the poster. Reduced-motion preference
  suppresses animation.
- The static poster and ordinary link remain usable without optional scripting.
- Focus remains visible; link activation works with keyboard and touch.

## Utility row

- Appears immediately above the project thumbnails.
- Left side shows hover-to-preview and click-to-open guidance for fine-pointer
  contexts, and tap-to-open guidance for no-hover contexts.
- Touch/no-hover guidance does not mention hover.
- Right side is the existing See all projects link and retains its destination.

## Scope and presentation

- Preserve the Home page's existing visual identity and shared editorial
  patterns.
- Do not redesign Featured Work, Projects, Header, or Footer.
- Do not add cards, pills, or decorative containers.
- Keep the row and links usable at desktop, tablet, and mobile sizes.
