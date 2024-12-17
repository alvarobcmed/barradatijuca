import { useState, useEffect, useCallback } from 'react';

const LIKES_STORAGE_KEY = 'story_likes';
const LIKED_STORIES_KEY = 'liked_stories';

interface LikesStorage {
  [storyId: string]: number;
}

export function useLikes(storyId: string, initialLikes: number = 0) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likesData = localStorage.getItem(LIKES_STORAGE_KEY);
    const likedStories = localStorage.getItem(LIKED_STORIES_KEY);
    
    if (likesData) {
      const parsedLikes: LikesStorage = JSON.parse(likesData);
      if (storyId in parsedLikes) {
        setLikes(parsedLikes[storyId]);
      } else {
        parsedLikes[storyId] = initialLikes;
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(parsedLikes));
        setLikes(initialLikes);
      }
    } else {
      const initialData = { [storyId]: initialLikes };
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(initialData));
      setLikes(initialLikes);
    }

    if (likedStories) {
      const parsedLikedStories: string[] = JSON.parse(likedStories);
      setIsLiked(parsedLikedStories.includes(storyId));
    }
  }, [storyId, initialLikes]);

  const toggleLike = useCallback(() => {
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1;
        
        const likesData = localStorage.getItem(LIKES_STORAGE_KEY);
        const updatedLikes: LikesStorage = likesData ? JSON.parse(likesData) : {};
        updatedLikes[storyId] = newLikes;
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(updatedLikes));
        
        return newLikes;
      });

      const likedStories = localStorage.getItem(LIKED_STORIES_KEY);
      const updatedLikedStories: string[] = likedStories ? JSON.parse(likedStories) : [];
      
      if (newIsLiked) {
        if (!updatedLikedStories.includes(storyId)) {
          updatedLikedStories.push(storyId);
        }
      } else {
        const index = updatedLikedStories.indexOf(storyId);
        if (index > -1) {
          updatedLikedStories.splice(index, 1);
        }
      }
      
      localStorage.setItem(LIKED_STORIES_KEY, JSON.stringify(updatedLikedStories));
      
      return newIsLiked;
    });
  }, [storyId]);

  return { likes, isLiked, toggleLike };
}