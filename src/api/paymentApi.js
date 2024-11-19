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
export const verifyPayment = async (token, rrr, userId) => {
  if (!token) {
    console.error('No token provided for verification');
    throw new Error('No token provided');
  }

  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/payments/admin-verify-remita`, {
      params: { rrr, userId },
    });
    return response.data;
  } catch (error) {
    // console.error('Error generating payment:', error.response?.data || error.message);
    throw error;
  } finally {
    clearFormDataHeader();
  }
};

export const exportToExcelApi = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/admin/payments`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};
export const getAllPayments = async (token, page, limit, reference) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get('/admin/payments', {
      params: { page, limit, reference },
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
