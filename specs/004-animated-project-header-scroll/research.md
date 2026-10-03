# Research: Animated Header Scroll on Projects Archive

## Decision: Animate only an explicit in-page header activation on `/projects/`

- **Decision**: Preserve the archive's instant default scroll behavior for document entry and hash destinations. Apply smooth motion only when a visitor activates an in-page archive header link, and use immediate movement when reduced motion is enabled.
- **Rationale**: `src/styles/global.css` sets global smooth scrolling but explicitly sets `html:has(.archive-content)` to `scroll-behavior: auto`. Existing hash-navigation requirements and `BaseLayout.astro` use immediate positioning for direct project hashes and Home scroll restoration. Changing the archive-wide rule to smooth would risk animating direct hash entry and conflict with the established navigation behavior.
- **Alternatives considered**:
  - Change the archive-wide scroll rule to smooth: rejected because it also changes direct hash navigation and page-entry behavior.
  - Keep all archive navigation instant: rejected because header in-page links are explicitly requested to animate.
  - Add a new dependency: rejected because the browser and existing project styles provide the required behavior.

## Decision: Keep the Back arrow outside the animated in-page behavior

- **Decision**: Preserve the existing Back link destination and Home scroll restoration flow. The Back link is not an in-page archive link and remains an ordinary direct navigation.
- **Rationale**: The link currently has no section-navigation marker and its click records the return intent; the parser-time layout code restores Home's saved scroll position immediately. This behavior is explicitly required by the spec.
- **Alternatives considered**:
  - Animate all navigation links indiscriminately: rejected because it would alter the Back journey and conflict with the specification.

## Decision: Retain ordinary link and history semantics

- **Decision**: Keep archive navigation controls as semantic fragment links, operable by pointer, keyboard, and touch, with meaningful visible focus. If activation behavior is enhanced with scripting, retain fragment URL updates and browser history behavior.
- **Rationale**: This fits the current navigation markup, preserves progressive enhancement, and keeps the destination addressable.

## Existing project facts

- Home has `scroll-behavior: smooth`; the archive has an explicit `scroll-behavior: auto` rule in `src/styles/global.css`.
- The shared `Navigation.astro` renders desktop and mobile header links. Archive group links carry `data-section`; the Back link does not.
- The `/projects/` route marks archive content with `.archive-content` and each destination group with `.archive-group`.
- `BaseLayout.astro` immediately places valid archive hashes and restores the saved Home scroll position on Back navigation.
- The global reduced-motion media rule disables smooth scrolling.
