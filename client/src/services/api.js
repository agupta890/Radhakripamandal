import axios from 'axios';

const API = axios.create({
  baseURL: 'https://radhakripamandal.onrender.com/api',
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
