import { useState, useEffect } from 'react';
import { Story, StoryStatus } from '../types/story';
import { COMPANY_STORIES } from '../data/sampleStories';

const STORIES_KEY = 'stories_data';

export function useStoriesManager() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with sample stories if no stories exist
  useEffect(() => {
    const savedStories = localStorage.getItem(STORIES_KEY);
    if (savedStories) {
      try {
        const parsedStories = JSON.parse(savedStories);
        setStories(parsedStories);
      } catch (error) {
        console.error('Error parsing saved stories:', error);
        setStories(COMPANY_STORIES.stories);
        localStorage.setItem(STORIES_KEY, JSON.stringify(COMPANY_STORIES.stories));
      }
    } else {
      setStories(COMPANY_STORIES.stories);
      localStorage.setItem(STORIES_KEY, JSON.stringify(COMPANY_STORIES.stories));
    }
    setIsLoading(false);
  }, []);

  // Check for scheduled stories periodically
  useEffect(() => {
    const checkScheduledStories = () => {
      const now = Date.now();
      let hasChanges = false;

      const updatedStories = stories.map(story => {
        if (story.scheduling) {
          // Story should be active
          if (now >= story.scheduling.startDate && now < story.scheduling.endDate) {
            if (story.status !== 'active') {
              hasChanges = true;
              return { ...story, status: 'active' as StoryStatus };
            }
          }
          // Story should be archived
          else if (now >= story.scheduling.endDate) {
            if (story.status !== 'archived') {
              hasChanges = true;
              return { ...story, status: 'archived' as StoryStatus };
            }
          }
          // Story is scheduled for future
          else if (now < story.scheduling.startDate) {
            if (story.status !== 'scheduled') {
              hasChanges = true;
              return { ...story, status: 'scheduled' as StoryStatus };
            }
          }
        }
        return story;
      });

      if (hasChanges) {
        setStories(updatedStories);
        localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
      }
    };

    // Check immediately and then every minute
    checkScheduledStories();
    const interval = setInterval(checkScheduledStories, 60000);

    return () => clearInterval(interval);
  }, [stories]);

  const addStory = (story: Story) => {
    // Set initial status based on scheduling
    if (story.scheduling) {
      const now = Date.now();
      if (now < story.scheduling.startDate) {
        story.status = 'scheduled';
      } else if (now >= story.scheduling.startDate && now < story.scheduling.endDate) {
        story.status = 'active';
      } else {
        story.status = 'archived';
      }
    }

    const updatedStories = [...stories, story];
    setStories(updatedStories);
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  };

  const updateStory = (updatedStory: Story) => {
    // Update status based on scheduling if present
    if (updatedStory.scheduling) {
      const now = Date.now();
      if (now < updatedStory.scheduling.startDate) {
        updatedStory.status = 'scheduled';
      } else if (now >= updatedStory.scheduling.startDate && now < updatedStory.scheduling.endDate) {
        updatedStory.status = 'active';
      } else {
        updatedStory.status = 'archived';
      }
    }

    const updatedStories = stories.map(story => 
      story.id === updatedStory.id ? updatedStory : story
    );
    setStories(updatedStories);
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  };

  const updateStoriesOrder = (reorderedStories: Story[]) => {
    setStories(reorderedStories);
    localStorage.setItem(STORIES_KEY, JSON.stringify(reorderedStories));
  };

  const archiveStory = (id: string) => {
    const updatedStories = stories.map(story => 
      story.id === id ? { ...story, status: 'archived' as StoryStatus } : story
    );
    setStories(updatedStories);
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  };

  const restoreStory = (id: string) => {
    const updatedStories = stories.map(story => {
      if (story.id === id) {
        // If story has scheduling, check dates
        if (story.scheduling) {
          const now = Date.now();
          if (now < story.scheduling.startDate) {
            return { ...story, status: 'scheduled' as StoryStatus };
          } else if (now >= story.scheduling.startDate && now < story.scheduling.endDate) {
            return { ...story, status: 'active' as StoryStatus };
          }
          // If past end date, keep archived
          return story;
        }
        // No scheduling, just set to active
        return { ...story, status: 'active' as StoryStatus };
      }
      return story;
    });
    setStories(updatedStories);
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  };

  return {
    stories,
    addStory,
    updateStory,
    updateStoriesOrder,
    archiveStory,
    restoreStory,
    isLoading
  };
}