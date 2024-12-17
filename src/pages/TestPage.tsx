import React from 'react';
import { StoriesPreview } from '../components/StoriesPreview/StoriesPreview';
import { StoryView } from '../components/StoryViewer/StoryView';
import { Link } from '../components/Link';
import { useAdminSettingsContext } from '../contexts/AdminSettingsContext';
import { useStoriesManager } from '../hooks/useStoriesManager';
import { useStoriesState } from '../hooks/useStoriesState';

export function TestPage() {
  const { settings } = useAdminSettingsContext();
  const { stories } = useStoriesManager();
  const {
    selectedStories,
    currentIndex,
    handleStoryClick,
    handleClose,
    handleNext,
    handlePrevious
  } = useStoriesState();

  const activeStories = stories.filter(story => story.status !== 'archived');

  const companyStories = {
    companyId: '1',
    companyName: settings.companyInfo.name || 'Nome da Empresa',
    companyLogo: settings.companyInfo.logo || 'https://via.placeholder.com/150',
    stories: activeStories
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 left-4 z-40">
        <Link
          href="/admin"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Abrir Painel Admin
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Demonstração de Stories</h1>
        <p className="text-gray-600 mb-4">
          Esta é uma página de demonstração mostrando o recurso de Stories. A prévia aparecerá no {settings.previewPosition.replace('-', ' ').replace('bottom', 'inferior').replace('top', 'superior').replace('right', 'direita').replace('left', 'esquerda')}.
        </p>
        <p className="text-gray-600 mb-4">
          Clique na prévia para abrir o visualizador de Stories em tela cheia.
        </p>
      </div>

      {activeStories.length > 0 && (
        <>
          <StoriesPreview
            companyStories={companyStories}
            onStoryClick={() => handleStoryClick(activeStories)}
            position={settings.previewPosition}
            autoPlay={settings.autoPlayPreview}
          />

          {selectedStories && (
            <StoryView
              stories={selectedStories}
              currentIndex={currentIndex}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </div>
  );
}