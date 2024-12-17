import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Tenant } from '../types/tenant';
import { getTenantByUser, updateTenant } from '../services/firebase/tenant';

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  error: Error | null;
  updateTenantSettings: (settings: Partial<Tenant['settings']>) => Promise<void>;
}

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadTenant() {
      if (!user) {
        setTenant(null);
        setLoading(false);
        return;
      }

      try {
        const tenantData = await getTenantByUser(user.uid);
        setTenant(tenantData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tenant'));
      } finally {
        setLoading(false);
      }
    }

    loadTenant();
  }, [user]);

  const updateTenantSettings = async (settings: Partial<Tenant['settings']>) => {
    if (!tenant) return;

    try {
      const updatedTenant = await updateTenant(tenant.id, {
        settings: { ...tenant.settings, ...settings }
      });
      setTenant(updatedTenant);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update tenant settings');
    }
  };

  return (
    <TenantContext.Provider
      value={{
        tenant,
        loading,
        error,
        updateTenantSettings
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}