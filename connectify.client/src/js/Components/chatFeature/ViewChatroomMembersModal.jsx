import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import Modal from 'react-modal';
import { getUserFriends } from '../../api/search';
import { Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { removeChatroomMember } from '../../api/chat';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppProvider';
Modal.setAppElement('#root');
export const ViewChatroomMembersModal = ({ onClose, loadDataFunc, onRemoveMem }) => {
    const { user } = useContext(AppContext);
    const [membersList, setMembersList] = useState([]);
    const loadMembersList = async () => {
        try {
            const data = await loadDataFunc();
            console.log(data);
            if (Array.isArray(data)) {
                setMembersList(data);
            }
        } catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        loadMembersList();
    }, []);
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Create Group Modal"
            style={{
                content: {
                    maxWidth: '500px',
                    height: '80%',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                },
            }}
            overlayClassName="coverUploader-overlay"
        >
            <div className="modal-header d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary" onClick={onClose}>
                    Close
                </button>
                <h2 className="modal-title">Group Members</h2>
            </div>
            <div className="list-group overflow-y-auto border-2 mb-3" style={{height: '80%'}}>
                {membersList.map((mem) => (
                    <button
                        key={mem.id}
                        className="w-full text-left p-2 border-b hover:bg-gray-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2 flex-grow">
                            <img
                                src={mem.avatar} // Assume `avatarUrl` is the URL for the avatar image
                                alt={mem.fullName}
                                className="w-12 h-12 rounded-full"
                            />
                            <span className="text-dark">{mem.fullName}</span>
                        </div>

                        {/* Role display at the end of the container, before the 3 dots */}
                        <span className="text-gray-500 ml-4 mr-3">{mem.role === 'Owner' ? 'Owner' : mem.role === 'Admin' ? 'Admin' : ''}</span>

                        {/* Dropdown for actions */}
                        <Dropdown>
                            <Dropdown.Toggle
                                className="p-0 m-0 border-0 text-dark bg-transparent"
                                bsPrefix="btn"
                            >
                                <FaEllipsisV />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    window.open('/' + mem.id, '_blank', 'noopener,noreferrer');
                                }}>View</Dropdown.Item>
                                {['Owner', 'Admin'].includes(membersList.find(m => m.id == user.id)?.role) && <Dropdown.Item onClick={async () => {
                                    try {
                                        await onRemoveMem(mem.id);
                                        setMembersList(prev => [...prev].filter(e => e.id !== mem.id));
                                    } catch {
                                        window.alert("error occurred");
                                    }
                                }}>Remove</Dropdown.Item> }
                            </Dropdown.Menu>
                        </Dropdown>
                    </button>
                ))}
            </div>
        </Modal>
    );
};