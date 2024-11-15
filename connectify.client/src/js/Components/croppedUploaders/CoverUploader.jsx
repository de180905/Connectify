import React, { useState, useRef, useContext } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '/assets/css/Modal.css'
import { uploadProfileCover } from '../../api/authen';
import { FaCamera } from 'react-icons/fa';
import { AppContext } from '../../Contexts/AppProvider';

function CoverUploader({ initialImg, editable }) {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const cropperRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);
    const { mediaDetailRef } = useContext(AppContext);
    
    // Handle cover file selection
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
    // Crop the cover image
    const handleCrop = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        const cropper = cropperRef.current.cropper;
        const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
        try {
            await uploadCroppedImage(croppedImageUrl);
            setCroppedImage(croppedImageUrl);
            setShowModal(false);
            setImage(null);
        } catch (error) {
            window.alert("Error while uploading");
        } finally {
            setIsProcessing(false);
        }
        
    };

    // Upload function (optional)
    const uploadCroppedImage = async (croppedImage) => {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        await uploadProfileCover(blob);
    };

    return (
        <div className="relative overflow-hidden w-full lg:h-72 h-48">
            {/* Cover Image */}
            <img
                src={croppedImage || initialImg}
                alt="Cover"
                onClick={
                    () => {
                        mediaDetailRef.current.setMedia([{ url: croppedImage ?? initialImg }]);
                        mediaDetailRef.current.open(0);
                    }
                }
                className="h-full w-full object-cover cursor-pointer inset-0"
            />

            {/* Buttons for Upload & Crop */}
            <div className="absolute bottom-0 right-0 m-4 z-20">
                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="coverInput"
                        ref={fileInputRef}
                    />
                    {
                        editable && 
                        <button
                            className="button bg-white text-black flex items-center gap-2 backdrop-blur-small"
                            onClick={() => fileInputRef?.current?.click()}
                        >
                            <FaCamera size={16} />
                            Edit
                        </button>
                    }                   
                </div>
            </div>

            {/* Crop Modal */}
            {showModal && (
                <div className="coverUploader-overlay">
                    <div className="coverUploader-content">
                        <Cropper
                            src={image}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={1043 / 288} // Aspect ratio for cover
                            guides={false}
                            ref={cropperRef}
                        />
                        <button onClick={handleCrop} className="button bg-primary" disabled={isProcessing}>
                            {
                                isProcessing ? "Saving..." : "Save"
                            }
                        </button>
                        <button onClick={handleCancelClick} className="button bg-gray-500" disabled={isProcessing}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoverUploader;

