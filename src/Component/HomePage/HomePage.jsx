import React from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar'
import grant from '../Assests/grant.jpg'
import { GiIndiaGate } from "react-icons/gi";
import indianmap from "../Assests/indianmap.jpg"
import wallet from "../Assests/wallet.svg"
import howto from "../Assests/howto.svg"
import contactus from "../Assests/contactus.svg"

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="head-grid">
        <div className="head-grid1">
          <p className="sub-heading">Embassy of India Organizes </p>
          <h1 className="grant-block">Grant Block</h1>
          <p className="sub-heading">Blockchain system to streamline grant distribution and allocation</p>
        </div>
        <div className="head-grid2">
          <img src={grant} alt="Grant Block" className='grant' />
        </div>
      </div>

      <div className="slogan">
        <h3 className="grant-Block"> Yojana Vyavastha </h3>
        <p className="sub-heading2">
          Unlocking Opportunities, Bridging Divides: Join us on a journey of empowerment,
          where innovation meets inclusivity, and every click paves the way for a brighter tomorrow!</p>
        <img src={indianmap} alt="Indian Map" className='indian-map' />
      </div>

      <div className="about-grant-block">
        <h2 className="grantblock">ABOUT GRANT BLOCK</h2>
        <p className="sub-heading3">Beneficiary list at each local self government 
        level is available through this website for those who have login 
        permission and for those who are not, through the respective local 
        self-government website.</p>
      </div>

      <div className="help-line">
        <div className="help-line1">
          <img src={wallet} alt="wallet" className='wallet' />
          <h4 className="who-can-apply">Who can apply?</h4>
          <p>Those experiencing economic challenges can apply when the applications open</p>
        </div>
        <div className="help-line2">
        <img src={howto} alt="wallet" className='howto' />
          <h4 className="who-can-apply">How to apply?</h4>
          <p>Visit nearby Akshaya to know about the necessary procedures and documents</p>
        </div>
        <div className="help-line3">
        <img src={contactus} alt="wallet" className='contactus' />
          <h4 className="who-can-apply">Want to know more?</h4>
          <p>Contact nearby Akshaya centre or dial respective district representatives</p>
        </div>
      </div>
    </div>
  )
}
