import axios from 'axios';
import { signOut } from 'firebase/auth';
import customAlert from '../utils/CustomAlert';
import auth from './firebase';

// const url = 'http://localhost:5000';
const url = 'https://firetools-server.up.railway.app/';
const authFetch = axios.create({
  baseURL: url,
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('fire_token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      signOut(auth);
      localStorage.removeItem('fire_token');
      customAlert('error', error.response.data.message || 'Login to continue');
    }

    if (error.response.status === 404) {
      customAlert('warning', error.response.data.message || 'Not found');
    }

    if (error.response.status === 400) {
      customAlert('warning', error.response.data.message || 'Bad request');
    }

    return Promise.reject(error);
  }
);

export default authFetch;
