# More Projects UI Contract

This is the behavioral contract for the Home page More Projects section.

## Project thumbnail links

- Each project has one semantic link whose target is its existing details
  destination.
- The link has an explicit accessible name identifying the project, independent
  of visible text inside poster media.
- The poster is the primary visible target. Project title and separate Details
  link are not displayed below the media.
- An animated preview is available only when that project has an existing
  animation source. Hover on a compatible fine pointer and keyboard focus may
  show that preview only when motion is allowed.
- When an animation source is unavailable or reduced motion is enabled, the
  static poster remains visible. Pointer exit or focus loss also returns to
  the poster.
- The project link and its click or keyboard activation remain fully available
  in every state, including when scripting is unavailable.
- Do not invent or require an animation source to satisfy the interaction; a
  project without one keeps its poster and operable link.
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
