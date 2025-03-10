// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_LIVE_BASE_URL,
});

export default instance;
