import React from 'react';
import InputField from '../../../components/control/InputField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextAreaField from '../../../components/control/TextAreaField';

const Refrees = ({ formData, setFormData, errors }) => {
  // Function to add a new referee
  const addRefereeField = () => {
    if (formData.refrees.length < 3) { // Limit to 3 referees
      setFormData((prevData) => ({
        ...prevData,
        refrees: [
          ...(prevData.refrees || []),
          { name: '', portfolio: '', email: '', phone: '', organization:'', location:'' },
        ],
      }));
    }
  };

  return (
    <div className='flex flex-col space-y-4'>
      <div>
        <p className="text-xl md:text-2xl text-dark font-bold pb-4 text-start">Referees</p>
        <p className="text-xl md:text-lg text-dark pb-4 text-start">You are to enter details of (3) Referees</p>
        {Array.isArray(formData.refrees) && formData.refrees.map((referee = {}, index) => (
          <div key={index} className='flex flex-col space-y-3'>
            <p className="text-md md:text-xl text-dark font-semibold pb-4 text-start">Referee {index + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                type="text"
                label="Name"
                name={`refrees[${index}].name`}
                placeholder="Enter his/her name"
                value={referee.name || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].name = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Name`]}
              />
              <InputField
                type="text"
                label="Portfolio"
                name={`refrees[${index}].portfolio`}
                placeholder="Enter his/her portfolio"
                value={referee.portfolio || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].portfolio = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Portfolio`]}
              />
              <InputField
                type="text"
                label="Phone"
                name={`refrees[${index}].phone`}
                placeholder="Enter his/her phone"
                value={referee.phone || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].phone = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Phone`]}
              />
              <InputField
                type="text"
                label="Organization"
                name={`refrees[${index}].organization`}
                placeholder="Enter his/her Organization"
                value={referee.organization || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].organization = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Organization`]}
              />
              <InputField
                type="text"
                label="Location"
                name={`refrees[${index}].location`}
                placeholder="Enter his/her Location"
                value={referee.location || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].location = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Location`]}
              />
              <InputField
                type="text"
                label="Email"
                name={`refrees[${index}].email`}
                placeholder="Enter his/her email"
                value={referee.email || ''} // Default to empty string
                onChange={(e) => {
                  const updatedReferees = [...formData.refrees];
                  updatedReferees[index].email = e.target.value;
                  setFormData({ ...formData, refrees: updatedReferees });
                }}
                error={errors[`referee${index + 1}Email`]}
              />
            </div>
          </div>
        ))}

        {/* Add More Referee Button */}
        <div className='flex space-x-2'>
          <AddCircleOutlineOutlinedIcon
            className={`text-primary ${formData.refrees.length >= 3 ? 'text-gray-400 cursor-not-allowed' : ''}`}
            onClick={addRefereeField}
            disabled={formData.refrees.length >= 3}
          />
          <p className={formData.refrees.length >= 3 ? 'text-gray-400' : ''}>
            {formData.refrees.length >= 3 ? 'Maximum of 3 referees reached' : 'Add More Referee'}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <TextAreaField
          label="Hobbies"
          name="hobby"
          value={formData.hobby || ''} // Default to empty string
          onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
          placeholder="Enter your Hobbies"
          rows={4}
          maxLength={300}
          error={errors.hobby}
        />
        <TextAreaField
          label="Professional Achievement"
          name="professionalAchievement"
          value={formData.professionalAchievement || ''} // Default to empty string
          onChange={(e) => setFormData({ ...formData, professionalAchievement: e.target.value })}
          placeholder="Enter your Professional Achievement"
          rows={4}
          maxLength={300}
          error={errors.professionalAchievement}
        />
      </div>
    </div>
  );
};

export default Refrees;
