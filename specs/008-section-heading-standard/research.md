# Research

Date: 2026-10-06. Source inspection and delegated read-only navigation review; no runtime validation.

## Stable column

**Decision**: Equal desktop columns above 820px, stacked below; natural text wrapping.
**Rationale**: Current fit-content grid, width:max-content, justify-self:end, and manually grouped spans produce content-dependent origins. Equal columns keep layout independent of text length. Following the user corrections on 2026-10-07, the support block aligns to the right content edge while its text aligns left on desktop; mobile remains left-aligned. Desktop uses sequential natural wrapping (`text-wrap: wrap`) and copy is revised to ensure every upper line is longer than the following line across checked widths.
**Alternatives considered**: Adding spans to Teammates/About leaves the underlying problem; per-section offsets violate shared patterns.

## Shared structure

**Decision**: Shared SectionHeading with explicit h1/h2 and plain support.
**Rationale**: Six equivalent consumers should not duplicate their rendering contract. Preserve catalog h1 and Home h2 and title IDs.
**Alternatives considered**: CSS-only fix leaves structural drift; unrestricted support slots permit manual breaks.

## Names and compatibility

**Decision**: Shared destination table plus HTML aliases; no legacy URL normalization.
**Rationale**: Menu IDs and observer datasets must agree. Existing alias pattern supports no-JS arrival. Source review identified #work spacing selectors requiring migration as well.
**Alternatives considered**: JS-only redirect breaks native compatibility; renaming /work/ routes is out of scope.

## Restoration

**Decision**: Explicit recognized Home hashes override restoration in both BaseLayout guards. Preserve no-hash Back and instant identity behavior.
**Rationale**: Current restoration precedes hash handling and can override explicit intent. Contextual Contact remains local to the current page.
**Alternatives considered**: Disabling all restoration breaks prior journeys; changing identity to section animation breaks spec 005.

## Governance

**Decision**: Permanent docs reference and separate implementation validation record.
**Rationale**: Maintenance contract and actual execution evidence have different lifetimes; human review remains required.
**Alternatives considered**: Tasks-only guidance does not provide a durable standard; source inspection is insufficient for visual acceptance.
