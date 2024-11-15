import React, { useState } from 'react';
import { changePassword } from '../../api/authen';


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[^\s]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        if (!validatePassword(password)) {
            setNewPasswordError(
                'Password must be at least 8 characters long, contain a letter, a number, a special character, and no spaces.'
            );
        } else {
            setNewPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const password = e.target.value;
        setConfirmNewPassword(password);
        if (password !== newPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPasswordError || confirmPasswordError) {
            setMessage('Please fix the errors before submitting.');
            return;
        }

        // Call the changePassword API function
        const result = await changePassword(currentPassword, newPassword, confirmNewPassword);

        if (result.success) {
            setMessage('Password changed successfully.');
        } else {
            setMessage(result.message || 'Error changing password.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6 max-w-lg mx-auto">
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                        <label className="md:w-40 text-right">Current Password</label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="password"
                                placeholder="******"
                                className="w-full"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                        <label className="md:w-40 text-right">New password</label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="password"
                                placeholder="******"
                                className="w-full"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                            {newPasswordError && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
                        </div>
                    </div>
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                        <label className="md:w-40 text-right">Repeat password</label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="password"
                                placeholder="******"
                                className="w-full"
                                value={confirmNewPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-16">
                    <button
                        type="button"
                        className="button lg:px-6 bg-secondary max-md:flex-1"
                        onClick={() => { /* Handle Cancel */ }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                        Save
                    </button>
                </div>
            </form>
            {message && <p className="text-center mt-4">{message}</p>}
        </div>
    );
};

export default ChangePassword;
