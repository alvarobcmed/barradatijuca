import { useState, useEffect } from 'react';

const COMPLETION_STORAGE_KEY = 'story_completion';

interface CompletionData {
  [storyId: string]: {
    views: number;
    completions: number;
  };
}

export function useStoryCompletion(storyId: string) {
  const [completionRate, setCompletionRate] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem(COMPLETION_STORAGE_KEY);
    const completionData: CompletionData = data ? JSON.parse(data) : {};
    
    if (storyId in completionData) {
      const { views, completions } = completionData[storyId];
      setViews(views);
      setCompletionRate(Math.round((completions / views) * 100));
    }
  }, [storyId]);

  const trackView = () => {
    const data = localStorage.getItem(COMPLETION_STORAGE_KEY);
    const completionData: CompletionData = data ? JSON.parse(data) : {};
    
    if (!(storyId in completionData)) {
      completionData[storyId] = { views: 0, completions: 0 };
    }
    
    completionData[storyId].views += 1;
    localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(completionData));
    
    setViews(completionData[storyId].views);
    setCompletionRate(
      Math.round((completionData[storyId].completions / completionData[storyId].views) * 100)
    );
  };

  const trackCompletion = () => {
    const data = localStorage.getItem(COMPLETION_STORAGE_KEY);
    const completionData: CompletionData = data ? JSON.parse(data) : {};
    
    if (!(storyId in completionData)) {
      completionData[storyId] = { views: 1, completions: 0 };
    }
    
    completionData[storyId].completions += 1;
    localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(completionData));
    
    setCompletionRate(
      Math.round((completionData[storyId].completions / completionData[storyId].views) * 100)
    );
  };

  return { completionRate, views, trackView, trackCompletion };
}