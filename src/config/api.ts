import { getAuth } from 'firebase/auth';

const API_URL = 'https://api.stry.live';

export async function getApiConfig() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  return {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user ? `Bearer ${await user.getIdToken()}` : undefined,
      'X-API-Version': '1.0'
    }
  };
}

export const corsConfig = {
  origin: [
    'https://stry.live',
    'https://*.stry.live',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:5173'] : [])
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-Version',
    'X-Request-ID'
  ],
  credentials: true,
  maxAge: 86400 // 24 hours
};