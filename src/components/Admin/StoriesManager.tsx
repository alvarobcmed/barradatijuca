import React, { useState } from 'react';
import { Story } from '../../types/story';
import { Plus, X } from 'lucide-react';
import { StoriesGrid } from './StoriesManager/StoriesGrid';
import { useStoriesManager } from '../../hooks/useStoriesManager';

interface StoryFormData {
  url: string;
  type: 'video' | 'image';
  username: string;
  userAvatar: string;
  duration?: number;
  whatsapp?: {
    number: string;
    message: string;
  };
  scheduling?: {
    startDate: number;
    endDate: number;
  };
}

export function StoriesManager() {
  const { stories, addStory, updateStory, updateStoriesOrder, archiveStory, restoreStory, isLoading } = useStoriesManager();
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'archived'>('active');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState<StoryFormData>({
    url: '',
    type: 'video',
    username: '',
    userAvatar: '',
    duration: 5000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStory) {
      updateStory({
        ...editingStory,
        ...formData,
        timestamp: Date.now()
      });
    } else {
      addStory({
        id: Date.now().toString(),
        ...formData,
        timestamp: Date.now(),
        likes: 0,
        status: 'active'
      });
    }
    
    setIsFormOpen(false);
    setEditingStory(null);
    setFormData({
      url: '',
      type: 'video',
      username: '',
      userAvatar: '',
      duration: 5000,
    });
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      url: story.url,
      type: story.type,
      username: story.username,
      userAvatar: story.userAvatar,
      duration: story.duration,
      whatsapp: story.whatsapp,
      scheduling: story.scheduling
    });
    setIsFormOpen(true);
  };

  const filteredStories = stories.filter(story => {
    switch (activeTab) {
      case 'active':
        return story.status === 'active';
      case 'scheduled':
        return story.status === 'scheduled';
      case 'archived':
        return story.status === 'archived';
      default:
        return false;
    }
  });

  if (isLoading) {
    return <div>Carregando stories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Stories Ativos
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'scheduled'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Stories Agendados
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'archived'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Stories Arquivados
          </button>
        </div>
        
        {activeTab !== 'archived' && (
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditingStory(null);
              setFormData({
                url: '',
                type: 'video',
                username: '',
                userAvatar: '',
                duration: 5000,
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Story
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingStory ? 'Editar Story' : 'Adicionar Novo Story'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingStory(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Story
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'video' | 'image' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="video">Vídeo</option>
                  <option value="image">Imagem</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URL do Story
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URL do Avatar
                </label>
                <input
                  type="url"
                  value={formData.userAvatar}
                  onChange={(e) => setFormData({ ...formData, userAvatar: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {formData.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duração (segundos)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.duration ? formData.duration / 1000 : 5}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) * 1000 })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Agendamento
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Data de Início</label>
                    <input
                      type="datetime-local"
                      value={formData.scheduling?.startDate ? new Date(formData.scheduling.startDate).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value).getTime();
                        setFormData({
                          ...formData,
                          scheduling: {
                            startDate: date,
                            endDate: formData.scheduling?.endDate || date + 7 * 24 * 60 * 60 * 1000
                          }
                        });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Data de Término</label>
                    <input
                      type="datetime-local"
                      value={formData.scheduling?.endDate ? new Date(formData.scheduling.endDate).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value).getTime();
                        setFormData({
                          ...formData,
                          scheduling: {
                            startDate: formData.scheduling?.startDate || Date.now(),
                            endDate: date
                          }
                        });
                      }}
                      min={formData.scheduling?.startDate ? new Date(formData.scheduling.startDate).toISOString().slice(0, 16) : undefined}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número do WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsapp?.number || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    whatsapp: {
                      ...formData.whatsapp,
                      number: e.target.value,
                      message: formData.whatsapp?.message || ''
                    }
                  })}
                  placeholder="5511999999999"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensagem do WhatsApp
                </label>
                <textarea
                  value={formData.whatsapp?.message || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    whatsapp: {
                      ...formData.whatsapp,
                      message: e.target.value,
                      number: formData.whatsapp?.number || ''
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingStory(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingStory ? 'Salvar Alterações' : 'Adicionar Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <StoriesGrid
        stories={filteredStories}
        activeTab={activeTab}
        onReorder={updateStoriesOrder}
        onEdit={handleEdit}
        onArchive={archiveStory}
        onRestore={restoreStory}
      />
    </div>
  );
}