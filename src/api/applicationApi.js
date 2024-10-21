import axios from './axios';
import { setAuthorizationHeader, setFormDataHeader, clearFormDataHeader } from './headers'; 

export const createApplication = async (applicationData, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/applications/', applicationData);
    return response.data;
  } catch (error) {
    // console.error('Error creating application:', error.response?.data || error.message);
    throw error; 
  } finally {
    clearFormDataHeader();
  }
};

export const getAllApplications = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/applications?${page}&${limit}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};

export const uploadFile = async (file) => {
  setAuthorizationHeader(""); // Clear any existing headers
  setFormDataHeader(); // Set form data headers if needed

  const data = new FormData(); // Create FormData object
  
  // Append the single file to the FormData object
  data.append('file', file); // Correctly append the file

  try {
    // POST the FormData object to the upload endpoint
    const response = await axios.post('/upload/file', data);
    return response; // Return the response for further handling
  } catch (error) {
    // Log the error and throw it for handling in the calling function
    throw error;
  } finally {
    clearFormDataHeader(); // Clean up headers after upload
  }
};


export const getUserApplication = async (token) => {
  setAuthorizationHeader(token); 
  try {
    const response = await axios.get(`/applications/my`);
    
    return response.data;
  } catch (error) {
    // console.error(`Error fetching application details:`, error.response?.data || error.message);
    throw error;
  }
};