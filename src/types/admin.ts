export interface AdminSettings {
  previewPosition: {
    type: 'fixed' | 'custom';
    preset: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center-right' | 'center-left';
    x?: number;
    y?: number;
  };
  autoPlayPreview: boolean;
  previewSize: {
    width: number;
    height: number;
  };
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
  license: {
    id: string;
    status: 'active' | 'inactive' | 'expired';
    domains: string[];
    createdAt: number;
    expiresAt: number;
  };
}