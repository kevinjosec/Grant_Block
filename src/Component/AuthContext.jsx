import React, { createContext, useEffect, useState, useContext } from 'react';
import { db, addDoc, collection, doc, auth } from '../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';


export const authContext = createContext();

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
      else
      {
        setUserData(null);
        localStorage.clear();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser]);


  const value = { currentUser, userData };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
