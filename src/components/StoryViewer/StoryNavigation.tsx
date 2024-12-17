import React from 'react';

interface StoryNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function StoryNavigation({ onPrevious, onNext }: StoryNavigationProps) {
  return (
    <div className="absolute inset-0 flex touch-none">
      <button
        className="w-1/2 h-full cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
      </button>
      <button
        className="w-1/2 h-full cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </button>
    </div>
  );
}