import { CONNECTIFY_API_BASE_URL } from "./config";
export const getPostReportReasons = async () => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/PostReport/get-report-reasons`, {
            method: 'GET', 
            headers: {
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
export const createPostReport = async(postId, reasonId)=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/PostReport/create-post-report?postId=${postId}&postReportReasonId=${reasonId}`, {
            method: 'POST', 
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
export const getReportedPosts = async (page = 1, pageSize = 10) => {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/PostReport/reported-posts?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include token
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};
export const deleteReportedPost = async (postId) => {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/PostReport/reported-posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include token
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    } 
};
export const getReportDetailsByPostId = async (postId) => {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/PostReport/report-details/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include token
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};
