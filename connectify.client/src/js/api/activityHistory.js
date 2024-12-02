import { CONNECTIFY_API_BASE_URL } from "./config"
export const getCommentHistory = async(pageNumber, pageSize)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/UserActivity/comments?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { data: data };
    }
    catch (error) {
        console.log("Error fetching notifications:", error);
        return { error: error.message };
    }
}
export const getReactionHistory = async(pageNumber, pageSize)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/UserActivity/reactions?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { data: data };
    }
    catch (error) {
        console.log("Error fetching notifications:", error);
        return { error: error.message };
    }
}
export const getFriendshipHistory = async(pageNumber, pageSize)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/UserActivity/friendships?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { data: data };
    }
    catch (error) {
        console.log("Error fetching notifications:", error);
        return { error: error.message };
    }
}
export const getPostSaves = async(pageNumber, pageSize)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/UserActivity/post-saves?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { data: data };
    }
    catch (error) {
        console.log("Error fetching notifications:", error);
        return { error: error.message };
    }
}