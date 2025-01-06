import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const getAllResults = async (
  token,
  page,
  limit,
  department,
  testDate
) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/results`, {
      params: { page, limit, department, testDate },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const exportResults = async (
  token,
  page,
  limit,
  department,
  testDate
) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/results`, {
      params: {
        page,
        limit,
        department,
        testDate,
        export: true,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
