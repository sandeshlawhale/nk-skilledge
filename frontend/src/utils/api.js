const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
export const API_BASE_URL = `${BACKEND_URL}/api/v1`;

/**
 * Reads the JWT access token from Zustand's persisted localStorage state.
 * The backend returns the token on login; we store it in Zustand and read it here
 * to send as a Bearer header (the HttpOnly cookie approach doesn't work on HTTP localhost
 * because the backend sets secure:true on the cookie).
 */
const getToken = () => {
  try {
    const stored = localStorage.getItem('auth-storage');
    const parsed = JSON.parse(stored);
    return parsed?.state?.accessToken || null;
  } catch (_) {
    return null;
  }
};

import { useAuthStore } from '../store/auth';

/**
 * Authenticated fetch — automatically adds the Authorization Bearer token
 * and credentials:include on every request.
 */
export const authFetch = async (url, options = {}) => {
  const token = getToken();
  const { headers = {}, ...rest } = options;
  
  try {
    const response = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...rest,
    });

    if (response.status === 401) {
      // Clear auth state and redirect to login
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return response;
    }

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
