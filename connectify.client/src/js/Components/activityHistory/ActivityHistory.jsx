import { useEffect, useState } from "react"
import Header from "../appLayout/Header"
import styles from './ActivityHistory.module.scss'
import { getCommentHistory, getFriendshipHistory, getPostSaves, getReactionHistory } from "../../api/activityHistory"
import { formatTo12HourTime } from "../../Utils/datetimeUtil"
import { useNavigate } from "react-router-dom"
import { reactionTypeValue } from "../../Utils/EnumMapper"
const ActivityHistory = () => {
    const [activityItem, setActivityItem] = useState({ id: 1, value: 'Comments' })
    const pageSize = 1
    const [pageNumber, setPageNumber] = useState({value: 0})
    const [logs, setLogs] = useState([])
    const navigate = useNavigate()
    const handleSelectedActivityItem = (item) => {
        setActivityItem(item)
        setLogs([])
        setPageNumber({value: 0})
    }
    const fetchData = async () => {
        let response = null
        if (activityItem.id === 1) {
            response = await getCommentHistory(pageNumber.value, pageSize)
        }
        else if(activityItem.id === 2){
            response = await getReactionHistory(pageNumber.value, pageSize)
        }
        else if(activityItem.id === 3){
            response = await getPostSaves(pageNumber.value, pageSize)
        }
        else if(activityItem.id === 4){
            response = await getFriendshipHistory(pageNumber.value, pageSize)         
        }
        
        if (response && response.data) {
            console.log(response.data)
            setLogs((prev) => [...prev, ...response.data])
        }
        
    }
    const handleGetMoreActivity = ()=>{
        setPageNumber(prev => ({value: prev.value+1}))
    }
    const handleActivityClick = (actionLink)=>{
        navigate(actionLink)
    }
    useEffect(() => {
        fetchData()
    }, [pageNumber])
    return (<div>
        <div>
            <Header />
        </div>
        <div className={`row ${styles.body}`}>
            <div className={`col-md-3 vh-100 ${styles.sideBarWapper}`}>
                <div className={`${styles.sideBar}`}>
                    <div className={`fs-5 fw-bold text-center p-3 black-color`} >Activity History</div>
                    <div className={`line-grey`}></div>
                    <div className={`d-flex flex-column`}>
                        <div className={`row p-3 align-items-center ${styles.activityItem} ${activityItem.id === 1 ? styles.active : ''}`}
                            onClick={() => { handleSelectedActivityItem({ id: 1, value: 'Comments' }) }}>
                            <div className={`col-md-3 text-center fs-4`}><i class="fa-solid fa-comment"></i></div>
                            <div className={`col-md-9`}>Comments</div>
                        </div>
                        <div className={`row p-3 align-items-center ${styles.activityItem} ${activityItem.id === 2 ? styles.active : ''}`}
                            onClick={() => { handleSelectedActivityItem({ id: 2, value: 'Reactions' }) }}>
                            <div className={`col-md-3 text-center fs-4`}><i class="fa-solid fa-thumbs-up"></i></div>
                            <div className={`col-md-9`}>Reactions</div>
                        </div>
                        <div className={`row p-3 align-items-center ${styles.activityItem} ${activityItem.id == 3 ? styles.active : ''}`}
                            onClick={() => { handleSelectedActivityItem({ id: 3, value: 'Save Posts' }) }}>
                            <div className={`col-md-3 text-center fs-4`}><i class="fa-solid fa-bookmark"></i></div>
                            <div className={`col-md-9`}>Saved posts</div>
                        </div>
                        <div className={`row p-3 align-items-center ${styles.activityItem} ${activityItem.id === 4 ? styles.active : ''}`}
                            onClick={() => { handleSelectedActivityItem({ id: 4, value: 'Friendship Activities' }) }}>
                            <div className={`col-md-3 text-center fs-5`}><i class="fa-solid fa-user-group"></i></div>
                            <div className={`col-md-9`}>Friendship Activities</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`col-md-9 ${styles.activitys}`}>
                <div className='fw-bold black-color mt-3' style={{ fontSize: '18px' }}>{activityItem.value}</div>
                <div className={`d-flex flex-column mt-3`}>
                    {logs && logs.length> 0 && logs.map(log => (
                        <div className={`${styles.log} p-2 mb-3`}>
                            <div className='fw-bold black-color'>{log.date}</div>
                            {log.activities.map(activity => (
                                <>
                                    <div className={`p-2 mb-1 mt-1 ${styles.activity}`} onClick={()=>{handleActivityClick(activity.targetUrl)}}>
                                        <div className='black-color'>You {activity.activity} {activity.targetUserName}{activity.targetType?`'s ${activity.targetType}`: ''}.</div>
                                        <small className='p-2'>{activity.content ? activity.content : reactionTypeValue[activity.reaction]}</small>
                                        <div className={`${styles.activityTime}`}>{formatTo12HourTime(activity.timestamp)}</div>
                                    </div>
                                    <div className='line-grey'></div>
                                </>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={`fs-6 fw-bold text-center p-2 ${styles.moreBtn}`}
                onClick={handleGetMoreActivity}>More</div>
            </div>
        </div>
    </div>)
}
export default ActivityHistory