# Feature Specification: Reliable Animated Media Fallbacks

**Feature Branch**: `003-media-fallbacks`

**Created**: 2026-10-02

**Status**: Draft

**Input**: User description: Apply and reassess commit `d10b31a0d5eefbbc5dfd1a58d65c474513af3842`, which addressed incorrect thumbnails when reduced motion is enabled or a GIF is still loading. Establish WebP image use and first-frame image fallback patterns; selectively reuse its media and replacement updates, and define maintainable project standards.

## Clarifications

### Session 2026-10-02

- Q: Qual deve ser o alcance da adoção de WebP nesta feature? → A: Reaproveitar por cherry-pick seletivo os ativos de mídia WebP introduzidos pelo commit informado; não migrar a biblioteca inteira.
- Q: Onde você quer registrar o padrão duradouro para imagens estáticas e fallbacks animados? → A: Manter na constitution o princípio geral de fallback correto e suporte a movimento reduzido; documentar WebP e o procedimento de primeiro frame numa guia de mídia do projeto.

### Session 2026-10-03

- A pedido do usuário, incluir a remoção de `public/projects/ello-read/read-with-ello-book.png`: o commit histórico já a removia e a auditoria não encontrou referências ativas no projeto.
- Incluir avaliação controlada da rolagem nas seis rotas de conteúdo geradas. O build também gera um HTML de redirecionamento em `/experience/`, que leva a `/#experience`; avaliar essa seção durante a rolagem da Home, sem uma gravação de rolagem separada para o redirecionamento. GIFs configurados para autoplay podem começar a ser decodificados fora da tela; tratar isso como hipótese até comparar gravações com os GIFs permitidos e bloqueados. Só alterar o comportamento de mídia se a comparação confirmar uma queda reproduzível atribuível aos GIFs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See an accurate static project image (Priority: P1)

Visitors see a project image that belongs to that project whenever animation is
suppressed by their reduced-motion preference or has not loaded yet. The image
must not be an unrelated portrait or another project’s artwork.

**Why this priority**: Incorrect imagery misrepresents portfolio work in the
initial and reduced-motion experience.

**Independent Test**: Visit animated project media with reduced motion enabled,
then with animation enabled on a slow or unavailable connection. Confirm the
matching static image is visible before and while animation is unavailable.

**Acceptance Scenarios**:

1. **Given** a visitor requests reduced motion, **When** a project has animated
   media, **Then** its matching static image is shown and no animation plays.
2. **Given** an animated preview has not loaded or fails, **When** its media area
   is displayed, **Then** the matching static image remains visible.
3. **Given** an animation becomes ready, **When** the visitor is allowed to see
   motion, **Then** it may replace the static image without changing the project
   represented or causing an unrelated image flash.

### User Story 2 - Browse optimized, consistent portfolio imagery (Priority: P2)

Visitors receive consistent static images across project thumbnails, case
studies, and identity imagery, with image formats and dimensions appropriate to
their use.

**Why this priority**: Consistent assets prevent stale references and reduce
unnecessary image transfer while preserving visual quality.

**Independent Test**: Review every image replacement and project media record;
confirm referenced assets exist, match their displayed project, and use the
approved static-image format and naming convention.

**Acceptance Scenarios**:

1. **Given** a static portfolio image is replaced, **When** its pages are
   rendered, **Then** every reference resolves to the intended image.
2. **Given** an animated preview has a generated first-frame image, **When** it
   is used as fallback, **Then** it depicts the same animation at its opening
   frame and retains the intended aspect ratio.

### User Story 3 - Maintain project-wide media rules (Priority: P2)

Contributors can determine which static image belongs beside an animated source
and how formats and references should be updated, without copying an incomplete
change from an earlier commit.

**Why this priority**: A clear shared rule keeps future media changes consistent
and avoids broken paths when assets are replaced.

**Independent Test**: Use the written media rules to review a future media
addition and determine its animation, fallback, format, and replacement
references without relying on the historical commit.

**Acceptance Scenarios**:

1. **Given** a new animated project image is added, **When** its media record is
   prepared, **Then** the matching static fallback and intended reduced-motion
   behavior are specified.
2. **Given** an image format is changed, **When** the change is reviewed,
   **Then** all consumers are accounted for and no removed source remains
   referenced.

### User Story 4 - Scroll through the site without media-related stutter (Priority: P2)

Visitors can scroll every site page without project animations causing
repeatable dropped frames. Autoplay previews outside the viewport's near-view
range do not begin fetching or decoding until they approach the viewport. The
team records network, decode, and frame outcomes separately so transfer savings
are not presented as a frame-rate improvement.

**Why this priority**: Several large GIF previews are configured to autoplay,
and their shared component requests them as soon as it initializes, including
when their media area is outside the viewport. A cold Home load requested about
18.9 MB of GIF bodies and `/projects/` about 36.0 MB before scrolling. This is
measured avoidable transfer/decode work; it is not proof of low visitor frame
rates.

**Independent Test**: Record a consistent scroll on each generated page route.
For routes showing dropped frames, repeat the same recording with preview GIF
requests blocked. Compare frame outcomes, GIF requests/bytes, and rendering
activity separately to determine whether animated media affects smoothness and
how much offscreen transfer can be deferred.

**Acceptance Scenarios**:

1. **Given** a page in the site, **When** its normal-motion scroll is recorded,
   **Then** the route, viewport, display refresh rate, browser, and dropped or
   partially presented frames are recorded.
2. **Given** a route with repeatable dropped frames, **When** its scroll is
   repeated with project preview GIF requests blocked, **Then** the comparison
   records the number of dropped frames in each of three recordings per
   condition and provides evidence to decide whether GIF activity contributes
   to the dropped frames.
3. **Given** a controlled comparison confirms a media-related issue, **When**
   the feature is completed, **Then** the smallest media-specific change removes
   the repeatable frame-drop pattern while preserving the static fallback,
   reduced-motion behavior, and intended visible preview behavior.
4. **Given** no repeatable media-related issue is found, **When** the route
   review is complete, **Then** the result is recorded, and any reduction in
   offscreen media requests is reported as a transfer/decode improvement only;
   it is not claimed as an FPS improvement without frame evidence.
5. **Given** an autoplay preview lies outside the near-viewport range, **When**
   the page loads, **Then** its GIF request is deferred while its static fallback
   remains visible; when it approaches the viewport, the GIF may load and only
   replaces the fallback after it is ready.
6. **Given** reduced motion is active, **When** an autoplay preview is outside
   the viewport, **Then** its GIF is not requested. Hover and keyboard-focus
   previews still start when directly requested, and browsers without
   `IntersectionObserver` retain the existing preview behavior.

### Edge Cases

- The animated file is missing, fails to load, or takes longer than the static
  fallback to load.
- The visitor changes reduced-motion preference while the page is open.
- The first GIF frame is blank or transitional; the generated first-frame image
  remains the fallback so the convention is consistent across animated assets.
- The same image appears in several page contexts with different aspect ratios
  or crops.
- A static asset is replaced but one or more component or data references are
  missed.
- Existing animated sources remain GIF; this feature does not require converting
  animation formats.
- A page contains multiple autoplay GIFs, some outside the viewport, while the
  visitor scrolls.
- A frame drop also occurs when GIF requests are blocked, indicating the cause
  may be outside this media feature's scope.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every animated project media item MUST have an accurate static
  fallback for reduced-motion presentation and for the period before its
  animation is ready to display.
- **FR-002**: A static fallback MUST represent the same project and intended
  content as its animation; unrelated identity portraits or generic imagery
  MUST NOT be used as substitutes.
- **FR-003**: Every GIF used as project media MUST have a static fallback image
  generated from that GIF's first frame.
- **FR-004**: Reduced-motion preferences MUST suppress animated presentation
  while leaving the matching static fallback available.
- **FR-005**: The matching fallback MUST remain visible while animation is
  loading and when animation loading fails; the animated source MUST NOT replace
  the fallback until animation content is ready to display.
- **FR-006**: Static portfolio images selected from commit
  `d10b31a0d5eefbbc5dfd1a58d65c474513af3842` for this correction MUST retain
  their WebP format, unless a documented compatibility or quality need requires
  otherwise; the feature MUST NOT migrate unrelated static imagery.
- **FR-007**: Image replacement MUST update all references in project records,
  case studies, navigation, and shared components that consume the asset.
- **FR-008**: Existing GIF animations MUST remain animated sources unless
  separately justified; changing their format is outside this feature.
- **FR-009**: Image alternatives MUST preserve meaningful descriptions, intended
  display dimensions, aspect ratio, and fit behavior.
- **FR-010**: The change MUST be scoped to static media fallback correctness,
  image format consistency, and required asset references; it MUST NOT alter
  unrelated portfolio content or redesign media presentation. It MUST remove
  the specifically identified, unreferenced `read-with-ello-book.png` asset
  already deleted by the historical commit.
- **FR-011**: The project's durable media guidance MUST state that animated
  media has an accurate static fallback and respects reduced-motion preferences.
  The constitution MUST retain this guidance at the principle level; the WebP
  format rule and first-frame preparation procedure MUST be documented in a
  project media guide, not as detailed constitution rules.
- **FR-012**: Scroll performance MUST be reviewed on every generated page route
  that contains page content under a recorded, consistent browser and viewport
  setup. The generated `/experience/` redirect MUST be covered through the
  Home's `/#experience` section, without a separate scroll recording. Any
  content route with dropped frames MUST be compared under the same scroll
  conditions with project preview GIF requests blocked before attributing the
  issue to media. Record the dropped-frame count for each of three recordings
  in each condition.
- **FR-013**: A performance implementation change MUST be made only when the
  controlled evidence identifies measurable project-media work or a repeatable
  frame regression. Any reported FPS benefit MUST be supported by repeated
  frame comparisons; reducing network requests or image decodes alone MUST NOT
  be described as an FPS improvement. A change MUST preserve fallback,
  reduced-motion, and visible-preview requirements. General site optimization
  remains outside this feature.
- **FR-014**: An autoplay GIF MUST NOT be requested until its media area enters
  a documented near-viewport range. If `IntersectionObserver` is unavailable,
  existing preview behavior MUST continue to work. An explicit hover or focus
  request MUST continue to start a preview when reduced motion is not active.

### Key Entities *(include if feature involves data)*

- **Animated media source**: A project animation with its existing identity,
  intended playback behavior, and associated static fallback.
- **Static fallback**: A project-specific WebP image generated from the
  animation's first frame and shown when animation is suppressed, loading, or
  unavailable.
- **Media reference**: A use of an asset by a project record, case study,
  navigation element, or shared presentation component.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every animated media instance reviewed in scope displays the
  correct project-specific static image with reduced motion enabled.
- **SC-002**: In every reviewed animated media instance, the correct static
  image remains visible throughout loading and after an animation load failure,
  and no empty or unrelated frame appears before animation playback begins.
- **SC-003**: 100% of converted static image references resolve to existing
  assets, and no deleted PNG replacement remains referenced.
- **SC-004**: Every GIF media source reviewed in scope has a static fallback
  matching its opening frame.
- **SC-005**: A contributor following the project media guide can identify and
  prepare the required static WebP fallback, matching first frame, and asset
  references for a new GIF media item; the guide review records any step that
  requires interpretation beyond its stated rules.
- **SC-006**: The general fallback and reduced-motion principle is assigned to
  the constitution, while the WebP and first-frame procedures are assigned to
  the project media guide.
- **SC-007**: All six generated content page routes have a baseline
  scroll-performance record with route, viewport, browser, display refresh
  rate, normal-motion setting, and observed frame outcomes. The Home recording
  includes scrolling through its Experience section. The build-generated
  `/experience/` redirect is covered by that Home recording, not as a separate
  content page. Any route with frame drops has a
  same-condition GIF-blocked comparison with dropped-frame counts for each of
  three recordings per condition and a recorded decision on how to proceed.
- **SC-008**: When a media-scheduling change is evaluated, the report records
  frame outcomes separately from request counts, transferred bytes, and decode
  activity. It claims an FPS improvement only if repeated frame comparisons
  support it.
- **SC-009**: With normal motion enabled, autoplay GIFs outside the configured
  near-viewport range are not requested on initial load; as their media areas
  approach the viewport, they load and replace the static fallback only after
  readiness. The measured reduction in no-scroll GIF requests and bytes is
  recorded for Home and `/projects/` against the pre-change captures.

## Assumptions

- WebP is the format of the historical static assets selected for this feature;
  this does not by itself establish a blanket conversion of existing imagery.
  Animated GIF sources remain GIF in this scope.
- “First frame” means the opening visual of the same animation, not an arbitrary
  portrait or an unrelated project poster.
- Historical commit assets may be reused when their content is suitable and
  their references are complete, but code changes require review against the
  current component contracts.
- The performance concern is limited to project-media workload during scrolling.
  Current autoplay behavior demonstrably requests large GIFs before users reach
  their media areas, but does not prove a frame-rate problem; unrelated
  scroll/navigation optimization requires separate scope.
- The constitution carries the general principle for accurate static fallbacks
  and reduced motion; detailed format and frame-preparation rules belong in a
  project media guide. Any constitution edit is a separate Spec Kit constitution
  amendment step and is not performed by this clarify flow.
- The historical commit changed Navigation, SupportingProject, cases.ts, and
  projects.ts as well as binaries. The current `projects.ts` still references
  several PNG paths removed by that commit, so media references require a
  complete audit rather than a blind cherry-pick.
