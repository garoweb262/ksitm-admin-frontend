import axios from './axios';
import { setAuthorizationHeader } from './headers';

export const getAllCounts = async (token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/counts`, {});
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
