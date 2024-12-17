import { useState, useCallback } from 'react';
import { Story } from '../types/story';

export function useStoriesState() {
  const [selectedStories, setSelectedStories] = useState<Story[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStoryClick = useCallback((stories: Story[]) => {
    setSelectedStories(stories);
    setCurrentIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedStories(null);
    setCurrentIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedStories && currentIndex < selectedStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleClose();
    }
  }, [selectedStories, currentIndex, handleClose]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  return {
    selectedStories,
    currentIndex,
    handleStoryClick,
    handleClose,
    handleNext,
    handlePrevious
  };
}