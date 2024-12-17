import React from 'react';
import { StoryGroup } from '../../types/story';
import { StoryAvatar } from './StoryAvatar';

interface StoriesBarProps {
  stories: StoryGroup[];
  onStoryClick: (storyGroup: StoryGroup) => void;
}

export function StoriesBar({ stories, onStoryClick }: StoriesBarProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-4">
        {stories.map((storyGroup) => (
          <StoryAvatar
            key={storyGroup.userId}
            story={storyGroup}
            onClick={() => onStoryClick(storyGroup)}
          />
        ))}
      </div>
    </div>
  );
}