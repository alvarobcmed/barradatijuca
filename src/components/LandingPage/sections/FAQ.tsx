import React from 'react';

const faqItems = [
  {
    question: 'Como o Stry.Live se integra ao meu site?',
    answer: 'A integração é simples e rápida através do Google Tag Manager. Basta adicionar nosso script e configurar as opções no painel administrativo. Não é necessário conhecimento técnico avançado.'
  },
  {
    question: 'Quais métricas e análises estão disponíveis?',
    answer: 'Oferecemos análises detalhadas incluindo visualizações, engajamento, taxa de conclusão, tempo médio de visualização, interações com botões de ação e muito mais. Todas as métricas são apresentadas em um painel intuitivo.'
  },
  {
    question: 'Posso personalizar a aparência dos stories?',
    answer: 'Sim! O Stry.Live oferece personalização completa, permitindo ajustar cores, posicionamento, tamanho e elementos visuais para combinar perfeitamente com a identidade da sua marca.'
  },
  {
    question: 'Como funciona o período de teste?',
    answer: 'Oferecemos 7 dias de teste grátis no plano mensal (R$79,90/mês) e 14 dias no plano anual (R$765,00/ano com 20% de desconto). Durante este período, você tem acesso a todos os recursos premium sem restrições.'
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim, você pode cancelar sua assinatura quando quiser. Não há contratos de longo prazo ou taxas de cancelamento. Se cancelar, você mantém acesso até o final do período pago.'
  },
  {
    question: 'É possível integrar com o WhatsApp Business?',
    answer: 'Sim! O Stry.Live possui integração nativa com WhatsApp Business, permitindo adicionar botões de ação que direcionam para conversas no WhatsApp com mensagens personalizadas.'
  }
];

export function FAQ() {
  const [openItem, setOpenItem] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Perguntas <span className="text-[#FF0A7B]">Frequentes</span>
            </h2>
            <p className="text-gray-600">
              Encontre respostas para as principais dúvidas sobre o Stry.Live
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-200 ${
                    openItem === index ? 'max-h-96' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}