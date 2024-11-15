import { useState, useRef, useEffect } from 'react';
import ConfirmationModal from '../utils/ConfirmationModel';
import Modal from 'react-modal';
import { formatDate } from '../../Utils/datetimeUtil';
Modal.setAppElement('#root'); // Required for accessibility
const TextMessage = ({ message, onReply, onDelete }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const optionsRef = useRef(null); // Ref for options menu

    const handleOptionsClick = (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
        setShowOptions((prev) => !prev);
    };

    const handleOptionSelect = (action) => {
        setShowOptions(false);
        if (action === 'reply') {
            onReply(message); // Trigger reply action with message
        }
        if (action === 'delete') {
            setIsModalOpen(true); // Trigger reply action with message
        }
    };

    const handleClickOutside = (e) => {
        if (optionsRef.current && !optionsRef.current.contains(e.target)) {
            setShowOptions(false);
        }
    };
    const handleDeleteConfirm = () => {
        onDelete(message); // Confirm delete action
        setIsModalOpen(false); // Close the modal
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false); // Close the modal
    };
    useEffect(() => {
        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderMessageContent = () => {
        // Handle deleted message
        if (message.deleted) {
            return (
                <div className="inline-block px-4 py-2 rounded-[20px] bg-gradient-to-tr from-sky-500 to-blue-500 text-white  max-w-full overflow-hidden">
                    <span className="text-red-500">[deleted]</span>
                </div>
            );
        }
        // Handle text message
        if (message.type === 0) {
            return (
                <div className="inline-block px-4 py-2 rounded-[20px] bg-gradient-to-tr from-sky-500 to-blue-500 text-white  max-w-full overflow-hidden">
                    <p className="whitespace-normal whitespace-pre-line break-words">{message.text}</p>
                </div>
            );
        }

        // Handle multiple images
        if (message.type === 2 && Array.isArray(message.files)) {
            return (
                <div className="flex flex-wrap gap-2 justify-end max-w-full">
                    {message.files.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={`image-${index}`}
                            className="w-20 h-20 object-cover rounded-lg "
                        />
                    ))}
                </div>
            );
        }

        // Handle single file (could be image or any other file type)
        if (message.type === 1) {
            const file = message.files[0];
            return (
                <div className="px-4 py-2 rounded-lg bg-gray-200 ">
                    <a href={file.url} download className="text-blue-500 underline">
                        {file.name}
                    </a>
                </div>
            );
        }
        return null; // Fallback for unknown types
    };

    return (
        <>
            <div className={`flex gap-2 items-center ${message.isSent ? 'flex-row-reverse items-end' : 'items-start'}`}
            >
                {!message.isSent && <img
                    src={message.senderAvatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                />}
                <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`} style={{ maxWidth: '60%' }}>
                    <div className={`w-full`} uk-tooltip={`title: ${formatDate(message.sentAt)}; pos: ${message.isSent? "left": "right"}`}>
                        {message.replyToId && (
                            <div className="text-gray-500 text-sm mb-1">
                                Rpl: {message.replyToSender}
                                <br />
                                {message.replyToDeleted ? (
                                    <span className="text-red-500">[deleted]</span>
                                ) : (
                                    <span className="text-gray-500">
                                        {message.replyToContent}
                                    </span>
                                )}
                            </div>
                        )}
                        {renderMessageContent()}
                    </div>
                </div>
                <div className="relative" ref={optionsRef}>
                    {!message.deleted && < i
                        className="fas fa-ellipsis-v text-gray-500 cursor-pointer"
                        onClick={handleOptionsClick}
                    />}
                    {showOptions && (
                        <div className={`absolute ${message.isSent ? 'right' : 'left'}-0 mt-2 w-32 bg-white -lg rounded`}>
                            <button onClick={() => handleOptionSelect('reply')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Reply
                            </button>
                            <button onClick={() => handleOptionSelect('delete')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
        /* Modal content styles */
        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-: 0 5px 15px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 500px;
          text-align: center;
        }

        /* Overlay styles (blur the background) */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Button styles */
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn-cancel {
          background-color: #ccc;
          color: #333;
        }
        .btn-cancel:hover {
          background-color: #bbb;
        }
        .btn-delete {
          background-color: #e74c3c;
          color: white;
        }
        .btn-delete:hover {
          background-color: #c0392b;
        }
      `}</style>
            {/* Modal for delete confirmation */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Delete Confirmation"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                <p className="text-gray-700 mb-4">{message.isSent? "The message will be deleted permanently" : "If continue, you will be no longer see the message but others can"}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteConfirm}
                        className="px-4 py-2 bg-red-500 text-gray-800 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </>  
    );
};

export { TextMessage };
