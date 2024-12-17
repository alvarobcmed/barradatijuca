import React from 'react';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo/Logo';

export function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
              <p>
                Esta Política de Privacidade descreve como o Stry Live coleta, usa, armazena e protege suas informações pessoais. Ao usar nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
              <h3 className="text-xl font-medium mt-4 mb-2">2.1 Informações fornecidas por você:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome e endereço de email</li>
                <li>Informações de faturamento</li>
                <li>Informações da empresa</li>
                <li>Conteúdo que você publica na plataforma</li>
              </ul>

              <h3 className="text-xl font-medium mt-4 mb-2">2.2 Informações coletadas automaticamente:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Dados de uso e interação</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Fornecer e manter nossos serviços</li>
                <li>Processar pagamentos</li>
                <li>Enviar comunicações importantes</li>
                <li>Melhorar nossos serviços</li>
                <li>Detectar e prevenir fraudes</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
              <p>
                Compartilhamos suas informações apenas com:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provedores de serviços (processamento de pagamentos, análise de dados)</li>
                <li>Parceiros de negócios (com seu consentimento)</li>
                <li>Autoridades legais (quando exigido por lei)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento de segurança contínuo</li>
                <li>Backups regulares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
              <p>
                Você tem direito a:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar a exclusão de dados</li>
                <li>Restringir ou opor-se ao processamento</li>
                <li>Portabilidade dos dados</li>
                <li>Retirar consentimento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookies e Tecnologias Similares</h2>
              <p>
                Usamos cookies e tecnologias similares para melhorar a experiência do usuário, analisar o tráfego e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas através de email ou aviso em nosso site. O uso continuado dos serviços após tais alterações constitui sua aceitação da política atualizada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
              <p>
                Para questões sobre privacidade, entre em contato através do email: <a href="mailto:privacy@stry.live" className="text-indigo-600 hover:text-indigo-800">privacy@stry.live</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}