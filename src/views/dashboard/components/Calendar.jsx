import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  // Helper to get the number of days in a given month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the current month's name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  // Get which day of the week the first day of the month falls on
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Go to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  // Go to the next month
  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  // Days of the week starting from Saturday to Friday
  const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri'];

  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const daysArray = [...Array(daysInMonth).keys()].map(day => day + 1); // Generate days of the month

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex justify-between w-60 items-center mb-4">
        {/* Back button */}
        <button 
          className="text-gray-400 hover:text-gray-400 transition duration-300"
          onClick={handlePreviousMonth}
        >
          <ChevronLeftIcon fontSize="medium" />
        </button>
        
        {/* Display current month and year */}
        <h3 className="text-sm font-bold">{getMonthName(currentDate)} {currentDate.getFullYear()}</h3>
        
        {/* Forward button */}
        <button 
          className="text-gray-400 hover:text-gray-400 transition duration-300"
          onClick={handleNextMonth}
        >
          <ChevronRightIcon fontSize="medium" />
        </button>
      </div>

      {/* Display days of the week */}
      <div className="grid grid-cols-7 gap-2 w-60">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-gray-600">
            {day}
          </div>
        ))}

        {/* Display blank spaces before the first day of the month */}
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={index} className="text-center"></div>
        ))}

        {/* Display the days of the month */}
        {daysArray.map(day => (
          <div
            key={day}
            className={`text-center rounded-full ${
              day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
                ? 'bg-primary text-white text-sm'
                : 'text-gray-800'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
