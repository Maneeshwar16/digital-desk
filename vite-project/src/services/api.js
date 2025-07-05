// src/api/api.js

import axios from 'axios';

// ✅ Vercel API base path (no external domain needed)
const API_BASE_URL = '/api';

// 🔧 Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set to true only if using cookies/session
});

// 🛡️ Attach token to all requests (JWT-style auth)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//
// ================================
// 📦 Auth APIs (Vercel API Routes)
// ================================
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile'),
};

//
// ================================
// ✅ Todo APIs (Vercel API Routes)
// ================================
export const todoAPI = {
  getAll: () => api.get('/todos'),
  create: (todoData) => api.post('/todos', todoData),
  update: (id, todoData) => api.put(`/todos/${id}`, todoData),
  delete: (id) => api.delete(`/todos/${id}`),
  toggle: (id) => api.patch(`/todos/${id}/toggle`),
};

export default api;
