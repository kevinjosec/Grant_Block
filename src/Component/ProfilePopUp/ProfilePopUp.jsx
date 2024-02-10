import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './ProfilePopUp.css';
import ProfileSettings from '../ProfileSettings/ProfileSettings'

const ProfilePopUp = (props) => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      auth.signOut();
      console.log('Sign out')
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  const popUpRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {

      }
    };
    document.addEventListener('click', handleClick);
    return () => { document.removeEventListener('click', handleClick); }
  }, [])

  return (props.trigger) ? (
    <div className='profile-settings' ref={popUpRef}>
      <li>
        <button className='settings-button' onClick={() => navigate('/ProfileSettings')}>
          <span className='profile-setting-para'>Profile Settings</span>
        </button>
      </li>
      <li>
        <button className="logout-button" onClick={handleSignOut}>
          <span className='logout-para'>Logout</span>
        </button>
      </li>
    </div>
  ) : "";
}

export default ProfilePopUp
