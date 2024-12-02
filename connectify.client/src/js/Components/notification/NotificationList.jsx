import styles from './NotificationList.module.scss'
import { memo, useEffect, useState } from 'react'
import { getUserNotifications, markNotificationAsRead } from '../../api/notificationApi'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
const NotificationList = ({ notificationEvent }) => {
    const [notifications, setNotifications] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const pageSize = 5
    const navigate = useNavigate()
    const getNotificationList = async () => {
        const response = await getUserNotifications(pageSize, pageNumber);
        if (response && response.data) {
            setNotifications(prevNotifications => [...prevNotifications, ...response.data]);
        }
    };
    useEffect(() => {
        console.log(notificationEvent)
        if (notificationEvent > 0) {
            setNotifications([])
            setPageNumber(0)
        }
    }, [notificationEvent])
    const handleNotificationClick = async (notificationId, actionLink) => {
        await markNotificationAsRead(notificationId)
        navigate(actionLink)
    }
    const handleViewPreviousNotifClick = async () => {
        setPageNumber(pre => pre + 1);
    }
    useEffect(() => {
        getNotificationList();
    }, [pageNumber]);
    return (
        <div id={styles.notificaitonList} className='d-flex flex-column'>
            {/*Header*/}
            <div className={`${styles.header}`}>
                <div className={`${styles.title}`}>Notifications</div>
            </div>
            {/*Body*/}
            <div className={`${styles.body} d-flex flex-column`}>
                {notifications.map((n) => (
                    <div key={n.notificationId} className={`${styles.notificationItem} row`}
                        onClick={() => { handleNotificationClick(n.notificationId, n.actionLink) }}>
                        <div className={`${styles.avatar} col-md-2 d-flex align-items-center`}>
                            <img src={n.triggeredByUserAvatarUrl} alt="avatar" />
                        </div>
                        <div className={`col-md-9`}>
                            <div className={`${styles.notifiMessage}`}>{n.triggeredByUserName} {n.message}</div>
                            <div className={`${styles.notifiTime}`}><small>{formatDistanceToNow(n.createAt, { addSuffix: true })}</small></div>
                        </div>
                        <div className={`col-md-1 d-flex justify-content-end align-items-center ${n.isRead ? '' : styles.isRead}`}>
                            <div className={styles.dot}></div>
                        </div>
                    </div>))}
            </div>
            {/*footer*/}
            <div className={`${styles.footer} d-flex justify-content-center align-items-center mt-2`}>
                <button onClick={handleViewPreviousNotifClick}>View previous notifications</button>
            </div>
        </div>
    )
}
export default memo(NotificationList)
