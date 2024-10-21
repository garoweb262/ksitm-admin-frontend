import Apply from "../../views/apply/Apply.jsx";
import Payment from "../../views/apply/form/Payment.jsx";
import Success from "../../views/auth/success/Success.jsx";
import Login from "../../views/login/Login.jsx";

let prefix = "/auth/";
const authRoutes = [
  {
    path: `${prefix}login`,
    element: <Login />, 
  },
  {
    path: `${prefix}apply`,
    element: <Apply />, 
  },
  {
    path: `${prefix}payment`,
    element: <Payment />, 
  },
  {
    path: `${prefix}success`,
    element: <Success />, 
  },
];

export { authRoutes };
