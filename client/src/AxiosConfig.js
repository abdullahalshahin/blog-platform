import axios from 'axios';

const BASE_URL = 'http://192.168.182.87:4040';

const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosConfig.interceptors.request.use((config) => {
    const auth_user_token = localStorage.getItem('AUTH_USER_TOKEN');

    if (auth_user_token) {
        config.headers.Authorization = `Bearer ${auth_user_token}`;
    }
    
    return config;
},
(error) => {
    return Promise.reject(error);
});

export default AxiosConfig;
