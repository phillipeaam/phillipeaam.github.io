export type ProjectCategory = 'professional-game' | 'professional-product' | 'independent-game' | 'study-archive';

export type ProjectMedia = {
  type: 'image' | 'gif' | 'video' | 'youtube';
  src: string;
  previewSrc?: string;
  alt?: string;
  previewAlt?: string;
  title?: string;
  caption?: string;
  autoplayPreview?: boolean;
  showAnimatedDirectly?: boolean;
  posterWidth?: number;
  posterHeight?: number;
  posterFit?: 'cover' | 'contain';
};

export type ProjectAction = { href: string; label: string };

export type Project = {
  slug: string;
  name: string;
  context: string;
  kind: 'ilhas' | 'wallace' | 'ello' | 'craque' | 'pathless' | 'neutral';
  product: string;
  contribution: string;
  tags: string[];
  caseStudy?: boolean;
  evidenceLabel: string;
  archiveCategory: ProjectCategory;
  media?: ProjectMedia[];
  archiveAnchor?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: 'ilhas-do-alfabeto',
    name: 'Ilhas do Alfabeto',
    context: 'Professional · Commercial Unity Game',
    kind: 'ilhas',
    product: 'A commercial Unity literacy game built around interactive minigames.',
    contribution: 'I designed and implemented substantial parts of Desafio dos Sons Iguais, while maintaining, improving, and supporting minigame systems across the wider product.',
    tags: ['Minigames', 'Shared systems'],
    caseStudy: true,
    evidenceLabel: 'Ilhas do Alfabeto · gameplay',
    archiveCategory: 'professional-game',
  },
  {
    slug: 'wallaces-quest',
    name: 'Wallace’s Quest',
    context: 'Tactical turn-based RPG',
    kind: 'wallace',
    product: 'A tactical turn-based RPG built around grid movement, player and enemy turns, and a connected combat encounter. Positioning and action choices shape each exchange as the battle advances toward victory or defeat.',
    contribution: 'I implemented grid movement and turn/action flow across player and enemy turns, connecting attacks, damage resolution, and combat feedback to battle progression and its victory/defeat outcome.',
    tags: ['Grid combat', 'Turn-based', 'Tactical RPG'],
    caseStudy: true,
    evidenceLabel: 'Wallace’s Quest · tactical combat',
    archiveCategory: 'independent-game',
    media: [{ type: 'image', src: '/projects/wallace-quest/wallace-quest-poster.png', previewSrc: '/projects/wallace-quest/wallace-quest-gameplay-preview.gif', autoplayPreview: true, alt: 'Wallace’s Quest poster.', previewAlt: 'Gameplay preview from Wallace’s Quest.', posterWidth: 1254, posterHeight: 1254, posterFit: 'contain' }],
    archiveAnchor: 'wallaces-quest',
  },
  {
    slug: 'read-with-ello',
    name: 'Read With Ello',
    context: 'Professional · Ello',
    kind: 'ello',
    product: 'A Unity mobile reading product for children combining interactive reading, book-library exploration, quest and progression flows, rewards, content delivery, and speech-assisted coaching.',
    contribution: 'I contributed across quest and progression flows, reading and book library systems, phone-based onboarding experiences, rewards and Prize Store interactions, and GraphQL client integration, alongside selected shared-package and lifecycle work.',
    tags: ['Progression', 'Book library', 'GraphQL', 'Addressables'],
    caseStudy: true,
    evidenceLabel: 'Read With Ello · reading product',
    archiveCategory: 'professional-game',
    media: [{ type: 'image', src: '/projects/ello-read/read-with-ello-poster.png', previewSrc: '/projects/ello-read/read-with-ello-gameplay-preview.gif', autoplayPreview: true, alt: 'Read With Ello product poster.', previewAlt: 'Read With Ello gameplay preview showing an interactive reading activity.', posterWidth: 1680, posterHeight: 945, posterFit: 'contain' }],
    archiveAnchor: 'read-with-ello',
  },
  {
    slug: 'craque-da-fluencia',
    name: 'Craque da Fluência',
    context: 'Professional · Unity Assessment Product',
    kind: 'craque',
    product: 'A Unity reading-assessment product that processes spoken reading and presents results.',
    contribution: 'I worked on the word model, assessment state, and speech-recognition integration.',
    tags: ['Assessment', 'Speech integration', 'Unity'],
    caseStudy: true,
    evidenceLabel: 'Craque da Fluência · assessment flow',
    archiveCategory: 'professional-game',
  },
];

export type SupportingProjectRecord = {
  id: string;
  name: string;
  archiveCategory: ProjectCategory;
  period?: string;
  type: string;
  product: string;
  contribution?: string;
  engineeringFocus?: string;
  context?: string;
  anchorId?: string;
  showOnHome?: boolean;
  homeOrder?: number;
  mediaLabel?: string;
  kind?: Project['kind'];
  actions?: ProjectAction[];
  media?: ProjectMedia[];
};

// These are canonical supporting-project records. The Home is a curated filter of this set;
// the Projects page uses the same descriptions, actions, and optional media.
export const otherWork: SupportingProjectRecord[] = [
  {
    id: 'pathless', name: 'Pathless', period: 'Aug 23–30, 2026', type: 'Brackeys Game Jam 2026.2 · Unity 6 · C# · WebGL', archiveCategory: 'independent-game',
    product: 'Built by a three-person team for Brackeys Game Jam 2026.2, Pathless is a Unity 6 rescue-and-exploration game made in the jam’s one-week window. Players follow proximity radio signals to locate survivors and meet their assistance needs. An escalating calamity adds time pressure, making extraction the final step of each rescue run.',
    contribution: 'I implemented the proximity radio scanner and HUD, survivor interaction and assistance flows, and rescue accounting. I also integrated mission progression from the menu and arrival intro through extraction, restart, and results reporting.',
    engineeringFocus: 'Signal definitions hold scan ranges; every 0.3 seconds, distance maps to discrete strength and the HUD presents the strongest channels—not direction or triangulation. ScriptableObjects also configure survivor assistance and calamity sequences. Events/delegates connect mission state to rescue/results; Unity Awaitable sequences the arrival intro, with UI Toolkit and the Input System handling presentation and control.',
    context: 'Unity Gameplay Programmer · three-person team', mediaLabel: 'RESCUE GAMEPLAY — PATHLESS', showOnHome: true, homeOrder: 1, kind: 'pathless',
    actions: [{ href: 'https://phillipeaam.itch.io/pathless', label: 'Play on itch.io' }, { href: 'https://youtu.be/1UMGSYFvUT8', label: 'Watch gameplay' }],
  },
  {
    id: 'flui', anchorId: 'work-flui', name: 'Flui — A Cidade das Palavras', period: '2017–2021', type: 'Commercial Unity game', archiveCategory: 'professional-game',
    product: 'A commercial Unity game that teaches literacy through exploration, character progression, and interactive minigames.', contribution: 'Worked across gameplay systems and minigame implementation, supporting the game’s ongoing production and maintenance.', context: 'Instituto Alfa e Beto · professional product work', mediaLabel: 'GAMEPLAY / PRODUCT MEDIA — FLUI', showOnHome: true, homeOrder: 2, kind: 'neutral',
    actions: [
      { href: 'https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html', label: 'Official product' },
      { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1945254108/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
    ],
  },
  {
    id: 'tabuada-na-fazenda', anchorId: 'work-tabuada', name: 'Tabuada na Fazenda', period: '2020–2022', type: 'Commercial Unity game', archiveCategory: 'professional-game',
    product: 'A commercial Unity math game set around an interactive farm and themed learning activities.', contribution: 'Contributed to minigames, tutorials, farm interactions, and progression systems as the product evolved.', context: 'Instituto Alfa e Beto · professional product work', mediaLabel: 'GAMEPLAY MEDIA — TABUADA', showOnHome: true, homeOrder: 3, kind: 'neutral',
    actions: [{ href: 'https://loja.alfaebeto.org.br/produto/tabuada-na-fazenda.html', label: 'Official product' }],
  },
  {
    id: 'sweets-and-shadows', name: 'Sweets and Shadows', period: '2023-10', type: 'Unity game jam collaboration', archiveCategory: 'independent-game',
    product: 'A 72-hour action game made with a teammate for Mini Jam 144.', context: 'Development and design · witch-boss encounter',
    actions: [{ href: 'https://phillipeaam.itch.io/sweets-and-shadows', label: 'Play on itch.io' }],
  },
  {
    id: 'craque-da-leitura', anchorId: 'work-craque-leitura', name: 'Craque da Leitura', period: '2017–2022', type: 'Interactive reading product', archiveCategory: 'professional-game',
    product: 'An interactive reading product with book content, catalog, and guided reading flows.', context: 'Instituto Alfa e Beto · professional product work',
    actions: [{ href: 'https://loja.alfaebeto.org.br/produto/craque-da-leitura.html', label: 'Official product' }, { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1497806737/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' }],
  },
  {
    id: 'learn-with-ello', anchorId: 'work-ello-2', name: 'Ello 2.0: Learn Reading & Math', period: 'Sep–Nov 2025', type: 'Professional learning platform · Flutter / Dart / Python', archiveCategory: 'professional-game',
    product: 'Ello 2.0 is a professional reading-and-math product for children, delivered through the Flutter Learn app. Reading and math activities are organized through daily quests, progression, and rewards, with adaptive experiences shaped by learning-agent interactions. The client connects these flows to backend services. Unlike Read With Ello, this product uses Flutter rather than Unity.',
    contribution: 'I contributed to quest progression and rewards across typed, configuration-driven models, providers, completion services, client view models/screens, and tests. I connected home-screen activities to learning-agent requests across Python services and Flutter routing/interaction contracts, and implemented the parent-gate flow. I also shared account/settings and intro-media lifecycle work; this was feature integration, not ownership of Ello’s broader learning-agent platform.',
    engineeringFocus: 'Typed quest/activity models and provider/service boundaries coordinate configured flows with client state; guarded initialization and shared in-flight requests prevent duplicate work. Completion validates interaction IDs and suppresses repeated rewards; noncritical sync/analytics failures do not block local progress. GraphQL and Protocol Buffers carry client/backend contracts, backed by quest and parent-gate tests.',
    context: 'Ello · professional product work',
    actions: [
      { href: 'https://apps.apple.com/us/app/ello-2-0-learn-reading-math/id6739630070', label: 'App Store' },
      { href: 'https://play.google.com/store/apps/details?id=com.ellotechnology.learn', label: 'Google Play' },
      { href: 'https://www.youtube.com/watch?v=Vzb09qXUL44', label: 'Watch promo' },
    ],
  },
  {
    id: 'avaliacao-diagnostica', anchorId: 'work-avaliacao-diagnostica', name: 'Avaliação Diagnóstica', period: 'Undated', type: 'Digital school-assessment platform', archiveCategory: 'professional-product',
    product: 'A school assessment platform with Portuguese and math workflows, offline use, synchronization, and reporting.', context: 'Instituto Alfa e Beto · professional product',
    actions: [
      { href: 'https://alfaebeto.org.br/conheca-a-alfa-e-beto-avaliacao/', label: 'Official product overview' },
      { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1520869873/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
    ],
  },
  {
    id: 'avaliacao-lingua-portuguesa', anchorId: 'work-avaliacao-lingua-portuguesa', name: 'Avaliação da Língua Portuguesa', period: 'Undated', type: 'Unity interactive assessment', archiveCategory: 'professional-game',
    product: 'Interactive Portuguese-language assessment activities for literacy learning.', context: 'Instituto Alfa e Beto · professional Unity product work',
  },
  {
    id: 'iab-digital-zero-a-quatro', anchorId: 'work-iab-digital', name: 'IAB Digital: Zero a Quatro na Palma da Mão', period: 'Undated', type: 'Early-childhood education platform', archiveCategory: 'professional-product',
    product: 'A digital learning platform connecting classroom activities and school workflows.', context: 'Cedro Technologies · professional product context',
  },
  {
    id: 'iab-testes', anchorId: 'work-iab-testes', name: 'IAB Testes', period: 'Undated', type: 'Tablet assessment platform', archiveCategory: 'professional-product',
    product: 'A tablet-based digital assessment product for school literacy workflows.', context: 'Cedro Technologies · professional product context',
  },
  {
    id: 'mypush', anchorId: 'work-mypush', name: 'MyPush', period: 'Undated', type: 'B2B mobile product', archiveCategory: 'professional-product',
    product: 'Professional mobile software work involving client applications and service integrations.', context: 'Earlier professional software experience',
  },
  {
    id: 'morada-verde-inventory-flow', anchorId: 'work-morada-verde', name: 'MVIF — Morada Verde Inventory Flow', period: 'Undated', type: 'Client operational software', archiveCategory: 'professional-product',
    product: 'An inventory and business-workflow product from earlier professional software work.', context: 'Earlier client software product',
  },
];

export const homeSupportingProjects = otherWork
  .filter((project) => project.showOnHome)
  .sort((a, b) => (a.homeOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeOrder ?? Number.MAX_SAFE_INTEGER));

export function resolveExperienceWork(projectId: string, baseUrl = '/') {
  const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const caseProject = featuredProjects.find((project) => project.slug === projectId);
  if (caseProject) return { name: caseProject.name, href: `${basePath}work/${caseProject.slug}/` };

  const project = otherWork.find((entry) => entry.id === projectId);
  if (project && 'anchorId' in project && project.anchorId) {
    return { name: project.name, href: project.showOnHome ? `${basePath}#${project.anchorId}` : `${basePath}projects/#${project.anchorId}` };
  }

  throw new Error(`Experience Selected Work references an unknown project: ${projectId}`);
}

// Preserve these project records for internal/future review; they are not rendered publicly.
export const deferredOtherWork = [
  {
    id: 'heroes-secrets', name: 'Heroes’ Secrets', period: 'Current / ongoing', type: 'Independent team autobattler',
    detail: 'An in-development autobattler exploring combat systems, abilities, equipment, and AI.', context: 'Independent · current team project', tags: ['Unity', 'Autobattler', 'In development'], mediaLabel: 'GAMEPLAY PROXY — HEROES’ SECRETS', kind: 'neutral',
  },
  {
    id: 'radwasteland-echoes', name: 'RadWasteland — Echoes', period: '2024-04', type: 'Solo Unity strategy / RPG jam game',
    detail: 'A Ludum Dare 55 game about summoning creatures in a post-apocalyptic wasteland.', context: 'Independent · browser game', tags: ['Unity', 'Strategy', 'Ludum Dare'], mediaLabel: 'STRATEGY GAMEPLAY — RADWASTELAND',
    href: 'https://phillipeaam.itch.io/radwasteland-echoes', linkLabel: 'View project page', kind: 'neutral',
  },
  {
    id: 'angry-world', name: 'Angry World', period: '2017-04', type: 'Ludum Dare 38 game',
    detail: 'A short space action game about protecting planets and collecting crystals.', context: 'Independent · released for browser', tags: ['Unity', 'Action', 'Ludum Dare'], mediaLabel: 'SPACE GAMEPLAY — ANGRY WORLD',
    href: 'https://phillipeaam.itch.io/angry-world', linkLabel: 'Play on itch.io', kind: 'neutral',
  },
  {
    id: 'repo-dna', name: 'RepoDNA', period: 'Undated', type: 'Developer tooling',
    detail: 'Developer tooling for repository analysis and project context.', tags: ['Tooling', 'CLI', 'Software'], mediaLabel: 'DEVELOPER TOOLING — REPODNA', kind: 'neutral',
  },
  {
    id: 'survive-and-escape', name: 'Survive & Escape', period: 'Undated', type: 'Independent C++ game',
    detail: 'A small Windows puzzle game built from scratch while learning C++ and raylib.', context: 'Independent game-development study', tags: ['C++', 'raylib', 'Windows'], mediaLabel: 'PUZZLE GAMEPLAY — SURVIVE & ESCAPE',
    href: 'https://phillipeaam.itch.io/survive-and-escape', linkLabel: 'View game on itch.io', kind: 'neutral',
  },
];

export type ProjectInventoryEntry = {
  id: string;
  anchorId?: string;
  name: string;
  archiveCategory: ProjectCategory;
  period?: string;
  type: string;
  product: string;
  contribution?: string;
  engineeringFocus?: string;
  evidenceLabel?: string;
  mediaCaption?: string;
  kind?: Project['kind'];
  context?: string;
  caseStudySlug?: string;
  actions?: ProjectAction[];
  media?: ProjectMedia[];
  identityImage?: string;
  archivePresentation?: 'rich' | 'standard' | 'compact';
  specs?: { label: string; value: string }[];
};

const deferredPublicArchiveIds = new Set(['radwasteland-echoes', 'angry-world', 'survive-and-escape']);
const publicArchiveEntries: ProjectInventoryEntry[] = deferredOtherWork
  .filter((project) => deferredPublicArchiveIds.has(project.id))
  .map((project) => ({
    id: project.id,
    name: project.name,
    period: project.period,
    type: project.type,
    archiveCategory: project.id === 'survive-and-escape' ? 'study-archive' : 'independent-game',
    product: project.detail,
    context: project.context,
    actions: 'href' in project && project.href ? [{ href: project.href, label: project.linkLabel ?? 'View project' }] : [],
  }));

const archiveDetails: Record<string, Partial<Pick<ProjectInventoryEntry, 'archivePresentation' | 'specs' | 'media' | 'identityImage' | 'product' | 'contribution' | 'engineeringFocus' | 'evidenceLabel' | 'mediaCaption' | 'kind' | 'caseStudySlug' | 'actions'>>> = {
  'ilhas-do-alfabeto': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'wallaces-quest': {
    archivePresentation: 'rich',
    kind: 'wallace',
    identityImage: '/projects/wallace-quest/wallace-quest-poster.png',
    evidenceLabel: 'Wallace’s Quest · tactical combat',
    specs: [{ label: 'Role', value: 'Game Engineer' }, { label: 'Period', value: 'Aug 2020' }, { label: 'Stack', value: 'Unity · C# · Tilemap · ScriptableObjects · uGUI' }, { label: 'Context', value: 'Tactical turn-based RPG' }],
    product: 'Wallace’s Quest is a tactical turn-based RPG built around grid-based combat, positioning and deliberate action choices. Each encounter alternates between player and enemy turns across a shared battlefield, where movement, attacks and unit state shape the match and its clear victory or defeat conditions.',
    contribution: 'I implemented the encounter’s turn and action flow, coordinating player and enemy progression through grid movement, attacks, damage resolution, and action completion. I connected battle-state changes to victory/defeat evaluation and wired combat feedback so each resolved action advances the encounter, hands control to the next turn, and makes its outcome clear.',
    engineeringFocus: 'Turn ownership sequences player and enemy units, while action completion separates each movement or attack routine from advancement of the encounter. Combat state feeds stage victory/defeat conditions; coroutines and event handoffs coordinate behavior and feedback across these transitions, keeping the loop readable as state changes from active turn to resolved match.',
    actions: [{ href: 'https://phillipeaam.itch.io/wallaces-quest', label: 'Play on itch.io' }],
  },
  'read-with-ello': {
    archivePresentation: 'rich',
    caseStudySlug: 'read-with-ello',
    identityImage: '/projects/ello-read/read-with-ello-poster.png',
    specs: [{ label: 'Role', value: 'Unity Software Engineer' }, { label: 'Period', value: 'Oct 2022–Aug 2025' }, { label: 'Stack', value: 'Unity · C# · uGUI · Addressables · GraphQL · Firebase · GrowthBook' }, { label: 'Context', value: 'Professional · Ello' }],
    product: 'A Unity mobile reading product for children where book discovery, interactive reading, and daily progression work together to make practice feel guided and rewarding. The experience combines a content-heavy library with service-backed quests, rewards, and coaching flows.',
    contribution: 'I worked on three connected product areas: the Book Library and its loading/navigation behavior; Unity-side GraphQL integration for service-backed features; and the quest/progression surfaces that connect objectives, reading activities, completion feedback, and rewards. I also supported selected shared UI and lifecycle work within the wider team codebase.',
    engineeringFocus: 'The recurring engineering problem was keeping a content-heavy mobile experience understandable and resilient: reusable uGUI for player-facing states, Addressables-backed content boundaries, asynchronous client responses, and transitions between library, reading, quest, and reward screens. The implementation focus was the Unity client; backend, speech, and platform ownership remain outside the claim.',
    actions: [{ href: 'https://apps.apple.com/us/app/read-with-ello/id1536720182', label: 'App Store' }, { href: 'https://youtu.be/sk9Ob5f1GT8', label: 'Watch Promo' }],
  },
  'craque-da-fluencia': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  pathless: {
    archivePresentation: 'rich',
    identityImage: '/projects/pathless/pathless-poster.png',
    specs: [{ label: 'Role', value: 'Unity Gameplay Programmer' }, { label: 'Period', value: 'Aug 23–30, 2026' }, { label: 'Stack', value: 'Unity 6 · C# · URP · Input System · UI Toolkit · Cinemachine' }, { label: 'Context', value: 'Independent · Brackeys Game Jam 2026.2 · three-person team' }],
    product: 'Built by a three-person team for Brackeys Game Jam 2026.2, Pathless is a Unity 6 rescue-and-exploration game made in a one-week window. Players use proximity radio signals to locate survivors, meet assistance needs, and manage an escalating earthquake-driven calamity before extracting and reviewing the rescue outcome.',
    contribution: 'Implemented the proximity radio scanner and HUD, survivor interaction and assistance flows, and rescue accounting. Integrated the mission loop from menu and helicopter arrival through radio discovery, earthquake and ground-collapse pressure, extraction, restart, and results reporting. Also connected the player-facing systems into the assembled Unity scene and input flow.',
    engineeringFocus: 'Data-driven signal definitions map distance to discrete radio strength, while ScriptableObjects configure survivor assistance and calamity sequences. Events and delegates connect mission state to rescue/results; Unity Awaitable sequences arrival, with UI Toolkit and the Input System carrying presentation and control.',
    media: [{ type: 'image', src: '/projects/pathless/pathless-poster.png', previewSrc: '/projects/pathless/pathless-gameplay-preview.gif', autoplayPreview: true, alt: 'Pathless gameplay poster showing a helicopter above a rescue-game landscape.' }],
  },
  flui: { archivePresentation: 'standard', specs: [{ label: 'Engine', value: 'Unity' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'tabuada-na-fazenda': { archivePresentation: 'standard', specs: [{ label: 'Engine', value: 'Unity' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'sweets-and-shadows': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Mini Jam 144 · 72 hours' }, { label: 'Engine', value: 'Unity' }, { label: 'Team', value: '2 people' }] },
  'radwasteland-echoes': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Ludum Dare 55 · solo jam' }, { label: 'Engine', value: 'Unity' }] },
  'angry-world': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Ludum Dare 38 · solo jam' }, { label: 'Engine', value: 'Unity' }] },
  'survive-and-escape': { archivePresentation: 'compact', specs: [{ label: 'Tools', value: 'C++ / raylib' }, { label: 'Platform', value: 'Windows' }] },
  'craque-da-leitura': { archivePresentation: 'compact', specs: [{ label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'learn-with-ello': {
    archivePresentation: 'rich',
    identityImage: '/projects/ello-learn/ello-learn-poster.png',
    specs: [{ label: 'Role', value: 'Software Engineer' }, { label: 'Period', value: 'Sep–Nov 2025' }, { label: 'Stack', value: 'Flutter · Dart · Python · GraphQL · Protocol Buffers · GrowthBook · Provider' }, { label: 'Context', value: 'Professional · Ello' }],
    product: 'A professional learning platform for children combining reading and math activities, daily quest/progression flows, rewards, and adaptive experiences across a Flutter client, backend services, and learning-agent interactions. The product connects content delivery, account flows, and activity state into a guided learning journey.',
    contribution: 'Contributed to quest progression and rewards across typed, configuration-driven models, providers, completion services, client view models/screens, and tests. Connected home-screen activities to learning-agent requests across Python services and Flutter routing/interaction contracts, and implemented the parent-gate flow. Also contributed to shared account/settings and intro-media lifecycle work.',
    engineeringFocus: 'Typed quest and activity models, provider/service boundaries, and GraphQL/Protocol Buffers contracts coordinate configured flows with client state. Guarded initialization and shared in-flight requests prevent duplicate work; completion validates interaction IDs, suppresses repeated rewards, and keeps local progress resilient to noncritical sync and analytics failures.',
    media: [{
      type: 'image',
      src: '/projects/ello-learn/ello-learn-poster.png',
      previewSrc: '/projects/ello-learn/ello-learn-gameplay-preview.gif',
      autoplayPreview: true,
      alt: 'A smiling yellow-orange cartoon mascot with large brown eyes and coral-colored tufts against a pale blue background.',
      previewAlt: 'An Ello preview cycles through colorful reading and counting activities, including a character in a snowy scene with a star counter.',
      posterWidth: 480,
      posterHeight: 480,
      posterFit: 'contain',
    }],
  },
  'avaliacao-diagnostica': { archivePresentation: 'compact', specs: [{ label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'avaliacao-lingua-portuguesa': { archivePresentation: 'compact', specs: [{ label: 'Engine', value: 'Unity' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'iab-digital-zero-a-quatro': { archivePresentation: 'compact', specs: [{ label: 'Context', value: 'Cedro Technologies' }] },
  'iab-testes': { archivePresentation: 'compact', specs: [{ label: 'Context', value: 'Cedro Technologies' }] },
  mypush: { archivePresentation: 'compact' },
  'morada-verde-inventory-flow': { archivePresentation: 'compact' },
};

export const projectInventory: ProjectInventoryEntry[] = [
  ...featuredProjects.map((project) => ({
    id: project.slug,
    name: project.name,
    archiveCategory: project.archiveCategory,
    type: project.context,
    product: project.product,
    contribution: project.contribution,
    anchorId: project.archiveAnchor,
    media: project.media,
    evidenceLabel: project.evidenceLabel,
    kind: project.kind,
    caseStudySlug: project.caseStudy ? project.slug : undefined,
  })),
  ...otherWork,
  ...publicArchiveEntries,
].map((project) => ({ ...project, ...archiveDetails[project.id] }));

export const projectInventoryGroups = [
  { id: 'professional-game', eyebrow: '01 / UNITY & GAMES', title: 'Professional games & Unity products', intro: 'Commercial game development and interactive Unity products built in professional teams.', order: ['learn-with-ello', 'read-with-ello', 'tabuada-na-fazenda', 'craque-da-leitura', 'flui', 'ilhas-do-alfabeto', 'craque-da-fluencia', 'avaliacao-lingua-portuguesa'] },
  { id: 'professional-product', eyebrow: '02 / SOFTWARE', title: 'Software & interactive products', intro: 'Professional assessment, learning and operational software beyond the game portfolio.', order: ['avaliacao-diagnostica', 'iab-testes', 'iab-digital-zero-a-quatro', 'mypush', 'morada-verde-inventory-flow'] },
  { id: 'independent-game', eyebrow: '03 / INDEPENDENT', title: 'Independent & collaborative games', intro: 'Independent games and jam collaborations, spanning solo projects and small teams.', order: ['pathless', 'radwasteland-echoes', 'sweets-and-shadows', 'wallaces-quest', 'angry-world'] },
  { id: 'study-archive', eyebrow: '04 / STUDY', title: 'Experiments & study', intro: 'Smaller technical studies kept as part of the development record.', order: ['survive-and-escape'] },
].map((group) => ({
  ...group,
  projects: projectInventory
    .filter((project) => project.archiveCategory === group.id)
    .sort((a, b) => {
      const first = group.order.indexOf(a.id);
      const second = group.order.indexOf(b.id);
      return (first < 0 ? Number.MAX_SAFE_INTEGER : first) - (second < 0 ? Number.MAX_SAFE_INTEGER : second);
    }),
}));

export const supportingWork = [
  { name: 'RepoDNA', context: 'Repository analysis tool · software engineering' },
  { name: 'Survive & Escape', context: 'Independent game · C++ and raylib' },
];
