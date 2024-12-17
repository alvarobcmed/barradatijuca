import React from 'react';
import { Story } from '../../types/story';
import { Volume2, VolumeX } from 'lucide-react';

interface StoryControlsProps {
  story: Story;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export function StoryControls({ story, isMuted, onMuteToggle }: StoryControlsProps) {
  if (story.type !== 'video') return null;

  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-4 z-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMuteToggle();
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="text-sm font-medium">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>
      </button>
    </div>
  );
}