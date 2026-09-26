export interface Testimonial {
  name: string;
  relationship: string;
  role?: string;
  company?: string;
  quote: string;
  quoteLanguage: 'en' | 'pt-BR';
  profileUrl: string;
  recommendationUrl?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  initials: string;
  signal: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'João Borges',
    relationship: 'Unity engineering teammate',
    role: 'Senior Software Engineer',
    company: 'Ello',
    quote: 'His care for detail, thorough support and feedbacks certainly inspired me to be a better engineer and to put more effort into clearer code structure…',
    quoteLanguage: 'en',
    profileUrl: 'https://www.linkedin.com/in/thatjoaoguy/',
    avatarSrc: '/images/testimonials/joao-borges.jpeg',
    avatarAlt: '',
    initials: 'JB',
    signal: 'Engineering quality, architecture, collaboration and support',
  },
  {
    name: 'Pedro Sérgio Palmieri de Almeida',
    relationship: 'Game-development teammate',
    role: 'Senior Software Engineer — Fullstack',
    company: 'Instituto Alfa e Beto',
    quote: '… talentoso e criativo no desenvolvimento de jogos. Sua habilidade em criar experiências educativas envolventes, utilizando principalmente Unity e C#.',
    quoteLanguage: 'pt-BR',
    profileUrl: 'https://www.linkedin.com/in/pedro-s%C3%A9rgio-palmieri-de-almeida-967b7514a/',
    avatarSrc: '/images/testimonials/pedro-sergio-palmieri-de-almeida.jpeg',
    avatarAlt: '',
    initials: 'PA',
    signal: 'Unity, game development, collaboration and craft',
  },
  {
    name: 'Douglas Otoni',
    relationship: 'Former manager · Tech Lead',
    role: 'Technical Lead · Full-stack Programmer',
    company: 'Instituto Alfa e Beto',
    quote: 'He is a very productive and multi-skilled person with vast knowledge and experience in software development with Unity.',
    quoteLanguage: 'en',
    profileUrl: 'https://www.linkedin.com/in/douglasotoni/',
    avatarSrc: '/images/testimonials/douglas-otoni.jpeg',
    avatarAlt: '',
    initials: 'DO',
    signal: 'Unity product engineering, leadership context and teamwork',
  },
  {
    name: 'Diego Culuxi',
    relationship: 'Former manager',
    role: 'Technology Consultant · Project Manager',
    quote: 'Phillipe é um profissional altamente responsável, sempre atento aos prazos e entregando resultados de qualidade. Sua atitude proativa é exemplo para todos na equipe.',
    quoteLanguage: 'pt-BR',
    profileUrl: 'https://www.linkedin.com/in/diegoculuxi/',
    avatarSrc: '/images/testimonials/diego-culuxi.jpeg',
    avatarAlt: '',
    initials: 'DC',
    signal: 'Reliability, delivery, collaboration and adaptability',
  },
  {
    name: 'Marllon Vilano',
    relationship: 'Unity engineering teammate',
    role: 'Staff / Lead Unity Engineer',
    quote: 'Phillipe Augusto is a very dedicated developer. … I am proof of his skills with Unity Game Engine, Native Android and Database development.',
    quoteLanguage: 'en',
    profileUrl: 'https://www.linkedin.com/in/sandolkakos/',
    avatarSrc: '/images/testimonials/marllon-vilano.jpeg',
    avatarAlt: '',
    initials: 'MV',
    signal: 'Unity/game engineering and cross-discipline technical breadth',
  },
  {
    name: 'Felipe Augusto Cardoso',
    relationship: 'Former internship mentor / manager',
    role: 'Technology Executive · CTO',
    quote: 'Com pouco tempo de orientação já pude indica-lo para assumir sozinho uma demanda de desenvolvimento Android, que o fez com grande louvor.',
    quoteLanguage: 'pt-BR',
    profileUrl: 'https://www.linkedin.com/in/facardoso/',
    avatarSrc: '/images/testimonials/felipe-augusto-cardoso.jpeg',
    avatarAlt: '',
    initials: 'FC',
    signal: 'Mentoring, learning, adaptability and growing ownership',
  },
];

export const recommendationsUrl = 'https://www.linkedin.com/in/phillipe-augusto/details/recommendations/';
