export type ProjectCategory = 'professional-game' | 'professional-product' | 'independent-game' | 'study-archive';

export type ProjectMedia = {
  type: 'image' | 'gif' | 'video' | 'youtube';
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
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
    id: 'pathless', name: 'Pathless', period: '2026', type: 'Brackeys Game Jam 2026.2 · Unity 6 · WebGL', archiveCategory: 'independent-game',
    product: 'A third-person rescue game made in one week and released as a playable WebGL build.', contribution: 'Contributed to implementation and integration within a three-person team under the one-week jam constraint.', context: 'Three-person team', mediaLabel: 'RESCUE GAMEPLAY — PATHLESS', showOnHome: true, homeOrder: 1, kind: 'pathless',
    actions: [{ href: 'https://phillipeaam.itch.io/pathless', label: 'Play on itch.io' }],
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
    actions: [{ href: 'https://loja.alfaebeto.org.br/produto/craque-da-leitura.html', label: 'Official product' }],
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
    id: 'iab-digital-zero-a-quatro', anchorId: 'work-iab-digital', name: 'Zero a Quatro', period: 'Undated', type: 'Early-childhood education platform', archiveCategory: 'professional-product',
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
  context?: string;
  caseStudySlug?: string;
  actions?: ProjectAction[];
  media?: ProjectMedia[];
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
];

export const projectInventoryGroups = [
  { id: 'professional-game', eyebrow: 'PROFESSIONAL / UNITY', title: 'Professional Game / Unity Work' },
  { id: 'professional-product', eyebrow: 'PROFESSIONAL / SOFTWARE', title: 'Professional Product / Software Work' },
  { id: 'independent-game', eyebrow: 'INDEPENDENT / COLLABORATIVE', title: 'Independent & Collaborative Games' },
  { id: 'study-archive', eyebrow: 'EXPERIMENTS / STUDY', title: 'Experiments / Study / Archive' },
].map((group) => ({
  ...group,
  projects: projectInventory.filter((project) => project.archiveCategory === group.id),
}));

export const supportingWork = [
  { name: 'RepoDNA', context: 'Repository analysis tool · software engineering' },
  { name: 'Survive & Escape', context: 'Independent game · C++ and raylib' },
];
