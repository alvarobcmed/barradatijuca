import { CompanyStories } from '../types/story';

export const COMPANY_STORIES: CompanyStories = {
  companyId: '1',
  companyName: 'TechCorp Solutions',
  companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
  stories: [
    {
      id: '1',
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      username: 'tech_reviews',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      timestamp: Date.now(),
      duration: 15000,
      likes: 245,
      status: 'active',
      whatsapp: {
        number: '5511999134744',
        message: 'Olá, estou interessado em saber mais sobre o produto!'
      }
    },
    {
      id: '2',
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      username: 'tech_reviews',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      timestamp: Date.now(),
      duration: 15000,
      likes: 189,
      status: 'active',
      whatsapp: {
        number: '5511999134744',
        message: 'Olá, estou interessado em saber mais sobre o produto!'
      }
    },
    {
      id: '3',
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      username: 'nature_clips',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      timestamp: Date.now(),
      duration: 15000,
      likes: 312,
      status: 'active',
      whatsapp: {
        number: '5511999134744',
        message: 'Olá, estou interessado em saber mais sobre o produto!'
      }
    },
    {
      id: '4',
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      username: 'travel_moments',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      timestamp: Date.now(),
      duration: 15000,
      likes: 167,
      status: 'active',
      whatsapp: {
        number: '5511999134744',
        message: 'Olá, estou interessado em saber mais sobre o produto!'
      }
    }
  ]
};