import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-4 mx-4">
        {' '}
        {/* Adjusted width and padding */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-primary hover:text-primary">
            <CloseIcon />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
