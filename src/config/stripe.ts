import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const STRIPE_PRICES = {
  MONTHLY: {
    productId: 'prod_RPW8DnxWuZGjWi',
    priceId: 'price_1QWh6OBQdvoI5uL01feOzBtS',
    amount: 7990, // R$ 79,90
    name: 'Assinatura Mensal',
    features: [
      'Stories Ilimitados',
      'Analytics Avançado',
      'Suporte Premium',
      'Personalização Total',
      'Integração com GTM'
    ],
    trial_days: 7
  },
  YEARLY: {
    productId: 'prod_RPW9Lbe6lO416M',
    priceId: 'price_1QWh7BBQdvoI5uL0PQTSw4fy',
    amount: 76500, // R$ 765,00
    name: 'Assinatura Anual',
    features: [
      'Stories Ilimitados',
      'Analytics Avançado',
      'Suporte Premium',
      'Personalização Total',
      'Integração com GTM',
      'Economia de 20%'
    ],
    trial_days: 14
  }
} as const;