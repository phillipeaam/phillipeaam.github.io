# Project Visibility and Action Contract

This contract defines which portfolio surfaces may consume a project record and which destinations they may expose.

## Public inclusion

- A record is publicly included only when `portfolioIncluded === true`.
- Missing records, missing inclusion values, and `portfolioIncluded: false` are excluded.
- Exclusion gates Home, the archive, project actions, case-study CTA/navigation, and static case-study route generation.
- An existing experience selected-work reference may retain only its intentional text label (or available project name) when the project is missing or excluded. It has no project link and creates no project-specific block.

## Surface placement

- Inclusion does not imply placement on all surfaces.
- Home requires a declared `homePlacement` (`featured` or `supporting`) and uses `homeOrder` when set.
- The archive requires `archiveCategory` and uses `archiveOrder` within that group.
- Existing `anchorId` values override the record ID when they preserve a public archive hash.

## Case-study actions and routes

A case-study destination is available only when all conditions are true:

1. The project record exists and is included.
2. The record contains its optional `caseStudy` area with a stable `slug`.
3. That area contains at least two story entries, and each story has a non-empty title and framing.

When any condition fails, omit the case-study CTA, next-case navigation target, and generated route. Other case-study editorial areas may be omitted when no supported content exists and their corresponding sections are omitted. There is no second case-content record to match. This does not suppress separately declared valid project actions.

## Independent project actions

- Each action declares its own `href` and non-empty label.
- Render actions only for included projects and only when the destination exists.
- A playable build, store, video, or official page action does not imply a case study.
- Never render placeholder or empty action controls.

## Shared facts and identity

- Components resolve shared project facts and destinations from the project record by stable ID.
- Case-specific story/evidence fields remain case-specific.
- Renaming a project does not change `id`, existing case-study slug, or an existing archive anchor.
