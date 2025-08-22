// src/api/api.js

import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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

export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile'),
};

export const todoAPI = {
  getAll: () => api.get('/todos', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  create: (todoData) => api.post('/todos', todoData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  update: (id, todoData) => api.put(`/todos/${id}`, todoData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  delete: (id) => api.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  toggle: (id) => api.patch(`/todos/${id}/toggle`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
};

export default api;
