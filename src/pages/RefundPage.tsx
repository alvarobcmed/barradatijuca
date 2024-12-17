import React from 'react';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo/Logo';

export function RefundPage() {
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
          <h1 className="text-3xl font-bold mb-8">Política de Reembolso</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Período de Teste Gratuito</h2>
              <p>
                Oferecemos um período de teste gratuito de 7 dias para planos mensais e 14 dias para planos anuais. Durante este período, você pode cancelar sua assinatura a qualquer momento sem ser cobrado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Política de Reembolso</h2>
              <p>
                Após o período de teste gratuito, nossa política de reembolso é a seguinte:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong>Planos Mensais:</strong> Reembolso total se solicitado em até 48 horas após a primeira cobrança
                </li>
                <li>
                  <strong>Planos Anuais:</strong> Reembolso proporcional ao período não utilizado se solicitado em até 30 dias após a cobrança
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Como Solicitar Reembolso</h2>
              <p>
                Para solicitar um reembolso:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2">
                <li>Envie um email para <a href="mailto:suporte@stry.live" className="text-indigo-600 hover:text-indigo-800">suporte@stry.live</a></li>
                <li>Inclua o email associado à sua conta</li>
                <li>Explique o motivo da solicitação</li>
                <li>Nossa equipe responderá em até 24 horas úteis</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Casos Especiais</h2>
              <p>
                Consideramos reembolsos fora dos prazos acima em casos de:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Problemas técnicos graves que impeçam o uso do serviço</li>
                <li>Cobranças duplicadas ou incorretas</li>
                <li>Circunstâncias excepcionais avaliadas caso a caso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Processamento do Reembolso</h2>
              <p>
                Os reembolsos são processados através do mesmo método de pagamento utilizado na compra:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Cartões de crédito: 5-10 dias úteis</li>
                <li>O valor será creditado na próxima fatura</li>
                <li>Taxas bancárias ou de processamento não são reembolsáveis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cancelamento de Assinatura</h2>
              <p>
                Você pode cancelar sua assinatura a qualquer momento:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Através do painel administrativo</li>
                <li>O acesso continua até o fim do período pago</li>
                <li>Não há reembolso por períodos parciais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
              <p>
                Para dúvidas sobre reembolsos, entre em contato:
              </p>
              <ul className="list-none pl-6 mt-4 space-y-2">
                <li>Email: <a href="mailto:suporte@stry.live" className="text-indigo-600 hover:text-indigo-800">suporte@stry.live</a></li>
                <li>WhatsApp: <a href="https://wa.me/5511999999999" className="text-indigo-600 hover:text-indigo-800">+55 11 99999-9999</a></li>
                <li>Horário: Segunda a Sexta, 9h às 18h (Brasília)</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}