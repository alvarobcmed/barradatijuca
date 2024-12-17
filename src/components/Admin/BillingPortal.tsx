import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard, Settings } from 'lucide-react';

export function BillingPortal() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      if (!user?.stripeCustomerId) {
        throw new Error('Customer ID not found');
      }

      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: user?.stripeCustomerId
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      
      // Open in new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening portal:', error);
      alert('Erro ao abrir portal de assinatura. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Assinatura</h3>
          <p className="text-sm text-gray-500">Gerencie sua assinatura e métodos de pagamento</p>
        </div>
        <button
          onClick={handleManageSubscription}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Settings className="w-5 h-5 mr-2" />
          )}
          Gerenciar Assinatura
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.subscription?.status === 'active' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ativa
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inativa
                </span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Próxima Cobrança</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.subscription?.currentPeriodEnd ? (
                new Date(user.subscription.currentPeriodEnd).toLocaleDateString()
              ) : (
                'N/A'
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Método de Pagamento</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                •••• {user?.subscription?.lastFour || '****'}
              </div>
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Plano</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.subscription?.plan === 'monthly' ? 'Mensal' : 'Anual'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}