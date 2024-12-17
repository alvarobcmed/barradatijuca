import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from '../components/Link';
import { CheckCircle, XCircle } from 'lucide-react';

export function VerifyEmailPage() {
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const oobCode = new URLSearchParams(window.location.search).get('oobCode');
        if (!oobCode) {
          setStatus('error');
          setMessage('Código de verificação inválido');
          return;
        }

        await verifyEmail(oobCode);
        setStatus('success');
        setMessage('Email verificado com sucesso!');
      } catch (error) {
        setStatus('error');
        setMessage('Erro ao verificar email. O link pode ter expirado.');
      }
    };

    verify();
  }, [verifyEmail]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === 'loading' && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Email Verificado!
                </h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <Link
                  href="/login"
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Fazer Login
                </Link>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Erro na Verificação
                </h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <Link
                  href="/login"
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voltar para Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}