import { useLocation } from "react-router-dom";
import MenuLink from "./MenuLink";
import { Menu, Close } from "@mui/icons-material"; 
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useState } from "react"; 

// Grouping the menu items
const menuSections = [
  {
    title: "Academic",
    items: [
      { name: "Application", path: "/app/application", icon: <AssignmentIcon /> },
      { name: "Payment", path: "/app/payment", icon: <PaymentIcon /> },
      { name: "Print", path: "/app/prints", icon: <LocalPrintshopOutlinedIcon /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Account Setting", path: "/app/settings", icon: <SettingsIcon /> },
      { name: "Notification", path: "/app/notification", icon: <NotificationsIcon /> },
    ],
  },
];

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
 
  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-30 ${
        isExpanded ? "w-64" : "w-18"
      } bg-primary text-white shadow-lg flex flex-col justify-start`}
    >
      {/* Hamburger Icon */}
      <div className="flex flex-row items-center justify-between">
        {/* KSITM RECRUITMENT title (hide when collapsed) */}
        {isExpanded && (
          <div className="p-3">
            <h3
              className="font-semibold text-md text-white uppercase"
              onMouseEnter={() => setHoveredItem("KSITM RECRUITMENT")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              KSITM RECRUITMENT
            </h3>
          </div>
        )}
        <div className="p-4 flex items-center justify-end">
          <button onClick={toggleSidebar}>
            {isExpanded ? (
              <Close className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Dashboard MenuLink (outside the sections) */}
      <ul className="space-y-4 px-2">
        <li
          onMouseEnter={() => setHoveredItem("dashboard")}
          onMouseLeave={() => setHoveredItem(null)}
          className={`transition-all duration-300 ${
            hoveredItem === "dashboard" ? "transform scale-102" : ""
          }`}
        >
          <MenuLink
            item="Dashboard"
            path="/app/dashboard"
            location={location}
            icon={<DashboardIcon />}
            isExpanded={isExpanded}
            onClick={toggleSidebar}
          />
        </li>

        {/* Sectioned Menu Items */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Title */}
            {isExpanded && (
              <h3 className="text-sm text-white uppercase font-thin p-3">
                {section.title}
              </h3>
            )}
            {section.items.map((menuItem, index) => (
              <li
                key={menuItem.name}
                onMouseEnter={() => setHoveredItem(`${sectionIndex}-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`transition-all duration-300 ${
                  hoveredItem === `${sectionIndex}-${index}` ? "transform scale-102" : ""
                }`}
              >
                <MenuLink
                  item={menuItem.name}
                  path={menuItem.path}
                  location={location}
                  icon={menuItem.icon}
                  isExpanded={isExpanded}
                  onClick={toggleSidebar}
                />
              </li>
            ))}
          </div>
        ))}

        {/* Logout MenuLink */}
        <li
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
          className={`transition-all duration-300 ${
            hoveredItem === "logout" ? "transform scale-102" : ""
          }`}
        >
          {/* <MenuLink
            item="Logout"
            path="/app/logout"
            location={location}
            icon={<LogoutIcon />}
            isExpanded={isExpanded}
            onClick={logout}
          /> */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
