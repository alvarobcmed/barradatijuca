import { stripePromise, STRIPE_PRICES } from '../../config/stripe';

const API_URL = import.meta.env.VITE_API_URL;

export async function createCheckoutSession(
  priceType: keyof typeof STRIPE_PRICES, 
  userId?: string,
  customerEmail?: string
) {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe não inicializado');
    }

    if (!customerEmail) {
      throw new Error('Email do usuário não encontrado');
    }

    const response = await fetch(`/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Customer-Email': customerEmail,
      },
      body: JSON.stringify({
        priceId: STRIPE_PRICES[priceType].priceId,
        userId,
        trial_days: STRIPE_PRICES[priceType].trial_days,
        customerEmail
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar sessão de checkout');
    }

    const { sessionId } = await response.json();
    
    const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
    if (stripeError) {
      throw stripeError;
    }

    return { error: null };
  } catch (err) {
    console.error('Erro no checkout:', err);
    return { 
      error: err instanceof Error ? err.message : 'Erro ao iniciar checkout'
    };
  }
}