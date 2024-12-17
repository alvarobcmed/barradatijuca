import { db } from '../../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      );
    }

    // Add to newsletter collection
    await addDoc(collection(db, 'newsletter_subscribers'), {
      email,
      subscribed_at: new Date().toISOString(),
      status: 'active'
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' }}
    );
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}