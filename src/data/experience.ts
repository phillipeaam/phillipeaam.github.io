export type Experience = {
  role: string;
  organization: string;
  companyUrl: string;
  companyMark: string;
  companyLogo?: string;
  dates: string;
  context: string;
  highlights: string[];
  selectedWork: { label: string; href: string }[];
};

export const experience: Experience[] = [
  {
    role: 'Unity Software Engineer', organization: 'Ello', companyUrl: 'https://www.linkedin.com/company/elloinc', companyMark: 'E', dates: 'Oct 2022 — Dec 2025',
    context: 'Unity engineering for a commercial reading product, spanning game-inspired progression, client systems, service integration, and iOS production work.',
    highlights: [
      'Helped implement quest flows, objectives, and reward presentation for the reading experience.',
      'Worked on book-library UI and loading paths; adapted GraphQL client tooling for Unity features.',
      'Contributed to frequent iOS releases, including preparation and submission tasks.',
    ],
    selectedWork: [
      { label: 'Read With Ello', href: '/work/read-with-ello/' },
      { label: 'Learn With Ello', href: '/#work-learn-with-ello' },
    ],
  },
  {
    role: 'Senior Unity Game Developer', organization: 'Instituto Alfa e Beto', companyUrl: 'https://br.linkedin.com/company/instituto-alfa-e-beto', companyMark: 'IAB', dates: 'Aug 2017 — Oct 2022',
    context: 'Sustained commercial Unity game development across multi-minigame products, with technical coordination and developer-support responsibilities.',
    highlights: [
      'Contributed substantially to Desafio dos Sons Iguais, including gameplay flow and supporting systems.',
      'Implemented and maintained gameplay across multiple minigames and shared activity systems.',
      'Adapted Craque da Fluência assessment flows for speech-recognition integration.',
    ],
    selectedWork: [
      { label: 'Ilhas do Alfabeto', href: '/work/ilhas-do-alfabeto/' },
      { label: 'Craque da Fluência', href: '/work/craque-da-fluencia/' },
      { label: 'Avaliação da Língua Portuguesa', href: '/#work-avaliacao-lingua-portuguesa' },
      { label: 'Avaliação Diagnóstica', href: '/#work-avaliacao-diagnostica' },
      { label: 'Flui — A Cidade das Palavras', href: '/#work-flui' },
      { label: 'Craque da Leitura', href: '/#work-craque-leitura' },
      { label: 'Tabuada na Fazenda', href: '/#work-tabuada' },
    ],
  },
  {
    role: 'Mobile Analyst Developer', organization: 'Cedro Technologies', companyUrl: 'https://www.linkedin.com/company/cedro-technologies/', companyMark: 'C', dates: 'Jun 2015 — Aug 2017',
    context: 'Mobile application engineering across client-side flows, business logic, REST integrations, and data-access layers.',
    highlights: [
      'Developed client-side UI flows and business logic for mobile applications.',
      'Integrated client features with REST APIs and data-access layers.',
    ],
    selectedWork: [
      { label: 'IAB Testes', href: '/#work-iab-testes' },
      { label: 'MyPush', href: '/#work-mypush' },
      { label: 'MVIF', href: '/#work-morada-verde' },
      { label: 'Zero a Quatro', href: '/#work-iab-digital' },
    ],
  },
];
