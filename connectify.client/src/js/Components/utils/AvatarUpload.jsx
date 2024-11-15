import React, { useState, useContext, useEffect } from 'react';
import { uploadAvatar } from '../../api/authen';
import { AppContext } from '../../Contexts/AppProvider';

const AvatarUpload = () => {
    // State to store the current avatar URL and selected file
    const { user } = useContext(AppContext);
    console.log(user);
    const [avatar, setAvatar] = useState(null); // Default avatar
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        setAvatar(user?.avatar)
    }, [user])
    // Handle file selection and update avatar preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Update avatar preview
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            setSelectedFile(file);
        } else {
            alert('Please select an image file');
        }
    };

    // Handle file upload using the uploadAvatar function
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('No file selected!');
            return;
        }

        try {
            // Call the uploadAvatar function with the selected file
            const result = await uploadAvatar(selectedFile);

            if (result.success) {
                // Update the avatar URL with the new image after successful upload
                console.log(result);
                setAvatar(result.avatarUrl);
                alert('Avatar updated successfully!');
            } else {
                alert('Failed to upload avatar');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('An error occurred while uploading the avatar');
        }
    };

    return (
        <div className="flex md:gap-8 gap-4 items-center md:p-8 p-6 md:pb-4">
            <div className="relative md:w-20 md:h-20 w-12 h-12 shrink-0">
                {/* Avatar preview */}
                <label htmlFor="file" className="cursor-pointer">
                    <img
                        id="img"
                        src={avatar}
                        className="object-cover w-full h-full rounded-full"
                        alt="Avatar"
                    />
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>

                {/* Edit icon for uploading */}
                <label
                    htmlFor="file"
                    className="md:p-1 p-0.5 rounded-full bg-slate-600 md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="md:w-4 md:h-4 w-3 h-3 fill-white"
                    >
                        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                        <path
                            fillRule="evenodd"
                            d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>

            <div className="flex-1">
                <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
                    {user?.firstName+" "+user?.lastName}
                </h3>
            </div>

            {/* Button to manually trigger file upload */}
            <button
                className="inline-flex items-center gap-1 py-1 pl-2.5 pr-3 rounded-full bg-slate-50 border-2 border-slate-100 dark:text-white dark:bg-slate-700"
                onClick={handleUpload}
            >
                Update Avatar
            </button>
        </div>
    );
};

export default AvatarUpload;
