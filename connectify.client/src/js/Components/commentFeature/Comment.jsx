import { useState } from "react";
import { FaChevronUp, FaChevronDown} from "react-icons/fa"
import ReplySection from "./ReplySection";
import { Link } from "react-router-dom"
import { deleteComment, editComment, reactToComment, replyToComment } from "../../api/Comment";
import { useRef } from "react";
import { formatDistanceToUTCNow } from "../../Utils/datetimeUtil";
import TextareaAutosize from 'react-textarea-autosize';
import ReadMoreLess from 'react-read-more-less';
const Comment = ({ comment, setList }) => {
    console.log(comment);
    const [replyText, setReplyText] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.content);
    const replySectionRef = useRef(null);

    const handleReply = async () => {
        try {
            const reply = await replyToComment(replyText, comment.commentId);
            if (comment.parentCommentId == null) {
                if (replySectionRef.current) {
                    replySectionRef.current.addReply(reply);
                } else {
                    setShowReplies(prev => !prev);
                }
            } else {
                setList(prev => [reply, ...prev]);
            }
            setShowReplyInput(false);
            
        } catch (error) {
            window.alert("error occured, maybe the comment no longer exists");
        }
    }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (editedText.trim()) {
            try {
                const editedComment = await editComment(comment.commentId, editedText);
                setIsEditing(false);
                setList(prev => prev.map(c => c.commentId == comment.commentId ? editedComment : c))
            } catch(error){
                window.alert("error occured, maybe the comment no longer exists");
            }
        }
    };
    const handleDelete = async () => {
        try {
            await deleteComment(comment.commentId);
            setList(prev => prev.filter(c => c.commentId != comment.commentId));
        } catch (error) {
            window.alert("error occured, maybe the comment no longer exists");
        }
    }
    const handleReact = async (val) => {
        try {
            await reactToComment(comment.commentId, val);
            setList(prev => prev.map(c => {
                if (c.commentId === comment.commentId) {
                    let newLikesCount = c.likesCount;
                    let newDislikesCount = c.dislikesCount;

                    // Adjust counts based on the current and new viewer reactions
                    if (val === true) { // Like
                        if (c.viewerReaction === false) {
                            newDislikesCount -= 1; // Remove previous dislike
                        }
                        if (c.viewerReaction !== true) {
                            newLikesCount += 1; // Add new like
                        }
                    } else if (val === false) { // Dislike
                        if (c.viewerReaction === true) {
                            newLikesCount -= 1; // Remove previous like
                        }
                        if (c.viewerReaction !== false) {
                            newDislikesCount += 1; // Add new dislike
                        }
                    } else { // Null (remove reaction)
                        if (c.viewerReaction === true) {
                            newLikesCount -= 1; // Remove previous like
                        } else if (c.viewerReaction === false) {
                            newDislikesCount -= 1; // Remove previous dislike
                        }
                    }

                    return {
                        ...c,
                        likesCount: newLikesCount,
                        dislikesCount: newDislikesCount,
                        viewerReaction: val,
                    };
                }
                return c;
            }));
        } catch (error) {
            window.alert("error occured, maybe the comment no longer exists");
        }
    };

    return (
        <div className="mb-4 p-3 bg-white shadow-md">
            <div className="flex items-start">
                <img
                    src={comment.authorAvatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <strong>{comment.authorName}</strong>
                            <span className="text-gray-500 text-sm ml-2">
                                {formatDistanceToUTCNow(comment.createdAt)}
                                {comment.updatedAt && (
                                    <span> (edited)</span>
                                )}
                            </span>
                            {isEditing ? (
                                <form onSubmit={handleUpdateSubmit}>
                                    <TextareaAutosize
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button type="submit" className="text-green-500 mr-2">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="text-red-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                    <p className="whitespace-pre-line"> 
                                        {/* Render a single clickable mention */}
                                        {comment.replyToAuthorName && (
                                            <>
                                                <span className="text-gray-500">Answering: </span>
                                                <Link
                                                    to={`/${comment.replyToAuthorId}`} // Update URL as per routing setup
                                                    className="text-blue-500 mr-1"
                                                >
                                                    @{comment.replyToAuthorName}
                                                </Link>
                                            </>
                                        )}
                                        <ReadMoreLess
                                            charLimit={500} // Limit the number of characters shown initially
                                            readMoreText="Read More"
                                            readLessText="Shrink"
                                        >
                                            {comment.content}
                                        </ReadMoreLess>
                                    </p>
                            )}
                        </div>
                        {comment.isAuthor && <div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div> }
                    </div>
                    {/* Like and Dislike buttons */}
                    <div className="flex space-x-3 mt-2">
                        <button
                            onClick={() => {
                                handleReact(comment.viewerReaction ? null : true);
                            }}
                            className="flex items-center cursor-pointer p-1 rounded-full text-black "
                        >
                            <i className={`bi bi-hand-thumbs-up${comment.viewerReaction ? '-fill' : ''} mr-1`} />
                            <span>{comment.likesCount}</span>
                        </button>
                        <button
                            onClick={() => {
                                handleReact(comment.viewerReaction==false? null : false);
                            }}
                            className="flex items-center cursor-pointer p-1 rounded-full text-black "
                        >
                            <i className={`bi bi-hand-thumbs-down${comment.viewerReaction == false ? '-fill' : ''} mr-1`} />
                            <span>{comment.dislikesCount}</span>
                        </button>
                    </div>


                    {/* Reply Section */}
                    <div className="mt-2 flex space-x-4">
                        {comment.repliesCount > 0 &&
                        <button
                            onClick={() => setShowReplies(prev => !prev)}
                            className="text-blue-500 hover:text-blue-700 flex items-center"
                        >
                            {showReplies ? <FaChevronUp className="mr-1" /> : <FaChevronDown className="mr-1" />}
                            <span>{comment.repliesCount} Replies</span>
                        </button>}

                        {!showReplyInput && (
                            <button
                                onClick={() => setShowReplyInput(true)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Reply
                            </button>
                        )}
                    </div>
                    {showReplyInput && <div className="mt-3 relative">
                        <TextareaAutosize
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.authorName}...`}
                            className="w-full p-2 border rounded-md"
                        />
                        <div className="absolute right-0 bottom-0 space-x-3 p-1">
                            <button
                                type="button"
                                onClick={() => setShowReplyInput(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button onClick={handleReply} className="text-blue-500 hover:text-blue-700">
                                Reply
                            </button>
                        </div>
                    </div>}
                    {/* Replies */}
                    {showReplies && <ReplySection ref={replySectionRef} setShowReplyInput={setShowReplyInput} comment={comment} />}

                </div>
            </div>
        </div>
    );
};
export default Comment;
