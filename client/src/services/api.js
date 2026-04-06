import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fintrack_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally → auto logout
API.interceptors.response.use(
  (response) => {
    // If the server returns HTML (e.g., a proxy 404 falling back to index.html), reject it
    const contentType = response.headers['content-type'];
    if (contentType && contentType.toLowerCase().includes('text/html')) {
      return Promise.reject(new Error('Received HTML instead of JSON. Check the API URL or server proxy.'));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fintrack_token');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
