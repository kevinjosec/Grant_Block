import React , {useContext, useEffect, useState} from 'react';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Schemes.css';
import { useNavigate } from 'react-router-dom';
import {scheme, updateApplicantCount} from '../SchemeList';
import { CgAlignCenter } from 'react-icons/cg';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';

const Schemes = () => {
  const navigate = useNavigate();
  const [schemeActivated, setSchemeActivated] = useState(false);

  useEffect(()=>{
    const fetchActivateStatus = async ()=>{
      const docRef = doc(db, 'schemeActivation', 'hk9qbigYr3rjrHi0RJ9t')
            const docRefSnapshot = await getDoc(docRef);
            if (docRefSnapshot.exists()) {
                const data = docRefSnapshot.data().activate;
                setSchemeActivated(data);
                console.log('status value: ', schemeActivated);
            }
    }
    fetchActivateStatus();
  },[])

  return (
    <div className='scheme-main-body'>
      <UserNavbar backgroundColor="transparent"/>
      {schemeActivated ? (
      <div className="scheme-page">
        {
          scheme.map((scheme) => (
            <div key={scheme.id} className="scheme-card" onClick={()=>(navigate('/ApplicationForm',{state:{param:`${scheme.name}`}}))} style={{ backgroundImage: `url(${scheme.image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              <div className="scheme-name">
                <div className="scheme-title">{scheme.name}</div>
                <p className="scheme-content">{scheme.content}</p>
              </div>
            </div>
          ))
        }
      </div>
      ):(
        <p className="no-schemes-activated">
          Currently no schemes have been activated. <br/>
          Please contact district co-ordinator for the follow up.
        </p>
      )}
    </div>
  );
};

export default Schemes;
