import axios from 'axios';

const api = axios.create({
    baseURL: "https://farbenai-server-service-1087119049852.us-central1.run.app",
    // timeout: 5000,
    headers: {
    },
});

// Add a request interceptor to add auth token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
