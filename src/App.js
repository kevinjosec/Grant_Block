import './App.css';
import Login from './Component/Login/loginPage'
import SignUp from './Component/Signup/signUp';
import Application_Form from "./Component/Application_Form/applicationForm"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
 return (

    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup"
 
 element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
