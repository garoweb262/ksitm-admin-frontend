// Layout.js
import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      {/* Main Content with dynamic margin */}
      <div
        className={`transition-all duration-300 
          sm:${isExpanded ? "ml-64" : "ml-20"} 
          ml-0 w-full`} 
      >
        {/* Navbar (still fixed) */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="p-6 pl-20 mt-16">
          {" "}
          {/* mt-16 to adjust for the fixed navbar */}
         <div className="w-full h-full">
         <Outlet />
         </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
