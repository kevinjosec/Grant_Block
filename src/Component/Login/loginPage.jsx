import React, { useState} from 'react'
import './loginPage.css';
import {auth, provider} from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import signUp from '../Signup/signUp';
import { useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
const LoginPage = () => {

  const[email, setEmail]= useState('');
  const[password, setPassword]= useState('');
  const[error, setError]= useState('');
  const navigate = useNavigate();
  

     const handleManualLogin = async(e)=>{
      e.preventDefault();
      const emailReg = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailReg.test(email))
      {
        setError("Please enter a valid email");
        return;
      }
      try{
        await signInWithEmailAndPassword(auth ,email, password)
      navigate('/HomePage')
     }
      catch(err) {
        if(err.code === 'auth/wrong-password') {
          setError("Wrong Password");
        }
        else if(err.code === 'auth/user-not-found') {
          setError("User not found");
        }
        else{
          setError("An unexpected error occurred");
        }
      }
     }


     const handleLogin = async(e) =>  {
        e.preventDefault();
        try{
          const result = await signInWithPopup(auth,provider);
          const user = result.user;
          console.log("SUCCESS", user);
        }
        catch(error)
        {
          console.log("ERROR", error);
        }
     };
  

    return (
      <div>
        <h1 className='header'>
          Grant Block
        </h1>
    <div className='login-container'>
      <div className='login'>
       <h2>Login</h2> 
         <div className='namePass'>
          <br/>
            <label className='loginLabel'>
            Username
                <input type='text' className='loginInput' value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <br/>
            <br/>
            <label className='loginLabel'>
                Password
                <input type='password' className='loginInput' value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <p className='forgotPass'>
              Forgot password
            </p>
            {error && <p className="errorMessage">{error}</p>}
            <button type='submit' className='loginButton' onClick={handleManualLogin}>
                LOGIN
            </button>
            </div>
            </div>
      </div>
      <div className='accountCreate' onClick={()=>navigate('/signUp')} >
        Create an account
      </div>
      <br/>
      <div className='googleSignIn' onClick={handleLogin}>
        Login with Google
      </div>
    </div>
  
  )
}

export default LoginPage
