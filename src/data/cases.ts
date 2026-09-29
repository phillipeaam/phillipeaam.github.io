import { featuredProjects, type Project, type ProjectMedia } from './projects';

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
  blocks: { label: string; text: string }[];
  diagram: NarrativeDiagram;
  media?: { src: string; mobileSrc?: string; mobileWidth?: number; mobileHeight?: number; alt: string; caption: string; width: number; height: number; maxWidth?: number };
  technical?: { label: string; points: string[] };
};
export type Story = {
  title: string;
  framing: string;
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
    title: 'Grid Pathfinding — Isolating Movement as a Testable System',
    framing: 'I made movement inspectable outside the full battle scene.',
    fields: [
      { label: 'Problem', text: 'Tactical movement needed a valid route between selected grid positions.' },
      { label: 'Constraint', text: 'Some destinations could be unreachable.' },
      { label: 'Approach', text: 'I connected a standalone demo to the node map and pathfinder, then displayed routes for selected start and target cells.' },
      { label: 'Result', text: 'Path behavior could be inspected separately from combat.' },
    ],
    evidenceLabel: 'Wallace · grid movement',
    behavior: 'Selected cells and their route can be inspected on the grid.',
    evidence: 'An attributed private commit shows the demo wiring and route display; gameplay footage illustrates movement, not code authorship.',
    diagramLabel: 'Path inspection',
    diagram: ['Start and target', 'Node map', 'Returned route'],
  },
  {
    title: 'Weapon Attack Areas by Direction and Position',
    framing: 'The calculation accepts a requested direction and grid position.',
    fields: [
      { label: 'Problem', text: 'A weapon pattern needs effective cells at a chosen position and direction.' },
      { label: 'Constraint', text: 'Configured offsets must be transformed before placement on the grid.' },
      { label: 'Approach', text: 'I rotate copied offsets for the supplied direction, then translate them to the requested position.' },
      { label: 'Trade-off', text: 'At least one inspected combat caller still passes East explicitly; not every attack is shown to follow current facing.' },
      { label: 'Result', text: 'The method derives attack cells for the supplied direction and position.' },
    ],
    evidenceLabel: 'Wallace · weapon area',
    behavior: 'Affected grid cells are highlighted before an attack.',
    evidence: 'Attributed source shows the offset transform; one inspected caller explicitly passes East. Wider facing integration is unverified.',
    diagramLabel: 'Attack-area transform',
    diagram: ['Configured offsets', 'Requested direction', 'Grid position → attack cells'],
  },
  {
    title: 'Enemy Turns & Combat Loop',
    framing: 'A playable encounter needed enemy actions to fit the same turn sequence as player actions.',
    fields: [
      { label: 'Question', text: 'How can the prototype hand control from a player action to an enemy response and back?' },
      { label: 'Approach', text: 'I implemented enemy-turn behavior alongside movement, attacks, damage, and an encounter ending state.' },
      { label: 'Consequence', text: 'The prototype supports one playable combat encounter, not a complete campaign or advanced tactical AI.' },
    ],
    evidenceLabel: 'Wallace · combat encounter',
    behavior: 'The gameplay shows a player turn, enemy response, and encounter outcome.',
    evidence: 'Attributed prototype history supports the combat-loop and enemy-turn contribution; the public build shows behavior, not source internals.',
    diagramLabel: 'Turn sequence', diagram: [], compact: true,
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
        src: '/projects/ello-read/read-with-ello-quest.png',
        mobileSrc: '/projects/ello-read/read-with-ello-quest-mobile.png',
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
        src: '/projects/ello-read/read-with-ello-mobile-library.png',
        alt: 'Read With Ello mobile library showing a grid of book covers under All E-books',
        caption: 'Book browsing in Read With Ello. The engineering story concerns the Unity-side catalog, cover and selected-book loading flow.',
        width: 382,
        height: 749,
        maxWidth: 382,
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

export type CaseStudy = {
  slug: string;
  project: Project;
  scopeLabel: string;
  scope: string;
  ownershipLabel: string;
  ownership: string;
  glance: { label: string; value: string }[];
  stories: Story[];
  media?: ProjectMedia;
  production?: string;
  supporting?: { title: string; text: string };
  reflection: string;
  evidenceLinks: { label: string; href: string }[];
  nextSlug: string;
  metaDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ilhas-do-alfabeto', project: featuredProjects[0],
    scopeLabel: 'Product / Team Context', scope: 'Instituto Alfa e Beto’s commercial literacy game combines activities with different rules, content, and feedback. It was developed and maintained by a team.',
    ownershipLabel: 'My Contribution', ownership: 'I designed and implemented substantial parts of Desafio dos Sons Iguais, while maintaining, improving, and supporting minigame systems across the wider product.',
    glance: [{ label: 'Context', value: 'Commercial game · team project' }, { label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Focus', value: 'Minigames and shared systems' }],
    stories: ilhasStories,
    production: 'I supported maintenance, builds, and deployment variants. My formal IAB title was Senior Unity Game Developer; I also had technical coordination and developer-support responsibilities.',
    reflection: 'The challenge was keeping shared behavior useful without forcing unlike minigames into the same rules. Desafio dos Sons Iguais also appears in another product history, so I present it once while that lineage is checked.',
    evidenceLinks: [{ label: 'Official product page', href: 'https://loja.alfaebeto.org.br/produto/ilhas-do-alfabeto.html' }, { label: 'Public gameplay', href: 'https://youtu.be/g5TmNTbx8k0' }], nextSlug: 'wallaces-quest',
    metaDescription: 'Commercial Unity game development: Desafio dos Sons Iguais, shared minigame systems, and production work by Phillipe Augusto.',
  },
  {
    slug: 'wallaces-quest', project: featuredProjects[1],
    scopeLabel: 'Project Scope', scope: 'A personal Unity/C# tactical RPG prototype with one playable encounter: player and enemy turns, grid movement, attacks, damage, and an ending state.',
    ownershipLabel: 'My Engineering Focus', ownership: 'I built the prototype’s combat loop and worked directly on grid pathfinding, enemy turns, and weapon attack-area calculations. The source repository remains private.',
    glance: [{ label: 'Context', value: 'Independent prototype' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Focus', value: 'Combat, grid, pathfinding' }, { label: 'Scope', value: 'Playable combat encounter' }],
    stories: wallaceStories,
    production: 'This is a prototype. Enemy behavior is limited, and skills and items are unfinished.',
    reflection: 'Isolated scenes made individual systems easier to inspect. For a larger game, I would reduce the central manager’s responsibilities and replace direct dependencies with clearer boundaries.',
    evidenceLinks: [{ label: 'Play the WebGL prototype', href: 'https://phillipeaam.itch.io/wallaces-quest' }, { label: 'Watch gameplay', href: 'https://youtu.be/3P1Tdx5HtuQ' }], nextSlug: 'read-with-ello',
    metaDescription: 'An independent Unity tactical RPG prototype: grid pathfinding, turn-based combat, and weapon attack areas by direction and position.',
  },
  {
    slug: 'read-with-ello', project: featuredProjects[2],
    scopeLabel: 'Product / Team Context', scope: 'Read With Ello is a Unity mobile reading product for children, combining interactive books with quests and rewards. This case follows one production journey from visible progression, through content loading, to the shared client tooling beneath it.',
    ownershipLabel: 'My Contribution', ownership: 'Within a collaborative team, I contributed to Unity-side quest and reward flows, Book Library presentation and loading, and specific shared GraphQL client/tooling paths. The backend, speech systems, content library and full release process were team or product work beyond my individual claim.',
    glance: [{ label: 'Context', value: 'Professional · Ello' }, { label: 'Role', value: 'Unity Software Engineer' }, { label: 'Period', value: 'Oct 2022–Aug 2025' }, { label: 'Stack', value: 'Unity · C# · uGUI · Addressables · GraphQL · Firebase · GrowthBook' }],
    stories: elloStories,
    media: { type: 'gif', src: '/projects/ello-read/read-with-ello-poster.png', previewSrc: '/projects/ello-read/read-with-ello-gameplay-preview.gif', alt: 'Read With Ello reading product featuring its elephant character', previewAlt: 'Read With Ello animated reading activity featuring its elephant character', caption: 'An interactive reading activity in Read With Ello; shown as product context, not as proof of the exact audited version.', showAnimatedDirectly: true, posterWidth: 1280, posterHeight: 720, posterFit: 'contain' },
    supporting: { title: 'Mobile redesign & onboarding (Phone++)', text: 'I also contributed to feature-flagged phone onboarding and related Unity UI flows. This supports the broader production story without turning a collaborative redesign into a fourth case-study claim.' },
    reflection: 'A player-facing reading journey relies on more than the screen in front of the child: progression state, content lifetimes and shared client boundaries have to remain understandable as the product evolves.',
    evidenceLinks: [{ label: 'Read With Ello on the App Store', href: 'https://apps.apple.com/us/app/read-with-ello/id1536720182' }], nextSlug: 'craque-da-fluencia',
    metaDescription: 'Read With Ello case study: Unity quest progression, book-library work, and targeted GraphQL client tooling.',
  },
  {
    slug: 'craque-da-fluencia', project: featuredProjects[3],
    scopeLabel: 'Product / Team Context', scope: 'The Instituto Alfa e Beto product guides reading assessments, receives speech-recognition results, and produces reports. It is a team-built assessment product.',
    ownershipLabel: 'My Contribution', ownership: 'I contributed to the assessment runtime, a structured word model, recognition-integration migration, defensive result handling, and retest and reevaluation flows.',
    glance: [{ label: 'Context', value: 'Professional assessment product' }, { label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Focus', value: 'Assessment state and integration' }],
    stories: craqueStories,
    production: 'I also worked on local persistence, synchronization, product variants, retest flows, QA builds, and release support.',
    reflection: 'Recognition output is uncertain; assessment state needs explicit rules for incomplete input. Keeping that boundary clear matters more than treating an SDK response as a final answer.',
    evidenceLinks: [{ label: 'Official product page', href: 'https://loja.alfaebeto.org.br/produto/craque-da-fluencia.html' }], nextSlug: 'ilhas-do-alfabeto',
    metaDescription: 'Craque da Fluência case study: Unity assessment state, structured word models, and speech-recognition integration work.',
  },
];

export function getCase(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
