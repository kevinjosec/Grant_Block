import React, { useEffect, useState, useContext } from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './ProfileSettings.css'
import { auth, getDoc, doc, db } from '../../firebase';
import { authContext } from '../AuthContext';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettings() {
  const [userDetails, setUserDetails] = useState(null);
  const { currentUser } = useContext(authContext);
  const [selectedOption, setSelectedoption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedoption(option);
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.email);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
            console.log('userDetails:', userDetails);

          }
          else {
            console.log('User not found');
          }
        }
      }
      catch (e) {
        console.log("Error: ", e);
      }
    }
    fetchUserData();
  }, [currentUser])


  return (
    <div className='settings-main-body'>
      <UserNavbar backgroundColor="transparent" />
      <div className="settings-container">
        <div className="settings-grid no1">
          <h1 className="settings-header">Settings</h1>
          <ul className="settings-list">
            <li className='settings-list-items' onClick={() => { handleOptionChange('PersonalSettings') }}>Personal details</li>
            <li className='settings-list-items' onClick={() => { handleOptionChange('ChangePassowrd') }}>Change password</li>
            <li className='settings-list-items' onClick={() => { handleOptionChange('DeactivateAccount') }}>Deactivate your acoount</li>
          </ul>
        </div>
        <div className="settings-grid no2">
          <h1 className="my-profile">My Profile</h1>
          {currentUser && currentUser.photoURL &&
            <img src={currentUser.photoURL} alt="Profile" className='current-user-profile-pic' style={{ width: '15%' }} />
          }
          <div className="settings-grid-no2">
            <label className="settings-label First-Name">
              FIRST NAME <br />
              <input value={userDetails?.fname ?? ''} className='settings-value' readOnly />
            </label>
            <br />
            <label className="settings-label Last-Name">
              LAST NAME <br />
              <input value={userDetails?.lname ?? ''} className='settings-value' readOnly />
            </label>
            <br />
            <label className="settings-label Email-ID">
              EMAIL ID <br />
              <input value={userDetails?.email ?? ''} className='settings-value' readOnly />
            </label>
            <br />
            <label className="settings-label Phone-Number">
              PHONE NUMBER <br />
              <input value={userDetails?.phone ?? ''} className='settings-value' readOnly />
            </label>
            <br />
            <label className="settings-label Ration-Card">
              RATION CARD <br />
              <input value={userDetails?.rationCard ?? ''} className='settings-value' readOnly />
            </label>
            <br />
            <label className="settings-label Adhar-Card">
              ADHAR CARD <br />
              <input value={userDetails?.adharCard ?? ''} className='settings-value' readOnly />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
