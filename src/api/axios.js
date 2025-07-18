// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api', // Make sure backend runs on port 3001
});

// Automatically add JWT token to Authorization header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
