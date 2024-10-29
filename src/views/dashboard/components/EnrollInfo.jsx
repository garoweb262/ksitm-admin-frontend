import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../../components/card/Card';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAllCounts } from '../../../api/countApi';
import { useAuth } from '../../../context/AuthContext';

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
      className={`text-${color} flex flex-col space-y-3 cursor-pointer p-4`}
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
  const [data, setData] = useState({});
  const { state } = useAuth();
  const { token } = state;

  const notificationQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getAllCounts(token),
    onSuccess: (data) => {
      setData(data.data);
    },
    onError: (error) => {
      console.error('Error fetching notifications:', error);
    },
  });

  useEffect(() => {
    if (notificationQuery.data) {
      setData(notificationQuery.data.data);
    }
  }, [notificationQuery.data]);

  const cardsData = [
    {
      icon: PeopleIcon,
      title: 'All Applicants',
      value: data.totalUsers || 0,
      description: 'Total number of applicants',
      color: 'blue',
    },
    {
      icon: MonetizationOnIcon,
      title: 'Total Payment Amount',
      value: `₦${data.totalAmountPaid || 0}`,
      description: 'Total payment collected',
      color: 'green',
    },
    {
      icon: PaymentsIcon,
      title: 'All Payments',
      value: data.totalPayments || 0,
      description: 'All processed payments',
      color: 'purple',
    },
    {
      icon: DescriptionIcon,
      title: 'All Applications',
      value: data.totalApplications || 0,
      description: 'Total applications received',
      color: 'orange',
    },
    {
      icon: CheckCircleIcon,
      title: 'Successful Applications',
      value: data.approvedApplications || 0,
      description: 'Total approved applications',
      color: 'green',
    },
    {
      icon: CancelIcon,
      title: 'Rejected Applications',
      value: data.rejectedApplications || 0,
      description: 'Total rejected applications',
      color: 'red-500',
    },
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1000px] py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
