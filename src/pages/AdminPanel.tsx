import React from 'react';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { Dashboard } from '../components/Admin/Dashboard';
import { SettingsPanel } from '../components/Admin/SettingsPanel';
import { StoriesManager } from '../components/Admin/StoriesManager';
import { UserManagement } from '../components/Admin/UserManagement';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { usePermissions } from '../hooks/usePermissions';

export function AdminPanel() {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'stories' | 'settings' | 'users'>('dashboard');
  const { can } = usePermissions();

  const handleTabChange = (tab: 'dashboard' | 'stories' | 'settings' | 'users') => {
    // Check permissions before changing tab
    switch (tab) {
      case 'dashboard':
        if (!can.viewAnalytics) return;
        break;
      case 'stories':
        if (!can.manageStories) return;
        break;
      case 'settings':
        if (!can.manageSettings) return;
        break;
      case 'users':
        if (!can.manageUsers) return;
        break;
    }
    setActiveTab(tab);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminHeader activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="container mx-auto px-4 py-8 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] opacity-5 bg-cover bg-center" />
          <div className="relative">
            {activeTab === 'dashboard' && can.viewAnalytics && <Dashboard />}
            {activeTab === 'stories' && can.manageStories && <StoriesManager />}
            {activeTab === 'settings' && can.manageSettings && <SettingsPanel />}
            {activeTab === 'users' && can.manageUsers && <UserManagement />}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}