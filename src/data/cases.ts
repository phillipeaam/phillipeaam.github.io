import { featuredProjects, type Project, type ProjectMedia } from './projects';

export type StoryField = { label: string; text: string };
export type Story = {
  title: string;
  framing: string;
  fields: StoryField[];
  evidenceLabel: string;
  behavior: string;
  evidence: string;
  diagramLabel: string;
  diagram: string[];
  mermaid?: string;
  compact?: boolean;
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
    title: 'Book Library — Loading Under Mobile Constraints',
    framing: 'A growing catalog had to feel like a responsive reading journey, not a long list of assets waiting to appear.',
    fields: [
      { label: 'Problem', text: 'Readers needed to browse categories, see book covers, and enter the right reading activity without losing context.' },
      { label: 'Constraint', text: 'The catalog was content-heavy, while mobile memory, asynchronous loading, and repeated navigation made a naïve all-at-once screen fragile.' },
      { label: 'Approach', text: 'I worked across selection, category, grid, scroller, and data-service layers, keeping reusable models and views aligned with the loading lifecycle. The UI was treated as a stateful surface: data readiness, selection, reload, and entry into a quest had to agree.' },
      { label: 'Solution', text: 'The library could assemble a discoverable book surface and hand a selected title into the reading flow through clearer boundaries. That made the feature easier to extend with categories, quests, and different content sets without collapsing navigation and data concerns into one screen.' },
    ],
    evidenceLabel: 'Ello · book library',
    behavior: 'Readers browse and select books from the library.',
    evidence: 'The preserved project contains Book Library and Book Selection scene/controller layers, category and grid services, scrolling components, and quest-library data models. This supports the implementation story without claiming sole ownership of the product catalog or measured performance.',
    diagramLabel: 'Library presentation flow', diagram: ['Book data', 'Loading and models', 'Library UI'],
    mermaid: 'flowchart LR\n  A[Book data] --> B[Library selection]\n  B --> C[Reusable models]\n  C --> D[Book Library UI]\n  D --> E[Reading flow]',
  },
  {
    title: 'GraphQL Operations — Reusable Unity Client Tooling',
    framing: 'Player-facing features needed service data without turning every screen into its own integration experiment.',
    fields: [
      { label: 'Problem', text: 'Library, progression, and reward features all depended on remote state, but their Unity screens should not each own a different request pattern.' },
      { label: 'Constraint', text: 'The client had to fit existing GraphQL contracts, asynchronous responses, loading states, and team-owned backend behavior.' },
      { label: 'Approach', text: 'I adapted reusable operation configuration and client integration patterns, then connected returned data to player-facing feature state. The important boundary was between request execution and screen behavior: loading, response handling, and UI updates could evolve without duplicating the whole integration in every feature.' },
      { label: 'Solution', text: 'Features could share a more consistent service boundary while keeping backend ownership and guarantees outside the client-side contribution claim. In practice, this supported the library, progression, and reward surfaces with a common way to consume service-backed state.' },
    ],
    evidenceLabel: 'Ello · client data flow',
    behavior: 'Player-facing screens present data returned by product services.',
    evidence: 'The project history supports client integration work, and the preserved build configuration references GraphQL client preparation. Screens do not reveal backend implementation or ownership, so the claim remains limited to Unity-side integration and tooling.',
    diagramLabel: 'Client operation flow', diagram: ['Unity feature', 'GraphQL operation', 'Service response'],
    mermaid: 'sequenceDiagram\n  participant UI as Unity feature\n  participant Client as GraphQL client\n  participant Service as Product service\n  UI->>Client: Configure and run operation\n  Client->>Service: Request data\n  Service-->>Client: Response\n  Client-->>UI: Update player-facing state',
  },
  {
    title: 'Player-Facing Quest & Progression Flows',
    framing: 'Reading practice becomes easier to sustain when the next objective, the current state, and the reward are all legible to the player.',
    fields: [
      { label: 'Problem', text: 'Quest objectives, reading activities, completion feedback, and rewards needed to read as one progression loop rather than disconnected screens.' },
      { label: 'Constraint', text: 'The client had to present service-backed state clearly while handling objective completion, reward visibility, and transitions between home, library, and reading flows.' },
      { label: 'Approach', text: 'I worked on player-facing quest presentation, objective and detail states, reward-claim interactions, library quest entry points, and related UI behavior. The focus was translating state changes into clear transitions and feedback instead of leaving progress implicit in service data.' },
      { label: 'Solution', text: 'The reading journey could expose a clearer loop: choose an objective, enter the relevant activity, see progress, and understand the next reward step. This made progression a navigable product experience while keeping authoritative quest and economy behavior outside the client-side claim.' },
    ],
    evidenceLabel: 'Ello · quest flow',
    behavior: 'Public product material shows quests and progression in the reading journey.',
    evidence: 'The preserved project contains quest runtime models/services, home quest controllers for objectives, details, instructions, rewards, and kudos, plus library quest and reward services. This supports player-facing implementation work, not ownership of the full quest economy or backend.',
    diagramLabel: 'Quest progression state', diagram: [],
    mermaid: 'stateDiagram-v2\n  [*] --> QuestAvailable\n  QuestAvailable --> InProgress: start\n  InProgress --> BookReading: select book\n  BookReading --> ObjectiveComplete: finish activity\n  ObjectiveComplete --> RewardReady: claimable\n  RewardReady --> ProgressUpdated: claim\n  ProgressUpdated --> [*]',
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
  role: string;
  scopeLabel: string;
  scope: string;
  ownershipLabel: string;
  ownership: string;
  glance: { label: string; value: string }[];
  stories: Story[];
  media?: ProjectMedia;
  production?: string;
  reflection: string;
  evidenceLinks: { label: string; href: string }[];
  nextSlug: string;
  metaDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ilhas-do-alfabeto', project: featuredProjects[0], role: 'Senior Unity Game Developer',
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
    slug: 'wallaces-quest', project: featuredProjects[1], role: 'Independent Gameplay Engineer',
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
    slug: 'read-with-ello', project: featuredProjects[2], role: 'Unity Software Engineer',
    scopeLabel: 'Product / Team Context', scope: 'Read With Ello is a Unity mobile reading product for children. The case focuses on how its library, service-backed state, and progression surfaces connect into a repeatable reading journey.',
    ownershipLabel: 'My Contribution', ownership: 'Within a collaborative production team, I worked on the Unity-side implementation of those three areas: the library and its loading boundaries, GraphQL-backed feature integration, and the quest/progression UI that turns reading activity into visible progress.',
    glance: [{ label: 'Context', value: 'Professional · Ello' }, { label: 'Role', value: 'Unity Software Engineer' }, { label: 'Period', value: 'Oct 2022–Aug 2025' }, { label: 'Stack', value: 'Unity · C# · uGUI · Addressables · GraphQL · Firebase · GrowthBook' }],
    stories: elloStories,
    media: { type: 'image', src: '/projects/ello-read/read-with-ello-poster.png', previewSrc: '/projects/ello-read/read-with-ello-gameplay-preview.gif', alt: 'Read With Ello product poster', previewAlt: 'Read With Ello gameplay preview', autoplayPreview: true, posterFit: 'contain' },
    reflection: 'The product made one lesson concrete: a player-facing reading journey depends on how content, loading, lifecycle, reusable UI, and service-backed state behave together on real devices.',
    evidenceLinks: [{ label: 'Read With Ello on the App Store', href: 'https://apps.apple.com/us/app/read-with-ello/id1536720182' }], nextSlug: 'craque-da-fluencia',
    metaDescription: 'Read With Ello case study: Unity book-library work, player-facing progression, and reusable GraphQL client tooling.',
  },
  {
    slug: 'craque-da-fluencia', project: featuredProjects[3], role: 'Senior Unity Game Developer',
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
