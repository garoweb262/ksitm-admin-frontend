import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/auth/login/Login.jsx";
import { adminRoutes } from "./utils/routes/adminRoutes.js";
import { authRoutes } from "./utils/routes/authRoutes.js";
import Layout from './layout/Layout.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import ProtectedRoute from './utils/routes/protectedRoutes.js'; 

function App() {
  return (
    <div>
      <Routes>
      <Route  element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        </Route>

        {/* Admin Layout routes */}
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout />}>
            <Route path="" element={<ProtectedRoute element={route.element} />} />
          </Route>
        ))}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
