# Data Model: Home Navigation from Header Identity

This feature introduces no persisted or domain data.

## Navigation Controls

| Control | Destination | Constraints |
|---|---|---|
| Header avatar link | Configured Home root | Semantic, keyboard operable, accessible name, visible focus, normal-link fallback |
| Header name link | Same configured Home root | Semantic, keyboard operable, accessible name, visible focus, normal-link fallback |

Both controls represent the same Home starting point. Activating either must bypass saved Home-position restoration and arrive without smooth scrolling. Existing navigation menu items and their destinations are not data owned by this feature and remain unchanged.
