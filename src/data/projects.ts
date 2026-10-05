export type StoryField = { label: string; text: string };
export type NarrativeDiagram = {
  title: string;
  caption: string;
  groups: {
    label: string;
    tone: 'player' | 'local' | 'service' | 'resource' | 'package' | 'app';
    steps: { label: string; detail?: string; next?: string }[];
    handoff?: string;
    handoffAsync?: boolean;
  }[];
  notes?: { label: string; text: string }[];
};
export type StoryNarrative = {
  intro: string;
  blocks?: { label: string; text: string }[];
  diagram?: NarrativeDiagram;
  layout?: 'editorial';
  visual?: 'grid-search';
  media?: { src: string; mobileSrc?: string; mobileWidth?: number; mobileHeight?: number; alt: string; caption: string; width: number; height: number; maxWidth?: number; variant?: 'portrait' };
  technical?: { label: string; points: string[] };
};
export type Story = {
  title: string;
  framing: string;
  eraLabel?: string;
  fields?: StoryField[];
  evidenceLabel?: string;
  behavior?: string;
  evidence?: string;
  diagramLabel?: string;
  diagram?: string[];
  mermaid?: string;
  compact?: boolean;
  narrative?: StoryNarrative;
};

const wallaceStories: Story[] = [
  {
    title: 'Coordinating the Tactical Combat Loop',
    framing: 'One owner for turn order; unit actions and battle outcomes resolve on their own timelines.',
    eraLabel: 'Combat orchestration',
    narrative: {
      intro: 'I built the encounter around a shared turn handoff. The manager chooses the next living unit, while each unit carries out its own movement or attack before signaling that its turn is over. Death follows a separate path into the encounter rules, so action completion and victory or defeat are not confused with a simple timer.',
      layout: 'editorial',
      blocks: [
        { label: 'The challenge', text: 'The next actor cannot start while movement, attack animation or damage feedback is still unfolding. The player may move or attack without ending the turn, while enemy behavior follows its own action sequence. A unit death can also change the outcome mid-flow.' },
        { label: 'The approach', text: 'GameManager owns the active-unit index and starts the next living unit. Movement runs over path steps; attack resolution waits for the animation and target interaction to finish. The player uses Wait to end the turn, and enemies signal the same EndTurn handoff after their sequence. OnDeath separately asks configured stage conditions whether the encounter continues or finishes.' },
        { label: 'The trade-off', text: 'One scheduler makes player and enemy turns legible, and the combat scene connects actions to victory and defeat. That clarity comes with coupling to scene services and event timing: a missed animation or interaction signal can stall an action. I would keep the central turn owner while making action completion and cancellation contracts more explicit.' },
      ],
      diagram: {
        title: 'A unit turn advances after its owner signals completion',
        caption: 'The active unit type drives the turn banner, not a team-wide phase. Action completion and death evaluation are separate handoffs in this encounter model.',
        groups: [
          { label: 'GameManager · turn owner', tone: 'local', steps: [{ label: 'Set up encounter', detail: 'Board, units and event subscriptions', next: 'choose next living unit' }, { label: 'StartTurn', detail: 'Sequential per-unit index' }, { label: 'Advance index', detail: 'Only after Unit.EndTurn' }] },
          { label: 'Active Player / IAUnit', tone: 'player', steps: [{ label: 'Choose an action', detail: 'Player: move, attack or Wait · Enemy: action sequence', next: 'execute without advancing global turn' }, { label: 'EndTurn', detail: 'Player Wait or enemy sequence completed' }] },
          { label: 'Movement / Combat', tone: 'service', steps: [{ label: 'Resolve over time', detail: 'Movement coroutine or attack animation → hit → damage response', next: 'completion returns to unit' }, { label: 'Death event', detail: 'OnDeath follows the death response' }] },
          { label: 'Stage conditions', tone: 'resource', steps: [{ label: 'Evaluate on death', detail: 'Loss first, then win', next: 'continue or finish' }, { label: 'Finish / transition', detail: 'Configured encounter outcome' }] },
        ],
        notes: [{ label: 'Two different handoffs', text: 'An action can finish without ending a player turn; EndTurn is the signal that advances the scheduler.' }, { label: 'Timing seam', text: 'Attack completion waits for animation and target-interaction signals. A missed signal can leave that wait unresolved.' }],
      },
      technical: { label: 'Implementation details & limits', points: ['GameManager subscribes to Unit.OnEndTurn and Unit.OnDeath. A dead unit is skipped when the index advances; death separately invokes stage-condition evaluation.', 'Enemy behavior uses a single player target and an attack–move–attack sequence when possible. It is a concrete encounter behavior, not advanced tactical AI.'] },
    },
  },
  {
    title: 'Separating Grid Pathfinding into a Standalone Module',
    framing: 'Making traversable-grid data and route queries understandable apart from the combat scene.',
    eraLabel: 'Grid & pathfinding',
    narrative: {
      intro: 'Movement in Wallace’s Quest depends on a spatial model beneath the visible encounter. As the project evolved, I separated walkability, node relationships and route search from encounter-specific movement code so the grid rules could be inspected in their own scene.',
      layout: 'editorial',
      blocks: [
        { label: 'The challenge', text: 'A route query has to respect Tilemap obstacles, four-direction movement and destinations that cannot be reached. In the original encounter, search and board-specific callers were closely linked, which made the spatial rules harder to inspect independently.' },
        { label: 'The approach', text: 'A rectangular SqmMap records walkability, NodeMap connects orthogonal neighbors, and Pathfinder searches from grid start to target. The search selects a frontier node using traveled cost plus Manhattan distance, then reconstructs parent links into a route when it finds the target. A separate scene can visualize the result.' },
        { label: 'The trade-off', text: 'The separation made grid behavior easier to reason about, but the older encounter callers were not fully migrated to the new module. It remained an independent exploration of the same game’s movement system, not a replacement powering the public combat build.' },
      ],
      visual: 'grid-search',
      diagram: { title: 'From Tilemap obstacles to a route query', caption: 'The model separates walkability, neighbors, search and route output.', groups: [] },
      technical: { label: 'Search semantics & limits', points: ['A successful result follows parent links to return ordered nodes excluding the start. Equal endpoints, invalid coordinates or unreachable targets return null; start walkability is not explicitly validated.', 'This is cost-plus-Manhattan grid search, not guaranteed optimal A*. It does not relax an already-open node when a cheaper path is discovered. The current migrated demo controls are unusable, and no measured speed claim is supported.'] },
    },
  },
];

const ilhasStories: Story[] = [
  {
    title: 'Desafio dos Sons Iguais — Gameplay Sequencing',
    framing: 'A sound-matching activity needed to connect player input, spoken content, feedback, and round outcomes.',
    fields: [
      { label: 'Problem', text: 'Cards, audio prompts, character actions, and results had to form one readable activity.' },
      { label: 'Constraint', text: 'The flow also had to accommodate tutorials, hints, and content variations.' },
      { label: 'Approach', text: 'I worked on gameplay flow, card interactions, audio and camera timing, boss behavior, and victory and defeat states.' },
      { label: 'Result', text: 'Those parts became a playable minigame within the larger product.' },
    ],
    evidenceLabel: 'Ilhas · sound-matching activity',
    behavior: 'The activity combines sound prompts, card choices, feedback, and round outcomes.',
    evidence: 'Project history records substantial work on this activity; public gameplay establishes the product, not individual authorship.',
    diagramLabel: 'Activity sequence', diagram: ['Prompt and content', 'Player action', 'Feedback and result'],
  },
  {
    title: 'Shared Minigame Systems',
    framing: 'Distinct activities needed common lifecycle, interface, and feedback behavior.',
    fields: [
      { label: 'Problem', text: 'Many minigames repeated startup, hints, HUD, and completion behavior.' },
      { label: 'Constraint', text: 'Shared behavior had to coexist with each activity’s rules and content.' },
      { label: 'Approach', text: 'I contributed to common lifecycle, HUD, hint, and result flows while maintaining activity-specific behavior.' },
      { label: 'Result', text: 'Multiple activities could use shared behavior while keeping their distinct mechanics.' },
    ],
    evidenceLabel: 'Ilhas · minigame flow',
    behavior: 'Activities share interface and completion patterns while retaining distinct interactions.',
    evidence: 'Repository-derived history describes these shared contributions; primary diffs are needed for stronger ownership claims.',
    diagramLabel: 'Shared and specific layers', diagram: ['Shared lifecycle', 'Activity rules', 'Player feedback'],
  },
  {
    title: 'Long-Lived Minigame Production',
    framing: 'Activities had to remain workable as content, variants, and builds evolved.',
    fields: [
      { label: 'Question', text: 'How can activity-specific gameplay be maintained across a long-lived product and deployment variants?' },
      { label: 'Approach', text: 'I maintained gameplay across minigames and supported production builds and deployment variants.' },
      { label: 'Consequence', text: 'This describes ongoing production work, not sole ownership of the framework or every release.' },
    ],
    evidenceLabel: 'Ilhas · production variants',
    behavior: 'Public gameplay shows distinct activities within the commercial product.',
    evidence: 'Project history records maintenance and variant support; public media cannot establish individual release responsibility.',
    diagramLabel: 'Production context', diagram: [], compact: true,
  },
];

const elloStories: Story[] = [
  {
    title: 'Quest & Progression — Coordinating Objectives, Rewards and Refresh',
    framing: 'I helped make completed reading feel like clear progress by coordinating quest objectives, reward feedback and the next step.',
    narrative: {
      intro: 'A completed book or activity can affect an objective, a quest, a reward and what appears next. I worked on Unity-side completion, reward and refresh flows within a shared production system. The engineering challenge was to keep player feedback coherent while service-backed data, local pending state and asynchronous transitions moved on different timelines.',
      blocks: [
        { label: 'The challenge', text: 'When a child finishes reading, the product has to answer more than “was the book completed?” It needs to show whether an objective advanced, whether the quest finished, whether a reward is ready and what the child can do next. These answers depend on service-backed quest data, but the player sees them through several Unity screens and transitions.' },
        { label: 'The approach', text: 'I contributed to the Unity-side progression flow: checking that a completion belongs to the active objective, carrying status changes through the client data layer, and turning refreshed quest data into current-objective and reward presentation. The reward path coordinates claim feedback with a subsequent data refresh, so the next available quest can be presented after the claim and modal sequence.' },
        { label: 'The trade-off', text: 'This gives a reading action a legible progression loop while keeping fetched quest state separate from local presentation. A failed mutation can leave a pending local status, a screen can close during refresh, and a reward modal has its own lifetime. The flow accounts for those boundaries without implying an atomic transaction or exactly-once reward delivery.' },
      ],
      media: {
        src: '/projects/ello-read/read-with-ello-quest.webp',
        mobileSrc: '/projects/ello-read/read-with-ello-quest-mobile.webp',
        mobileWidth: 382,
        mobileHeight: 750,
        alt: 'Read With Ello quest interface showing book choices and a reward counter',
        caption: 'Quest progression in Read With Ello. This product image gives context for the Unity-side objective, reward and refresh work discussed here.',
        width: 1080,
        height: 810,
      },
      diagram: {
        title: 'From a reading action to the next quest',
        caption: 'Conceptual engineering model: local player feedback is reconciled with service-backed quest state. The arrows are not a literal atomic transaction trace.',
        groups: [
          { label: 'Player action', tone: 'player', steps: [{ label: 'Reading or activity completed', next: 'check current objective' }], handoff: 'Completion event' },
          { label: 'Unity · local state', tone: 'local', steps: [{ label: 'Active objective check', next: 'eligible completion' }, { label: 'Local status + pending entry', next: 'submit asynchronously' }], handoff: 'Mutation request', handoffAsync: true },
          { label: 'Service-backed state', tone: 'service', steps: [{ label: 'Objective mutation', next: 'reconcile' }, { label: 'Quest data refresh', next: 'derive presentation' }], handoff: 'Refreshed data' },
          { label: 'Unity · player feedback', tone: 'local', steps: [{ label: 'Current quest and UI', next: 'claimable reward' }, { label: 'Reward presentation', next: 'after claim and modal' }, { label: 'Next quest' }] },
        ],
        notes: [
          { label: 'Pending / failure path', text: 'A failed objective mutation can retain a pending local status for later sync; the diagram does not promise fully offline behavior.' },
          { label: 'Reward sequencing', text: 'A successful final claim starts another refresh; its UI result is applied after reward modals finish.' },
        ],
      },
      technical: {
        label: 'A closer look at the state boundary',
        points: [
          'The client checks whether the completed activity matches the active objective before requesting a status update. Locally stored status and pending mutation data support continuity; fetched quest data remains the reconciliation source.',
          'Reward claim, refresh and modal completion have separate lifetimes. The implementation sequences presentation around them, but does not establish server-side idempotency or eliminate every possible race.',
        ],
      },
    },
  },
  {
    title: 'Book Library — Coordinating Catalog, Covers and Reading State',
    framing: 'I helped turn a changing book catalog into a reading journey by coordinating profile data, covers, reusable views and loading.',
    narrative: {
      intro: 'A library looks like a grid, but metadata, covers, cells and the selected book have different lifetimes. I worked on Unity library construction, image handling and data/loading integration within a shared product. The central problem was keeping catalog, visual resources and navigation aligned as content arrived, refreshed or changed.',
      blocks: [
        { label: 'The challenge', text: 'A child browsing the library should see the right books and covers, choose one and enter reading without thinking about data fetching or loading screens. Behind that simple path, the catalog is profile-specific; images may arrive later than the metadata; the screen can refresh or close; and a child can choose another title before the previous load completes.' },
        { label: 'The approach', text: 'I contributed to the Unity-side Book Library across its presentation and loading boundaries. The flow prepares catalog and quest-related data, maps book metadata into categories and cells, and loads covers separately from the book itself. Cells and sprites have reuse and cleanup paths. Once a title is selected, the book-loading service can cancel a prior selection, report progress and surface connection or operation failures before moving into reading.' },
        { label: 'The trade-off', text: 'This is more than arranging a grid: it coordinates catalog, image, UI and navigation lifetimes so content remains a usable journey. Reuse and caching help structure the work, but introduce invalidation and rebinding responsibilities. The inspected code does not establish a fully virtualized list, measured load-time gains or universal protection against late image callbacks.' },
      ],
      media: {
        src: '/projects/ello-read/read-with-ello-mobile-library.webp',
        alt: 'Read With Ello mobile library showing a grid of book covers under All E-books',
        caption: 'Book browsing in Read With Ello. The engineering story concerns the Unity-side catalog, cover and selected-book loading flow.',
        width: 382,
        height: 749,
        maxWidth: 240,
        variant: 'portrait',
      },
      diagram: {
        title: 'Four lifetimes behind one book selection',
        caption: 'Catalog entries, covers, reused views and selected books are prepared on different timelines. This is a conceptual flow, not a measured optimization.',
        groups: [
          { label: 'Data', tone: 'service', steps: [{ label: 'Active profile', next: 'key and refresh' }, { label: 'Catalog metadata + cache', next: 'cover reference' }], handoff: 'Image request', handoffAsync: true },
          { label: 'Visual resource', tone: 'resource', steps: [{ label: 'Cover task or fallback', next: 'load or substitute' }, { label: 'Sprite ownership', next: 'bind / clear' }], handoff: 'Cover and status' },
          { label: 'Unity UI', tone: 'local', steps: [{ label: 'Reused cell', next: 'child selects a book' }], handoff: 'Selection' },
          { label: 'Navigation', tone: 'app', steps: [{ label: 'Book selection', next: 'cancel prior load' }, { label: 'Book load', next: 'successful load' }, { label: 'Reading' }] },
        ],
        notes: [
          { label: 'Rebind', text: 'Cell refresh clears its previous sprite container before repopulation; a universal late-callback guard is not established.' },
          { label: 'Failure path', text: 'A new selection cancels the previous book load; connection and operation errors surface through loading feedback.' },
        ],
      },
      technical: {
        label: 'A closer look at the lifetimes',
        points: [
          'Profile-keyed metadata can be reused or refreshed; cover resources and visible cells have separate cleanup paths. The inspected grid pre-creates cells and can grow, so reuse does not mean full virtualization.',
          'Book selection starts a cancellable load with progress and error feedback. Cancellation at every possible navigation and late-cover callback is not proven.',
        ],
      },
    },
  },
  {
    title: 'GraphQL Operations — Extending a Shared Unity Client',
    framing: 'I extended a shared Unity GraphQL client so operation tooling and one request path had clearer ownership beneath production features.',
    narrative: {
      intro: 'Unity features needed maintainable service operations and a request path that did not hand live transport objects back indefinitely. I updated specific paths in an existing forked package—HTTP response handling, editor introspection and operation-field editing—alongside app-side GraphQL integration. The story is about developer workflow and resource ownership, not backend implementation.',
      blocks: [
        { label: 'The challenge', text: 'The reading product depended on service-backed data for progression and library flows. Unity engineers needed to define and maintain GraphQL queries and mutations—the operations used to exchange that data—while feature code consumed responses without each screen reinventing the transport boundary. That shared client already existed; the question was how to make parts of its tooling and request lifetime safer to work with.' },
        { label: 'The approach', text: 'I contributed updates to the existing Unity GraphQL package. In one HTTP post path, the package disposes its Unity request within the transport method and returns a response object containing the data callers need, rather than returning the live request. I also worked on the editor’s schema-introspection path and operation-field editing. Separately, I contributed to app-side GraphQL data integration in the Unity product.' },
        { label: 'The trade-off', text: 'The ownership boundary is clearer: the shared package manages part of request execution, while Read With Ello feature services interpret results for player-facing state. Other transport paths still exist, and the preserved evidence has no profiler comparison or exact per-release patch-consumption map. This is targeted client/tooling maintenance, not a global leak elimination or backend achievement.' },
      ],
      diagram: {
        title: 'One operation, two lifetimes: authoring and execution',
        caption: 'Developer-time authoring feeds a runtime operation. The scoped-request path is one verified client path; the remote service is an external boundary, not Phillipe’s implementation.',
        groups: [
          { label: 'Developer workflow · shared package', tone: 'package', steps: [{ label: 'Schema introspection', next: 'available fields' }, { label: 'Operation editor', next: 'selected fields' }, { label: 'Saved operation' }], handoff: 'Definition used at runtime', handoffAsync: true },
          { label: 'Runtime · shared package', tone: 'package', steps: [{ label: 'GraphQL client', next: 'one POST path' }, { label: 'Scoped HTTP request', detail: 'Remote service: external boundary', next: 'copy result; dispose request' }, { label: 'Detached response' }], handoff: 'Response to app' },
          { label: 'Read With Ello app', tone: 'app', steps: [{ label: 'Feature data service', next: 'map to product state' }, { label: 'Unity feature state' }] },
        ],
        notes: [{ label: 'Ownership limit', text: 'The package is an existing fork. Other request paths and the backend are outside this specific lifetime claim.' }],
      },
      technical: {
        label: 'A closer look at the package boundary',
        points: [
          'Editor introspection and operation-field editing support developer-time authoring. The saved operation is then used by the runtime client and app-specific services.',
          'One POST overload disposes its request internally and returns a detached response. Other transport paths remain; no measured leak reduction or universal disposal claim is made.',
        ],
      },
    },
  },
];

const craqueStories: Story[] = [
  {
    title: 'Structured Word Model for Assessment Logic',
    framing: 'Display and comparison logic needed the same representation of each word.',
    fields: [
      { label: 'Problem', text: 'Assessment rules and on-screen feedback had to refer to the same word state.' },
      { label: 'Constraint', text: 'Recognition output could be partial, empty, or malformed.' },
      { label: 'Approach', text: 'I worked on a structured word model and comparison rules shared by presentation and assessment, including invalid-input checks.' },
      { label: 'Result', text: 'The flow could track word state and feedback without assuming every recognition result was valid.' },
    ],
    evidenceLabel: 'Craque · word assessment',
    behavior: 'The reading interface presents word-level feedback during assessment.',
    evidence: 'Project history describes model and comparison work; public product material establishes assessment context, not authorship.',
    diagramLabel: 'Word assessment flow', diagram: ['Expected word', 'Recognized input', 'Word state and feedback'],
  },
  {
    title: 'Speech Recognition Migration & Session Lifecycle',
    framing: 'Replacing a recognition integration changed how assessment sessions started, stopped, and handled results.',
    fields: [
      { label: 'Problem', text: 'The assessment flow had to work with a different recognition integration.' },
      { label: 'Constraint', text: 'Callbacks and results could arrive incomplete or unexpectedly.' },
      { label: 'Approach', text: 'I adapted session start and stop behavior, callbacks, validation, and the handoff into assessment state.' },
      { label: 'Result', text: 'The Unity assessment flow could use the new integration while handling uncertain input defensively.' },
    ],
    evidenceLabel: 'Craque · recognition session',
    behavior: 'The product starts an assessment, receives spoken input, and presents a result.',
    evidence: 'Internal history supports integration and session work, not speech-engine authorship or a measured accuracy gain.',
    diagramLabel: 'Recognition session flow', diagram: ['Session lifecycle', 'Recognition result', 'Assessment state'],
  },
  {
    title: 'Assessment State, Retest & Reevaluation',
    framing: 'A reading assessment needs explicit state when a session is repeated or reviewed.',
    fields: [
      { label: 'Question', text: 'How can the assessment flow handle a new attempt without treating incomplete input as a final result?' },
      { label: 'Approach', text: 'I corrected assessment-state and execution-order defects and contributed to retest and reevaluation flows around the recognition integration.' },
      { label: 'Consequence', text: 'The work supported repeatable product flows; it does not imply speech-engine authorship or measured accuracy gains.' },
    ],
    evidenceLabel: 'Craque · reassessment flow',
    behavior: 'The product supports assessment and result review.',
    evidence: 'Project history supports state, retest, and reevaluation contributions; a public screen cannot prove implementation details.',
    diagramLabel: 'Assessment state', diagram: [], compact: true,
  },
];

export type ProjectCategory = 'professional-game' | 'professional-product' | 'independent-game' | 'study-archive';
export type ProjectKind = 'ilhas' | 'wallace' | 'ello' | 'craque' | 'pathless' | 'neutral';

export type ProjectMedia = {
  type: 'image' | 'gif' | 'video' | 'youtube';
  src: string;
  previewSrc?: string;
  alt?: string;
  previewAlt?: string;
  title?: string;
  caption?: string;
  autoplayPreview?: boolean;
  posterWidth?: number;
  posterHeight?: number;
  posterFit?: 'cover' | 'contain';
  posterSrc?: string;
  /** Reuse of the exact historical catalog asset approved by the user, not a rights audit. */
  catalogReuseApproved?: boolean;
};

export type ProjectAction = { href: string; label: string };

/** Optional editorial case-study area owned by one project record. */
export type ProjectCaseStudy = {
  slug: string;
  heroSummaryFields?: string[];
  heroStatement?: string;
  heroLinks?: boolean;
  heroMediaPresentation?: Partial<Pick<ProjectMedia, 'alt' | 'previewAlt' | 'caption' | 'posterWidth' | 'posterHeight' | 'posterFit'>>;
  scopeLabel?: string;
  ownershipLabel?: string;
  contributionHeading?: string;
  glanceFields?: string[];
  caseBoundary?: string;
  selectedStories?: string;
  stories: Story[];
  production?: string;
  supporting?: { title: string; text: string; visual?: 'weapon-area' };
  reflection?: string;
  evidenceLinks?: { label: string; href: string }[];
  nextProjectId?: string;
  metaDescription?: string;
};

/** Shared content and presentation choices for one portfolio project. */
export type ProjectRecord = {
  /** Stable identity; never derive this from the display name at runtime. */
  id: string;
  name: string;
  archiveCategory?: ProjectCategory;
  /** Product/project summary shared by portfolio surfaces. */
  summary: string;
  type?: string;
  context?: string;
  period?: string;
  contribution?: string;
  engineeringFocus?: string;
  /** Verified public facets and selected contribution highlights shared by consumers. */
  workContext?: 'professional' | 'independent' | 'study';
  technologies?: string[];
  technicalHighlights?: { title: string; body: string }[];
  contributionOutcome?: string;
  additionalContext?: string;
  tags?: string[];
  specs?: { label: string; value: string }[];
  media?: ProjectMedia[];
  actions?: ProjectAction[];
  /** Optional detailed case-study content; publishable with a slug and at least two titled/framed stories. */
  caseStudy?: ProjectCaseStudy;
  /** Missing and false values both mean the project is not publicly included. */
  portfolioIncluded?: boolean;
  homePlacement?: 'featured' | 'supporting';
  homeOrder?: number;
  homeArchiveLink?: boolean;
  archiveOrder?: number;
  archivePresentation?: 'rich' | 'standard' | 'compact';
  anchorId?: string;
  projectsIndexTitleIcon?: string;
  catalogIconReuseApproved?: boolean;
  mediaCaption?: string;
  evidenceLabel?: string;
  kind?: ProjectKind;
};

/** A case study is publishable only with a stable slug and at least two meaningful stories. */
export function hasPublishableCaseStudy(
  project: Pick<ProjectRecord, 'caseStudy'> | null | undefined,
): project is ProjectRecord & { caseStudy: ProjectCaseStudy } {
  const item = project?.caseStudy;
  if (!item || typeof item.slug !== 'string' || !item.slug.trim() || !Array.isArray(item.stories)) return false;
  return item.stories.filter((story) => story.title.trim() && story.framing.trim()).length >= 2;
}

/** A missing record or missing opt-in is intentionally treated as unpublished. */
export function isPortfolioIncluded(project: Pick<ProjectRecord, 'portfolioIncluded'> | null | undefined): boolean {
  return project?.portfolioIncluded === true;
}

export function filterIncludedProjects<T extends Pick<ProjectRecord, 'portfolioIncluded'>>(
  projects: readonly T[],
): T[] {
  return projects.filter(isPortfolioIncluded);
}

// Canonical records. Content from the previous featured/supporting/archive layers has been merged here.
export const projectRecords: ProjectRecord[] = [
  {
    "id": "ilhas-do-alfabeto",
    "name": "Ilhas do Alfabeto",
    "archiveCategory": "professional-game",
    "summary": "A commercial Unity literacy game built around interactive minigames.",
    "type": "Literacy game",
    "context": "Instituto Alfa e Beto",
    "contribution": "I designed and implemented substantial parts of Desafio dos Sons Iguais, while maintaining, improving, and supporting minigame systems across the wider product.",
    "tags": [
      "Minigames",
      "Shared systems"
    ],
    "specs": [
  {
    "label": "Role",
    "value": "Senior Unity Game Developer"
  },
  {
    "label": "Engine",
    "value": "Unity / C#"
  },
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  },
  {
    "label": "Focus",
    "value": "Minigames and shared systems"
  }
],
    "caseStudy": {
      "slug": "ilhas-do-alfabeto",
      "scopeLabel": "Product / Team Context",
      "ownershipLabel": "My Contribution",
      "glanceFields": ["Context", "Role", "Engine", "Focus"],
      "selectedStories": "These selected stories highlight three complementary parts of my work on Ilhas do Alfabeto: gameplay sequencing in Desafio dos Sons Iguais, shared minigame systems, and long-lived production support. Together, they offer a focused view of my contributions within a broader team-built product.",
      "stories": ilhasStories,
      "production": "I supported maintenance, builds, and deployment variants. My formal IAB title was Senior Unity Game Developer; I also had technical coordination and developer-support responsibilities.",
      "reflection": "The challenge was keeping shared behavior useful without forcing unlike minigames into the same rules. Desafio dos Sons Iguais also appears in another product history, so I present it once while that lineage is checked.",
      "evidenceLinks": [{ "label": "Official product page", "href": "https://loja.alfaebeto.org.br/produto/ilhas-do-alfabeto.html" }, { "label": "Public gameplay", "href": "https://youtu.be/g5TmNTbx8k0" }],
      "nextProjectId": "wallaces-quest",
      "metaDescription": "Commercial Unity game development: Desafio dos Sons Iguais, shared minigame systems, and production work by Phillipe Augusto."
    },
    "portfolioIncluded": true,
    "homePlacement": "featured",
    "homeOrder": 1,
    "archiveOrder": 6,
    "archivePresentation": "standard",
    "anchorId": "ilhas-do-alfabeto",
    "evidenceLabel": "Ilhas do Alfabeto · gameplay",
    "kind": "ilhas"
  ,
  "workContext": "professional",
  "technologies": [
  "Unity",
  "C#"
],
  "technicalHighlights": []
},
  {
    "id": "wallaces-quest",
    "name": "Wallace’s Quest",
    "archiveCategory": "independent-game",
    "summary": "A tactical turn-based RPG prototype built around grid movement, positioning, and combat choices. The public prototype represents the historical combat implementation.",
    "type": "Tactical turn-based RPG prototype",
    "context": "Independent project",
    "contribution": "I implemented the historical encounter’s turn and action flow, connecting grid movement, attacks, damage resolution, and combat feedback. In 2021, I separated grid search into a module and demo; the 2026 migration did not fully reconnect these systems.",
    "engineeringFocus": "Turn ownership sequences player and enemy units, while action completion separates each movement or attack routine from advancement of the encounter. Combat state feeds stage victory/defeat conditions; coroutines and event handoffs coordinate behavior and feedback across these transitions, keeping the loop readable as state changes from active turn to resolved match.",
    "tags": [
      "Grid combat",
      "Turn-based",
      "Tactical RPG"
    ],
    "specs": [
  {
    "label": "Role",
    "value": "Independent Unity Developer / Gameplay Programmer"
  },
  {
    "label": "Engine",
    "value": "Unity / C#"
  },
  {
    "label": "Period",
    "value": "2020–2021 · revisited 2026"
  },
  {
    "label": "Stack",
    "value": "Unity · C# · Tilemap · ScriptableObjects · uGUI"
  }
],
    "media": [
      {
        "type": "image",
        "src": "/projects/wallace-quest/wallace-quest-first-frame.webp",
        "previewSrc": "/projects/wallace-quest/wallace-quest-gameplay-preview.gif",
        "autoplayPreview": true,
        "alt": "Turn-based combat in Wallace’s Quest with two goblin units facing a skeleton enemy.",
        "previewAlt": "Gameplay preview from Wallace’s Quest.",
        "posterWidth": 1254,
        "posterHeight": 1254,
        "posterFit": "contain"
      ,
  "catalogReuseApproved": true
}
    ],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/wallaces-quest",
        "label": "Play on itch.io"
      }
    ],
    "caseStudy": {
      "slug": "wallaces-quest",
      "heroSummaryFields": ["Role", "Period", "Engine"],
      "heroStatement": "A tactical turn-based RPG built around grid positioning, player and enemy turns, combat actions and encounter outcomes.",
      "heroLinks": true,
      "scopeLabel": "Product / Team Context",
      "ownershipLabel": "My Contribution",
      "contributionHeading": "My contribution",
      "glanceFields": ["Context", "Role", "Period", "Stack"],
      "caseBoundary": "The game uses third-party artwork and audio, which I integrated rather than created.",
      "selectedStories": "These selected stories explore two layers of the same tactical system: coordinating the encounter itself, then separating grid search so movement rules could be reasoned about more independently. They show focused examples of my gameplay-engineering work rather than every feature I built.",
      "stories": wallaceStories,
      "heroMediaPresentation": { "alt": "Wallace’s Quest poster artwork", "previewAlt": "Animated gameplay preview of Wallace’s Quest combat", "caption": "Grid positioning and turn-based combat in Wallace’s Quest.", "posterWidth": 2560, "posterHeight": 1440, "posterFit": "contain" },
      "supporting": { "title": "Weapon area rules", "text": "Configured relative cells and damage multipliers let an attack shape be calculated independently of its animation. I copied the pattern, transformed it for a requested cardinal direction and translated it to a grid origin. The visual shows one configured pattern and its East-facing calculation.", "visual": "weapon-area" },
      "reflection": "I would keep a clear owner for turn progression, an explicit action-completion handoff, and the separation of spatial rules from presentation. Today I would strengthen cancellation and event lifetimes, guard encounter completion against repeats, define cleaner module interfaces and test pathfinding correctness before optimizing its frontier.",
      "evidenceLinks": [{ "label": "View WebGL build", "href": "https://phillipeaam.itch.io/wallaces-quest" }, { "label": "Watch gameplay", "href": "https://www.youtube.com/watch?v=3P1Tdx5HtuQ" }],
      "nextProjectId": "read-with-ello",
      "metaDescription": "Wallace’s Quest: a personal tactical turn-based RPG case study covering 2020 combat coordination and 2021 grid pathfinding module work."
    },
    "portfolioIncluded": true,
    "homePlacement": "featured",
    "homeOrder": 2,
    "homeArchiveLink": true,
    "archiveOrder": 4,
    "archivePresentation": "rich",
    "anchorId": "wallaces-quest",
    "projectsIndexTitleIcon": "/projects/wallace-quest/wallace-quest-poster.webp",
    "evidenceLabel": "Wallace’s Quest · tactical combat",
    "kind": "wallace"
  ,
  "period": "2020–2021 · revisited 2026",
  "workContext": "independent",
  "technologies": [
  "Unity",
  "C#",
  "Tilemap",
  "ScriptableObjects",
  "uGUI"
],
  "technicalHighlights": [
  {
    "title": "Turn ownership and action completion",
    "body": "Movement and attack routines signal completion separately from turn advancement; battle-state changes feed victory and defeat evaluation in the historical combat implementation."
  },
  {
    "title": "Grid-search module boundary",
    "body": "The extracted module separates walkability, node adjacency, and route search. Cost-plus-Manhattan scoring does not establish optimal A*: already-open nodes are not updated when a cheaper path is found."
  }
]
,
  "catalogIconReuseApproved": true
},
  {
    "id": "read-with-ello",
    "name": "Read With Ello",
    "archiveCategory": "professional-game",
    "summary": "A Unity mobile reading product for children, combining book discovery, interactive reading, quests, and rewards.",
    "type": "Mobile reading product",
    "context": "Ello",
    "contribution": "My work spanned the reading experience, Book Library, quest progression, rewards and Prize Store, alongside Unity-side GraphQL integration. These selected contributions also include onboarding, shared UI, and lifecycle work within the wider team codebase.",
    "engineeringFocus": "The recurring engineering problem was keeping a content-heavy mobile experience understandable and resilient: reusable uGUI for player-facing states, Addressables-backed content boundaries, asynchronous client responses, and transitions between library, reading, quest, and reward screens. The implementation focus was the Unity client; backend, speech, and platform ownership remain outside the claim.",
    "tags": [
      "Progression",
      "Book library",
      "GraphQL",
      "Addressables"
    ],
    "specs": [
  {
    "label": "Role",
    "value": "Unity Software Engineer"
  },
  {
    "label": "Period",
    "value": "Oct 2022–Aug 2025"
  },
  {
    "label": "Stack",
    "value": "Unity · C# · uGUI · Addressables · GraphQL · Firebase · GrowthBook"
  }
],
    "media": [
      {
        "type": "image",
        "src": "/projects/ello-read/read-with-ello-first-frame.webp",
        "previewSrc": "/projects/ello-read/read-with-ello-gameplay-preview.gif",
        "autoplayPreview": true,
        "alt": "Read With Ello quest screen featuring Ello beside a storybook quest.",
        "previewAlt": "Read With Ello gameplay preview showing an interactive reading activity.",
        "posterWidth": 1680,
        "posterHeight": 945,
        "posterFit": "contain"
      ,
  "catalogReuseApproved": true
}
    ],
    "actions": [
      {
        "href": "https://apps.apple.com/us/app/read-with-ello/id1536720182",
        "label": "App Store"
      },
      {
        "href": "https://youtu.be/sk9Ob5f1GT8",
        "label": "Watch Promo"
      }
    ],
    "caseStudy": {
      "slug": "read-with-ello",
      "scopeLabel": "Product / Team Context",
      "ownershipLabel": "My Contribution",
      "glanceFields": ["Context", "Role", "Period", "Stack"],
      "caseBoundary": "The backend, speech systems, content library and full release process were team or product work beyond my individual claim.",
      "selectedStories": "These selected stories highlight three different areas of my work on Read With Ello: player-facing progression, content and lifecycle systems, and shared Unity client tooling. They represent a focused sample of my contributions rather than an exhaustive account of the work I did on the product.",
      "stories": elloStories,
      "heroMediaPresentation": { "alt": "Read With Ello reading product featuring its elephant character", "previewAlt": "Read With Ello animated reading activity featuring its elephant character", "caption": "An interactive reading activity in Read With Ello; shown as product context, not as proof of the exact audited version.", "posterWidth": 1280, "posterHeight": 720, "posterFit": "contain" },
      "supporting": { "title": "Mobile redesign & onboarding (Phone++)", "text": "I also contributed to feature-flagged phone onboarding and related Unity UI flows as part of a collaborative mobile redesign." },
      "reflection": "A player-facing reading journey relies on more than the screen in front of the child: progression state, content lifetimes and shared client boundaries have to remain understandable as the product evolves.",
      "evidenceLinks": [{ "label": "Read With Ello on the App Store", "href": "https://apps.apple.com/us/app/read-with-ello/id1536720182" }],
      "nextProjectId": "craque-da-fluencia",
      "metaDescription": "Read With Ello case study: Unity quest progression, book-library work, and targeted GraphQL client tooling."
    },
    "portfolioIncluded": true,
    "homePlacement": "featured",
    "homeOrder": 3,
    "homeArchiveLink": true,
    "archiveOrder": 2,
    "archivePresentation": "rich",
    "anchorId": "read-with-ello",
    "projectsIndexTitleIcon": "/projects/ello-read/read-with-ello-poster.webp",
    "evidenceLabel": "Read With Ello · reading product",
    "kind": "ello"
  ,
  "period": "Oct 2022–Aug 2025",
  "workContext": "professional",
  "technologies": [
  "Unity",
  "C#",
  "uGUI",
  "Addressables",
  "GraphQL",
  "Firebase",
  "GrowthBook"
],
  "technicalHighlights": [
  {
    "title": "Content-heavy mobile flows",
    "body": "Reusable uGUI and Addressables-backed content boundaries support transitions between library, reading, quest, and reward screens."
  },
  {
    "title": "Service-backed client features",
    "body": "Asynchronous client responses connect progression surfaces to services. The scope is the Unity client, without a claim of backend, speech-system, or release-process ownership."
  }
]
,
  "catalogIconReuseApproved": true
},
  {
    "id": "craque-da-fluencia",
    "name": "Craque da Fluência",
    "archiveCategory": "professional-game",
    "summary": "A Unity reading-assessment product that processes spoken reading and presents results.",
    "type": "Reading-fluency product",
    "context": "Instituto Alfa e Beto",
    "contribution": "I worked on the word model, assessment state, and speech-recognition integration.",
    "tags": [
      "Assessment",
      "Speech integration",
      "Unity"
    ],
    "specs": [
  {
    "label": "Role",
    "value": "Senior Unity Game Developer"
  },
  {
    "label": "Engine",
    "value": "Unity / C#"
  },
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  },
  {
    "label": "Focus",
    "value": "Assessment state and integration"
  }
],
    "caseStudy": {
      "slug": "craque-da-fluencia",
      "scopeLabel": "Product / Team Context",
      "ownershipLabel": "My Contribution",
      "glanceFields": ["Context", "Role", "Engine", "Focus"],
      "selectedStories": "These selected stories follow three connected parts of the assessment experience: structuring words for reliable evaluation, managing the speech-recognition session lifecycle, and carrying assessment state through retest and reevaluation. They show a focused sample of my Unity contributions to a team-built product.",
      "stories": craqueStories,
      "production": "I also worked on local persistence, synchronization, product variants, retest flows, QA builds, and release support.",
      "reflection": "Recognition output is uncertain; assessment state needs explicit rules for incomplete input. Keeping that boundary clear matters more than treating an SDK response as a final answer.",
      "evidenceLinks": [{ "label": "Official product page", "href": "https://loja.alfaebeto.org.br/produto/craque-da-fluencia.html" }],
      "nextProjectId": "ilhas-do-alfabeto",
      "metaDescription": "Craque da Fluência case study: Unity assessment state, structured word models, and speech-recognition integration work."
    },
    "portfolioIncluded": true,
    "homePlacement": "featured",
    "homeOrder": 4,
    "archiveOrder": 7,
    "archivePresentation": "standard",
    "anchorId": "craque-da-fluencia",
    "evidenceLabel": "Craque da Fluência · assessment flow",
    "kind": "craque"
  ,
  "workContext": "professional",
  "technologies": [
  "Unity",
  "C#"
],
  "technicalHighlights": []
},
  {
    "id": "pathless",
    "name": "Pathless",
    "archiveCategory": "independent-game",
    "summary": "A rescue-and-exploration game made by a three-person team for Brackeys Game Jam 2026.2. Players use proximity radio signals to find and assist survivors before extracting under an escalating calamity.",
    "type": "Rescue-and-exploration game",
    "context": "Brackeys Game Jam 2026.2 · three-person team",
    "period": "Aug–Sep 2026 · one-week jam, followed by post-jam work",
    "contribution": "I implemented the proximity radio scanner and HUD, survivor interaction and assistance flows, and rescue accounting. I integrated these systems into mission progression, extraction, restart, and results reporting, with some work continuing after the jam deadline.",
    "engineeringFocus": "Data-driven signal definitions map distance to discrete radio strength, while ScriptableObjects configure survivor assistance and calamity sequences. Events and delegates connect mission state to rescue/results; Unity Awaitable sequences arrival, with UI Toolkit and the Input System carrying presentation and control. Keeping signal strength separate from direction gives the scanner a clear, proximity-based role in the rescue loop.",
    "specs": [
  {
    "label": "Role",
    "value": "Unity Gameplay Programmer"
  },
  {
    "label": "Period",
    "value": "Aug–Sep 2026 · one-week jam, followed by post-jam work"
  },
  {
    "label": "Stack",
    "value": "Unity 6 · C# · URP · Input System · UI Toolkit · Cinemachine"
  }
],
    "media": [
      {
        "type": "image",
        "src": "/projects/pathless/pathless-first-frame.webp",
        "previewSrc": "/projects/pathless/pathless-gameplay-preview.gif",
        "autoplayPreview": true,
        "alt": "Pathless gameplay showing a helicopter above a rescue-game landscape."
      ,
  "catalogReuseApproved": true
}
    ],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/pathless",
        "label": "Play on itch.io"
      }
    ],
    "portfolioIncluded": true,
    "homePlacement": "supporting",
    "homeOrder": 1,
    "evidenceLabel": "RESCUE GAMEPLAY — PATHLESS",
    "archiveOrder": 1,
    "archivePresentation": "rich",
    "anchorId": "pathless",
    "projectsIndexTitleIcon": "/projects/pathless/pathless-poster.webp",
    "kind": "pathless"
  ,
  "workContext": "independent",
  "technologies": [
  "Unity 6",
  "C#",
  "URP",
  "Input System",
  "UI Toolkit",
  "Cinemachine"
],
  "technicalHighlights": [
  {
    "title": "Proximity radio guidance",
    "body": "Distance maps to discrete signal strengths through data-driven definitions. The scanner communicates proximity rather than direction or triangulation."
  },
  {
    "title": "Mission and rescue integration",
    "body": "Events and delegates connect mission state to rescue accounting and results; Unity Awaitable sequences arrival. The calamity baseline and scene assembly include collaborator or shared work."
  }
]
,
  "catalogIconReuseApproved": true
},
  {
    "id": "flui",
    "name": "Flui — A Cidade das Palavras",
    "archiveCategory": "professional-game",
    "summary": "A commercial Unity game that teaches literacy through exploration, character progression, and interactive minigames.",
    "type": "Literacy game",
    "context": "Instituto Alfa e Beto",
    "period": "2017–2021",
    "contribution": "Worked across gameplay systems and minigame implementation, supporting the game’s ongoing production and maintenance.",
    "specs": [
  {
    "label": "Engine",
    "value": "Unity"
  },
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  }
],
    "actions": [
      {
        "href": "https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html",
        "label": "Official product"
      },
      {
        "href": "https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1945254108/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA",
        "label": "LinkedIn details"
      }
    ],
    "portfolioIncluded": true,
    "homePlacement": "supporting",
    "homeOrder": 2,
    "evidenceLabel": "GAMEPLAY / PRODUCT MEDIA — FLUI",
    "archiveOrder": 5,
    "archivePresentation": "standard",
    "anchorId": "work-flui",
    "kind": "neutral"
  ,
  "workContext": "professional",
  "technologies": [
  "Unity"
],
  "technicalHighlights": []
},
  {
    "id": "tabuada-na-fazenda",
    "name": "Tabuada na Fazenda",
    "archiveCategory": "professional-game",
    "summary": "A commercial Unity math game set around an interactive farm and themed learning activities.",
    "type": "Math game",
    "context": "Instituto Alfa e Beto",
    "period": "2020–2022",
    "contribution": "Contributed to minigames, tutorials, farm interactions, and progression systems as the product evolved.",
    "specs": [
  {
    "label": "Engine",
    "value": "Unity"
  },
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  }
],
    "actions": [
      {
        "href": "https://loja.alfaebeto.org.br/produto/tabuada-na-fazenda.html",
        "label": "Official product"
      }
    ],
    "portfolioIncluded": true,
    "homePlacement": "supporting",
    "homeOrder": 3,
    "evidenceLabel": "GAMEPLAY MEDIA — TABUADA",
    "archiveOrder": 3,
    "archivePresentation": "standard",
    "anchorId": "work-tabuada",
    "kind": "neutral"
  ,
  "workContext": "professional",
  "technologies": [
  "Unity"
],
  "technicalHighlights": []
},
  {
    "id": "sweets-and-shadows",
    "name": "Sweets and Shadows",
    "archiveCategory": "independent-game",
    "summary": "A 72-hour action game made with a teammate for Mini Jam 144.",
    "type": "Action game",
    "context": "Mini Jam 144 · two-person team · 72 hours",
    "period": "2023-10",
    "specs": [
  {
    "label": "Jam",
    "value": "Mini Jam 144 · 72 hours"
  },
  {
    "label": "Engine",
    "value": "Unity"
  },
  {
    "label": "Team",
    "value": "2 people"
  }
],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/sweets-and-shadows",
        "label": "Play on itch.io"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 3,
    "archivePresentation": "standard",
    "anchorId": "sweets-and-shadows"
  ,
  "workContext": "independent",
  "technologies": [
  "Unity"
]
},
  {
    "id": "craque-da-leitura",
    "name": "Craque da Leitura",
    "archiveCategory": "professional-game",
    "summary": "An interactive reading product with book content, catalog, and guided reading flows.",
    "type": "Interactive reading product",
    "context": "Instituto Alfa e Beto",
    "period": "2017–2022",
    "specs": [
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  }
],
    "actions": [
      {
        "href": "https://loja.alfaebeto.org.br/produto/craque-da-leitura.html",
        "label": "Official product"
      },
      {
        "href": "https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1497806737/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA",
        "label": "LinkedIn details"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 4,
    "archivePresentation": "compact",
    "anchorId": "work-craque-leitura"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "learn-with-ello",
    "name": "Ello 2.0: Learn Reading & Math",
    "archiveCategory": "professional-game",
    "summary": "A Flutter reading-and-math product for children, connecting learning activities with daily quests, progression, rewards, and learning-agent interactions.",
    "type": "Reading and math learning platform",
    "context": "Ello",
    "period": "Sep–Nov 2025",
    "contribution": "I contributed to quest progression and rewards across configuration-driven models, completion services, and Flutter screens. I connected home activities to learning-agent requests across Python services and client routing, and implemented the parent-gate flow.",
    "engineeringFocus": "Typed quest and activity models, provider/service boundaries, and GraphQL/Protocol Buffers contracts coordinate configured flows with client state. Guarded initialization and shared in-flight requests prevent duplicate work; completion validates interaction IDs, suppresses repeated rewards, and keeps local progress resilient to noncritical sync and analytics failures.",
    "specs": [
  {
    "label": "Role",
    "value": "Software Engineer"
  },
  {
    "label": "Period",
    "value": "Sep–Nov 2025"
  },
  {
    "label": "Stack",
    "value": "Flutter · Dart · Python · GraphQL · Protocol Buffers · GrowthBook · Provider"
  }
],
    "media": [
      {
        "type": "image",
        "src": "/projects/ello-learn/ello-learn-first-frame.webp",
        "previewSrc": "/projects/ello-learn/ello-learn-gameplay-preview.gif",
      "autoplayPreview": true,
        "alt": "An Ello character stands in a snowy learning activity beside red counters and a star total.",
        "previewAlt": "An Ello preview cycles through colorful reading and counting activities, including a character in a snowy scene with a star counter.",
        "posterWidth": 480,
        "posterHeight": 480,
        "posterFit": "contain"
      ,
  "catalogReuseApproved": true
}
    ],
    "actions": [
      {
        "href": "https://apps.apple.com/us/app/ello-2-0-learn-reading-math/id6739630070",
        "label": "App Store"
      },
      {
        "href": "https://play.google.com/store/apps/details?id=com.ellotechnology.learn",
        "label": "Google Play"
      },
      {
        "href": "https://www.youtube.com/watch?v=Vzb09qXUL44",
        "label": "Watch promo"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 1,
    "archivePresentation": "rich",
    "anchorId": "work-ello-2",
    "projectsIndexTitleIcon": "/projects/ello-learn/ello-learn-poster.webp"
  ,
  "workContext": "professional",
  "technologies": [
  "Flutter",
  "Dart",
  "Python",
  "GraphQL",
  "Protocol Buffers",
  "GrowthBook",
  "Provider"
],
  "technicalHighlights": [
  {
    "title": "Progression reliability",
    "body": "Completion validates interaction IDs and suppresses repeated rewards, keeping local progress resilient to noncritical sync and analytics failures."
  },
  {
    "title": "Request coordination",
    "body": "Guarded initialization and shared in-flight requests prevent duplicate work across configured flows. This is bounded feature integration, not ownership of the whole backend or ML/speech platform."
  }
]
,
  "catalogIconReuseApproved": true
},
  {
    "id": "avaliacao-diagnostica",
    "name": "Avaliação Diagnóstica",
    "archiveCategory": "professional-product",
    "summary": "A school assessment platform with Portuguese and math workflows, offline use, synchronization, and reporting.",
    "type": "Digital school-assessment platform",
    "context": "Instituto Alfa e Beto",
    "period": "Undated",
    "specs": [
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  }
],
    "actions": [
      {
        "href": "https://alfaebeto.org.br/conheca-a-alfa-e-beto-avaliacao/",
        "label": "Official product overview"
      },
      {
        "href": "https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1520869873/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA",
        "label": "LinkedIn details"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 1,
    "archivePresentation": "compact",
    "anchorId": "work-avaliacao-diagnostica"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "avaliacao-lingua-portuguesa",
    "name": "Avaliação da Língua Portuguesa",
    "archiveCategory": "professional-game",
    "summary": "Interactive Portuguese-language assessment activities for literacy learning.",
    "type": "Interactive language assessment",
    "context": "Instituto Alfa e Beto",
    "period": "Undated",
    "specs": [
  {
    "label": "Engine",
    "value": "Unity"
  },
  {
    "label": "Company",
    "value": "Instituto Alfa e Beto"
  }
],
    "portfolioIncluded": true,
    "archiveOrder": 8,
    "archivePresentation": "compact",
    "anchorId": "work-avaliacao-lingua-portuguesa"
  ,
  "workContext": "professional",
  "technologies": [
  "Unity"
]
},
  {
    "id": "iab-digital-zero-a-quatro",
    "name": "IAB Digital: Zero a Quatro na Palma da Mão",
    "archiveCategory": "professional-product",
    "summary": "A digital learning platform connecting classroom activities and school workflows.",
    "type": "Early-childhood education platform",
    "context": "Cedro Technologies",
    "period": "Undated",
    "specs": [
    ],
    "portfolioIncluded": true,
    "archiveOrder": 3,
    "archivePresentation": "compact",
    "anchorId": "work-iab-digital"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "iab-testes",
    "name": "IAB Testes",
    "archiveCategory": "professional-product",
    "summary": "A tablet-based digital assessment product for school literacy workflows.",
    "type": "Tablet assessment platform",
    "context": "Cedro Technologies",
    "period": "Undated",
    "specs": [
    ],
    "portfolioIncluded": true,
    "archiveOrder": 2,
    "archivePresentation": "compact",
    "anchorId": "work-iab-testes"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "mypush",
    "name": "MyPush",
    "archiveCategory": "professional-product",
    "summary": "Professional mobile software work involving client applications and service integrations.",
    "type": "B2B mobile product",
    "context": "Earlier professional software experience",
    "period": "Undated",
    "portfolioIncluded": true,
    "archiveOrder": 4,
    "archivePresentation": "compact",
    "anchorId": "work-mypush"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "morada-verde-inventory-flow",
    "name": "MVIF — Morada Verde Inventory Flow",
    "archiveCategory": "professional-product",
    "summary": "An inventory and business-workflow product from earlier professional software work.",
    "type": "Client operational software",
    "context": "Earlier client software product",
    "period": "Undated",
    "portfolioIncluded": true,
    "archiveOrder": 5,
    "archivePresentation": "compact",
    "anchorId": "work-morada-verde"
  ,
  "workContext": "professional",
  "technologies": []
},
  {
    "id": "radwasteland-echoes",
    "name": "RadWasteland — Echoes",
    "archiveCategory": "independent-game",
    "summary": "A Ludum Dare 55 game about summoning creatures in a post-apocalyptic wasteland.",
    "type": "Strategy / RPG game",
    "context": "Ludum Dare 55 · solo jam",
    "period": "2024-04",
    "tags": [
      "Unity",
      "Strategy",
      "Ludum Dare"
    ],
    "specs": [
  {
    "label": "Jam",
    "value": "Ludum Dare 55 · solo jam"
  },
  {
    "label": "Engine",
    "value": "Unity"
  }
],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/radwasteland-echoes",
        "label": "View project page"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 2,
    "archivePresentation": "standard",
    "anchorId": "radwasteland-echoes",
    "evidenceLabel": "STRATEGY GAMEPLAY — RADWASTELAND",
    "kind": "neutral"
  ,
  "workContext": "independent",
  "technologies": [
  "Unity"
]
},
  {
    "id": "angry-world",
    "name": "Angry World",
    "archiveCategory": "independent-game",
    "summary": "A short space action game about protecting planets and collecting crystals.",
    "type": "Space action game",
    "context": "Ludum Dare 38",
    "period": "2017-04",
    "tags": [
      "Unity",
      "Action",
      "Ludum Dare"
    ],
    "specs": [
  {
    "label": "Jam",
    "value": "Ludum Dare 38 · solo jam"
  },
  {
    "label": "Engine",
    "value": "Unity"
  }
],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/angry-world",
        "label": "Play on itch.io"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 5,
    "archivePresentation": "standard",
    "anchorId": "angry-world",
    "evidenceLabel": "SPACE GAMEPLAY — ANGRY WORLD",
    "kind": "neutral"
  ,
  "workContext": "independent",
  "technologies": [
  "Unity"
]
},
  {
    "id": "survive-and-escape",
    "name": "Survive & Escape",
    "archiveCategory": "study-archive",
    "summary": "A small Windows puzzle game built from scratch while learning C++ and raylib.",
    "type": "Windows puzzle game",
    "context": "Independent game-development study",
    "period": "Undated",
    "tags": [
      "C++",
      "raylib",
      "Windows"
    ],
    "specs": [
  {
    "label": "Tools",
    "value": "C++ / raylib"
  },
  {
    "label": "Platform",
    "value": "Windows"
  }
],
    "actions": [
      {
        "href": "https://phillipeaam.itch.io/survive-and-escape",
        "label": "View game on itch.io"
      }
    ],
    "portfolioIncluded": true,
    "archiveOrder": 1,
    "archivePresentation": "compact",
    "anchorId": "survive-and-escape",
    "evidenceLabel": "PUZZLE GAMEPLAY — SURVIVE & ESCAPE",
    "kind": "neutral"
  ,
  "workContext": "study",
  "technologies": [
  "C++",
  "raylib"
]
},
  {
    "id": "heroes-secrets",
    "name": "Heroes’ Secrets",
    "summary": "An in-development autobattler exploring combat systems, abilities, equipment, and AI.",
    "type": "Independent team autobattler",
    "context": "Independent · current team project",
    "period": "Current / ongoing",
    "tags": [
      "Unity",
      "Autobattler",
      "In development"
    ],
    "evidenceLabel": "GAMEPLAY PROXY — HEROES’ SECRETS",
    "kind": "neutral",
    "portfolioIncluded": false
  },
  {
    "id": "repo-dna",
    "name": "RepoDNA",
    "summary": "Developer tooling for repository analysis and project context.",
    "type": "Developer tooling",
    "period": "Undated",
    "tags": [
      "Tooling",
      "CLI",
      "Software"
    ],
    "evidenceLabel": "DEVELOPER TOOLING — REPODNA",
    "kind": "neutral",
    "portfolioIncluded": false
  }
];

export function getProjectRecord(id: string): ProjectRecord | undefined {
  return projectRecords.find((project) => project.id === id);
}

export function getProjectFact(project: ProjectRecord, label: string): string | undefined {
  if (label === 'Context') return project.context;
  return project.specs?.find((fact) => fact.label === label)?.value
    ?? (label === 'Period' ? project.period : undefined);
}

export const homeFeaturedProjects = projectRecords
  .filter((project) => project.homePlacement === 'featured' && isPortfolioIncluded(project))
  .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

export function resolveExperienceWork(projectId: string, baseUrl = '/') {
  const project = getProjectRecord(projectId);
  if (!project || !isPortfolioIncluded(project)) return { name: project?.name, included: false };
  const basePath = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  if (hasPublishableCaseStudy(project)) return { name: project.name, href: basePath + 'work/' + project.caseStudy.slug + '/', caseStudy: true, included: true };
  const anchor = project.anchorId ?? project.id;
  const href = project.archiveCategory
    ? project.homePlacement === 'supporting' ? basePath + '#' + anchor : basePath + 'projects/#' + anchor
    : undefined;
  return { name: project.name, href, caseStudy: false, included: true };
}

const archiveGroupDefinitions = [
  { id: 'professional-game' as const, eyebrow: '01 / UNITY & GAMES', title: 'Professional games & Unity products', intro: 'Commercial game development and interactive Unity products built in professional teams.' },
  { id: 'professional-product' as const, eyebrow: '02 / SOFTWARE', title: 'Software & interactive products', intro: 'Professional assessment, learning and operational software beyond the game portfolio.' },
  { id: 'independent-game' as const, eyebrow: '03 / INDEPENDENT', title: 'Independent & collaborative games', intro: 'Independent games and jam collaborations, spanning solo projects and small teams.' },
  { id: 'study-archive' as const, eyebrow: '04 / STUDY', title: 'Experiments & study', intro: 'Smaller technical studies kept as part of the development record.' },
];

export const homeSupportingProjects: ProjectRecord[] = projectRecords
  .filter((project) => project.homePlacement === 'supporting' && isPortfolioIncluded(project))
  .sort((a, b) => (a.homeOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeOrder ?? Number.MAX_SAFE_INTEGER));

export const projectInventoryGroups = archiveGroupDefinitions.map((group) => ({
  ...group,
  projects: projectRecords.filter((project) => isPortfolioIncluded(project) && project.archiveCategory === group.id)
    .sort((a, b) => (a.archiveOrder ?? Number.MAX_SAFE_INTEGER) - (b.archiveOrder ?? Number.MAX_SAFE_INTEGER)),
}));
