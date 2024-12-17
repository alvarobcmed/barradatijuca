import React, { useRef, useEffect } from 'react';
import { Story } from '../../types/story';

interface StoryContentProps {
  story: Story;
  isMuted: boolean;
  onDurationChange?: (duration: number) => void;
}

export function StoryContent({ story, isMuted, onDurationChange }: StoryContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (story.type === 'video' && videoElement) {
      videoElement.muted = isMuted;
      
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.warn('Autoplay failed:', error);
          videoElement.muted = true;
          try {
            await videoElement.play();
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }
      };

      playVideo();

      return () => {
        videoElement.pause();
      };
    }
  }, [story, isMuted]);

  if (story.type === 'video') {
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black"
      >
        <video
          ref={videoRef}
          src={story.url}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          preload="auto"
          onLoadedMetadata={() => {
            const videoElement = videoRef.current;
            if (videoElement && onDurationChange) {
              onDurationChange(videoElement.duration * 1000);
              videoElement.muted = isMuted;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black"
    >
      <img
        src={story.url}
        alt="Story content"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}