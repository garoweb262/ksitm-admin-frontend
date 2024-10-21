// import Welcome from "./components/auth/Welcome";
// import Logo from "./components/auth/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen py-5 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* You can add Welcome and Logo components here if needed */}
        {/* <Logo /> */}
        {/* <Welcome /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
