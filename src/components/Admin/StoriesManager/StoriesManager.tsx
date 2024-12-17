import React, { useState } from 'react';
import { Story } from '../../../types/story';
import { StoriesGrid } from './StoriesGrid';
import { StoryForm } from './StoryForm';
import { StoriesTabs } from './StoriesTabs';
import { useStoriesManager } from '../../../hooks/useStoriesManager';
import { Plus } from 'lucide-react';

export function StoriesManager() {
  const { stories, addStory, updateStory, updateStoriesOrder, archiveStory, restoreStory, isLoading } = useStoriesManager();
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'archived'>('active');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStory(null);
  };

  const handleSubmit = (formData: Partial<Story>) => {
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
      } as Story);
    }
    
    handleCloseForm();
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <StoriesTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab !== 'archived' && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Story
          </button>
        )}
      </div>

      {isFormOpen && (
        <StoryForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          initialData={editingStory}
        />
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