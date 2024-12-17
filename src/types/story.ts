```typescript
export type StoryType = 'image' | 'video';
export type StoryStatus = 'active' | 'archived' | 'scheduled';

export interface Story {
  id: string;
  type: StoryType;
  url: string;
  username: string;
  userAvatar: string;
  timestamp: number;
  duration?: number;
  likes: number;
  status: StoryStatus;
  whatsapp?: {
    number: string;
    message: string;
  };
  scheduling?: {
    startDate: number; // Unix timestamp
    endDate: number; // Unix timestamp
  };
}

export interface CompanyStories {
  companyId: string;
  companyName: string;
  companyLogo: string;
  stories: Story[];
}
```