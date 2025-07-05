// src/api/api.js

import axios from 'axios';

// ✅ Backend base URL (Render)
const API_BASE_URL = 'https://digital-desk-1.onrender.com/api';

// 🔧 Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: Only if backend uses cookies
});

// 🛡️ Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//
// ================================
// 📦 Auth APIs
// ================================
//

export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   */
  register: (userData) => api.post('/users/register', userData),

  /**
   * Login user
   * @param {Object} userData - { email, password }
   */
  login: (userData) => api.post('/users/login', userData),

  /**
   * Get logged-in user profile (needs token)
   */
  getProfile: () => api.get('/users/profile'),
};

//
// ================================
// ✅ Todo APIs
// ================================
//

export const todoAPI = {
  /**
   * Get all todos for the logged-in user
   */
  getAll: () => api.get('/todos'),

  /**
   * Create a new todo
   * @param {Object} todoData - { title, description }
   */
  create: (todoData) => api.post('/todos', todoData),

  /**
   * Update an existing todo
   * @param {string} id - Todo ID
   * @param {Object} todoData - updated fields
   */
  update: (id, todoData) => api.put(`/todos/${id}`, todoData),

  /**
   * Delete a todo
   * @param {string} id - Todo ID
   */
  delete: (id) => api.delete(`/todos/${id}`),

  /**
   * Toggle complete/incomplete state
   * @param {string} id - Todo ID
   */
  toggle: (id) => api.patch(`/todos/${id}/toggle`),
};

export default api;
