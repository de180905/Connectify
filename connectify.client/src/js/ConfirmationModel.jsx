import React from 'react';

const ConfirmationModal = ({ isOpen, message, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-5 rounded shadow-lg">
                <h3 className="text-lg font-bold">Are you sure?</h3>
                <p className="mt-2">{message}</p>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
