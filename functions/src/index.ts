import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe with latest API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20'
});

// Set custom claims for user roles
export const setCustomClaims = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { uid, role } = data;
  
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return { success: true };
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw new functions.https.HttpsError('internal', 'Error setting custom claims');
  }
});

// Create user profile on signup
export const createUserProfile = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).set({
      email: user.email,
      name: user.displayName,
      role: 'owner',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      subscription: null,
      license: null
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
});

// Handle Stripe webhook events
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    res.status(400).send('Missing stripe signature or endpoint secret');
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
    }

    res.json({ received: true });
  } catch (err) {
    const error = err as Error;
    console.error('Webhook Error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.client_reference_id) return;

  const userId = session.client_reference_id;
  const userRef = admin.firestore().collection('users').doc(userId);

  await userRef.update({
    'subscription.customerId': session.customer,
    'subscription.status': 'active',
    'subscription.plan': session.metadata?.plan || 'monthly'
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) return;

  const userRef = admin.firestore().collection('users').doc(userId);

  await userRef.update({
    'subscription.status': subscription.status,
    'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) return;

  const userRef = admin.firestore().collection('users').doc(userId);

  await userRef.update({
    'subscription.status': 'canceled',
    'license.status': 'inactive'
  });
}