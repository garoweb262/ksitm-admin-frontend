import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const getAllApplications = async (token, page, limit, applicationId) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/applications`, {
      params: { page, limit, applicationId },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const exportToExcelApi = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/applications`, {
      params: { page, limit },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const verify = async (data, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/admin/application/verification', data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const update = async (data, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/admin/application/status', data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
