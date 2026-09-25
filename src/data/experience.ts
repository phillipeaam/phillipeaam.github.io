export type Experience = {
  role: string;
  organization: string;
  dates: string;
  context: string;
  highlights: string[];
  related: { label: string; href?: string }[];
  icon: 'systems' | 'gamepad' | 'mobile';
};

export const experience: Experience[] = [
  {
    role: 'Unity Software Engineer', organization: 'Ello', dates: 'Oct 2022 — Dec 2025', icon: 'systems',
    context: 'Unity product engineering across progression and reward systems, reusable architecture, backend integration, mobile performance, and production delivery.',
    highlights: [
      'Worked on quest flows, objectives, and reward presentation.',
      'Worked on book-library UI and loading paths; adapted GraphQL client tooling.',
      'Contributed to frequent iOS releases, including preparation and submission tasks.',
    ],
    related: [{ label: 'Read With Ello', href: '/work/read-with-ello/' }, { label: 'Learn With Ello' }],
  },
  {
    role: 'Senior Unity Game Developer', organization: 'Instituto Alfa e Beto', dates: 'Aug 2017 — Oct 2022', icon: 'gamepad',
    context: 'Commercial Unity games and learning products, with technical coordination and developer-support responsibilities.',
    highlights: [
      'Designed and implemented substantial parts of Desafio dos Sons Iguais, while maintaining, improving, and supporting minigame systems across the wider product.',
      'Maintained shared gameplay behavior, activity flows, and production variants.',
      'Worked on assessment state and speech-recognition integration in Craque da Fluência.',
    ],
    related: [
      { label: 'Ilhas do Alfabeto', href: '/work/ilhas-do-alfabeto/' },
      { label: 'Craque da Fluência', href: '/work/craque-da-fluencia/' },
      { label: 'Flui', href: '/#flui' },
      { label: 'Craque da Leitura', href: '/#craque-da-leitura' },
      { label: 'Tabuada na Fazenda', href: '/#tabuada-na-fazenda' },
    ],
  },
  {
    role: 'Mobile Analyst Developer', organization: 'Cedro Technologies', dates: 'Jun 2015 — Aug 2017', icon: 'mobile',
    context: 'Mobile client-application development before moving into Unity game development.',
    highlights: [
      'Worked on mobile interface flows and client-side behavior.',
      'Integrated application screens with APIs and local persistence.',
    ],
    related: [],
  },
];
