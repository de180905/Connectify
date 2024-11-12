import styles from './NotificationList.module.scss'
import avatarImg from '../../assets/images/avatars/avatar-5.jpg'
import { useEffect, useState } from 'react'
import { getUserNotifications } from '../api/notificationApi'
import { onReceiveNotification, startConnection, stopConnection } from '../api/signalRService'
const NotificationList = () => {
    const [notification, setNotification] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const pageSize = 5

    useEffect(() => {
        startConnection()
        const notificationList = getUserNotifications(pageNumber, pageSize)
        // Lắng nghe thông báo thời gian thực từ SignalR
        onReceiveNotification((message) => {
            setNotifications((prevNotifications) => [message, ...prevNotifications]);  // Thêm thông báo mới vào đầu danh sách
        });
        return () => {
            stopConnection()
        }
    }, [pageNumber])
    return (
        <div id={styles.notificaitonList} className='d-flex flex-column'>
            {/*Header*/}
            <div className={`${styles.header}`}>
                <div className={`${styles.title}`}>Notifications</div>
            </div>
            {/*Body*/}
            <div className={`${styles.body} d-flex flex-column`}>
                <div className={`${styles.notificationItem} row`}>
                    <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`${styles.notifiMessage}`}>Trung Nguyen commented on your post: Happy New Year 2024</div>
                        <div className={`${styles.notifiTime}`}><small>1 hour</small></div>
                    </div>
                    <div className={`col-md-1 d-flex justify-content-end align-items-center ${styles.isRead}`}>
                        <div className={styles.dot}></div>
                    </div>
                </div>
                <div className={`${styles.notificationItem} row`}>
                    <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`${styles.notifiMessage}`}>Trung Nguyen commented on your post: Happy New Year 2024</div>
                        <div className={`${styles.notifiTime}`}><small>1 hour</small></div>
                    </div>
                    <div className={`col-md-1 d-flex justify-content-end align-items-center ${styles.isRead}`}>
                        <div className={styles.dot}></div>
                    </div>
                </div>
                <div className={`${styles.notificationItem} row`}>
                    <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`${styles.notifiMessage}`}>Trung Nguyen commented on your post: Happy New Year 2024</div>
                        <div className={`${styles.notifiTime}`}><small>1 hour</small></div>
                    </div>
                    <div className={`col-md-1 d-flex justify-content-end align-items-center ${styles.isRead}`}>
                        <div className={styles.dot}></div>
                    </div>
                </div>
                <div className={`${styles.notificationItem} row`}>
                    <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`${styles.notifiMessage}`}>Trung Nguyen commented on your post: Happy New Year 2024</div>
                        <div className={`${styles.notifiTime}`}><small>1 hour</small></div>
                    </div>
                    <div className={`col-md-1 d-flex justify-content-end align-items-center ${styles.isRead}`}>
                        <div className={styles.dot}></div>
                    </div>
                </div>
                <div className={`${styles.notificationItem} row`}>
                    <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`${styles.notifiMessage}`}>Trung Nguyen commented on your post: Happy New Year 2024</div>
                        <div className={`${styles.notifiTime}`}><small>1 hour</small></div>
                    </div>
                    <div className={`col-md-1 d-flex justify-content-end align-items-center ${styles.isRead}`}>
                        <div className={styles.dot}></div>
                    </div>
                </div>


            </div>
            {/*footer*/}
            <div className={`${styles.footer} d-flex justify-content-center align-items-center mt-2`}>
                <button>View previous notifications</button>
            </div>
        </div>
    )
}
export default NotificationList

