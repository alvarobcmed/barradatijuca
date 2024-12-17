import { useState, useEffect } from 'react';
import { AdminSettings } from '../types/admin';

const ADMIN_SETTINGS_KEY = 'admin_settings';

const defaultSettings: AdminSettings = {
  previewPosition: {
    type: 'fixed',
    preset: 'bottom-right'
  },
  autoPlayPreview: true,
  previewSize: {
    width: 150, 
    height: Math.round(150 * (16/9))
  },
  previewDuration: 5,
  whatsappNumber: '',
  whatsappMessage: '',
  companyInfo: {
    name: '',
    logo: ''
  },
  gtmSettings: {
    enabled: false,
    containerId: ''
  }
};

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem(ADMIN_SETTINGS_KEY);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        setSettings(defaultSettings);
      }
    }
    setIsLoading(false);
  }, []);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    // Remove any visitor preferences when updating admin settings
    localStorage.removeItem('visitor_preview_position');

    // If updating preview width, ensure height maintains 16:9 ratio
    if (newSettings.previewSize?.width) {
      const width = newSettings.previewSize.width;
      newSettings.previewSize.height = Math.round(width * (16/9));
    }

    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(updatedSettings));
  };

  return { settings, updateSettings, isLoading };
}