"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.createUserProfile = exports.setCustomClaims = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const stripe_1 = require("stripe");
// Initialize Firebase Admin
admin.initializeApp();
// Initialize Stripe with latest API version
const stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-11-20'
});
// Set custom claims for user roles
exports.setCustomClaims = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
    }
    const { uid, role } = data;
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        return { success: true };
    }
    catch (error) {
        console.error('Error setting custom claims:', error);
        throw new functions.https.HttpsError('internal', 'Error setting custom claims');
    }
});
// Create user profile on signup
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
    try {
        await admin.firestore().collection('users').doc(user.uid).set({
            email: user.email,
            name: user.displayName,
            role: 'owner',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscription: null,
            license: null
        });
    }
    catch (error) {
        console.error('Error creating user profile:', error);
    }
});
// Handle Stripe webhook events
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
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
                await handleCheckoutCompleted(event.data.object);
                break;
            case 'customer.subscription.updated':
                await handleSubscriptionUpdated(event.data.object);
                break;
            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(event.data.object);
                break;
        }
        res.json({ received: true });
    }
    catch (err) {
        const error = err;
        console.error('Webhook Error:', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});
async function handleCheckoutCompleted(session) {
    if (!session.customer || !session.client_reference_id)
        return;
    const userId = session.client_reference_id;
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.update({
        'subscription.customerId': session.customer,
        'subscription.status': 'active',
        'subscription.plan': session.metadata?.plan || 'monthly'
    });
}
async function handleSubscriptionUpdated(subscription) {
    const userId = subscription.metadata.userId;
    if (!userId)
        return;
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.update({
        'subscription.status': subscription.status,
        'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
    });
}
async function handleSubscriptionDeleted(subscription) {
    const userId = subscription.metadata.userId;
    if (!userId)
        return;
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.update({
        'subscription.status': 'canceled',
        'license.status': 'inactive'
    });
}
//# sourceMappingURL=index.js.map