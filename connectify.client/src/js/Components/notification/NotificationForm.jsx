import styles from './NotificationForm.module.scss'
import avatarDefault from '../../../../assets/images/avatars/avatar-2.jpg'
import notificationSound from '../../../../assets/sounds/notification_sound.mp3'
import { useEffect } from 'react'
import { CLIENT_URL } from '../../api/config'
import { markNotificationAsRead } from '../../api/notificationApi'
const NotificationForm = ({id,name, avatar, message, actionLink}) => {
    useEffect(()=>{
        const audio = new Audio(notificationSound)
        audio.play()
    },[])

    const handleClick = async()=>{
        await markNotificationAsRead(id)
        if (actionLink) {
            window.location.href=`${CLIENT_URL}${actionLink}`
        }
    } 
    return (
        <div className={`${styles.notificationForm} d-flex flex-row align-items-center`} 
            onClick={handleClick}>
            <div className={`${styles.avatar}`}>
                <img src={avatar} />
            </div>
            <div className={`${styles.message}`}>{name} {message}</div>
        </div>
    )
}
export default NotificationForm