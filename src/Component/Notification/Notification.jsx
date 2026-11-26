import React, { useEffect, useState } from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './Notification.css'
import { db, doc } from '../../firebase';
import { getDoc } from 'firebase/firestore';

const Notification = () => {

  const [resultsPublish, setResultPublish] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const displayResults = async () => {
      try {
        const snapshot = await getDoc(doc(db, 'notification', 'JRl9yPdlCNYgPbji4VJi'));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setResultPublish(Boolean(data.notify));
          setResults(data.results || []);
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
        resultsPublish && results.length > 0 ? (
          <div>
            <h1>Published Beneficiary List</h1>
            {results.map((applicant, index) => (
              <div key={index}>
                <p>{index + 1}. {applicant.name} | {applicant.scheme_name} | Ward {applicant.ward_number} | Marks {applicant.marks_scored}</p>
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
