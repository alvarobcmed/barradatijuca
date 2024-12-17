import { handleWebhook } from '../../../services/stripe/webhook';

export const config = {
  api: {
    bodyParser: false // Necessário para verificar a assinatura do Stripe
  }
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    return await handleWebhook(req);
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}