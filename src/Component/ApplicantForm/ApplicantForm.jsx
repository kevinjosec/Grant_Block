import React, { useEffect, useState } from 'react';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc, deleteDoc, query, where, increment } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import './ApplicantForm.css';
import Web3 from 'web3';
import EvaluationABI from '../../Evaluation.json';

const ApplicantForm = ({ exportedData }) => {

  const evaluationABI = EvaluationABI.abi;
  const contractAddress = '0x0516BD10641FcC85d5716026b56a4Cc2b27c0a86';
  const web3 = new Web3(window.ethereum);
  const evaluationContract = new web3.eth.Contract(evaluationABI, contractAddress);

  const location = useLocation();
  const formData = location.state?.formData;
  const [showPopUp, setPopUp] = useState(false);
  const [decission, setDecission] = useState();
  const navigate = useNavigate();

  const [totalMarks, setTotalMarks] = useState();
  const [mark, setMark] = useState();
  const [account, setAccount] = useState();
  const [applicants, setApplicants] = useState([]);

  const calculateMarks = async () => {
    if (!evaluationContract || !formData) {
      console.log("Contract / Form data is missing.");
      return;
    }
    else {
      try {
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
          formData.toilet,
        ];
        await evaluationContract.methods.calculateMarks(fields).send({ from: account });
        const result = await evaluationContract.methods.getMarks().call();
        console.log("Result-1: ", result[0]);
        console.log("Result-2: ", result[1]);
        setTotalMarks(result[1]);
        setMark(result[0]);
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (e) {
          console.error(e);
        }
      }
      else {
        alert("Metamask is not available.");
      }
    }
    initWeb3();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    confirmCandidate();
  };

  const confirmCandidate = async () => {
    const confirmed = window.confirm('Once changes are made, they cannot be reverted. \n Are you sure you want to confirm?');
    if (confirmed && decission) { 
      try {
        await evaluationContract.methods.addApplicant(
          formData.name,
          formData.phoneNo,
          formData.address,
          formData.param,
          formData.wardNo,
          formData.houseNo,
          `${totalMarks}`,
        ).send({ from: account });
        const applicantCount = await evaluationContract.methods.getApplicantsLength().call();
        const fetchedApplicant = [];
        for (let i = 0; i < applicantCount; i++) {
          const applicant = await evaluationContract.methods.applicants(i).call();
          fetchedApplicant.push(applicant);
        }
        console.log("Result-3: ", fetchedApplicant);
        console.log("Result-4: ", applicantCount);
        setApplicants(fetchedApplicant);

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
    else if (confirmed){
      try{
        const q = query(collection(db, 'applicantForm'), where('CID', '==', formData.CID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        })
        const schemeRef = doc(db, 'scheme', formData.param);
        await updateDoc(schemeRef, {
          count: increment(-1)
        });
      }
      catch(e){
        console.error(e);
      }
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
              </div>
              <div className="no-mark-items">
                <label className="label-name">Kudumbasree</label>
                <p className="field-name">{formData.kudumbasreed.toUpperCase()}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">divorced/Widow</label>
                <p className="field-name">{formData.widow.toUpperCase()}</p>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Disablity</label>
                <p className="field-name">{formData.disabled.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[3]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">APL or BPL</label>
                <p className="field-name">{formData.pl}</p>
                <label className="field-mark">Mark: {mark && `${mark[1]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Government employed</label>
                <p className="field-name">{formData.government.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[8]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Source of water</label>
                <p className="field-name">{formData.water.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[10]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Toilet facilities</label>
                <p className="field-name">{formData.toilet.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[11]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Agriculture</label>
                <p className="field-name">{formData.agriculture.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[0]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Disease</label>
                <p className="field-name">{formData.disease.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[4]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Unmarried daughters</label>
                <p className="field-name">{formData.unmarried.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[5]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Previous Schemes</label>
                <p className="field-name">{formData.previous.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[6]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Caste</label>
                <p className="field-name">{formData.caste.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[7]}`}/20</label>
              </div>
              <div className="no-mark-items">
                <label className="label-name">Land owned</label>
                <p className="field-name">{formData.land.toUpperCase()}</p>
                <label className="field-mark">Mark: {mark && `${mark[9]}`}/20</label>
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
                <p className="field-name">{`${totalMarks}`}/200</p>
                <button
                  className="calculate-button"
                  onClick={() => { calculateMarks() }}>
                  Calculate marks
                </button>
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