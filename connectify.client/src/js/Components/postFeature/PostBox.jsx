﻿import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from 'react';
import { Modal, Button, Form, Image, Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { AppContext } from '../../Contexts/AppProvider';
import EmojiPicker from '../utils/EmojiPicker';
import FriendSearch from '../utils/FriendSearch';
import { createPost } from '../../api/Post';
import { generateGuid } from '../../Utils/MathsHelper';
import { FaCamera } from 'react-icons/fa'; 
import TextareaAutosize from 'react-textarea-autosize';
const PostBox = forwardRef(({ }, ref) => {
    const { user } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [isTaggingFriends, setIsTaggingFriends] = useState(false);
    const [privacy, setPrivacy] = useState(0);
    const [images, setImages] = useState([]);
    const [feeling, setFeeling] = useState('');
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [postContent, setPostContent] = useState('');
    useImperativeHandle(ref, () => ({
        openPostBox: () => setShow(true),
        closePostBox: () => setShow(false),
    }));
    const handleEmojiSelect = (emoji) => {
        setPostContent((prevText) => prevText + emoji.native); // Append the selected emoji to the text
    };
    const handleClose = () => {
        setShow(false);
        resetPostBox();
    };
    const handleShow = () => setShow(true);

    const resetPostBox = () => {
        setPrivacy(0);
        setImages([]);
        setFeeling('');
        setTaggedFriends([]);
        setPostContent('');
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(f => f.id = generateGuid());
        setImages([...images, ...files]);
        e.target.value = null;
    };

    const removeImage = (id) => {
        setImages(images.filter(img => img.id != id));
    };

    const handlePrivacyChange = (e) => setPrivacy(parseInt(e.target.value));

    const handleFeelingChange = (e) => setFeeling(e.target.value);

    const removeTaggedFriend = (id) => {
        setTaggedFriends(taggedFriends.filter(friend => friend.id != id));
    };

    const handleTagFriends = () => {
        setIsTaggingFriends(true);
    };

    const handleFriendSelect = (friend) => {
        setTaggedFriends([...taggedFriends, friend]);
        setIsTaggingFriends(false);
    };

    const handleSubmitPost = async () => {
        const postData = {
            content: postContent,
            visibility: privacy,
            files: images,
            taggedFriendIds: taggedFriends.map(fr => fr.id),
            feeling: feeling
        };
        const res = createPost(postData);
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <div className="d-flex align-items-center">
                        <Image src={user?.avatar} roundedCircle width={50} height={50} className="me-2" style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                        <div>
                            <h5>{user && (user.fullName)}</h5>
                            <Form.Select aria-label="Privacy" value={privacy} onChange={handlePrivacyChange} className="mt-1">
                                <option value={0}>Public</option>
                                <option value={1}>Friends</option>
                                <option value={2}>Only Me</option>
                            </Form.Select>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    {!isTaggingFriends ? (
                        <>
                            <div style={{ position: 'relative' }}>
                                <TextareaAutosize
                                    minRows={5}
                                    maxRows={15}
                                    placeholder="What's on your mind?"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {/* Emoji Button */}
                                <EmojiPicker
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                    }}
                                    onSelect={handleEmojiSelect}
                                />
                            </div>

                            {/* Image/Video upload section */}
                            <div className="mt-3">
                                <Form.Label>Add Photos/Videos</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }} // Ẩn input file mặc định
                                        id="file-input-post"
                                    />

                                    {/* Tùy chỉnh nút chọn file */}
                                    <FaCamera
                                        size={30} // Adjust the size of the icon
                                        style={{ cursor: 'pointer' }} // Change cursor to pointer
                                        onClick={() => document.getElementById('file-input-post').click()} // Open file dialog on click
                                    />

                                    {/* Hiển thị số lượng file đã chọn */}
                                    <span className="ms-3">
                                        {images.length > 0
                                            ? `${images.length} file(s) selected`
                                            : 'No files selected'}
                                    </span>
                                </div>
                                <div className="d-flex mt-2 flex-wrap">
                                    {images.map((image, index) => (
                                        <div key={image.id} className="position-relative me-2 mb-2">
                                            <Image src={URL.createObjectURL(image)} thumbnail style={{ width: '100px', height: '100px' }} />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0"
                                                onClick={() => removeImage(image.id)}
                                            >
                                                x
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Emotion and Tag friends */}
                            <div className="d-flex justify-content-between mt-3">
                                {/* Emotion selection */}
                                <div className="flex-fill me-2">
                                    <Form.Label>Select Feeling</Form.Label>
                                    <Form.Control as="select" value={feeling} onChange={handleFeelingChange}>
                                        <option value="">Select...</option>
                                        <option value="Happy">Happy</option>
                                        <option value="Sad">Sad</option>
                                        <option value="Excited">Excited</option>
                                        <option value="Angry">Angry</option>
                                    </Form.Control>
                                </div>

                                {/* Tag friends section */}
                                <div className="flex-fill">
                                    <Form.Label>Tag Friends</Form.Label>
                                    <Button variant="info" onClick={handleTagFriends} className="w-100">
                                        Tag Friends
                                    </Button>
                                    <div className="mt-2 d-flex flex-wrap">
                                        {taggedFriends.map((friend, index) => (
                                            <Badge style={{cursor:'pointer'}} onClick={() => removeTaggedFriend(friend.id)} key={index} bg="secondary" className="me-1 mb-1 d-flex align-items-center">
                                                <Image src={friend.avatar} roundedCircle width={30} height={30} className="me-2" />
                                                {friend.fullName}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                            <FriendSearch handleFriendSelect={handleFriendSelect} onClose={() => { setIsTaggingFriends(false); }}
                                listToExclude={taggedFriends} />
                    )}
                </Modal.Body>

                {!isTaggingFriends && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} style={{ color: '#6c757d', backgroundColor: 'white', borderColor: '#6c757d' }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitPost} style={{ color: 'white', backgroundColor: '#007bff', borderColor: '#007bff' }}>
                            Post
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
})

export default PostBox;
