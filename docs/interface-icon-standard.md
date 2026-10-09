# Interface icon standard

Use the shared inline SVG component in `src/components/Icon.astro` for decorative interface symbols, including arrows and disclosure plus/minus marks. Do not use Unicode characters as substitutes for interface icons: glyph metrics and baselines vary by font and browser, which can make nominally centered symbols look optically misaligned.

## Visual and implementation rules

- Keep a shared `viewBox="0 0 24 24"`, consistent stroke style, round caps and joins, and `currentColor` so icons inherit the control's color.
- Pass an explicit rendered size appropriate to the control. Keep the SVG box centered with flex or grid alignment; do not compensate for font baselines with arbitrary offsets.
- Decorative SVGs must be hidden from assistive technology (`aria-hidden="true"`, `focusable="false"`). The interactive control itself supplies its accessible name and state.
- Use distinct direction variants (`arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`) and `plus` / `minus` variants. Disclosure icons reflect the open state without changing the control's label or keyboard behavior.
- In a responsive diagram, align a direction-changing arrow to the flow axis when the layout stacks. Keep symbols that convey prose, code, a mathematical relationship, or authored diagram notation as text; this standard covers interface affordances, not every arrow in project content.
- Preserve focus indicators, target dimensions, motion preferences, and existing interaction semantics when replacing an icon.

## Review checklist

- Arrows and plus/minus marks are visually centered in their controls across the portfolio.
- Repeated icons use the shared component and inherit the intended color.
- Decorative icons are absent from the accessible name; labels and expanded/collapsed state remain available from the control.
- Text arrows and authored diagram notation remain readable as content.