import React, {useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { getUserApplication } from '../../api/applicationApi';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ApplicationForm from './form/ApplicationForm'

const Application = () => {
  const [dummyData, setDummyData] = useState(null);
  const navigate = useNavigate();
  
  const getApplicationDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getUserApplication(token);
      if (response.status === 'success') {
        const data = response.data; 
        setDummyData(data);
        // console.log(data); 
      } else {
        
        if (response.statusCode === 404) {
          console.log('Fill application form below');
        } else {
          console.log('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      // console.error("Error:", error);
      // toast.error("Error:", error);
    }
  };

  useEffect(() => {
    getApplicationDetails();
  }, []);
  return (
    <div className="w-full">
       

    </div>
  )
}

export default Application