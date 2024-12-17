import React from 'react';
import { LayoutDashboard, Settings, Film, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';

interface AdminHeaderProps {
  activeTab: 'dashboard' | 'stories' | 'settings' | 'users';
  onTabChange: (tab: 'dashboard' | 'stories' | 'settings' | 'users') => void;
}

export function AdminHeader({ activeTab, onTabChange }: AdminHeaderProps) {
  const { user } = useAuth();
  const { can } = usePermissions();

  const getRoleDisplay = () => {
    if (process.env.NODE_ENV === 'development') {
      return 'Proprietário';
    }
    
    // For production environment
    switch (user?.role) {
      case 'owner':
        return 'Proprietário';
      case 'admin':
        return 'Administrador';
      default:
        return 'Editor';
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Administração de Stories</h1>
          
          <nav className="flex space-x-4">
            {can.viewAnalytics && (
              <button
                onClick={() => onTabChange('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </button>
            )}
            
            {can.manageStories && (
              <button
                onClick={() => onTabChange('stories')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'stories'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Film className="w-4 h-4 mr-2" />
                Stories
              </button>
            )}
            
            {can.manageSettings && (
              <button
                onClick={() => onTabChange('settings')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </button>
            )}

            {can.manageUsers && (
              <button
                onClick={() => onTabChange('users')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'users'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Usuários
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/90">
              {user?.displayName || user?.email}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
              {getRoleDisplay()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}