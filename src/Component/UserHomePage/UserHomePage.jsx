import React from 'react'
import UserNavbar from '../UserNavbar/UserNavbar'
import './UserHomePage.css'

const UserHomePage = () => {
  return (
    <div>
      <UserNavbar/>
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
          </div>
          <div className="footerContent">
            Stay updated on <br/>Grant opportunities
            <p  className="footerFooter">Get the latest information on new <br/>grants and upcoming  deadlines.</p>
          </div>
          <div className="footerContent">Track your <br/>Grant application status
          <p  className="footerFooter">Monitor the progress of your <br/>grant application and
             stay informed.</p>
          </div>
        </div>
        <div className="footerButtonGrid">
        <button className='footerButton1'>Learn More</button>
        <button className='footerButton11'>Apply now</button>
        <button className='footerButton2'>Learn More</button>
        <button className='footerButton21'>Contact Us</button>
        <button className='footerButton3'>Learn More</button>
        <button className='footerButton31'>Contact Support</button>
        </div>
    </div>
  )
}

export default UserHomePage
