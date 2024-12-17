import React from 'react';
import { Check, Copy, AlertCircle } from 'lucide-react';
import { AdminSettings } from '../../types/admin';

interface ScriptInstallationProps {
  settings: AdminSettings;
}

export function ScriptInstallation({ settings }: ScriptInstallationProps) {
  const [copied, setCopied] = React.useState(false);
  
  const scriptCode = `<!-- Stry.Live Stories Integration -->
<script>
  window.StryLiveConfig = {
    licenseId: "${settings.license?.id || 'YOUR_LICENSE_ID'}",
    domain: window.location.hostname
  };
</script>
<script async src="https://cdn.stry.live/v1/stories.min.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLicenseActive = settings.license?.status === 'active';
  
  if (!isLicenseActive) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {settings.license?.id 
                ? 'Sua licença está inativa. Por favor, verifique o status da sua assinatura.'
                : 'Você precisa ter uma licença ativa para instalar o Stry.Live em seu site. Por favor, escolha um plano para continuar.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Instalação do Script</h3>
        <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
          Licença Ativa
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Código de Instalação</h4>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5 text-green-500" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copiar
                </>
              )}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {scriptCode}
          </pre>
        </div>

        <div className="prose prose-sm max-w-none">
          <h4>Instruções de Instalação:</h4>
          <ol className="list-decimal pl-4 space-y-2">
            <li>
              Copie o código de instalação acima
            </li>
            <li>
              No Google Tag Manager, crie uma nova tag do tipo "HTML Personalizado"
            </li>
            <li>
              Cole o código no campo de HTML da tag
            </li>
            <li>
              Configure o acionador para disparar em "Todas as Páginas" (All Pages)
            </li>
            <li>
              Salve e publique as alterações
            </li>
          </ol>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900">Informações da Licença:</h5>
            <dl className="mt-2 space-y-1">
              <div className="flex justify-between">
                <dt className="text-gray-500">ID da Licença:</dt>
                <dd className="text-gray-900 font-mono">{settings.license.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Validade:</dt>
                <dd className="text-gray-900">
                  {new Date(settings.license.expiresAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h5 className="text-blue-800 font-medium">Domínios Autorizados:</h5>
            <ul className="mt-2 space-y-1">
              {settings.license.domains.map((domain) => (
                <li key={domain} className="text-blue-600">
                  {domain}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-blue-700">
              O script só funcionará nos domínios listados acima. Para adicionar mais domínios,
              entre em contato com nosso suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}