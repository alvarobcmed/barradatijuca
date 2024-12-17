import React from 'react';
import { Story } from '../../types/story';
import { X, Volume2, VolumeX } from 'lucide-react';

interface StoryHeaderProps {
  story: Story;
  isMuted: boolean;
  onMuteToggle: () => void;
  onClose: () => void;
}

export function StoryHeader({ story, isMuted, onMuteToggle, onClose }: StoryHeaderProps) {
  return (
    <>
      {/* Controls */}
      <div className="absolute top-14 right-4 flex items-center gap-4 z-50">
        {story.type === 'video' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMuteToggle();
            }}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      {/* User info */}
      <div className="absolute top-14 left-4 flex items-center gap-3 z-50 p-2 rounded-full bg-black/30 backdrop-blur-sm">
        <img
          src={story.userAvatar}
          alt={story.username}
          className="w-8 h-8 rounded-full border-2 border-white/50"
        />
        <span className="text-white font-medium text-sm sm:text-base pr-3">
          {story.username}
        </span>
      </div>
    </>
  );
}