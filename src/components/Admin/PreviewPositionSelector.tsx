import React, { useRef, useState, useEffect } from 'react';
import { AdminSettings } from '../../types/admin';
import { Move, ArrowDownRight, ArrowDownLeft, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { getPositionStyles } from '../../utils/position';
import { usePreviewDrag } from '../../hooks/usePreviewDrag';

interface PreviewPositionSelectorProps {
  value: AdminSettings['previewPosition'];
  size: AdminSettings['previewSize'];
  onChange: (position: AdminSettings['previewPosition']) => void;
}

const presetPositions = [
  { id: 'bottom-right', icon: ArrowDownRight, label: 'Inferior Direito' },
  { id: 'bottom-left', icon: ArrowDownLeft, label: 'Inferior Esquerdo' },
  { id: 'top-right', icon: ArrowUpRight, label: 'Superior Direito' },
  { id: 'top-left', icon: ArrowUpLeft, label: 'Superior Esquerdo' }
] as const;

export function PreviewPositionSelector({ value, size, onChange }: PreviewPositionSelectorProps) {
  const [isCustomMode, setIsCustomMode] = useState(value.type === 'custom');
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isCustomMode) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate position as percentage of container
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setDragPosition({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Update position only when drag ends
    onChange({
      type: 'custom',
      x: Math.max(0, Math.min(100, dragPosition.x)),
      y: Math.max(0, Math.min(100, dragPosition.y))
    });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleModeChange = (newMode: AdminSettings['previewPosition']) => {
    if (newMode.type === 'custom') {
      setIsCustomMode(true);
      onChange({ type: 'custom', x: 50, y: 50 });
    } else {
      setIsCustomMode(false);
      onChange(newMode);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 mb-4 px-4">
        {presetPositions.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => handleModeChange({ type: 'fixed', preset: id })}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              value.type === 'fixed' && value.preset === id
                ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
        
        <button
          onClick={() => handleModeChange({ type: 'custom', x: 50, y: 50 })}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
            value.type === 'custom'
              ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white shadow-lg'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Move className="w-4 h-4" />
          <span>Personalizado</span>
        </button>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[400px] bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden mx-4"
      >
        {/* Preview content */}
        <div className="w-full h-full">
          {/* Header */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
            <div className="w-32 h-8 bg-gray-200 rounded" />
            <div className="ml-auto space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="inline-block w-20 h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center px-4">
            <div className="max-w-2xl">
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video bg-gray-100 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Draggable Preview */}
        <div
          ref={previewRef}
          style={{
            ...getPositionStyles(value, size),
            cursor: isCustomMode ? 'move' : 'default'
          }}
          className={`
            bg-gradient-to-br from-[#6B0F6C] to-[#FF0A7B] rounded-lg overflow-hidden shadow-lg 
            transition-all duration-200
            ${isDragging ? 'shadow-xl scale-105' : ''}
          `}
          onMouseDown={isCustomMode ? handleMouseDown : undefined}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Move className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2 px-4">
        {isCustomMode
          ? 'Arraste o preview para posicioná-lo onde desejar'
          : 'Selecione uma das posições predefinidas ou escolha "Personalizado" para posicionar livremente'
        }
      </p>
    </div>
  );
}