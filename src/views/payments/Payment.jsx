import React, { useState, useEffect } from 'react';
import { getUserPayment } from '../../api/userApi';
import Button from '../../components/button/Button';
import { toast } from 'react-toastify';

const Payment = () => {
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
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserPaymentDetails();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 shadow-md border my-6">
      <h1 className="text-xl md:text-2xl text-center text-dark font-bold mb-4">KSITM RECRUITMENT 2024</h1>
      <p className="text-center mb-4">Payment Slip</p>
      
      {/* Applicant Details Section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Applicant Details</h2>
        <table className="min-w-full bg-white border">
          <tbody>
            <tr>
              <td className="py-2 border-b font-bold">Name</td>
              <td className="py-2 border-b">{`${firstName} ${middleName} ${surName}`}</td>
            </tr>
            <tr>
              <td className="py-2 border-b font-bold">Phone</td>
              <td className="py-2 border-b">{phone}</td>
            </tr>
            <tr>
              <td className="py-2 border-b font-bold">Email</td>
              <td className="py-2 border-b">{email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Payment Details Section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Payment Details</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border-b font-bold">Date Paid</th>
              <th className="py-2 border-b font-bold">Amount</th>
              <th className="py-2 border-b font-bold">Amount Charged</th>
              <th className="py-2 border-b font-bold">Type</th>
              <th className="py-2 border-b font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b text-center">{formData.datePaid}</td>
              <td className="py-2 border-b text-center">{formData.amount}</td>
              <td className="py-2 border-b text-center">{formData.amountCharged}</td>
              <td className="py-2 border-b text-center">{formData.type}</td>
              <td className="py-2 border-b text-center">{formData.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center py-5">
        <Button onClick={handlePrint} label="Print" />
      </div>
    </div>
  );
};

export default Payment;
