import { createHash } from 'crypto';

export function generateLicenseKey(userId: string, domain: string): string {
  const timestamp = Date.now();
  const seed = `${userId}-${domain}-${timestamp}`;
  const hash = createHash('sha256').update(seed).digest('hex');
  
  // Format: XXXX-XXXX-XXXX-XXXX
  return hash.slice(0, 16).match(/.{4}/g)?.join('-') || '';
}

export function validateLicenseKey(key: string, domain: string): boolean {
  // Basic format validation
  const keyFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  if (!keyFormat.test(key)) return false;

  // Domain validation
  const allowedDomains = getAllowedDomains(key);
  return allowedDomains.some(d => domain.endsWith(d));
}

export function getAllowedDomains(key: string): string[] {
  // In a real implementation, this would query the database
  // For now, return an empty array
  return [];
}