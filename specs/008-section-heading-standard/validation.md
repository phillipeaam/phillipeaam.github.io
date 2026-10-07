# Implementation validation

Date: 2026-10-06. Branch: codex/home-section-heading-standard. Human approval: pending.

## Inventory and baseline

Six headings: Home case-studies, projects, teammates, about, experience; catalog All Projects. Approved copy retained from 4864fab. Seven canonical IDs and five aliases follow data-model.md; no duplicate IDs in mapping. Two #work CSS spacing selectors migrated; /work/ routes and work-* project IDs retained. Source audit found no additional hardcoded obsolete Home hrefs outside the shared Navigation implementation. experience and case-study pages inherit shared navigation; project links remain unchanged.

Navigation baseline: spec 002 preserves direct destination and return-position/history behavior; spec 004 preserves archive scrolling and direct Back; spec 005 preserves immediate avatar/name return with restore suppression. Both BaseLayout restoration guards now honor explicit recognized Home targets.

## Checks actually performed

- Astro diagnostics: exit 0, 0 errors, 0 warnings, one existing CommonJS-to-ESM hint in make_contact_sheets.js (first run).
- Production build: exit 0, seven pages generated (first run; final rerun recorded below).
- Browser: Codex in-app browser, Home layout measured at 1440x900, 1024x900, 820x900, 768x900, 390x900. Five support origins identical: x=728.5 desktop 1440; x=520.5 desktop 1024; x=24 at stacked widths. Native scrollbar affects available container width equally. Difference among Home headings: 0px. No horizontal document overflow at 1024/820/768/390.
- All Projects h1/support at all five viewports: x=728.5 at1440, x=520.5 at1024, x=24 at820/768/390; no document overflow. Desktop origins match Home; contextual links remain Back=/ and Contact=#contact.
- Direct cross-page arrivals for all seven canonical and five legacy fragments: reached intended target and active identity after layout positioning. Home/top target top=88px; ordinary section targets approximately104px below 88px header. Contact top=407px because document-end clamping prevents placing it at the exact offset; target remains visible. Existing aliases retain their legacy hash.
- Generated desktop menu activation URLs match all seven canonical hashes; mobile menu renders the same seven hrefs. Mobile menu opened and Escape closed it with focus returned to toggle at390x900.
- Teammates direct arrival plus reload inspected via screenshot and measurement: target top104.015625px, active teammates at1440x900.
- Full canonical/legacy reload matrix repeated after screenshot observation: all12 targets reached with matching canonical active identity and the same offsets as direct arrival.
- Temporary heading fixture exercised short phrase, long paragraph, and unbroken token at all five widths, with identical support origins per width and zero paragraph/document overflow. Fixture removed afterwards; approved live copy never changed. Initial underscored fixture route returned404 and was not counted; successful checks used the corrected temporary route.
- Five Home Projects→Pathless catalog→contextual Back journeys completed. Projects target was104.03125px before locator activation and173.03125px after return in each cycle; browser locator scroll-to-click can alter the departure position, so exact restoration-coordinate equivalence is not claimed from these samples. Avatar activation on Home returned to fragment-free root with Home top88px.
- Initial rapid menu/reload loop sampled intermediate smooth-scroll active states; those samples are not final-state pass evidence. Full-page cross-page checks and the stabilized Teammates reload were used instead. Broad same-page final-state/reload coverage remains pending below.

## Documentation review

Permanent reference: docs/section-heading-standard.md; linked from shared component and destination module. It covers roles, structure, spacing, responsive behavior, canonical/legacy names and change-review procedure. Current docs audit found no separate active heading-standard document to migrate; historical reports/specs remain historical. Shared structure/CSS review confirms natural short/long support wrapping and preserved h1/h2 title IDs; actual stress/zoom checks remain pending.

## Pending acceptance checks

- Actual200% zoom/enlarged text.
- Full desktop/mobile final-state menu matrix, all available cross-page journeys, reduced-motion behavior, unknown/malformed hashes, Back/Forward, exact saved-position equivalence for repeated project-return journeys, both identity controls from another page and stale restoration intent at runtime.
- JavaScript-disabled canonical/legacy navigation: source/build retains native anchors; browser execution with scripts disabled has not been performed. Current browser control exposes viewport override but no script-disable or reduced-motion override capability.
- Human visual approval before merge/push. No commit or push performed for this feature.

## Final command results

Final source rerun: git diff --check passed; npm run check exit0 (0 errors,0 warnings,1 pre-existing hint); npm run build exit0, seven pages generated. Temporary fixture removed. Source audit found no obsolete Home hrefs in src; native aliases and canonical IDs retained in generated markup.

## User correction — 2026-10-07
Desktop support blocks and text now align to the right content edge. Mobile remains left-aligned and stacked. Previous left-origin measurements describe the earlier implementation and do not validate the corrected desktop layout.

## Alignment clarification — 2026-10-07
The support block remains positioned on the right (`justify-self: end`); text uses `text-align: left` so every wrapped line begins at the same left edge. This supersedes the earlier right-aligned-text correction.

## Editorial line-width correction — 2026-10-07

The user clarified that the visual pattern is a right-anchored, content-sized support block; all lines align to its left edge; when wrapping occurs, each line above must be wider than the line below. This requirement applies through the shared `SectionHeading` component to all six support paragraphs, including All Projects.

- Replaced `text-wrap: pretty` with sequential `text-wrap: wrap`; balanced line wrapping can violate the required order.
- Revised About support to “How I investigate behavior and make sound engineering decisions.” and catalog support to “Professional products, independent games, and technical work beyond featured case studies.” Meaning/claims retained; phrasing adjusted.
- Browser Range measurements on Home at CSS viewport widths 821, 860, 900, 960, 1024, 1100, 1280, and 1440px. Every Home support paragraph with multiple lines had strictly descending rendered line widths at every sampled width; single-line paragraphs are exempt. At each width the paragraphs shared the same right edge; each paragraph's rendered lines shared its own left edge.
- Home right edges were x=774 at 821px, 813 at 860px, 853 at 900px, 913 at 960px, 977 at 1024px, 1061 at 1100px, and 1233/1313 at 1280/1440px. At 1280/1440 some paragraphs are one line, so only block placement and left alignment were checked for those.
- The full 821–1440px width range was sampled at representative widths, not every possible CSS pixel. Catalog-specific rendered widths, the 820px mobile boundary, mobile/no-overflow, zoom, and stress-fixture checks remain pending; T008 remains open. Prior copy/line-wrap validation above predates this correction where explicitly noted and must not be treated as evidence for the updated rule.
- Follow-up: Home paragraph blocks shared exact right edges at every sampled width (subpixel CSS coordinates preserved). Multi-line paragraphs shared left origins within each text block and passed strict descending rendered line widths. No CSS text balancing is active.
- Updated checks after this correction: `git diff --check` passed; `npm run check` exit 0 (0 errors, 0 warnings, 1 existing CommonJS-to-ESM hint in `make_contact_sheets.js`); `npm run build` exit 0, 7 static pages generated.
- T008 desktop Home geometry subtask is complete at the widths above. T008's remaining mobile/catalog/stress/200%-zoom checks remain pending, as do navigation tasks T013/T016/T023/T024 and human visual approval.

## Right-edge correction — 2026-10-07

The user pointed out that the support block still looked detached from the right edge. Browser inspection showed the Grid item's `width: fit-content` resolved to the full available track width, creating a 584px block at 1440px. Changed the shared desktop paragraph width to `min(100%, 44ch)` so it caps the content measure and its right edge aligns with the right grid column; mobile override remains full natural width.

- At Home viewport widths 821/860/900/960/1024/1100/1280/1440px, each of the five desktop support block right edges exactly matched its heading container's right edge; all paragraphs shared the same right edge at each viewport.
- Every multi-line paragraph retained strictly descending line widths at those widths; Range measurements confirmed internal left-aligned line starts.
- Screenshot at 1440px confirmed the Home support block sits in the right column and wraps at a 44ch measure. The previously broad two-line copy block is now constrained.
- Catalog screenshot/geometry, 820px and mobile overflow, zoom and stress fixture are still untested; no claim of acceptance for those cases.
- These intermediate 44ch/33ch width results describe an experiment that was subsequently rolled back after the user asked to consult history. They are not the current visual implementation and should not be used as acceptance evidence.

## Restore prior visual behavior — 2026-10-07

After the user noted that iterative changes were worsening the page, restored the shared heading geometry from the branch's pre-spec `HEAD` (`4864fab`): second grid track `fit-content(45ch)`; support paragraph `width: max-content; max-width: 45ch; justify-self: end; text-align: left`, with natural browser wrapping. The shared component, semantic migration, and prior accepted edits remain. Reverted only copy wording changed in the last alignment iterations. At 1440px, browser measurement showed the About text ending at the shared right edge; the five Home paragraph boxes share the same right edge (x=1312.5). This supersedes the right-edge/33ch experiment. T008 is reopened for full validation after restoration; no mobile/catalog/zoom acceptance is claimed.

The user clarified that the Case studies screenshot documents the unresolved right-side gap between visible text and the section edge; it is not the desired reference. The user then confirmed the intended pattern: the first line aligns to and reaches the right edge; any continuation begins at the left edge of the support block and aligns left. This supersedes the earlier all-lines-left rule and the prior waiting-for-clarification note.

Implementation record: the shared SectionHeading component now accepts a `supportLead` and `supportContinuation` for the six headings. At widths above 960px CSS aligns the lead to the right edge and the continuation to the block origin. At and below 960px, both spans flow together as natural inline text; the existing <=820px layout stacks the paragraph under the title. No section-specific alignment CSS was added.

- Browser Range measurements at Home and `/projects/` at 1440px confirmed the lead's rendered right edge matches the support column right edge (x=1312.5). Continuations begin at their own support block's left edge. Measured lead/continuation widths: Case studies 450.7/142.9px; Projects 461.1/318.6px; Teammates 332.2/190.1px; About 295.1/181.7px; Experience 398.2/340.9px; All Projects 461.1/318.6px. Every lead is wider than its continuation.
- At 960px, 820px, and 390px, the content remained within the viewport; document scroll widths were 945, 805, and 375px respectively, below viewport widths of 960, 820, and 390px. Support paragraphs had no horizontal overflow; spans returned to natural inline flow.
- Browser screenshot at 1440px showed the first line reaching the right boundary, with the continuation starting at the block's left edge. This addresses the spacing problem in the supplied screenshot.
- Remaining full stress, zoom, and broader responsive/navigation acceptance checks remain pending; T008 stays open. The current report covers representative browser observations only and does not claim complete acceptance.
- `git diff --check` passed. `npm run check` passed with 0 errors, 0 warnings and 1 existing CommonJS-to-ESM hint in `make_contact_sheets.js`. `npm run build` passed and generated seven pages.

## Navigation label update — 2026-10-07

Per the user's decision, renamed the selected in-depth work section from Case studies to Featured. Updated the canonical ID, menu label, section observer identity, heading text, and spacing selectors to `featured` / `#featured`. Preserved both prior Home fragments `#case-studies` and `#work` as native aliases at the same section. Updated current reference, data model, plan, and acceptance mapping. Existing `/work/` case-study routes and project IDs are unchanged.

- Browser accessibility tree and screenshot at the local Home page show the Featured menu item linking to `#featured`, active highlighting, and the visible section heading “Featured”.
- `git diff --check` passed; `npm run check` passed with 0 errors and 1 existing CommonJS-to-ESM hint; `npm run build` passed with 7 generated pages.
- Direct-open/reload and active identity for the newly added `#case-studies` alias have not yet been separately exercised in the browser; it is emitted by the same native alias mechanism used for the prior aliases. Remaining legacy matrix coverage stays open under T016/T023.

## Reconciliation run — 2026-10-07

Environment: local site at `http://localhost:4321/`, Codex in-app Chromium browser; viewport overrides via browser viewport control. These are browser observations, not physical-device or assistive-technology results.

| Area | Observed result | Evidence limits / task status |
| --- | --- | --- |
| Six heading blocks | Home `/` at 1440, 1280, 1024, 960, 820, and 390 CSS px; catalog `/projects/` at 1440, 1280, 1024, 960, 820, 390, and 320 CSS px. Desktop lead right edges matched the support column; continuations began at their block's left edge and each measured lead was wider. At 960px spans flowed inline; at 820px and below the block stacked below the title. Scroll-width measures stayed within the browser's client width. | Representative sizes and short/long stress fixtures are recorded below. Manual browser zoom was removed from scope by user decision; no exhaustive width sweep is claimed. |
| Direct/canonical and legacy navigation | Direct-open/reload matrix covered seven canonical destinations and the five previously exercised legacy hashes (`#top`, `#work`, `#other-work`, `#recommendations`, `#about-phillipe`). Canonical active identity and sticky-header clearance were inspected after settling. `#case-studies` remains a separate alias that was not directly reloaded in this run. Unknown `#unrecognized-section` and malformed `#%` did not crash the page; console error count observed as zero. | `#case-studies` direct/reload, native navigation with JS disabled, and stale restore intent remain unverified. T016/T023 remain open. |
| Desktop/mobile menus and history | At 1440px, desktop Featured click changed URL to `/#featured` and active identity to Featured. At 390px the seven mobile links exposed canonical hashes; selecting Experience changed to `/#experience`, updated active identity, and closed the menu. Escape closed the catalog mobile menu and returned focus to its toggle. Featured Back/Forward restored the selected route/active state. | Full keyboard/focus matrix, reduced-motion mode, and every cross-page source/destination pair were not repeated. T013/T024 remain open. |
| Saved Home position | Five `/#projects` → `/projects/` → contextual Back cycles. Before the automated click, Home was at y=2643; the link locator scrolled to y=2426 before dispatching the click. The navigation handler therefore saved y=2426. Every return was y=2426 (delta 0 from the actual saved departure), all five times. | Exact-position criterion passed for these five observed journeys; this does not close composite T024, which still includes other identity/stale-intent and navigation cases. |
| Cross-page identity | The avatar and wordmark returned from the catalog and a case page to fragment-free Home. `/experience/` redirected to `/#experience`. | Not every in-content cross-page link or legacy route was tested in this run. |

No real screen reader or 200% browser zoom was available. Physical-device/touchscreen testing is out of scope per the user's 2026-10-07 decision; browser touch emulation is sufficient. Reduced motion and JavaScript-disable controls were later exercised in isolated Chrome DevTools; see the following update. No emulation is represented as a real-device result.

## Isolated Chrome DevTools Protocol checks — 2026-10-07

Method: started the local site at `http://127.0.0.1:4321/` and used a separate, temporary Chrome profile connected over loopback Chrome DevTools Protocol. These are browser emulations, not the user's normal Chrome profile or physical-device tests.

- `/projects/?nojs=cdp#pandora`, 1440×900 CSS px, JavaScript execution disabled before navigation: the page rendered 21 project records, Pandora's details started closed, and its native `<summary>` remained visible. A browser mouse input dispatched to that summary opened the native `<details>` element (`open` attribute observed). This verifies progressive disclosure without the catalog scripts; it does not cover script-driven search/facets or all keyboard paths.
- A controlled initial navigation to `/projects/?reduceInitial=cdp#pandora`, 1440×900 CSS px, with DevTools emulating `prefers-reduced-motion: reduce`: `matchMedia` returned true, all six animation elements had no `src`, all six poster fallbacks were visible, and `performance` reported zero GIF requests. Toggling the emulated preference after load also removed GIF `src` attributes and restored poster fallbacks. This validates the browser preference handler; it is not an operating-system preference test.
- `/projects/?touch=cdp#pandora`, 390×844 CSS px with Chrome touch emulation: tapping the visible “More details” button opened Pandora and changed `aria-expanded` from `false` to `true`; document `scrollWidth` remained 390px. This is emulated input, not a physical touchscreen test.
- Canonical and legacy fragment IDs were queried during direct URL navigations, but the sequence did not yield stable sticky-clearance and final-scroll evidence for every destination. Do not treat it as completion of T016. Active-link behavior, all direct/reload journeys, browser history, malformed hashes, actual 200% browser zoom, and full mobile-menu keyboard behavior remain pending.

These DevTools observations narrow T013/T016/T023/T024 but do not satisfy their complete acceptance matrices. Physical-device testing is not required. T023 remains open because actual 200% browser zoom/enlarged text is untested.

## Additional browser reconciliation — 2026-10-07

Method: separate temporary Chrome profile controlled through Chrome DevTools Protocol on loopback; local site at `http://127.0.0.1:4321/`. Viewports below are CSS px. Temporary heading fixtures were injected only into the browser DOM and then removed by reloading; no source copy was changed.

| Route / viewport | Observed result | Acceptance limit |
| --- | --- | --- |
| Home `/` and `/projects/`, 1440×900, 1280×900, 1024×900, 961×900, 960×900, 820×900, 390×844, 320×844 | Short and long lead/continuation fixtures were rendered at each width. Above 960px the measured desktop lead width was 467.6px; continuation wrapped naturally to a maximum line width of 427.3px; lead right edge matched support-block right edge (0px difference), continuation lines shared the block's left origin, and document width did not exceed viewport. At/below 960px spans used natural inline flow; narrow layouts had no horizontal overflow. Existing geometry for all six production headings at representative Home/catalog sizes is recorded in the Reconciliation run above. | Stress fixture confirms the intended short/long pattern at sampled widths. A pathological long, unbroken lead token wrapped within the viewport but its own fragments did not all form the intended single lead line. 200% zoom remains untested; T008 stays open for zoom and full acceptance. |
| Home canonical destinations, direct open and reload, 1440×900 | `#home`, `#featured`, `#projects`, `#teammates`, `#about`, `#experience`, `#contact`: hash persisted; active item matched; target top was 88px for Home, 104px for ordinary sections, and 407px for Contact (document-end clamp); sticky header bottom was 88px. | Direct/reload and clearance observed for all seven; Contact is visible at the document end rather than aligned to the normal offset. |
| Home legacy destinations, direct open and reload, 1440×900 | `#top→home`, `#case-studies→featured`, `#work→featured`, `#other-work→projects`, `#recommendations→teammates`, `#about-phillipe→about`; active identity matched and target remained below the 88px sticky header. | Six aliases, including `#case-studies`, were directly opened and reloaded. |
| Home, JavaScript disabled and reduced motion emulated, 1440×900 | Direct native fragment arrivals for all seven canonical and six legacy fragments found the target; target top was 88px (Home), 104px (sections), or 407px (Contact). CDP `DOM.getBoxModel` was used to read target viewport position; reduced-motion preference was active. | No-JS fragment arrival and reduced-motion environment observed. This does not claim assistive technology or browser zoom. |
| Home explicit restore intent then `/#featured`, 1440×900 | With stored y=5000 and restore flag set, explicit `#featured` took precedence: URL stayed `#featured`, target top=104px/header bottom=88px, active Featured, stale flag cleared. | Stale restore precedence observed. |
| Home desktop navigation and mobile menu, 1440×900 and 390×844 | Clicking desktop Featured after legacy `#work` changed URL to `#featured` and settled on active Featured. On mobile, Enter opened the menu; Tab moved through Home and Featured links; Enter selected Featured and closed the menu. Escape closed the menu and focus returned to its toggle. | Browser keyboard interaction observed. Mobile selection was evaluated after route settle; no physical device used. |
| `/experience/`, 1440×900 | Each of seven cross-page Home links reached `/` with matching canonical hash and active item; target remained below the sticky header after scroll settled. | All available cross-page navigation destinations exercised. |
| `/projects/` and `/work/wallaces-quest/`, 1440×900 | Contextual Contact links reached the local Contact anchor; Back returned to fragment-free Home with saved scroll position. Avatar on catalog and wordmark on case returned to Home at scrollY=0. | Available context/back/identity journeys exercised; saved position preserved in observed returns. |

Navigation tasks T013, T016 and T024 are reconciled as complete from the recorded scenarios. This includes menus/active state, Back/Forward, malformed and unknown fragments, seven cross-page navigation links, contextual Back/Contact links, avatar and wordmark identity controls, stale restoration intent, and five exact saved-position cycles measured after locator scroll-to-click. T008 and T023 are complete for the agreed scope: the user removed manual browser-zoom/enlarged-text checks on 2026-10-07 because the available browser setup could not perform them. The attempted CDP keyboard shortcut did not change browser zoom and was not counted as a test. No concrete application defect was found in this browser validation.
