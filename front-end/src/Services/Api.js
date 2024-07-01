import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
  baseURL: 'https://localhost:44343/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Interceptor para adicionar o token de autenticação
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

export default Api;
