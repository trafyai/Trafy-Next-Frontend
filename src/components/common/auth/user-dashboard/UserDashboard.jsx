'use client';
import React, { useState, useEffect } from "react";
import UserProfile from "./user-profile/UserProfile";
import AccountSecurity from "./account-security/AccountSecurity";
import CloseUserAccount from "./close-user-account/CloseUserAccount";
import '@styles/common/auth/user-dashboard/UserDashboard.css';
import { auth, database } from '@/firebase';
import { ref as dbRef, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export default function UserDashboard() {
    const [showContent, setShowContent] = useState("profile");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userRef = dbRef(database, 'usersData/' + currentUser.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setUser({ ...data, uid: currentUser.uid }); // Include UID in the user state
                    } else {
                        console.log("No data available");
                    }
                    setLoading(false);
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            } else {
                router.push('/login');
            }
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const showProfileContent = (section) => {
        setShowContent(section);
    };

    return (
        <main>
            <div className="user-profile">
                <div className="user-profile-container">
                    <div className="user-dashboard">
                        <div className="user-picture">
                            {user?.profilePicURL && <div className="user-pic" style={{ backgroundImage: `url(${user.profilePicURL})` }}></div>}
                            <div className="user-name"><h2>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</h2></div>
                        </div>
                        <div className="user-profile-contents">
                            <div className={"profile" + (showContent === "profile" ? " active" : "")} onClick={() => showProfileContent("profile")}><h3>Profile</h3></div>
                            <div className={"security" + (showContent === "security" ? " active" : "")} onClick={() => showProfileContent("security")}><h3>Security</h3></div>
                            <div className={"privacy" + (showContent === "privacy" ? " active" : "")} onClick={() => showProfileContent("privacy")}><h3>Privacy</h3></div>
                            <div className={"notification" + (showContent === "notification" ? " active" : "")} onClick={() => showProfileContent("notification")}><h3>Notification</h3></div>
                            <div className={"log-out" + (showContent === "log-out" ? " active" : "")} onClick={() => showProfileContent("log-out")}><h3>Log out</h3></div>
                        </div>
                    </div>
                    {showContent === "profile" && <UserProfile user={user} setUser={setUser} />}
                    {showContent === "security" && <AccountSecurity />}

                    {showContent === "privacy" && (
                        <div className="privacy-contents">
                            <div className="privacy-contents-container">
                                <div className="privacy-contents-heading">
                                    <h1>Privacy</h1>
                                </div>
                            </div>
                        </div>
                    )}

                    {showContent === "notification" && (
                        <div className="notification-contents">
                            <div className="notification-contents-container">
                                <div className="notification-contents-heading">
                                    <h1>Notification</h1>
                                </div>
                            </div>
                        </div>
                    )}

                    {showContent === "log-out" && (
                        <CloseUserAccount/>
                    )}
                </div>
            </div>
        </main>
    );
}
