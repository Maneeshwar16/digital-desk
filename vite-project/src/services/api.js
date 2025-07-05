import axios from 'axios';

const API_BASE_URL = 'https://digital-desk-1.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile'),
};

// Todo API calls
export const todoAPI = {
  getAll: () => api.get('/todos'),
  create: (todoData) => api.post('/todos', todoData),
  update: (id, todoData) => api.put(`/todos/${id}`, todoData),
  delete: (id) => api.delete(`/todos/${id}`),
  toggle: (id) => api.patch(`/todos/${id}/toggle`),
};

export default api; 