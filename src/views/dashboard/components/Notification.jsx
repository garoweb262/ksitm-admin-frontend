import React from 'react';
import Button from '../../../components/button/Button';

const NotificationCard = () => {
  const list = [
    {
      title: 'Note',
      subTitle: 'A new Application is Submitted.',
      color: 'primary',
      label: 'Application',
    },
    {
      title: 'Note',
      subTitle: 'Anew Complain is sent',
      color: 'red-500',
      label: 'complain',
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col space-y-4 py-4">
        {list.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full bg-white shadow-md rounded-md border-l-2 p-2 border-${item.color}`}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-2">
                  <p className="text-dark text-sm capitalize">{item.title}</p>
                  <p className="text-dark text-sm">{item.subTitle}</p>
                </div>
                <Button
                  variant="outline"
                  className={`bg-${item.color} text-${item.color} border-${item.color} w-24  py-0 text-${list.color} rounded-md`}
                  label="view"
                />
              </div>
              <div>
                <p className={`text-${item.color}`}>{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
