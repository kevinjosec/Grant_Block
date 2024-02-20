import React, { useState } from 'react'
import './ForgotPassword.css'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db, app } from '../../firebase'
import { useNavigate } from 'react-router-dom';

const ForgotPassowrd = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetpassword = async () => {
        try {
            const userEmail = email.trim();
            console.log("Email: ",userEmail);
            await sendPasswordResetEmail(auth, userEmail);
            console.log("Reset link sent successflly");
            navigate('/Login')
        }
        catch (e) {
            console.error("ERROR: ", e);
        }
    }
    return (
        <div className='login-main'>
            <div className="login-container">
                <div className="login1">
                    <h2 className='login-label'>Reset Password</h2>
                    <br />
                    <input type='text' className='username-input' value={email} placeholder='Username'
                        onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <button type='submit' className='reset-button'  onClick={handleResetpassword}>
                        Send reset link
                    </button>
                    <br />
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

export default ForgotPassowrd
