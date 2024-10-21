import React from 'react';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-80">
       <div className='w-full'>
       <h2 className="text-2xl font-bold text-dark mb-4">Recruitment</h2>
        <p className="text-gray-700 text-center mb-6">
          Join our team and be a part of our exciting journey. Apply now to make a difference!
        </p>
       <div className='flex flex-col space-y-4'>
       <Button className="w-full py-2" onClick={() => navigate('/auth/apply')} label="Apply" />
       <Button variant='outline' onClick={() => navigate("/auth/login")} label="Login" />
       </div>
       </div>
      </div>
    </div>
  );
}

export default Landing;
