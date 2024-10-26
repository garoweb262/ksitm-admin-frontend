import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import Button from '../../../components/button/Button';
import { useAuth } from '../../../context/AuthContext';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import { verify } from '../../../api/applicationApi';
import { toast } from 'react-toastify';

const Verify = ({ data, itemId, type, onClose }) => {
  const { state } = useAuth();
  const { token } = state;
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const changeTab = (t) => {
    setTab(t);
    setRejectionReason('');
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const requestData = {
        id: data._id,
        itemId: itemId,
        itemType: type,
        verify: tab === 1, // Set verify to true for approval, false for rejection
        rejectionReason: tab === 2 ? rejectionReason : '', // Include rejection reason if rejecting
      };

      const response = await verify(requestData, token);
      console.log(response);

      if (response && response.success) {
        toast.success(response.message);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
      setError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col space-y-2">
      <div className="flex flex-row justify-center space-x-4">
        <p
          onClick={() => changeTab(1)}
          className={`text-md text-primary cursor-pointer ${
            tab === 1 ? 'border-b-2 border-primary' : ''
          }`}
        >
          Approve
        </p>
        <p
          onClick={() => changeTab(2)}
          className={`text-md text-red-500 cursor-pointer ${
            tab === 2 ? 'border-b-2 border-red-500' : ''
          }`}
        >
          Reject
        </p>
      </div>
      <div className="py-4">
        {tab === 1 ? (
          <div className="flex flex-row space-x-4 justify-end items-center">
            <Button
              disabled={loading}
              onClick={onClose}
              label="Cancel"
              type="button"
              className="bg-amber-500"
            />{' '}
            <Button
              disabled={loading}
              onClick={handleSubmit}
              label={loading ? <ButtonLoader loading={loading} /> : 'Approve'}
              type="button"
            />
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <TextAreaField
              label="Rejection Reason"
              name="rejectionReason"
              placeholder="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              maxLength={300}
              disabled={loading}
            />
            <Button
              disabled={loading || !rejectionReason}
              onClick={handleSubmit}
              label={loading ? <ButtonLoader loading={loading} /> : 'Reject'}
              type="button"
              className="bg-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
