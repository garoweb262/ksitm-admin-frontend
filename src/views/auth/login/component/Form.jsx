import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../../../api/userApi';
import InputField from '../../../../components/control/InputField';
import Button from '../../../../components/button/Button';
import { useAuth } from '../../../../context/AuthContext';
import ButtonLoader from '../../../../components/loader/ButtonLoader';

const Form = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async () => {
    setError(''); // Reset error state
    setLoading(true); // Set loading state

    try {
      const user = {
        email: userId,
        password: password,
      };
      const response = await login(user); // Await the API call

      if (response.status === 'success') {
        const { token, data: user } = response;

        // Store token and user in context
        dispatch({ type: 'SET_AUTH', payload: { token, user } });

        // Store token in localStorage for persistence
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success(response.message); // Use success toast

        setTimeout(() => {
          navigate('/app/dashboard');
        }, 3000);
      } else {
        // Display error message from response
        toast.error(response.message || 'Login failed. Please try again.');
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
        toast.error('An error occurred. Please try again.'); // Generic error message
      }
      setError(error.response.data.message || 'An error occurred.'); // Set error state
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <p className="text-2xl text-primary font-bold text-center">Login</p>
      <div className="flex flex-col space-y-4 py-4 rounded">
        {error && <div className="text-red-500">{error}</div>}
        <InputField
          type="text"
          label="Email Address"
          name="userId"
          placeholder="Enter your email address"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          disabled={loading ? true : false}
          onClick={handleSubmit}
          label={loading ? <ButtonLoader loading={loading} /> : 'Login'}
          type="submit"
          className=""
        />
      </div>
    </div>
  );
};

export default Form;
