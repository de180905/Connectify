import { TokenService } from "./authen";
import { CONNECTIFY_API_BASE_URL } from "./config";

async function getPeople(fullName, location, company, filter, pageNumber) {
    try {
        let url = CONNECTIFY_API_BASE_URL + `/api/Search/people?pageNumber=${pageNumber}`;
        if (filter) url += `&filter=${filter}`;
        if (fullName) url += `&fullName=${fullName}`;
        if (location) url += `&fullName=${location}`;
        if (company) url += `&fullName=${company}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        return false;
    }
}
async function getUserBasic(userId) {
    const url = CONNECTIFY_API_BASE_URL + `/api/Search/UserBasic/${userId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the data if needed elsewhere
}
async function getDescriptionOfUser(userId) {
    const url = CONNECTIFY_API_BASE_URL + `/api/Search/UserDescription/${userId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the data if needed elsewhere
}
async function getFriendRequest(filter, pageNumber) {
    try {
        let url = CONNECTIFY_API_BASE_URL + `/api/Search/people/friendRequest?pageNumber=${pageNumber}&filter=${filter}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        return false;
    }
}
async function getPostMediaOfUser(userId, filter, pageNumber, pageSize=10) {
    let url = CONNECTIFY_API_BASE_URL + `/api/User/${userId}/postMedia?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (filter?.fileType) {
        url += `&fileType=${filter.fileType}`;
    }
    if (filter?.relation) {
        url += `&relation=${filter.relation}`;
    }
    console.log(filter);
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
        },
    });
    if (!response.ok) {
        throw new Error("error while fetching data:" + response.status); 
    }
    const data = await response.json();
    return data; // Return the data if needed elsewhere
}
async function getFriendsOfUser(userId, searchTerm, pageNumber, pageSize = 10) {
    try {
        let url = `${CONNECTIFY_API_BASE_URL}/api/User/${userId}/friends?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        if (searchTerm) url += `&searchTerm=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(),
            },
        });

        if (!response.ok) {
            console.log(response.status);
            return false;
        }

        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        return false;
    }
}
async function getUserFriends(searchTerm = '', pageNumber = 1, pageSize = 10) {
    const params = new URLSearchParams({ searchTerm, pageNumber, pageSize });
    try {
        let url = `${CONNECTIFY_API_BASE_URL}/api/User/myFriends?${params.toString()}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(),
            },
        });
        if (!response.ok) {
            console.log(response.status);
            return false;
        }
        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        return false;
    }
}
async function getUsersToAddToChatroom(chatroomId = null, searchTerm = '', pageNumber = 1, pageSize = 10) {
    const params = new URLSearchParams({searchTerm, pageNumber, pageSize });
    try {
        let url = `${CONNECTIFY_API_BASE_URL}/api/User/usersToAddToChatroom?${params.toString()}`;
        if (chatroomId != null) {
            url += `&chatroomId=${chatroomId}`
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(),
            },
        });
        if (!response.ok) {
            console.log(response.status);
            return false;
        }
        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        return false;
    }
}
async function getMutualFriends(user2Id, pageNumber=1, pageSize = 10) {
    try {
        console.log("getting mutual");
        let url = `${CONNECTIFY_API_BASE_URL}/api/User/mutual-friends?&user2Id=${user2Id}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(),
            },
        });

        if (!response.ok) {
            console.log('Error status:', response.status);
            return false;
        }

        const data = await response.json();
        return data; // Return the data if needed elsewhere
    } catch (error) {
        console.error('Error fetching mutual friends:', error);
        return false;
    }
}
async function getFriendsOfFriends(count = 10) {
    const url = `${CONNECTIFY_API_BASE_URL}/api/Search/people/friends-of-friends?count=${count}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming token-based auth
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data; // Return the data to use in your application
}


export {
    getPeople, getFriendRequest, getUserBasic,
    getDescriptionOfUser, getPostMediaOfUser,
    getFriendsOfUser, getMutualFriends, getFriendsOfFriends,
    getUserFriends, getUsersToAddToChatroom
}