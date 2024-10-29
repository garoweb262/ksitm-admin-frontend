import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../../../components/button/Button';
import { getAllNotifications } from '../../../api/notificationApi';

const NotificationCard = () => {
  const [pageIndex] = useState(0);
  const [pageSize] = useState(5);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const notificationQuery = useQuery({
    queryKey: ['notifications', pageIndex, pageSize, 'admin'],
    queryFn: () => getAllNotifications(pageIndex + 1, pageSize, 'admin'),
    onSuccess: (data) => {
      console.log(data);
      setData(data.data); // Set the notification data here
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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col space-y-4 py-4">
        {data.map((item) => (
          <div
            key={item._id}
            className={`border-l-2 p-2 ${
              item.title === 'New Complain Submitted'
                ? ' text-red-500 border-red-500 border-l-2 p-2'
                : ' text-primary border-primary border-l-2 p-2'
            }w-full h-full bg-white shadow-md rounded-md `}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <p
                  className={`${
                    item.title === 'New Complain Submitted'
                      ? 'text-red-500'
                      : 'text-primary'
                  } text-sm capitalize`}
                >
                  {item.title}
                </p>
                <p className="text-dark text-sm">{item.description}</p>
                <Button
                  variant="outline"
                  className={`${
                    item.title === 'New Complain Submitted'
                      ? 'bg-red-500 text-red-500 border-red-500 hover:bg-red-500'
                      : 'bg-primary text-primary border-primary'
                  } w-24 py-0 rounded-md`}
                  label="View"
                  onClick={() => {
                    if (item.title === 'New Complain Submitted') {
                      navigate('/app/help');
                    }
                  }}
                />
              </div>
              <div>
                <p className="text-primary">{item.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
