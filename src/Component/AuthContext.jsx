import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const authContext = createContext();

// A user is a government officer when a document exists at admins/{uid}.
// Those documents can only be created from the Firebase console (see firestore.rules),
// so the role can't be granted from the browser.
export async function fetchIsGov(uid) {
    try {
        const snap = await getDoc(doc(db, 'admins', uid));
        return snap.exists();
    } catch (e) {
        console.error('Could not read admin role:', e);
        return false;
    }
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isGov, setIsGov] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                setIsGov(await fetchIsGov(user.uid));
                const storedUserData = localStorage.getItem(`userData_${user.uid}`);
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                } else {
                    const initialUserData = { formData: null };
                    localStorage.setItem(`userData_${user.uid}`, JSON.stringify(initialUserData));
                    setUserData(initialUserData);
                }
            } else {
                setCurrentUser(null);
                setIsGov(false);
                setUserData(null);
                Object.keys(localStorage)
                    .filter((key) => key.startsWith('userData_'))
                    .forEach((key) => localStorage.removeItem(key));
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const updateFormData = (formData) => {
        setUserData((prevUserData) => {
            const updatedUserData = { ...prevUserData, formData };
            localStorage.setItem(`userData_${currentUser.uid}`, JSON.stringify(updatedUserData));
            return updatedUserData;
        });
    };

    const value = { currentUser, userData, isGov, authLoading, updateFormData, applicants, setApplicants };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
