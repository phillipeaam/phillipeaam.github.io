# Implementation Plan: Section Heading and Navigation Standard

**Branch**: `codex/home-section-heading-standard` | **Date**: 2026-10-06 | **Spec**: [spec.md](spec.md)
**Input**: `specs/008-section-heading-standard/spec.md`

## Summary

Use one SectionHeading component for six headings; stack each title and full-width support paragraph at every viewport width. Centralize seven canonical Home destinations and retain six native legacy aliases. Preserve existing return/history behavior with explicit section fragments taking precedence over saved restoration. Publish a permanent standard during implementation.

## Technical Context

**Language/Version**: Astro templates, CSS, TypeScript ^5.9.2.
**Primary Dependencies**: Existing Astro ^7.3.5 and @astrojs/check ^0.9.10; no new packages.
**Storage**: Existing sessionStorage return intent and scroll coordinate; no new keys.
**Testing**: `git diff --check`, `npm run check`, `npm run build`, browser acceptance matrix in quickstart.md; no new test framework.
**Target Platform**: Static website in desktop/tablet/mobile browsers.
**Project Type**: Astro portfolio.
**Performance Goals**: No extra network requests or dependencies for headings; native fragment navigation preserved.
**Constraints**: Preserve copy meaning/claims, semantics, sticky offset, reduced motion, native links, prior navigation specs; support wording can be edited to satisfy the line-width contract; no unrelated routes/cards/contact changes.
**Scale/Scope**: Six headings, seven canonical destinations, six legacy aliases.

## Constitution Check

| Principle | Pre-design and post-design assessment |
|-----------|--------------------------------------|
| I Evidence | No public claim changes; copy frozen |
| II Shared patterns | One component and shared destination module |
| III Visual preservation | Bounded correction justified by reported alignment issue; retain typography/dividers |
| IV Accessibility | h1/h2, aria-labelledby, native aliases, focus and reduced-motion checks |
| V Enhancement | HTML links/aliases work without optional scripts |
| VI Responsive | Recorded checks at desktop/tablet/mobile boundaries and text wrapping |
| VII Scope | Only named headings/navigation; no new packages |
| VIII Validation | Diagnostics/build/diff and runtime evidence tasks required |
| IX Review | Human review required before merge/push approval |

Design passes both gates; runtime checks and approval remain pending. No exceptions.

## Project Structure

```text
specs/008-section-heading-standard/
  spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md
  contracts/section-heading-navigation.md
  checklists/requirements.md
  validation.md                       # implementation evidence
src/components/SectionHeading.astro   # new
src/data/homeSections.ts              # new
src/components/Navigation.astro
src/components/TestimonialsSection.astro
src/pages/index.astro
src/pages/projects/index.astro
src/layouts/BaseLayout.astro
src/styles/global.css
docs/section-heading-standard.md      # permanent reference
```

**Structure Decision**: Extend existing directories and routes; centralize destination names without moving existing navigation scripts.

## Phase 0: Research

See research.md. Local source and delegated read-only navigation inspection resolve layout, aliases, observer identity, two restoration guards, and canonical selector migration. No external dependencies or unresolved research questions.

## Phase 1: Design

- SectionHeading props: eyebrow, title, support plain text, titleId, titleLevel (h1/h2), optional anchorId/aliases and placementClass. Retain existing accessible title IDs; catalog uses h1, Home h2.
- At all viewport widths, render the title group first and one full-width support paragraph immediately below it, with a shared 4px gap between them. Keep the title at its natural height; support text aligns left and wraps within the available width. Keep responsive outer padding and existing divider spacing.
- Remove section-support-line markup/rules for scoped headings. Keep support copy plain text, preserving its meaning and claims.
- homeSections.ts owns canonical IDs, labels, aliases. Canonical IDs match menu data-section and Home data-nav-section. Generate #home instead of special #top. The selected in-depth work section uses canonical #featured, with #case-studies and #work aliases; update spacing selectors accordingly without renaming /work/ routes or work-* project IDs.
- Render aria-hidden alias spans at the same positioned origin as their target with shared scroll margin. Retain legacy hashes in the URL; no history rewrite. Canonical menu links use canonical hashes.
- Both early loading and bottom restoration guards in BaseLayout must suppress/clear stale return intent for recognized explicit Home hashes. No-hash Back restores as before; identity controls still return instantly to root. Local contextual Contact links retain their current page destination.
- Document contract in docs/section-heading-standard.md and record actual validation separately in validation.md. See data-model.md, contracts/, and quickstart.md.

## Complexity Tracking

No constitutional violations or additional architectural layers.
