import React, { useEffect, useState } from 'react';
import { IconButton, Card, CardContent } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { uploadFile } from '../../api/applicationApi';
import Button from '../../components/button/Button';
import InputField from '../../components/control/InputField';
import { getUserProfile, uploadPhoto } from '../../api/userApi';
import { toast } from 'react-toastify';

const Profile = () => {
  // const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surName: '',
    phone: '',
    email: '',
    passport: '',
  });
  const token = localStorage.getItem('token');

  // Function to upload the profile photo
  const uploadProfilePhoto = async (uploadedFileUrl) => {
    try {
      const data = { passport: uploadedFileUrl };
      const resp = await uploadPhoto(data, token);
      if (resp.success) {
        toast.success(resp.message);
        // Update formData to reflect new passport image
        setFormData((prevData) => ({ ...prevData, passport: uploadedFileUrl }));
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.error('Error updating photo:', error);
      toast.error('Error updating photo');
    }
  };

  // Handle file selection and upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      const response = await uploadFile(file, token);
      if (response.data.success) {
        const uploadedFileUrl = response.data.fileUrl; // Assuming this is the URL to the uploaded file

        uploadProfilePhoto(uploadedFileUrl); // Pass the URL to the uploadProfilePhoto function
      } else {
        toast.error('File upload failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };

  // Handle input changes for form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get user details
  const getUserDetails = async () => {
    try {
      const response = await getUserProfile(token);
      if (response.success) {
        const data = response.data;
        const [year, month, day] = data.dateOfBirth.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const formattedDate = parsedDate.toISOString().slice(0, 10);

        setFormData({
          firstName: data.firstName,
          middleName: data.middleName,
          surName: data.surName,
          phone: data.phone,
          email: data.email,
          passport: data.passport, // Load existing passport image
          dateOfBirth: formattedDate,
          gender: data.gender,
          faculty: data.faculty,
          department: data.department,
          role: data.role,
        });
      } else {
        toast.error('Failed to retrieve user details');
      }
    } catch (error) {
      toast.error('Error retrieving user details');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-md">
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
              {formData.passport && (
                <img
                  src={formData.passport}
                  alt="Uploaded"
                  className="w-24 h-24 rounded-full object-cover absolute top-0"
                />
              )}
              <IconButton
                color="success"
                aria-label="upload picture"
                component="label"
                className="absolute text-primary bottom-10 left-8 right-0"
              >
                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                <PhotoCamera />
              </IconButton>
            </div>
            <div className="w-full">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={true}
              />
              <InputField
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                disabled={true}
              />
              <InputField
                label="Surname"
                name="surName"
                value={formData.surName}
                onChange={handleInputChange}
                disabled={true}
              />
              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={true}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              onClick={() => console.log(formData)}
              label="Update"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
