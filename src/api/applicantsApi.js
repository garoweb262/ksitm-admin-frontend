import axios from './axios';
import {
  setAuthorizationHeader,
  setFormDataHeader,
  clearFormDataHeader,
} from './headers';

export const getAllApplicants = async (token, page, limit, userId) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/applicants`, {
      params: { page, limit, userId },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const exportToExcelApi = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/applicants`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const getUserApplication = async (token, id) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/applications/my`, {
      params: { id },
    });

    return response.data;
  } catch (error) {
    // console.error(`Error fetching application details:`, error.response?.data || error.message);
    throw error;
  }
};

export const updateApplicantPassword = async (token, data) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.patch('/admin/applicant/password', data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
