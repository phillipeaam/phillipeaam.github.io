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

Fields: eyebrow, title, supportLead, supportContinuation, titleId, titleLevel, optional anchorId/aliases, placementClass.

Constraints: "Above 960px, supportLead MUST align its right edge with the support column; supportContinuation MUST begin at the support block's left edge and align left." "The lead MUST be wider than the continuation at the supported desktop layouts." "At/below 960px, lead and continuation MUST flow together as natural inline text; at/below 820px support MUST stack below the title." "The paragraph MUST expose one accessible name for the complete text; visual spans MUST not be announced twice." "Balanced wrapping MUST NOT be used." "Title IDs MUST remain unique and preserve existing accessible relationships." "Home titles MUST use h2; All Projects MUST use h1." "Placement classes MUST NOT override support-column alignment."

## State transitions

Canonical and legacy arrivals resolve to the same active identity. Recognized explicit Home hash overrides stored return intent. No-hash Back restores saved position; identity clears intent and returns immediately to root. Unknown fragments do not map to fabricated destinations. Existing sessionStorage keys remain unchanged.
