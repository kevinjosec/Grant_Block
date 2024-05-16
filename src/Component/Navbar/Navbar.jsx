import React from 'react'
import './Navbar.css'
import { auth, provider } from '../../firebase'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate();
  return (
    <div className='navbar-main-body'>
      <div className='Navbar'>
        <h1 className="grant-block-header">Grant Block</h1>
        <li className="navbar-list">
          <button className="navbar faq" onClick={()=>{navigate('/Faq')}}>F A Q</button>
          <button className="navbar contact-us" onClick={()=>{navigate('/Contact')}}>Contact us </button>
        </li>
        <button className='profile-login' onClick={() => navigate('/Login')}>
          LOGIN
        </button>
      </div>
    </div>
  )
}
