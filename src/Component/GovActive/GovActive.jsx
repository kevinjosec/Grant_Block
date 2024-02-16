import React from 'react'
import './GovActive.css'
import { BsFillDoorOpenFill } from "react-icons/bs";
import activate from '../Assests/activate.svg'

const GovActive = () => {
  return (
    <div className='active-main-body'>
        <div className="active-body">
            <h3 className="active-schemes">Activate all schemes</h3>
            <button className="active-schemes-button">Activate <BsFillDoorOpenFill className='active-schemes-icon'/></button>
            <img src={activate} alt="Activate" className="active-schemes-image" style={{width:"200px"}}/>
            </div><br/>  
        <div className="active-body">
            <h3 className="active-schemes">Deactivate all schemes</h3>
            <button className="active-schemes-button">Deactivate <BsFillDoorOpenFill className='active-schemes-icon'/></button>
            <img src={activate} alt="Activate" className="active-schemes-image" style={{width:"200px"}}/>
            </div><br/>  
        <div className="active-body">
            <h3 className="active-schemes">Activate some schemes</h3>
            <button className="active-schemes-button">Activate <BsFillDoorOpenFill className='active-schemes-icon'/></button>
            <img src={activate} alt="Activate" className="active-schemes-image" style={{width:"200px"}}/>
            </div><br/>  
        <div className="active-body">
            <h3 className="active-schemes">Deactivate some schemes</h3>
            <button className="active-schemes-button">Deactivate <BsFillDoorOpenFill className='active-schemes-icon'/></button>
            <img src={activate} alt="Activate" className="active-schemes-image" style={{width:"200px"}}/>
            </div><br/>  
            <button className="active-schemes-save-changes">Save all changes</button>
    </div>
  )
}

export default GovActive
