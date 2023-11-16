import React from 'react'
import './UserNavbar.css'
import { CgProfile } from "react-icons/cg";
function UserNavbar() {

  return (
    <div>
        <div className="userNavbar">
          Grant Block <CgProfile className="userProfile"></CgProfile>
          <ul className="userNavbarList">
            <li className='li'>
              Home
            </li>
            <li className='li'>
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
        <h1 className="userHeader">
        Empowering 
Individuals Through<br/>
Government Grants
        </h1>
        <h3 className="headerBody">
        Welcome to our government grant distribution site, 
        where we aim to provide opportunities and support for
         individuals seeking financial assistance to pursue their 
         dreams.GrantBlock is a groundbreaking initiative designed to 
         enhance government grant distribution in Kerala's local self-government levels. 
         Discover the vital role of efficient grant management and its impact on community development.
        </h3>
        <br/><br/>
        <div className="footerBody">
          <div className="footerContent">
            Explore variety of <br/>Grants for your needs
            <p  className="footerFooter"> Discover the different types of <br/>grants available, their objectives, <br/>and application deadlines.</p>
            <button className='footerButton'>Learn More</button>
          </div>
          <div className="footerContent">
            Stay updated on <br/>Grant opportunities
            <p  className="footerFooter">Get the latest information on new <br/>grants and upcoming  deadlines.</p>
            <button className='footerButton'>Learn More</button>
          </div>
          <div className="footerContent">Track your <br/>Grant application status
          <p  className="footerFooter">Monitor the progress of your <br/>grant application and
             stay informed.</p>
            <button className='footerButton'>Learn More</button>
          </div>
        </div>
    </div>
  )
}

export default UserNavbar
