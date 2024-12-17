import React from 'react';
import { Logo } from '../Logo/Logo';

export function StoryCredits() {
  return (
    <a 
      href="https://stry.live" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors group"
      onClick={(e) => e.stopPropagation()}
    >
      <Logo variant="light" size="sm" animated={false} />
      <span className="text-white/90 text-sm font-medium group-hover:text-white">
        Tenha Stories no seu Site!
      </span>
    </a>
  );
}