# Quickstart: Home Navigation from Header Identity

## Prerequisites

- Node.js and npm available for the repository.
- Dependencies installed with `npm ci` if `node_modules` is not already present.

## Automated project checks

From the repository root, run:

```sh
npm run check
npm run build
git diff --check
```

Expected result: Astro diagnostics and production build complete successfully, and `git diff --check` reports no whitespace errors.

## Manual end-to-end scenarios

1. Open a nested project or case-study page, scroll to a position where the header is visible, and activate the avatar. Confirm the browser reaches the Home root at scroll position zero immediately.
2. Repeat from a nested page using the name beside the avatar. Confirm the same destination and behavior.
3. On Home, scroll to a lower section and activate the avatar, then repeat with the name. Confirm both return directly to the beginning without smooth-scroll animation.
4. From Home, record a lower scroll position, navigate to a nested page, then activate either identity link. Confirm the previous Home position is not restored.
5. Repeat the two identity-link activations using keyboard navigation. Confirm each has a visible focus indicator and can be activated with Enter; inspect accessible names with browser accessibility tooling.
6. Inspect desktop, tablet, and mobile viewport widths. Confirm both identity links remain visible, reachable, and usable without overlap.
7. Activate the existing Home menu item and contextual return links to confirm their behavior remains unchanged.

Record only the viewport sizes and browser/runtime checks actually exercised.
