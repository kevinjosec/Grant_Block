import React from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './UserHomePage.css'
import Lottie from 'lottie-react'
import userbg from '../Assests/user-bg.jpg'
import variety from '../Assests/variety.json'
import update from '../Assests/update.json'
import tracking from '../Assests/tracking.json'
const UserHomePage = () => {
  return (
    <div className='user-page-body'>
      <UserNavbar className="user-navbar" backgroundColor="transparent" />
      <div className="user-page-header">
        <h1 className="userHeader">
          Empowerment
          <br />through
          Government grants
        </h1>
        <h3 className="headerBody">
          Welcome to our government grant distribution site,
          where we aim to provide opportunities and support for
          individuals seeking financial assistance to pursue their
          dreams.<br />GrantBlock is a groundbreaking initiative designed to
          enhance government grant distribution in Kerala's local self-government levels.<br />
          Discover the vital role of efficient grant management and its impact on community development.
        </h3>
      </div>
      <br />
      <br />
      <div className="footer-body">
        <div className="footer-content">
          <p className="footer-head">Explore variety of grants for your needs</p>
          <p className="footer-para"> Discover the different types of <br />grants available, their objectives, <br />and application deadlines.</p>
          <button className="footer-button">Schemes</button>
        </div>
        <div className="footer-content"><Lottie animationData={variety} className='variety' /></div>
        <div className="footer-content"><Lottie animationData={update} className='update' /></div>
        <div className="footer-content">
          <p className="footer-head updated">Stay updated on grant opportunities</p>
          <p className="footer-para">Get the latest information on new <br />grants and upcoming  deadlines.</p>
          <button className="footer-button">Schemes</button>
        </div>
        <div className="footer-content">
          <p className="footer-head">Track your grant application status</p>
          <p className="footer-para">Monitor the progress of your <br />grant application and
            stay informed.</p>
          <button className="footer-button">Schemes</button>
        </div>
        <div className="footer-content"><Lottie animationData={tracking} className='tracking' /></div>
      </div>
    </div>
  )
}

export default UserHomePage
