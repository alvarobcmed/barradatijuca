import React from 'react';

export function HeroImage() {
  return (
    <div className="hero-img">
      <img 
        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=1400&fit=crop&q=85" 
        srcSet="
          https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=700&fit=crop&q=85 600w,
          https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&h=1050&fit=crop&q=85 900w,
          https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=1400&fit=crop&q=85 1200w
        "
        sizes="(max-width: 600px) 600px,
               (max-width: 900px) 900px,
               1200px"
        alt="Hero"
        className="w-full h-auto object-cover"
        loading="eager"
      />
    </div>
  );
}