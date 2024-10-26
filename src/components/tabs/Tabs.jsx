import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full">
      {/* Make the tab list scrollable */}
      <div className="flex border-b border-gray-300 overflow-x-auto">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer px-4 py-2 text-sm font-medium whitespace-nowrap 
              ${
                activeTab === index
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600'
              }`}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <div className="p-4 border border-gray-200 rounded-b-md mt-2">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
