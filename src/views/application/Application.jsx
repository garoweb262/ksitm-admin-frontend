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
        <div className="flex flex-col justify-center items-center space-y-6">
            <div className="flex flex-col space-y-2">
                <p className="text-2xl font-bold text-dark">Application Form</p>
                <p className="">Fill out the Application form</p>
            </div>
            {!dummyData
    ? (
      <>
            <ApplicationForm />
            </>
    ):(
      <>
       <div className="flex flex-col items-center justify-center h-full">
        
        <div className="text-center flex flex-col space-y-3">
            <h2 className="text-xl font-bold">You have submmited your Application preview your application details</h2>
            {/* <p className="mt-2 text-gray-600">{errorResponse.message}</p> */}
            <Button
                onClick={() =>navigate("/app/prints")}
                className="w-full h-full"
                label="Preview Application"
           />
              
          
        </div>
    </div>
      </>
    )
  }
        </div>

    </div>
  )
}

export default Application