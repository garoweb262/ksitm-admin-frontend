import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const getAllQuestions = async (token, page, limit) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.get(`/questions`, {
      params: { page, limit },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error('Error fetching applications:', error.response?.data || error.message);
    throw error;
  }
};

export const createQuestion = async (data, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/questions', data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const createBulkQuestion = async (data, token) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.post('/questions/bulk', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateQuestion = async (data, token, id) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.put(`/questions/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
export const deleteQuestion = async (token, id) => {
  setAuthorizationHeader(token);
  try {
    const response = await axios.delete(`/questions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    clearFormDataHeader();
  }
};
