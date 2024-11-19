import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import Button from '../../../components/button/Button';
import { updateApplicantPassword } from '../../../api/applicantsApi';
const UpdateUserPassword = ({ userId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = {
        userId: userId,
      };
      const response = await updateApplicantPassword(token, formData);

      if (response.status === 'success') {
        toast.success(response.message);

        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Display error message from response
        toast.error(
          response.message || 'failed to update password. Please try again.'
        );
      }
    } catch (error) {
      // Check for error response
      if (error.response) {
        // If response is available, handle different statuses
        if (error.response.status === 500) {
          toast.error(error.response.data.message); // Handle 500 error
        } else {
          // Show the error message from the response
          toast.error(
            error.response.data.message || 'An unexpected error occurred.'
          );
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col space-y-4 items-center px-6">
      <p>
        Are You Sure you want to Update Applicant{' '}
        <span className="text-primary">{userId}</span> password ?{' '}
      </p>
      <Button
        disabled={loading ? true : false}
        onClick={handleSubmit}
        label={loading ? <ButtonLoader loading={loading} /> : 'Update'}
        type="submit"
        className=""
      />
    </div>
  );
};

export default UpdateUserPassword;
