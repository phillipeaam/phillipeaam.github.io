# Data Model: Shared Project Records

This design reflects the current portfolio data in `src/data/projects.ts` and `src/data/experience.ts`. Each project's optional case-study document is nested in its `ProjectRecord`; it is not stored in a second case catalog. Type spellings below describe concepts and validation, not a required class hierarchy.

## ProjectRecord

One record represents one project and uses a stable unique `id` as its cross-surface identity.

| Field | Required for a valid record | Meaning and rules |
| --- | --- | --- |
| `id` | Yes | Stable unique identity; do not derive from a mutable display name. |
| `name` | Yes | Current visitor-facing name. |
| `summary` | Yes | Evidence-backed shared project/product description. |
| `portfolioIncluded` | Explicit in migrated records | `true` opts in; missing and `false` mean excluded. Populate explicitly for all current records. |
| `archiveCategory` | No | One archive group; omission means no archive placement. |
| `homePlacement` | No | `featured` or `supporting`; omission means no Home placement. |
| `homeOrder`, `archiveOrder` | No | Numeric ordering within that selected surface/group. |
| `caseStudy` | No | Optional nested editorial area. To publish it, it must contain a stable route `slug` and at least two `stories`, each with non-empty `title` and `framing`; all other editorial areas are optional when there is no supported content. Omission or failure to meet these requirements means no case-study CTA or generated route. |
| `type`, `context`, `period` | No | Optional classification and context fields. |
| `contribution`, `engineeringFocus` | No | Optional, evidence-backed contribution and engineering focus. |
| `tags`, `specs` | No | Optional descriptors and labeled facts; no empty labels. |
| `media` | No | Ordered list of media entries; omission removes the media area. |
| `actions` | No | Independently declared destinations; omission means no external/action controls. |
| `archivePresentation` | No | `rich`, `standard`, or `compact`; default is `compact`. |
| `anchorId` | No | Preserve a current public hash when it differs from `id`. |
| `projectsIndexTitleIcon` | No | Optional small icon displayed beside a project's title on the All Projects page; must resolve to an existing public asset. |
| `mediaCaption`, `evidenceLabel`, `kind` | No | Optional descriptive or visual context; absence has no blank presentation. |

Unknown or unsupported facts are omitted, not fabricated. New shared fields are optional or have an explicit safe default so current records remain valid.

## ProjectMedia

Each media entry represents one project-owned visual or audiovisual item. The first entry is the current lead visual consumed by Home, the archive, and a case hero unless a surface has a documented reason to select another entry.

| Field | Requirement | Meaning |
| --- | --- | --- |
| `type` | Required | `image`, `gif`, `video`, or `youtube`, according to the existing content use. |
| `src` | Required | Existing static image or primary media source; for animated preview cards this is the visible poster/fallback. |
| `previewSrc` | Optional | Separate animation source, loaded according to `autoplayPreview` or hover/focus behavior. |
| `autoplayPreview` | No | When `true`, load the preview when it enters the existing viewport margin; otherwise load on hover or keyboard focus of its project link. Omission defaults to `false`. |
| `alt`, `previewAlt` | Optional, meaningful when content is informative | Descriptions for static and animated visuals; a preview may use the static description when equivalent. |
| `title`, `caption` | Optional | Media title and explanatory caption. |
| `posterWidth`, `posterHeight` | Optional | Intrinsic presentation dimensions; use documented defaults only if safe. |
| `posterFit` | Optional | `cover` or `contain`; default matches the existing shared style. |

`autoplayPreview` preserves the existing per-record near-viewport choice. `showAnimatedDirectly` is not part of the current model. Case-specific media presentation may update descriptive text, caption, dimensions, and fit, but MUST NOT replace the shared media source or override the activation behavior declared by the owning record.

### Media loading states

| State | Display | Animation request |
| --- | --- | --- |
| Initial render, outside the viewport margin | Static project image | None |
| `autoplayPreview: true` enters the viewport margin | Keep fallback while loading; show animation when ready | Request only the selected `previewSrc` |
| Preview without autoplay is hovered or its project link receives focus | Keep fallback while loading; show animation while interaction is active | Request only the selected `previewSrc` |
| Pointer leaves or focus moves away from a non-autoplay preview | Static project image | No additional request |
| Animation request/decode fails | Static project image | No retry loop |
| Reduced motion enabled | Static project image; suppress animation requests | None |
| No static or animated media exists | No media frame/control | None |

The static image remains the progressive fallback. Hover previews remain usable from keyboard focus where a project link is present; the media preview adds no separate control.

## ProjectAction

An action contains a non-empty `href` and visitor-facing `label`. It is independent from case-study capability. Render an action only when the project is included and the destination is present.

## ProjectRecord.caseStudy area

The case study is a composed, optional section of its owning `ProjectRecord`, rather than an independently maintained record. It groups the visitor-facing case material into named areas while shared project facts remain fields on the parent record:

```text
ProjectRecord
├── shared facts, media, actions, visibility, and portfolio placement
└── caseStudy? (optional)
    ├── slug (required for publication)
    ├── stories[] (at least two to publish; each has a non-empty title and framing)
    └── optional presentation, context, ownership, boundaries,
        production, supporting work, reflection, evidence links,
        next-project destination, and meta description
```

| Case-study field | Requirement | Meaning and behavior |
| --- | --- | --- |
| `slug` | Required to publish | Stable route segment; preserve existing public URLs. |
| `stories` | At least two to publish | Each story has a non-empty title and framing; deeper narrative, diagram, media, and evidence may be absent where unsupported. |
| Hero choices, `scopeLabel`, `ownershipLabel`, `contributionHeading`, `glanceFields`, `caseBoundary`, `selectedStories`, `production`, `supporting`, `reflection`, `evidenceLinks`, `nextProjectId`, `metaDescription` | Optional | Add only where supported by content. Omitted areas produce no empty heading, label, link, or content block. |

Generate/render a route only if the record exists, `portfolioIncluded` is true, and its `caseStudy` area declares a slug and at least two stories, each with a non-empty title and framing. Other editorial fields may be omitted when content is unavailable; their consumers omit the corresponding section without empty labels. The route reads both shared facts and case-only sections from the same record. A case page may choose how to present canonical media, but must not create a second source path for it.

## ExperienceReference

An experience entry refers to a project using a stable `projectId`. An optional local label preserves intentional wording in employment history. When the project exists and is publicly included, resolve its name and only a valid declared destination. When the record is missing/excluded, retain the optional label (or project name if available) as plain text; do not render a project link or project-specific block.

## Relationships and multiplicity

```text
ProjectRecord 1 ── 0..N ProjectMedia
ProjectRecord 1 ── 0..N ProjectAction
ProjectRecord 1 ── 0..1 nested caseStudy area
ExperienceEntry 1 ── 0..N ExperienceReference ── 0..1 ProjectRecord
```

Project IDs and case-study slugs are unique. Home placement, archive group, and public inclusion are separate choices. A record may exist while excluded, and a public project may appear in the archive without appearing on Home.

## Migration invariants

1. Exactly one `ProjectRecord` exists for each current project, including deferred/unpublished projects.
2. Every current record has explicit `portfolioIncluded` to preserve existing publication choices; future omitted inclusion remains private.
3. Shared facts and optional case-study narrative are grouped in the project record; experience references keep stable IDs.
4. Existing case slugs, public routes, archive anchors, public membership, ordering, and approved presentation are preserved.
5. Every local `src`, `previewSrc`, identity image, and case narrative asset reference exists in `public/` in the current branch.
6. Each animation follows its record's near-viewport or hover/focus behavior; reduced motion makes zero preview requests.
