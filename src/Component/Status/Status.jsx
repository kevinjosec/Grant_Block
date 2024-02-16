import React, { useContext } from 'react';
import { authContext } from '../AuthContext';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Status.css'
import approved from '../Assests/approved.svg'
import { RiFolderReceivedFill } from "react-icons/ri";
import { SiCodereview } from "react-icons/si";
import { RiVerifiedBadgeFill } from "react-icons/ri";


const Status = () => {
  /* 
  const { userData } = useContext(authContext);
  const renderValue = (key, value) => {
    if (typeof value === 'object') {
      {
        return (
          <ul>
            {Object.entries(value).map(([nestedKey, nestedValue], index) => (
              <div className='status-div' key={index}>
                <label className='status-label-tag'>{`${nestedKey.toUpperCase()} `}</label><br></br>
                <input type='text' className='status-input-tag' value={renderValue(nestedKey, nestedValue)} readOnly onCopy={(e) => e.preventDefault()} />
              </div>
            ))}
          </ul>
        );
      }
    } else if (key === 'fileInput') {
      return (
        <a href={value.url} target='_blank' rel='noopener noreferrer'>
          {value.fileName}
        </a>
      );
    }
    return value;
  };
 */
  return (
    <div className='status-bg-body'>
      <UserNavbar backgroundColor="transparent" />
      {/* <div>
        <form>
          {
            userData ? (
              Object.entries(userData).map(([key, value]) => (
                <div key={key}>
                  {renderValue(key, value)}
                </div>
              ))) : (
              <h4>
                No Active Applications
              </h4>
            )}
        </form>
      </div> */}
      <div className="status-main-body">
      <div className="status-body">
        <h1 className="status-header">Status</h1>
        <div className="status-block">
          <h3 className="status-name">Life Mission</h3>
          <p className="status-date">Applied on 13th May 2002</p>
          <img src={approved} alt="Approved" className="status-approved" style={{ width: "200px" }} />
        </div>
        <div className="status-steps">
          <RiFolderReceivedFill className="status-icon" size={"1.5em"} /><span className="status-application-form-received">Application received</span>
          <br />
          <SiCodereview className="status-icon" size={"1.5em"} /><span className="status-application-form-received">Initial review</span>
          <br />
          <RiVerifiedBadgeFill className="status-icon" size={"1.5em"} /><span className="status-application-form-received">Initial review</span>
          <br />
        </div>
        <button className="status-cancel-button">Cancel application</button>
      </div>
      </div>
    </div>
  );
};

export default Status;
