import React, { useState, useEffect } from 'react';
import { Story } from '../../types/story';
import { StoryProgress } from './StoryProgress';
import { StoryContent } from './StoryContent';
import { StoryHeader } from './StoryHeader';
import { StoryNavigation } from './StoryNavigation';
import { WhatsAppButton } from './WhatsAppButton';
import { LikeButton } from './LikeButton';
import { StoryCredits } from './StoryCredits';
import { useLikes } from '../../hooks/useLikes';

interface StoryViewProps {
  stories: Story[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  embedded?: boolean;
  defaultMuted?: boolean;
}

export function StoryView({ stories, currentIndex, onNext, onPrevious, onClose, embedded = false, defaultMuted = false }: StoryViewProps) {
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const currentStory = stories[currentIndex];
  const defaultDuration = 5000;
  const [duration, setDuration] = useState(currentStory.duration || defaultDuration);
  const { likes, isLiked, toggleLike } = useLikes(currentStory.id, currentStory.likes);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (embedded) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'm') setIsMuted(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrevious, embedded]);

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (embedded) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${embedded ? 'absolute' : 'fixed'} inset-0 bg-black/90 ${!embedded && 'backdrop-blur-sm'} z-50 flex items-center justify-center ${!embedded && 'p-4 md:p-8'}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative w-full ${!embedded && 'max-w-[500px]'} aspect-[9/16] bg-black ${!embedded && 'rounded-lg'} overflow-hidden ${!embedded && 'shadow-2xl'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-50">
          {stories.map((_, index) => (
            <StoryProgress
              key={index}
              duration={duration}
              currentIndex={currentIndex}
              index={index}
              onComplete={onNext}
            />
          ))}
        </div>

        <StoryHeader
          story={currentStory}
          isMuted={isMuted}
          onMuteToggle={() => setIsMuted(prev => !prev)}
          onClose={onClose}
        />

        {/* Story content */}
        <div className="absolute inset-0">
          <StoryContent
            story={currentStory}
            isMuted={isMuted}
            onDurationChange={handleDurationChange}
          />
        </div>

        <StoryNavigation
          onPrevious={onPrevious}
          onNext={onNext}
        />

        {/* Action buttons */}
        <div className="absolute bottom-20 left-4 right-4 flex items-center justify-between z-50">
          <LikeButton
            likes={likes}
            isLiked={isLiked}
            onLike={toggleLike}
          />
          
          {currentStory.whatsapp && (
            <WhatsAppButton
              phoneNumber={currentStory.whatsapp.number}
              message={currentStory.whatsapp.message}
            />
          )}
        </div>

        {/* Credits */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center z-50">
          <StoryCredits />
        </div>
      </div>
    </div>
  );
}