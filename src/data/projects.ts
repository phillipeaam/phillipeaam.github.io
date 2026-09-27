export type ProjectCategory = 'professional-game' | 'professional-product' | 'independent-game' | 'study-archive';

export type ProjectMedia = {
  type: 'image' | 'gif' | 'video' | 'youtube';
  src: string;
  previewSrc?: string;
  alt?: string;
  title?: string;
  caption?: string;
  autoplayPreview?: boolean;
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
    context: 'Independent · Tactical RPG Prototype',
    kind: 'wallace',
    product: 'A personal tactical RPG prototype with one playable combat encounter.',
    contribution: 'I built grid movement, pathfinding, turn-based combat, enemy turns, and weapon attack areas.',
    tags: ['Combat', 'Pathfinding', 'Turn-based'],
    caseStudy: true,
    evidenceLabel: 'Wallace’s Quest · tactical combat',
    archiveCategory: 'independent-game',
  },
  {
    slug: 'read-with-ello',
    name: 'Read With Ello',
    context: 'Professional · Unity Reading Product',
    kind: 'ello',
    product: 'A Unity reading product with quests, rewards, progression, and avatar customization.',
    contribution: 'I worked on player-facing quest flows, the book library, and GraphQL client tooling.',
    tags: ['Progression', 'Library', 'GraphQL'],
    caseStudy: true,
    evidenceLabel: 'Read With Ello · reading product',
    archiveCategory: 'professional-game',
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
  showcaseDescription?: string;
  homeDescription?: string;
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
    id: 'pathless', name: 'Pathless', period: '2026', type: 'Brackeys Game Jam 2026.2 · Unity 6 · C# · WebGL', archiveCategory: 'independent-game',
    product: 'A 3D rescue/exploration game where players use a proximity-based radio to locate survivors while an escalating earthquake creates time pressure and forces decisions about when to continue searching or evacuate.', contribution: 'Implemented the proximity-based radio scanner and HUD, survivor interaction and assistance flows, and rescue accounting. Integrated the mission flow from menu and arrival intro through calamity, extraction, restart, and result reporting, while configuring player input, mission triggers, and the main scene for the WebGL build.', engineeringFocus: 'Configured gameplay data with ScriptableObjects, bounded radio sampling, and Unity Awaitable sequences. Connected mission state through event-driven flow and integrated the radio HUD with UI Toolkit.', showcaseDescription: 'Pathless is a Unity 6 rescue/exploration game built by a three-person team for Brackeys Game Jam 2026.2. My work included the proximity-based radio scanner, survivor interaction flows, and gameplay integration across calamity, extraction, and results.', homeDescription: 'Made with a three-person team for Brackeys Game Jam 2026.2, Pathless is a 3D rescue game where proximity radio signals lead players to survivors as earthquakes trigger ground collapse and evacuation pressure. I implemented the scanner, HUD, and survivor rescue flow, then integrated extraction, restart, and results.', context: 'Unity Gameplay Programmer · three-person team', mediaLabel: 'RESCUE GAMEPLAY — PATHLESS', showOnHome: true, homeOrder: 1, kind: 'pathless',
    actions: [{ href: 'https://phillipeaam.itch.io/pathless', label: 'Play on itch.io' }, { href: 'https://youtu.be/1UMGSYFvUT8', label: 'Watch gameplay' }],
  },
  {
    id: 'flui', anchorId: 'work-flui', name: 'Flui — A Cidade das Palavras', period: '2017–2021', type: 'Commercial Unity game', archiveCategory: 'professional-game',
    product: 'A commercial Unity game that teaches literacy through exploration, character progression, and interactive minigames.', contribution: 'Worked across gameplay systems and minigame implementation, supporting the game’s ongoing production and maintenance.', showcaseDescription: 'A commercial Unity literacy game from Instituto Alfa e Beto, built around exploration, character progression, and interactive minigames. I implemented gameplay features and minigame interactions, then maintained and adapted existing systems as content and production needs evolved over several years.', context: 'Instituto Alfa e Beto · professional product work', mediaLabel: 'GAMEPLAY / PRODUCT MEDIA — FLUI', showOnHome: true, homeOrder: 2, kind: 'neutral',
    actions: [
      { href: 'https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html', label: 'Official product' },
      { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1945254108/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
    ],
  },
  {
    id: 'tabuada-na-fazenda', anchorId: 'work-tabuada', name: 'Tabuada na Fazenda', period: '2020–2022', type: 'Commercial Unity game', archiveCategory: 'professional-game',
    product: 'A commercial Unity math game set around an interactive farm and themed learning activities.', contribution: 'Contributed to minigames, tutorials, farm interactions, and progression systems as the product evolved.', showcaseDescription: 'A commercial Unity math game from Instituto Alfa e Beto, set on an interactive farm with activity-driven minigames. I contributed to minigames, tutorials, farm interactions, and progression, and supported maintenance of these gameplay flows through content changes and ongoing production work.', context: 'Instituto Alfa e Beto · professional product work', mediaLabel: 'GAMEPLAY MEDIA — TABUADA', showOnHome: true, homeOrder: 3, kind: 'neutral',
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
    id: 'learn-with-ello', anchorId: 'work-learn-with-ello', name: 'Ello 2.0: Learn Reading & Math', type: 'Learning platform · product continuation', archiveCategory: 'professional-game',
    product: 'A later Ello learning-platform continuation, extending its reading experience into early math and adaptive learning.',
    actions: [{ href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1354869267/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' }],
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

const archiveDetails: Record<string, Pick<ProjectInventoryEntry, 'archivePresentation' | 'specs' | 'media' | 'identityImage'>> = {
  'ilhas-do-alfabeto': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'wallaces-quest': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Independent Gameplay Engineer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Platform', value: 'WebGL prototype' }] },
  'read-with-ello': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Unity Software Engineer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Company', value: 'Ello' }] },
  'craque-da-fluencia': { archivePresentation: 'standard', specs: [{ label: 'Role', value: 'Senior Unity Game Developer' }, { label: 'Engine', value: 'Unity / C#' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  pathless: {
    archivePresentation: 'rich',
    identityImage: '/projects/pathless/pathless-poster.png',
    specs: [{ label: 'Role', value: 'Unity Gameplay Programmer' }, { label: 'Context', value: 'Brackeys Game Jam 2026.2' }, { label: 'Period', value: 'Aug 23–30, 2026' }, { label: 'Team', value: '3 people' }, { label: 'Platform', value: 'WebGL' }, { label: 'Stack', value: 'Unity 6 · C# · URP · UI Toolkit · Input System · Cinemachine' }],
    media: [{ type: 'image', src: '/projects/pathless/pathless-poster.png', previewSrc: '/projects/pathless/pathless-gameplay-preview.gif', autoplayPreview: true, alt: 'Pathless gameplay poster showing a helicopter above a rescue-game landscape.' }],
  },
  flui: { archivePresentation: 'standard', specs: [{ label: 'Engine', value: 'Unity' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'tabuada-na-fazenda': { archivePresentation: 'standard', specs: [{ label: 'Engine', value: 'Unity' }, { label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'sweets-and-shadows': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Mini Jam 144 · 72 hours' }, { label: 'Engine', value: 'Unity' }, { label: 'Team', value: '2 people' }] },
  'radwasteland-echoes': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Ludum Dare 55 · solo jam' }, { label: 'Engine', value: 'Unity' }] },
  'angry-world': { archivePresentation: 'standard', specs: [{ label: 'Context', value: 'Ludum Dare 38 · solo jam' }, { label: 'Engine', value: 'Unity' }] },
  'survive-and-escape': { archivePresentation: 'compact', specs: [{ label: 'Tools', value: 'C++ / raylib' }, { label: 'Platform', value: 'Windows' }] },
  'craque-da-leitura': { archivePresentation: 'compact', specs: [{ label: 'Company', value: 'Instituto Alfa e Beto' }] },
  'learn-with-ello': { archivePresentation: 'compact', specs: [{ label: 'Company', value: 'Ello' }] },
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
    caseStudySlug: project.caseStudy ? project.slug : undefined,
  })),
  ...otherWork,
  ...publicArchiveEntries,
].map((project) => ({ ...project, ...archiveDetails[project.id] }));

export const projectInventoryGroups = [
  { id: 'professional-game', eyebrow: '01 / UNITY & GAMES', title: 'Professional games & Unity products', intro: 'Commercial game development and interactive Unity products built in professional teams.', order: ['ilhas-do-alfabeto', 'read-with-ello', 'craque-da-fluencia', 'flui', 'tabuada-na-fazenda', 'craque-da-leitura', 'avaliacao-lingua-portuguesa', 'learn-with-ello'] },
  { id: 'professional-product', eyebrow: '02 / SOFTWARE', title: 'Software & interactive products', intro: 'Professional assessment, learning and operational software beyond the game portfolio.', order: ['avaliacao-diagnostica', 'iab-testes', 'iab-digital-zero-a-quatro', 'mypush', 'morada-verde-inventory-flow'] },
  { id: 'independent-game', eyebrow: '03 / INDEPENDENT', title: 'Independent & collaborative games', intro: 'Playable prototypes and jam work, including solo and team projects.', order: ['wallaces-quest', 'pathless', 'sweets-and-shadows', 'radwasteland-echoes', 'angry-world'] },
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
