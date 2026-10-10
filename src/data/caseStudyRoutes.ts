/** Canonical case path; home /#featured remains a separate section destination. */
export function caseStudyPath(slug: string, baseUrl = '/'): string {
  const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${basePath}featured/${slug}/`;
}
