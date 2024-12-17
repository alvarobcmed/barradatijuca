import React, { useEffect, useState } from 'react';

interface StoryProgressProps {
  duration: number;
  currentIndex: number;
  index: number;
  onComplete: () => void;
}

export function StoryProgress({ duration, currentIndex, index, onComplete }: StoryProgressProps) {
  const [progress, setProgress] = useState(0);
  const isActive = currentIndex === index;

  useEffect(() => {
    if (!isActive) {
      setProgress(currentIndex > index ? 100 : 0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress === 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete, currentIndex, index]);

  return (
    <div className="h-1 bg-gray-300/30 rounded-full overflow-hidden flex-1 mx-1">
      <div
        className="h-full bg-white transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}