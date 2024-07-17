import React, { useState } from 'react';
import '@styles/common/auth/ResonsModal.css'

const ReasonsModal = ({ onClose, onReasonSubmit }) => {
    const [selectedReason, setSelectedReason] = useState('');

    const handleReasonChange = (e) => {
        setSelectedReason(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedReason) {
            onReasonSubmit(selectedReason);
        }
    };

    return (
        <div className='reasons-modal'>
            <div className='reasons-modal-content'>
                <h2>Why are you deleting your account?</h2>
                <div className='reasons-options'>
                    <label>
                        <input type="checkbox" value="Privacy concerns" onChange={handleReasonChange} /> Privacy concerns
                    </label>
                    <label>
                        <input type="checkbox" value="Not useful" onChange={handleReasonChange} /> Not useful
                    </label>
                    <label>
                        <input type="checkbox" value="Found an alternative" onChange={handleReasonChange} /> Found an alternative
                    </label>
                    <label>
                        <input type="checkbox" value="Other" onChange={handleReasonChange} /> Other
                    </label>
                </div>
                <div className='reasons-modal-actions'>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ReasonsModal;
