import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const getAllApplications = async (token, page, limit, filters = {}) => {
  setAuthorizationHeader(token);
  try {
    const queryParams = {
      page,
      limit,
      ...(filters.applicationId && { applicationId: filters.applicationId }),
      ...(filters.status && { status: filters.status }),
      ...(filters.stage && { stage: filters.stage }),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.role && {
        userFilterField: 'role',
        userFilterValue: filters.role,
      }),
      ...(filters.faculty && {
        userFilterField: 'faculty',
        userFilterValue: filters.faculty,
      }),
      ...(filters.department && {
        userFilterField: 'department',
        userFilterValue: filters.department,
      }),
    };

    const response = await axios.get(`/admin/applications`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportToExcelApi = async (token, page, limit, filters = {}) => {
  setAuthorizationHeader(token);
  try {
    const queryParams = {
      page,
      limit,
      export: true,
      ...(filters.applicationId && { applicationId: filters.applicationId }),
      ...(filters.status && { status: filters.status }),
      ...(filters.stage && { stage: filters.stage }),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.role && {
        userFilterField: 'role',
        userFilterValue: filters.role,
      }),
      ...(filters.faculty && {
        userFilterField: 'faculty',
        userFilterValue: filters.faculty,
      }),
      ...(filters.department && {
        userFilterField: 'department',
        userFilterValue: filters.department,
      }),
    };

    const response = await axios.get(`/admin/applications`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
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
