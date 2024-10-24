import React, { useState, useEffect } from 'react';
import { getUserPayment } from '../../api/userApi';
import Button from '../../components/button/Button';
import { toast } from 'react-toastify';

const Payments = () => {
  const [formData, setFormData] = useState({
    datePaid: '',
    amount: '',
    type: '',
    status: '',
    amountCharged: '',
  });

  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { firstName, middleName, surName, phone, email } = user;

  const getUserPaymentDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getUserPayment(token);
      if (response.status === 'success') {
        const data = response.data;
        setFormData({
          datePaid: new Date(data.createdAt).toLocaleDateString(),
          amount: data.amount,
          type: data.paymentType,
          status: data.status,
          amountCharged: data.chargedAmount,
        });
      } else {
        toast.error('Failed to retrieve user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect(() => {
  //   getUserPaymentDetails();
  // }, []);

  const handlePrint = () => {
    window.print();
  };

  return <div></div>;
};

export default Payments;
