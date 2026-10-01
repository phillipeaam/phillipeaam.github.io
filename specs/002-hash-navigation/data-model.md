# Data Model: Hash Navigation

No persistent data or application data model changes are needed. The behavior
uses existing page URLs, section IDs, and browser history entries.

## Existing Navigation Concepts

- **Section hash destination**: Existing `/projects/` section IDs, including
  `professional-game` and `independent-game`, and existing project-record IDs.
- **Navigation history entry**: The browser's existing URL and hash history;
  Back and Forward remain browser-owned behavior.

## Constraints

- Do not rename or remove existing section IDs or links as part of this feature.
- A URL without a hash remains the top-of-page destination.
- No new persisted state is required by the specification.
