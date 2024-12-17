import { AdminSettings } from '../types/admin';

export function getPositionStyles(
  position: AdminSettings['previewPosition'],
  size?: AdminSettings['previewSize']
): React.CSSProperties {
  // For custom positions
  if (position.type === 'custom' && typeof position.x === 'number' && typeof position.y === 'number') {
    return {
      position: 'fixed',
      left: `${Math.max(0, Math.min(100, position.x))}%`,
      top: `${Math.max(0, Math.min(100, position.y))}%`,
      transform: 'translate(-50%, -50%)',
      width: size ? `${size.width}px` : undefined,
      height: size ? `${size.height}px` : undefined
    };
  }

  // For preset positions
  const preset = position.type === 'fixed' ? position.preset : 'bottom-right';
  
  const baseStyles = {
    position: 'fixed' as const,
    margin: 0,
    width: size ? `${size.width}px` : undefined,
    height: size ? `${size.height}px` : undefined
  }; 

  switch (preset) {
    case 'bottom-right':
      return {
        ...baseStyles,
        bottom: '16px',
        right: '16px'
      };
    case 'bottom-left':
      return {
        ...baseStyles,
        bottom: '16px',
        left: '16px'
      };
    case 'top-right':
      return {
        ...baseStyles,
        top: '16px',
        right: '16px'
      };
    case 'top-left':
      return {
        ...baseStyles,
        top: '16px',
        left: '16px'
      };
    case 'center-right':
      return {
        ...baseStyles,
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
      };
    case 'center-left':
      return {
        ...baseStyles,
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
      };
    default:
      return {
        ...baseStyles,
        bottom: 0,
        right: 0
      };
  }
}