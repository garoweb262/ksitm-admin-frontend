import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import Button from '../../../components/button/Button';
import { useAuth } from '../../../context/AuthContext';
import { getAllApplicants } from '../../../api/applicantsApi';

const Reply = ({ userId, fullname, email, onClose }) => {
  const { state } = useAuth();
  const { token } = state;

  const [pageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    middleName: '',
    surName: '',
    phone: '',
    email: '',
  });
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Changed to object

  const usersQuery = useQuery({
    queryKey: ['users', pageIndex, pageSize, userId],
    queryFn: () => getAllApplicants(token, pageIndex + 1, pageSize, userId),
    onSuccess: (data) => {
      const userData = data?.data?.[0];
      if (userData) {
        setFormData({
          id: userData._id,
          firstName: userData.firstName || '',
          middleName: userData.middleName || '',
          surName: userData.surName || '',
          phone: userData.phone || '',
          email: userData.email || '',
        });
      }
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    setErrors({}); // Reset error state
    setLoading(true); // Set loading state

    try {
      const requestData = {
        id: formData.id,
        reply: reply,
      };
      const response = await reply(requestData, token); // Assuming reply function is used to send the data
      console.log(response);
      if (response && response.success) {
        toast.success(response.message);

        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
      setErrors({
        global: error.response?.data?.message || 'An error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div>
        <InputField
          label="Name"
          name="name"
          value={`${formData.firstName} ${formData.middleName} ${formData.surName} ?? ${fullname}`}
          onChange={handleInputChange}
          placeholder="Enter user's name"
          className="bg-gray-100"
          error={errors.name}
        />
      </div>

      <div>
        <InputField
          label="Email"
          name="email"
          value={formData.email ?? email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="bg-gray-100"
          error={errors.email}
        />
      </div>

      <div>
        <TextAreaField
          label="Reply"
          name="reply"
          placeholder="Enter Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          maxLength={3000}
          disabled={loading}
        />
      </div>

      <div className="flex justify-center mt-10">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          label={loading ? 'Sending...' : 'Send Reply'}
          type="button"
        />
      </div>
    </div>
  );
};

export default Reply;
