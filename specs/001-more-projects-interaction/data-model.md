# Data Model: More Projects Thumbnail Interaction

This feature introduces no persisted data. It uses existing project records and
their media metadata.

## Project thumbnail link

Represents the accessible link rendered for a Home supporting project.

| Field | Source | Requirement |
|---|---|---|
| Project identity | Existing project record name | Required; supplies a stable, human-readable accessible name. |
| Destination | Existing project record and archive route | Required; must preserve the existing details destination. |
| Home curation | Existing `showOnHome` and `homeOrder` fields | Required for Home inclusion and ordering; preserved when reading enriched inventory records. |
| Poster source | Existing project media data | Required fallback and initial display. |
| Animated preview source | Existing project media data where available | Optional; used for hover/focus preview and omitted safely when unavailable. |

## Interaction instruction

Represents utility-row guidance selected by the browsing context's pointer
capability.

| State | Guidance |
|---|---|
| Fine pointer with hover | Communicates hover-to-preview and click-to-open. |
| No hover / touch-oriented | Communicates tap-to-open and does not mention hover. |

## Preview state

Each thumbnail has a static poster state and may have an animated preview state.

| Transition | Result |
|---|---|
| Pointer enters on compatible fine-pointer device | Show animated preview if motion is allowed and a preview exists. |
| Keyboard focus enters thumbnail link | Show animated preview if motion is allowed and a preview exists. |
| Pointer leaves or keyboard focus leaves | Return to poster. |
| Reduced-motion preference is enabled | Show/retain poster and suppress preview. |
| Preview source is missing or fails | Retain poster and keep link activation available. |

The project listing link remains the existing See all projects destination. No
new project fields or identifiers are introduced by this feature.
