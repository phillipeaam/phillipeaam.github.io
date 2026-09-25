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

export const pathless: Project = {
  slug: 'pathless',
  name: 'Pathless',
  context: 'Brackeys Game Jam 2026.2 · Team of 3',
  kind: 'pathless',
  product: 'A playable Unity 6 rescue game built in one week and released for WebGL.',
  contribution: 'Search for survivors, manage supplies, and reach the evacuation point.',
  tags: ['Unity 6', 'WebGL'],
  evidenceLabel: 'Pathless · rescue gameplay',
};

export const moreProfessional = [
  { id: 'tabuada-na-fazenda', name: 'Tabuada na Fazenda', period: '2020–2022', type: 'Commercial Unity game', context: 'Instituto Alfa e Beto · professional product work', detail: 'Contributed to gameplay minigames and ongoing production support for a farm-themed math game.', tags: ['Unity', 'Minigames', 'Math game'], mediaLabel: 'GAMEPLAY MEDIA — TABUADA', href: 'https://loja.alfaebeto.org.br/produto/tabuada-na-fazenda.html' },
  { id: 'craque-da-leitura', name: 'Craque da Leitura', period: '2017–2022', type: 'Interactive reading product', context: 'Instituto Alfa e Beto · professional product work', detail: 'Interactive reading product with book content, catalog, and guided reading flows.', tags: ['Reading', 'Catalog', 'Interactive product'], mediaLabel: 'READING PRODUCT MEDIA — CRAQUE DA LEITURA', href: 'https://loja.alfaebeto.org.br/produto/craque-da-leitura.html' },
  { id: 'flui', name: 'Flui — A Cidade das Palavras', period: '2017–2021', type: 'Commercial literacy game', context: 'Instituto Alfa e Beto · professional product work', detail: 'Contributed to gameplay minigames and ongoing maintenance of a literacy game.', tags: ['Unity', 'Minigames', 'Progression'], mediaLabel: 'GAMEPLAY / PRODUCT MEDIA — FLUI', href: 'https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html' },
];

// Keep the current project first, then date-bearing projects newest first.
// Other undated entries follow in a chronology-unknown group, without UI dates.
export const otherWork = [
  {
    id: 'heroes-secrets', name: 'Heroes’ Secrets', period: 'Current / ongoing', type: 'Independent team autobattler',
    detail: 'An in-development autobattler exploring combat systems, abilities, equipment, and AI.', context: 'Independent · current team project', tags: ['Unity', 'Autobattler', 'In development'], mediaLabel: 'GAMEPLAY PROXY — HEROES’ SECRETS', kind: 'neutral',
  },
  {
    id: 'pathless', name: pathless.name, period: '2026-08', type: 'Game jam · Unity 6 · WebGL',
    detail: 'A playable third-person rescue game built in one week for Brackeys Game Jam 2026.2.', context: 'Team of 3 · survivor rescue, limited supplies, and changing routes', tags: ['Unity 6', 'WebGL', 'Game Jam'], mediaLabel: 'RESCUE GAMEPLAY — PATHLESS',
    href: 'https://phillipeaam.itch.io/pathless', linkLabel: 'Play on itch.io', kind: pathless.kind,
  },
  {
    id: 'radwasteland-echoes', name: 'RadWasteland — Echoes', period: '2024-04', type: 'Solo Unity strategy / RPG jam game',
    detail: 'A Ludum Dare 55 game about summoning creatures in a post-apocalyptic wasteland.', context: 'Independent · browser game', tags: ['Unity', 'Strategy', 'Ludum Dare'], mediaLabel: 'STRATEGY GAMEPLAY — RADWASTELAND',
    href: 'https://phillipeaam.itch.io/radwasteland-echoes', linkLabel: 'View project page', kind: 'neutral',
  },
  {
    id: 'sweets-and-shadows', name: 'Sweets and Shadows', period: '2023-10', type: 'Unity game jam collaboration',
    detail: 'A 72-hour action game made with a teammate for Mini Jam 144.', context: 'Development and design · witch-boss encounter', tags: ['Unity', 'Game Jam', 'Team project'], mediaLabel: 'ACTION GAMEPLAY — SWEETS AND SHADOWS',
    href: 'https://phillipeaam.itch.io/sweets-and-shadows', linkLabel: 'Play on itch.io', kind: 'neutral',
  },
  { ...moreProfessional[0], linkLabel: 'Official product page', kind: 'neutral' },
  { ...moreProfessional[1], linkLabel: 'Official product page', kind: 'neutral' },
  { ...moreProfessional[2], linkLabel: 'Official product page', kind: 'neutral' },
  {
    id: 'angry-world', name: 'Angry World', period: '2017-04', type: 'Ludum Dare 38 game',
    detail: 'A short space action game about protecting planets and collecting crystals.', context: 'Independent · released for browser', tags: ['Unity', 'Action', 'Ludum Dare'], mediaLabel: 'SPACE GAMEPLAY — ANGRY WORLD',
    href: 'https://phillipeaam.itch.io/angry-world', linkLabel: 'Play on itch.io', kind: 'neutral',
  },
  {
    id: 'avaliacao-diagnostica', name: 'Avaliação Diagnóstica', period: 'Undated', type: 'Digital school-assessment platform',
    detail: 'A school assessment platform with Portuguese and math workflows, offline use, synchronization, and reporting.', context: 'Instituto Alfa e Beto · professional product', tags: ['Assessment', 'Offline', 'Reporting'], mediaLabel: 'ASSESSMENT PLATFORM — AVALIAÇÃO DIAGNÓSTICA',
    href: 'https://alfaebeto.org.br/conheca-a-alfa-e-beto-avaliacao/', linkLabel: 'Official product overview', kind: 'neutral',
  },
  {
    id: 'avaliacao-lingua-portuguesa', name: 'Avaliação da Língua Portuguesa', period: 'Undated', type: 'Unity interactive assessment',
    detail: 'Interactive Portuguese-language assessment activities for literacy learning.', context: 'Instituto Alfa e Beto · professional Unity product work', tags: ['Unity', 'Assessment', 'Interactive'], mediaLabel: 'UNITY ASSESSMENT — LÍNGUA PORTUGUESA', kind: 'neutral',
  },
  {
    id: 'iab-digital-zero-a-quatro', name: 'IAB Digital: Zero a Quatro na Palma da Mão', period: 'Undated', type: 'Early-childhood education platform',
    detail: 'A digital learning platform connecting classroom activities and school workflows.', context: 'Cedro Technologies · professional product context', tags: ['Education platform', 'Mobile', 'Digital learning'], mediaLabel: 'EDUCATION PLATFORM — IAB DIGITAL', kind: 'neutral',
  },
  {
    id: 'iab-testes', name: 'IAB Testes', period: 'Undated', type: 'Tablet assessment platform',
    detail: 'A tablet-based digital assessment product for school literacy workflows.', context: 'Cedro Technologies · professional product context', tags: ['Assessment', 'Tablet', 'Education'], mediaLabel: 'TABLET ASSESSMENT — IAB TESTES', kind: 'neutral',
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
  {
    id: 'mypush', name: 'MyPush', period: 'Undated', type: 'B2B mobile product',
    detail: 'Professional mobile software work involving client applications and service integrations.', context: 'Earlier professional software experience', tags: ['Mobile', 'APIs', 'B2B'], mediaLabel: 'MOBILE PRODUCT — MYPUSH', kind: 'neutral',
  },
  {
    id: 'morada-verde-inventory-flow', name: 'Morada Verde Inventory Flow', period: 'Undated', type: 'Client operational software',
    detail: 'An inventory and business-workflow product from earlier professional software work.', context: 'Earlier client software product', tags: ['Client software', 'Inventory', 'Workflow'], mediaLabel: 'CLIENT WORKFLOW — MORADA VERDE', kind: 'neutral',
  },
];

export const supportingWork = [
  { name: 'RepoDNA', context: 'Repository analysis tool · software engineering' },
  { name: 'Survive & Escape', context: 'Independent game · C++ and raylib' },
];
