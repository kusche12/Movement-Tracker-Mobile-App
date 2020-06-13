import axios from 'axios';
import { AsyncStorage } from 'react-native';


// Replace this URL every 8 hours
const instance = axios.create({
    baseURL: 'http://fc94f7918e20.ngrok.io'
});

// automatic call any time we make a request
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;