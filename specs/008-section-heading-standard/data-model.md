# Data Model

No database or new persistence.

## Section destination

Fields: id (fragment without #), label, legacyIds.

| id | label | legacyIds |
|----|-------|-----------|
| home | Home | top |
| featured | Featured | case-studies, work |
| projects | Projects | other-work |
| teammates | Teammates | recommendations |
| about | About | about-phillipe |
| experience | Experience | empty |
| contact | Contact | empty |

Constraints: "Canonical IDs MUST be unique." "Legacy IDs MUST be unique and MUST NOT collide with canonical IDs." "Each legacy ID MUST resolve to exactly one canonical destination." "Aliases MUST NOT create separate observer sections." Labels retain approved wording.

## Heading

Fields: eyebrow, title, support, titleId, titleLevel, optional anchorId/aliases, placementClass.

Constraints: "At every viewport width, the eyebrow and title MUST have a shared 4px gap, and the title group and full-width support paragraph MUST have a shared 4px gap." "The title group MUST retain its natural height." "Support text MUST align left and wrap within the available width." "The paragraph MUST expose one accessible name for the complete text." "Balanced wrapping MUST NOT be used." "Title IDs MUST remain unique and preserve existing accessible relationships." "Home titles MUST use h2; All Projects MUST use h1." "Placement classes MUST NOT override support alignment."

## State transitions

Canonical and legacy arrivals resolve to the same active identity. Recognized explicit Home hash overrides stored return intent. No-hash Back restores saved position; identity clears intent and returns immediately to root. Unknown fragments do not map to fabricated destinations. Existing sessionStorage keys remain unchanged.
