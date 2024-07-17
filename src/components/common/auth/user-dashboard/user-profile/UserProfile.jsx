// 'use client'
// import '@styles/common/auth/user-dashboard/user-profile/UserProfile.css'
// import React, { useState, useEffect } from "react";
// import { auth, database, storage } from '@/firebase';
// import { ref as dbRef, get, update } from 'firebase/database';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// export default function UserProfile() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [country, setCountry] = useState('');
//     const [profilePic, setProfilePic] = useState(null);
//     const [profilePicURL, setProfilePicURL] = useState('');

//     const router = useRouter();

//     useEffect(() => {
//         onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 const userRef = dbRef(database, 'usersData/' + currentUser.uid);
//                 get(userRef).then((snapshot) => {
//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         setFirstName(data.firstName || '');
//                         setLastName(data.lastName || '');
//                         setEmail(data.email || '');
//                         setPhone(data.phone || '');
//                         setCountry(data.country || '');
//                         setProfilePicURL(data.profilePicURL || '');
//                         setUser({ ...data, uid: currentUser.uid }); // Include UID in the user state
//                     } else {
//                         console.log("No data available");
//                     }
//                     setLoading(false);
//                 }).catch((error) => {
//                     console.error(error);
//                     setLoading(false);
//                 });
//             } else {
//                 router.push('/login');
//             }
//         });
//     }, [router]);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (user) {
//             let newProfilePicURL = user.profilePicURL || '';

//             if (profilePic) {
//                 try {
//                     // Create a reference to the storage location for the profile picture
//                     const storageReference = storageRef(storage, `profilePictures/${user.uid}/${profilePic.name}`);
//                     // Upload the profile picture file
//                     await uploadBytes(storageReference, profilePic);
//                     // Get the download URL for the uploaded profile picture
//                     newProfilePicURL = await getDownloadURL(storageReference);
//                 } catch (error) {
//                     console.error("Error uploading profile picture:", error);
//                     alert("Error uploading profile picture");
//                     return;
//                 }
//             }

//             const updates = {
//                 firstName,
//                 lastName,
//                 email,
//                 phone,
//                 country,
//                 profilePicURL: newProfilePicURL, // Include the new profile picture URL
//             };

//             const userRef = dbRef(database, 'usersData/' + user.uid);
//             update(userRef, updates)
//                 .then(() => {
//                     alert("Profile updated successfully");
//                     // Update the local state to reflect the new profile picture URL
//                     setProfilePicURL(newProfilePicURL);
//                 })
//                 .catch((error) => {
//                     console.error("Error updating profile:", error);
//                     alert("Error updating profile");
//                 });
//         }
//     };

//     const handleProfilePicChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Update the local state for immediate preview
//             setProfilePic(file);
//             // Create a local URL for previewing the image
//             const previewURL = URL.createObjectURL(file);
//             setProfilePicURL(previewURL);
//         }
//     };

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             router.push('/login');
//         }).catch((error) => {
//             console.error(error);
//         });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-contents">
//             <div className="profile-contents-heading">
//                 <h1>Edit Profile</h1>
//             </div>
//             <form className="profile-form" onSubmit={handleUpdate}>
//                 <div className="Fname">
//                     <label htmlFor="fname">First name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter first name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         className="fname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Lname">
//                     <label htmlFor="lname">Last name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter last name"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         className="lname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Pemail">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter email"
//                         value={email}
//                         className="email"
//                         autoComplete="off"
//                         disabled // Disable email update for simplicity
//                     />
//                 </div>
//                 <div className="Phone">
//                     <label htmlFor="phno">Phone number:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter phone number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         className="phno"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Country">
//                     <label htmlFor="country">Country:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         className="country"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="ProfilePic">
//                     <label htmlFor="profilePic">Profile Picture:</label>
//                     <input
//                         type="file"
//                         onChange={handleProfilePicChange}
//                         className="profilePic"
//                         accept="image/*"
//                     />
//                 </div>
//                 {profilePicURL && (
//                     <div className="ProfilePicPreview">
//                         <img src={profilePicURL} alt="Profile Picture" className="profile-pic-preview" />
//                     </div>
//                 )}
//                 <div className="save-button">
//                     <button className="save-changes" type="submit">Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }


'use client';
import '@styles/common/auth/user-dashboard/user-profile/UserProfile.css';
import React, { useState, useEffect } from "react";
import { auth, database, storage } from '@/firebase';
import { ref as dbRef, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function UserProfile({ user, setUser }) {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [country, setCountry] = useState(user.country || '');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState(user.profilePicURL || '');

    const router = useRouter();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newProfilePicURL = profilePicURL;

        if (profilePic) {
            try {
                const storageReference = storageRef(storage, `profilePictures/${user.uid}/${profilePic.name}`);
                await uploadBytes(storageReference, profilePic);
                newProfilePicURL = await getDownloadURL(storageReference);
            } catch (error) {
                console.error("Error uploading profile picture:", error);
                alert("Error uploading profile picture");
                setLoading(false);
                return;
            }
        }

        const updates = {
            firstName,
            lastName,
            email,
            phone,
            country,
            profilePicURL: newProfilePicURL,
        };

        const userRef = dbRef(database, 'usersData/' + user.uid);
        update(userRef, updates)
            .then(() => {
                alert("Profile updated successfully");
                setUser({ ...user, ...updates });
                setProfilePicURL(newProfilePicURL);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                alert("Error updating profile");
                setLoading(false);
            });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            const previewURL = URL.createObjectURL(file);
            setProfilePicURL(previewURL);
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push('/login');
        }).catch((error) => {
            console.error(error);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-contents">
            <div className="profile-contents-heading">
                <h1>Edit Profile</h1>
            </div>
            <form className="profile-form" onSubmit={handleUpdate}>
                <div className="Fname">
                    <label htmlFor="fname">First name:</label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="fname"
                        autoComplete="off"
                    />
                </div>
                <div className="Lname">
                    <label htmlFor="lname">Last name:</label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="lname"
                        autoComplete="off"
                    />
                </div>
                <div className="Pemail">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        className="email"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="Phone">
                    <label htmlFor="phno">Phone number:</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="phno"
                        autoComplete="off"
                    />
                </div>
                <div className="Country">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="country"
                        autoComplete="off"
                    />
                </div>
                <div className="ProfilePic">
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input
                        type="file"
                        onChange={handleProfilePicChange}
                        className="profilePic"
                        accept="image/*"
                    />
                </div>
                {profilePicURL && (
                    <div className="ProfilePicPreview">
                        <img src={profilePicURL} alt="Profile Picture" className="profile-pic-preview" />
                    </div>
                )}
                <div className="save-button">
                    <button className="save-changes" type="submit" disabled={loading}>Save</button>
                </div>
            </form>
        </div>
    );
}
