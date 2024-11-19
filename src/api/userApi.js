import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const createUser = async (applicantData) => {
  setAuthorizationHeader('');
  try {
    const response = await axios.post('/admin/staff', applicantData);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const login = async (data) => {
  setAuthorizationHeader('');
  try {
    const response = await axios.post('/admin/login', data);
    return response.data;
  } catch (error) {
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

    if (response.data.success) {
      // console.log(response.data);
      return response.data;
    }
    // Return the data after logging
  } catch (error) {
    // console.error(`Error fetching applicant details:`, error.response?.data || error.message);
    throw error; // Ensure that the error is thrown to be handled by the calling function
  }
};
export const getAllUsers = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/staffs`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const updatePassword = async (token, data) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.patch('/admin/password', data);
    return response.data;
  } catch (error) {
    // console.error('Error login applicant account:', error.response?.data || error.message);
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
