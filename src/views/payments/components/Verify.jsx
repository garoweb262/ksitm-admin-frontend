import { useState } from 'react';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import Button from '../../../components/button/Button';
import { verifyPayment } from '../../../api/paymentApi';
import { useAuth } from '../../../context/AuthContext';

const Verify = ({ onClose }) => {
  const { state } = useAuth();
  const { token } = state;

  const [formData, setFormData] = useState({
    rrr: '',
    userId: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verify = async () => {
    setIsLoading(true);
    try {
      const { rrr, userId } = formData;
      const response = await verifyPayment(token, rrr, userId);

      if (response.status === 'success') {
        toast.success(
          response.data.message || 'Payment verified successfully!'
        );
      } else {
        toast.error('Payment not verified. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Failed to verify payment.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <InputField
            label="RRR"
            name="rrr"
            value={formData.rrr}
            onChange={handleInputChange}
            placeholder="Enter RRR"
            className="bg-gray-100"
          />
        </div>

        <div>
          <InputField
            label="User ID"
            name="userId" // Fixed incorrect name
            value={formData.userId}
            onChange={handleInputChange}
            placeholder="Enter User ID"
            className="bg-gray-100"
          />
        </div>
        <div className=" flex justify-center">
          <Button
            label={isLoading ? 'Verifying...' : 'Verify'}
            type="button"
            className="w-1/2"
            onClick={verify}
            disabled={isLoading} // Disable button while loading
          />
        </div>
      </div>
    </div>
  );
};

export default Verify;
