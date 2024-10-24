import axios from './axios';
import { setAuthorizationHeader, clearFormDataHeader } from './headers';

export const uploadFile = async (file) => {
  setAuthorizationHeader(''); // Clear any existing headers
  setFormDataHeader(); // Set form data headers if needed

  const data = new FormData(); // Create FormData object

  // Append the single file to the FormData object
  data.append('file', file); // Correctly append the file

  try {
    // POST the FormData object to the upload endpoint
    const response = await axios.post('/upload/file', data);
    return response; // Return the response for further handling
  } catch (error) {
    // Log the error and throw it for handling in the calling function
    throw error;
  } finally {
    clearFormDataHeader(); // Clean up headers after upload
  }
};
