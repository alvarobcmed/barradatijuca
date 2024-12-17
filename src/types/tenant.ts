export interface Tenant {
  id: string;
  name: string;
  createdAt: number;
  ownerId: string;
  settings: {
    previewPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    autoPlayPreview: boolean;
    previewDuration: number;
    whatsappNumber: string;
    whatsappMessage: string;
    companyInfo: {
      name: string;
      logo: string;
    };
    gtmSettings: {
      enabled: boolean;
      containerId: string;
    };
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  email: string;
  role: 'owner' | 'admin' | 'editor';
  name: string;
  createdAt: number;
  lastLoginAt: number;
}