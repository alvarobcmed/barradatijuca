import React from 'react';
import { 
  Shield, 
  UserCheck, 
  BarChart2, 
  Puzzle,
  Zap
} from 'lucide-react';

interface FeatureIconProps {
  name: 'security' | 'interface' | 'analytics' | 'integration' | 'support';
  size?: number;
  className?: string;
}

export function FeatureIcon({ name, size = 48, className = '' }: FeatureIconProps) {
  const iconStyle = {
    width: size,
    height: size,
    strokeWidth: 1.5,
    className: `${className} transition-transform duration-300 group-hover:scale-110`
  };

  const icons = {
    security: (
      <Shield 
        {...iconStyle}
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          padding: '12px',
          borderRadius: '50%',
          color: 'white'
        }}
      />
    ),
    interface: (
      <UserCheck 
        {...iconStyle}
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          padding: '12px',
          borderRadius: '50%',
          color: 'white'
        }}
      />
    ),
    analytics: (
      <BarChart2 
        {...iconStyle}
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          padding: '12px',
          borderRadius: '50%',
          color: 'white'
        }}
      />
    ),
    integration: (
      <Puzzle 
        {...iconStyle}
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          padding: '12px',
          borderRadius: '50%',
          color: 'white'
        }}
      />
    ),
    support: (
      <Zap 
        {...iconStyle}
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          padding: '12px',
          borderRadius: '50%',
          color: 'white'
        }}
      />
    )
  };

  return (
    <div className="group relative">
      {icons[name]}
      <div 
        className="absolute inset-0 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #FF0A7B 0%, #6B0F6C 100%)',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}