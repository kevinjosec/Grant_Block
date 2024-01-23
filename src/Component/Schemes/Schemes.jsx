import React from 'react';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Schemes.css';
import { useNavigate } from 'react-router-dom';
import schemes from '../SchemeList';

const Schemes = () => {
  const navigate = useNavigate();

  return (
    <div>
      <UserNavbar />
      <div className="scheme-page">
      {schemes.map((scheme) => (
        <button
          className="schemeCard"
          onClick={() => navigate('/ApplicationForm')}
          key={scheme.id}>
          <h5>{scheme.name}</h5>
        </button>
      ))}
      </div>
    </div>
  );
};

export default Schemes;
