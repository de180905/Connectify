import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams
import { requireEmailConfirm } from "../../api/authen"; // Adjust the import path as necessary

function VerifyAccount() {
    const [resendSuccess, setResendSuccess] = useState(null);
    const [resendError, setResendError] = useState(null);
    const { email } = useParams(); // Get the email from route params

    // Call the API once when the component mounts
    useEffect(() => {
        handleResendEmail();
    }, [email]); // Dependency array to run when the email changes

    const handleResendEmail = async () => {
        if (email) {
            const response = await requireEmailConfirm(email);
            if (response.success) {
                setResendSuccess(response.message);
                setResendError(null);
            } else {
                setResendSuccess(null);
                setResendError(response.message);
            }
        } else {
            setResendError("Email not provided in the URL.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="verify-account-container text-center">
                <h2 className="text-2xl font-semibold mb-1.5">Verify your account</h2>
                <p className="text-sm text-gray-700 font-normal">
                    We've sent a confirmation email to your account. Please check your inbox.
                    <br />
                    If you haven't received it, you can resend the confirmation email.
                </p>
                <button
                    onClick={handleResendEmail}
                    className="mt-5 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
                >
                    Resend Confirmation Email
                </button>

                {resendSuccess && <p className="text-green-600 text-sm mt-3">{resendSuccess}</p>}
                {resendError && <p className="text-red-600 text-sm mt-3">{resendError}</p>}
                <p className="text-green-600 text-sm mt-3">
                    If email confirmed successfully,{" "}
                    <a href={`/account/login?email=${email}`} className="text-blue-600 underline">
                        Click here to login again.
                    </a>
                </p>
            </div>
        </div>
    );
}

export default VerifyAccount;
