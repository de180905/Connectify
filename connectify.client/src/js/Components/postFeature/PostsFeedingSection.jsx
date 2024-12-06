import { useState, useEffect, useCallback } from 'react'
import Post from "./Post";
import { getPost, getPosts } from "../../api/Post";
const PostsFeedingSection = ({filterOptions}) => {
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const updatePostUI = (updatedPost) => {
        setPostsList(prev => prev.map(post => post.id == updatedPost.id ? updatedPost : post));
    }
    // Scroll event handler
    const handleScroll = useCallback(() => {
        // Check if user has scrolled near the bottom of the page
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !isLoading) {
            setCurrentPage(currentPage => currentPage + 1);
            console.log("scrolled");
        }
    }, [currentPage, isLoading]);

    // Set up scroll event listener on component mount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const postsPaging = await getPosts(currentPage, 2, filterOptions);
                if (postsPaging.items.length == 0) {
                    setCurrentPage(1);
                }
                setPostsList(prev => {
                    return [...prev.slice(-10).filter(item1 => !postsPaging.items.some(item2 => item2.id === item1.id)), ...postsPaging.items]
                }); // Set the fetched posts into state
                setIsLoading(false);
            } catch (error) {

            }
        }
        fetchPosts();
    }, [currentPage, filterOptions]);
    return (
        <>
            {postsList.map((post) => <Post updatePostUI={updatePostUI} setPostsList={setPostsList} key={post.id} post={post} />)}
        </>
    )
}
export default PostsFeedingSection
