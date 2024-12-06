import { useParams, useNavigate} from "react-router-dom";
import { loadChatMessages, loadChatRoomById, sendTextMessage, sendMultiFilesMessage, sendSingleFileMessage, deleteMessage, getChatRoomMembers, removeChatroomMember, leaveChatroom, addUsersToChatroom, uploadChatroomAvatar, renameChatroom } from "../../api/chat";
import * as React from "react";
import { TextMessage } from "./TextMessage";
import FilePreview from "./FilePreview";
import { generateGuid } from "../../Utils/MathsHelper";
import * as signalR from '@microsoft/signalr';
import { CONNECTIFY_API_BASE_URL } from "../../api/config";
import { TokenService } from "../../api/authen";
import { formatDistanceToUTCNow } from "../../Utils/datetimeUtil";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppProvider";
import TextareaAutosize from 'react-textarea-autosize';
import { ViewChatroomMembersModal } from "./ViewChatroomMembersModal";
import useConfirmModal from "../../CustomHooks/UseConfirmModal";
import { SelectUsersModal } from "../utils/SelectUsersModal";
import { getUsersToAddToChatroom } from "../../api/search";
import AvatarUploader from "../croppedUploaders/AvatarUploader";
import CustomInlineTextEditor from "../utils/CustomInlineTextEditor";
import { EditNameModal } from "./EditNameModal";

const ChatroomDetail = React.forwardRef(({ updateChatroomHasSeen }, ref) => {
    const { openModal: openLeaveConfirmModal, ModalComponent: LeaveConfirmModalComponent } = useConfirmModal();
    const navigate = useNavigate();
    const { id } = useParams();
    const [chatroom, setChatroom] = React.useState(null);
    const chatMessagesRef = React.useRef(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const todoAfterSetChatMsgesRef = React.useRef(() => { });
    const [filesList, setFilesList] = React.useState([]);
    const [messageInput, setMsgInput] = React.useState("");
    const [loadingOlderMessages, setLoadingOlderMessages] = React.useState(false);
    const [replyMessage, setReplyMessage] = React.useState(null);
    const [isViewMembersModalOpen, setIsViewMembersModalOpen] = React.useState(false);
    const [isAddMembersModalOpen, setIsAddMembersModalOpen] = React.useState(false);
    const [isEditNameModalOpen, setIsEditNameModalOpen] = React.useState(false);
    const handleReply = (message) => {
        setReplyMessage(message);
    };
    const handleDelete = (message) => {

        deleteMessage(message.messageId, message.isSent? "delete" : "detach");
    };
    const handleCancelReply = () => {
        setReplyMessage(null);
    };
    const fileInputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        id: id,
        receiveMessage: (message) => {
                setChatMessages((prev) => {
                    return [message, ...prev];
                });
        },
        deleteMessage: (messageId) => {
            setChatMessages((prev) => {
                return prev.map((message) => {
                    return message.messageId === messageId ? { ...message, deleted: true, text: null, files: null } :
                        message.replyToId === messageId ? { ...message, replyToContent: null, relyToDeleted: true } :
                            message
                });
            }); // Replace newMessages with your messages array
        }
    }));
    const initialize = async (chatRoomId) => {
        const messages = await loadChatMessages(chatRoomId);
        updateChatroomHasSeen(chatRoomId);
        setChatMessages(prevMsges => {
            todoAfterSetChatMsgesRef.current = () => {
                if (chatMessagesRef.current) {
                    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                }
            };
            return messages;
        });
        const chatroomdata = await loadChatRoomById(chatRoomId);
        setChatroom(() => (chatroomdata));
        setFilesList([]);
        setMsgInput("");
        setLoadingOlderMessages(false);
        setReplyMessage(null);
    };
    const handleChatMessagesScrollUp = async (event) => {
        event.persist();
        if (event.target.scrollTop === 0 && !loadingOlderMessages) {
            setLoadingOlderMessages(true);
            const currentScrollHeight = event.target.scrollHeight;
            const messages = await loadChatMessages(id, chatMessages.at(-1).sentAt);
            if (messages.length > 0) {
                setChatMessages(prevMessages => {
                    todoAfterSetChatMsgesRef.current = () => { event.target.scrollTop = event.target.scrollHeight - currentScrollHeight; }
                    return [...prevMessages, ...messages];
                });
                setLoadingOlderMessages(false);
            }
        }
    };
    const sendMessages = async () => {
        try {
            // First, handle the text message if it exists
            if (messageInput.trim() || filesList.length > 0) {
                const nonImageFiles = filesList.filter(file => !file.type.startsWith('image/'));
                const imageFiles = filesList.filter(file => file.type.startsWith('image/'));
                if (messageInput.trim()) {
                    await sendTextMessage(id, messageInput.trim(), replyMessage?.messageId);
                }
                if (nonImageFiles.length === 0 && imageFiles.length > 0) {
                    // Case 1: Only image files (sent as a single multi-file message)
                    await sendMultiFilesMessage(id, messageInput.trim(), imageFiles, replyMessage?.messageId);
                } else if (nonImageFiles.length > 0 && imageFiles.length === 0) {
                    // Case 2: Only non-image files (each file sent as a single file message)
                    for (const file of nonImageFiles) {
                        await sendSingleFileMessage(id, file, replyMessage?.messageId);
                    }
                    if (messageInput.trim()) {
                        await sendTextMessage(id, messageInput.trim(), replyMessage?.messageId);
                    }
                } else if (imageFiles.length > 0 && nonImageFiles.length > 0) {
                    // Case 3: Both image and non-image files
                    await sendMultiFilesMessage(id, messageInput.trim(), imageFiles, replyMessage?.messageId);
                    for (const file of nonImageFiles) {
                        await sendSingleFileMessage(id, file, replyMessage?.messageId);
                    }
                }
                // Clear the message input and file list after sending
                setMsgInput('');
                setFilesList([]);
                setReplyMessage(null);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const handleMsgInputChange = (event) => {
        setMsgInput(event.target.value);
    }
    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        selectedFiles.forEach(f => { f.id = generateGuid() })
        setFilesList((prevFiles) => [...prevFiles, ...selectedFiles]);
        // Reset the file input so the same file can be selected again
        event.target.value = null;
    };

    // Remove file by index
    const removeFile = (fileToRemove) => {
        setFilesList(prevFiles => prevFiles.filter(file => file.id !== fileToRemove.id));
    };
    React.useEffect(() => {
        initialize(id);
    }, [id]);
    React.useEffect(() => {
        todoAfterSetChatMsgesRef.current();
        todoAfterSetChatMsgesRef.current = () => { };
    }, [chatMessages]);
    React.useEffect(() => {
        if (replyMessage || filesList.length > 0) {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
    }, [replyMessage, filesList]);
    return (
        <>
            {/* message center */}
            <div className="relative flex-1 flex-col" style={{ width: '50vw'}}>
                {chatroom && (<>
                    {/* chat heading */}
                    <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
                        <div className="flex items-center sm:gap-4 gap-2">
                            <div
                                className="relative cursor-pointer max-md:hidden"
                                uk-toggle="target: .rightt ; cls: hidden"
                            >
                                <img
                                    src={chatroom?.avatar}
                                    alt=""
                                    className="w-8 h-8 rounded-full shadow"
                                />
                                {chatroom?.isOnline && (
                                    <div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px" />
                                )}
                            </div>
                            <div
                                className="cursor-pointer"
                                uk-toggle="target: .rightt ; cls: hidden"
                            >
                                <div className="text-base font-bold">{chatroom?.name}</div>
                                {chatroom?.isOnline ? (
                                    <div className="text-xs text-green-500 font-semibold">
                                        {" "}
                                        Online
                                    </div>
                                ) : (
                                    <span>Last Active: {formatDistanceToUTCNow(chatroom?.lastOnline, { addSuffix: false, addPrefix: false })}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="hover:bg-slate-100 p-1.5 rounded-full"
                                uk-toggle="target: .rightt ; cls: hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>)}
                {/* chats bubble */}
                <div ref={chatMessagesRef} onScroll={handleChatMessagesScrollUp} className={`relative w-full p-5 py-10 overflow-y-auto md:h-[calc(100vh-204px)] h-[calc(100vh-195px)]`}>
                    {chatroom && (<>
                        <div className="py-10 text-center text-sm lg:pt-8">
                            <img
                                src={chatroom?.avatar}
                                className="w-24 h-24 border-2 rounded-full mx-auto mb-3"
                                alt=""
                            />
                            <div className="mt-8">
                                <div className="md:text-xl text-base font-medium text-black dark:text-white">
                                    {chatroom?.name + " "}
                                </div>
                                <div className="text-gray-500 text-sm   dark:text-white/80">
                                    {" "}
                                </div>
                            </div>
                        </div>
                    </>)}
                    <div className="text-sm font-medium space-y-6">
                        {chatMessages.map((element, index, array) => {
                            const msg = array[array.length - index - 1];
                            return <TextMessage key={msg.messageId} message={msg} onReply={handleReply} onDelete={handleDelete} />
                        })}
                    </div>
                </div>
                {replyMessage && (
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg shadow mb-2">
                        <div className="text-gray-600">
                            <span className="font-semibold">Replying to {replyMessage.senderName}:</span>
                            {replyMessage.type == 0 ? `" ${replyMessage.text}"` : replyMessage.type == 1? " [File]" : " [Image]"}
                        </div>
                        <button
                            onClick={handleCancelReply}
                            className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                        >
                            <i className="fas fa-times"></i> {/* Font Awesome X icon */}
                        </button>
                    </div>
                )}
                {/* File preview region */}
                <div className="mt-2 overflow-x-auto flex space-x-2">
                    {filesList.map((file, index) => (
                        <FilePreview
                            key={file.id}
                            file={file}
                            onRemove={() => removeFile(file)}  // Pass the remove handler as a prop
                        />
                    ))}
                </div>
                {/* sending message area */}
                <div className="flex items-center md:gap-4 gap-2 md:p-3 p-2 overflow-hidden">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    {/* Clickable Iconic attachment icon */}
                    <i className="fas fa-paperclip" style={{ cursor: "pointer" }} onClick={() => { fileInputRef.current.click(); }}></i>
                    <div className="relative flex-1">
                        <TextareaAutosize
                            placeholder="Write your message"
                            minRows={1}
                            maxRows={10}
                            className="w-full resize-none bg-secondery px-4 p-2"
                            value={messageInput}
                            onChange={handleMsgInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    event.preventDefault();
                                    sendMessages();
                                    todoAfterSetChatMsgesRef.current = () => {
                                        if (chatMessagesRef.current) {
                                            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                                        }
                                    };
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                sendMessages();
                                todoAfterSetChatMsgesRef.current = () => {
                                    if (chatMessagesRef.current) {
                                        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                                    }
                                };
                            }}
                            className="text-white focus:outline-none shrink-0 p-2 absolute right-0.5 bottom-0"
                        >
                            <i className="far fa-paper-plane text-xl flex text-gray-400"></i>
                        </button>
                    </div>
                </div>               
            </div>
            {/* user profile right info */}
            {chatroom && <div className="rightt w-full h-full absolute top-0 right-0 z-10 hidden transition-transform">
                <div className="w-[360px] border-l shadow-lg h-screen bg-white absolute right-0 top-0 uk-animation-slide-right-medium delay-200 z-50 dark:bg-dark2 dark:border-slate-700">
                    <div className="w-full h-1.5 bg-gradient-to-r to-purple-500 via-red-500 from-pink-500 -mt-px" />
                    <div className="py-10 text-center text-sm pt-20">
                        {
                            chatroom.isPrivate ? <img
                                src={chatroom.avatar}
                                className="w-24 h-24 rounded-full mx-auto mb-3"
                                alt=""
                            /> : <div className="relative border-2 rounded-full d-inline-block">
                                    <AvatarUploader initialAvatar={chatroom.avatar}
                                        widthClass="w-24" heightClass="h-24" editable={true}
                                        camRight={-20}
                                        camBot={-20}
                                        uploadFunc={async (blob) => {
                                            return await uploadChatroomAvatar(chatroom.chatRoomId, blob)
                                        }}
                                     />
                                </div>  
                        }
                        <div className="mt-8">
                            <span className="md:text-xl text-base font-medium text-black dark:text-white">
                                {" "}
                                {chatroom.name}
                            </span>
                            {!chatroom.isPrivate && <button
                                className="ml-2 text-gray-500 hover:text-blue-500"
                                aria-label="Edit name"
                                onClick={() => setIsEditNameModalOpen(true)}
                            >
                                <i className="fas fa-pencil-alt"></i> {/* Use Font Awesome or any icon library */}
                            </button>}
                            {isEditNameModalOpen && <EditNameModal
                                name={chatroom.name}
                                onClose={() => { setIsEditNameModalOpen(false) }}
                                onSave={async (newName) => {
                                    try {
                                        await renameChatroom(chatroom.chatRoomId, newName);
                                        setIsEditNameModalOpen(false);
                                        setChatroom(prev => {
                                            return { ...prev, name: newName }
                                        });
                                    } catch {
                                        window.alert("failed, pls try again");
                                    }
                                }}
                            />}
                        </div>
                    </div>
                    <hr className="opacity-80 dark:border-slate-700" />
                    <ul className="text-base font-medium p-3">
                        {!chatroom.isPrivate && <li>
                            {" "}
                            <button
                                type="button"
                                className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
                                onClick={() => setIsViewMembersModalOpen(true)}
                            >
                                {" "}
                                View members{" "}
                            </button>{" "}
                        </li>}
                        {!chatroom.isPrivate && <li>
                            {" "}
                            <button
                                type="button"
                                className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
                                onClick={() => {
                                    setIsAddMembersModalOpen(true);
                                }}
                            >
                                {" "}
                                Add members{" "}
                            </button>{" "}
                            {isAddMembersModalOpen && <SelectUsersModal
                                header={"Add Members"}
                                onClose={() => { setIsAddMembersModalOpen(false) }}
                                onSubmit={async (data) => {
                                    await addUsersToChatroom(chatroom.chatRoomId, data.users.map(u => u.id));
                                }}
                                loadFunc={async (searchTerm) => {
                                    return await getUsersToAddToChatroom(chatroom.chatRoomId, searchTerm);
                                }}
                            /> }
                        </li>}
                        {chatroom.isPrivate && <li>
                            {" "}
                            <button
                                type="button"
                                className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
                            >
                                {" "}
                                Block{" "}
                            </button>{" "}
                        </li>}
                        <li>
                            {" "}
                            <button
                                type="button"
                                className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-red-50 text-red-500"
                                onClick={openLeaveConfirmModal}
                            >
                                {" "}
                                {chatroom.isPrivate ? "Delete" : "Leave"} Chat{" "}
                            </button>{" "}
                            <LeaveConfirmModalComponent
                                onCancel={() => { }}
                                onOk={async () => {
                                    try {
                                        await leaveChatroom(chatroom.chatRoomId);
                                        window.location.href = '/chatrooms';
                                        return;
                                    } catch (error) {
                                        window.alert("error occured");
                                        return false;
                                    }
                                }}
                                title="Leave chat"
                                content={"You will no longer see this chat"}
                            />
                        </li>                      
                    </ul>
                </div>
                {/* overly */}
                <div
                    className="bg-slate-100/40 backdrop-blur absolute w-full h-full dark:bg-slate-800/40"
                    uk-toggle="target: .rightt ; cls: hidden"
                />
            </div>}
            {isViewMembersModalOpen &&
                <ViewChatroomMembersModal
                onClose={() => { setIsViewMembersModalOpen(false); }}
                loadDataFunc={async () => {
                    const data = await getChatRoomMembers(chatroom.chatRoomId);
                    return data.items;
                }}
                onRemoveMem={async (memId) => {
                    await removeChatroomMember(chatroom.chatRoomId, memId);
                }}
                />}
        </>
    );
})
export default ChatroomDetail;