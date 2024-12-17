import React from 'react';
import { Section } from '../components/ui/Section';
import { FeatureIcon } from '../../Icons/FeatureIcons';

const features = [
  {
    icon: 'security',
    title: 'Dados Seguros',
    description: 'Proteção total dos seus dados e conteúdo com criptografia de ponta a ponta.'
  },
  {
    icon: 'interface',
    title: 'Interface Intuitiva',
    description: 'Experiência do usuário simplificada para máxima eficiência e produtividade.'
  },
  {
    icon: 'analytics',
    title: 'Analytics Avançado',
    description: 'Métricas detalhadas para otimizar seu conteúdo e resultados.'
  },
  {
    icon: 'integration',
    title: 'Integração Fácil',
    description: 'Integre facilmente com seu site existente em minutos.'
  },
  {
    icon: 'support',
    title: 'Suporte 24/7',
    description: 'Equipe de suporte disponível 24 horas por dia, 7 dias por semana.'
  }
];

export function Features() {
  return (
    <Section id="features" background="gradient" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=2000')] opacity-5 bg-cover bg-center" />
      
      <div className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Por que escolher o <span className="text-[#00FFFF]">Stry Live</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Nossa plataforma oferece recursos poderosos para transformar a experiência dos seus visitantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-colors duration-300"
            >
              <div className="mb-4">
                <FeatureIcon name={feature.icon as any} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-4 bg-white/10 backdrop-blur-lg rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white/80 text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Suporte Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Updates Constantes</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}