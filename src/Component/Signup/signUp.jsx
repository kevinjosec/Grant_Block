import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Login from '../Login/loginPage'
import './signUp.css'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
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
  const [signUpError, setSignUpError] = useState('');

  const handleSignUp = async (values, { setSubmitting }) => {
    setSignUpError('');
    try {
      // 1. Create the Firebase Auth account first, so the profile write below is authenticated
      //    and an existing account can't be overwritten by someone who only knows the email.
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);

      // 2. Store the profile under the verified email of the new account
      await setDoc(doc(db, "users", user.email), {
        fname: values.fname,
        lname: values.lname,
        phone: values.phone,
        email: user.email,
        adharCard: values.adharCard,
        rationCard: values.rationCard
      });
      navigate('/UserHomePage');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setSignUpError('An account with this email already exists. Please log in.');
      } else if (err.code === 'auth/weak-password') {
        setSignUpError('Password is too weak.');
      } else {
        console.error(err);
        setSignUpError('Could not create the account. Please try again.');
      }
    } finally {
      setSubmitting(false);
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
      email: yup.string().email().required('Email is required'),
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
          <h1 className="create-an-account">Create an Account</h1>
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
            <button type='submit' className='signup-button' disabled={formik.isSubmitting}>
              SIGNUP
            </button>
            {signUpError ? (<div className='error'>{signUpError}</div>) : null}
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
