import React from 'react';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close'; 
import FileUpload from '../../../components/control/FileUpload';
import { uploadFile } from '../../../api/applicationApi';
import DateInputField from '../../../components/control/DateInputField';
import SelectField from '../../../components/control/SelectField';

const Qualification = ({ formData, setFormData, errors }) => {
  const addInstitutionField = () => {
    setFormData(prevData => ({
      ...prevData,
      institutions: [
        ...(prevData.institutions || []),
        { name: '', course: '', location: '', grade: '', startYear: '', endYear: '' }
      ]
    }));
  };

  const addAcademicField = () => {
    setFormData(prevData => ({
      ...prevData,
      academicQualification: [
        ...(prevData.academicQualification || []),
        { certificate: '', institution: '', dateAwarded: '', fileUrl: '' }
      ]
    }));
  };

  const addProfessionalMembershipField = () => {
    setFormData(prevData => ({
      ...prevData,
      professionalMemberships: [
        ...(prevData.professionalMemberships || []),
        { organizationName: '', rank: '', fileUrl: '' }
      ]
    }));
  };

  const removeInstitutionField = (index) => {
    setFormData(prevData => ({
      ...prevData,
      institutions: prevData.institutions.filter((_, i) => i !== index)
    }));
  };

  const removeAcademicField = (index) => {
    setFormData(prevData => ({
      ...prevData,
      academicQualification: prevData.academicQualification.filter((_, i) => i !== index)
    }));
  };

  const removeProfessionalMembershipField = (index) => {
    setFormData(prevData => ({
      ...prevData,
      professionalMemberships: prevData.professionalMemberships.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = [...(formData[section] || [])];
    updatedSection[index] = {
      ...updatedSection[index],
      [field]: value
    };

    setFormData(prevData => ({ ...prevData, [section]: updatedSection }));
  };

  const handleFileSelect = async (event, section, index) => {
    // Check if the event and files are defined
    if (!event || !event.target || !event.target.files) {
      toast.error('No files selected. Please select a file.');
      return;
    }
  
    const files = event.target.files; // Get the files from the input
    if (files.length === 0) {
      toast.error('Please select at least one file');
      return;
    }
  
    // Initialize an array to store file URLs
    const fileUrls = [];
  
    try {
      // Loop through each file if multiple files are selected
      for (let i = 0; i < files.length; i++) {
        const file = files[i]; // Access the individual file
        const response = await uploadFile(file); // Upload each file
  
        if (response.data.success && response.status === 200) {
          fileUrls.push(response.data.fileUrl); // Collect the uploaded file URLs
        } else {
          toast.error(response.data.message); // Handle upload failure for this file
        }
      }
  
      // Update the form data with the collected file URLs
      setFormData(prevFormData => {
        const updatedSection = Array.isArray(prevFormData[section]) ? [...prevFormData[section]] : [];
  
        // Ensure the index exists in the updated section
        if (!updatedSection[index]) {
          updatedSection[index] = {};
        }
  
        // Store the file URLs in the specified section and index
        updatedSection[index].fileUrl = fileUrls.length > 1 ? fileUrls : fileUrls[0]; // If multiple, store as an array
  
        return { ...prevFormData, [section]: updatedSection }; // Return the updated form data
      });
  
      toast.success('Files uploaded successfully!'); // Notify success
    } catch (error) {
      // Handle potential errors during the file upload process
      toast.error(error.response?.data?.message || "File upload failed");
    }
  };
  
  

  return (
    <div className="flex flex-col space-y-4">
      {/* Institutions Section */}
      <div className="py-4">
        <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">Institutions attended</p>
        {formData?.institutions?.map((institution, index) => (
          <div key={index} className="flex flex-col space-y-2 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                type="text"
                label="Name"
                name={`institutionName-${index}`}
                placeholder="Enter the Institution name"
                value={institution.name || ''}
                onChange={(e) => handleInputChange('institutions', index, 'name', e.target.value)}
                error={errors[`institutionName-${index}`]}
              />
              <InputField
                type="text"
                label="Course"
                name={`institutionCourse-${index}`}
                placeholder="Enter the Course"
                value={institution.course || ''}
                onChange={(e) => handleInputChange('institutions', index, 'course', e.target.value)}
                error={errors[`institutionCourse-${index}`]}
              />
              <InputField
                type="text"
                label="Location"
                name={`institutionLocation-${index}`}
                placeholder="Enter the Institution location"
                value={institution.location || ''}
                onChange={(e) => handleInputChange('institutions', index, 'location', e.target.value)}
                error={errors[`institutionLocation-${index}`]}
              />
              <SelectField
                label="Grade"
                name={`institutionGrade-${index}`}
                options={[
                  { value: 'distinction', label: 'Distinction' },
                  { value: 'first Class', label: 'First Class' },
                  { value: 'second Class Upper', label: 'Second Class Upper' },
                  { value: 'second Class Lower', label: 'Second Class Lower' },
                  { value: 'merit', label: 'Merit' },
                ]}
                value={institution.grade || ''}
                onChange={(e) => handleInputChange('institutions', index, 'grade', e.target.value)}
                error={errors[`institutionGrade-${index}`]}
              />
              <DateInputField
                label="Start Year"
                name={`institutionStartYear-${index}`}
                value={institution.startYear || ''}
                onChange={(e) => handleInputChange('institutions', index, 'startYear', e.target.value)}
              />
              <DateInputField
                label="End Year"
                name={`institutionEndYear-${index}`}
                value={institution.endYear || ''}
                onChange={(e) => handleInputChange('institutions', index, 'endYear', e.target.value)}
              />
            </div>
            <CloseIcon className="text-red-500 cursor-pointer" onClick={() => removeInstitutionField(index)} />
          </div>
        ))}
        <div className="flex space-x-2">
          <AddCircleOutlineOutlinedIcon className="text-primary" onClick={addInstitutionField} />
          <p>Add More</p>
        </div>
      </div>

      {/* Academic Qualifications Section */}
      <div className="py-4">
        <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">Academic Qualifications</p>
        {formData?.academicQualification?.map((qualification, index) => (
          <div key={index} className="flex flex-col space-y-2 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Certificate"
                name={`academicCertificate-${index}`}
                options={[
                  { value: 'nd', label: 'National Diploma (ND)' },
                  { value: 'hnd', label: 'Higher National Diploma (HND)' },
                  { value: 'bsc', label: 'Bachelor of Science (BSc)' },
                  { value: 'ba', label: 'Bachelor of Arts (BA)' },
                  { value: 'beng', label: 'Bachelor of Engineering (B.Eng)' },
                  { value: 'msc', label: 'Master of Science (MSc)' },
                  { value: 'mba', label: 'Master of Business Administration (MBA)' },
                  { value: 'mphil', label: 'Master of Philosophy (M.Phil)' },
                  { value: 'phd', label: 'Doctor of Philosophy (PhD)' },
                ]}
                value={qualification.certificate || ''}
                onChange={(e) => handleInputChange('academicQualification', index, 'certificate', e.target.value)}
                error={errors[`academicCertificate-${index}`]}
              />
              <InputField
                type="text"
                label="Institution"
                name={`academicInstitution-${index}`}
                placeholder="Enter the Institution name"
                value={qualification.institution || ''}
                onChange={(e) => handleInputChange('academicQualification', index, 'institution', e.target.value)}
                error={errors[`academicInstitution-${index}`]}
              />
              <DateInputField
                label="Date Awarded"
                name={`academicDateAwarded-${index}`}
                value={qualification.dateAwarded || ''}
                onChange={(e) => handleInputChange('academicQualification', index, 'dateAwarded', e.target.value)}
              />
              <FileUpload
                onFileSelect={(file) => handleFileSelect(file, 'academicQualification', index)}
                acceptedFormats=".jpg, .png, .JPEG, .jpeg, .pdf,.doc,.docx"
              />
            </div>
            <CloseIcon className="text-red-500 cursor-pointer" onClick={() => removeAcademicField(index)} />
          </div>
        ))}
        <div className="flex space-x-2">
          <AddCircleOutlineOutlinedIcon className="text-primary" onClick={addAcademicField} />
          <p>Add More</p>
        </div>
      </div>

      {/* Professional Memberships Section */}
      <div className="py-4">
        <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">Professional Memberships</p>
        {formData?.professionalMemberships?.map((membership, index) => (
          <div key={index} className="flex flex-col space-y-2 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                type="text"
                label="Organization Name"
                name={`membershipOrganizationName-${index}`}
                placeholder="Enter the Organization name"
                value={membership.organizationName || ''}
                onChange={(e) => handleInputChange('professionalMemberships', index, 'organizationName', e.target.value)}
                error={errors[`membershipOrganizationName-${index}`]}
              />
              <InputField
                type="text"
                label="Rank"
                name={`membershipRank-${index}`}
                placeholder="Enter your Rank"
                value={membership.rank || ''}
                onChange={(e) => handleInputChange('professionalMemberships', index, 'rank', e.target.value)}
                error={errors[`membershipRank-${index}`]}
              />
              <FileUpload
                onFileSelect={(file) => handleFileSelect(file, 'professionalMemberships', index)}
                acceptedFormats=".jpg, .png, .JPEG, .jpeg, .pdf,.doc,.docx"
              />
            </div>
            <CloseIcon className="text-red-500 cursor-pointer" onClick={() => removeProfessionalMembershipField(index)} />
          </div>
        ))}
        <div className="flex space-x-2">
          <AddCircleOutlineOutlinedIcon className="text-primary" onClick={addProfessionalMembershipField} />
          <p>Add More</p>
        </div>
      </div>
    </div>
  );
};

export default Qualification;
