import React from 'react';
import { toast } from 'react-toastify';
import InputField from '../../../components/control/InputField';
import SelectField from '../../../components/control/SelectField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import TextAreaField from '../../../components/control/TextAreaField';
import FileUpload from '../../../components/control/FileUpload';
import { uploadFile } from '../../../api/applicationApi';

const Academics = ({ formData, setFormData, errors }) => {

  const handleAddField = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [
        ...(prevData[section] || []),
        { name: '', description: '', role: '', startYear: '', endYear: '', fileUrl: '' },
      ],
    }));
  };

  const handleRemoveField = (section, index) => {
    setFormData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection.splice(index, 1);
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
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
                updatedSection[index] = {}; // Initialize if it doesn't exist
            }

            // Store the file URLs in the specified section and index
            updatedSection[index].fileUrl = fileUrls.length > 1 ? fileUrls : fileUrls[0]; // If multiple, store as an array

            return { ...prevFormData, [section]: updatedSection }; // Return the updated form data
        });

        toast.success(fileUrls.length > 1 ? 'Files uploaded successfully!' : 'File uploaded successfully!'); // Notify success
    } catch (error) {
        // Handle potential errors during the file upload process
        console.error("File upload error:", error);
        toast.error(error.response?.data?.message || "File upload failed");
    }
};


  const renderSection = (sectionName, sectionLabel, fields) => (
    <div>
      <p className="text-xl md:text-2xl text-dark font-bold pb-4 text-start">{sectionLabel}</p>
      {formData[sectionName]?.map((item, index) => (
        <div key={index} className="flex flex-col space-y-2 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map((field) => (
              <React.Fragment key={`${field.name}-${index}`}>
                {field.type === 'textarea' ? (
                  <TextAreaField
                    label={field.label}
                    name={`${sectionName}-${field.name}-${index}`}
                    value={item[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(sectionName, index, field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    rows={4}
                    maxLength={300}
                    error={errors[`${sectionName}-${field.name}-${index}`]}
                  />
                ) : field.type === 'file' ? (
                  <FileUpload
                    onFileSelect={(file) => handleFileSelect(file, sectionName, index)}
                    acceptedFormats=".jpg, .png, .JPEG, .jpeg, .pdf"
                  />
                ) : field.type === 'select' ? (
                  <SelectField
                    label={field.label}
                    name={`${sectionName}-${field.name}-${index}`}
                    options={field.options}
                    value={item[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(sectionName, index, field.name, e.target.value)
                    }
                    error={errors[`${sectionName}-${field.name}-${index}`]}
                  />
                ) : (
                  <InputField
                    type={field.type || 'text'}
                    label={field.label}
                    name={`${sectionName}-${field.name}-${index}`}
                    placeholder={field.placeholder}
                    value={item[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(sectionName, index, field.name, e.target.value)
                    }
                    error={errors[`${sectionName}-${field.name}-${index}`]}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <RemoveCircleOutlineOutlinedIcon
              className="text-red-500 cursor-pointer"
              onClick={() => handleRemoveField(sectionName, index)}
            />
          </div>
        </div>
      ))}
      <div className="flex space-x-2">
        <AddCircleOutlineOutlinedIcon
          className="text-primary cursor-pointer"
          onClick={() => handleAddField(sectionName)}
        />
        <p>Add More</p>
      </div>
    </div>
  );


  return (
    <div className="flex flex-col space-y-4">
      {/* {renderSection('conference', 'Conference Attended', [
        { name: 'name', label: 'Name', placeholder: 'Enter the conference name' },
        { name: 'location', label: 'Location', placeholder: 'Enter the location' },
        { name: 'paperTitle', label: 'Paper Title', placeholder: 'Enter the paper title' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'fileUrl', label: 'Upload File', type: 'file' },
      ])} */}
{renderSection('publication', 'Publications', [
        { name: 'title', label: 'Publication Title', placeholder: 'Enter the publication title' },
        {
          name: 'type',
          label: 'Publication Type',
          type: 'select',
          options: [
            { value: 'conference', label: 'Conference' },
            { value: 'journal', label: 'Journal' },
            { value: 'book_chapter', label: 'Book Chapter' },
            { value: 'other', label: 'Other' },
          ],
        },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'fileUrl', label: 'Upload File', type: 'file' },
      ])}
      {renderSection('honors', 'Honors', [
        { name: 'name', label: 'Name', placeholder: 'Enter the honor name' },
        { name: 'organization', label: 'Organization', placeholder: 'Enter the organization' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'fileUrl', label: 'Upload File', type: 'file' },
      ])}

      {renderSection('grants', 'Grant', [
        { name: 'title', label: 'Title', placeholder: 'Enter the grant title' },
        { name: 'amount', label: 'Amount', placeholder: 'Enter the amount' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'experience', label: 'Experience', placeholder: 'Enter your experience', type: 'textarea' },
        { name: 'fileUrl', label: 'Upload File', type: 'file' },
      ])}

      {renderSection('inventions', 'Inventions', [
        { name: 'title', label: 'Title', placeholder: 'Enter the title' },
        { name: 'number', label: 'Number', placeholder: 'Enter the number' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'file', label: 'Upload File', type: 'file' },
      ])}   
      
      {renderSection('community service', 'Services', [
        { name: 'bodyName', label: 'Organization', placeholder: 'Enter the organization title' },
        { name: 'role', label: 'Role', placeholder: 'Enter your role' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'fileUrl', label: 'Upload File', type: 'file' },
      ])}
    </div>
  );
};

export default Academics;
