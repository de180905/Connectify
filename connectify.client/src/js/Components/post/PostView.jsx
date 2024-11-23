import { useEffect, useState } from 'react'
import Post from '../postFeature/Post'
import styles from './PostView.module.scss'
import { getPost } from '../../api/Post'
import { useParams } from 'react-router-dom'
const PostView = () => {
    const {postId} = useParams()
    const [post, setPost] = useState() 
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await getPost(postId)
            if(data){
                console.log(data)
                setPost(data)
            }
        }
        fetchData()
    }, [])
    const updatePostUI = (updatedPost) => {
        setPost(updatedPost);
    };
    return (
        <div className={`${styles.postView}`}>
            {/* Chỉ hiển thị Post khi đã có dữ liệu */}
            {post && (
                <Post post={post} updatePostUI={updatePostUI} />
            )}
        </div>
    )
}
export default PostView