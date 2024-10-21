import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./views/landing/home/Landing.jsx";
import { adminRoutes } from "./utils/routes/adminRoutes.js";
import { applicantRoutes } from "./utils/routes/applicantRoutes.js";
import { authRoutes } from "./utils/routes/authRoutes.js";
import Layout from './layout/Layout.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import ProtectedRoute from './utils/routes/protectedRoutes.js'; 

function App() {
  return (
    <div>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth Layout routes */}
        {authRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<AuthLayout />}>
            <Route path="" element={route.element} />
          </Route>
        ))}

        {/* Applicant Layout routes */}
        {applicantRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout />}>
            <Route path="" element={<ProtectedRoute element={route.element} />} />
          </Route>
        ))}

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
