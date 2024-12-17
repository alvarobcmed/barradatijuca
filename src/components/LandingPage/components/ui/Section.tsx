import React from 'react';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'gray' | 'gradient';
}

const backgrounds = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-[#6B0F6C] to-[#FF0A7B]'
};

export function Section({ 
  id,
  children, 
  className = '',
  containerClassName = '',
  background = 'white'
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`py-20 ${backgrounds[background]} ${className}`}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}