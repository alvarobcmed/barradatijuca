import React from 'react';
import { BenefitCard } from './BenefitCard';
import { 
  Users, 
  Clock, 
  Target, 
  Brain,
  BarChart2,
  Zap,
  LineChart,
  UserPlus,
  Award,
  Share2,
  Lightbulb,
  Puzzle
} from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      title: 'Aumento do Engajamento',
      description: 'Stories interativos prendem a atenção dos visitantes e os incentivam a interagir com o conteúdo de forma natural e intuitiva.',
      icon: Users,
      stats: { value: '+73%', label: 'aumento médio no engajamento' }
    },
    {
      title: 'Maior Tempo de Permanência',
      description: 'Stories cativantes incentivam os visitantes a permanecerem no site por mais tempo, explorando diferentes conteúdos.',
      icon: Clock,
      stats: { value: '2.5x', label: 'mais tempo no site' }
    },
    {
      title: 'Aumento de Conversão',
      description: 'CTAs estratégicos e links clicáveis nos stories direcionam os usuários para ações específicas, aumentando as taxas de conversão.',
      icon: Target,
      stats: { value: '+45%', label: 'em conversões' }
    },
    {
      title: 'Retenção da Marca',
      description: 'O formato visual e interativo dos stories cria uma experiência memorável, fortalecendo o reconhecimento da marca.',
      icon: Brain
    },
    {
      title: 'Insights Valiosos',
      description: 'Análises detalhadas sobre o comportamento e preferências dos usuários para otimizar suas estratégias.',
      icon: BarChart2
    },
    {
      title: 'Leads Qualificados',
      description: 'Capture leads mais qualificados através de conteúdo relevante e interativo que demonstra interesse real.',
      icon: UserPlus
    },
    {
      title: 'Diferencial Competitivo',
      description: 'Destaque-se da concorrência oferecendo uma experiência moderna e envolvente aos seus visitantes.',
      icon: Award
    },
    {
      title: 'Alcance Ampliado',
      description: 'Stories compartilháveis aumentam o alcance orgânico e atraem mais visitantes para seu site.',
      icon: Share2
    },
    {
      title: 'Conteúdo Versátil',
      description: 'Crie diversos tipos de conteúdo como tutoriais, bastidores, lançamentos e promoções de forma cativante.',
      icon: Lightbulb
    },
    {
      title: 'Integração Simples',
      description: 'Implementação rápida e fácil em qualquer site, sem necessidade de conhecimentos técnicos avançados.',
      icon: Puzzle
    },
    {
      title: 'Performance Otimizada',
      description: 'Stories leves e otimizados que não impactam o desempenho do seu site.',
      icon: Zap
    },
    {
      title: 'Métricas Detalhadas',
      description: 'Acompanhe visualizações, engajamento, taxa de conclusão e conversões em tempo real.',
      icon: LineChart
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#6B0F6C' }}>
            Benefícios do <span style={{ color: '#FF0A7B' }}>Stry Live</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra como o Stry Live pode transformar a experiência dos visitantes do seu site e impulsionar seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              stats={benefit.stats}
            />
          ))}
        </div>
      </div>
    </section>
  );
}