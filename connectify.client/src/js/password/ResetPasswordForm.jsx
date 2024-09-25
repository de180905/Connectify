import { useEffect, useState } from 'react'
import '../../assets/css/auth/reset-password.css'
import { resetPassword } from '../api/authen';
import { useNavigate } from 'react-router-dom';
const ResetPasswordForm = () => {
    const [error, setError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordCf, setNewPasswordCf] = useState();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    let token = queryParams.get('token');
    token = encodeURIComponent(token)  
    useEffect(()=>{
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        console.log(newPassword)
        if (newPassword!=='' && !passwordRegex.test(newPassword)) {
            console.log('dung')
            setPasswordError('Password must be at least 8 characters long, include at least one letter, one number, and one special character.')        
        }
        else{
            console.log('sai')
             setPasswordError()
        }
    },[newPassword])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!passwordError && newPassword === newPasswordCf) {
            setError('')
            const result = await resetPassword(email, newPassword, token);
            if (result.success) navigate('/account/reset-password-success')
            else {
                console.log(result.error)
                setError(result.error)
            }
        }
        else setError('Confirmation password does not match. Please check again.')
    }


    return (
        <form onSubmit={handleSubmit} id="reset-password">
            <div className='reset-password-title'>Reset Password</div>
            <div className='reset-password-input'>
                <label>New Password</label>
                <input type='password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value)}} placeholder='Enter new password' required />
                {passwordError && (
                                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                            )}
            </div>
            <div className='reset-password-input'>
                <label>Confirm New Password</label>
                <input type='password' value={newPasswordCf} onChange={(e) => { setNewPasswordCf(e.target.value) }} placeholder='Confirm new password' required />
                {error && <small style={{ color: 'red', marginTop: '10px' }}>{error}</small>}
            </div>
            <div className='forgot-password-btn'>
                <button type='submit'>Reset</button>
            </div>
        </form>
    )
}
export default ResetPasswordForm