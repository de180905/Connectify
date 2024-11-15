import { TokenService } from "./authen";
import { CONNECTIFY_API_BASE_URL } from "./config";

async function addComment(content, postId) {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Comment/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
        body: JSON.stringify({ content, postId })
    });
    if (!response.ok) {
        throw new Error('Failed to add comment');
    }
    return response.json();
}

async function replyToComment(content, parentCommentId) {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Comment/reply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
        body: JSON.stringify({ content, parentCommentId })
    });
    if (!response.ok) {
        throw new Error('Failed to reply to comment');
    }
    return response.json();
}

async function getTopLevelComments(postId, sortOption, pageNumber = 1, pageSize = 10) {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Comment/post/${postId}/comments?sortOption=${sortOption}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch top-level comments');
    }
    return response.json();
}

async function getReplies(parentCommentId, pageNumber = 1, pageSize = 10) {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Comment/${parentCommentId}/replies?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch replies');
    }
    return response.json();
}

async function getCommentById(id) {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Comment/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });
    if (!response.ok) {
        throw new Error('Comment not found');
    }
    return response.json();
}

async function deleteComment(commentId) {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
    return response;
}

async function editComment(commentId, content) {
    const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Comment/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
        body: JSON.stringify({ commentId, content })
    });
    if (!response.ok) {
        throw new Error('Failed to edit comment');
    }
    return response.json();
}

async function reactToComment(commentId, value) {
    let url = `${CONNECTIFY_API_BASE_URL}/api/Comment/${commentId}/react`;
    if (value != null) {
        url += `?value=${value}`;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        },
    });
    if (!response.ok) {
        throw new Error('Failed to react to comment');
    }
}
export { addComment, replyToComment, getTopLevelComments, getReplies, getCommentById, deleteComment, editComment, reactToComment }; 


