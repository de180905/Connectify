import React, { forwardRef, useState } from 'react';
import Modal from 'react-modal';
import { getFriendsOfUser, getUserFriends } from '../../api/search';
import { useEffect } from 'react';
import { useImperativeHandle } from 'react';
import { createChatRoom } from '../../api/chat';
Modal.setAppElement('#root');
export const SelectUsersModal = ({ onClose, header, onSubmit, loadFunc = () => { },
    minUsersCount = 1, selectedFriendsInitial = [], showTxtName = true }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFriends, setSelectedFriends] = useState(selectedFriendsInitial);
    const [groupName, setGroupName] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    useEffect(() => {
        const loadFriends = async () => {
            const data = await loadFunc(searchTerm);
            console.log(data);
            if (data) {
                setFriendsList(data.items);
            }
        }
        try {
            loadFriends();
        } catch {

        }
        
    }, [searchTerm])

    const submit = async () => {
        const data = {
            name: groupName,
            /*userIds: selectedFriends.map((friend) => friend.id),*/
            users: selectedFriends
        };
        try {
            const result = await onSubmit(data);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const addFriend = (friend) => {
        if (!selectedFriends.some((f) => f.id === friend.id)) {
            setSelectedFriends((prev) => [...prev, friend]);
        }
    };

    const removeFriend = (friend) => {
        setSelectedFriends((prev) => prev.filter((f) => f.id !== friend.id));
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Create Group Modal"
            style={{
                content: {
                    maxWidth: '500px',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                },
            }}
            overlayClassName="coverUploader-overlay"
        >
            <div className="modal-header d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <h2 className="modal-title">{header}</h2>
                <button
                    className="btn btn-primary"
                    onClick={submit}
                    disabled={selectedFriends.length < minUsersCount}
                >
                    submit
                </button>
            </div>
            {/* Group Name Input */}
            {showTxtName && <input
                type="text"
                placeholder="Enter group name..."
                className="form-control mb-3"
                onChange={(e) => {
                    setGroupName(e.target.value);
                }}
            />}
            <input
                type="text"
                placeholder="Search friends..."
                className="form-control mb-3"
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            <div className="list-group overflow-y-auto border-2 mb-3 " style={{ height: '54%' }}>
                {friendsList.map((friend) => (
                    <button
                        key={friend.id}
                        className="w-full text-left p-2 border-b hover:bg-gray-200 flex items-center justify-between"
                        onClick={() => addFriend(friend)}
                        disabled={selectedFriends.some((f) => f.id === friend.id)}
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={friend.avatar} // Assume `avatarUrl` is the URL for the avatar image
                                alt={friend.fullName}
                                className="w-12 h-12 rounded-full"
                            />
                            <span>{friend.fullName}</span>
                        </div>
                        {selectedFriends.some((f) => f.id === friend.id) && (
                            <span className="ml-2 text-green-500">Selected</span>
                        )}
                    </button>
                ))}
            </div>
            <h5>Selected Friends</h5>
            <div className="flex p-2 overflow-x-auto mb-3" style={{ gap: '0.5rem' }}>
                {selectedFriends.map((friend) => (
                    <span key={friend.id} className="badge bg-secondary d-flex align-items-center">
                        {friend.fullName}
                        <button
                            className="btn-close btn-close-white ms-2"
                            onClick={() => removeFriend(friend)}
                            style={{ fontSize: '0.8rem' }}
                        ></button>
                    </span>
                ))}
            </div>
        </Modal>
    );
};
