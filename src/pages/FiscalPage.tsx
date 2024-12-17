import React from 'react';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo/Logo';
import { FileText, Download } from 'lucide-react';

export function FiscalPage() {
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
          <h1 className="text-3xl font-bold mb-8">Documentação Fiscal</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Informações da Empresa</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p><strong>Razão Social:</strong> Stry Live Tecnologia Ltda</p>
                <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                <p><strong>Inscrição Municipal:</strong> 1.234.567-8</p>
                <p><strong>Endereço:</strong> Rua Exemplo, 123 - Sala 45</p>
                <p><strong>CEP:</strong> 01234-567</p>
                <p><strong>Cidade/Estado:</strong> São Paulo/SP</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Notas Fiscais</h2>
              <p className="mb-4">
                Emitimos notas fiscais automaticamente para todas as cobranças. As notas são enviadas por email em até 24 horas após o pagamento.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Acessar Notas Fiscais</h3>
                <div className="space-y-4">
                  <p>Você pode acessar suas notas fiscais de três formas:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Painel administrativo (seção Financeiro)</li>
                    <li>Portal do cliente Stripe</li>
                    <li>Email cadastrado</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Documentos Disponíveis</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                      <span>Cartão CNPJ</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                      <span>Inscrição Municipal</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                      <span>Contrato Social</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                      <span>Certidões Negativas</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Informações Tributárias</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Regime Tributário</h3>
                  <p>Simples Nacional</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Impostos Inclusos</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ISS: 5%</li>
                    <li>PIS: 0,65%</li>
                    <li>COFINS: 3%</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Código de Serviço</h3>
                  <p>1.09 - Disponibilização de conteúdo de áudio, vídeo, imagem e texto pela internet</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contato Financeiro</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="mb-4">Para questões relacionadas a documentos fiscais:</p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:fiscal@stry.live" className="text-indigo-600 hover:text-indigo-800">
                      fiscal@stry.live
                    </a>
                  </li>
                  <li>
                    <strong>Telefone:</strong> (11) 3456-7890
                  </li>
                  <li>
                    <strong>Horário:</strong> Segunda a Sexta, 9h às 18h (Brasília)
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}