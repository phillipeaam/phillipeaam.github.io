# Project Record (Ficha) Model

This guide describes the portfolio's shared project ficha as it exists in the current feature work. A project is authored once in `src/data/projects.ts`; public pages read the fields they need from that record. The record is not a class template that is copied per page: it is the canonical content object for one project.

## Catalog integration — 2026-10-05

The merge into feature 006 preserves the canonical `projectRecords` model and migrates the reviewed catalog copy into each record. There is no separate `catalogEditorialById`, facts map, narrative map, or per-page media-source allowlist. Home, archive, cases and Experience resolve the same records; shared summary, context, type, period and contribution now use the reviewed values. Case-specific stories, hero presentation and documented boundaries remain in `caseStudy`.

- `workContext` stores the previously verified professional/independent/study facet.
- `technologies` stores verified technology facts and is not inferred from product tags. For the portfolio's Technology filter, use one canonical `Unity` tag for confirmed Unity engine/stack facts, regardless of version; do not expose Unity versions as separate filter options or maintain a version registry. Preserve a confirmed exact version such as Unity 6 in project details only when that fact is intentionally displayed. This rule supersedes the earlier note that Unity and Unity 6 were separate pending taxonomy work.

  Technology chips describe the verified project stack; Selected contributions establishes individual attribution. Include relevant technologies with observed use supported by the project's Source of Truth, even when they are not named in every selected example. A chip does not establish authorship of the dependency or personal integration of every system. Do not populate chips from package declarations alone, product size, another project's tag count, platforms, or generic engineering patterns. Record the evidence and snapshot/variant limitations in the project's evidence register; preserve consistent technology names across records.
- `technicalHighlights` and optional `contributionOutcome` extend the shared contribution text for the catalog's Selected contributions section. No unsupported outcome was added.
- `projectsIndexTitleIcon` is the canonical compact identity-icon path shared by the catalog and Featured when applicable; it is not the primary poster path. `catalogIconReuseApproved` records reuse approval for that exact icon on that record, not independent rights verification. See [Compact Project Identity Icon Standard](project-icon-standard.md).
- `media[].catalogReuseApproved` records reuse approval on each existing catalog media item. It is not a legal rights/provenance audit; future media do not inherit approval. For animated previews, keep the static fallback in `src` and put the animation in `previewSrc`.

The archive reads those fields directly, preserves the compact two-column entry and full-width expanded details, and omits media without the scoped reuse approval. Publication and case CTAs still require `portfolioIncluded` and a publishable `caseStudy`. Excluded projects remain excluded. The merge does not implement other recommendations from the hiring review.

## Shared interface icon standard

Use the shared SVG icon component for interface arrows and disclosure plus/minus marks. Preserve arrows used as prose or diagram notation. See [Interface Icon Standard](interface-icon-standard.md) for SVG geometry, accessibility, sizing, and review criteria.

## How the information flows

```mermaid
flowchart LR
    R[ProjectRecord in projects.ts]
    H[Home]
    A[Projects archive]
    E[Experience selected work]
    C[Case study page]
    R --> H
    R --> A
    R --> E
    R --> C
```

The project record owns shared facts and an optional `caseStudy` area. That area groups its route, case-specific presentation, narrative, diagrams, evidence, and reflection inside the same project record. Home, archive, experience, and case-study pages resolve their content from this canonical record.

Employment history in `src/data/experience.ts` stores project IDs, not copied project destinations. A short `label` preserves the wording chosen for the Experience section; when no label is set, use the canonical project name. For an included record with an `archiveCategory`, every Selected work reference links to its All Projects entry at `/projects/#${anchorId ?? id}`, whether or not it has a case study. Do not redirect Selected work to a case-study route. If the record is absent, excluded, or has no archive placement, keep the available label/name as plain text without a project link.

## Project record fields

`ProjectRecord` is declared in `src/data/projects.ts`. `id`, `name`, and `summary` identify the record and describe the project. The rest of the fields are optional unless noted below.

| Field | Purpose | Behavior when absent |
| --- | --- | --- |
| `id` | Stable unique project identity used by references | Required; keep it when a display name changes |
| `name` | Public project name | Required |
| `summary` | Shared product/project description | Required |
| `portfolioIncluded` | Whether project-specific content is publicly consumable | Only `true` opts in; missing and `false` mean hidden |
| `archiveCategory` | Archive section | No archive placement |
| `homePlacement` | `featured` or `supporting` Home section | No Home placement |
| `homeOrder`, `archiveOrder` | Order within the relevant surface/group | Existing fallback ordering applies |
| `caseStudy` | Optional case-study area; publishing it requires a slug and at least two stories with non-empty titles and framings | No case-study CTA or generated route unless these requirements are met |
| `type`, `context`, `period` | Classification and context | Omit the unavailable detail |
| `contribution`, `engineeringFocus` | What the author contributed and technical focus | Omit the section |
| `tags`, `specs` | Shared descriptors and facts for explicit consumers; catalog reads Role from specs only | No automatic catalog publication of other labels |
| `media` | Required ordered list of project media entries | Use `[]` when the project has no media; no media block is rendered |
| `actions` | Declared non-case-study destinations and labels | No action links |
| `archivePresentation` | Existing `rich`, `standard`, or `compact` archive treatment | `compact` |
| `anchorId` | Existing public archive anchor when it differs from `id` | Use the stable project identity |
| `projectsIndexTitleIcon` | Canonical compact identity icon shown beside a project title in the catalog and reused in Featured when applicable | No icon |
| `mediaCaption`, `evidenceLabel`, `kind` | Optional media/presentation context | Omit or use the shared neutral treatment |

The initial adoption sets `portfolioIncluded` explicitly for every current record, even though the shared rule treats any missing value as hidden. This protects the current public portfolio membership while making new records unpublished until deliberately included.

## All Projects presentation contract

The canonical data model is `ProjectRecord` in `src/data/projects.ts`; instances are `projectRecords`. It serves several pages and can store more data than any one page displays. `/projects/` renders every included entry with `src/components/ProjectRecord.astro`, called by `src/pages/projects/index.astro`. `RichProjectRecord.astro` is not the current catalog renderer.

**The catalog has a closed presentation contract. Adding a property or a specs label to a record MUST NOT add a visible catalog field automatically.** The shared renderer applies this rule to every project, including entries with supplementary media. Do not use an exclusion list, enumerate arbitrary specs labels, or add project-specific display exceptions.

| Presentation | Canonical source |
| --- | --- |
| Title | `name` |
| Identity icon | `projectsIndexTitleIcon`, gated by `catalogIconReuseApproved` |
| Preview / static first frame | Approved `media[]`; static `src`, animation `previewSrc` |
| Description | `summary` |
| CTAs | Shared ordered `actions`, plus eligible `caseStudy` link |
| Role | Exact `Role` entry in `specs` |
| Context | `context` |
| Type | `type` |
| Period | `period`, omitting absent/Undated |
| Selected contributions | `contribution`, `technicalHighlights`, `contributionOutcome`; available supporting `additionalContext` remains prose rather than an extra metadata field |
| Technology | `technologies` |

Compact content is title/icon, primary preview, description and utility/CTA row. Expanded content presents Role, Context, Type, Period, Selected contributions and Technology, with approved supplementary media where available. Omit missing values and empty groups. The More details control is interface behavior, not a project action.

`Company`, `Focus`, `Engine`, `Stack`, `Tools` and other arbitrary `specs` labels are not additional catalog rows. They may remain in the canonical record for case-study consumers that explicitly request them. Company is not a fallback for Context, and Focus is not inferred into Technology. Product/topic tags are not technology facts. The catalog search indexes its rendered public text, so removing an extra row also removes that row from the search corpus.

For any future visible field: explicitly revise this contract and the feature 006 catalog contract, implement it in the shared renderer, justify the change, and validate affected entries. Merely populating data does not authorize a presentation change.

### Review criteria

- Ilhas displays Context once and has no separate Company or Focus rows; its case can still request Focus.
- No catalog entry renders an unknown specs label, with or without supplementary media.
- Existing Role/Context/Type/Period, contribution, technology, approved media and CTAs remain available.
- A record with extra specs only must not create an empty disclosure.
- Check desktop/mobile rendering and search; document observed results instead of assuming that typed data guarantees the presentation.

## Compact identity icon

Follow [project-icon-standard.md](project-icon-standard.md) for asset creation, naming, approval, optical centering, accessibility, and visual QA. Use a 104 × 104 WebP derivative displayed at 52 × 52 CSS px. Preserve original poster/source art and use the same canonical path in catalog and Featured. Omit an absent or unapproved icon without reserving space.

## Example ficha

This shortened example is based on the current Read With Ello record. It shows shared facts, a separately declared animation, available actions, case-study capability, visibility, and where the project appears. Optional details not needed by a project can be omitted. Every record must still include `media`; use an empty array when there are no project media assets.

```ts
{
  id: 'read-with-ello',
  name: 'Read With Ello',
  summary: 'A Unity mobile reading product for children...',
  portfolioIncluded: true,
  homePlacement: 'featured',
  homeOrder: 3,
  archiveCategory: 'professional-game',
  archiveOrder: 2,
  archivePresentation: 'rich',
  // Keep the same ProjectMedia property names across every project record.
  // `src` is the static image/fallback; optional `previewSrc` is its animation.
  media: [{
    type: 'image',
    src: '/projects/ello-read/read-with-ello-first-frame.webp',
    previewSrc: '/projects/ello-read/read-with-ello-gameplay-preview.gif',
    autoplayPreview: true,
    alt: 'Read With Ello product poster.',
    previewAlt: 'Read With Ello gameplay preview showing an interactive reading activity.',
    posterFit: 'contain',
  }],
  actions: [
    { href: 'https://apps.apple.com/us/app/read-with-ello/id1536720182', label: 'App Store' },
    { href: 'https://youtu.be/sk9Ob5f1GT8', label: 'Watch Promo' },
  ],
  caseStudy: {
    slug: 'read-with-ello',
    stories: [
      { title: 'Activity sequencing', framing: 'Connecting player input, spoken content, and outcomes.' },
      { title: 'Shared systems', framing: 'Supporting multiple activities with reusable behavior.' },
    ],
    selectedStories: 'These stories highlight focused examples of my contribution.',
    // Other editorial areas are optional when there is no supported content.
    scopeLabel: 'My contribution',
    ownershipLabel: 'My role',
    glanceFields: ['Context', 'Role'],
    reflection: 'The project brought gameplay, content, and feedback into a cohesive reading experience.',
  },
}
```

The example is abbreviated: each story may include fuller narrative, diagrams, and evidence. The case area can also define hero choices, context, boundaries, production, supporting content, evidence links, a next-project destination, and a meta description. These sections are optional when there is no supported content. Projects without a case study omit `caseStudy`; an area with fewer than two stories with non-empty titles and framings remains unpublished and has no CTA or route.

For a case study to be published, `caseStudy.slug` and at least two `stories` are required. Each story requires a non-empty title and framing. The following sections are optional and disappear from the page when omitted:

- Hero presentation and glance fields
- Scope, ownership, contribution heading, and case boundary
- Introductory copy for the selected stories
- Production and supporting-work sections
- Reflection and evidence links
- Next-project destination and meta description

## Media entries and actions

A `ProjectMedia` entry describes one source in the project's required `media` list. Every `ProjectRecord` declares `media`, including records without assets (`media: []`). Keep these property names consistent: `type`, `src`, `previewSrc`, `alt`, `previewAlt`, `title`, `caption`, `autoplayPreview`, `posterWidth`, `posterHeight`, `posterFit`, and `catalogReuseApproved`. Populate applicable properties; omit optional, inapplicable properties. For `type: 'image'`, `src` is the static image/fallback and optional `previewSrc` is its animation. Keep both paths in the same record; do not use a separate GIF type or a `posterSrc` field. Set `autoplayPreview: true` to load that animation when it enters the existing viewport margin. When the property is false or omitted, the animation loads on hover or keyboard focus of its project link. `alt` describes the static image, and `previewAlt` describes the animation when those are different. `posterWidth`, `posterHeight`, and `posterFit` describe the image's intended presentation. `catalogReuseApproved` records explicit approval for reuse in the project catalog. Every referenced local asset must exist under `public/` in the current branch.

The static source is the fallback for reduced motion, a failed animation, and the time before its configured preview behavior requests the animation. This feature preserves the established behavior from `develop`: some records load near the viewport, while others load on hover or keyboard focus. No separate Play control is presented.

Each `ProjectAction` is an independently declared `{ href, label }` destination. A case-study CTA and route are available when the included record's `caseStudy` area has a slug and at least two stories with non-empty titles and framings. A store or playable build action does not imply that a case study exists.

## Visibility and route rules

1. A missing record or `portfolioIncluded !== true` means no project-specific Home/archive block, action, project link, or generated case-study page.
2. An Experience Selected work reference to an included project with an `archiveCategory` links to `/projects/#${anchorId ?? id}`. Preserve its explicit `label`; otherwise show the canonical project name. This archive destination applies whether or not the project has a case study.
3. If an experience reference points to a missing or excluded project, or an included project without an `archiveCategory`, retain its available label/name as plain text without a project link.
4. An included project appears only on the surfaces selected by `homePlacement` and/or `archiveCategory`.
5. A case-study link requires `caseStudy.slug` and at least two stories with non-empty titles and framings in the same included project record; the other case sections may be omitted when they have no supported content.
6. External actions remain available when declared, even when a case study is absent, provided the project itself is included.
7. Keep `id`, `caseStudy.slug`, and existing `anchorId` stable to preserve references and public URLs.

## Adding or updating a record

1. Find the project by stable `id` in `projectRecords`; edit shared facts there rather than copying them into a component or page.
2. Set `portfolioIncluded` explicitly. Use `false` while work is incomplete, under maintenance, or not approved for public display.
3. Set Home placement and archive category separately. Set each ordering field when the location in that surface matters.
4. Add only evidence-backed optional facts and actions. Leave unavailable fields absent instead of using placeholder text.
5. Always declare `media`. Use `media: []` when there are no project assets; otherwise keep each image's static `src` and optional animated `previewSrc` together, using the shared `ProjectMedia` property names above. Confirm every referenced local asset exists under `public/` and provide meaningful fallback/alternative descriptions.
6. Add case-study presentation, stories, narrative, and evidence inside that record's `caseStudy` area. Add at least two stories with non-empty titles and framings, and keep its slug stable to publish/preserve the public route. Omit optional editorial sections when there is no supported content.
7. Add or update experience references with the stable `projectId`; keep an experience `label` only when that surface intentionally uses different wording.
8. When adding a model field, make it optional or document a safe default, update the relevant consumer, and ensure records that omit it continue to render without empty UI. `media` is required; an empty list is its safe no-media value.

## Current consumer map

| Surface | Consumer | Shared information |
| --- | --- | --- |
| Home featured work | `src/components/FeaturedProject.astro` | Project name, summary, contribution, media, case-study/action links |
| Home supporting work | `src/components/SupportingProject.astro` | Project name, optional detail, media, actions, archive destination |
| All Projects page | `src/components/ProjectRecord.astro` | Explicit catalog fields defined below; catalog CTAs follow More details in the same left-grouped utility row using the shared itch.io → Official → Promo → stores → other actions → Case study order |
| Catalog media-entry identity | `ProjectRecord.astro` / `.archive-record__identity-link` | One link wraps the optional decorative icon and project title and targets the stable record hash; media, summary, details and actions remain separate |
| Experience Selected work | `src/components/ExperienceEntry.astro`, `resolveExperienceWork`, and `resolveProjectArchiveHref` | Explicit reference label (otherwise canonical project name); included archive projects link to `/projects/#${anchorId ?? id}`, with plain-text fallback when missing, excluded, or not placed in the archive |
| Case study | `src/pages/featured/[slug].astro` plus case-specific story components | Canonical project facts/media and the nested case-study sections |

## Current branch repair

When the feature work was reapplied on top of the current `develop`, several poster and narrative image paths still ended in `.png`, while the current assets had been converted to `.webp`. Project and nested case-study media references in `src/data/projects.ts` now use the available `.webp` assets. The spec's media requirements include checking referenced files so future asset format changes do not leave broken images behind.


For catalog entries rendered by `ProjectRecord.astro`, the compact identity is one `.archive-record__identity-link` around the optional icon and heading, targeting the same stable project fragment. Keep the entire identity composition clickable, keep the icon decorative when the title repeats its meaning, and do not wrap the media, description, disclosures, or detail links. Preserve keyboard focus visibility. Runtime acceptance is SC-033 in feature 006.

## External link integrity (required portfolio QA)

Check the portfolio's public external links during every portfolio QA or release review, and whenever a link destination changes. Include links rendered on the home page, project catalog, published case studies, experience entries, teammate recommendations, and contact or social areas. Inventory the rendered links, deduplicate identical HTTP(S) destinations, and record the source route and visible link label for each destination.

Open each destination and follow redirects to confirm that the final page loads, matches the intended product, organization, or profile, and still supports the specific claim or context expressed by the portfolio link and surrounding copy. Check the current page content, not only its URL, title, or HTTP status: a live page whose content has changed or no longer substantiates the portfolio context is a semantic mismatch and must be corrected, relabeled, or explicitly excepted. Prefer a normal GET request or browser navigation; a HEAD-only result is not sufficient. If an automated check receives a 403, 429, bot challenge, or other service restriction, record it as inconclusive and inspect the destination in a browser. Do not mark it passed or broken from that response alone.

Treat confirmed 404/410 responses, DNS or TLS failures, redirect loops, and unrelated or removed destinations as failures. Correct the URL or remove the CTA when no valid destination exists. If a destination is intentionally gated or unavailable, record the reason as an explicit exception. Validate mailto: and tel: links for scheme and intended target separately; internal anchors are covered by navigation checks, not external availability checks.

Record the review date, route, link label, unique destination, checking method, final URL and status (or manual browser outcome), and any exception in the relevant feature evaluation record. Do not report all links as verified unless every in-scope unique destination has a definitive result. This recurring check reduces the chance of presenting broken links; it cannot guarantee that third-party pages will remain available after review.

## Canonical itch.io action label

All project actions that point to an itch.io project page use the shared `ITCH_IO_ACTION_LABEL` value from `src/data/projects.ts`, currently `View on itch.io`. Use this neutral wording consistently whether a page has a browser-playable build, a downloadable build, or only project information; do not imply that the game can be played directly from the page unless that claim is verified. Keep the destination URL project-specific and confirm its current page content against the portfolio context under the external-link integrity procedure above.

## More details interaction highlight

The catalog `More details` disclosure has a transparent background in every state. On hover, active, and keyboard focus, its label and `+`/`−` icon remain mint green. Underline only the label; never underline the icon. Keep a 36px minimum control height above 700px and 40px at or below 700px, plus a visible focus outline. The label is wrapped separately in `.archive-record__details-label` so underline styling cannot affect the symbol.

The `+`/`−` indicator follows the More details label on its right, matching the portfolio's other disclosure controls. Keep it separate from the label underline.

## Case-study CTA arrow

The catalog `View case study` action underlines only its text label on hover/focus. Keep the decorative SVG arrow separate from the underlined text label, hidden from assistive technology, and preserve the accessible link name.

The More details control aligns with adjacent catalog CTAs: zero horizontal padding, a 36px minimum height above 700px and 40px at or below 700px, and the shared `--archive-action-icon-gap` between its label and trailing +/− symbol. The symbol uses its intrinsic glyph width, without an extra fixed-width slot. The utility row uses 4px between wrapped rows and 14px between controls.


## Case-study URLs

Canonical case pages use `/featured/<slug>/`, constructed by `src/data/caseStudyRoutes.ts` (`caseStudyPath`). Home Featured, catalog case CTAs, experience work links and next-case navigation share this helper and respect the configured base URL. `/#featured` remains the Home section; project IDs and catalog fragments are unchanged. `/work/<slug>/` is a static compatibility page, not the case renderer. See [routing contract and validation](case-study-routing.md).
