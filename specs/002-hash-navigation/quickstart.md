# Browser Validation Guide: Hash Navigation

**Feature**: [Hash Navigation](spec.md)  
**Runtime used for current-branch review**: local Astro site in Chrome at
`http://127.0.0.1:4321/`

## Prerequisites

1. Start the portfolio locally with `npm run dev` from the repository root.
2. Use a real browser at representative desktop, tablet, and mobile CSS viewport
   widths; record the actual dimensions used. The current review only had a
   desktop-sized viewport available.
3. For the investigation, use the same featured project and a fresh Home load
   for each path. Record browser/version, viewport, clicked control, resulting
   URL/hash, whether the archive top is ever visible, final target position,
   and whether any later movement occurs. Repeat the thumbnail path to check
   reproducibility; use a screen recording or timed screenshots if needed.

## Scenarios and Expected Results

| Scenario | Steps | Expected result |
|---|---|---|
| Reported thumbnail path | From a fresh Home load, click a featured project's thumbnail | Record whether it is interactive and its destination URL/hash; its project record appears directly, with no archive-top view followed by movement to the record; heading clears the sticky header |
| Text-link comparison | From a fresh Home load, activate that card's `See on all projects` link | Record its URL/hash and whether its behavior differs from the thumbnail path; target record appears directly and heading clears the sticky header |
| Direct-URL comparison | Open the exact `/projects/#<project-record>` URL obtained from either Home control | Record whether direct loading differs from click navigation; the target record appears directly and heading clears the sticky header |
| Direct project-record deep link and reload | Open the exact project-record hash observed in T002 in a fresh tab, then reload that URL | The same project record is the destination after both open and reload; no archive-top-then-scroll transition occurs and the heading clears the sticky header |
| Professional group hash from Home context | From Home context open `/projects/#professional-game` directly | Professional group is the first destination without a visible top-to-target scroll; heading clears the sticky header |
| Independent group hash from Home context | From Home context open `/projects/#independent-game` directly | Independent group is the first destination without a visible top-to-target scroll; heading clears the sticky header |
| Direct deep link | Open each category URL in a fresh tab | Matching group is the destination and its heading is unobscured |
| Reload | Reload each category URL | Matching group remains the destination and its heading is unobscured |
| Same-page Home anchor | Activate Home same-page navigation such as Projects | Existing smooth scroll remains visible and the hash identifies the section |
| Hash history | Navigate between both group hashes, then use Back and Forward | Browser history restores the expected URL and group after settling |
| No-hash history | Navigate `/projects/#professional-game` -> `/projects/` -> `/projects/#independent-game`; use Back and Forward | Hash entries restore their matching groups; returning to `/projects/` lands at the top |
| No-hash Home navigation | From Home activate `See all projects` | `/projects/` begins at the first archive group, without a hash |
| Semantics and accessible names | Inspect the featured-project thumbnail, `See on all projects`, and `Projects` controls | Each navigation control is a semantic link with a meaningful accessible name |
| Keyboard and focus | From Home, keyboard-focus and activate the featured thumbnail link, `See on all projects`, and `Projects` | Each link is operable, focus is visible, and each reaches its expected destination |
| Touch targets | At mobile width, activate each relevant navigation control by touch | Each target is usable and no adjacent control is accidentally activated |
| Reduced motion | Enable the browser/OS reduced-motion preference; use `See on all projects` and `Projects` | Cross-page and same-page navigation remain usable without forced smooth animation |
| Optional scripts unavailable | Disable JavaScript or otherwise make optional scripts unavailable; activate `See on all projects` and `Projects` | Both core links still reach their expected hash destinations |
| Responsive behavior | Repeat relevant scenarios at desktop, tablet, and mobile widths | Navigation outcomes remain correct and headings are readable below the sticky header |

## Current-Branch Browser Results

| Scenario | Desktop result | Tablet result | Mobile result |
|---|---|---|---|
| Home context to `/projects/#professional-game` | Passed by opening the exact URL from Home context; no Home link currently targets this category hash | Not tested: viewport control unavailable | Not tested: viewport control unavailable |
| Home context to `/projects/#independent-game` | Passed by opening the exact URL from Home context; no Home link currently targets this category hash | Not tested: viewport control unavailable | Not tested: viewport control unavailable |
| Reported thumbnail path | Not separately tested in the prior review | Not tested | Not tested |
| Text-link comparison | Passed; `See on all projects` reached `/projects/#wallaces-quest` directly | Not tested | Not tested |
| Direct-URL comparison for project record | Not separately recorded | Not tested | Not tested |
| Direct project-record deep link and reload | Not separately recorded; repeat using the hash observed in T002 | Not tested | Not tested |
| Direct links and reload | Passed for both group hashes | Not tested | Not tested |
| Same-page Home anchor | Passed; smooth scrolling remained visible | Not tested | Not tested |
| Back and Forward between hashes | Passed after the browser settled | Not tested | Not tested |
| No-hash `/projects/` navigation | Passed; archive began at the first group | Not tested | Not tested |
| Sticky-header clearance | Passed by visual inspection at the available desktop viewport | Not tested | Not tested |
| Keyboard/focus | Not tested | Not tested | Not tested |
| Reduced motion | Not tested | Not tested | Not tested |
| Optional scripts unavailable | Not tested | Not tested | Not tested |

The available Chrome session supplied a desktop-sized viewport without
responsive viewport controls, so tablet and mobile results are unknown. The
keyboard, reduced-motion, and optional-script checks also remain open; do not
infer passing results from the desktop pointer-based checks.

The thumbnail path is the first investigation gate. A passing text-link or
direct-URL result does not establish that clicking the thumbnail follows the
same path. Do not propose an implementation change until the exact reported
interaction is reproduced and its navigation sequence is recorded.
