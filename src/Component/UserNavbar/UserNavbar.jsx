import React, { useState, useRef, useEffect } from 'react'
import './UserNavbar.css'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase'
function UserNavbar() {
  const navigate = useNavigate();

  const [popUp, setPopUp] = useState('');

  const popUpRef = useRef(null);

  const togglePopUp = setPopUp(!popUp)

  const handleSignOut =()=>{
    try{
      auth.signOut();
      console.log('Sign out')
      navigate('/');
      }catch(err){
        console.log(err);
      }
    }

  const profileSettings =()=>{
    <button className='profileSettings'>Profile Setings</button>
  }

  useEffect(()=>{const handleClick = (event)=>{
    if(popUpRef.current && !popUpRef.current.contains(event.target)){
      setPopUp(false);
    }
  };document.addEventListener('click',handleClick);
  return ()=>{document.removeEventListener('click',handleClick);};

  },[])
  
  return (
    <div>
        <div className="userNavbar">
          Grant Block <CgProfile className="userProfile" onClick={profileSettings}></CgProfile>
          <ul className="userNavbarList">
            <li className='li' onClick={()=>navigate('/UserHomePage')}>
              Home
            </li>
            <li className='li' onClick={()=>navigate('/Schemes')}>
              Schemes
            </li>
            <li className='li'>
              History
            </li>
            <li className='li'>
              Status
            </li>
          </ul>
        </div>
       
    </div>
  )
}

export default UserNavbar
