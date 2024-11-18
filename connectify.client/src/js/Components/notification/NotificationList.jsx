import styles from './NotificationList.module.scss'
import { useEffect, useState } from 'react'
import { getUserNotifications } from '../../api/notificationApi'

const NotificationList = () => {
    const [notification, setNotification] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const pageSize = 5

    useEffect(() => {
        const notificationList = getUserNotifications(pageNumber, pageSize)
        setNotification(notificationList);

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
                        <img src={''} alt="avatar" />
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
                        <img src={''} alt="avatar" />
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
                        <img src={''} alt="avatar" />
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
                        <img src={''} alt="avatar" />
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
                        <img src={''} alt="avatar" />
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
