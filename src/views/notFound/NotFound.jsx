import React from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { state } = useAuth(); 

  const handleRedirect = () => {
    const token = state.token || localStorage.getItem('token'); 
    if (token) {
      navigate('/app/dashboard'); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-4'>
      <p className='text-dark font-bold text-2xl'>Page not found</p>
      <Button onClick={handleRedirect} label="Go Home" />
    </div>
  );
};

export default NotFound;
