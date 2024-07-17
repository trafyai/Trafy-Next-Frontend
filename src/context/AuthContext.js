'use client';
import { useContext, createContext, useState, useEffect } from "react";
import { 
    signInWithPopup, signOut, GoogleAuthProvider, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    onAuthStateChanged, deleteUser, reauthenticateWithCredential, EmailAuthProvider
} from "firebase/auth";
import { ref, remove } from "firebase/database";
import { auth, database } from '@firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        setUser(userCredential.user);
        return userCredential.user;
    };

    const logOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    const signUpWithEmail = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const signInWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    const reauthenticate = async (password) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No user is currently signed in.");

            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            console.error("Reauthentication failed:", error);
            throw error;
        }
    };

    const deleteAccount = async () => {
        try {
            if (!auth.currentUser) {
                console.error("No user is currently signed in.");
                return;
            }

            const uid = auth.currentUser.uid;

            // Remove user data from Realtime Database
            await remove(ref(database, `users/${uid}`));
            console.log(`User data for UID ${uid} removed from database.`);

            // Delete user from Firebase Authentication
            await deleteUser(auth.currentUser);
            console.log(`User with UID ${uid} deleted from Firebase Authentication.`);

            setUser(null);
        } catch (error) {
            console.error("Error deleting account:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, setUser, googleSignIn, logOut, signUpWithEmail, 
            signInWithEmail, resetPassword, reauthenticate, deleteAccount, loading 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
