import React from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './Schemes.css'
import { useNavigate } from 'react-router-dom'
const Schemes = () => {
  const navigate = useNavigate();
  return (
    <div>
        <UserNavbar/>
        <button className="schemeCard" onClick={()=>navigate('/ApplicationForm')}>
            <h1 className="schemeName">
                Life Mission
            </h1>
            <p className='subHeading'>
                Last Date: xx-yy-zz
            </p>
        </button>
    </div>
  )
}

export default Schemes
