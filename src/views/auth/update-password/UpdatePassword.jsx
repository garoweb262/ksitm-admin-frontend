import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, updatePassword } from '../../../api/userApi';
import InputField from '../../../components/control/InputField';
import Button from '../../../components/button/Button';
import Loader from '../../../components/loader/Loader';
import { useAuth } from '../../../context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdatePassword = () => {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const token = localStorage.getItem('token');
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return; // Prevent further execution
    }

    setLoading(true);

    try {
      const user = { email: userData.email, password: password };
      const response = await updatePassword(token, user);

      if (response.status === 'success') {
        const { token, data: user } = response;
        dispatch({ type: 'SET_AUTH', payload: { token, user } });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(response.message);
        setTimeout(() => {
          navigate('/app/dashboard');
        }, 3000);
      } else {
        toast.error(response.message || 'Failed to update. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || 'An unexpected error occurred.'
        );
      } else {
        toast.error('An error occurred. Please try again.');
      }
      setError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <div className="flex flex-col space-y-4 py-4 rounded">
          <p className="text-2xl text-primary font-bold text-center">
            Update Password
          </p>
          {error && <div className="text-red-500">{error}</div>}

          <InputField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              showPassword ? (
                <VisibilityOffIcon
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-gray-500"
                />
              ) : (
                <VisibilityIcon
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-gray-500"
                />
              )
            }
          />
          <InputField
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={
              showConfirmPassword ? (
                <VisibilityOffIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className="cursor-pointer text-gray-500"
                />
              ) : (
                <VisibilityIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className="cursor-pointer text-gray-500"
                />
              )
            }
          />

          <Button
            disabled={loading}
            onClick={handleSubmit}
            label={loading ? <Loader loading={loading} /> : 'Update Password'}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
