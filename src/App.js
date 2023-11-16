import './App.css';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import HomePage from './Component/HomePage/HomePage';
function App() {
 return (
  <Router>
  <Routes>          
  <Route path="/" element={<Login />} />

  </Routes>      
  </Router>
  );
}

export default App;
