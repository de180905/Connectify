import { CONNECTIFY_API_BASE_URL } from "./config";
const getUserNotifications = async (pageSize, pageNumber) => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Notification/get-notifications?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { data: data };
    } catch (error) {
        console.log("Error fetching notifications:", error);
        return { error: error.message };
    }
};

const getUnreadNotificationsCount = async ()=>{
    try{
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Notification/get-unread-notifications-count`, {
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
const markNotificationAsRead = async(notificationId)=>{
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Notification/mark-notification-as-read?NotificationId=${notificationId}`, {
        method: 'PUT', 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Đính kèm token
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return { data: data };
}
export { getUserNotifications, getUnreadNotificationsCount, markNotificationAsRead }