import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.MIX_APP_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;