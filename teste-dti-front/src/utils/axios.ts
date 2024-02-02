import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5155/api',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export { http };