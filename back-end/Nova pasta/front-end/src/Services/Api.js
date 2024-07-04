import axios from 'axios';

// Configurações básicas do axios
const Api = axios.create({
  baseURL: 'https://localhost:44343/api',
  headers: {
    'Content-Type': 'application/json'    
  },
});

export default Api;
