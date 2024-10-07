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
export { getPeople, getFriendRequest }