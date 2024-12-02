
import { useState, useEffect, useCallback } from 'react'
import { getPosts } from "../../api/Post";
import Stories from './Stories';
import FeedSidebar from './FeedSidebar';
import Post from '../postFeature/Post';
import PostBoxOpener from '../postFeature/PostBoxOpener';
const Feed = () => {
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
                const postsPaging = await getPosts(currentPage, 3);
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
    }, [currentPage]);

    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            {/* timeline */}
            <div
                className="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto"
                id="js-oversized"
            >
                <div className="max-w-[680px] mx-auto shrink-0">
                    <Stories/>
                    {/* feed story */}
                    <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
                        {/* add story */}
                        <PostBoxOpener/>
                        {/*  post image*/}
                        {postsList.map((post) => <Post updatePostUI={updatePostUI} setPostsList={setPostsList} key={post.id} post={post} />)}
                        {/* placeholder */}
                        <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                                <div className="flex-1 space-y-3">
                                    <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                                    <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                            </div>
                            <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>
                            <div className="flex gap-3">
                                <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                                <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                                <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                                <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar */}
                <FeedSidebar />
            </div>
        </main>
    )
}

export default Feed;