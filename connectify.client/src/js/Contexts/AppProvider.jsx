import React, {useState, createContext, useEffect, useRef} from 'react';
import { getMyUser } from '../api/authen';
import PostBox from '../Components/postFeature/PostBox';
import PostUpdateBox from '../Components/postFeature/PostUpdateBox';
import MediaDetailModal from '../Components/utils/MediaDetailModal';
import UserList from '../Components/utils/UserList';
import ConfirmModal from '../Components/utils/ConfirmModel';

// Create a context with default values
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState("user"); // Use state to store user data
    const postBoxRef = useRef(null);
    const postUpdateBoxRef = useRef(null);
    const mediaDetailRef = useRef(null);
    const userListRef = useRef(null);
    useEffect(() => {
        const getUser = async () => {
            const data = await getMyUser();
            setUser(data); // Set user data, which will trigger a re-render
        };
        getUser();
    }, []); // Empty dependency array means this runs only once, on mount

    const contextValue = {
        user,
        postBoxRef,
        postUpdateBoxRef,
        mediaDetailRef,
        userListRef
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
            <PostBox ref={postBoxRef} />
            <PostUpdateBox ref={postUpdateBoxRef} />
            <MediaDetailModal ref={mediaDetailRef} />
            <UserList ref={userListRef} />
        </AppContext.Provider>
    );
};

export default AppProvider;
