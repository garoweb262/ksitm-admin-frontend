import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers'; 

export const createUser = async (applicantData) => {
  setAuthorizationHeader("");
  try {
    const response = await axios.post('/users/signup', applicantData);
    return response.data;
  } catch (error) {
    // console.error('Error creating applicant account:', error.response?.data || error.message);
    throw error; 
  } finally {
    clearFormDataHeader();
  }
};
export const login = async (data) => {
  setAuthorizationHeader("");
  try {
    const response = await axios.post('/users/login', data);
    return response.data;
  } catch (error) {
    // console.error('Error login applicant account:', error.response?.data || error.message);
    throw error; 
  } finally {
    clearFormDataHeader();
  }
};

export const getUserProfile = async (token) => {
  setAuthorizationHeader(token); 
  try {
    const response = await axios.get(`/users/me`);
    
    // Log the response data before returning
   
    if(response.data.success){
      // console.log(response.data);
      return response.data;
    }
     // Return the data after logging
  } catch (error) {
    // console.error(`Error fetching applicant details:`, error.response?.data || error.message);
    throw error; // Ensure that the error is thrown to be handled by the calling function
  }
};
export const getUserPayment = async (token) => {
  setAuthorizationHeader(token); 
  try {
    const response = await axios.get(`/payments/my`);

      return response.data;
    
  } catch (error) {
    
    throw error; 
  }
};
export const uploadPhoto = async (data, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.patch('/users/photo', data);
    return response.data;
  } catch (error) {
    // console.error('Error login applicant account:', error.response?.data || error.message);
    throw error; 
  } finally {
    clearFormDataHeader();
  }
};