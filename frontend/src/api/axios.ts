import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { mockModels } from './mockData';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    config.headers['X-Mock-Request'] = 'true';
  }
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Cloudflare Pages veya lokalde backend yoksa fake json döndür
    if (import.meta.env.VITE_USE_MOCK === 'true') {
      const url = error.config?.url;
      if (url && url.includes('/public/models')) {
        return Promise.resolve({ data: { data: mockModels }, status: 200, statusText: 'OK', headers: {}, config: error.config });
      }
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
