export function validateDomain(domain: string, allowedDomains: string[]): boolean {
  if (!domain) return false;
  
  // Remove protocol and www
  const normalizedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Check if domain matches any allowed domains
  return allowedDomains.some(allowed => {
    const normalizedAllowed = allowed.replace(/^(https?:\/\/)?(www\.)?/, '');
    return normalizedDomain === normalizedAllowed || normalizedDomain.endsWith(`.${normalizedAllowed}`);
  });
}

export function extractDomainFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url.startsWith('http') ? url : `https://${url}`);
    return hostname;
  } catch {
    return '';
  }
}