# Section headings and Home navigation

Canonical reference for shared section headings. Feature: `specs/008-section-heading-standard/`. Approved text baseline: commit `4864fab`; layout/navigation implementation requires separate human review before merge or push.

## Shared heading roles

Use `src/components/SectionHeading.astro` for Featured, Projects, Teammates, About, Experience, and the All Projects catalog introduction, and for new equivalent headings.

- Eyebrow: brief framing.
- Title: identifies the destination; Home section headings use h2, catalog page title uses h1.
- Support: adds context in plain text, without repeating the title. The shared component accepts a lead and continuation so the desktop line alignment is explicit and consistent.
- Preserve unique title IDs and existing aria-labelledby relationships.
- Optional anchorId and aliases provide native navigation without duplicating headings. placementClass is for surrounding content spacing, not custom support alignment.

## Visual contract

Above 960px use a flexible title column and a content-sized support column capped at 45ch, with the existing --s-8 gap. The first support line's right edge aligns with the support column's right edge. The continuation begins at the support block's left edge, and its text aligns left. Keep the lead line longer than the continuation. This is one shared component pattern, not section-specific CSS.

At 960px and below, lead and continuation flow together as a single naturally wrapping paragraph, aligned left. At 820px and below, support stacks below the title at the content left edge, with --s-3 separation and a maximum 44ch measure. Long tokens wrap safely. Line-height is 24px. Both columns can shrink without overflow.

At 820px and below, stack support below the title, aligned to the content left edge with --s-3 separation and maximum 44ch readable measure. Natural wrapping replaces authored line groups. Internal bottom padding is 23px desktop and 20px stacked.

The Case studies image supplied on 2026-10-07 showed a remaining right-side gap after the visible text. This led to the confirmed rule above: align the first line to the right edge and keep its continuation left-aligned at the block origin.

Outer margins may reflect distinct card/list/catalog layouts. Featured retains its 44px desktop margin; other consumers retain their established surrounding spacing. These placement differences must not change the support block's right edge or internal heading structure.

## Navigation contract

`src/data/homeSections.ts` owns canonical section naming; canonical and legacy IDs must be unique and mutually disjoint.

| Menu label | Canonical fragment | Native legacy aliases |
|------------|--------------------|-----------------------|
| Home | #home | #top |
| Featured | #featured | #case-studies, #work |
| Projects | #projects | #other-work |
| Teammates | #teammates | #recommendations |
| About | #about | #about-phillipe |
| Experience | #experience | — |
| Contact | #contact | — |

Desktop/mobile links and section datasets use canonical names. Cross-page Home section links prepend the Home base path. Aliases are aria-hidden elements at the same origin as their canonical target, with the shared sticky-header offset. Aliases do not create observer sections. Legacy hashes may remain visible; activating a current menu link uses its canonical hash.

Explicit recognized Home fragments override saved return intent in both loading and restoration checks. Arrival waits for layout/fonts before positioning the requested target without cross-page scroll animation. No-hash contextual Back retains saved-position restoration; avatar/name still return immediately to the fragment-free Home root. Preserve native history, existing same-page animation and reduced-motion behavior.

Contextual Contact links intentionally reach their current page's contact area. Do not rewrite /work/ case-study routes, work-* card IDs, archive project fragments, or external recommendation URLs as Home section fragments.

## Validation and future changes

Acceptance guide: `specs/008-section-heading-standard/quickstart.md`. Record actual results in the feature validation.md, including viewport dimensions and any failed/unperformed cases. Compare all six support right edges at equal desktop widths (difference <=1 CSS pixel); inspect tablet/mobile, short/long/unbroken text, enlarged text, keyboard, reduced motion, canonical/legacy links, reload/history, stale restoration intent, and no-script navigation.

Any future change must update this reference, explain its reason and affected consumers, rerun applicable acceptance checks, and receive human review before being treated as approved for merge/push. Adding equivalent sections must reuse the component and naming contract; a genuine exception requires documented rationale and review.

Desktop support uses a content-sized column anchored at the right edge. In the shared component, `supportLead` is right-aligned and `supportContinuation` is left-aligned at the same block origin; keep the lead longer than the continuation. At 960px and below the text returns to natural inline wrapping. Do not create per-section CSS or use `text-wrap: balance`. New support text must use SectionHeading and be reviewed at desktop and mobile sizes before it is added.
