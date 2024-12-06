import React, { useState, useRef, useContext } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '/assets/css/Modal.css';
import { FaCamera } from 'react-icons/fa';
import { AppContext } from '../../Contexts/AppProvider';

function AvatarUploader({ initialAvatar, editable,
    widthClass = "w-full", heightClass = "h-full",
    camRight = 0, camBot = 0,
    uploadFunc = async () => { }}) {
    const [image, setImage] = useState(null);
    const [croppedAvatar, setCroppedAvatar] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const cropperRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);
    const { mediaDetailRef } = useContext(AppContext);
 
    // Handle avatar file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setShowModal(true); // Open cropper modal
            };
            reader.readAsDataURL(e.target.files[0]);
            fileInputRef.current.value = null;
        }
    };

    const handleCancelClick = () => {
        setImage(null);
        setShowModal(false);
    };

    // Crop the avatar image
    const handleCrop = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        const cropper = cropperRef.current.cropper;
        const croppedAvatarUrl = cropper.getCroppedCanvas().toDataURL();
        const res = await uploadCroppedAvatar(croppedAvatarUrl);
        if (res.success) {
            setCroppedAvatar(croppedAvatarUrl);
            setShowModal(false);
            setImage(null);
        } else {
            window.alert("Error while uploading");
        }
        setIsProcessing(false);
    };

    // Upload function (optional)
    const uploadCroppedAvatar = async (croppedImage) => {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        return await uploadFunc(blob);
    };

    return (
        <>
            {/* Avatar Image */}
            <img
                src={croppedAvatar || initialAvatar}
                onClick={
                    () => {
                        mediaDetailRef.current.setMedia([{ url: croppedAvatar ?? initialAvatar }]);
                        mediaDetailRef.current.open(0);
                    }
                }
                alt="Avatar"
                className={`${heightClass} ${widthClass} object-cover rounded-full mx-auto cursor-pointer`}
            />

            {/* Buttons for Upload & Crop */}
            <div className="absolute m-2 z-20"
                style={{ bottom: camBot, right: camRight }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="avatarInput"
                    ref={fileInputRef}
                />
                {
                    editable &&
                    <button
                        className="button bg-white text-black rounded-full p-2 shadow-md"
                        onClick={() => fileInputRef?.current?.click()}
                    >
                        <FaCamera size={25} />
                    </button>
                }

            </div>

            {/* Crop Modal */}
            {showModal && (
                <div className="coverUploader-overlay">
                    <div className="coverUploader-content">
                        <Cropper
                            src={image}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={1} // Aspect ratio for avatar
                            guides={false}
                            ref={cropperRef}
                        />
                        <button onClick={handleCrop} className="button bg-primary" disabled={isProcessing}>
                            {isProcessing ? "Saving..." : "Save"}
                        </button>
                        <button onClick={handleCancelClick} className="button bg-gray-500" disabled={isProcessing}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AvatarUploader;
