import React from 'react';
import './Modal.css';  // Import external CSS for styling

const Modal = ({ show, close, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={close}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
