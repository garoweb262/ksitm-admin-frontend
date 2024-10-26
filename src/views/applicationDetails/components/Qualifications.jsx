import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import Modal from '../../../components/modal/Modal';
import Verify from '../forms/Verify';
const Qualifications = ({ data, refetch }) => {
  const { institutions = [], academicQualification = [] } = data || {};
  const professionalMemberships = data?.professionalMemberships || [];
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
    refetch();
  };
  return (
    <div className="py-4 space-y-6">
      {/* Institutions Section */}
      <div>
        <h2 className="font-semibold text-lg">Institutions</h2>
        {institutions.map((inst, index) => (
          <div key={inst._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Institution Name" value={inst.name} disabled />
            <InputField label="Course" value={inst.course} disabled />
            <InputField label="Grade" value={inst.grade} disabled />
            <InputField label="Location" value={inst.location} disabled />
            <InputField
              label="Start Year"
              value={new Date(inst.startYear).toLocaleDateString()}
              disabled
            />
            <InputField
              label="End Year"
              value={new Date(inst.endYear).toLocaleDateString()}
              disabled
            />
          </div>
        ))}
      </div>

      {/* Academic Qualifications Section */}
      <div>
        <h2 className="font-semibold text-lg">Academic Qualifications</h2>
        {academicQualification.map((qual, index) => (
          <div key={qual._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Certificate" value={qual.certificate} disabled />
            <InputField label="Institution" value={qual.institution} disabled />
            <InputField
              label="Date Awarded"
              value={new Date(qual.dateAwarded).toLocaleDateString()}
              disabled
            />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {qual.fileUrl.map((url, idx) => (
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
                      onClick={() =>
                        openModal('academicQualification', qual._id)
                      }
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        qual.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          qual.verify ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Professional Memberships Section */}
        <div className="col-span-1">
          <h2 className="font-semibold text-lg">Professional Memberships</h2>
        </div>
        {professionalMemberships.map((membership) => (
          <div
            key={membership._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InputField
              type="text"
              label="Organization Name"
              name="organizationName"
              placeholder="Enter Organization Name"
              value={membership.organizationName}
              disabled={true}
            />
            <InputField
              type="text"
              label="Rank"
              name="rank"
              placeholder="Enter Rank"
              value={membership.rank}
              disabled={true}
            />
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                File URL
              </label>
              {membership.fileUrl.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  View Document
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
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

export default Qualifications;
