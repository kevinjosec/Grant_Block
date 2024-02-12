import './App.css';
import React, { useState } from 'react';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import HomePage from './Component/HomePage/HomePage.jsx';
import { AuthContext } from './Component/AuthContext.jsx';
import UserHomePage from './Component/UserHomePage/UserHomePage.jsx';
import Schemes from './Component/Schemes/Schemes.jsx';
import ProfileSettings from './Component/ProfileSettings/ProfileSettings.jsx';
import ApplicantForm from './Component/ApplicantForm/ApplicantForm.jsx';
import ApplicantList from './Component/ApplicantList/ApplicantList.jsx';
import Status from './Component/Status/Status.jsx';
function App() {

  const [selectedFormData, setSelectedFormData] = useState();

  const handleExportData = (form) => {
    setSelectedFormData(form);
  };

  return (
    /*
      <Router>
        <Routes>
        <Route path ="/" element ={<ApplicantList  />} />
          <Route path ="/ApplicantForm" element ={ <ApplicantForm />} />
        </Routes>
      </Router>*/

    <AuthContext>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UserHomePage" element={<UserHomePage />} />
          <Route path="/Status" element={<Status />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/ApplicationForm" element={<Application_Form />} />
          <Route path="/ProfileSettings" element={<ProfileSettings />} />
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
