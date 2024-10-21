import React, { useState, useEffect } from 'react';
import Card from "../../../components/card/Card";
import Button from '../../../components/button/Button';
import { useNavigate } from "react-router-dom";
import { getUserApplication } from '../../..//api/applicationApi';
import { toast } from 'react-toastify';

// Reusable Card component
const EnrollCard = ({ title, description, status, color, buttonLabel, buttonColor, onClick }) => {
  return (
    <Card onClick={onClick} className={`bg-${color} flex flex-col space-y-3 cursor-pointer`}>
      <div className='flex flex-col space-y-2'>
        <p className='text-dark text-sm font-bold'>{title}</p>
        <div className='h-px w-full bg-dark' />
      </div>
      <p className='text-dark text-xs text-center'>{description}</p>
      <p className='font-bold text-md text-dark text-center'>{status}</p>
      <Button className={`bg-${buttonColor} text-white rounded-lg font-semibold`} label={buttonLabel} />
    </Card>
  );
};

const EnrollInfo = () => {
  const navigate = useNavigate();
  const [dummyData, setDummyData] = useState(null);
  const [isApply, setIsApply] = useState(false);
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const getApplicationDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getUserApplication(token);
      if (response.status === 'success') {
        const data = response.data;
        setIsApply(true);
        setDummyData(data);
      } else {
        if (response.statusCode === 404) {
          setIsApply(false);
        } else {
          // toast.error('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error('Error getting applicant details');
    }
  };

  useEffect(() => {
    getApplicationDetails();
  }, []);

  const cardsData = [
    {
      title: 'Application',
      description: isApply ? 'Your application is completed' : 'You are yet to complete your application',
      status: isApply ? 'Pending' : 'Not Submitted',
      color: 'purple-200',
      buttonLabel: isApply ? 'View Prints' : 'Not Completed',
      buttonColor: 'amber-400',
      onClick: () => navigate(isApply ? '/app/prints' : '/app/application'),
    },
    {
      title: 'Document Uploads',
      description: dummyData?.isVerified ? 'Your application is verified' : 'You are yet to upload a document',
      status: dummyData?.isVerified ? 'Verified' : 'Pending',
      color: 'amber-200',
      buttonLabel: 'Not Verified',
      buttonColor: 'amber-400',
      onClick: () => {}, // No navigation for document uploads
    },
    {
      title: 'Payment',
      description: userData?.paymentstatus ? 'Your Payment is Verified' : 'Your Payment is Pending',
      status: userData?.paymentstatus ? 'Verified' : 'Pending',
      color: 'blue-200',
      buttonLabel: userData?.paymentstatus ? 'Completed' : 'Pending',
      buttonColor: userData?.paymentstatus      ? 'primary' : 'red-400',
      onClick: () => {}, // No navigation for payment
    },
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div className='max-w-[1000px] py-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {cardsData.map((card, index) => (
            <EnrollCard
              key={index}
              title={card.title}
              description={card.description}
              status={card.status}
              color={card.color}
              buttonLabel={card.buttonLabel}
              buttonColor={card.buttonColor}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollInfo;
