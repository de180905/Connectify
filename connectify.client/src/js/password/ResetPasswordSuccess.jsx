import '/assets/css/auth/reset_password_success.css'
import { useNavigate } from 'react-router-dom';

const ResetPasswordSuccess = ()=>{
    const navigate = useNavigate();
    return (
        <div id="reset-success">
            <div class="reset-success-title">Successful!</div>
            <p>Your password has been changed!</p>
            <div onClick={()=>{navigate('/account/login')}} className='reset-success-login'>Sign in</div>
        </div>
    )
}
export default ResetPasswordSuccess