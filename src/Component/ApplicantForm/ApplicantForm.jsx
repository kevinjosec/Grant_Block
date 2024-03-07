import React, { useState } from 'react';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc, deleteDoc, query, where, increment } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import './ApplicantForm.css';

const ApplicantForm = ({ exportedData }) => {
  const location = useLocation();
  const formData = location.state?.formData;
  const [showPopUp, setPopUp] = useState(false);
  const navigate = useNavigate();

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
                <label className="field-mark">Mark: 12/20</label>
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
        <button className="applicant-button-reject"
          onClick={() => setPopUp(true)}>
          Reject candidate
        </button>
        <button className="applicant-button-approve"
          onClick={() => setPopUp(true)}>
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
                  placeholder='Enter the reason for your approval/rejection of the specific candidate' />
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