import './App.css';
import React, { useState } from 'react';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import HomePage from './Component/HomePage/HomePage.jsx';
import { AuthProvider } from './Component/AuthContext.jsx';
import UserHomePage from './Component/UserHomePage/UserHomePage.jsx';
import Schemes from './Component/Schemes/Schemes.jsx';
import ProfileSettings from './Component/ProfileSettings/ProfileSettings.jsx';
import ApplicantForm from './Component/ApplicantForm/ApplicantForm.jsx';
import ApplicantList from './Component/ApplicantList/ApplicantList.jsx';
import Status from './Component/Status/Status.jsx';
import ChangePassword from './Component/ChangePassword/ChangePassword.jsx';
import GovHome from './Component/GovHome/GovHome.jsx';
import GovActive from './Component/GovActive/GovActive.jsx';
import GovResult from './Component/GovResult/GovResult.jsx';
import GovActiveScheme from './Component/GovActiveScheme/GovActiveScheme.jsx';
import ForgotPassowrd from './Component/ForgotPassword/ForgotPassowrd.jsx';
import Faq from './Component/Faq/Faq.jsx';
import Contact from './Component/Contactus/Contact.jsx'
import Notification from './Component/Notification/Notification.jsx'
import RequireAuth from './Component/RequireAuth.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UserHomePage" element={<RequireAuth role="user"><UserHomePage /></RequireAuth>} />
          <Route path="/Notification" element={<RequireAuth role="user"><Notification /></RequireAuth>} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Status" element={<RequireAuth role="user"><Status /></RequireAuth>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Schemes" element={<RequireAuth role="user"><Schemes /></RequireAuth>} />
          <Route path="/ApplicationForm" element={<RequireAuth role="user"><Application_Form /></RequireAuth>} />
          <Route path="/ProfileSettings" element={<RequireAuth role="user"><ProfileSettings /></RequireAuth>} />
          <Route path="/ChangePassword" element={<RequireAuth role="user"><ChangePassword /></RequireAuth>} />
          <Route path="/ForgotPassword" element={<ForgotPassowrd />} />
          <Route path="/GovHome" element={<RequireAuth role="gov"><GovHome /></RequireAuth>} />
          <Route path="/GovActive" element={<RequireAuth role="gov"><GovActive /></RequireAuth>} />
          <Route path="/GovActiveScheme" element={<RequireAuth role="gov"><GovActiveScheme /></RequireAuth>} />
          <Route path="/ApplicantList" element={<RequireAuth role="gov"><ApplicantList /></RequireAuth>} />
          <Route path="/ApplicantForm" element={<RequireAuth role="gov"><ApplicantForm /></RequireAuth>} />
          <Route path="/GovResult" element={<RequireAuth role="gov"><GovResult /></RequireAuth>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
