// AuthContext.js

import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../firebase';

export const authContext = createContext();

export function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);

        // Fetch or create user-specific data (You can replace this logic with your own)
        const storedUserData = localStorage.getItem(`userData_${user.uid}`);
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          // If user data doesn't exist, create a new object
          const initialUserData = { formData: null };
          localStorage.setItem(`userData_${user.uid}`, JSON.stringify(initialUserData));
          setUserData(initialUserData);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateFormData = (formData) => {
    // Update form data for the current user
    setUserData((prevUserData) => ({ ...prevUserData, formData }));
    localStorage.setItem(`userData_${currentUser.uid}`, JSON.stringify({ ...userData, formData }));
  };

  const value = { currentUser, userData, updateFormData };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
// AuthContext.js

// ... (other imports)

export function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

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
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateFormData = (formData) => {
    // Use the callback form of setUserData to ensure you are using the updated state
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, formData };
      localStorage.setItem(`userData_${currentUser.uid}`, JSON.stringify(updatedUserData));
      return updatedUserData;
    });
  };

  const value = { currentUser, userData, updateFormData };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
