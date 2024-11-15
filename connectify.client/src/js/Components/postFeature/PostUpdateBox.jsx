import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext, useRef } from 'react';
import { Modal, Button, Form, Image, Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { AppContext } from '../../Contexts/AppProvider';
import EmojiPicker from '../utils/EmojiPicker';
import FriendSearch from '../utils/FriendSearch';
import { createPost, getPost, updatePost } from '../../api/Post';
import { generateGuid } from '../../Utils/MathsHelper';
import { FaCamera } from 'react-icons/fa';

const PostUpdateBox = forwardRef(({ }, ref) => {
    const [id, setId] = useState(0);
    const { user } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [isTaggingFriends, setIsTaggingFriends] = useState(false);
    const [visibility, setVisibility] = useState(null);
    const [images, setImages] = useState([]);
    const [feeling, setFeeling] = useState('');
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const updatePostUIRef = useRef((post) => { });
    useImperativeHandle(ref, () => ({
        openPostUpdateBox: () => setShow(true),
        closePostUpdateBox: () => setShow(false),
        setPost: (post) => {
            setId(post.id);
            setFeeling(post.feeling);
            setPostContent(post.content);
            setVisibility(post.visibility);
            setTaggedFriends(post.taggedUsers);
            setImages(post.media);
        },
        setUpdatePostUI: (func) => { updatePostUIRef.current = func } 
    }));
    const handleEmojiSelect = (emoji) => {
        setPostContent((prevText) => prevText + emoji.native); // Append the selected emoji to the text
    };
    const handleClose = () => {
        setShow(false);
        resetPostBox();
    };

    const resetPostBox = () => {
        setId(0);
        setVisibility(0);
        setImages([]);
        setFeeling('');
        setTaggedFriends([]);
        setPostContent('');
        updatePostUIRef.current = (post) => { };
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(f => f.id = generateGuid());
        setImages(images => [...images, ...files]);
        e.target.value = null;
    };

    const removeImage = (id) => {
        setImages(images => images.filter(img => img.id != id));
    };

    const handlePrivacyChange = (e) => setVisibility(parseInt(e.target.value));

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

    const handleSaveChanges = async () => {
        setIsLoading(true);
        const postData = {
            id: id,
            content: postContent,
            visibility: visibility,
            taggedFriendIds: taggedFriends.map(fr => fr.id),
            feeling: feeling,
            fileIdsToKeep: images.filter(f => f.url != null).map(img => img.id),
            filesAdded: images.filter(f => f.url == null)
        };
        console.log(postData);
        const res = await updatePost(postData);
        if (res.success) {
            setIsLoading(false);
            try {
                const updatedPost = await getPost(id);
                updatePostUIRef.current(updatedPost);
            }
            catch(error){
                console.log(error);
            }
            resetPostBox();
            setShow(false);
        } else {
            window.alert("failed to update");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <div className="d-flex align-items-center">
                        <Image src={user?.avatar} roundedCircle width={50} height={50} className="me-2" style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                        <div>
                            <h5>{user && (user.fullName)}</h5>
                            <Form.Select aria-label="Privacy" value={visibility} onChange={handlePrivacyChange} className="mt-1">
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
                            <Form.Group controlId="postContent" style={{ position: 'relative' }} >
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="What's on your mind?"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                />
                                {/* Emoji Button */}
                                <EmojiPicker style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                }} onSelect={handleEmojiSelect} />
                            </Form.Group>

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
                                    {images.map((media, index) => {

                                        return (
                                            <div key={media.id} className="position-relative me-2 mb-2">
                                                {media.type.startsWith('image') && (
                                                    <Image src={media.url ?? URL.createObjectURL(media)} thumbnail style={{ width: '100px', height: '100px' }} />
                                                )}
                                                {media.type.startsWith('video') && (
                                                    <video className="img-thumbnail" width="200px" height="200px" controls>
                                                        <source src={media.url ?? URL.createObjectURL(media)} type={media.fileType} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="position-absolute top-0 end-0"
                                                    onClick={() => removeImage(media.id)}
                                                >
                                                    x
                                                </Button>
                                            </div>
                                        );
                                    })}

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
                                            <Badge style={{ cursor: 'pointer' }} onClick={() => removeTaggedFriend(friend.id)} key={index} bg="secondary" className="me-1 mb-1 d-flex align-items-center">
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
                        <Button variant="primary" onClick={handleSaveChanges} disabled={isLoading} style={{ color: 'white', backgroundColor: '#007bff', borderColor: '#007bff' }}>
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
})

export default PostUpdateBox;
