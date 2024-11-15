import React from 'react';

const FilePreview = ({ file, onRemove }) => {
    return (
        <div className="relative flex items-center">
            {file.type.startsWith('image/') ? (
                <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-20 w-20 object-cover rounded border"
                />
            ) : (
                <div className="flex items-center border rounded p-2">
                    <span className="iconic iconic-file" aria-hidden="true"></span> {/* Iconic file icon */}
                    <span className="ml-2">{file.name}</span>
                </div>
            )}

            {/* X button positioned absolutely in top right */}
            <button
                className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                onClick={onRemove}
                title="Remove file"
            >
                &times;
            </button>
        </div>
    );
};

export default FilePreview ;
