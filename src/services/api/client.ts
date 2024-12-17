import axios from 'axios';
import { getApiConfig } from '../../config/api';

export async function createApiClient() {
  const config = await getApiConfig();
  
  const client = axios.create({
    ...config,
    timeout: 30000,
    withCredentials: true
  });

  // Request interceptor
  client.interceptors.request.use(
    async (config) => {
      // Refresh config on each request to ensure latest auth token
      const latestConfig = await getApiConfig();
      config.headers = {
        ...config.headers,
        ...latestConfig.headers
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle token refresh or redirect to login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
}