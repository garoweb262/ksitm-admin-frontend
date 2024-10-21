import { useNavigate } from 'react-router-dom';
import dash from '../../assets/dash.png';
import Button from '../../components/button/Button';
import Calendar from './components/Calendar';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EnrollInfo from './components/EnrollInfo';
import NotificationCard from './components/Notification';

const Dashboard = () => {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null; 
  return (
    <>
  <div className="w-full h-full">
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 py-4">
        <div>
          <p>👋 {`${userData.surName} ${userData.firstName}  ${userData.middleName}`}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:space-x-8">
          <div className="bg-gray-200 w-full h-full py-4 px-2">
            <div className="flex flex-col gap-3 md:flex-row items-center md:justify-between">
              <div className="flex flex-col space-y-2">
                <p className="text-dark font-semibold">Get Involved – Join our Staff Today!</p>
                <p className="text-sm">The Institute was established under Katsina State of Nigeria Law No. 8 of 2013 as an Innovation Enterprise Institution (IEI) intended to develop home grown technologies and skills in industry and government.

Envisioned as a forward looking and business friendly technical institute that combines best practices in school systems in Nigeria and around the world, the </p>
          <div className='flex justify-start'>
          <Button onClick={() => navigate('/app/application')} label="Continue Application"/>
          </div>
              </div>
              <div>
              <img src={dash} alt="dashboard" className="md:w-[700px]" />
              </div>
            </div>
          </div>
          <div>
            <Calendar />
          </div>
        </div>
        <div className='flex flex-col space-y-5'>
          <div className='flex flex-col space-y-2'>
            <div className='flex flex-row space-x-2'>
              <MenuBookOutlinedIcon className='text-dark' />
              <p className='text-dark text-sm'>Enrolled Information</p>
            </div>
          <div className='h-px w-full bg-gray-300' />
          <div>
            <EnrollInfo />
           
          </div>
          </div>
        </div>
        <div className='flex flex-col space-y-5'>
          <div className='flex flex-col space-y-2'>
           <div className='flex justify-between'>
           <div className='flex flex-row space-x-2'>
              <NotificationsOutlinedIcon className='text-dark' />
              <p className='text-dark text-sm'>Notifications</p>
            </div>
            <div className='flex space-x-2 text-blue-400 text-sm'>
              <p> View all</p>
              <ChevronRightIcon />
            </div>
           </div>
          <div className='h-px w-full bg-gray-300' />
          <div>
          <NotificationCard />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
    
  );
};

export default Dashboard;
