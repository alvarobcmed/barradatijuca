import { validateLicenseKey } from '../../services/license/generator';
import { validateDomain } from '../../services/license/validator';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { licenseId, domain } = await req.json();

    // Get license details from database
    const license = await getLicenseDetails(licenseId);
    if (!license) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid license' }),
        { status: 200, headers: { 'Content-Type': 'application/json' }}
      );
    }

    // Validate license key and domain
    const isValidLicense = validateLicenseKey(license.key, domain);
    const isValidDomain = validateDomain(domain, license.allowedDomains);

    return new Response(
      JSON.stringify({ 
        valid: isValidLicense && isValidDomain,
        error: !isValidLicense ? 'Invalid license' : !isValidDomain ? 'Invalid domain' : null
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' }}
    );
  } catch (err) {
    console.error('License validation error:', err);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}

async function getLicenseDetails(licenseId: string) {
  // TODO: Implement database query
  return null;
}