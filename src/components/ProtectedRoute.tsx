import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from './Link';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // For development, allow access without authentication
  if (process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
        <p className="text-gray-600 mb-6">Você precisa fazer login para acessar esta página.</p>
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  // Check if user has active subscription
  const hasActiveSubscription = user.subscription?.status === 'active' || 
                               user.subscription?.status === 'trialing';
  
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Assinatura Necessária</h2>
        <p className="text-gray-600 mb-6">
          Para acessar o painel administrativo, você precisa ter uma assinatura ativa.
        </p>
        <Link
          href="/pricing"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Ver Planos
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}