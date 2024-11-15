import { TokenService } from "./authen";
import { CONNECTIFY_API_BASE_URL } from "./config";

const loadChatMessages = async (chatRoomId, toDate = null, pageNumber = 1) => {
    let url = `${CONNECTIFY_API_BASE_URL}/api/Chat/get-messages?chatRoomId=${chatRoomId}&pageNumber=${pageNumber}`;
    if (toDate !== null) {
        url += `&toDate=${toDate}`;
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            }
        });
        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch chat messages');
        }
        const messages = await response.json();
        return messages.items;
    } catch (error) {
        console.error('Error:', error);
    }
};

const loadChatRooms = async (searchTerm = "", pageNumber = 1, pageSize = 2) => {
    let url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch chat rooms');
    }
    const chatRoomsData = await response.json();
    return chatRoomsData.items;
};
const loadChatRoomById = async (id) => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat rooms');
        }

        const apiresponse = await response.json();
        return apiresponse.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

const sendTextMessage = async (chatRoomId, text, replyToMessageId = null) => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/send-text-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: JSON.stringify({
                chatRoomId: chatRoomId,
                text: text,
                replyToId: replyToMessageId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send text message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

const sendSingleFileMessage = async (chatRoomId, file, replyToMessageId = null) => {
    try {
        const formData = new FormData();
        formData.append('ChatRoomId', chatRoomId);
        formData.append('File', file);
        if (replyToMessageId) {
            formData.append('ReplyToId', replyToMessageId);
        }

        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/send-single-file-message`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to send single file message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

const sendMultiFilesMessage = async (chatRoomId, text, files, replyToMessageId = null) => {
    try {
        const formData = new FormData();
        formData.append('ChatRoomId', chatRoomId);
        formData.append('Text', text);
        files.forEach((file) => {
            formData.append('Files', file);
        });
        if (replyToMessageId) {
            formData.append('ReplyToId', replyToMessageId);
        }

        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/send-multi-files-message`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to send multi files message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

const reactToMessage = async (messageId, reactionType) => {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/react-to-message?messageId=${messageId}&reactionType=${reactionType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            }
        });

        if (!response.ok) {
            throw new Error('Failed to react to message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
async function deleteMessage(messageId, mode) {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/messages/${messageId}?mode=${mode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            }
        });

        if (response.ok) {
            // Handle the success response (204 No Content)
            console.log('Message deleted successfully.');
        } else {
            // Handle the error response
            const errorMessage = await response.text();
            console.error('Error deleting message:', response.status, errorMessage);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export { loadChatMessages, deleteMessage, loadChatRooms, loadChatRoomById, sendTextMessage, sendSingleFileMessage, sendMultiFilesMessage, reactToMessage };
