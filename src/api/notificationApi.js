import axios from './axios';
import { setAuthorizationHeader } from './headers';

export const getAllNotifications = async (page, limit, type) => {
  setAuthorizationHeader('');
  try {
    const response = await axios.get(`/notifications/`, {
      params: { page, limit, type },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
