import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

const FileUpload = ({ onChange, accept = '.xlsx,.xls' }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
      if (onChange && acceptedFiles.length > 0) {
        // Create a synthetic event to match standard input onChange
        const syntheticEvent = {
          target: {
            files: acceptedFiles,
          },
        };
        onChange(syntheticEvent);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    multiple: false,
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
              <p key={file.name} className="text-sm font-medium text-primary">
                {file.name}
              </p>
            ))
          ) : isDragActive ? (
            <p className="text-sm">Drop the Excel file here...</p>
          ) : (
            <p className="text-sm">
              Select your Excel file or drag and drop <br />
              <span className="text-xs">.xlsx, .xls files accepted</span>
            </p>
          )}
        </div>
      </div>
      <BackupOutlinedIcon className="text-primary" fontSize="large" />
    </div>
  );
};

export default FileUpload;
