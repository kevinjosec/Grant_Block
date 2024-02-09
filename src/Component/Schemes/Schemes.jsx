import React from 'react';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Schemes.css';
import { useNavigate } from 'react-router-dom';
import schemes from '../SchemeList';
import { CgAlignCenter } from 'react-icons/cg';

const Schemes = () => {
  const navigate = useNavigate();

  return (
    <div className='scheme-main-body'>
      <UserNavbar backgroundColor="transparent"/>
      <div className="scheme-page">
        {
          schemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card" style={{ backgroundImage: `url(${scheme.image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              <div className="scheme-name">
                <div className="scheme-title">{scheme.name}</div>
                <p className="scheme-content">{scheme.content}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Schemes;
