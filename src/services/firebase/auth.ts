import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  updateProfile,
  signOut,
  User,
  getIdTokenResult
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { handleAuthError } from './error-handler';
import { getFunctions, httpsCallable } from 'firebase/functions';

export async function loginWithEmail(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function registerWithEmail(email: string, password: string, name: string): Promise<User> {
  try {
    // Create the user
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with name
    await updateProfile(result.user, { displayName: name });
    
    // Send email verification
    await sendEmailVerification(result.user, {
      url: window.location.origin + '/login',
      handleCodeInApp: true,
    });

    // Set custom claims for owner role
    const functions = getFunctions();
    const setCustomClaims = httpsCallable(functions, 'setCustomClaims');
    await setCustomClaims({ uid: result.user.uid, role: 'owner' });

    return result.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function sendResetPasswordEmail(email: string): Promise<void> {
  try {
    await firebaseSendPasswordReset(auth, email, {
      url: window.location.origin + '/login',
      handleCodeInApp: true,
    });
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function verifyEmail(oobCode: string): Promise<void> {
  try {
    await applyActionCode(auth, oobCode);
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function getUserRole(user: User): Promise<string> {
  try {
    const tokenResult = await getIdTokenResult(user);
    return tokenResult.claims.role || 'editor';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'editor';
  }
}