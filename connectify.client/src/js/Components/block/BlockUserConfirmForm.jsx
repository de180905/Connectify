import { memo, useEffect } from 'react'
import { CLIENT_URL } from '../../api/config'
import styles from './BlockUserConfirmForm.module.scss'
import { blockUserAsync } from '../../api/user'
const BlockUserConfirmForm = ({user, onCloseBlockUserCofirm})=>{
    const blockUser = async()=>{
        if(user){
            const response = await blockUserAsync(user.id)
            if(response && response.data && response.data.isSuccess){
                alert(`Block ${user && user.fullName} successfully!`)
                window.location.href=`${CLIENT_URL}`
            }
        }
    }
    return (<div className={`vh-100 vw-100 d-flex justify-content-center align-items-center ${styles.blockUserConfirm}`}>
        <div className={`${styles.blockUserForm}`}>
            <div className='row p-3 align-items-center'>
                <div className='col-md-10 fs-5 fw-bold text-center'>Block {user && user.fullName}?</div>
                <div className={`col-md-2 fs-4 text-center ${styles.closeBtn}`}><i class="fa-solid fa-xmark"
                    onClick={onCloseBlockUserCofirm}></i></div>
            </div>
            <div className='line-grey'></div>
            <div className='p-3'>
                <div>{user && user.fullName} will no longer be able to:</div>
                <ul>
                    <li>See your posts on your timeline</li>
                    <li>Tag you</li>
                    <li>Invite you to events or groups</li>
                    <li>Message you</li>
                    <li>Add you as a friend</li>
                </ul>
            </div>
            <div className='line-grey'></div>
            <div className='p-2 d-flex align-items-center justify-content-center'>
                <div className='btn btn-primary' onClick={blockUser}>Confirm</div>
            </div>
        </div>
    </div>)
}
export default memo(BlockUserConfirmForm)