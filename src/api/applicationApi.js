import axios from './axios';
import {
  setAuthorizationHeader,
  setFormDataHeader,
  clearFormDataHeader,
} from './headers';

export const getAllApplications = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/applications`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
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
