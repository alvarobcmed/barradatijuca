import { useState, useEffect, useCallback } from 'react';
import { AdminSettings } from '../types/admin';

const VISITOR_POSITION_KEY = 'visitor_preview_position';

export function useVisitorPreferences() {
  const [visitorPosition, setVisitorPosition] = useState<AdminSettings['previewPosition'] | null>(() => {
    try {
      const saved = localStorage.getItem(VISITOR_POSITION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading visitor position:', error);
      return null;
    }
  });

  const updateVisitorPosition = useCallback((x: number, y: number) => {
    const newPosition: AdminSettings['previewPosition'] = {
      type: 'custom',
      x: Math.round(Math.max(0, Math.min(100, x))),
      y: Math.round(Math.max(0, Math.min(100, y)))
    };
    
    setVisitorPosition(newPosition);
    localStorage.setItem(VISITOR_POSITION_KEY, JSON.stringify(newPosition));
  }, []);

  const resetVisitorPosition = useCallback(() => {
    setVisitorPosition(null);
    localStorage.removeItem(VISITOR_POSITION_KEY);
  }, []);

  return {
    visitorPosition,
    updateVisitorPosition,
    resetVisitorPosition
  };
}