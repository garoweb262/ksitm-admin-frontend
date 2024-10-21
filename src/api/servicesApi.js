import axios from './axios';
import { setAuthorizationHeader } from './headers'; 


export const checkNin = async (ninData) => {
  setAuthorizationHeader(""); 
  try {
    const response = await axios.post(`services/nin-verify/${ninData}`, {});
    return response.data;
  } catch (error) {
    // console.error('Error checking nin details:', error.response?.data || error.message);
    throw error; 
  }
};
export const sendEmailOtp = async (ninData) => {
    setAuthorizationHeader(""); 
    try {
      const response = await axios.post('/services/send-email-otp', ninData);
      return response.data;
    } catch (error) {
      // console.error('Error checking nin details:', error.response?.data || error.message);
      throw error; 
    }
  };