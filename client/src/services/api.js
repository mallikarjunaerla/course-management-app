import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // Remove default Content-Type to allow axios to set it for FormData
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
