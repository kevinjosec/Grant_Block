import React, { useState } from 'react'
import './loginPage.css';
import { auth, provider, db } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import signUp from '../Signup/signUp';
import { useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import loginbackground from '../Assests/login-background.jpg'

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //login function
  const handleManualLogin = async (e) => {
    e.preventDefault();
    const emailReg = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    try {
      if (email === 'govUser@example.in' && password === 'govUser@123') {
        navigate('/GovHome');
      }
      else {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/UserHomePage')
      }
    }
    catch (err) {
      if (err.code === 'auth/wrong-password') {
        setError("Wrong Password");
      }
      else if (err.code === 'auth/user-not-found') {
        setError("User not found");
      }
      else {
        setError("An unexpected error occurred");
      }
    }
  }

  //google login function + database creation
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          fname: '',
          lname: '',
          phone: '',
          adharCard: '',
          rationCard: ''
        });
      }
      navigate('/UserHomePage')
      console.log("SUCCESS");
    }
    catch (error) {
      console.log("ERROR", error);
    }
  };


  return (
    <div className='login-main'>
      <div className="login-container">
        <div className="login1">
          <h2 className='login-label'>Login</h2>
          <br />
          <input type='text' className='username-input' value={email} placeholder='Username' autoComplete='username'
            onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          <div className="input-password">
            <input type='password' className='username-input' value={password} placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
          <p className='forgot-password' onClick={()=>navigate('/ForgotPassword')}>
            Forgot password
          </p>
          {error && <p className="error-message">{error}</p>}
          <br />
          <button type='submit' className='login-button' onClick={handleManualLogin}>
            LOGIN
          </button>
          <div className='create-account' onClick={() => navigate('/signUp')} >
            Create an account
          </div>
          <br />
          <div className='google-signin' onClick={handleLogin}>
            Login with Google
          </div>
        </div>
        <div className="login2">
          <h1 className="welcome-to-grant-block">Welcome to Grant Block</h1>
          <p className="login-subheading">Empowering Communities, One Scheme at a Time</p>
        </div>
      </div>

      <br /><br />
    </div>

  )
}

export default LoginPage
