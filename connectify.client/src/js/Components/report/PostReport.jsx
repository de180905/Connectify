import { memo, useState } from 'react'
import styles from './PostReport.module.scss'
import { useEffect } from 'react'
import { createPostReport, getPostReportReasons } from '../../api/postReport'
const PostReport = ({ onCloseReportForm, postId }) => {
    const [reasons, setReasons] = useState([])
    const [isReportSuccess, setIsReportSuccess] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPostReportReasons()
            if (response && response.data) setReasons(response.data)
        }
        fetchData()
    }, [])
    const handleReport = async (reasonId) => {
        var response = await createPostReport(postId, reasonId)
        if (response && response.data && response.data.isSuccess) {
            setIsReportSuccess(true)
        }
    }
    return (
        <div className={`${styles.postReport} d-flex justify-content-center align-items-center vw-100 vh-100`}>
            {
                isReportSuccess ? (<div className={`${styles.postReportFrom}`}>
                    <div className={`${styles.header}p-3`}>
                            <div className={`text-center fs-3 fw-bold p-3`}
                                style={{color: '#0fbd0f'}}><i class="fa-solid fa-circle-check"></i></div>
                    </div>
                    <div className='text-center fs-6 fw-bold'>Thank you for reporting this post</div>
                    <div className={`${styles.doneBtn} text-center m-2 p-2`}
                        onClick={onCloseReportForm}>Done</div>
                </div>) :
                    (<div className={`${styles.postReportFrom}`}>
                        <div className={`${styles.header} row p-2`}>
                            <div className={`col-md-10 text-center fs-5 fw-bold`}>Report</div>
                            <div className={`col-md-2 text-center ${styles.closeIcon}`}><i className="fa-solid fa-xmark"
                                onClick={onCloseReportForm}></i></div>
                        </div>
                        <div className={styles.line}></div>
                        <div className='pt-2'>
                            <div className={`fw-bold p-2`}>Why are you reporting this post?</div>
                            <div className={`d-flex flex-column ${styles.reportContent} pb-2`}>
                                {reasons.map(reason => (
                                    <div key={reason.id} className={`${styles.reportItem}`}
                                        onClick={() => { handleReport(reason.id) }}>{reason.description}</div>
                                ))}
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}
export default memo(PostReport)
