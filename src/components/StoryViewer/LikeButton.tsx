import React from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onLike: () => void;
}

export function LikeButton({ likes, isLiked, onLike }: LikeButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onLike();
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isLiked
          ? 'bg-pink-500 text-white'
          : 'bg-black/30 backdrop-blur-sm text-white hover:bg-black/40'
      }`}
      aria-label={isLiked ? 'Unlike story' : 'Like story'}
    >
      <Heart
        size={20}
        className={`transition-transform duration-300 ${
          isLiked ? 'fill-current scale-110' : 'scale-100'
        }`}
      />
      <span className="text-sm font-medium">
        {likes.toLocaleString()}
      </span>
    </button>
  );
}