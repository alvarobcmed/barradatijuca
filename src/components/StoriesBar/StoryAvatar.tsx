import React from 'react';
import { StoryGroup } from '../../types/story';

interface StoryAvatarProps {
  story: StoryGroup;
  onClick: () => void;
}

export function StoryAvatar({ story, onClick }: StoryAvatarProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-20"
    >
      <div
        className={`rounded-full p-0.5 ${
          story.viewed ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 to-pink-500'
        }`}
      >
        <div className="bg-white p-0.5 rounded-full">
          <img
            src={story.userAvatar}
            alt={story.username}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-700 truncate w-full text-center">
        {story.username}
      </span>
    </button>
  );
}