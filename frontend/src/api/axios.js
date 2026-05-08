import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Sesuaikan dengan URL Laravel kamu
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
// Tambahkan interceptor untuk menyisipkan token Bearer
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;