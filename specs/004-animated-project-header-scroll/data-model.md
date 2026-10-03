# Data Model: Animated Header Scroll on Projects Archive

This feature adds no persistent or domain data. It changes how existing navigation controls are activated.

## Existing interaction entities

### Archive header link

- **Role**: A semantic navigation link in the shared header that targets an archive group or another in-page area on `/projects/`.
- **Existing attributes**: Visible label, fragment destination, and section identifier used for current-section indication.
- **Constraints**: Preserve the destination fragment, keyboard access, visible focus, accessible label, and normal navigation when enhancement code is unavailable.

### Back control

- **Role**: The left-arrow link that returns from `/projects/` to Home.
- **Existing attributes**: Home URL destination and a marker class that records return intent.
- **Constraints**: Excluded from animated in-page handling; retain immediate restoration of the saved Home scroll position.

### Archive destination

- **Role**: A section or footer area addressed by an archive header link.
- **Existing attributes**: Existing element identifier and section structure.
- **Constraints**: Keep existing IDs and ensure the destination remains visible below the sticky header.

## State transitions

- Header link activation with normal motion preference → fragment navigation with smooth scroll.
- Header link activation with reduced motion preference → fragment navigation with immediate scroll.
- Direct archive load or cross-page hash navigation → existing immediate destination placement.
- Back activation → Home and immediate restoration to the saved scroll position.
