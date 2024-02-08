import React from 'react';
import { useLocation } from 'react-router-dom';
import './ApplicantForm.css';

const ApplicantForm = ({ exportedData }) => {
  const location = useLocation();
  const formData = location.state?.formData;

  const openPdfInNewPage = (pdfData) => {
    // Create a new window and write the PDF data to it
    const newWindow = window.open();
    newWindow.document.write(`<iframe width="100%" height="100%" src="data:application/pdf;base64,${pdfData}" frameborder="0" allowfullscreen></iframe>`);
  };

  const renderField = (label, value) => {
    if (label.endsWith('Pic')) {
      // Render a button for pictures
      return (
        <div className="result-card" key={label}>
          <label className="result-label">{label}</label>
          <br />
          <button className='view-pdf' onClick={() => openPdfInNewPage(value)}>
            View Document
          </button>
        </div>
      );
    } else {
      // Render regular field
      return (
        <div className="result-card" key={label}>
          <label className="result-label">{label}</label>
          <br />
          <p className="input-tag">{value}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="candidate-header">Candidate Marklist</h1>
      {formData ? (
        <div className="container">
          <div className="form-group">
            {Object.entries(formData).map(([label, value]) =>
              renderField(label, value)
            )}
          </div>
        </div>
      ) : (
        <p>No data </p>
      )}
    </div>
  );
};

export default ApplicantForm;
