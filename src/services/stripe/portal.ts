import { Stripe } from 'stripe';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16',
});

// Configure portal settings once
export async function configurePortalSettings() {
  try {
    const configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Stry Live - Gerenciamento de Assinatura',
        privacy_policy_url: 'https://stry.live/privacy',
        terms_of_service_url: 'https://stry.live/terms'
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price'],
          products: [
            {
              product: 'prod_RPW8DnxWuZGjWi', // Monthly plan
              prices: ['price_1QWh6OBQdvoI5uL01feOzBtS']
            },
            {
              product: 'prod_RPW9Lbe6lO416M', // Annual plan
              prices: ['price_1QWh7BBQdvoI5uL0PQTSw4fy']
            }
          ]
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          proration_behavior: 'none',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features', 
              'switched_service',
              'unused',
              'other'
            ]
          }
        },
        customer_update: {
          enabled: true,
          allowed_updates: ['email', 'address', 'tax_id'],
        },
        invoice_history: { enabled: true },
        payment_method_update: { enabled: true }
      }
    });

    return configuration;
  } catch (error) {
    console.error('Error configuring portal:', error);
    throw error;
  }
}
export async function createPortalSession(customerId: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://stry.live/admin',
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}