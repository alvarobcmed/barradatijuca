import { useState, useCallback, useEffect, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startPosition: Position | null;
  currentPosition: Position;
}

interface UsePreviewDragProps {
  containerRef: RefObject<HTMLElement>;
  previewRef: RefObject<HTMLElement>;
  onPositionChange?: (position: Position) => void;
  bounds?: boolean;
}

export function usePreviewDrag({
  containerRef,
  previewRef,
  onPositionChange,
  bounds = true
}: UsePreviewDragProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: null,
    currentPosition: { x: 0, y: 0 }
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!previewRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const previewRect = previewRef.current.getBoundingClientRect();

    setDragState({
      isDragging: true,
      startPosition: {
        x: e.clientX - (previewRect.left - containerRect.left),
        y: e.clientY - (previewRect.top - containerRect.top)
      },
      currentPosition: {
        x: previewRect.left - containerRect.left,
        y: previewRect.top - containerRect.top
      }
    });
  }, [previewRef, containerRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (!dragState.isDragging || !dragState.startPosition || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    let x = e.clientX - dragState.startPosition.x;
    let y = e.clientY - dragState.startPosition.y;

    if (bounds) {
      const previewWidth = previewRef.current?.offsetWidth || 0;
      const previewHeight = previewRef.current?.offsetHeight || 0;
      
      x = Math.max(0, Math.min(x, containerRect.width - previewWidth));
      y = Math.max(0, Math.min(y, containerRect.height - previewHeight));
    }

    const position = { x, y };
    setDragState(prev => ({
      ...prev,
      currentPosition: position
    }));
    onPositionChange?.(position);
  }, [dragState.isDragging, dragState.startPosition, containerRef, previewRef, bounds, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({
      ...prev,
      isDragging: false,
      startPosition: null
    }));
  }, []);

  const resetPosition = useCallback(() => {
    setDragState({
      isDragging: false,
      startPosition: null,
      currentPosition: { x: 0, y: 0 }
    });
  }, []);

  return {
    isDragging: dragState.isDragging,
    position: dragState.currentPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetPosition
  };
}