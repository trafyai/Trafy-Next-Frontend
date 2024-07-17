import React, { useState } from 'react';
import { UserAuth } from '@context/AuthContext'; // Adjust the import according to your project structure
import '@styles/common/auth/user-dashboard/close-user-account/CloseUserAccount.css';
import { useRouter } from 'next/navigation';
import ReauthModal from '@components/ReauthModal';
import ReasonsModal from '@components/ResonsModal';

const CloseUserAccount = () => {
    const { deleteAccount, reauthenticate } = UserAuth();
    const [showReauthModal, setShowReauthModal] = useState(false);
    const [showReasonsModal, setShowReasonsModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState(null);
    const router = useRouter();

    const handleDeleteAccount = async () => {
        setShowReasonsModal(true);
    };

    const handleReasonSubmit = (reason) => {
        setSelectedReason(reason);
        setShowReasonsModal(false);
        setShowReauthModal(true);
    };

    const handleReauth = async (password) => {
        try {
            await reauthenticate(password);
            await deleteAccount();
            // Redirect to home page or login page after account deletion
            router.push('/');
        } catch (error) {
            console.error("Error deleting account:", error);
        } finally {
            setShowReauthModal(false);
        }
    };

    return (
        <div className='logout-contents'>
            <div className='logout-contents-container'>
                <div className="logout-contents-heading">
                    <h1>Logout</h1>
                </div>
                <div className='close-user-account-contents'>
                    <p>Closing your account will permanently delete all your account information.
                    This includes any data associated with your account, and you won't be able to access it even if you create a new account
                    with the same email address.
                    </p>
                    <button onClick={handleDeleteAccount}>Close account</button>
                </div>
            </div>
            {showReasonsModal && (
                <ReasonsModal 
                    onClose={() => setShowReasonsModal(false)} 
                    onReasonSubmit={handleReasonSubmit} 
                />
            )}
            {showReauthModal && (
                <ReauthModal 
                    onClose={() => setShowReauthModal(false)} 
                    onReauth={handleReauth} 
                />
            )}
        </div>
    );
};

export default CloseUserAccount;
