import React, { useState, useRef, useEffect } from 'react'
import './UserNavbar.css'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase'
import ProfilePopUp from '../ProfilePopUp/ProfilePopUp';
import { isObject } from 'formik';

function UserNavbar() {
  const navigate = useNavigate();
  const [isPopUp, setIsPopUp] = useState(false);    
  const handleProfileClick =()=>{
    console.log("here");
    try{
            setIsPopUp(!isPopUp);
            console.log('isPopUp:', isPopUp);
          }catch(e){
            console.log(e)}
  }
  return (
    <div>
        <div className="userNavbar">
          Grant Block
           <CgProfile className="userProfile" onClick={handleProfileClick}>
          </CgProfile>
          <ProfilePopUp trigger={isPopUp} />
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
