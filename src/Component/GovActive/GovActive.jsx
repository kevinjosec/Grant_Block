import React, { useContext, useState } from 'react'
import './GovActive.css'
import { BsFillDoorOpenFill } from "react-icons/bs";
import activate from '../Assests/activate.svg'
import { useNavigate } from 'react-router-dom';
import { db, addDoc, collection, doc, auth } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';

const GovActive = () => {

  const [activateStatus, setActivatedStatus] = useState(false);

  const activateSchemes = async () => {
    try {
      const schemesRef = doc(db, 'schemeActivation', 'hk9qbigYr3rjrHi0RJ9t');
      const schemesRefSnapshot = await getDoc(schemesRef);
      if (schemesRefSnapshot.exists()) {
        const confirmed = window.confirm('Are you sure you want to activate?');
        if (confirmed) {
          const { activate } = schemesRefSnapshot.data();
          await updateDoc(schemesRef, {
            activate: !activate
          });
          setActivatedStatus(activate);
          console.log(activateStatus);
        }
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='active-main-body'>
      <div className="active-body">
        <h3 className="active-schemes">Scheme Settings</h3>
        <button className="active-schemes-button">
          {activateStatus ? 'Activate schemes' : 'Deactivate schemes'}
          <BsFillDoorOpenFill
            className='active-schemes-icon' />
        </button>
        <img src={activate} alt="Activate"
          className="active-schemes-image"
          style={{ width: "200px" }} />
      </div><br />
      <button className="active-schemes-save-changes" onClick={() => activateSchemes()}>
        Make change
      </button>
    </div>
  )
}
export default GovActive;
