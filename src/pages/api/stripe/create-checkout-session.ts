import { Stripe } from 'stripe';
import { STRIPE_PRICES } from '../../../config/stripe';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16'
});

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { priceId, userId, trial_days, customerEmail } = await req.json();

    // Validate price ID
    const validPriceIds = Object.values(STRIPE_PRICES).map(price => price.priceId);
    if (!validPriceIds.includes(priceId)) {
      throw new Error('ID do preço inválido');
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      subscription_data: {
        trial_period_days: trial_days,
        metadata: {
          userId
        }
      },
      success_url: `${req.headers.get('origin')}/admin?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      client_reference_id: userId,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      locale: 'pt-BR',
      metadata: {
        userId
      }
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Erro na sessão de checkout:', err);
    return new Response(
      JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Erro desconhecido',
        message: 'Erro ao iniciar checkout. Por favor, tente novamente.'
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}