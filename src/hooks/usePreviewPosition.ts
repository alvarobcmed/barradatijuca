import { useState, useEffect, useCallback } from 'react';
import { AdminSettings } from '../types/admin';

const POSITION_STORAGE_KEY = 'preview_position';

export function usePreviewPosition() {
  const [position, setPosition] = useState<AdminSettings['previewPosition']>(() => {
    try {
      const saved = localStorage.getItem(POSITION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        type: 'fixed',
        preset: 'bottom-right'
      };
    } catch (error) {
      console.error('Error loading preview position:', error);
      return {
        type: 'fixed',
        preset: 'bottom-right'
      };
    }
  });

  const updatePosition = useCallback((newPosition: AdminSettings['previewPosition']) => {
    setPosition(newPosition);
    localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(newPosition));
  }, []);

  const resetPosition = useCallback(() => {
    const defaultPosition = {
      type: 'fixed' as const,
      preset: 'bottom-right' as const
    };
    setPosition(defaultPosition);
    localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(defaultPosition));
  }, []);

  return {
    position,
    updatePosition,
    resetPosition
  };
}