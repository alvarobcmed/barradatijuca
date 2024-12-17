import { Stripe } from 'stripe';
import { db } from '../../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { generateLicenseKey } from '../license/generator';

const stripe = new Stripe('sk_test_51QSUoRIhgiUAz85ZpyFh1bSOpytdzMR7IOEmX4uLyCxLYg9S5KWPp7Zd5HU6AIEvR4ASboLDWk53O2I7O871C47l00t3YHHBxq', {
  apiVersion: '2023-10-16'
});

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const { userId } = subscription.metadata;
  if (!userId) return;

  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) return;

  // Generate license key
  const licenseKey = generateLicenseKey(userId, userDoc.data().domain);

  // Update user document
  await updateDoc(userRef, {
    'subscription': {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      priceId: subscription.items.data[0].price.id,
      customerId: subscription.customer as string
    },
    'license': {
      key: licenseKey,
      status: 'active',
      createdAt: new Date(),
      expiresAt: new Date(subscription.current_period_end * 1000)
    }
  });
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { userId } = subscription.metadata;
  if (!userId) return;

  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    'subscription.status': subscription.status,
    'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
    'subscription.cancelAtPeriodEnd': subscription.cancel_at_period_end,
    'subscription.priceId': subscription.items.data[0].price.id
  });
}

export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { userId } = subscription.metadata;
  if (!userId) return;

  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    'subscription.status': 'canceled',
    'license.status': 'inactive'
  });
}