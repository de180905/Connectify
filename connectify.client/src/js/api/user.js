import { CONNECTIFY_API_BASE_URL } from "./config";
export const blockUserAsync = async(blockedUserId)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/User/block`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blockedUserId),
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
export const unblockUserAsync = async(blockedUserId)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/User/unblock`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blockedUserId),
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
