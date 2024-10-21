import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from '../../../components/control/InputField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextAreaField from '../../../components/control/TextAreaField';
import FileUpload from '../../../components/control/FileUpload';
import DateInputField from '../../../components/control/DateInputField';
import { uploadFile } from '../../../api/applicationApi';
import SelectField from '../../../components/control/SelectField';

const Experience = ({ formData, setFormData, errors }) => {
    const addExperienceField = () => {
        setFormData((prevData) => ({
            ...prevData,
            experience: [
                ...(prevData.experience || []),
                { name: '', organization: '', role: '', startYear: '', endYear: '', description: '', fileUrl: '' },
            ],
        }));
    };

    const removeExperienceField = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            experience: prevData.experience.filter((_, i) => i !== index),
        }));
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
            setFormData((prevFormData) => {
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
    

    const handleInputChange = (section, index, field, value) => {
        const updatedSection = [...(formData[section] || [])];
        updatedSection[index] = {
            ...updatedSection[index],
            [field]: value 
        };

        setFormData(prevData => ({ ...prevData, [section]: updatedSection }));
    };

    const renderExperienceFields = (exp, index) => (
        <div key={index} className="flex flex-col space-y-2 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                    label="Title Type"
                    name={`experienceName_${index}`}
                    options={[
                        { value: 'permanent', label: 'Permanent Staff' },
                        { value: 'temporary', label: 'Temporary Staff' },
                        { value: 'adjunct', label: 'Adjunct Faculty' },
                        { value: 'visiting', label: 'Visiting Professor' },
                        { value: 'research', label: 'Research Staff' },
                        { value: 'teaching_assistant', label: 'Teaching Assistant' },
                        { value: 'lecturer', label: 'Lecturer' },
                        { value: 'postdoc', label: 'Postdoctoral Researcher' },
                        { value: 'professor', label: 'Professor' },
                        { value: 'emeritus', label: 'Professor Emeritus' },
                        { value: 'administrator', label: 'Academic Administrator' },
                        { value: 'volunteer', label: 'Volunteer Staff' },
                        { value: 'intern', label: 'Intern' },
                    ]}
                    value={exp.name}
                    onChange={(e) => handleInputChange('experience', index, 'name', e.target.value)}
                    error={errors.experienceName}
                />
               <SelectField
  label="Administrative Position"
  name={`experiencePosition_${index}`}
  options={[
    { value: 'vice_chancellor', label: 'Vice Chancellor' },
    { value: 'dean', label: 'Dean' },
    { value: 'provost', label: 'Provost' },
    { value: 'department_chair', label: 'Department Chair' },
    { value: 'head_of_department', label: 'Head of Department' },
    { value: 'director', label: 'Director' },
    { value: 'registrar', label: 'Registrar' },
    { value: 'bursar', label: 'Bursar' },
    { value: 'librarian', label: 'University Librarian' },
    { value: 'academic_secretary', label: 'Academic Secretary' },
    { value: 'research_director', label: 'Director of Research' },
    { value: 'program_coordinator', label: 'Program Coordinator' },
    { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
    { value: 'admissions_director', label: 'Director of Admissions' },
    { value: 'exam_officer', label: 'Examinations Officer' },
    { value: 'student_affairs_director', label: 'Director of Student Affairs' },
    { value: 'quality_assurance_director', label: 'Director of Quality Assurance' },
    { value: 'academic_affairs_director', label: 'Director of Academic Affairs' },
    { value: 'academic_advisor', label: 'Academic Advisor' },
  ]}
  value={exp.organization}
  onChange={(e) => handleInputChange('experience', index, 'position', e.target.value)}
  error={errors.experiencePosition}
/>

                <InputField
                    type="text"
                    label="Organization Name"
                    name={`experienceOrganization_${index}`}
                    placeholder="Enter the organization name"
                    value={exp.organization}
                    onChange={(e) => handleInputChange('experience', index, 'organization', e.target.value)}
                    error={errors.experienceOrganization}
                />
                <InputField
                    type="text"
                    label="Rank"
                    name={`experienceRole_${index}`}
                    placeholder="Enter your rank"
                    value={exp.role}
                    onChange={(e) => handleInputChange('experience', index, 'role', e.target.value)}
                    error={errors.experienceRole}
                />
                <DateInputField
                    label="Start Year"
                    name={`experienceStartYear_${index}`}
                    value={exp.startYear || ''} 
                    onChange={(e) => handleInputChange('experience', index, 'startYear', e.target.value)} 
                    error={errors.experienceStartYear}
                />
                <DateInputField
                    label="End Year"
                    name={`experienceEndYear_${index}`}
                    value={exp.endYear || ''} 
                    onChange={(e) => handleInputChange('experience', index, 'endYear', e.target.value)} 
                    error={errors.experienceEndYear}
                />
                <TextAreaField
                    label="Description"
                    name={`description_${index}`}
                    value={exp.description}
                    onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                    placeholder="Enter your description here"
                    rows={4}
                    maxLength={300}
                    error={errors.description}
                />
                <FileUpload onFileSelect={(file) => handleFileSelect(file, 'experience', index)} acceptedFormats=".jpg, .png, .JPEG, .jpeg, .pdf,.doc,.docx" />
                <div className='flex justify-between items-center'>
                    <div className="flex items-center justify-end">
                        <CloseIcon 
                            className="text-red-600 cursor-pointer mr-1"
                            onClick={() => removeExperienceField(index)}
                        />
                        <p>Close</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col space-y-4'>
            <div>
                <p className="text-xl md:text-2xl text-dark font-bold pb-4 text-start">Work Experience</p>
                {Array.isArray(formData.experience) && formData.experience.map(renderExperienceFields)}
                <div className='flex items-center space-x-2'>
                    <AddCircleOutlineOutlinedIcon className='text-primary cursor-pointer' onClick={addExperienceField} />
                    <p>Add More</p>
                </div>
            </div>
        </div>
    );
};

export default Experience;
