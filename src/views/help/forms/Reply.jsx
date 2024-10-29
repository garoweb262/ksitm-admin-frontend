import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import Button from '../../../components/button/Button';
import { useAuth } from '../../../context/AuthContext';
import { getAllApplicants } from '../../../api/applicantsApi';
import { reply } from '../../../api/complain';

const Reply = ({ id, userId, fullname, email, onClose }) => {
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
  const [replyText, setReplyText] = useState(''); // Renamed here
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Changed to object

  const usersQuery = useQuery({
    queryKey: ['users', pageIndex, pageSize, userId],
    queryFn: () => getAllApplicants(token, pageIndex + 1, pageSize, userId),
    onSuccess: (data) => {
      console.log(data); // Log data to see the structure and ensure it has the expected format
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });

  useEffect(() => {
    if (usersQuery.data && usersQuery.data.data && usersQuery.data.data[0]) {
      const userData = usersQuery.data.data[0];
      setFormData({
        id: userData._id,
        firstName: userData.firstName || '',
        middleName: userData.middleName || '',
        surName: userData.surName || '',
        phone: userData.phone || '',
        email: userData.email || '',
      });
    }
  }, [usersQuery.data]);

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
    setErrors({});
    setLoading(true);

    try {
      const requestData = {
        reply: replyText,
      };
      const response = await reply(requestData, id, token);
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
          value={
            userId
              ? `${formData.firstName} ${formData.middleName} ${formData.surName}`
              : fullname
          }
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
          value={replyText} // Updated here
          onChange={(e) => setReplyText(e.target.value)} // Updated here
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
