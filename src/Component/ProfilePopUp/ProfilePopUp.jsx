import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './ProfilePopUp.css';
const ProfilePopUp = (props) => {
    const navigate = useNavigate();
    const handleSignOut =()=>{
        try{
          auth.signOut();
          console.log('Sign out')
          navigate('/');
          }catch(err){
            console.log(err);
          }
        }
          const popUpRef = useRef(null);
    useEffect(()=>{
        const handleClick =(event)=>{
            if (popUpRef.current && !popUpRef.current.contains(event.target))
            {
               
            }
        };
        document.addEventListener('click', handleClick);
        return ()=>{document.removeEventListener('click', handleClick);}
    },[])

  return(props.trigger)? (
    <div className='ProfileSettings' ref={popUpRef}>
        <li>
            <button className='settingsButton'>
                Profile Settings
                </button></li> 
                <li>
                    <button  className="logoutButton" onClick={handleSignOut}>
                        Logout</button></li>     
    </div>
  ):"";
}

export default ProfilePopUp
