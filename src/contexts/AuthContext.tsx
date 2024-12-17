import React, { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from '../hooks/useAuthState';
import { loginWithEmail, registerWithEmail, logoutUser, sendResetPasswordEmail, getUserRole, verifyEmail } from '../services/firebase/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (oobCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Development mock user
const mockUser = {
  uid: 'dev-user-123',
  email: 'dev@example.com',
  displayName: 'Dev User',
  emailVerified: true,
  getIdToken: () => Promise.resolve('mock-token'),
  // Add other required User properties as needed
} as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: firebaseUser, loading, error } = useAuthState();

  // Use mock user in development, real user in production
  const user = process.env.NODE_ENV === 'development' ? mockUser : firebaseUser;

  const login = async (email: string, password: string) => {
    try {
      // In development, simulate successful login
      if (process.env.NODE_ENV === 'development') {
        toast.success('Login realizado com sucesso!');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
        return;
      }

      const user = await loginWithEmail(email, password);
      
      if (!user.emailVerified) {
        await sendResetPasswordEmail(email);
        toast.error('Por favor, verifique seu email antes de fazer login.');
        return;
      }

      const role = await getUserRole(user);
      
      toast.success('Login realizado com sucesso!');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // In development, simulate successful registration
      if (process.env.NODE_ENV === 'development') {
        // Redirect to pricing page
        window.location.href = '/pricing';
        return;
      }

      const user = await registerWithEmail(email, password, name);
      // Store registration info in localStorage for checkout
      localStorage.setItem('registration_email', email);
      localStorage.setItem('registration_name', name);
      
      // Redirect to pricing page
      window.location.href = '/pricing';
    } catch (error) {
      console.error('Error registering:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      // In development, simulate successful logout
      if (process.env.NODE_ENV === 'development') {
        toast.success('Logout realizado com sucesso!');
        window.location.href = '/login';
        return;
      }

      await logoutUser();
      toast.success('Logout realizado com sucesso!');
      window.location.href = '/login';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // In development, simulate successful password reset
      if (process.env.NODE_ENV === 'development') {
        toast.success('Email de recuperação enviado com sucesso!');
        return;
      }

      await sendResetPasswordEmail(email);
      toast.success('Email de recuperação enviado com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        resetPassword,
        verifyEmail
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}