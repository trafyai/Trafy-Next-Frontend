
// 'use client'
// import React, { useState } from "react";
// import '@styles/common/auth/login.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { UserAuth } from "@context/AuthContext";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [generalError, setGeneralError] = useState('');

//     const { googleSignIn, signInWithEmail } = UserAuth();
//     const router = useRouter();

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleEmailChange = (e) => {
//         const { value } = e.target;
//         setEmail(value);
//         // Check for email validation
//         if (!validateEmail(value)) {
//             setEmailError('Invalid email address');
//         } else {
//             setEmailError('');
//         }
//     };

//     const handlePasswordChange = (e) => {
//         const { value } = e.target;
//         setPassword(value);
//         // Check for password validation
//         if (!value) {
//             setPasswordError('Password is required');
//         } else {
//             setPasswordError('');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Reset general error
//         setGeneralError('');

//         try {
//             if (!email || !validateEmail(email)) {
//                 setEmailError('Invalid email address');
//                 return;
//             }

//             if (!password) {
//                 setPasswordError('Password is required');
//                 return;
//             }

//             await signInWithEmail(email, password);
//             router.push('/');
//         } catch (error) {
//             console.log(error);
//             setGeneralError("Incorrect email or password");
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleGoogleSignIn = async () => {
//         try {
//             await googleSignIn();
//             router.push('/');
//         } catch (error) {
//             setGeneralError(error.message);
//         }
//     };

//     return (
//         <div className="login">
//             <div className="login-container">
//                 <div className="login-heading"><h1>Login to Your Account</h1></div>
//                 <form className="form" onSubmit={handleSubmit}>
//                     <div className="Email">
//                         <input
//                             type="email"
//                             placeholder="Enter email"
//                             required
//                             autoComplete="off"
//                             name="email"
//                             className={`email-holder ${emailError ? 'error' : ''}`}
//                             value={email}
//                             onChange={handleEmailChange}
//                         />
//                         {emailError && <div className="error-message">{emailError}</div>}
//                     </div>
//                     <div className="Password">
//                         <div className="password-input">
//                             <div>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Enter password"
//                                     required
//                                     autoComplete="off"
//                                     name="password"
//                                     className={`password-holder ${passwordError ? 'error' : ''}`}
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                 />
//                                 <span className="password-toggle" onClick={togglePasswordVisibility}>
//                                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                                 </span>
//                             </div>
//                             {passwordError && <div className="error-message">{passwordError}</div>
//                             }
//                              {generalError && <div className="error-message">{generalError}</div>}
//                         </div>
//                     </div>
                   
//                     <div className="login-button">
//                         <button className="signup-btn" type="submit">Login</button>
//                     </div>
//                     <div className="divider"></div>
//                     <div className="google-signin">
//                         <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>Login with Google</button>
//                     </div>
//                     <p>Don't have an account? <Link href="/signup">Signup</Link></p>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

'use client';
import React, { useState } from "react";
import '@styles/common/auth/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { UserAuth } from "@context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const { googleSignIn, signInWithEmail } = UserAuth();
    const router = useRouter();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        // Check for email validation
        if (!validateEmail(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        // Check for password validation
        if (!value) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset general error
        setGeneralError('');

        try {
            if (!email || !validateEmail(email)) {
                setEmailError('Invalid email address');
                return;
            }

            if (!password) {
                setPasswordError('Password is required');
                return;
            }

            await signInWithEmail(email, password);
            router.push('/');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setEmailError('The email you entered is not registered.');
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Invalid password.');
            } else {
                setGeneralError("An error occurred. Please try again.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            router.push('/');
        } catch (error) {
            setGeneralError(error.message);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-heading"><h1>Login to Your Account</h1></div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="Email">
                        <input
                            type="email"
                            placeholder="Enter email"
                            required
                            autoComplete="off"
                            name="email"
                            className={`email-holder ${emailError ? 'error' : ''}`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>
                    <div className="Password">
                        <div className="password-input">
                            <div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    required
                                    autoComplete="off"
                                    name="password"
                                    className={`password-holder ${passwordError ? 'error' : ''}`}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <span className="password-toggle-l" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                            {generalError && <div className="error-message">{generalError}</div>}
                            <div className="forgot-password" style={{width:"100%",display:"flex",justifyContent:"end",paddingTop:"8px",fontSize:"12px",fontFamily:"Inter"}}>
                                <Link href="/forgot-password" >Forgot Password?</Link>
                            </div>
                        </div>
                    </div>

                    <div className="login-button">
                        <button className="signup-btn" type="submit">Login</button>
                    </div>
                    
                    <div className="divider"></div>
                    <div className="google-signin">
                        <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>Login with Google</button>
                    </div>
                    <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
