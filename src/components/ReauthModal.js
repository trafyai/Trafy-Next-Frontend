import React, { useState } from 'react';
import '@styles/common/auth/reauthmodal.css'

const ReauthModal = ({ onClose, onReauth }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReauth = () => {
        onReauth(password);
    };

    return (
        <div className="reauth-modal">
            <div className="reauth-modal-content">
                <h2>Reauthenticate</h2>
                <p>Please enter your password to reauthenticate:</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Password" 
                />
                <button onClick={handleReauth}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ReauthModal;
