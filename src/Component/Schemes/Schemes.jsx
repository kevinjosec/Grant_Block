import React, { useContext, useEffect, useState } from 'react';
import UserNavbar from '../UserNavbar/UserNavbar';
import './Schemes.css';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import { scheme, updateApplicantCount } from '../SchemeList';
import { CgAlignCenter } from 'react-icons/cg';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import noscheme from '../Assests/noscheme.svg';
import { CID, create } from 'ipfs-http-client'



const Schemes = () => {
  const navigate = useNavigate();
  const [schemeActivated, setSchemeActivated] = useState(false);
  const [ipfsStatus, setIpfsStatus] = useState(false);

  const ipfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http'
  })
  const refresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    const fetchActivateStatus = async () => {
      const docRef = doc(db, 'schemeActivation', 'hk9qbigYr3rjrHi0RJ9t')
      const docRefSnapshot = await getDoc(docRef);
      if (docRefSnapshot.exists()) {
        setSchemeActivated(data);
      }
    }
    fetchActivateStatus();
    ipfsstatus();
  }, [])

  const ipfsstatus = async () => {
    try {
      const statusIPFS = await ipfs.id();
      if (statusIPFS) {
        setIpfsStatus(true);
      }
    } catch (error) {
      setIpfsStatus(false); // Set IPFS status to false if there's an error
    }
  };


  return (
    <div className='scheme-main-body'>
      <UserNavbar backgroundColor="transparent" />
      <div className="scheme-second-body">
      {schemeActivated ? (
        ipfsStatus ?
          (
            <div className="scheme-page">
              {
                scheme.map((scheme) => (
                  <div key={scheme.id} className="scheme-card" onClick={() => (navigate('/ApplicationForm', { state: { param: `${scheme.name}` } }))} style={{ backgroundImage: `url(${scheme.image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className="scheme-name">
                      <div className="scheme-title">{scheme.name}</div>
                      <p className="scheme-content">{scheme.content}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div>
              <div className="no-ipfs-container">
                <img src={noscheme} alt="IPFS not detected" className="no-ipfs-image" />
              </div>
              <p className="no-ipfs">Run the following command in your terminal to establish IPFS connection: <br /> ipfs daemon</p>
              <div className="refresh-container one">
                <button className="refresh one" onClick={() => { refresh() }}>Refresh page</button>
              </div>
            </div>
          )) : (
        <div>
          <p className="no-schemes-activated">
            Currently no schemes have been activated. <br />
            Please contact district co-ordinator for the follow up.
          </p>
          <div className="refresh-container">
            <button className="refresh" onClick={() => { refresh() }}>Refresh page</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Schemes;
