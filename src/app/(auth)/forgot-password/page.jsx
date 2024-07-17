'use client';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@firebase';
import Link from 'next/link';
import '@styles/common/auth/ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const actionCodeSettings = {
            url: 'http://localhost:3000/reset-password',
            handleCodeInApp: true,
        };

        try {
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setMessage(`If an account is associated with ${email}, you will receive an email with instructions to reset your password. Please check your spam folder if the email does not arrive.`);
        } catch (error) {
            setError('Failed to send reset email. Please try again.');
        }
    };

    return (
        <div className="forgot-password-p">
            <div className="forgot-password-container">
                <form className="form-forgot-password" onSubmit={handleSubmit}>
                    <div className="forgot-password-heading"><h1>Reset Your Password</h1></div>
                    <div className="Email-p">
                        <input
                            type="email"
                            placeholder="Enter email"
                            required
                            autoComplete="off"
                            name="email"
                            className="email-holder-p"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="reset-button">
                        <button className="reset-btn" type="submit">Reset Password</button>
                    </div>
                    {message && <div className="message" style={{fontFamily:"Inter",fontSize:"16px", lineHeight:"150%"}}>{message}</div>}
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
