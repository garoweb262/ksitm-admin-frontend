import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const generatePayment = async (token, data) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/payments/generate', data);
    return response.data;
  } catch (error) {
    // console.error('Error generating payment:', error.response?.data || error.message);
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const verifyPayment = async (token, reference) => {
  if (!token) {
    console.error('No token provided for verification');
    throw new Error('No token provided');
  }

  setAuthorizationHeader(token); // Ensure token is passed

  try {
    const response = await axios.get(`/payments/verify?reference=${reference}`);
    return response.data;
  } catch (error) {
    // console.error('Error generating payment:', error.response?.data || error.message);
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const getAllPayments = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get('/admin/payments', {
      params: { page, limit },
    });

    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(
      `Error fetching payments:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
