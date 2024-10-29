// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: 'http://157.173.200.21:8000/api/v1',
});

export default instance;
