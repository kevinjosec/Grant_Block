import React from 'react'
import './Navbar.css'
import { auth, provider } from '../../firebase'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'

export default function Navbar() {

  const navigate = useNavigate();
  return (
    <div>
      <div className='navbar'>
        <h1 className="grant-block-header">Grant Block</h1>
        <button className='profile-login' onClick={() => navigate('/Login')}>
          LOGIN
        </button>
      </div>
    </div>
  )
}
