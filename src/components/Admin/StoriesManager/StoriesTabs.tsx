import React from 'react';

interface StoriesTabsProps {
  activeTab: 'active' | 'scheduled' | 'archived';
  onTabChange: (tab: 'active' | 'scheduled' | 'archived') => void;
}

export function StoriesTabs({ activeTab, onTabChange }: StoriesTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onTabChange('active')}
        className={`px-4 py-2 rounded-lg ${
          activeTab === 'active'
            ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg'
            : 'bg-white/80 text-gray-700 hover:bg-white shadow hover:shadow-md'
        }`}
      >
        Stories Ativos
      </button>
      <button
        onClick={() => onTabChange('scheduled')}
        className={`px-4 py-2 rounded-lg ${
          activeTab === 'scheduled'
            ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Stories Agendados
      </button>
      <button
        onClick={() => onTabChange('archived')}
        className={`px-4 py-2 rounded-lg ${
          activeTab === 'archived'
            ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Stories Arquivados
      </button>
    </div>
  );
}