import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Your API base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
