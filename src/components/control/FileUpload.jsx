import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import PropTypes from "prop-types";

const FileUpload = ({ onFileSelect, acceptedFormats = "application/pdf,image/jpeg,image/png", section, index }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Function to handle file drop or selection
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    
    // Call onFileSelect with the event and other parameters
    if (onFileSelect) {
      // Create a fake event object to match handleFileSelect's expected parameters
      const fakeEvent = {
        target: {
          files: acceptedFiles,
        },
      };
      onFileSelect(fakeEvent, section, index);
    }
  }, [onFileSelect, section, index]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    multiple: true, // Allow multiple file uploads
  });

  return (
    <div
      {...getRootProps()}
      className="w-full border-dashed border-2 border-gray-300 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-primary"
    >
      <input {...getInputProps()} />
      <div className="flex items-center space-x-2">
        <div className="text-gray-500">
          {selectedFiles.length > 0 ? (
            selectedFiles.map((file) => (
              <p key={file.name} className="text-sm font-medium text-primary">{file.name}</p>
            ))
          ) : isDragActive ? (
            <p className="text-sm">Drop the files here...</p>
          ) : (
            <p className="text-sm">
              Select your files or drag and drop <br /> 
              <span className="text-xs">PDF, DOC, DOCX accepted</span>
            </p>
          )}
        </div>
      </div>
      <BackupOutlinedIcon className="text-primary" fontSize="large" />
    </div>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  acceptedFormats: PropTypes.string, // Optionally accept specific file formats
  section: PropTypes.string.isRequired, // Add section prop
  index: PropTypes.number.isRequired, // Add index prop
};

export default FileUpload;
