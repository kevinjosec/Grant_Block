import React, { useState } from 'react'
import './GovHome.css'
import { CiViewList } from "react-icons/ci";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { RiQuestionAnswerLine } from "react-icons/ri";
import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom';
import GovActive from '../GovActive/GovActive';


const GovHome = () => {

    const [date, setNewDate] = useState(new Date());
    const navigate = useNavigate();
    const onChange = (newDate)=>{
        setNewDate(newDate);
    }

  return (
    <div className='gov-main-body'>
      <div className="gov-body-half">
        <div className="second-half one" onClick={()=>{navigate('/ApplicantList')}}>
            Applicant List <br/><CiViewList className='gov-home-icon' size={"3em"}/>
        </div>
        <div className="second-half">
            Show active schemes <br/><HiOutlineStatusOnline className='gov-home-icon' size={"3em"}/>
        </div>
        <div className="second-half" onClick={()=>{navigate('/GovActive')}}>
            Activate/Deactivate <br/><VscActivateBreakpoints className='gov-home-icon' size={"3em"}/>
        </div>
        <div className="second-half">
            Show result <br/><RiQuestionAnswerLine className='gov-home-icon' size={"3em"}/>
        </div>
        <br></br>
        <Calendar onChange={onChange} value={date}/>
        <br/>
        <div className="status-help-grid one">
                <button className="status-help download">Regulation process overview</button>
                <button className="status-help user-guide">User Guide</button>
                <button className="status-help  support">Contact Higher authority</button>
            </div>
      </div>
    </div>
  )
}

export default GovHome
