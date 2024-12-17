import React from 'react';

export function HeroRating() {
  return (
    <div className="google-star">
      <div>
        <img src="/assets/images/google.png" alt="Google Rating" />
        <ul className="stars">
          {[...Array(5)].map((_, i) => (
            <li key={i}>
              <i className="fa-solid fa-star"></i>
            </li>
          ))}
          <li>(5.0)</li>
        </ul>
      </div>
    </div>
  );
}