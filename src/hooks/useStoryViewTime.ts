import { useState, useEffect, useRef } from 'react';

const VIEW_TIME_STORAGE_KEY = 'story_view_time';

interface ViewTimeData {
  [storyId: string]: {
    totalViewTime: number;
    viewCount: number;
    lastViewStart?: number;
  };
}

export function useStoryViewTime(storyId: string) {
  const [averageViewTime, setAverageViewTime] = useState(0);
  const [totalViewTime, setTotalViewTime] = useState(0);
  const viewStartTime = useRef<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem(VIEW_TIME_STORAGE_KEY);
    const viewTimeData: ViewTimeData = data ? JSON.parse(data) : {};
    
    if (storyId in viewTimeData) {
      const { totalViewTime, viewCount } = viewTimeData[storyId];
      setTotalViewTime(totalViewTime);
      setAverageViewTime(Math.round(totalViewTime / viewCount));
    }

    return () => {
      if (viewStartTime.current) {
        const viewDuration = Date.now() - viewStartTime.current;
        updateViewTime(viewDuration);
      }
    };
  }, [storyId]);

  const startViewing = () => {
    viewStartTime.current = Date.now();
  };

  const stopViewing = () => {
    if (viewStartTime.current) {
      const viewDuration = Date.now() - viewStartTime.current;
      updateViewTime(viewDuration);
      viewStartTime.current = null;
    }
  };

  const updateViewTime = (duration: number) => {
    const data = localStorage.getItem(VIEW_TIME_STORAGE_KEY);
    const viewTimeData: ViewTimeData = data ? JSON.parse(data) : {};
    
    if (!(storyId in viewTimeData)) {
      viewTimeData[storyId] = { totalViewTime: 0, viewCount: 0 };
    }
    
    viewTimeData[storyId].totalViewTime += duration;
    viewTimeData[storyId].viewCount += 1;
    
    localStorage.setItem(VIEW_TIME_STORAGE_KEY, JSON.stringify(viewTimeData));
    
    setTotalViewTime(viewTimeData[storyId].totalViewTime);
    setAverageViewTime(
      Math.round(viewTimeData[storyId].totalViewTime / viewTimeData[storyId].viewCount)
    );
  };

  return {
    averageViewTime,
    totalViewTime,
    startViewing,
    stopViewing
  };
}