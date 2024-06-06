import React, { useContext, useEffect, useState } from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './Notification.css'
import { authContext } from '../AuthContext'
import { db, addDoc, collection, doc, auth } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';

const Notification = () => {

  const { applicants } = useContext(authContext);
  const [resultsPublish, setResultPublish] = useState();

  useEffect(() => {
    const displayResults = async () => {
      try {
        const schemesRef = doc(db, 'notification', 'JRl9yPdlCNYgPbji4VJi');
        const schemesRefSnapshot = await getDoc(schemesRef);
        if (schemesRefSnapshot.exists()) {
          const data = schemesRefSnapshot.data().notify;
          setResultPublish(data);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
    displayResults();
  }, [])

  return (
    <div className='notify-main-body'>
      <UserNavbar backgroundColor="transparent" />{
        resultsPublish ? (
          <div>
             {applicants.map((applicant, index) => (
                <div key={index}>
                    <p>Name: {applicant.name}</p>
                </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No Results are published</h1>
          </div>
        )
      }
    </div>
  )
}

export default Notification
