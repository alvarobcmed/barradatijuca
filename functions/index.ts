import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

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

// Delete user data on account deletion
export const cleanupUserData = functions.auth.user().onDelete(async (user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).delete();
    await admin.firestore().collection('stories').where('userId', '==', user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => doc.ref.delete());
      });
  } catch (error) {
    console.error('Error cleaning up user data:', error);
  }
});