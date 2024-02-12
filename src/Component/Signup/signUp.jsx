import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Login from '../Login/loginPage'
import './signUp.css'
import { auth, db } from '../../firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import loginbackground from '../Assests/login-background.jpg'
import loginportrait from '../Assests/login-portrait.jpg'

const SignUp = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = ''; // Change this to the desired color
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default
    };
  }, []);

  //creating new user
  const handleSignUp = async (event) => {
    const userRef = doc(db, "users", formik.values.email);
    try {
      //values from signup form
      await setDoc(userRef, {
        fname: formik.values.fname,
        lname: formik.values.lname,
        phone: formik.values.phone,
        email: formik.values.email,
        adharCard: formik.values.adharCard,
        rationCard: formik.values.rationCard
      });
    } catch (error) {
      console.error("Error adding details to Firestore:", error);
    }
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          fname: formik.values.fname,
          lname: formik.values.lname,
          phone: formik.values.phone,
          adharCard: formik.values.adharCard,
          rationCard: formik.values.rationCard
        })
        navigate('/Login');
      }
      else {

        const result = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
        console.log("user created", result);
        navigate('/Login');

      }

    } catch (err) {
      console.log(err.message);
    }
  };

  //validation of signup function
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      adharCard: '',
      rationCard: '',
    },
    validationSchema: yup.object({
      fname: yup.string().trim().matches(/^[a-zA-Z]+$/, "Invalid").min(3, 'Too short').required('First Name is required'),
      lname: yup.string().trim().matches(/^[a-zA-Z]+$/, "Invalid").min(3, 'Too short').required('Last Name is required'),
      phone: yup.string().matches(/^[0-9]{10}$/, "Invalid").required('Phone Number is required'),
      email: yup.string().email().required('Email is requied'),
      password: yup.string().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one digit, and be at least 6 characters long.'
        , "A captial letter, small letter and a number").required("Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required('Please re-enter your password'),
      adharCard: yup.string().matches(/^[0-9]{12}$/, "Invalid").min(12, 'Too Short').required("Adhar Card is needed"),
      rationCard: yup.string().matches(/^[0-9]{11}$/, "Invalid").required('Ration Card number required')
    }),

    onSubmit: handleSignUp,
  })
  return (
    <div>
      <div className="signup-container">
        <div className="signup-grid1">
          <h1 className="first-step">
            <span className="first-word">First <br /></span>Step towards change
          </h1>
        </div>
        <div className="signup-grid2">
          <h1 className="create-an-account">Create an Acoount</h1>
          <form onSubmit={formik.handleSubmit} className='sign-up-form'>
            <input type='text' name="fname" className='signupInput fname-input' {...formik.getFieldProps('fname')} placeholder='First name' />
            <input type='text' name="lname" className='signupInput lname-input' {...formik.getFieldProps('lname')} placeholder='Last name' />
            <br />
            <input type='text' name="phoneNo" className='signupInput phone-input'{...formik.getFieldProps('phone')} placeholder='Phone number' />
            <br />
            <input type='email' name="email" className='signupInput email-input'{...formik.getFieldProps('email')} placeholder='Email id' />
            <br />
            <input type='password' name="password" className='signupInput password-input'  {...formik.getFieldProps('password')} placeholder='Password' />
            <input type='password' className='signupInput confirm-password-input' {...formik.getFieldProps('confirmPassword')} placeholder='Re-enter password' />
            <br />
            <input type='text' name="adhar" className='signupInput adhar-input' {...formik.getFieldProps('adharCard')} placeholder='Adhar card number' />
            <input type='text' name="ration" className='signupInput ration-input' {...formik.getFieldProps('rationCard')} placeholder='Ration card number' />
            <br />
            <button type='submit' className='signup-button' onClick={formik.handleSubmit}>
              SIGNUP
            </button>
            {formik.touched.fname && formik.errors.fname ? (<div className='error'>{formik.errors.fname}</div>) : null}
            {formik.touched.lname && formik.errors.lname ? (<div className='error'>{formik.errors.lname}</div>) : null}
            {formik.touched.phone && formik.errors.phone ? (<div className='error'>{formik.errors.phone}</div>) : null}
            {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
            {formik.touched.password && formik.errors.password ? (<div className='error'>{formik.errors.password}</div>) : null}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className='error'>{formik.errors.confirmPassword}</div>) : null}
            {formik.touched.adharCard && formik.errors.adharCard ? (<div className='error'>{formik.errors.adharCard}</div>) : null}
            {formik.touched.rationCard && formik.errors.rationCard ? (<div className='error'>{formik.errors.rationCard}</div>) : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
