<!--
Sync Impact Report
- Version change: template placeholders → 1.0.0 (initial ratification)
- Modified principles: none; established nine principles from the project brief
- Added sections: Project Context; Delivery and Review
- Removed sections: none
- Follow-up TODOs: none; ratification date set to initial adoption on 2026-09-30
-->
# Phillipe Augusto Portfolio Constitution

## Core Principles

### I. Evidence-First Portfolio Claims
Public claims about projects, ownership, responsibilities, dates, technologies,
metrics, and outcomes MUST be supported by verified project evidence or canonical
Source of Truth documentation. If evidence is insufficient, omit the claim or
qualify it to match what is known. Public product material establishes product
facts, not individual authorship.

### II. Shared Patterns Before Project-Specific Variants
When projects represent the same concept, they MUST use shared components and a
common structural contract. Project-specific markup or CSS branches require a
documented, genuine requirement. This keeps the portfolio consistent and easier
to maintain.

### III. Preserve Approved Visual Systems
Approved visual patterns, especially shared editorial patterns established on
Home, MUST be reused across the portfolio. A new implementation of an existing
pattern requires a demonstrated need and review.

### IV. Accessibility Is Part of Completion
Applicable work MUST provide keyboard navigation, visible focus, semantic HTML,
meaningful accessible names, reduced-motion support, and usable touch targets.
Accessibility is a completion requirement, not optional polish.

### V. Progressive Enhancement
Core content and navigation MUST remain usable without optional JavaScript.
Prefer native browser behavior and CSS; add client-side scripting only when the
required behavior cannot be met adequately without it.

### VI. Responsive Verification
Meaningful UI changes MUST be evaluated at representative desktop, tablet, and
mobile widths. Validation reports MUST name only viewports that were actually
tested.

### VII. Small, Scoped Changes
Implementation MUST use the smallest coherent change that satisfies its
specification. Unrelated areas MUST NOT be redesigned or refactored as part of a
bounded feature.

### VIII. Validation Before Completion
Relevant changes MUST pass `git diff --check`, Astro diagnostics, and a production
build, plus runtime or visual validation appropriate to the change. Completion
reports MUST distinguish checks run from checks not run.

### IX. Human Review for Meaningful Changes
Meaningful visual, structural, or editorial changes MUST receive human review
before they are treated as approved work for merge or push. Agents may implement
and validate the work; validation does not replace human approval.

## Project Context

This repository is an Astro portfolio (`package.json`) with shared components,
page routes, project and case-study data, and global styles (`docs/stage-11a5-structure-audit.md`).
Portfolio content is governed by evidence registers and source records, including
`docs/stage-10-content-register.md` and `docs/repository-evidence-pass.md`.
Those records define evidence boundaries; a public link, role title, or project
listing alone MUST NOT be treated as proof of an individual contribution.

## Delivery and Review

For a change, its specification and applicable canonical evidence determine the
scope and content. Shared components and visual patterns are the default. Before
completion, perform the validation required by Principle VIII and the responsive
and accessibility checks that apply under Principles IV and VI. Record material
limitations, including unavailable source evidence or untested viewports. Keep
changes reviewable and route meaningful visual, structural, or editorial work to
human review under Principle IX.

## Governance

This constitution governs portfolio implementation and public content. Amend it
when a principle or project-wide constraint changes: document the reason, update
the affected guidance, and review the amendment for consistency with repository
evidence. Constitution versions follow semantic versioning: MAJOR for
incompatible governance changes, MINOR for new or materially expanded principles
or sections, and PATCH for clarifications that do not change requirements.
Implementation reviews MUST check relevant changes against this constitution;
exceptions require an explicit rationale and human review. The constitution does
not replace project-specific evidence or the feature's review requirements.

**Version**: 1.0.0 | **Ratified**: 2026-09-30 | **Last Amended**: 2026-09-30
