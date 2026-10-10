# Case-study routing

## Canonical contract

All included publishable cases use `/featured/<slug>/`: Ilhas do Alfabeto, Wallace’s Quest, Read With Ello and Craque da Fluência. Preserve existing slugs, project IDs and catalog anchors. `/#featured` is a Home fragment, not a case route.

`src/data/caseStudyRoutes.ts` owns `caseStudyPath(slug, baseUrl)`. Use it for Home Featured, ProjectRecord, RichProjectRecord, NextProject and experience work resolution. The current renderer is `src/pages/featured/[slug].astro`. Case-specific canonical metadata uses the configured Astro site and this path without query/hash. BaseLayout emits the optional canonical link; other page metadata is unchanged. No sitemap integration existed in the inspected configuration; none was added.

## Legacy compatibility and hosting

The deployment workflow publishes Astro's static output to GitHub Pages. Astro 7.3.5 is the installed runtime observed during validation. A generated HTML page cannot configure a GitHub Pages HTTP 301. See [Astro routing documentation](https://docs.astro.build/en/guides/routing/), accessed 2026-10-10.

`src/pages/work/[slug].astro` generates one small compatibility page for each included publishable case. With JavaScript, `location.replace` forwards to the canonical path and retains the current query and fragment without adding a forwarding history entry. With JavaScript disabled, a noscript meta refresh forwards to the canonical case, and an explicit link is available if forwarding is blocked. Both pages declare the canonical URL.

Observed limitation: without JavaScript, meta refresh drops query parameters and the original fragment in the tested Edge environment. The canonical page still opens; suffix preservation requires the script or server-level redirect support. The current static host cannot supply that server behavior through this repository's routing code. Do not label compatibility pages as HTTP permanent redirects. Production hosting has not been deployed/observed in this task.

## Validation — 2026-10-10

Method: installed Microsoft Edge, headless Playwright outside sandbox, emulated viewports; development server `http://localhost:4321` and separately built static output via Astro preview `http://127.0.0.1:4322`. No physical-device or assistive-technology test is claimed.

| Route / viewport | Method and observed result |
|---|---|
| All four `/featured/<slug>/` routes; 1440×900, 820×1180, 390×844; dev and static preview | HTTP 200, expected nonempty h1, canonical metadata pointing to the production `/featured/<slug>/` URL, no document horizontal overflow and no internal `/work/` links in the page. |
| `/work/<slug>/?source=legacy#main`, all four slugs; 1440×900; dev and static preview | Forwarded to the corresponding canonical URL with query and fragment preserved. |
| `/work/ilhas-do-alfabeto/?source=legacy#story-1`; 390×844; dev and static preview | Forwarded with suffix preserved; target story heading exists. |
| `/#featured` → Ilhas case → browser Back; 1440×900; dev and static preview | Click reached canonical case; browser Back returned to `/#featured`. Follow-up measured Home scroll before/after: 421px → 421px in both servers (0px difference), at this viewport and entry point. |
| `/projects/#ilhas-do-alfabeto` → View case study → Next project; 1440×900; dev and static preview | Catalog CTA opened canonical Ilhas route; next-case link opened `/featured/wallaces-quest/`. |
| Ilhas case keyboard entry and identity return; 1440×900; dev and static preview | Tab focused Skip to content with solid visible outline; identity link returned Home. This is sampled focus behavior, not a complete keyboard audit. |
| Ilhas case mobile menu → Back; 390×844; dev and static preview | Existing menu opened; Back returned Home. |
| `/featured/ilhas-do-alfabeto/` and old Ilhas URL with JavaScript disabled; 390×844; dev and static preview | Canonical h1 readable; legacy meta refresh opened canonical case but dropped query/hash, as documented above. |
| Ilhas opening screenshots; 1440×900, 820×1180, 390×844; dev | Visually inspected title, navigation, hero and visible copy/media: retained composition with readable wrapping. No editorial score assigned. |

Checks: Astro diagnostics passed (0 errors, 0 warnings; one pre-existing CommonJS hint in make_contact_sheets.js). Production build passed and generated 11 pages, including four canonical cases and four compatibility pages. Project asset check passed for 31 references. `git diff --check` passed.

Earlier `/work/` validation logs remain historical records. Current feature 009 guidance/contracts are amended without changing completed-task or human-review statuses. Pending Ilhas content/media work was preserved, not newly reviewed or approved here. No commit, staging change or deployment performed.


### External CTA spot-check

On 2026-10-10, Microsoft Edge/Playwright outside sandbox opened all four external CTAs rendered inside the four case pages. The Ilhas official product page returned 200 and identified Ilhas do Alfabeto as the literacy product; its gameplay short URL redirected to YouTube and identified Ilhas gameplay. Wallace's itch.io page returned 200 with a Run game action and its tactical RPG description; its YouTube link returned 200 and identified a gameplay development demo. Labels/destinations remain unchanged. These observations establish contextual reachability, not successful full game/video playback or personal authorship. Automated web fetches initially failed for itch.io/YouTube; the normal browser resolved those restrictions. No external link was removed from a fetch error.
