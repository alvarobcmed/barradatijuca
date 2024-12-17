import React, { useState, useEffect, useRef } from 'react';
import { Story, CompanyStories } from '../../types/story';
import { AdminSettings } from '../../types/admin';
import { getPositionStyles } from '../../utils/position';

interface StoriesPreviewProps {
  companyStories: CompanyStories;
  onStoryClick: (stories: Story[]) => void;
  position: AdminSettings['previewPosition'];
  size: AdminSettings['previewSize'];
  autoPlay?: boolean;
}

export function StoriesPreview({ 
  companyStories, 
  onStoryClick,
  position,
  size,
  autoPlay = true
}: StoriesPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const currentStory = companyStories.stories[activeIndex];

  // Get position styles
  const positionStyles = getPositionStyles(position, size);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % companyStories.stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [companyStories.stories.length, autoPlay]);

  useEffect(() => {
    if (currentStory.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Silent catch - preview is always muted
      });
    }
  }, [currentStory]);

  return (
    <div 
      ref={previewRef}
      className={`fixed bg-black rounded-lg overflow-hidden shadow-lg ${
        isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
      } transition-all duration-300 z-50`}
      style={positionStyles}
      onClick={(e) => {
        if (!isDragging) {
          onStoryClick(companyStories.stories);
        }
      }}
    >
      <div className="relative w-full h-full">
        {currentStory.type === 'video' ? (
          <video
            ref={videoRef}
            src={currentStory.url}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            loop
          />
        ) : (
          <img
            src={currentStory.url}
            alt="Story preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{ width: '100%' }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <img
              src={companyStories.companyLogo}
              alt={companyStories.companyName}
              className="w-6 h-6 rounded-full border border-white/50"
            />
            <span className="text-white text-sm font-medium truncate">
              {companyStories.companyName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}