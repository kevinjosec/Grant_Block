import React, { useContext } from 'react';
import { authContext } from '../AuthContext';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Status.css'
const Status = () => {
  const { userData } = useContext(authContext);

  const renderValue = (key, value) => {
    if (typeof value === 'object') {
     {
        return (
          <ul>
            {Object.entries(value).map(([nestedKey, nestedValue], index) => (
              <div className='status-div' key={index}>
                <label className='status-label-tag'>{`${nestedKey.toUpperCase()} `}</label><br></br>
                    <input type='text' className='status-input-tag' value ={renderValue(nestedKey, nestedValue)} readOnly onCopy={(e)=>e.preventDefault()}/>
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
  
  return (
    <div>
      <UserNavbar />
      <div>
        
        <br />
        <form>
        {
        userData ?(
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
      </div>
    </div>
  );
};

export default Status;
