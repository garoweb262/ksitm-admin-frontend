import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Tabs from '../../components/tabs/Tabs';
import UserData from './components/UserData';
import Qualifications from './components/Qualifications';
import Academics from './components/Academics';
import Experiences from './components/Experiences';
import Referrals from './components/Referrals';
import Address from './components/Address';
import Others from './components/Others';

const ApplicationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.applicationData;

  // Redirect if no application data
  React.useEffect(() => {
    if (!userData) {
      navigate('/app/applications');
    }
  }, [userData, navigate]);

  if (!userData) {
    return <Loader />;
  }

  const tabData = [
    {
      title: 'Applicant Data',
      content: <UserData data={userData} />,
    },
    {
      title: 'Address Data',
      content: <Address data={userData} />,
    },
    {
      title: 'Qualification',
      content: <Qualifications data={userData} />,
    },
    {
      title: 'Academics',
      content: <Academics data={userData} />,
    },
    {
      title: 'Experiences',
      content: <Experiences data={userData} />,
    },
    {
      title: 'Referrals',
      content: <Referrals data={userData} />,
    },
    {
      title: 'Others',
      content: <Others data={userData} />,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <Tabs tabs={tabData} />
    </div>
  );
};

export default ApplicationDetails;
