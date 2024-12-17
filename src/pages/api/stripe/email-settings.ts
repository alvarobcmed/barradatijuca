import { configureEmailSettings, verifyEmailDomain } from '../../../services/stripe/email';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { action } = await req.json();

    switch (action) {
      case 'configure':
        await configureEmailSettings();
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' }}
        );

      case 'verify':
        const { verificationUrl } = await verifyEmailDomain();
        return new Response(
          JSON.stringify({ success: true, verificationUrl }),
          { status: 200, headers: { 'Content-Type': 'application/json' }}
        );

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' }}
        );
    }
  } catch (error) {
    console.error('Email settings error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}