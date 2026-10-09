# Animated media standard

Use this profile for project gameplay and product previews. These are house targets for this portfolio, not format limits or universal web rules.

## Recommended profile

| Property | Standard | Exception |
| --- | --- | --- |
| Aspect ratio | Preserve source and action; use 16:9 landscape and 9:16 portrait. | Square or another ratio is fine when the product itself needs it. Do not crop useful UI or stretch the image. |
| Canvas | Landscape: 960 × 540 px. Portrait: 540 × 960 px. Square: 640 × 640 px. | These are maximum working canvases, not minimums. If displayed larger, use up to 2× the largest CSS display size, then check transfer size and sharpness. |
| Frame rate | Target 15 fps. | Use 10–12 fps only when motion is mostly static and reducing file size is necessary. Avoid 24/30/60 fps for looping previews. |
| Duration | 4–8 seconds, with one clear action and a clean loop. | Up to 12 seconds when needed to show a complete short flow. Split longer flows into multiple clips. |
| File size | Aim for ≤ 2 MB; preferred ≤ 1 MB. | Up to 4 MB only when needed and loaded on demand. Rework or use video above that. |
| Loop | Infinite loop only for short, nonessential previews; make the seam unobtrusive. | For automatic movement shown alongside content for over 5 seconds, provide pause/stop/hide control or make it stop within 5 seconds. |

Dimensions are asset pixels. Preserve the full useful composition in the source. These targets account for the portfolio's 16:9 preview cards and portrait Diggy capture instead of forcing every asset to one ratio.

## Choosing a format

- Prefer animated WebP for short, silent, looping previews displayed as images. It supports animation, full-color frames, and alpha transparency. Smaller output is common, but not guaranteed: compare each export visually and by bytes.
- Use MP4/WebM video for longer, photographic, or high-motion sequences, files above the size target, or media that needs native pause and seek controls. For an ambient loop, use muted, inline playback and provide a poster.
- Keep GIF when an external platform or workflow requires it, or when a small palette/simple animation makes it a good fit. GIF is limited to 256 colors and binary transparency, and can become very large.
- WebP is supported by current major browsers, but check publishing platforms that may reprocess or reject animated WebP.
- Use static WebP for still images; do not encode a still as an animation.

## Composition and quality

- Keep one animation focused on one action. Remove idle lead-in/out, redundant frames, empty margins, and unrelated desktop areas. Keep cursor motion only when it explains the interaction.
- Preserve source aspect ratio and useful content. For a UI capture, remove unnecessary browser chrome and keep text readable at rendered size.
- Optimize the export and compare at native display size. Check text, gradients, edge halos, transparency, frame timing, and loop seam.
- Record dimensions, duration, FPS, file size, format, quality (70%), and lossless state (off) for each replacement.

## Accessibility and fallback

- Every animated project preview must have a static WebP fallback made from its opening frame. Do not substitute a portrait, poster, or image from another project. Preserve frame compositing when extracting it.
- Show the static fallback first, while animation loads, after failure, and when reduced motion is enabled. Reveal animation only after it loads successfully and is ready.
- GIF and animated WebP run independently of CSS, so `prefers-reduced-motion` cannot stop them. Suppress animated requests and keep the static fallback for visitors who prefer reduced motion.
- Avoid rapid flashing. Never use animation as the only way to convey essential information. For automatic movement lasting more than 5 seconds alongside other content, provide a control to pause, stop, or hide it.
- Write alt text for visible content. Describe motion separately only when it adds meaning, and expose only the currently visible layer to assistive technology.

## Export dimensions for this site

The current portfolio has five gameplay GIFs and one animated WebP. The GIFs range from 760 × 428 to 2560 × 1440 pixels and about 1.5 MB to 14.8 MB. Diggy uses a 540 × 960 px animated WebP (2.14 MB). Preview cards are 16:9, while Diggy remains portrait. Use these practical canvas targets:

- Landscape: **960 × 540 px** (16:9).
- Portrait: **540 × 960 px** (9:16).
- Square: **640 × 640 px** (1:1).
- For another ratio, preserve it and fit within a 960 px long edge.
- If a display context is wider, size to at most 2× its CSS display dimensions, then confirm the weight target.

These are export targets, not a mandate to crop unusual footage. Keep the full useful composition; choose `contain` when cropping would lose information.

## References

- [Google WebP: animated WebP FAQ](https://developers.google.com/speed/webp/faq?csw=1)
- [Google WebP: format and browser support](https://developers.google.com/speed/webp)
- [MDN: image format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [web.dev: replace animated GIFs with video](https://web.dev/articles/replace-gifs-with-videos?hl=en)
- [MDN: reduced motion accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
