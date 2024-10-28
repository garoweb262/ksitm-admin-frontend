import { useNavigate } from 'react-router-dom';
// import dash from '../../assets/dash.png';
// import Button from '../../components/button/Button';
import Calendar from './components/Calendar';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EnrollInfo from './components/EnrollInfo';
import Notification from './components/Notification';

const Dashboard = () => {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:space-x-8">
            <EnrollInfo />
            <div>
              <Calendar />
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="flex flex-row space-x-2">
                  <NotificationsOutlinedIcon className="text-dark" />
                  <p className="text-dark text-sm">Notifications</p>
                </div>
                {/* <div className="flex space-x-2 text-blue-400 text-sm">
                  <p> View all</p>
                  <ChevronRightIcon />
                </div> */}
              </div>
              <div className="h-px w-full bg-gray-300" />
              <div>
                <Notification />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
