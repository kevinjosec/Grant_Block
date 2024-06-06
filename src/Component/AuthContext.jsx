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

<<<<<<< HEAD
    const value = { currentUser, userData, updateFormData, applicants, setApplicants };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
=======

  const value = { currentUser, userData };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
>>>>>>> 9d104b71a6617b271b5a984c2f2fe59759f7c5f0
}
