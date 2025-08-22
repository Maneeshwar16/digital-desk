// src/api/api.js

import axios from 'axios';

const API_BASE_URL = 'https://parseapi.back4app.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Parse-Application-Id': 'KRQaCthAl6XnYohTyMo0n0UN9p1PSMlAXFTaeiY5',
    'X-Parse-Client-Key': 'gAR6PS3FwuIIQaazU4ZpEh21KLbjuX3Xz86DNMGN',
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Changed to false for Parse Server
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
  register: (userData) => api.post('/users', userData),
  login: (userData) => api.post('/login', userData),
  getProfile: () => api.get('/users/me', {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
};

export const todoAPI = {
  getAll: () => api.get('/classes/Todo', {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
  create: (todoData) => api.post('/classes/Todo', todoData, {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
  update: (id, todoData) => api.put(`/classes/Todo/${id}`, todoData, {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
  delete: (id) => api.delete(`/classes/Todo/${id}`, {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
  toggle: (id, isDone) => api.put(`/classes/Todo/${id}`, { isDone }, {
    headers: {
      'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
    },
  }),
};

export default api;
