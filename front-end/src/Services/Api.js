import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
  baseURL: 'https://localhost:44343/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

Api.interceptors.request.use(config => {
  const tokenCookies = Cookies.get('token');

  if (tokenCookies) {
    const tokenData = JSON.parse(tokenCookies);
    config.headers['Authorization'] = tokenData.token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

Api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default Api;
