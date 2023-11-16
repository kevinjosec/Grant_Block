import React from 'react'
import './Navbar.css'
import {auth, provider} from '../../firebase'
import { useAuth } from '../AuthContext'
export default function Navbar() {
  const {currentUser} = useAuth();
  console.log(currentUser.fname)
  return (
      <div>
              <div className='navbar'>
              Grant Block
              <button className='profileLogin'>
                {currentUser ? currentUser.fname : "Login"}
              </button>
              </div>
          </div>
  )
}
