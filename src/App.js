import './App.css';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import HomePage from './Component/HomePage/HomePage.jsx';
import { AuthContext } from './Component/AuthContext.jsx';
function App() {
 return (
  <AuthContext>
  <Router>
  <Routes>          
  <Route path="/" element={<Login/>} />
  <Route path="/signUp" element={<SignUp/>} />
  <Route path="/HomePage" element={<HomePage/>} />
  <Route path="/Login" element={<Login/>} />
  </Routes>      
  </Router>
  </AuthContext>
  );
}

export default App;
