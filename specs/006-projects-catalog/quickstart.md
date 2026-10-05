# Quickstart: Validate the Projects Catalog

This guide is for implementation and review after the catalog is built. It does not claim that the checks below have already run.

## Prerequisites and local run

- Node.js and npm versions supported by the project.
- Install repository dependencies with `npm install` if they are not present.
- Start the site using `npm run dev` and open the `/projects/` route printed by Astro.

## Build diagnostics

Run from the repository root:

```sh
npm run check
npm run build
git diff --check
```

Expected: Astro diagnostics and production build complete successfully; the diff check reports no whitespace errors. Record any command not run and its reason in the implementation handoff.

## Functional discovery scenarios

1. Open `/projects/` with no criteria. Confirm each published project has a recognizable text entry and the status shows the current data-derived total (currently 19).
2. Search for a full name and a partial name. Confirm only matching records remain and the count matches the displayed entries.
3. Search a contribution/product term and a verified technology. Confirm the public detail corpus can match and no deferred/internal record appears.
4. Repeat a query with different letter case, surrounding spaces, and without Portuguese accents. Confirm equivalent matching.
5. Select two values within Context, then two within Technology. Confirm a record matching either selected value within its facet remains; both facets and query together narrow with AND.
6. Search for an option inside each open facet panel. Confirm only facet options are narrowed until one or more checkboxes are selected; verify selected options can be toggled independently.
7. Enter text with no matching options in each open facet. Confirm its local empty state appears while project results and their count remain unchanged.
8. Remove one selected criterion, then use clear-all. Confirm the count updates and the full archive is restored.
9. Use a query/facet combination with no matches. Confirm a concise empty message appears and the clear action restores results.
10. Expand details for two records at once, then close each independently. Filter one expanded record out and confirm its details are not left visible.
11. Open representative records with and without media, case link, external action, and optional metadata. For each rendered media source, confirm provenance/authorization against `docs/stage-10-content-register.md` and `docs/repository-evidence-pass.md`; confirm GIF/animation is inline with an accurate static alternative and accessible motion control, and absent/unverified media has no placeholder or empty control.
12. Compare detail hierarchy and record separators across multiple projects; confirm tags/technology chips appear in details, not compact entries, and the heading matches the Home “More Projects” eyebrow, “All Projects” title, and supporting copy.
13. Confirm “Search for”, “Context”, and “Technology” are visible above their respective controls. Open Context, then Technology; confirm only Technology remains open while the Context choices persist. Reopen Context and confirm the reverse, then close an already-open selector.
14. Load an existing project hash directly and while filters would otherwise hide it. Confirm the intended project is revealed and reached without changing its stable ID.

## Accessibility and resilience scenarios

- With keyboard only, tab through the search, each facet trigger, its internal search field and checkboxes, clear actions, project links and disclosures; use Space to select a checkbox, verify visible focus and ensure focus is not unexpectedly moved during filtering.
- With a screen reader, verify labels, selected facet state, disclosure state, result-count updates, and zero-result feedback. Confirm the result list is not announced as one large live region.
- Enable reduced motion and verify comprehension and operation do not rely on animation. For continuous automatic previews, verify the pause/stop control and confirm the static alternative accurately represents the approved media.
- Disable JavaScript and reload. Confirm all records, core text, deep-link targets, native disclosures and core links remain available, and unavailable filters are not presented as working.
- Test narrow widths including 320 CSS px, a representative phone width, tablet, and desktop. Confirm all entries remain discoverable without page-level horizontal scrolling, overlap, or loss of essential text.

## Validation record

The feature does not include a participant study or before/after usability comparison. Record results for SC-001–SC-015 in `specs/006-projects-catalog/evaluation.md`, including the scenarios run, actual viewport widths, accessibility checks, build diagnostics, and any unmet criterion or validation not performed. Do not present manual checks as participant research.

## Related artifacts

- [Feature spec](spec.md)
- [Implementation plan](plan.md)
- [Data model](data-model.md)
- [UI contract](contracts/projects-catalog.md)
