import React, { useState, useEffect } from 'react';
import Card from '../../../components/card/Card';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { getUserApplication } from '../../..//api/applicationApi';
import { toast } from 'react-toastify';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const EnrollCard = ({
  icon: Icon,
  title,
  value,
  description,
  color,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={`bg-${color} flex flex-col space-y-3 cursor-pointer p-4`}
    >
      <div className="flex items-center space-x-2">
        <Icon className="text-primary" />
        <p className="text-primary text-sm font-bold">{title}</p>
      </div>
      <p className="font-bold text-2xl text-primary text-center">{value}</p>
      <p className="text-dark text-xs text-center">{description}</p>
    </Card>
  );
};

const EnrollInfo = () => {
  // Uncomment this section to handle navigation, fetching data, etc.
  // const navigate = useNavigate();
  // const [dummyData, setDummyData] = useState(null);
  // const [isApply, setIsApply] = useState(false);
  // const userDataString = localStorage.getItem('user');
  // const userData = userDataString ? JSON.parse(userDataString) : null;

  // const getApplicationDetails = async () => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await getUserApplication(token);
  //     if (response.status === 'success') {
  //       const data = response.data;
  //       setIsApply(true);
  //       setDummyData(data);
  //     } else {
  //       if (response.statusCode === 404) {
  //         setIsApply(false);
  //       } else {
  //         toast.error('An unexpected error occurred. Please try again.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error('Error getting applicant details');
  //   }
  // };

  // useEffect(() => {
  //   getApplicationDetails();
  // }, []);

  const cardsData = [
    {
      icon: PeopleIcon,
      title: 'All Applicants',
      value: '120',
      description: 'Total number of applicants',
      color: 'blue',
    },
    {
      icon: MonetizationOnIcon,
      title: 'Total Payment Amount',
      value: '₦15,000',
      description: 'Total payment collected',
      color: 'green',
    },
    {
      icon: PaymentsIcon,
      title: 'All Payments',
      value: '45',
      description: 'All processed payments',
      color: 'purple',
    },
    {
      icon: DescriptionIcon,
      title: 'All Applications',
      value: '150',
      description: 'Total applications received',
      color: 'orange',
    },
    {
      icon: CheckCircleIcon,
      title: 'Successful Applications',
      value: '100',
      description: 'Total approved applications',
      color: 'green',
    },
    {
      icon: CancelIcon,
      title: 'Rejected Applications',
      value: '20',
      description: 'Total rejected applications',
      color: 'red',
    },
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1000px] py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {cardsData.map((card, index) => (
            <EnrollCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              description={card.description}
              color={card.color}
              onClick={() => console.log(`${card.title} clicked`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollInfo;
