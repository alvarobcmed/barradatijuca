import React from 'react';
import { Section } from '../components/ui/Section';
import { CheckoutButton } from '../../Checkout/CheckoutButton';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Mensal',
    price: 79.90,
    period: 'mensal',
    description: 'Experimente grátis por 7 dias. Stories Ilimitados para o seu site',
    trial_days: 7,
    priceType: 'MONTHLY' as const,
    features: [
      'Stories Ilimitados',
      'Analytics Avançado',
      'Suporte Premium',
      'Personalização Total',
      'Integração com GTM',
      'Domínio Personalizado',
      'Atualizações Gratuitas'
    ]
  },
  {
    name: 'Anual',
    price: 765.00,
    period: 'anual',
    description: 'Experimente grátis por 14 dias. Stories Ilimitados para o seu site',
    popular: true,
    trial_days: 14,
    priceType: 'YEARLY' as const,
    discount: '20% OFF',
    features: [
      'Stories Ilimitados',
      'Analytics Avançado',
      'Suporte Premium',
      'Personalização Total',
      'Integração com GTM',
      'Domínio Personalizado',
      'Atualizações Gratuitas',
      'Economia de 20%'
    ]
  }
];

export function Pricing() {
  return (
    <Section id="pricing" background="gray">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Preços <span className="text-[#FF0A7B]">Simples</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Escolha o plano ideal para o seu negócio e comece a transformar seu site hoje mesmo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`
              relative bg-white rounded-2xl shadow-xl overflow-hidden
              ${plan.popular ? 'ring-2 ring-[#FF0A7B] scale-105 md:-mt-4 md:-mb-4' : ''}
            `}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#FF0A7B] text-white text-sm font-medium px-4 py-1 rounded-bl-lg">
                Melhor Custo-Benefício
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">R${plan.price.toFixed(2)}</span>
                <span className="text-gray-600">/{plan.period}</span>
                {plan.discount && (
                  <span className="ml-2 inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {plan.discount}
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-500 mb-6">
                {plan.trial_days} dias grátis • Cancele quando quiser
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <CheckoutButton
                priceType={plan.priceType}
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full"
              >
                Começar Agora
              </CheckoutButton>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}