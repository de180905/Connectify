import { CONNECTIFY_API_BASE_URL } from "./config";
async function signup(firstName, lastName, email, password, passwordCf, gender, dob) {
    const url = CONNECTIFY_API_BASE_URL + 'api/Account/SignUp'; // Replace with your API URL
    const registerData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordCf: passwordCf,
        gender: gender,
        dateOfBirth: dob
    };

    try {
        console.log(registerData);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            return { success: false, message: errorData[0].description };
        }

        // Assuming the API returns a success message or some data on successful registration
        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
async function requireEmailConfirm(email) {
    const url = CONNECTIFY_API_BASE_URL + 'api/Account/RequireEmailConfirm/'+email;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data; // Return the data from the response
    } catch (error) {
        console.error("Error in requireEmailConfirm:", error);
        return { success: false, message: error.message }; // Return error message
    }
}
async function signin(email, password) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/SignIn'; // Replace with your API URL
    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
        // Assuming the API returns a token or some other login success response
        const data = await response.json();
        if (!data.needEmailVerified) {
            TokenService.setAccessToken(data.accessToken)
        }
        return { success: true, needEmailVerified: data.needEmailVerified};
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }


}
async function getUserDescription() {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/Settings/Description'; // Replace with your API URL
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
        // Assuming the API returns a token or some other login success response
        const data = await response.json();
        return { success: true, data: data};
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
async function updateUserDescription(data) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/Settings/Description'; 
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return { success: false, message: "failed to update"};
        }
        return { success: true };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
class TokenService {
    static getAccessToken() {
        return localStorage.getItem('accessToken');
    }
    static setAccessToken(token) {
        localStorage.setItem('accessToken', token);
    }
    static async refreshToken() {
        try {
            const response = await fetch('your-refresh-endpoint', {
                method: 'POST',
                credentials: 'include', // Include cookies (for refreshToken)
            });
            if (response.ok) {
                const data = await response.json();
                this.setAccessToken(data.accessToken);
                return true; // Successfully refreshed
            } else {
                return false; // Refresh token failed (e.g., token is expired or invalid)
            }
        } catch (error) {
            return false; // Network error or server unavailable
        }
    }
    static clearTokens() {
        localStorage.removeItem('accessToken');
        // Note: You don't need to manually remove the refreshToken, it's handled via cookie expiration
    }
    static async logout() {
        try {
            // Optionally make a logout API call to invalidate the refresh token
            await fetch('your-logout-endpoint', {
                method: 'POST',
                credentials: 'include', // Include cookies (for refreshToken)
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Even if the API call fails, clear tokens locally
            TokenService.clearTokens();
            window.location.href = '/account/login'; // Force logout and redirect
        }
    }
}
async function changePassword(currentPassword, newPassword, confirmNewPassword) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/Settings/ChangePassword'; // Replace with your API URL
    const passwordData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken()
            },
            body: JSON.stringify(passwordData)
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            return { success: false, message: errorData[0]?.description || 'Failed to change password' };
        }

        return { success: true, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error during password change:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
async function uploadAvatar(file) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/upload-avatar'; // Replace with your API URL
    const formData = new FormData();
    formData.append('file', file); // Attach the file to the form data

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Include authorization header
            },
            body: formData, // Send the form data containing the file
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Failed to upload avatar' };
        }

        const data = await response.json();
        return { success: true, avatarUrl: data.avatarUrl }; // Return the new avatar URL
    } catch (error) {
        console.error('Error during avatar upload:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
async function uploadProfileCover(file) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/upload-profileCover'; // Replace with your API URL
    const formData = new FormData();
    formData.append('file', file); // Attach the file to the form data
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Include authorization header
        },
        body: formData, // Send the form data containing the file
    });

    if (!response.ok) {
        console.log(response);
       throw new Error(`HTTP error! status: ${response.status}`);
    }
}
// Function to get user data from the API
async function getMyUser() {
    try {
        const response = await fetch(CONNECTIFY_API_BASE_URL+'/api/account/MyUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TokenService.getAccessToken(), // Assuming you're using token-based auth
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }
        const myUser = await response.json();
        return myUser; // Return the data if needed elsewhere
    } catch (error) {
        return null;
    }
}

async function forgotPassword(email) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/forgot-password'
    const forgotPasswordData = {
        email: email
    }
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgotPasswordData)
            });
        const responseData = await response.json();
        if (response.ok) {
            return { success: true, message: responseData.message };
        } else {
            return { success: false, error: responseData.error };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}

async function resetPassword(email, password, token) {
    const url = CONNECTIFY_API_BASE_URL + '/api/Account/reset-password'

    const resetPasswordData = {
        email: email,
        password: password,
        token: token
    }
    console.log(resetPasswordData)
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resetPasswordData)
            }
        )
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
            return { success: true, message: responseData.message };
        } else {
            return { success: false, error: responseData.error };
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}

export {
    requireEmailConfirm, signin, signup, TokenService, getUserDescription, updateUserDescription,
    changePassword, uploadAvatar, getMyUser, forgotPassword, resetPassword, uploadProfileCover
};
