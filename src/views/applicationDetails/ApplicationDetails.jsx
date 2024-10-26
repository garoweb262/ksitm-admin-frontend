import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAllApplications } from '../../api/applicationApi';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/modal/Modal';
import Tabs from '../../components/tabs/Tabs';
import UserData from './components/UserData';
import Qualifications from './components/Qualifications';
import Academics from './components/Academics';
import Experiences from './components/Experiences';
import Referrals from './components/Referrals';
import Address from './components/Address';
import Others from './components/Others';

const ApplicationDetails = () => {
  const { state } = useAuth();
  const { token } = state;
  const { id } = useParams();

  const [pageIndex] = useState(0);
  const [pageSize] = useState(10);

  const usersQuery = useQuery({
    queryKey: ['applications', pageIndex, pageSize, id],
    queryFn: () => getAllApplications(token, pageIndex + 1, pageSize, id),
    onSuccess: (data) => {
      if (data.data.status === 'success') {
        console.log('hello');
      }
      //   setApplications(data?.data.data[0]);
      //   console.log(data?.data.data[0]);
    },
    onError: (error) => {
      console.error('Error fetching details:', error);
    },
  });
  const userData = usersQuery.data?.data?.[0];

  const tabData = [
    {
      title: 'Applicant Data',
      content: <UserData data={userData} refetch={usersQuery.refetch} />,
    },
    {
      title: 'Address Data',
      content: <Address data={userData} refetch={usersQuery.refetch} />,
    },
    {
      title: 'Qualification',
      content: <Qualifications data={userData} refetch={usersQuery.refetch} />,
    },
    {
      title: 'Academics',
      content: <Academics data={userData} refetch={usersQuery.refetch} />,
    },
    {
      title: 'Experiences',
      content: <Experiences data={userData} refetch={usersQuery.refetch} />,
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
      {usersQuery.isLoading && <Loader />}
      {usersQuery.isError && <p>Error: {usersQuery.error.message}</p>}

      {usersQuery?.data?.data[0] ? (
        <Tabs tabs={tabData} />
      ) : (
        <p>No Applicant details found...</p>
      )}
    </div>
  );
};

export default ApplicationDetails;
