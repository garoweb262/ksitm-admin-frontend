import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import Button from '../../../components/button/Button';
import SelectField from '../../../components/control/SelectField';
import { createUserApi } from '../../../store/apis/user';
import { getMinistryApi } from '../../../store/apis/ministry'; // Add this import
import { useToken } from '../../../store/context/TokenContext';

const CreateUser = () => {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    staffId: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
    ministry: '',
    role: 'mda',
    status: 'active',
  });
  const [errors, setErrors] = useState({});

  // Get ministries data
  const ministryQuery = useQuery('ministries', () =>
    getMinistryApi(token, undefined, 1000)
  );
  const ministryOptions =
    ministryQuery?.data?.data.map((category) => ({
      value: category._id,
      label: category.name,
    })) || [];

  const createUserMutation = useMutation(
    (userData) => createUserApi(token, userData),
    {
      onSuccess: (response) => {
        toast.success('User created successfully!');
        queryClient.invalidateQueries('users');
        setFormData({
          name: '',
          staffId: '',
          phone: '',
          email: '',
          password: '',
          passwordConfirm: '',
          ministry: '',
          role: 'mda',
          status: 'active',
        });
        setErrors({});
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message || 'Error creating user';
        toast.error(errorMessage);
      },
    }
  );

  const validateForm = () => {
    const tempErrors = {};

    if (!formData.name?.trim()) {
      tempErrors.name = 'Name is required.';
    }

    if (!formData.staffId?.trim()) {
      tempErrors.staffId = 'Staff ID is required.';
    }

    if (!formData.phone?.trim()) {
      tempErrors.phone = 'Phone Number is required.';
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone Number must be 10-11 digits.';
    }

    if (!formData.email?.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid.';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.passwordConfirm) {
      tempErrors.passwordConfirm = 'Please confirm your password.';
    } else if (formData.passwordConfirm !== formData.password) {
      // Fixed password comparison
      tempErrors.passwordConfirm = 'Passwords do not match.';
    }

    if (!formData.ministry) {
      tempErrors.ministry = 'Ministry is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      staffId: formData.staffId.trim(),
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      ministry: formData.ministry,
      role: formData.role,
      status: formData.status,
      active: true,
      isDisable: false,
    };

    createUserMutation.mutate(userData);
  };

  return (
    <div className="flex flex-col justify-around items-center py-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
          Create User
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Fill in the details to create a new user.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg md:max-w-4xl lg:max-w-5xl bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user's name"
              className="bg-gray-100"
              error={errors.name}
            />
          </div>

          <div>
            <InputField
              label="Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
              placeholder="Enter staff ID"
              className="bg-gray-100"
              error={errors.staffId}
            />
          </div>

          <div>
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="bg-gray-100"
              error={errors.phone}
            />
          </div>

          <div>
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="bg-gray-100"
              error={errors.email}
            />
          </div>

          <div>
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="bg-gray-100"
              error={errors.password}
            />
          </div>

          <div>
            <InputField
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="bg-gray-100"
              error={errors.passwordConfirm}
            />
          </div>

          <div>
            <SelectField
              label="Ministry"
              name="ministry"
              value={formData.ministry} // Fixed: use formData.ministry instead of ministryFilter
              options={[
                { value: '', label: 'Select Ministry' },
                ...ministryOptions,
              ]}
              onChange={handleInputChange} // Fixed: use handleInputChange
              error={errors.ministry}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            >
              <option value="admin">Admin</option>
              <option value="head_of_service">Head of Service</option>
              <option value="maintainance">Maintainance</option>
              <option value="auditor_general">Auditor General</option>
              <option value="auctionist">Auctionist</option>{' '}
              {/* Fixed: corrected value */}
              <option value="mda">MDA</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            label={createUserMutation.isLoading ? 'Creating...' : 'Create User'}
            type="submit"
            className={`w-full max-w-xs py-3 rounded-md text-white ${
              createUserMutation.isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={createUserMutation.isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
