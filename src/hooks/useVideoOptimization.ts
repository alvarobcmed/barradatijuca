import { useCallback } from 'react';

interface VideoMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  isVertical: boolean;
}

export function useVideoOptimization() {
  const handleVideoError = useCallback((error: Error) => {
    console.error('Video playback error:', error);
  }, []);

  const getVideoMetadata = useCallback((videoElement: HTMLVideoElement): Promise<VideoMetadata> => {
    return new Promise((resolve) => {
      const handleLoadedMetadata = () => {
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        const aspectRatio = width / height;
        const isVertical = height > width;

        resolve({
          width,
          height,
          aspectRatio,
          isVertical
        });
      };

      if (videoElement.readyState >= 2) {
        handleLoadedMetadata();
      } else {
        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      }
    });
  }, []);

  const optimizePlayback = useCallback(async (videoElement: HTMLVideoElement) => {
    try {
      // Get video metadata
      const metadata = await getVideoMetadata(videoElement);
      
      // Optimize container based on video orientation
      const container = videoElement.parentElement;
      if (container) {
        container.style.width = '100%';
        container.style.height = '100%';
        
        // Force vertical aspect ratio
        const parentContainer = container.parentElement;
        if (parentContainer) {
          parentContainer.style.aspectRatio = '9/16';
        }

        // Set video styles
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = metadata.isVertical ? 'contain' : 'cover';
        videoElement.style.backgroundColor = 'black';
      }

      // Essential mobile attributes
      videoElement.setAttribute('playsinline', 'true');
      videoElement.setAttribute('webkit-playsinline', 'true');
      videoElement.setAttribute('x5-playsinline', 'true');
      videoElement.setAttribute('x5-video-player-type', 'h5');
      videoElement.setAttribute('x5-video-player-fullscreen', 'true');
      videoElement.setAttribute('x5-video-orientation', 'portrait');
      
      // Enable hardware acceleration
      videoElement.style.transform = 'translateZ(0)';
      videoElement.style.webkitTransform = 'translateZ(0)';
      
      // Optimize loading strategy
      videoElement.preload = 'auto';
      videoElement.load();

      // Set video quality based on network and device capabilities
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          const saveData = connection.saveData;
          
          if (saveData || effectiveType === '2g' || effectiveType === '3g') {
            videoElement.setAttribute('data-quality', 'low');
          } else if (effectiveType === '4g') {
            videoElement.setAttribute('data-quality', 'high');
          }
        }
      }

      // Start playback
      try {
        await videoElement.play();
      } catch (playError) {
        console.warn('Initial play failed, waiting for user interaction:', playError);
        
        const playOnInteraction = () => {
          videoElement.play().catch(handleVideoError);
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
        };
        
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      }
    } catch (error) {
      throw new Error('Failed to optimize video playback: ' + error);
    }
  }, [handleVideoError, getVideoMetadata]);

  return { handleVideoError, optimizePlayback, getVideoMetadata };
}