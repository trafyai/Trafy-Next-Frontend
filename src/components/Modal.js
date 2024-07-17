// components/Modal.js
import React from 'react';
import '@styles/common/auth/modal.css'; // Ensure this path is correct

const Modal = ({ show, handleClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
