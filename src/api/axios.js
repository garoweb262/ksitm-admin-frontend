// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: 'https://api.ksitm.xpressease.com/api/v1',
});

export default instance;
