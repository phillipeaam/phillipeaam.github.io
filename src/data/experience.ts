export type Experience = {
  role: string;
  organization: string;
  companyUrl: string;
  companyMark: string;
  companyLogo?: string;
  dates: string;
  context: string;
  highlights: string[];
  selectedWork: { projectId: string; label?: string }[];
};

export const experience: Experience[] = [
  {
    role: 'Unity Software Engineer', organization: 'Ello', companyUrl: 'https://www.linkedin.com/company/elloinc', companyMark: 'E', companyLogo: '/images/companies/ello.jpeg', dates: 'Oct 2022 — Dec 2025',
    context: 'Unity engineering for a commercial reading product, spanning game-inspired progression, client systems, service integration, and iOS production work.',
    highlights: [
      'Helped implement quest flows, objectives, and reward presentation for the reading experience.',
      'Worked on book-library UI and loading paths; adapted GraphQL client tooling for Unity features.',
    ],
    selectedWork: [
      { projectId: 'read-with-ello' },
      { projectId: 'learn-with-ello', label: 'Ello 2.0' },
    ],
  },
  {
    role: 'Senior Unity Game Developer', organization: 'Instituto Alfa e Beto', companyUrl: 'https://br.linkedin.com/company/instituto-alfa-e-beto', companyMark: 'IAB', companyLogo: '/images/companies/instituto-alfa-e-beto.jpeg', dates: 'Aug 2017 — Oct 2022',
    context: 'Sustained commercial Unity game development across multi-minigame products, with technical coordination and developer-support responsibilities.',
    highlights: [
      'Implemented and maintained gameplay across multiple minigames and shared activity systems.',
      'Adapted Craque da Fluência assessment flows for speech-recognition integration.',
    ],
    selectedWork: [
      { projectId: 'ilhas-do-alfabeto' },
      { projectId: 'flui', label: 'Flui' },
      { projectId: 'craque-da-fluencia' },
      { projectId: 'craque-da-leitura' },
      { projectId: 'avaliacao-diagnostica' },
      { projectId: 'tabuada-na-fazenda' },
      { projectId: 'avaliacao-lingua-portuguesa' },
    ],
  },
  {
    role: 'Mobile Analyst Developer', organization: 'Cedro Technologies', companyUrl: 'https://www.linkedin.com/company/cedro-technologies/', companyMark: 'C', companyLogo: '/images/companies/cedro-technologies.jpeg', dates: 'Jun 2015 — Aug 2017',
    context: 'Mobile application engineering across client-side flows, business logic, REST integrations, and data-access layers.',
    highlights: [
      'Developed client-side UI flows and business logic for mobile applications.',
      'Integrated client features with REST APIs and data-access layers.',
    ],
    selectedWork: [
      { projectId: 'iab-testes' },
      { projectId: 'iab-digital-zero-a-quatro', label: 'Zero a Quatro' },
      { projectId: 'morada-verde-inventory-flow', label: 'MVIF' },
      { projectId: 'mypush' },
    ],
  },
];
