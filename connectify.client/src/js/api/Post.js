import { TokenService } from "./authen";
import { CONNECTIFY_API_BASE_URL } from "./config";

async function createPost(post) {
    const formData = new FormData();
    // Add the content field to formData
    formData.append("Content", post.content);
    // Add the feeling field to formData
    formData.append("Feeling", post.feeling);
    // Add the visibility level field to formData
    formData.append("Visibility", post.visibility);
    // Add the files to formData
    for (let i = 0; i < post.files.length; i++) {
        formData.append("Files", post.files[i]);
    }
    post.taggedFriendIds.forEach(friendId => formData.append("taggedFriendIds", friendId));
    try {
        // Send the POST request using fetch
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Posts`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: formData
        });

        if (response.ok) {
            return {success: true, message: "post created successfully"}
        } else {
            return { success: false, message: response.message }
        }
    } catch (error) {
        return { success: false, message: 'network error'}
    }
}
async function updatePost(post) {
    const formData = new FormData();
    // Add the content field to formData
    formData.append("Content", post.content);
    // Add the feeling field to formData
    formData.append("Feeling", post.feeling);
    // Add the visibility level field to formData
    formData.append("Visibility", post.visibility);
    for (let i = 0; i < post.filesAdded.length; i++) {
        formData.append("FilesAdded", post.filesAdded[i]);
    }
    for (let i = 0; i < post.fileIdsToKeep.length; i++) {
        formData.append("FileIdsToKeep", post.fileIdsToKeep[i]);
    }
    post.taggedFriendIds.forEach(friendId => formData.append("taggedFriendIds", friendId));
    try {
        const url = `${CONNECTIFY_API_BASE_URL}/api/Posts/${post.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: formData
        });

        if (response.ok) {
            return { success: true, message: "post created successfully" };
        } else {
            if (response.status === 400) {
                const errorData = await response.json();
                displayValidationErrors(errorData); // Custom function to display errors
            }
            return { success: false, message: "server return error" };
        }
    } catch (error) {
        return { success: false, message: 'network error' }
    }
}
function displayValidationErrors(errorData) {
    if (errorData.errors) {
        for (const field in errorData.errors) {
            const errors = errorData.errors[field];
            errors.forEach(errorMessage => {
                console.log(`Error in ${field}: ${errorMessage}`);
                // Display errors in the UI, e.g., in a div or alert box
                // document.getElementById(`error-${field}`).innerText = errorMessage;
            });
        }
    }
}
async function getPosts(pageNumber, pageSize = -1, filterOptions = {}) {
    let url = `${CONNECTIFY_API_BASE_URL}/api/Posts?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (filterOptions) {
        const params = new URLSearchParams();
        for (const key in filterOptions) {
            if (filterOptions[key] !== undefined && filterOptions[key] !== null) {
                params.append(key, filterOptions[key]);
            }
        }
        url += `&${params.toString()}`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken()
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
}
async function reactToPost(postId, reactionType) {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Posts/${postId}/react`; // Adjust the URL to your actual endpoint
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken() // Include the auth token if required
            },
            body: JSON.stringify({
                reaction: reactionType
            })
        });

        if (response.ok) {
            const res = { success: true, message: "success", data: await response.json() };
            console.log(res.data)
            return (res);
        } else if (response.status === 404) {
            return ({success: false, message: "Not found"})
        } else {
            console.log(reactionType);
            return ({ success: false, message: "Something wrong" })  
        }
    } catch (error) {
        return ({ success: false, message: "Network error" });
    }
}

async function unReactPost(postId) {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Posts/${postId}/react`; // Adjust the URL to your actual endpoint
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken() // Include the auth token if required
            }
        });

        if (response.ok) {
            return ({ success: true, message: "success" })
        } else if (response.status === 404) {
            return ({ success: false, message: "not found" })
        } else {
            return ({ success: false, message: "success" })
        }
    } catch (error) {
        return ({ success: false, message: "success" })
    }
}

async function getPost(id) {
    try {
        const response = await fetch(`${CONNECTIFY_API_BASE_URL}/api/Posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
export { createPost, getPosts, reactToPost, unReactPost, updatePost, getPost }

