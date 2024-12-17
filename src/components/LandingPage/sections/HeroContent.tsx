import React from 'react';
import { HeroRating } from './HeroRating';
import { HeroSocialIcons } from './HeroSocialIcons';

export function HeroContent() {
  return (
    <div className="hero-text">
      <h1>
        Revolucione o engajamento do seu site com o <span>Stry Live</span>
      </h1>
      <p>
        Transforme visitantes em clientes fiéis com histórias envolventes e transmissões ao vivo cativantes.
      </p>
      
      <div className="google-star">
        <HeroRating />
        <HeroSocialIcons />
      </div>
    </div>
  );
}