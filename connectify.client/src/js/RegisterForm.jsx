import React, { useState } from "react";
import { signup } from "./api/authen";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordCf: "",
        gender: "",
        dob: "",
    });
    const [errors, setErrors] = useState({});

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }
        return null;
    };

    const validateFirstName = (name) => {
        if (name.length > 40) {
            return "First name must be at most 40 characters.";
        } else if (/[^a-zA-Z ]/.test(name)) {
            return "First name must not contain special characters.";
        }
        return null;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return 'Password must be at least 8 characters long, include at least one letter, one number, and one special character.';
        }
        return null;
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }
        return null;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate continuously as user types
        let error = null;
        switch (name) {
            case "firstName":
                error = validateFirstName(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "password":
                error = validatePassword(value);
                break;
            case "passwordCf":
                error = validateConfirmPassword(formData.password, value);
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(errors);
        const isValid = Object.values(errors).every((error) => error === null);
        if (isValid) {
            handleSignUp();
        }
    };

    async function handleSignUp() {
        const { firstName, lastName, email, password, passwordCf, gender, dob } = formData;
        const response = await signup(firstName, lastName, email, password, passwordCf, parseInt(gender), dob);
        if (!response.success) {
            window.alert(response.message)
        } else {
            console.log(response.data);
            navigate("/account/login?email=" + email);
        }
    }

    // Get today's date in 'YYYY-MM-DD' format for restricting date picker
    const today = new Date().toISOString().split("T")[0];

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-1.5">Sign up to get started</h2>
                <p className="text-sm text-gray-700 font-normal">
                    If you already have an account,{" "}
                    <a href="/account/login" className="text-blue-700">
                        Login here!
                    </a>
                </p>
            </div>
            {/* form */}
            <form
                method="#"
                action="#"
                onSubmit={handleSubmit}
                className="space-y-7 text-sm text-black font-medium dark:text-white"
            >
                <div className="grid grid-cols-2 gap-4 gap-y-7">
                    {/* First name */}
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <div className="mt-2.5">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First name"
                                required
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                            {errors.firstName && (
                                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                    </div>

                    {/* Last name */}
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <div className="mt-2.5">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last name"
                                required
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <div className="mt-2.5">
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                                required
                            >
                                <option value="" disabled>
                                    Select gender
                                </option>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                                <option value={2}>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob">Date of Birth</label>
                        <div className="mt-2.5">
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                                max={today} // Restrict to today or future dates
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                        <label htmlFor="email">Email address</label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="mt-2.5">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="***"
                                required
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="passwordCf">Confirm Password</label>
                        <div className="mt-2.5">
                            <input
                                id="passwordCf"
                                name="passwordCf"
                                type="password"
                                value={formData.passwordCf}
                                onChange={handleInputChange}
                                placeholder="***"
                                required
                                className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                            />
                            {errors.passwordCf && (
                                <p className="text-red-600 text-sm mt-1">{errors.passwordCf}</p>
                            )}
                        </div>
                    </div>

                    {/* Terms and conditions */}
                    <div className="col-span-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="bg-transparent shadow-sm border-slate-200 dark:border-slate-800 !w-4 !h-4"
                            />
                            <span className="ml-2">
                                I agree to the{" "}
                                <a href="#" className="underline">
                                    Terms and Conditions
                                </a>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <div className="mt-5">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
