'use client';

import React, { useState } from "react";
import '@styles/common/auth/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Modal from '@components/Modal';
import zxcvbn from 'zxcvbn';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { auth, database } from '@firebase'; // Adjust this path based on your actual file structure

// Using alias for firebase.js import
// import { auth, database } from '@/firebase'; 
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { ref, set } from 'firebase/database';

const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [allFieldError, setAllFieldError] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);

    const router = useRouter();

    const validateFname = (value) => {
        if (!/^[a-zA-Z]*$/.test(value)) {
            setFnameError("First name should contain only alphabets.");
        } else {
            setFnameError('');
        }
    };

    const validateLname = (value) => {
        if (!/^[a-zA-Z]*$/.test(value)) {
            setLnameError("Last name should contain only alphabets.");
        } else {
            setLnameError('');
        }
    };

    const validateEmail = (value) => {
        if (!/^\w+([-]?\w+)@\w+([-]?\w+)(\.\w{2,3})+$/.test(value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value) => {
        if (value.length < 8) {
            setPasswordError("Password should be at least 8 characters long.");
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (value) => {
        if (value !== password && value) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAllFieldError('');
        setFirebaseError('');

        if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim() || !confirmpassword.trim()) {
            setAllFieldError("Please fill in all fields.");
            return;
        }

        if (fnameError || lnameError || emailError || passwordError || confirmPasswordError) {
            setAllFieldError("Please correct the errors before submitting.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: fname,
                lastName: lname
            });

            router.push('/'); // Correct usage of router.push

        } catch (error) {
                setFirebaseError('An account with this email already exists. Please log in.');
                setShowModal(true);
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const [firstName, ...lastName] = user.displayName.split(' ');

            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: firstName,
                lastName: lastName.join(' ')
            });

            alert("Signup with Google Successfully");
            router.push('/login');
        } catch (err) {
            alert(err.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
        setPasswordScore(zxcvbn(value).score);
    }

    const renderPasswordStrength = (score) => {
        const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
        const segments = 5;
        const activeSegments = score + 1;
        const segmentStyle = (index) => ({
            backgroundColor: index < activeSegments ? '#4caf50' : '#e0e0e0',
            flex: 1,
            height: '2px',
            margin: '0 2px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease'
        });

        return (
            <div className="password-strength">
                <div className="strength-bar">
                    {Array.from({ length: segments }, (_, index) => (
                        <div key={index} style={segmentStyle(index)}></div>
                    ))}
                </div>
                <div className="strength-label">
                    {strengthLabels[score]}
                </div>
            </div>
        );
    }

    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-heading"><h1>Create Your Account</h1></div>
                {firebaseError && <p style={{ color: "red", paddingBottom: "6px" }}>{firebaseError}</p>}
                {allFieldError && <div className="error-message">{allFieldError}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="Name">
                        <div className="fname">
                            <input
                                type="text"
                                value={fname}
                                placeholder="Enter first name"
                                autoComplete="off"
                                name="fname"
                                className="fname-holder"
                                onChange={(e) => { setFname(e.target.value); validateFname(e.target.value); }}
                                onBlur={(e) => validateFname(e.target.value)}
                            />
                            {fnameError && <span className="error-message" style={{ width: "100%" }}>{fnameError}</span>}
                        </div>
                        <div className="lname">
                            <input
                                type="text"
                                value={lname}
                                placeholder="Enter last name"
                                autoComplete="off"
                                name="lname"
                                className="lname-holder"
                                onChange={(e) => { setLname(e.target.value); validateLname(e.target.value); }}
                                onBlur={(e) => validateLname(e.target.value)}
                            />
                            {lnameError && <span className="error-message">{lnameError}</span>}
                        </div>
                    </div>
                    <div className="Email">
                        <input
                            type="text"
                            value={email}
                            placeholder="Enter email"
                            required
                            autoComplete="off"
                            name="email"
                            className="email-holder"
                            onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                            onBlur={(e) => validateEmail(e.target.value)}
                        />
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>
                    <div className="Password">
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter password"
                                required
                                autoComplete="off"
                                name="password"
                                className="password-holder"
                                onChange={(e) => { handlePasswordChange(e.target.value); }}
                                onBlur={(e) => validatePassword(e.target.value)}
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        {passwordError && <span className="error-message">{passwordError}</span>}
                        {password && renderPasswordStrength(passwordScore)}
                    </div>
                    <div className="Password">
                        <div className="confirm-password-input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmpassword}
                                placeholder="Confirm password"
                                required
                                autoComplete="off"
                                name="confirmpassword"
                                className="password-holder"
                                onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value); }}
                                onBlur={(e) => validateConfirmPassword(e.target.value)}
                            />
                            <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
                    </div>
                    <div className="SignUp-button">
                        <button className="signup-btn" type="submit">Sign Up</button>
                    </div>

                    <div className="divider"></div>

                    <div className="google-signin">
                        <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>Sign up with Google</button>
                    </div>
                    <p style={{fontSize:"12px",lineHeight:"150%"}}>By signing up, you agree to our <Link href="/terms-of-service">Terms of services</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.</p>

                    <p>Already have an account? <Link href="/login"> Login</Link> </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;