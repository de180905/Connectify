import { useNavigate } from 'react-router-dom';
import '/assets/css/auth/forgot_password.css'
import { useState } from 'react';
import { forgotPassword } from '../api/authen';
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email)
        const response = await forgotPassword(email);
        if (response.success) alert(response.message)
        else {
            console.log(response.error)
            setError(response.error)
        }

    }
    const handleBackToLogin = () => {
        navigate('/account/login')

    }
    return (
        <form onSubmit={handleSubmit} id='forgot-password'>
            <div className="forgot-password-title">Forgot Pasword</div>
            <input id="forgot-password-email" value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Enter email address' required />
            {error && <small style={{ color: 'red', marginTop: '10px' }}>{error}</small>}
            <div class="forgot-password-btn">
                <button type='submit'>Send</button>
            </div>
            <p onClick={handleBackToLogin}>Back to sign in</p>
        </form>
    )
}
export default ForgotPasswordForm