// Canonical naming contract: docs/section-heading-standard.md.
export const homeSections = [
  { id: 'home', label: 'Home', legacyIds: ['top'] },
  { id: 'featured', label: 'Featured', legacyIds: ['case-studies', 'work'] },
  { id: 'projects', label: 'Projects', legacyIds: ['other-work'] },
  { id: 'teammates', label: 'Teammates', legacyIds: ['recommendations'] },
  { id: 'about', label: 'About', legacyIds: ['about-phillipe'] },
  { id: 'experience', label: 'Experience', legacyIds: [] },
  { id: 'contact', label: 'Contact', legacyIds: [] },
] as const;

export type HomeSectionId = typeof homeSections[number]['id'];
export const homeSection = (id: HomeSectionId) => homeSections.find((section) => section.id === id)!;
export const homeFragmentIds = homeSections.flatMap((section) => [section.id, ...section.legacyIds]);

const allIds = new Set<string>();
for (const id of homeFragmentIds) {
  if (allIds.has(id)) throw new Error(`Duplicate Home fragment: ${id}`);
  allIds.add(id);
}
