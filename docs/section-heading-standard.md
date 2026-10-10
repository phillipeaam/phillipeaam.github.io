# Section headings and Home navigation

Canonical reference for shared section headings. Feature: `specs/008-section-heading-standard/`. Approved text baseline: commit `4864fab`; layout/navigation implementation requires separate human review before merge or push.

## Shared heading roles

Use `src/components/SectionHeading.astro` for Featured, Projects, Teammates, About, Experience, and the All Projects catalog introduction, and for new equivalent headings.

- Eyebrow: brief framing, with a shared 4px gap before the title.
- Title: identifies the destination; Home section headings use h2, catalog page title uses h1.
- Support: adds context in one continuous plain-text paragraph without repeating the title. It spans the available width and aligns left.
- Preserve unique title IDs and existing aria-labelledby relationships.
- Optional anchorId and aliases provide native navigation without duplicating headings. placementClass is for surrounding content spacing, not custom support alignment.

## Visual contract

At all viewport widths, keep a shared 4px gap between eyebrow and title, then a shared 4px gap between the title group and the full-width support paragraph. The title keeps its natural height; support text aligns left and wraps within the available content width. The divider and existing outer heading padding remain unchanged.

On narrow screens the same order and alignment apply: title first, then the full-width support paragraph 4px below it with natural wrapping. Long tokens wrap safely. Line-height is 24px.

The stacked title and support arrangement is used at every width. Keep the support 4px below the title; preserve internal bottom padding of 23px desktop and 20px stacked.


Outer margins may reflect distinct card/list/catalog layouts. Featured retains its 44px desktop margin; other consumers retain their established surrounding spacing. These placement differences must not change the shared heading structure or its internal spacing.

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

Contextual Contact links intentionally reach their current page's contact area. Do not rewrite /featured/ case-study routes, work-* card IDs, archive project fragments, or external recommendation URLs as Home section fragments.

## Validation and future changes

Acceptance guide: `specs/008-section-heading-standard/quickstart.md`. Record actual results in the feature validation.md, including viewport dimensions and any failed/unperformed cases. At equal viewport widths, confirm all six support paragraphs share the content left edge and span the available width; inspect desktop/tablet/mobile, short/long/unbroken text, keyboard, reduced motion, canonical/legacy links, reload/history, stale restoration intent, and no-script navigation. Manual browser zoom is out of scope by user decision.

Any future change must update this reference, explain its reason and affected consumers, rerun applicable acceptance checks, and receive human review before being treated as approved for merge/push. Adding equivalent sections must reuse the component and naming contract; a genuine exception requires documented rationale and review.

Use one continuous, full-width support paragraph directly below the title at every width. Align its text left and add a 4px gap between title and support. Do not create per-section CSS or use balanced wrapping.
