
import Application from "../../views/application/Application.jsx";
import ApplicationDetails from "../../views/application/ApplicationDetails.jsx";
import Dashboard from "../../views/dashboard/Dashboard.jsx";
import Notification from "../../views/notification/Notification.jsx";
import Payment from "../../views/payments/Payment.jsx";
import Profile from "../../views/profile/Profile.jsx";
import Settings from "../../views/settings/Settings.jsx";
let prefix = "/app/";
const applicantRoutes = [
          {
            path: `${prefix}dashboard`,
          element: <Dashboard />,
          },
          {
            path: `${prefix}application`,
          element: <Application />,
          },
          {
            path: `${prefix}payment`,
          element: <Payment />,
          },
          {
            path: `${prefix}settings`,
          element: <Profile />,
          },
          {
            path: `${prefix}notification`,
          element: <Notification />,
          },
          {
            path: `${prefix}prints`,
          element: <ApplicationDetails />,
          },
]

export {applicantRoutes}