import React, { useState } from 'react';
import SelectField from '../../../components/control/SelectField';
import Button from '../../../components/button/Button';
import { useAuth } from '../../../context/AuthContext';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import { update } from '../../../api/applicationApi';
import { toast } from 'react-toastify';

const UpdateStatus = ({ data, onClose }) => {
  const { state } = useAuth();
  const { token } = state;

  const [status, setStatus] = useState(''); // Initialize status as a string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Initialize error state

  const handleSubmit = async () => {
    setError(''); // Reset error state
    setLoading(true); // Set loading state

    try {
      const requestData = {
        id: data._id,
        status: status,
      };
      const response = await update(requestData, token);
      console.log(response);
      // Check if response is structured as expected
      if (response && response.success) {
        toast.success(response.message);

        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Display error message from response
        toast.error(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Log the error to see what is causing the issue
      console.error(error);

      // Display a generic error message
      toast.error('An error occurred. Please try again.');
      setError(error.response?.data?.message || 'An error occurred.'); // Ensure you're accessing the correct property
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col space-y-2">
      <div>
        <SelectField
          label="Status"
          name="status"
          value={status}
          options={[
            { value: 'approved', label: 'Approved' },
            { value: 'interview', label: 'Interview' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'successful', label: 'Successful' },
          ]}
          onChange={(e) => setStatus(e.target.value)} // Update status on change
        />
      </div>
      <Button
        disabled={loading}
        onClick={handleSubmit}
        label={loading ? <ButtonLoader loading={loading} /> : 'Update Status'}
        type="button" // Change type to "button" to prevent form submission
        className=""
      />
      {error && <div className="text-red-500">{error}</div>}
      {/* Display error message */}
    </div>
  );
};

export default UpdateStatus;
