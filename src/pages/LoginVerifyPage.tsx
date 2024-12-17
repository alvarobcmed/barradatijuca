import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from '../components/Link';

export function LoginVerifyPage() {
  const { signInWithLink } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('emailForSignIn');
    if (!email) {
      setError('Nenhum email encontrado. Por favor, tente fazer login novamente.');
      return;
    }

    const handleSignIn = async () => {
      try {
        await signInWithLink(email, window.location.href);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } catch (err) {
        setError('Erro ao verificar o link. Por favor, tente novamente.');
      }
    };

    handleSignIn();
  }, [signInWithLink]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error}</div>
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Voltar para Login
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-green-600 mb-4">Login realizado com sucesso!</div>
        <div>Redirecionando para o painel administrativo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}