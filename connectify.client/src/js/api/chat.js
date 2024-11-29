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

const loadChatRooms = async (type = null, searchTerm = "", pageNumber = 1, pageSize = 2) => {
    const params = new URLSearchParams({type, searchTerm, pageNumber, pageSize });
    let url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms?${params.toString()}`;
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
const getOrCreatePrivateChatRoom = async (user2Id) => {
    // Call the GetOrCreatePrivateChatRoom API
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Chat/private?user2Id=${encodeURIComponent(user2Id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });

    if (!response.ok) {
        throw new Error('Failed to get or create private chat room');
    }

    // Extract chat room ID from the response
    const chatRoomId = await response.json();
    return chatRoomId;
};
const createChatRoom = async (chatRoomData) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/create-chatroom`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
        body: JSON.stringify(chatRoomData)
    });

    if (!response.ok) {
        throw new Error('Failed to create chat room');
    }

    const result = response;
    return result;
};
const addUsersToChatroom = async (chatroomId, userIds) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatroomId}/members`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
        body: JSON.stringify(userIds)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add members: ${errorText}`);
    }

    const result = await response.json();
    return result;
};

const getChatRoomMembers = async (chatRoomId, pageNumber = 1, pageSize = -1) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatRoomId}/members?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch chat room members');
    }
    const result = await response.json(); // Parse the JSON response
    return result;
};
const removeChatroomMember = async (chatroomId, memId) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatroomId}/members/${memId}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(),
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || 'Failed to remove member');
    }
};
const leaveChatroom = async (chatroomId) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatroomId}/leave`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(),
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || 'Failed to remove member');
    }
};
const renameChatroom = async (chatroomId, newName) => {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatroomId}/name`;
    console.log(newName);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(),
        },
        body: JSON.stringify({ name: newName })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error(errorData.message || 'Failed to rename chatroom');
    }
};
const uploadChatroomAvatar = async (chatroomId, file) => {
    try {
        const url = `${CONNECTIFY_API_BASE_URL}/api/Chat/chatrooms/${chatroomId}/avatar`;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken(),
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload avatar');
        }
        return { success: true }
    } catch (error) {
        return { success: false, message: "Failed to update" }
    }
};

export {
    loadChatMessages, deleteMessage, loadChatRooms,
    loadChatRoomById, sendTextMessage, sendSingleFileMessage,
    sendMultiFilesMessage, reactToMessage, getOrCreatePrivateChatRoom,
    createChatRoom, getChatRoomMembers, removeChatroomMember, leaveChatroom,
    addUsersToChatroom, renameChatroom, uploadChatroomAvatar
};
