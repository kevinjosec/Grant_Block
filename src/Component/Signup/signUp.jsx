import React, { useState } from 'react'
import './signUp.css'
import {auth} from '../../firebase'
const SignUp = () => {

  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [Adhar, setAdhar] = useState('');
  const [Ration, setRation] = useState('');

const handleSignUp = async (event) => {
  event.preventDefault();

  try {
    const result = await auth().createWithEmailandPassword(Fname, Password, Lname, Email);
    const user = result.user;
    console.log('User created:', user);
  } catch (err) {
    console.error('Error creating user:', err);
  }
};


  return (
    <div>
        <h1 className='header'>Grant Block</h1> 
        <div className='signupContainer'>
        <div className='signup'>
            <div className='column'>
            <label className='label'>
                First name
                <input type='text' name ="fname" className='signupInput' value={Fname} onChange={(e) => setFname(e.target.value)}/>
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Last name
                <input type='text' name ="lname"  className='signupInput' value={Lname} onChange={(e) => setLname(e.target.value)}/>
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Phone No
                <input type='text' name ="phoneNo"  className='signupInput' value={Phone} onChange={(e) => setPhone(e.target.value)}/>
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Email Id
                <input type='email' name ="email"  className='signupInput' value={Email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Password
                <input type='password'name="password" className='signupInputPass' value={Password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            </div>
            <br/>
            <div className='column'>
            <label className='label'>
                Confirm Password
                <input type='password' className='signupInputPass' />
            </label>
            </div>
            <br/>
            <div className='column'>
            <label className='label'>
                Adhar Card
                <input type='password' name="adhar" className='signupInput' value={Adhar} onChange={(e) => setAdhar(e.target.value)}/>
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Ration Card
                <input type='password'name ="ration"  className='signupInput' value={Ration} onChange={(e) => setRation(e.target.value)}/>
            </label>
            </div>
        </div>
        </div>
        <button type='submit' className='signupButton' onClick={handleSignUp}>
                SIGNUP
            </button>
    </div>
  )
}

export default SignUp
