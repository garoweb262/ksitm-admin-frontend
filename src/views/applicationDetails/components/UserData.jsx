import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import UpdateStatus from '../forms/UpdateStatus';
import Modal from '../../../components/modal/Modal';
const UserData = ({ data, refetch }) => {
  const user = data?.userId || {};
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    refetch();
  };

  // Function to handle verification status update
  // const handleToggleVerification = async () => {
  //   try {
  //     const response = await verifyApplicationService(data._id); // Call backend service with application ID
  //     if (response.data.status === 'success') {
  //       setIsVerified((prevStatus) => !prevStatus); // Toggle state if successful
  //     }
  //   } catch (error) {
  //     console.error('Error updating verification status:', error);
  //   }
  // };
  return (
    <>
      <div className="flex flex-row space-x-2 justify-end">
        <div className="flex justify-end items-end">
          <img
            src={`data:image/jpeg;base64,${user.ninPassportBase64}`}
            alt="User-photo"
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>

        <div className="flex justify-end items-end">
          <img
            src={`${user.passport}`}
            alt="User-photo"
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>
      </div>

      <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <InputField
            type="text"
            label="First Name"
            name="firstName"
            placeholder="Enter your First Name"
            value={user.firstName}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Middle Name"
            name="middleName"
            placeholder="Enter your Middle Name"
            value={user.middleName}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Surname"
            name="surName"
            placeholder="Enter your Surname"
            value={user.surName}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="NIN"
            name="nin"
            placeholder="Enter your NIN"
            value={user.nin}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Phone"
            name="phone"
            placeholder="Enter your Phone Number"
            value={user.phone}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Faculty"
            name="faculty"
            placeholder="Enter your Faculty"
            value={user.faculty}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Department"
            name="department"
            placeholder="Enter your Department"
            value={user.department}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Role"
            name="role"
            placeholder="Enter your Role"
            value={user.role}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Gender"
            name="gender"
            placeholder="Enter your Gender"
            value={user.gender === 'm' ? 'Male' : 'Female'}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Email"
            name="email"
            placeholder="Enter your Email"
            value={user.email}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Date of Birth"
            name="dateOfBirth"
            placeholder="Enter your Date of Birth"
            value={user.dateOfBirth}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="User ID"
            name="userId"
            placeholder="Enter your User ID"
            value={user.userId}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Application ID"
            name="applicationId"
            placeholder="Enter your Application ID"
            value={data.applicationId}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Payment Status"
            name="paymentStatus"
            placeholder="Payment Status"
            value={user.paymentstatus ? 'Paid' : 'Unpaid'}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Amount"
            name="amount"
            placeholder="Enter Amount"
            value={user.amount}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Charge"
            name="charge"
            placeholder="Enter Charge"
            value={user.charge}
            disabled={true}
          />
        </div>
        <div>
          <InputField
            type="text"
            label="Passport"
            name="passport"
            placeholder="Passport URL"
            value={user.passport}
            disabled={true}
          />
        </div>
        <div>
          <TextAreaField
            label="Professional Achievement"
            name="professionalAchievement"
            placeholder="Professional Achievement"
            value={data.professionalAchievement}
            rows={4}
            maxLength={300}
            disabled={true}
          />
        </div>
        <div>
          <TextAreaField
            label="Hobbies"
            name="hobby"
            placeholder="Hobbies"
            value={data.hobby}
            rows={4}
            maxLength={300}
            disabled={true}
          />
        </div>
        <div>
          <TextAreaField
            label="CBT Result"
            name="cbtResult"
            placeholder=" CBT Result"
            value={data.cbtResult}
            rows={4}
            maxLength={300}
            disabled={true}
          />
        </div>
        <div>
          <TextAreaField
            label="Interview Result"
            name="interviewResult"
            placeholder=" Interview Result"
            value={data.interviewResult ?? ''}
            rows={4}
            maxLength={300}
            disabled={true}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <InputField
            type="text"
            label="Application Status"
            name="status"
            placeholder=""
            value={data.status}
            disabled={true}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <InputField
            type="text"
            label="Application Stage"
            name="stage"
            placeholder=""
            value={data.stage}
            disabled={true}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <InputField
            type="text"
            label="is Application Verified?"
            name="isVerified"
            placeholder=""
            value={data.isVerified === true ? 'Verified' : 'Not Verified'}
            disabled={true}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="verify-toggle" className="font-medium">
              Accept Application
            </label>
            <div
              id="verify-toggle"
              onClick={openModal}
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                data.isVerified ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                  data.isVerified ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal title="Update Status" isOpen={isOpen} onClose={closeModal}>
          <UpdateStatus data={data} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default UserData;
