export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Bem-vindo ao Stry Live!',
    template: 'welcome'
  },
  verifyEmail: {
    subject: 'Confirme seu email - Stry Live',
    template: 'verify-email'
  },
  trialEnding: {
    subject: 'Seu período de teste está acabando',
    template: 'trial-ending'
  },
  paymentSuccess: {
    subject: 'Pagamento confirmado - Stry Live',
    template: 'payment-success'
  },
  paymentFailed: {
    subject: 'Problema com seu pagamento - Stry Live',
    template: 'payment-failed'
  },
  subscriptionCanceled: {
    subject: 'Confirmação de cancelamento - Stry Live',
    template: 'subscription-canceled'
  },
  monthlyReceipt: {
    subject: 'Recibo mensal - Stry Live',
    template: 'monthly-receipt'
  }
};

export const EMAIL_SENDER = {
  name: 'Stry Live',
  email: 'contato@stry.live'
};