---
name: portfolio-project-review
description: Review and score this portfolio's All Projects entries, assess evidence and presentation, propose grounded improvements, and recover missing context through targeted questions or technology inventories. Use for entry reviews, catalog audits, and reassessments.
---

# Portfolio Project Review

Help project entries communicate product, individual work, engineering judgment and credible outcomes to recruiters, engineering managers and potential collaborators. Scores guide editorial improvement; they are not hiring predictions or definitive judgments of professional ability.

## Scope and inputs

Accept a project ID/name/URL, selected projects, or the published catalog; an optional Source of Truth/report; and an optional target role/audience. Resolve requests against the current repository and canonical records. Review included entries by default; include unpublished records only when requested. Review and propose by default. Edit content only with user authorization; do not stage, commit, merge, push or modify an external source implicitly.

Reports and proposed public copy are English by default; follow an explicit language request. A full catalog review uses the same rubric and includes per-project checklists/scores, even when the executive summary is aggregated.

## Load current authority

Paths below are repository-relative. Read these before deciding that a field or layout is wrong:
- `docs/project-records.md`, especially All Projects presentation contract and External link integrity.
- `specs/006-projects-catalog/contracts/projects-catalog.md` and `.specify/memory/constitution.md`.
- The selected entries and relevant types/helpers in `src/data/projects.ts`, their current renderer `src/components/ProjectRecord.astro`, and `src/pages/projects/index.astro`.
- The selected project's Source of Truth and evidence register, when available. Follow source precedence by claim type, not merely newest date. Record unresolved conflicts and fetch restrictions.

Read `docs/projects-catalog-hiring-review.md` and `specs/006-projects-catalog/hiring-review-2026-10-05.md` as historical editorial foundations. Reproduce neither their old diagnoses nor their proposed layout as current requirements. This skill's numerical rubric is newly derived, not a scale established by those reports. Current user decisions and contracts govern presentation; identify conflicts without silently reverting approved work.

Consult current `docs/media-guidelines.md`, `docs/animated-media-standard.md`, `docs/project-icon-standard.md` and `docs/interface-icon-standard.md` when evaluating those concerns. Do not copy their evolving size, spacing or interaction rules into this skill.

## Review workflow

1. Establish project kind, target audience, source coverage and current authored/rendered state. Distinguish displayed evidence from usable information found only in a report. Read the report before asking the user to recover facts it already contains.
2. Use [references/report-template.md](references/report-template.md) for the mandatory twelve-field check and report structure. Adding record properties or arbitrary `specs` labels must not add public catalog rows. Keep data needed by case consumers without leaking it into the catalog.
3. When browser access is available, inspect collapsed and expanded entries, relevant links and cross-surface consistency. Name route, viewport, method and actual observations. Inspect relevant desktop/tablet/mobile widths; do not claim a full audit from a sample. Check wrapping, readable text, icon/media loading, overflow, applicable focus/disclosure behavior and fallback/reduced motion. Preserve agreed exclusions: no automatic physical-device, physical-touch or manual-zoom gates.
4. Review each external CTA for reachability, redirect destination and semantic fit with the label, project and variant. HTTP 200 alone is insufficient; tool restrictions are inconclusive, not broken-link evidence. Use a normal browser when it can resolve fetch restrictions. Research new recommendations or unstable facts when needed, using primary sources; distinguish standards, research and editorial inference.
5. Apply [references/rubric.md](references/rubric.md). Score current demonstrated quality, not potential after edits. Every score needs an evidence locator, rationale, limiting factor, improvement and confidence. Unobservable dimensions are Not evaluated. Contextualize commercial, independent, jam and study work without changing the scale silently.
6. Recommend up to three leading priorities, then other justified findings. Each includes issue, evidence, concrete change, plausible benefit, dependencies and verification. Use source-supported English replacement text where useful; preserve approved intent and proportion to a catalog entry. Never create quotas, inflate mechanisms or turn all entries into full cases.
7. Report readiness separately from numerical scores and human approval. If authorized to implement, update canonical records and necessary documentation only, perform applicable repository checks, and reassess observed results. Review alone does not trigger builds or edits. Store a report only when requested; otherwise return it in the response.

## Evidence recovery and technology candidates

After reviewing the entry and sources, generate a targeted questionnaire when requested or when unresolved information materially affects a proposed claim. Read [references/evidence-recovery.md](references/evidence-recovery.md) for question format, answer classification and candidate inventory. Ask an initial batch of at most five relevant questions, prioritizing gaps over facts already supplied by the SOT. Explain each question's gap, dimension, useful answer and corroboration needs. Follow up only on material ambiguity or useful evidence; inability to remember is a valid answer.

For interview-only or inventory requests, establish gaps without forcing a new score or full rendered audit. Ask questions in the author's requested language; proposed public copy remains in the portfolio's language. An answer does not authorize publication or external Source of Truth edits.

When asked to explore technologies, inventory source mentions separately from public chips. Distinguish observed use from configuration, declarations, recollection and multi-project mentions. Resolve project/variant/period and individual attribution before proposing publication. Technology quantity, project size and answer count are not scoring criteria.

Classify interview answers before drafting. Supported unpublished information is an opportunity, not evidence already demonstrated by the entry. Keep unresolved conflicts visible and retain scores when answers do not improve displayed, supported evidence.

## Claim and editorial boundaries

Technical evidence supports mechanisms and attribution; personal accounts support memory and motivation; public destinations support product context; editorial decisions support presentation. None substitutes for another. Preserve version, school/store variant, period and team boundaries. Do not infer sole authorship of libraries, collective infrastructure, art, pedagogy or backend, or publish unsupported metrics/leadership titles.

Keep detailed provenance internally. Public prose should describe past work fluently without suggesting current private-code access; retain qualifications that materially change interpretation. Personal learning is not measured professional impact. A weak evidence score describes the entry, not the author's ability or actual historical impact.

Reassess with the same rubric version. Explain score changes through new demonstrated evidence or observed quality. Adding adjectives, jargon or length does not earn points. A rubric revision breaks direct historical comparability unless the earlier entry is rescored under the new rubric.

For contextual calibration and invocation examples, read [references/examples.md](references/examples.md). These are fictional examples, never evidence about real projects.
