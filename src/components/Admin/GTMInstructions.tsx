import React from 'react';
import { AdminSettings } from '../../types/admin';

interface GTMInstructionsProps {
  settings: AdminSettings;
}

export function GTMInstructions({ settings }: GTMInstructionsProps) {
  const getInstallationCode = () => {
    return `<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${settings.gtmSettings.containerId}');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${settings.gtmSettings.containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
  };

  const getDataLayerCode = () => {
    return `// Story View Event
dataLayer.push({
  'event': 'story_view',
  'story_id': '{{Story ID}}',
  'story_type': '{{Story Type}}',
  'story_username': '{{Story Username}}',
  'view_duration': '{{View Duration}}',
  'completion_rate': '{{Completion Rate}}'
});

// Story Like Event
dataLayer.push({
  'event': 'story_like',
  'story_id': '{{Story ID}}',
  'story_type': '{{Story Type}}',
  'story_username': '{{Story Username}}'
});

// Story WhatsApp Click Event
dataLayer.push({
  'event': 'story_whatsapp_click',
  'story_id': '{{Story ID}}',
  'story_type': '{{Story Type}}',
  'story_username': '{{Story Username}}',
  'whatsapp_number': '{{WhatsApp Number}}'
});`;
  };

  const getVariablesCode = () => {
    return `// Custom JavaScript Variable - Story ID
function() {
  return window.currentStory ? window.currentStory.id : '';
}

// Custom JavaScript Variable - Story Type
function() {
  return window.currentStory ? window.currentStory.type : '';
}

// Custom JavaScript Variable - Story Username
function() {
  return window.currentStory ? window.currentStory.username : '';
}

// Custom JavaScript Variable - View Duration
function() {
  return window.storyMetrics ? window.storyMetrics.viewDuration : 0;
}

// Custom JavaScript Variable - Completion Rate
function() {
  return window.storyMetrics ? window.storyMetrics.completionRate : 0;
}

// Custom JavaScript Variable - WhatsApp Number
function() {
  return window.currentStory && window.currentStory.whatsapp 
    ? window.currentStory.whatsapp.number 
    : '';
}`;
  };

  const getTriggersCode = () => {
    return `// Story View Trigger
Event Name: story_view
Trigger Type: Custom Event

// Story Like Trigger
Event Name: story_like
Trigger Type: Custom Event

// Story WhatsApp Click Trigger
Event Name: story_whatsapp_click
Trigger Type: Custom Event`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Instruções de Instalação do GTM</h3>
        <div className="prose max-w-none">
          <ol className="list-decimal pl-4 space-y-6">
            <li>
              <p className="font-medium">Adicione o código do Google Tag Manager ao seu site</p>
              <p className="text-sm text-gray-600 mb-2">
                Copie e cole o seguinte código logo após a tag <code>&lt;head&gt;</code> do seu site:
              </p>
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  {getInstallationCode()}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(getInstallationCode())}
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Copiar
                </button>
              </div>
            </li>

            <li>
              <p className="font-medium">Configure as Variáveis no GTM</p>
              <p className="text-sm text-gray-600 mb-2">
                Crie as seguintes variáveis personalizadas no GTM:
              </p>
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  {getVariablesCode()}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(getVariablesCode())}
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Copiar
                </button>
              </div>
            </li>

            <li>
              <p className="font-medium">Configure os Acionadores</p>
              <p className="text-sm text-gray-600 mb-2">
                Crie os seguintes acionadores no GTM:
              </p>
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  {getTriggersCode()}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(getTriggersCode())}
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Copiar
                </button>
              </div>
            </li>

            <li>
              <p className="font-medium">Eventos do DataLayer</p>
              <p className="text-sm text-gray-600 mb-2">
                Os seguintes eventos serão enviados automaticamente para o DataLayer:
              </p>
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  {getDataLayerCode()}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(getDataLayerCode())}
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Copiar
                </button>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h4 className="text-blue-800 font-medium mb-2">Informações Importantes</h4>
        <ul className="list-disc pl-4 text-sm text-blue-700 space-y-2">
          <li>
            Os eventos são disparados automaticamente quando os usuários interagem com os Stories.
          </li>
          <li>
            As variáveis são preenchidas dinamicamente com os dados do Story atual.
          </li>
          <li>
            Você pode usar esses eventos para criar metas no Google Analytics ou outras integrações.
          </li>
          <li>
            O tempo de visualização e taxa de conclusão são calculados automaticamente.
          </li>
        </ul>
      </div>
    </div>
  );
}