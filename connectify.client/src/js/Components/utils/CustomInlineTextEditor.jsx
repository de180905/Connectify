import React, { useState } from "react";

function CustomInlineTextEditor({ initialName, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [error, setError] = useState("");

    const validateName = (newName) => {
        if (!newName.trim()) {
            return "Name cannot be empty.";
        }
        if (newName.length > 50) {
            return "Name cannot exceed 50 characters.";
        }
        return ""; // No error
    };

    const handleSave = () => {
        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(""); // Clear errors if validation passes
        setIsEditing(false);
        if (onSave) {
            onSave(name); // Call a save function if provided
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(initialName); // Revert to the initial name
        setError(""); // Clear any existing errors
    };

    return (
        <div className="mt-8">
            {!isEditing ? (
                <div className="flex items-center">
                    <div className="md:text-xl text-base font-medium text-black dark:text-white">
                        {name}
                    </div>
                    <button
                        className="ml-2 text-gray-500 hover:text-blue-500"
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit name"
                    >
                        <i className="fas fa-pencil-alt"></i> {/* Use Font Awesome or any icon library */}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`md:text-xl text-base font-medium text-black dark:text-white border rounded px-2 py-1 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        <button
                            className="ml-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="ml-2 px-2 py-1 text-white bg-gray-500 hover:bg-gray-600 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomInlineTextEditor;
