import React, { useState } from 'react';
import { AdminSettings } from '../../types/admin';
import { GTMInstructions } from './GTMInstructions';
import { ScriptInstallation } from './ScriptInstallation';
import { useAdminSettings } from '../../hooks/useAdminSettings';
import { ImageUpload } from '../FileUpload/ImageUpload';
import { PreviewPositionSelector } from './PreviewPositionSelector';
import toast from 'react-hot-toast';

export function SettingsPanel() {
  const { settings, updateSettings, isLoading } = useAdminSettings();
  const [savingStates, setSavingStates] = useState({
    preview: false,
    whatsapp: false,
    company: false,
    gtm: false
  });

  if (isLoading) {
    return <div>Carregando configurações...</div>;
  }

  const handleSaveSection = async (section: keyof typeof savingStates, updates: Partial<AdminSettings>) => {
    setSavingStates(prev => ({ ...prev, [section]: true }));
    try {
      await updateSettings(updates);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setSavingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h2>
      
      <div className="space-y-6">
        {/* Configurações de Visualização */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Configurações de Visualização</h3>
            <button
              onClick={() => handleSaveSection('preview', {
                previewPosition: settings.previewPosition,
                previewSize: settings.previewSize,
                autoPlayPreview: settings.autoPlayPreview
              })}
              disabled={savingStates.preview}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {savingStates.preview ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Salvar Visualização
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Posição da Prévia</label>
            <PreviewPositionSelector
              value={settings.previewPosition}
              size={settings.previewSize}
              onChange={(position) => updateSettings({ previewPosition: position })}
              onReset={() => {
                updateSettings({ previewPosition: 'bottom-right' });
                localStorage.removeItem('preview_position');
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tamanho da Prévia
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Largura (px)</label>
                <input
                  type="number"
                  min="100"
                  max="400"
                  value={settings.previewSize.width}
                  onChange={(e) => updateSettings({
                    previewSize: {
                      ...settings.previewSize,
                      width: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Altura (px)</label>
                <input
                  type="number"
                  min="100"
                  max="600"
                  value={settings.previewSize.height}
                  onChange={(e) => updateSettings({
                    previewSize: {
                      ...settings.previewSize,
                      height: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 150x267 pixels (proporção 9:16)
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoPlayPreview"
              checked={settings.autoPlayPreview}
              onChange={(e) => updateSettings({
                autoPlayPreview: e.target.checked
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="autoPlayPreview" className="ml-2 block text-sm text-gray-700">
              Reprodução Automática da Prévia
            </label>
          </div>
        </div>

        {/* Configurações do WhatsApp */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Configurações do WhatsApp</h3>
            <button
              onClick={() => handleSaveSection('whatsapp', {
                whatsappNumber: settings.whatsappNumber,
                whatsappMessage: settings.whatsappMessage
              })}
              disabled={savingStates.whatsapp}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {savingStates.whatsapp ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Salvar WhatsApp
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Número do WhatsApp Padrão</label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => updateSettings({
                whatsappNumber: e.target.value
              })}
              placeholder="5511999999999"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mensagem Padrão do WhatsApp</label>
            <textarea
              value={settings.whatsappMessage}
              onChange={(e) => updateSettings({
                whatsappMessage: e.target.value
              })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Informações da Empresa */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Informações da Empresa</h3>
            <button
              onClick={() => handleSaveSection('company', {
                companyInfo: settings.companyInfo
              })}
              disabled={savingStates.company}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {savingStates.company ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Salvar Empresa
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
            <input
              type="text"
              value={settings.companyInfo.name}
              onChange={(e) => updateSettings({
                companyInfo: {
                  ...settings.companyInfo,
                  name: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo da Empresa</label>
            <ImageUpload
              value={settings.companyInfo.logo}
              onChange={(value) => updateSettings({
                companyInfo: {
                  ...settings.companyInfo,
                  logo: value
                }
              })}
              className="max-w-md"
            />
          </div>
        </div>

        {/* Configurações do Google Tag Manager */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Configurações do Google Tag Manager</h3>
            <button
              onClick={() => handleSaveSection('gtm', {
                gtmSettings: settings.gtmSettings
              })}
              disabled={savingStates.gtm}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {savingStates.gtm ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Salvar GTM
            </button>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="gtmEnabled"
              checked={settings.gtmSettings.enabled}
              onChange={(e) => updateSettings({
                gtmSettings: {
                  ...settings.gtmSettings,
                  enabled: e.target.checked
                }
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="gtmEnabled" className="ml-2 block text-sm text-gray-700">
              Ativar Integração com Google Tag Manager
            </label>
          </div>

          {settings.gtmSettings.enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID do Container GTM
              </label>
              <input
                type="text"
                value={settings.gtmSettings.containerId}
                onChange={(e) => updateSettings({
                  gtmSettings: {
                    ...settings.gtmSettings,
                    containerId: e.target.value
                  }
                })}
                placeholder="GTM-XXXXXXX"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>

      </div>

      {settings.gtmSettings.enabled && settings.gtmSettings.containerId && (
        <GTMInstructions settings={settings} />
      )}
      
      <ScriptInstallation settings={settings} />
    </div>
  );
}