import './App.css';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import HomePage from './Component/HomePage/HomePage.jsx';
import { AuthContext } from './Component/AuthContext.jsx';
import UserHomePage from './Component/UserHomePage/UserHomePage.jsx';
import Schemes from './Component/Schemes/Schemes.jsx';
function App() {
 return (
  <AuthContext>
  <Router>
  <Routes>          
  <Route path="/" element={<HomePage/>} />
  <Route path="/UserHomePage" element={<UserHomePage/>} />
  <Route path="/signUp" element={<SignUp/>} />
  <Route path="/Login" element={<Login/>} />
  <Route path="/Schemes" element={<Schemes/>} />
  <Route path="/ApplicationForm" element={<Application_Form/>} />
  </Routes>      
  </Router>
  </AuthContext>
  );
}

export default App;
