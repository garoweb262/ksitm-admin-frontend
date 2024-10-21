import axios from './axios';

// Function to set the Authorization header
export const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Function to set custom headers that don't require authorization
export const setCustomHeader = (headerName, headerValue) => {
  if (headerName && headerValue) {
    axios.defaults.headers.common[headerName] = headerValue; // Set the custom header
  } else {
    throw new Error('Both header name and value are required'); // Handle error
  }
};

// Function to clear custom headers if needed
export const clearCustomHeader = (headerName) => {
  if (headerName) {
    delete axios.defaults.headers.common[headerName]; // Remove the custom header
  } else {
    throw new Error('Header name is required to clear'); // Handle error
  }
};

// Function to set headers specifically for FormData
export const setFormDataHeader = () => {
  axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
};

// Optionally, clear the FormData header if needed
export const clearFormDataHeader = () => {
  delete axios.defaults.headers.common['Content-Type'];
};
