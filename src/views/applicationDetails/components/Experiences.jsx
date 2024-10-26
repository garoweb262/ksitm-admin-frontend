import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import Modal from '../../../components/modal/Modal';
import Verify from '../forms/Verify';
const Experiences = ({ data, refetch }) => {
  const { experience = [] } = data || {};
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [itemId, setItemId] = useState('');
  const openModal = (type, itemId) => {
    setIsOpen(true);
    setType(type);
    setItemId(itemId);
  };
  const closeModal = () => {
    setIsOpen(false);
    setItemId('');
    setType('');
    refetch();
  };
  return (
    <div className="py-4 space-y-6">
      <h2 className="font-semibold text-lg">Experiences</h2>
      {experience.map((exp, index) => (
        <div
          key={exp._id}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4"
        >
          <InputField label="Title" value={exp.title || 'N/A'} disabled />
          <InputField label="Position" value={exp.position} disabled />
          <InputField label="Type" value={exp.name} disabled />
          <InputField label="Role" value={exp.role} disabled />
          <TextAreaField label="Description" value={exp.description} disabled />
          <InputField
            label="Start Year"
            value={new Date(exp.startYear).toLocaleDateString()}
            disabled
          />
          <InputField
            label="End Year"
            value={new Date(exp.endYear).toLocaleDateString()}
            disabled
          />

          {/* File URL links */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">
              File URL
            </label>
            {exp.fileUrl.map((url, idx) => (
              <>
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline block"
                >
                  View Document {idx + 1}
                </a>
                <div className="flex items-center space-x-2">
                  <label htmlFor="verify-toggle" className="font-medium">
                    Accept Document
                  </label>
                  <div
                    id="verify-toggle"
                    onClick={() => openModal('experience', exp._id)}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                      exp.verify ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                        exp.verify ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
      {isOpen && (
        <Modal title="Verify Document" isOpen={isOpen} onClose={closeModal}>
          <Verify
            itemId={itemId}
            type={type}
            data={data}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Experiences;
