// Navbar.js
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null; 

  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/auth/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-white border-b border-gray-300">
      <button onClick={toggleSidebar} className="text-blue-500">
        <MenuIcon className="text-primary" />
      </button>
      <div className="flex items-center space-x-4">
        {/* Uncomment and use the profile image if needed */}
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ZJVlov_JoiTi4y4Z5WgAdKlgZu1tNRQ9Iw&s"
          alt="profile"
          className="rounded-full h-10 w-10"
        /> */}
        <div>
          {userData ? ( // Ensure userData is defined before accessing its properties
            <>
              <h1 className="font-bold">{`${userData.surName} ${userData.firstName} ${userData.middleName}`}</h1>
              <h6 className="text-sm">{userData.userId}</h6>
            </>
          ) : (
            <h1 className="font-bold">Welcome, Guest!</h1>
          )}
        </div>
        <button onClick={logout} className="text-red-500">
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
