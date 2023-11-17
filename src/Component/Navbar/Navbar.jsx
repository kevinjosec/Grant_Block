import React from 'react'
import './Navbar.css'
import {auth, provider} from '../../firebase'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
export default function Navbar() {
  const navigate = useNavigate();
  return (
      <div>
              <div className='navbar'>
              Grant Block
              <button className='profileLogin' onClick={()=>navigate('/Login')}>
                Login
              </button>
              </div>
          </div>
  )
}
