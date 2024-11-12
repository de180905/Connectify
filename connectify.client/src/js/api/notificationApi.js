import { CONNECTIFY_API_BASE_URL } from "./config";
const getUserNotifications = async (pageSize, pageNumber) => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}api/Notification/get-notifications?pageSize=${pageSize}&pageNumber=${pageNumber}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  // Đính kèm JWT token nếu cần
                    'Content-Type': 'application/json'
                }
            }
        )
        if(!response.ok)throw new Error('Network response was not ok')
        const data = await response.json()
        console.log('data:', data)
        return {data: data}
    } catch (error) {
        console.log("Error fetching notifications:", error)
        return {error: error}
    }
}
export {getUserNotifications}
