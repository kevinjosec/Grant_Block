import React, { useEffect, useState } from 'react';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc, deleteDoc, query, where, increment } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import './ApplicantForm.css';
import Web3 from 'web3';
import Evaluation from '../../Evaluation.json'

const ApplicantForm = ({ exportedData }) => {
  const location = useLocation();
  const formData = location.state?.formData;
  const [showPopUp, setPopUp] = useState(false);
  const [decission, setDecission] = useState();
  const navigate = useNavigate();

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);
  const [mark, setMark] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = Evaluation.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            Evaluation.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
        } catch (e) {
          console.error(e);
        }
      }
    }
    initWeb3();
  }, []);
  useEffect(()=>{calculateMarks()},[]);

  const calculateMarks = async () =>{
    if(!contract || !formData) return;
    try{
      const fields = [
        formData.agriculture,   
        formData.pl,   
        formData.widow,   
        formData.disabled,   
        formData.disease,   
        formData.unmarried,   
        formData.previous,   
        formData.caste,   
        formData.government,   
        formData.land,   
        formData.water,   
        formData.toilet   
      ];
      const marks = await contract.methods.calculateMarks(fields).call();
      setTotalMarks(marks.reduce((acc, val)=>acc + val,0));
      setMark(marks);
    }catch(e){
      console.error(e);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmCandidate();
  };

  const confirmCandidate = async () => {
    const confirmed = window.confirm('Once changes are made, they cannot be reverted. \n Are you sure you want to confirm?');
    if (confirmed) {
      try {
        const q = query(collection(db, 'applicantForm'), where('CID', '==', formData.CID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        })
        const schemeRef = doc(db, 'scheme', formData.param);
        await updateDoc(schemeRef, {
          count: increment(-1)
        });
      } catch (e) {
        console.error(e);
      }
      navigate('/ApplicantList')
    }
  }

  const openPdfInNewPage = (pdfData) => {
    // Create a new window and write the PDF data to it
    const newWindow = window.open();
    newWindow.document.write(`<iframe width="100%" height="100%" src="data:application/pdf;base64,${pdfData}" frameborder="0" allowfullscreen></iframe>`);
  };

  const renderField = (label, value) => {
    if (label.endsWith('file')) {
      // Render a button for pictures
      return (
        <div className="label-name" key={label}>
          <label className="result-label">{label}</label>
          <br />
          <button className='view-pdf' onClick={() => openPdfInNewPage(value)}>
            View Document
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="candidate-header">Candidate application form</h1>
      {
        formData ? (
          <div className="applicant-form-container">
            <div className="applicant-form">
              <div className="no-mark-items one">
                <label className="label-name">Full name</label>
                <p className="field-name">{formData.name}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Phone Number</label>
                <p className="field-name">+91{formData.phoneNo}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">House no</label>
                <p className="field-name">{formData.houseNo}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Address</label>
                <p className="field-name">{formData.address}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Ward no</label>
                <p className="field-name">{formData.wardNo}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Ration card no</label>
                <p className="field-name">{formData.rationNo}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Adhar card no</label>
                <p className="field-name">{formData.adharNo}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Applied Scheme</label>
                <p className="field-name">{formData.param}</p>
              </div>
            </div>
            {/*2nd level*/}
            <div className="applicant-form">
              <div className="no-mark-items">
                <label className="label-name">Annual income</label>
                <p className="field-name">{formData.income}</p>
                <label className="field-mark">Mark:{mark?mark[0]:"null"}</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Kudumbasree</label>
                <p className="field-name">{formData.kudumbasreed.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Disablity</label>
                <p className="field-name">{formData.disabled.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">APL or BPL</label>
                <p className="field-name">{formData.pl}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Government employed</label>
                <p className="field-name">{formData.government.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Source of water</label>
                <p className="field-name">{formData.water.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Toilet facilities</label>
                <p className="field-name">{formData.toilet.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Agriculture</label>
                <p className="field-name">{formData.agriculture.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">divorced/Widow</label>
                <p className="field-name">{formData.widow.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Disease</label>
                <p className="field-name">{formData.disease.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Unmarried daughters</label>
                <p className="field-name">{formData.unmarried.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Previous Schemes</label>
                <p className="field-name">{formData.previous.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Caste</label>
                <p className="field-name">{formData.caste.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Land owned</label>
                <p className="field-name">{formData.land.toUpperCase()}</p>
                <label className="field-mark">Mark: 12/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Village</label>
                <p className="field-name">{formData.village ? formData.village.toUpperCase() : "Document not found"}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Survey no</label>
                <p className="field-name">{formData.surveyNo ? formData.surveyNo.toUpperCase() : "Document not found"}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Area</label>
                <p className="field-name">{formData.area ? formData.area.toUpperCase() : "Document not found"}</p>
              </div>
              <div className="no-mark-items">
                {formData && formData.rationPic && renderField("Ration card file", formData.rationPic)}
              </div>
              <div className="no-mark-items">
                {formData && formData.adharPic && renderField("Adhar card file", formData.adharPic)}
              </div>
              <div className="no-mark-items">
                {formData && formData.incomePic && renderField("Annual income file", formData.incomePic)}
              </div>
              <div className="no-mark-items">
                {formData && formData.landPic && renderField("Land file", formData.landPic)}
              </div>
              <div className="no-mark-items">
                <label className="label-name">Total Marks</label>
                <p className="field-name">xx/100</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="nothing"></p>
        )
      }
      <div className="applicant-button">
        <button className="applicant-button-reject color-change-btn"
          onClick={() => {
            setDecission("rejection");
            setPopUp(true)
          }}>
          Reject candidate
        </button>
        <button className="applicant-button-approve color-change-btn"
          onClick={() => {
            setDecission("approval");
            setPopUp(true)
          }}>
          Approve candidate
        </button>
        <br />
        {
          showPopUp ? (
            <div className="comment-box-container">
              <form onSubmit={(event) => { handleSubmit(event) }}>
                <input type="text"
                  required
                  className="comment-box"
                  placeholder={`Enter the reason for your ${decission} of the specific candidate`} />
                <br />
                <button type='submit'
                  className="confirm-button">
                  Confirm
                </button>
              </form>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default ApplicantForm;