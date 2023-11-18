import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Login from '../Login/loginPage'
import './signUp.css'
import {auth, db} from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.style.backgroundColor = '#1d284d'; // Change this to the desired color
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default
      };
  }, []);
  const handleSignUp = async (event) => {
    const userRef = doc(db, "users", formik.values.email);
    try {
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
      const result = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
      console.log("user created", result);
      navigate('/Login');
    } catch (err) {
      console.log(err.message);
    }
  };

  const formik = useFormik({initialValues:{
    fname:'',
    lname:'',
    phone:'',
    email:'',
    password:'',
    confirmPassword:'',
    adharCard:'',
    rationCard:'',
  },
  validationSchema: yup.object({
    fname: yup.string().trim().matches(/^[a-zA-Z]+$/,"Invalid").min(3,'Too short').required('First Name is required'),
    lname: yup.string().trim().matches(/^[a-zA-Z]+$/,"Invalid").min(3,'Too short').required('Last Name is required'),
    phone : yup.string().matches(/^[0-9]{10}$/,"Invalid").required('Phone Number is required'),
    email: yup.string().email().required('Email is requied'),
    password: yup.string().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one digit, and be at least 6 characters long.'
  ,"A captial letter, small letter and a number").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")],"Passwords must match").required('Please re-enter your password'),
    adharCard: yup.string().matches(/^[0-9]{12}$/,"Invalid").min(12,'Too Short').required("Adhar Card is needed"),
    rationCard: yup.string().matches(/^[0-9]{11}$/, "Invalid").required('Ration Card number required')}),

  onSubmit:handleSignUp,
})
  return (
    <div>
        <h1 className='header'>Grant Block</h1> 
        <form onSubmit={formik.handleSubmit}>
        <div className='signupContainer'>
        <div className='signup'>
            <div className='column'>
            <label className='label'>
                First name
                <input type='text' name ="fname" className='signupInput' {...formik.getFieldProps('fname')}/>
                {formik.touched.fname && formik.errors.fname ? (<div className='error'>{formik.errors.fname}</div>) : null}
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Last name
                <input type='text' name ="lname"  className='signupInput' {...formik.getFieldProps('lname')}/>
                {formik.touched.lname && formik.errors.lname ? (<div className='error'>{formik.errors.lname}</div>) : null}
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Phone No
                <input type='text' name ="phoneNo"  className='signupInput'{...formik.getFieldProps('phone')}/>
                {formik.touched.phone && formik.errors.phone ? (<div className='error'>{formik.errors.phone}</div>) : null}
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Email Id
                <input type='email' name ="email"  className='signupInput'{...formik.getFieldProps('email')}/>
                {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Password
                <input type='password'name="password" className='signupInputPass'  {...formik.getFieldProps('password')}/>
                {formik.touched.password && formik.errors.password ? (<div className='error'>{formik.errors.password}</div>) : null}
            </label>
            </div>
            <br/>
            <div className='column'>
            <label className='label'>
                Confirm Password
                <input type='password' className='signupInputPass' {...formik.getFieldProps('confirmPassword')}/>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className='error'>{formik.errors.confirmPassword}</div>) : null}
            </label>
            </div>
            <br/>
            <div className='column'>
            <label className='label'>
                Adhar Card
                <input type='text' name="adhar" className='signupInput' {...formik.getFieldProps('adharCard')}/>
                {formik.touched.adharCard && formik.errors.adharCard ? (<div className='error'>{formik.errors.adharCard}</div>) : null}
            </label>
            </div>
            <div className='column'>
            <label className='label'>
                Ration Card
                <input type='text'name ="ration"  className='signupInput' {...formik.getFieldProps('rationCard')}/>
                {formik.touched.rationCard && formik.errors.rationCard ? (<div className='error'>{formik.errors.rationCard}</div>) : null}
            </label>
            </div>
        </div>
        </div>
        <button type='submit' className='signupButton' onClick={formik.handleSubmit}>
                SIGNUP
            </button>
            </form>
    </div>
  )
}

export default SignUp
