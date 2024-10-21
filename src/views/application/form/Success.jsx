import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import success icon
import { useNavigate } from "react-router-dom";
import Button from '../../../components/button/Button';
const Success = ({ successData }) => {
    const navigate = useNavigate();
   const print = () =>{
    setTimeout(() => {
        navigate('/app/prints');
    }, 3000);
   }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg text-center">
        
        {/* Success icon */}
        <CheckCircleIcon className="text-green-500" style={{ fontSize: 50 }} />
        
        {/* Congratulatory message */}
        <h2 className="text-2xl font-bold mt-4">Congratulations!</h2>
        <p className="text-lg mt-2">
          Your application has been successfully submitted.
        </p>

        {/* Display Application ID */}
        <p className="text-lg mt-4">
          <strong className="text-primary">Application ID:</strong> <strong>{successData?.applicationId}</strong>
        </p>

        {/* Email notification */}
        <p className="text-md mt-2 text-gray-600">
          A confirmation has been sent to your email.
        </p>

        {/* Success note */}
        <p className="text-md mt-6 text-gray-600 py-4">
          Thank you for your application. We will review it and get back to you shortly.
        </p>
        <Button variant='solid' onClick={print} label="Print Slip" />
      </div>
    </div>
  );
};

export default Success;
