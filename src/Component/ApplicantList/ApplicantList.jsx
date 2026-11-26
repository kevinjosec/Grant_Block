import React, { useContext, useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { CID, create } from 'ipfs-http-client'
import { IoIosArrowForward } from "react-icons/io";
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import './ApplicantList.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAccountBoxLine } from "react-icons/ri";
import dp from '../Assests/applicant-dp.svg'

const ApplicantList = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const schemeParameter = location.state?.schemeParameter;
  const [formData, setFormData] = useState([]);

  const ipfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  })

  const refresh = () => {
    window.location.reload();
  }

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
    const fetchData = async () => {
      try {
        const collectionName = 'applicantForm';
        const collectRef = collection(db, collectionName);
        const snapshot = await getDocs(collectRef);
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            Submitted: doc.data().Submitted ? doc.data().Submitted.toDate() : null,
          };
        })
        //cid formation
        const applications = [];
        for (let i = 0; i < data.length; i++) {
          const currentCID = data[i].CID;
          try {
            let ipfsContent = new Uint8Array(0);
            for await (const chunk of ipfs.cat(currentCID)) {
              ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
            }
            // Decryption
            const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent), "secretKey").toString(CryptoJS.enc.Utf8);
            const application = JSON.parse(decryptedData);
            application.id = data[i].id;
            application.CID = currentCID;
            application.Submitted = data[i].Submitted;
            applications.push(application);
          } catch (error) {
            console.error("Error fetching IPFS content for", currentCID, error);
          }
        }
        // Replace (not append) so StrictMode's double effect run can't duplicate entries
        setFormData(applications);
      }
      catch (e) {
        console.error("ERROR : ", e);
      }
    };
    fetchData();
  }, []);

  const handleExportData = (data) => {
    if (data) {
      navigate('/ApplicantForm', { state: { formData: data } })
    }
  }
  return (
    <div className='applicant-list-main-body'>
      <h1 className='candidates-header'>
        Applicants List
      </h1>
          <div className='list-group'>
            {formData.length > 0 ? (
              formData.filter((form) => form.param === schemeParameter)
                .map((form, index) => (
                  <div key={form.id ?? index} >
                    <p className='input-Tag'
                      onClick={() => {
                        handleExportData(form)
                      }}>
                      <img src={dp} alt="Profile" className="applicant-list-dp" style={{ width: "2em" }} />
                      <span className='applicant-name'>{form.name}</span>
                      <span className='applicant-date'>Applied on : {form.Submitted ? new Date(form.Submitted).toLocaleString() : 'Date not available'} </span>
                      <IoIosArrowForward
                        className="arrow-icon"
                        size={"2rem"} />
                    </p>
                  </div>
                )
                ))
              : (
                <p>No Applicants found.</p>
              )}
          </div>
    </div>
  )
}

export default ApplicantList