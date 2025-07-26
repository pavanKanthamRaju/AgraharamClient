import axios from 'axios';

// Create an instance
const apiClient = axios.create({
  baseURL: 'http://192.168.1.10:5080/api', // base API path
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Optionally add token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes globally
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized, maybe redirect to login.');
        // Optional: logout logic or redirect to login
      } else if (error.response.status >= 500) {
        console.error('Server error. Try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
