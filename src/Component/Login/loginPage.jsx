import React, { useState} from 'react'
import './loginPage.css';
import {auth, provider} from '../../firebase'
import { signInWithPopup } from 'firebase/auth';
import signUp from '../Signup/signUp';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 
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
                <input type='text' className='loginInput' />
            </label>
            <br/>
            <br/>
            <label className='loginLabel'>
                Password
                <input type='password' className='loginInput'/>
            </label>
            <p className='forgotPass'>
              Forgot password
            </p>
            <button type='submit' className='loginButton'>
                LOGIN
            </button>
            </div>
            </div>
      </div>
      <div className='accountCreate' >
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
