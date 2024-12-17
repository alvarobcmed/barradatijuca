import React from 'react';
import { Play } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export function Logo({ variant = 'light', size = 'md', animated = true }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#6B0F6C]';
  
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 48,
    xl: 64
  };

  const containerStyles = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-5',
    xl: 'gap-6'
  };

  return (
    <div 
      className={`flex items-center ${containerStyles[size]} font-bold ${sizeClasses[size]}`}
      style={{ 
        fontFamily: "'Bricolage Grotesque', sans-serif",
        letterSpacing: '-0.03em'
      }}
    >
      <div className="relative">
        <div 
          className={`relative rounded-xl overflow-hidden transition-colors duration-300 ${
            variant === 'light' ? 'bg-[#FF0A7B]' : 'bg-[#6B0F6C]'
          }`}
          style={{
            width: iconSizes[size],
            height: iconSizes[size]
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Play
              size={iconSizes[size] * 0.6}
              className="text-white transform translate-x-0.5"
              strokeWidth={2}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <span 
          className={`font-black tracking-tight transition-colors duration-300 ${textColor}`}
        >
          Stry
        </span>
        <span 
          className={`font-black tracking-tight transition-colors duration-300 ${textColor}`}
        >
          .Live
        </span>
      </div>
    </div>
  );
}