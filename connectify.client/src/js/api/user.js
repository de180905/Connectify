import { TokenService } from "./authen";
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
export const loadUsersForAdmin = async (emailSearch = '', status = null, pageNumber = 1, pageSize = 10) => {
    let url = `${CONNECTIFY_API_BASE_URL}/api/UserManagement/users?emailSearch=${emailSearch}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (status !== null) {
        url += `&status=${status}`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming TokenService handles the token retrieval
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch users');
    }

    const users = await response.json();
    return users; // Assuming the response contains a 'items' property holding the user data
};
export const lockUser = async (userId, lockDurationInMinutes) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/UserManagement/lock`;
    const payload = {
        userId: userId,
        lockDurationInMinutes: lockDurationInMinutes,
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenService.getAccessToken(),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("failed to lock user");
    } 
};
export const unlockUser = async (userId) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/UserManagement/unlock`;
    const payload = { userId: userId };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenService.getAccessToken(),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("failed to lock user");
    }
};




