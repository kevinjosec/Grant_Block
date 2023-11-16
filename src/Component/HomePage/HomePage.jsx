import React from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar'
import homeImage from '../Assests/homeImage.png'

export default function HomePage() {
  return (
    <div>
      <Navbar/>
      <img src={homeImage} className='homeImage'/>
      <br/>
      <div>
        <div className='disclaimer'>
            <p className='Disclaimer'>
        Beneficiary list at each local self government 
        level is available through this website for those who have login 
        permission and for those who are not, through the respective local 
        self-government website.
        </p>
        </div>
        <br/>
      
        <div className='listHeader'>
            List of Schemes
        </div>
     <ol className='list'>
        <li><button className='listButton'>Poultry Breeding (Female) </button> </li>
        <li><button className='listButton'>Subsidy for milk to dairy farmer</button> </li>
        <li><button className='listButton'>Fodder subsidy for dairy cows</button> </li>
        <li><button className='listButton'>Scholarship for physically and mentally challenged</button> </li>
        <li><button className='listButton'>Allowance of cochlear implantation expenses</button> </li>
        <li><button className='listButton'>Cots for the elderly</button> </li>
        <li><button className='listButton'>For post graduate diploma students</button> </li>
        <li><button className='listButton'>Home renovation</button> </li>
        <li><button className='listButton'>Home renovation general</button> </li>
        <li><button className='listButton'>Wheelchair for elderly</button> </li>
        <li><button className='listButton'>Ayur jack plow</button> </li>
        <li><button className='listButton'>Pepper (female)</button> </li>
        <li><button className='listButton'>Distribution of planting material (women)</button> </li>
        <li><button className='listButton'>We are also into agriculture</button> </li>
     </ol>
     <div className='newsDownload'>
        <div className='news'>
            <div className='newsHeader'>
                Latest News
            </div>
        </div>
        <div className='download'>
            <div className='downloadHeader'>
                Download Documents
            </div>
        </div>
     </div>
     <div className="listHeader">
      About Us
     </div>
     <div className="disclaimer">
      <p className="Disclaimer">
      At Grant Block, we are committed to making a positive
      impact through our innovative projects and initiatives.
       One such endeavor is our ongoing project to streamline the
        government grants system. This initiative reflects our dedication
         to improving public
      services and fostering transparency, efficiency, and
       accessibility in the public sector.
      </p>
     </div>
     <div className="footer">
     Copyright © Grant Block 2023. All Rights Reserved .Designed and Developed by Group 16
     </div>
      </div>
    </div>
  )
}
