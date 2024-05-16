import React, { useState } from 'react'
import './GovHome.css'
import { CiViewList } from "react-icons/ci";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { RiQuestionAnswerLine } from "react-icons/ri";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom';
import GovActive from '../GovActive/GovActive';
import GovActiveResult from '../GovActiveScheme/GovActiveScheme'

const GovHome = () => {

  const [date, setNewDate] = useState(new Date());
  const navigate = useNavigate();
  const onChange = (newDate) => {
    setNewDate(newDate);
  }

  return (
    <div className='gov-home-main-body'>
      <div className="welcome-text">
        <h2 className="welcome-to-gov-home">Welcome to Grant Block Administration System</h2>
        <strong className="welcome-veo">Hello V.E.O</strong>
      </div>
      <br/>
      <br/>

      <div className="gov-home-half">
        <div className="gov-home-options" onClick={() => navigate('/GovActiveScheme')}>
          Show active schemes <br/><br/><HiOutlineStatusOnline className='gov-home-icon' size={"2.5em"} />
        </div>
        <div className="gov-home-options" onClick={() => { navigate('/GovActive') }}>
          Activate/Deactivate <br/><br/><VscActivateBreakpoints className='gov-home-icon' size={"2.5em"} />
        </div>
        <div className="gov-home-options" onClick={() => { navigate('/GovResult') }}>
          Show result <br /><br/><RiQuestionAnswerLine className='gov-home-icon' size={"2.5em"} />
        </div>
      </div>
      <div className="gov-home-rules">
        <button className="gov-rules download">Regulation process overview</button>
        <button className="gov-rules user-guide">User Guide</button>
        <button className="gov-rules support">Contact Higher authority</button>
      </div>
      
      <br></br>
{/*       <Calendar onChange={onChange} value={date} />
 */}      <br />

    </div>
  )
}

export default GovHome
