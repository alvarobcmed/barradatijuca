import React from 'react';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo/Logo';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Logo variant="dark" size="md" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Termos de Serviço</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o Stry Live, você concorda em cumprir e estar vinculado aos seguintes termos e condições. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
              <p>
                O Stry Live é uma plataforma que permite a criação e gerenciamento de stories interativos para websites. Nossos serviços incluem, mas não se limitam a:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Criação e gerenciamento de stories</li>
                <li>Análise de engajamento e métricas</li>
                <li>Personalização de aparência e comportamento</li>
                <li>Integração com sistemas de analytics</li>
                <li>Suporte técnico</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Contas e Assinaturas</h2>
              <p>
                Para utilizar o Stry Live, você deve criar uma conta e manter uma assinatura ativa. Você é responsável por:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Manter a confidencialidade de suas credenciais</li>
                <li>Todas as atividades que ocorrem em sua conta</li>
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Pagamentos e Reembolsos</h2>
              <p>
                As assinaturas são cobradas de forma recorrente. Os pagamentos são processados através do Stripe. Consulte nossa Política de Reembolso para mais detalhes sobre cancelamentos e reembolsos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo e tecnologia do Stry Live são protegidos por direitos autorais e outras leis de propriedade intelectual. Você mantém a propriedade do seu conteúdo, mas nos concede uma licença para exibi-lo através de nossa plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitações de Uso</h2>
              <p>
                Você concorda em não:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Publicar conteúdo ilegal ou ofensivo</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Realizar engenharia reversa do software</li>
                <li>Interferir na operação normal do serviço</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitação de Responsabilidade</h2>
              <p>
                O Stry Live não será responsável por danos indiretos, incidentais, especiais ou consequentes resultantes do uso ou impossibilidade de uso do serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor após a publicação dos termos atualizados. O uso continuado do serviço após tais alterações constitui sua aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
              <p>
                Para questões relacionadas a estes termos, entre em contato através do email: <a href="mailto:legal@stry.live" className="text-indigo-600 hover:text-indigo-800">legal@stry.live</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}