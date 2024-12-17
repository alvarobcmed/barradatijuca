import React from 'react';
import { StoriesPreview as FrontendPreview } from '../StoriesPreview/StoriesPreview';
import { COMPANY_STORIES } from '../../data/sampleStories';
import { StoryView } from '../StoryViewer/StoryView';

export function AdminStoriesPreview() {
  const [selectedStories, setSelectedStories] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleStoryClick = (stories) => {
    setSelectedStories(stories);
    setCurrentIndex(0);
  };

  const handleClose = () => {
    setSelectedStories(null);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (selectedStories && currentIndex < selectedStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Frontend Preview</h3>
      
      <div className="relative min-h-[400px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Mock website content */}
        <div className="p-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Stories Preview */}
        <FrontendPreview
          companyStories={COMPANY_STORIES}
          onStoryClick={handleStoryClick}
        />

        {/* Stories Viewer */}
        {selectedStories && (
          <StoryView
            stories={selectedStories}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onClose={handleClose}
          />
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        This preview shows how the stories will appear on your website. The preview appears in the
        bottom-right corner by default and opens in a fullscreen viewer when clicked.
      </p>
    </div>
  );
}