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
    const url = CONNECTIFY_API_BASE_URL + 'api/Account/SignIn'; // Replace with your API URL
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
        return { success: true, data :data};
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }


}
export { requireEmailConfirm, signin, signup };
