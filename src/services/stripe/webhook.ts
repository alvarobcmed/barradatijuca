import { Stripe } from 'stripe';
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { generateLicenseKey } from '../license/generator';
const stripe = new Stripe('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', {
  apiVersion: '2023-10-16',
});
const WEBHOOK_URL = 'https://api.stry.live/webhook';
const endpointSecret = 'whsec_AapbJ7xSBzjA1PgDAFySUpN6Zo2u002R';
const WEBHOOK_URL = 'https://api.stry.live/webhook';

export async function handleWebhook(req: Request) {
  const sig = req.headers.get('stripe-signature');

  if (!sig || !endpointSecret) {
    throw new Error('Missing stripe signature or endpoint secret');
  }

  let event: Stripe.Event;

  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log(`Webhook ${event.type} received at ${WEBHOOK_URL}`);
  } catch (err) {
    console.error('Webhook Error:', err);
    throw new Error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  // Handle the event
  let handled = false;

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulSubscription(session);
      handled = true;
      break;
      
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription plan changes
      if (subscription.items.data[0].price.id !== subscription.metadata.previous_price_id) {
        await handlePlanChange(subscription);
      }
      await handleSubscriptionUpdate(subscription);
      handled = true;
      break;
      
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancellation(deletedSubscription);
      handled = true;
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handleSuccessfulPayment(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(failedPayment);
      break;
  }

  if (!handled) {
    console.log('Unhandled webhook event type:', event.type);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleSuccessfulSubscription(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.client_reference_id) return;

  const userId = session.client_reference_id;
  const userRef = doc(db, 'users', userId);

  // Generate license key
  const licenseKey = generateLicenseKey();

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  await updateDoc(userRef, {
    'subscription': {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      priceId: subscription.items.data[0].price.id,
      customerId: session.customer
    },
    'license': {
      key: licenseKey,
      status: 'active',
      domains: [], // Will be configured in admin panel
      createdAt: Date.now(),
      expiresAt: subscription.current_period_end * 1000
    }
  });
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  // Implement payment success logic
  console.log('Payment succeeded:', paymentIntent.id);
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  // Implement payment failure logic
  console.log('Payment failed:', paymentIntent.id);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userRef = doc(db, 'users', subscription.metadata.userId);
  
  await updateDoc(userRef, {
    'subscription.status': subscription.status,
    'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
    'subscription.cancelAtPeriodEnd': subscription.cancel_at_period_end
  });
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const userRef = doc(db, 'users', subscription.metadata.userId);
  
  await updateDoc(userRef, {
    'subscription.status': 'canceled',
    'license.status': 'inactive'
  });
}

async function handlePlanChange(subscription: Stripe.Subscription) {
  const userRef = doc(db, 'users', subscription.metadata.userId);
  
  await updateDoc(userRef, {
    'subscription.priceId': subscription.items.data[0].price.id,
    'subscription.plan': subscription.items.data[0].price.id.includes('monthly') ? 'monthly' : 'yearly'
  });
}