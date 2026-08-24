import axios from 'axios';

// Use VITE_API_URL from environment or default to production Render backend
const baseURL = import.meta.env.VITE_API_URL || 'https://radhakripamandal.onrender.com/api';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('rkm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
