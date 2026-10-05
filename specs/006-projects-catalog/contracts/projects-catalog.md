# UI Contract: Projects Catalog

This is the user-facing interaction contract for `/projects/`. It is independent of implementation framework and complements [the feature spec](../spec.md) and [data model](../data-model.md).

## Initial page state

- The page contains one recognizable text entry for every published project in editorial order.
- Each entry exposes its stable existing project ID as a link target.
- The total is derived from the complete public inventory.
- Search and facet controls become interactive only after their behavior is initialized. If initialization is unavailable, all entries and their core links remain usable and controls do not appear functional.
- Compact entry information includes the project name, concise product summary, and available verified context, contribution, or period. Technology chips are not shown in the compact entry. Missing facts are omitted.
- The page heading reuses the approved “More Projects” section-heading pattern and copy from Home: eyebrow “BREADTH, AT A GLANCE”, title “All Projects”, and its existing supporting sentence. The “PROJECT ARCHIVE” eyebrow and prior page intro are removed.
- Every record boundary uses the same divider style and spacing.

## Search and filters

- Search is visibly labeled “Search for” above the field and searches the normalized public text corpus, including project name, product summary, contribution and displayed public metadata/details.
- Search ignores case, surrounding whitespace and Portuguese diacritic differences.
- “Context” and “Technology” are visible labels above separate disclosures with searchable, multi-select checkbox options generated from verified public data only. Technologies remain searchable/project-filterable and appear among the expanded detail groups.
- At most one facet disclosure is open at a time. Opening one closes the other without clearing its selections or internal option-search text; activating the open disclosure closes it.
- The open facet panel filters its own visible options by its internal query; that query does not change the project result set until checkbox values are selected.
- When no option matches the internal facet query, show a local no-options message while preserving the selected-value state and project count.
- Multiple selections in one facet use OR. Query, Context and Technology combine with AND.
- Every input change updates visible entries and a concise count of matches against the unfiltered total.
- A zero-match result displays a helpful message and a clear-all action.
- Selected values can be removed individually. Clear-all resets query and both facets.
- Focus remains on the control that initiated an update unless the user activates another control; filtering must not unexpectedly move focus.

## Project details and links

- A project with additional details exposes an independently operable disclosure next to/within that project entry. Opening one item does not close another.
- Expanded content uses consistent labels and hierarchy for available product/context, contribution, engineering focus, metadata, technology chips, approved media, and actions; empty sections are omitted.
- Verified media appears inline in the expanded entry. Unverified media is omitted; approved GIF previews retain a static alternative and accessible motion controls rather than being reduced to an external link.
- On desktop, the media occupies a column alongside project details; on mobile, it appears above the detail text.
- Disclosure state is announced semantically. Controls work with keyboard and touch and show visible focus.
- Existing case-study links, valid external actions, and project deep links remain associated with the correct record.
- When an incoming project hash points to a record hidden by current filters, clear the criteria needed to reveal it, then position the record. The same rule applies on initial load with a project hash.
- Empty/missing media, details, or destinations do not produce empty controls or misleading calls to action.

## Media and motion

- Images and animation are complementary to textual recognition.
- Render media inline only when provenance/authorization is supported by canonical project evidence; omit unverified sources instead of presenting placeholders as evidence.
- Every animated preview has an accurate static alternative that represents the approved media.
- Reduced-motion preference suppresses or replaces nonessential animation.
- Automatically moving media that continues alongside other content has an accessible visible pause/stop control; the user can understand and operate that control without hover.

## Responsive and no-script behavior

- The archive reflows without page-level horizontal scrolling at narrow widths, including 320 CSS pixels; controls and project summaries remain readable.
- Desktop, tablet and mobile preserve the same project identities, links, and discoverability.
- Without JavaScript, all project entries, static text, anchors, native disclosures and core navigation are available. Search/filter behavior may be unavailable, but inert active-looking controls are not exposed.

## Accessible feedback

- Use semantic landmarks/headings, visible labels, descriptive accessible names and keyboard-operable controls.
- Visible focus must remain apparent.
- Result changes and empty state are conveyed through a concise polite status message without turning the entire results list into a live region.
- Each facet disclosure and nested checkbox group communicates its label, expanded/selected state, option-search purpose, and no-option-match state without a custom ARIA listbox/menu composite.
- Do not rely on hover, color alone, animation, or thumbnail artwork to convey identity or state.
