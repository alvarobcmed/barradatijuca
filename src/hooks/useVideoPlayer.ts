import { useRef, useEffect } from 'react';

export function useVideoPlayer(isMuted: boolean, onDurationChange?: (duration: number) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

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
  }, [isMuted]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !onDurationChange) return;

    const handleLoadedMetadata = () => {
      onDurationChange(videoElement.duration * 1000);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onDurationChange]);

  return videoRef;
}