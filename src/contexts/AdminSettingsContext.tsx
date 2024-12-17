import React, { createContext, useContext } from 'react';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { AdminSettings } from '../types/admin';

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  isLoading: boolean;
}

const AdminSettingsContext = createContext<AdminSettingsContextType | null>(null);

export function AdminSettingsProvider({ children }: { children: React.ReactNode }) {
  const { settings, updateSettings, isLoading } = useAdminSettings();

  return (
    <AdminSettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export function useAdminSettingsContext() {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error('useAdminSettingsContext must be used within an AdminSettingsProvider');
  }
  return context;
}