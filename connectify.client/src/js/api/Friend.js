import { TokenService } from "./authen";
import { CONNECTIFY_API_BASE_URL } from "./config";

async function sendFriendRequest(otherUserId) {
    try {
        const response = await fetch(CONNECTIFY_API_BASE_URL + `/api/FriendRequest/send?otherUserId=${otherUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
async function respondFriendRequest(otherUserId, status) {
    try {
        const response = await fetch(CONNECTIFY_API_BASE_URL + `/api/FriendRequest/respond?otherUserId=${otherUserId}&status=${status}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
async function revokeFriendRequest(otherUserId) {
    try {
        const response = await fetch(CONNECTIFY_API_BASE_URL + `/api/FriendRequest/revoke?otherUserId=${otherUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
export { sendFriendRequest, respondFriendRequest, revokeFriendRequest }