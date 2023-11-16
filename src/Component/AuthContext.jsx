import React from 'react'
import { createContext, useEffect, useState, useContext } from 'react'
import { auth, db} from '../firebase'
import { doc, getDoc } from 'firebase/firestore';

const authContext = createContext();

export  function AuthContext({children}) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(async(user)=>{
            if(user){
                const userEmail = user.email;
                const userDocRef = doc(db,'users',userEmail);
                try{
                    const userDocSnapshot = await getDoc(userDocRef);
                    if(userDocSnapshot.exists())
                    {
                        const firestoreEmail = userDocSnapshot.data().email;
                        if(firestoreEmail == userEmail){
                            console.log('Email Exist')
                            setCurrentUser(userEmail);
                        }else{
                            console.log('Email doesnt exist')
                        }
                    }
                }catch(err){
                    console.log('Error fetching document from firestore')
                }
            }
        });
        return()=>{unsubscribe()}
    },[]);
    const value = {currentUser};
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
export function useAuth() {
    return useContext(authContext);
  }
