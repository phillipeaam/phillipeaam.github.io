# UI Contract

Six heading consumers: Featured, Projects, Teammates, About, Experience, All Projects. Render eyebrow/title group and plain support paragraph preserving support meaning/claims and current accessible title IDs. Home h2; catalog h1. No authored line-group spans.

Above 960px, a flexible title column and a support column capped at 45ch with --s-8 gap establish the heading. In the shared support paragraph, the lead line aligns right and ends at the column edge; the continuation begins at the block's left edge and aligns left. The lead remains longer than the continuation. At/below 960px, both parts flow together as natural inline text; at/below 820px support stacks below the title with --s-3 gap. The paragraph provides one accessible name while visual spans are hidden from assistive technology. Do not use balanced wrapping or section-specific CSS. Long tokens wrap safely. Internal bottom padding: 23px desktop/20px stacked. Placement margins can reflect surrounding content but cannot change internal alignment.

Canonical and legacy mappings are in data-model.md. Generated Home section links use canonical fragments, prefixed with the Home base path from other pages. Canonical IDs match observer/menu datasets. Alias elements share target position and sticky offset; are aria-hidden; and do not duplicate accessible headings. Legacy URLs need not normalize. Native navigation works without scripts.

Explicit recognized Home hash outranks restoration; no-hash Back restores, identity returns instantly. Local contextual Contact remains local. Keep same-page animation/reduced-motion and history behavior, /work/ routes, archive records, and work-* IDs.

Permanent reference: docs/section-heading-standard.md. Changes require rationale, affected consumers, revalidation, and human review. Evidence record distinguishes actual checks from pending checks and approval.
