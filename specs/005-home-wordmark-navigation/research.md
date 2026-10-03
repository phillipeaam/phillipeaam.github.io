# Research: Home Navigation from Header Identity

## Decision 1: Use the existing shared header as the single source of behavior

- **Decision**: Implement the avatar and name links in `src/components/Navigation.astro`, which is already the shared site header.
- **Rationale**: The component renders the avatar/name wordmark across the site and already derives the Home URL from Astro's configured base path. One shared change covers the Home, archive, and case-study contexts without page-specific branches.
- **Alternatives considered**: Add per-page links (duplicates behavior and risks inconsistent destinations); create a new identity component (unneeded abstraction for this bounded change).

## Decision 2: Keep the identity as ordinary semantic links and scope immediate return behavior to those links

- **Decision**: Both visible parts must be independently activatable semantic links to the Home root. Any interception required to bypass a saved Home scroll position or smooth-scroll must be limited to these identity links; ordinary browser navigation remains the fallback.
- **Rationale**: This meets the requested click behavior while preserving keyboard and assistive-technology navigation and progressive enhancement. The shared header currently sets a restore flag for the contextual “Back” links, and global CSS enables smooth scrolling. Those behaviors need to remain distinguishable so the identity link always opens at the beginning without changing the unrelated Home menu behavior.
- **Alternatives considered**: Change all global scrolling to instant (would affect unrelated in-page navigation); alter every contextual “Back” link (outside this feature); use a JavaScript-only control (would lose ordinary link behavior).

## Decision 3: No new data entity or external contract

- **Decision**: Treat both links as presentation/navigation controls sharing the existing Home root; add no stored data, route, or external interface.
- **Rationale**: The feature changes how the existing identity is activated and does not add domain data.
- **Alternatives considered**: None applicable.
