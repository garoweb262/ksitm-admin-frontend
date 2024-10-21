import Dashboard from "../../views/dashboard/Dashboard.jsx";
let prefix = `/admin/`;
const adminRoutes = [
          {
            path: `${prefix}dashboard`,
            element: <Dashboard />,
          }
]

export {adminRoutes}