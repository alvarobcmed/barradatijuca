import { useEffect } from 'react';

interface KeyboardControlsProps {
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onMuteToggle: () => void;
}

export function useKeyboardControls({
  onClose,
  onNext,
  onPrevious,
  onMuteToggle
}: KeyboardControlsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'm':
          onMuteToggle();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrevious, onMuteToggle]);
}