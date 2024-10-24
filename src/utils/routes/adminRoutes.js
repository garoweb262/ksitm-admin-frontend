import Applicants from '../../views/applicants/Applicants.jsx';
import Application from '../../views/application/Application.jsx';
// import ApplicationDetails from '../../views/application/ApplicationDetails.jsx';
import Dashboard from '../../views/dashboard/Dashboard.jsx';
import Results from '../../views/exams-results/Results.jsx';
import Exams from '../../views/exams/Exams.jsx';
import Notification from '../../views/notification/Notification.jsx';
import Payments from '../../views/payments/Payment.jsx';
import Users from '../../views/users/Users.jsx';

let prefix = '/app/';
const adminRoutes = [
  {
    path: `${prefix}dashboard`,
    element: <Dashboard />,
  },
  {
    path: `${prefix}applications`,
    element: <Application />,
  },
  {
    path: `${prefix}applicants`,
    element: <Applicants />,
  },
  {
    path: `${prefix}payments`,
    element: <Payments />,
  },
  // {
  //   path: `${prefix}settings`,
  //   element: <Profile />,
  // },
  {
    path: `${prefix}notification`,
    element: <Notification />,
  },
  {
    path: `${prefix}exams`,
    element: <Exams />,
  },
  {
    path: `${prefix}exam-results`,
    element: <Results />,
  },
  {
    path: `${prefix}users`,
    element: <Users />,
  },
];

export { adminRoutes };
