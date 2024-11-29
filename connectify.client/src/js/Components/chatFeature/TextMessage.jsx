import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { formatDate } from '../../Utils/datetimeUtil';
import useConfirmModal from '../../CustomHooks/UseConfirmModal';
Modal.setAppElement('#root'); // Required for accessibility
const TextMessage = ({ message, onReply, onDelete }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { openModal: openDeleteConfirmModal, ModalComponent: DeleteConfirmModalComponent } = useConfirmModal();
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
            openDeleteConfirmModal();
        }
    };

    const handleClickOutside = (e) => {
        if (optionsRef.current && !optionsRef.current.contains(e.target)) {
            setShowOptions(false);
        }
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

            <DeleteConfirmModalComponent
                onCancel={() => { }}
                onOk={async () => {
                    onDelete(message);
                    return true;
                }}
                title="Delete Message"
                content={message.isSent ? "The message will be deleted permanently" : "If continue, you will be no longer see the message but others can"}
            />
        </>  
    );
};

export { TextMessage };
