import React from 'react'
import './UserNavbar.css'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase'
function UserNavbar() {
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
  
  return (
    <div>
        <div className="userNavbar">
          Grant Block <CgProfile className="userProfile" onClick={handleSignOut}></CgProfile>
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
