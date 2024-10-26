import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import Verify from '../forms/Verify';
import Modal from '../../../components/modal/Modal';
const Academics = ({ data, refetch }) => {
  const {
    publication = [],
    honors = [],
    grants = [],
    inventions = [],
    service = [],
  } = data || {};
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
      {/* Publications Section */}
      <div>
        <h2 className="font-semibold text-lg">Publications</h2>
        {publication.map((pub, index) => (
          <div key={pub._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Title" name="" value={pub.title} disabled />
            <InputField label="Type" name="" value={pub.type} disabled />
            <InputField
              label="Date"
              name=""
              value={new Date(pub.date).toLocaleDateString()}
              disabled
            />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {pub.fileUrl.map((url, idx) => (
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
                      onClick={() => openModal('publication', pub._id)}
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        pub.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          pub.verify ? 'translate-x-6' : 'translate-x-0'
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

      {/* Honors Section */}
      <div>
        <h2 className="font-semibold text-lg">Honors</h2>
        {honors.map((honor, index) => (
          <div
            key={honor._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InputField label="Name" name="" value={honor.name} disabled />
            <InputField
              label="Organization"
              name=""
              value={honor.organization}
              disabled
            />
            <InputField
              label="Date"
              name=""
              value={new Date(honor.date).toLocaleDateString()}
              disabled
            />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {honor.fileUrl.map((url, idx) => (
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
                      onClick={() => openModal('honors', honor._id)}
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        honor.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          honor.verify ? 'translate-x-6' : 'translate-x-0'
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

      {/* Grants Section */}
      <div>
        <h2 className="font-semibold text-lg">Grants</h2>
        {grants.map((grant, index) => (
          <div
            key={grant._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InputField label="Title" name="" value={grant.title} disabled />
            <InputField label="Amount" name="" value={grant.amount} disabled />
            <InputField
              label="Date"
              name=""
              value={new Date(grant.date).toLocaleDateString()}
              disabled
            />
            <InputField label="Experience" value={grant.experience} disabled />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {grant.fileUrl.map((url, idx) => (
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
                      onClick={() => openModal('grants', grant._id)}
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        grant.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          grant.verify ? 'translate-x-6' : 'translate-x-0'
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

      {/* Inventions Section */}
      <div>
        <h2 className="font-semibold text-lg">Inventions</h2>
        {inventions.map((invention, index) => (
          <div
            key={invention._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InputField
              label="Title"
              name=""
              value={invention.title}
              disabled
            />
            <InputField
              label="Number"
              name=""
              value={invention.number}
              disabled
            />
            <InputField
              label="Date"
              name=""
              value={new Date(invention.date).toLocaleDateString()}
              disabled
            />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {invention.fileUrl.map((url, idx) => (
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
                      onClick={() => openModal('inventions', invention._id)}
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        invention.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          invention.verify ? 'translate-x-6' : 'translate-x-0'
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

      {/* Service Section */}
      <div>
        <h2 className="font-semibold text-lg">Service</h2>
        {service.map((svc, index) => (
          <div key={svc._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Body Name"
              name=""
              value={svc.bodyName}
              disabled
            />
            <InputField label="Role" name="" value={svc.role} disabled />
            <InputField
              label="Date"
              name=""
              value={new Date(svc.date).toLocaleDateString()}
              disabled
            />
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                File URL
              </label>
              {svc.fileUrl.map((url, idx) => (
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
                      onClick={() => openModal('service', svc._id)}
                      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        svc.verify ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          svc.verify ? 'translate-x-6' : 'translate-x-0'
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

export default Academics;
