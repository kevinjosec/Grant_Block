import React, { useState } from 'react'
import './loginPage.css';
import { auth, provider, db } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fetchIsGov } from '../AuthContext';

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
      // Officers sign in like everyone else; their role comes from admins/{uid} in Firestore.
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      navigate((await fetchIsGov(user.uid)) ? '/GovHome' : '/UserHomePage');
    }
    catch (err) {
      if (['auth/wrong-password', 'auth/user-not-found', 'auth/invalid-credential'].includes(err.code)) {
        setError("Incorrect email or password");
      }
      else if (err.code === 'auth/too-many-requests') {
        setError("Too many attempts. Please try again later.");
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
      navigate((await fetchIsGov(user.uid)) ? '/GovHome' : '/UserHomePage');
    }
    catch (error) {
      console.log("ERROR", error);
    }
  };


  return (
    <div className='login-main-body'>
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
          <p className='forgot-password' onClick={() => navigate('/ForgotPassword')}>
            Forgot password
          </p>
          {error && <p className="error-message">{error}</p>}
          <br />
          <br />
          <br />
          <br />
          <div className="button-container">
            <button type='submit' className='login-button' onClick={handleManualLogin}>
              LOGIN
            </button>
          </div>
          <br />
          <br />
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
    </div>

  )
}

export default LoginPage
