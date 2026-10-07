# Page scrollbar standard

This is the shared visual reference for the portfolio's **vertical page scrollbar**. Scrollable descendants inherit the same colors unless they deliberately define their own behavior, such as the recommendation track hiding its horizontal scrollbar while retaining touch and trackpad scrolling.

## Direction

- Keep the browser's native scrollbar and interaction model. Use the existing dark page color for the track and the portfolio's blue-gray strong line color for the thumb.
- Preserve the platform's default scrollbar width, buttons, hit area, drag behavior, keyboard behavior, and overlay/classic presentation. Do not hide the scrollbar or make it thinner to achieve a visual effect.
- Avoid custom rounded shapes, decorative marks, or hover-only visibility. The scrollbar should be easy to find while remaining quiet beside the page content.
- In browsers that do not support `scrollbar-color`, leave the operating system's native appearance intact. Operating systems and browser preferences may use overlay scrollbars or adjust their presentation.
- Forced-colors/high-contrast modes should use the user agent's scrollbar colors.

## Centralized implementation

The two colors are tokens in `:root` in `src/styles/global.css`:

- `--scrollbar-thumb` uses `--line-strong`;
- `--scrollbar-track` uses `--bg`.

The root `scrollbar-color` declaration styles the viewport scrollbar and inherits to scrollable descendants. Keep scrollbar changes here; do not add one-off rules to pages or components. Keep `scrollbar-width` at its platform default (`auto`).

## Acceptance checks

- The main page scrollbar uses a visible blue-gray thumb over the dark track where the browser exposes scrollbar colors.
- The native width and interaction remain intact; scrolling continues by wheel, touch, keyboard, and thumb drag as supported by the platform.
- Internal scrollable controls inherit the same colors unless there is a documented reason for a surface to use its own scrollbar behavior.
- No page-level vertical scrollbar is hidden or made thinner, and no page introduces WebKit-only decoration that conflicts with the standard property.
- High-contrast/forced-colors modes retain user-agent colors.

## Basis

The standard `scrollbar-color` property styles the thumb and track on the root viewport; `scrollbar-width` is intentionally left at `auto` because MDN cautions that `thin` and `none` can make scrolling harder. The non-standard `::-webkit-scrollbar` family can conflict with standard properties, so this direction uses the standard color property and accepts native fallback where unsupported.

- [MDN: `scrollbar-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-color)
- [MDN: `scrollbar-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-width)
- [MDN: CSS scrollbars styling](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scrollbars_styling)
