import React from 'react';
import { Link } from '../../../Link';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const variants = {
  primary: 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white hover:opacity-90',
  secondary: 'bg-white text-[#6B0F6C] hover:bg-gray-50',
  outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export function Button({ 
  href, 
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = ''
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}