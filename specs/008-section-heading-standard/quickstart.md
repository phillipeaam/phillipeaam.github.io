# Validation Guide

Planned checks only; no runtime results claimed.

## Setup

Use existing Node/npm dependencies. From repository root run `npm run dev`; use the reported URL (normally localhost:4321). After implementation run `git diff --check`, `npm run check`, `npm run build`. Record actual results in validation.md.

## US1: Headings

Inspect all six headings at widths 1440, 1280, 1100, 1024, 960, 900, 860, 821, 820, 768, 390px; record height too. Above 960px use Range.getClientRects() to confirm the support lead ends at the column's right edge, the continuation starts at the support block's left edge, and the lead is wider. At/below 960px confirm lead and continuation flow as one left-aligned paragraph; at/below 820px confirm the paragraph stacks below the title. Check shared internal spacing, semantics, one accessible name, and preserved copy meaning/claims, intro/cards/contact.

Temporarily substitute short phrase, long paragraph, and long unbroken token in development only; verify no clipping/overlap/horizontal overflow at the representative widths in this quickstart. Manual browser-zoom/enlarged-text testing is out of scope by user decision (2026-10-07). Restore approved copy before commit. Check semantic h1/h2 and aria-labelledby. Any new/edited support copy must be measured across desktop widths; wording can change to meet the descending-line rule, but meaning and claims remain intact.

## US2: Canonical navigation

Test all seven menu destinations in desktop/mobile: activation, direct open, reload, matching fragment and active item, visible target below header. Test every available section link from catalog, experience, and case-study pages. Exercise keyboard focus/activation, mobile menu Escape, reduced motion, unknown/malformed hashes, Back/Forward, and unchanged project record links.

## US3: Legacy and return journeys

Direct-open/reload all six legacy fragments in data-model.md. Confirm corresponding section and canonical active identity, then activate current menu link and confirm canonical fragment. Repeat canonical and legacy native arrivals without optional scripting. Test stale saved return intent plus explicit canonical/legacy hash. Repeat Home→project→Back five times; verify restored position. Avatar/name must return immediately to root from Home and another page; explicit Home menu uses #home.

## US4: Documentation and approval

Review permanent reference against all six headings and seven destinations. Confirm rules, aliases, spacing, responsive behavior, and future-change procedure. Record every performed/pending/failed check with viewports in validation.md. Obtain human visual review before merge/push approval; documentation completion does not establish runtime success.
