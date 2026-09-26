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
  },
];

export const moreProfessional = [
  { id: 'tabuada-na-fazenda', anchorId: 'work-tabuada', name: 'Tabuada na Fazenda', period: '2020–2022', type: 'Commercial Unity game', context: 'Instituto Alfa e Beto · professional product work', product: 'A commercial Unity math game set around an interactive farm and themed learning activities.', contribution: 'Contributed to minigames, tutorials, farm interactions, and progression systems as the product evolved.', mediaLabel: 'GAMEPLAY MEDIA — TABUADA', href: 'https://loja.alfaebeto.org.br/produto/tabuada-na-fazenda.html' },
  { id: 'craque-da-leitura', anchorId: 'work-craque-leitura', name: 'Craque da Leitura', period: '2017–2022', type: 'Interactive reading product', context: 'Instituto Alfa e Beto · professional product work', detail: 'Interactive reading product with book content, catalog, and guided reading flows.', mediaLabel: 'READING PRODUCT MEDIA — CRAQUE DA LEITURA', href: 'https://loja.alfaebeto.org.br/produto/craque-da-leitura.html' },
  { id: 'flui', anchorId: 'work-flui', name: 'Flui — A Cidade das Palavras', period: '2017–2021', type: 'Commercial Unity game', context: 'Instituto Alfa e Beto · professional product work', product: 'A commercial Unity game that teaches literacy through exploration, character progression, and interactive minigames.', contribution: 'Worked across gameplay systems and minigame implementation, supporting the game’s ongoing production and maintenance.', mediaLabel: 'GAMEPLAY / PRODUCT MEDIA — FLUI', href: 'https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html' },
];

// Public Other Work set for Stage 11A.4. Project-specific LinkedIn detail URLs
// were not verified, so only direct official/play destinations are exposed.
export const otherWork = [
  {
    id: 'pathless', name: 'Pathless', period: '2026', type: 'Brackeys Game Jam 2026.2 · Unity 6 · WebGL',
    detail: 'A third-person rescue game made in one week and released as a playable WebGL build.', contribution: 'Contributed to implementation and integration within a three-person team under the one-week jam constraint.', context: 'Three-person team', mediaLabel: 'RESCUE GAMEPLAY — PATHLESS', showOnHome: true, homeOrder: 1,
    actions: [{ href: 'https://phillipeaam.itch.io/pathless', label: 'Play on itch.io' }], kind: 'pathless',
  },
  {
    id: 'sweets-and-shadows', name: 'Sweets and Shadows', period: '2023-10', type: 'Unity game jam collaboration',
    detail: 'A 72-hour action game made with a teammate for Mini Jam 144.', context: 'Development and design · witch-boss encounter', mediaLabel: 'ACTION GAMEPLAY — SWEETS AND SHADOWS',
    actions: [{ href: 'https://phillipeaam.itch.io/sweets-and-shadows', label: 'Play on itch.io' }], kind: 'neutral',
  },
  { ...moreProfessional[0], showOnHome: true, homeOrder: 3, actions: [{ href: moreProfessional[0].href, label: 'Official product' }], kind: 'neutral' },
  { ...moreProfessional[1], actions: [
    { href: moreProfessional[1].href, label: 'Official product' },
    { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1497806737/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
  ], kind: 'neutral' },
  { ...moreProfessional[2], showOnHome: true, homeOrder: 2, actions: [
    { href: moreProfessional[2].href, label: 'Official product' },
    { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1945254108/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
  ], kind: 'neutral' },
  {
    id: 'learn-with-ello', anchorId: 'work-learn-with-ello', name: 'Ello 2.0: Learn Reading & Math', type: 'Learning platform · product continuation',
    detail: 'A later Ello learning-platform continuation, extending its reading experience into early math and adaptive learning.',
    mediaLabel: 'PRODUCT MEDIA — LEARN WITH ELLO',
    actions: [{ href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1354869267/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' }], kind: 'ello',
  },
  {
    id: 'avaliacao-diagnostica', period: 'Undated', type: 'Digital school-assessment platform', name: 'Avaliação Diagnóstica',
    detail: 'A school assessment platform with Portuguese and math workflows, offline use, synchronization, and reporting.', context: 'Instituto Alfa e Beto · professional product', mediaLabel: 'ASSESSMENT PLATFORM — AVALIAÇÃO DIAGNÓSTICA',
    anchorId: 'work-avaliacao-diagnostica', actions: [
      { href: 'https://alfaebeto.org.br/conheca-a-alfa-e-beto-avaliacao/', label: 'Official product overview' },
      { href: 'https://www.linkedin.com/in/phillipe-augusto/overlay/Project/1520869873/treasury/?profileId=ACoAABO7wFYBwnIpel5jQcE2E9VunU61oL6o7LA', label: 'LinkedIn details' },
    ], kind: 'neutral',
  },
  {
    id: 'avaliacao-lingua-portuguesa', name: 'Avaliação da Língua Portuguesa', period: 'Undated', type: 'Unity interactive assessment',
    detail: 'Interactive Portuguese-language assessment activities for literacy learning.', context: 'Instituto Alfa e Beto · professional Unity product work', mediaLabel: 'UNITY ASSESSMENT — LÍNGUA PORTUGUESA', kind: 'neutral', anchorId: 'work-avaliacao-lingua-portuguesa',
  },
  {
    id: 'iab-digital-zero-a-quatro', name: 'Zero a Quatro', period: 'Undated', type: 'Early-childhood education platform',
    detail: 'A digital learning platform connecting classroom activities and school workflows.', context: 'Cedro Technologies · professional product context', mediaLabel: 'EDUCATION PLATFORM — IAB DIGITAL', kind: 'neutral', anchorId: 'work-iab-digital',
  },
  {
    id: 'iab-testes', name: 'IAB Testes', period: 'Undated', type: 'Tablet assessment platform',
    detail: 'A tablet-based digital assessment product for school literacy workflows.', context: 'Cedro Technologies · professional product context', mediaLabel: 'TABLET ASSESSMENT — IAB TESTES', kind: 'neutral', anchorId: 'work-iab-testes',
  },
  {
    id: 'mypush', name: 'MyPush', period: 'Undated', type: 'B2B mobile product',
    detail: 'Professional mobile software work involving client applications and service integrations.', context: 'Earlier professional software experience', mediaLabel: 'MOBILE PRODUCT — MYPUSH', kind: 'neutral', anchorId: 'work-mypush',
  },
  {
    id: 'morada-verde-inventory-flow', name: 'MVIF - Morada Verde Inventory Flow', period: 'Undated', type: 'Client operational software',
    detail: 'An inventory and business-workflow product from earlier professional software work.', context: 'Earlier client software product', mediaLabel: 'CLIENT WORKFLOW — MORADA VERDE', kind: 'neutral', anchorId: 'work-morada-verde',
  },
];

export const homeSupportingProjects = otherWork
  .filter((project) => project.showOnHome)
  .sort((a, b) => (a.homeOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeOrder ?? Number.MAX_SAFE_INTEGER));

export function resolveExperienceWork(projectId: string) {
  const caseProject = featuredProjects.find((project) => project.slug === projectId);
  if (caseProject) return { name: caseProject.name, href: `/work/${caseProject.slug}/` };

  const project = otherWork.find((entry) => entry.id === projectId);
  if (project && 'anchorId' in project && project.anchorId) {
    return { name: project.name, href: `/#${project.anchorId}` };
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

export const supportingWork = [
  { name: 'RepoDNA', context: 'Repository analysis tool · software engineering' },
  { name: 'Survive & Escape', context: 'Independent game · C++ and raylib' },
];
