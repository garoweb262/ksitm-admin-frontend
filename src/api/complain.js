import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const reply = async (data, id, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.patch(`/admin/complain/reply/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const getAllComplains = async (page, limit) => {
  setAuthorizationHeader('');
  try {
    const response = await axios.get('/contact', {
      params: { page, limit },
    });

    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(
      `Error fetching complains:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
