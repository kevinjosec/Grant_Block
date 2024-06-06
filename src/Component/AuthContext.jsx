import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                const storedUserData = localStorage.getItem(`userData_${user.uid}`);
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                } else {
                    const initialUserData = { formData: null };
                    localStorage.setItem(`userData_${user.uid}`, JSON.stringify(initialUserData));
                    setUserData(initialUserData);
                }
            } else {
                setUserData(null);
                localStorage.clear();
            }
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

    const value = { currentUser, userData, updateFormData, applicants, setApplicants };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
