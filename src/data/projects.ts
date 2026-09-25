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
  { id: 'tabuada-na-fazenda', name: 'Tabuada na Fazenda', period: '2020–2022', type: 'Unity · Commercial math game', context: 'Professional game development', detail: 'Contributed to minigames, progression, and production support.', mediaLabel: 'GAMEPLAY MEDIA — TABUADA', href: 'https://loja.alfaebeto.org.br/produto/tabuada-na-fazenda.html' },
  { id: 'craque-da-leitura', name: 'Craque da Leitura', period: '2017–2022', type: 'Unity · Interactive reading product', context: 'Professional product work', detail: 'Worked on book content, catalog, and reading flows.', mediaLabel: 'READING PRODUCT MEDIA — CRAQUE DA LEITURA', href: 'https://loja.alfaebeto.org.br/produto/craque-da-leitura.html' },
  { id: 'flui', name: 'Flui — A Cidade das Palavras', period: '2017–2021', type: 'Unity · Commercial literacy game', context: 'Long-lived professional game development', detail: 'Contributed to minigames, progression, and ongoing gameplay maintenance.', mediaLabel: 'GAMEPLAY / PRODUCT MEDIA — FLUI', href: 'https://loja.alfaebeto.org.br/produto/flui-a-cidade-das-palavras.html' },
];

export const otherWork = [
  {
    id: 'pathless', name: pathless.name, period: '2026', type: 'Independent · Unity 6 · WebGL',
    detail: pathless.product, context: pathless.contribution, mediaLabel: 'RESCUE GAMEPLAY — PATHLESS',
    href: 'https://phillipeaam.itch.io/pathless', linkLabel: 'Play Pathless', kind: pathless.kind, highlight: true,
  },
  ...moreProfessional.map((item) => ({ ...item, linkLabel: 'Official product page' })),
];

export const supportingWork = [
  { name: 'RepoDNA', context: 'Repository analysis tool · software engineering' },
  { name: 'Survive & Escape', context: 'Independent game · C++ and raylib' },
];
