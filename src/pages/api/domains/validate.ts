import { validateDomain } from '../../../services/license/validator';
import { db } from '../../../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { userId, domain } = await req.json();

    // Get user's license
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const { license } = userDoc.data();
    
    // Check if domain limit is reached
    if (license.domains.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Domain limit reached' }),
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      );
    }

    // Validate domain format
    if (!validateDomain(domain, [])) {
      return new Response(
        JSON.stringify({ error: 'Invalid domain format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      );
    }

    // Add domain to license
    await updateDoc(userRef, {
      'license.domains': arrayUnion(domain)
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' }}
    );
  } catch (err) {
    console.error('Domain validation error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}