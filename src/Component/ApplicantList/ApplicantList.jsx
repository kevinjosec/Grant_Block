import React, { useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { CID, create } from 'ipfs-http-client'
import { IoIosArrowForward } from "react-icons/io";
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import './ApplicantList.css'
import { useNavigate } from 'react-router-dom';
import { RiAccountBoxLine } from "react-icons/ri";
import dp from '../Assests/applicant-dp.svg'


const ApplicantList = ({ onExportdata }) => {

  const navigate = useNavigate();
  const ipfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  })
  const [formData, setFormData] = useState([]);
  const [contentID, setContentID] = useState(null);

  //concatenateUint8arrays
  function concatenateUint8Arrays(a, b) {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
  }

  //uint8ArrayToString
  function uint8ArrayToString(uint8Array) {
    return new TextDecoder().decode(uint8Array);
  }

  useEffect(() => {
    //database retrival
    const collectionName = 'applicantForm';
    const fetchData = async () => {
      try {
        const collectRef = collection(db, collectionName);
        const snapshot = await getDocs(collectRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          Submitted: doc.Submitted,
          ...doc.data(),
        }));
        console.log("CIDs : ", data);
        //decryption key

        //cid formation
        for (let i = 0; i < data.length; i++) {
          const currentCID = data[i].CID;
          console.log("Current CID : ", currentCID);
          const ipfsContentGenerator = ipfs.cat(currentCID);
          let ipfsContent = new Uint8Array(0);

          for await (const chunk of ipfsContentGenerator) {
            ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
          }

          console.log("IPFS Content : ", ipfsContent);

          // Decryption
          const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent), "secretKey").toString(CryptoJS.enc.Utf8);
          const application = JSON.parse(decryptedData);

          // Check if the application data is not already in the state
          if (!formData.find((item) => item.id === application.id)) {
            setFormData((prevData) => [...prevData, application]);
          }
        }

      }
      catch (e) {
        console.log("ERROR : ", e);
      }
    };
    fetchData();
  }, []);

  const handleExportData = (data) => {
    if (data) {
      setFormData(data);
      navigate('/ApplicantForm', { state: { formData: data } })
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  return (
    <div className='applicant-list-main-body'>
      <h1 className='candidates-header'>
        Applicants List
      </h1>
      <div className='list-group'>
        {formData.length > 0 ? formData.map((form, index) => (
          <div key={index} >
            <p className='input-Tag'
              onClick={() => handleExportData(form)}>
              <img src={dp} alt="Profile" className="applicant-list-dp" style={{ width: "2em" }} />
              <span className='applicant-name'>{form.name}</span>
              <span className='applicant-date'>Applied on {formatDate(form.Submitted)} </span>
              <IoIosArrowForward
                className="arrow-icon"
                size={"2rem"} />
            </p>
          </div>
        )
        ) : (
          <p>No Applicants found.</p>
        )}
      </div>
    </div>
  )
}

export default ApplicantList
