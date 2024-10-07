import React, {useState, createContext, useEffect} from 'react';
import { getMyUser } from '../api/authen';

// Create a context with default values
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState("user"); // Use state to store user data

    useEffect(() => {
        const getUser = async () => {
            const data = await getMyUser();
            console.log(data);
            setUser(data); // Set user data, which will trigger a re-render
        };
        getUser();
    }, []); // Empty dependency array means this runs only once, on mount

    const contextValue = {
        user,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
