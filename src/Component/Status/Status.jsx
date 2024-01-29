import React, { useContext } from 'react';
import { authContext } from '../AuthContext';
import UserNavbar from '../UserNavbar/UserNavbar';

const Status = () => {
  const { userData } = useContext(authContext);

  const renderValue = (key,value) => {
    if (typeof value === 'object') {
      // Handle rendering of nested objects, you can customize this part
      return JSON.stringify(value);
    }
    else if (key ==='fileInput')
    {
      return <a href={value.url} target='_blank' rel='noopener noreferrer'>{value.fileName}</a>;
    }
    else if(Array.isArray(value))
    {
      return value.map((item,index)=>(
        <span key={index}>
          <input type='radio'value={item} name={key} readOnly checked={value===item}/>
        </span>
      ))
    }
    return value;
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <h2>Form Data</h2>
        <br />
        <form>
        {userData &&
          Object.entries(userData).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}> {key}: {renderValue(value)}</label>
              <br />
            </div>
          ))}
          </form>
      </div>
    </div>
  );
};

export default Status;
