# UI Contract

Six heading consumers: Featured, Projects, Teammates, About, Experience, All Projects. Render eyebrow/title group and plain support paragraph preserving support meaning/claims and current accessible title IDs. Home h2; catalog h1. No authored line-group spans.

At all viewport widths, eyebrow and title are separated by 4px, followed by one full-width support paragraph 4px below the title group. The title keeps its natural height. The support text aligns left, wraps within the available width, and exposes one accessible name. Preserve responsive outer padding and internal bottom padding of 23px desktop/20px stacked. Do not use balanced wrapping or section-specific CSS. Long tokens wrap safely.

Canonical and legacy mappings are in data-model.md. Generated Home section links use canonical fragments, prefixed with the Home base path from other pages. Canonical IDs match observer/menu datasets. Alias elements share target position and sticky offset; are aria-hidden; and do not duplicate accessible headings. Legacy URLs need not normalize. Native navigation works without scripts.

Explicit recognized Home hash outranks restoration; no-hash Back restores, identity returns instantly. Local contextual Contact remains local. Keep same-page animation/reduced-motion and history behavior, /featured/ case routes (with /work/ compatibility), archive records, and work-* IDs.

Permanent reference: docs/section-heading-standard.md. Changes require rationale, affected consumers, revalidation, and human review. Evidence record distinguishes actual checks from pending checks and approval.
