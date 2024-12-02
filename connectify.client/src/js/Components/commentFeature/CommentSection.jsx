import React, { useState, useEffect, useRef } from 'react';
import { addComment, getRootComment, getTopLevelComments } from '../../api/Comment';
import Comment from './Comment';
import TextareaAutosize from 'react-textarea-autosize';
// A single comment with replies

// Main Comment Section
const CommentSection = ({ postId, commentId }) => {
    const [comments, setComments] = useState([]);
    const [loadTrigger, setLoadTrigger] = useState({ page: 1, sortOption: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const textareaRef = useRef(null);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            if (commentId && commentId > 0) {
                // If commentId is provided, fetch the comment and its replies
                const response = await getRootComment(commentId);
                if (response && response.data) {
                    console.log(response.data)
                    setComments([response.data]);
                }

                setTotalCount(1);
            } else {
                const commentPaging = await getTopLevelComments(postId, loadTrigger.sortOption, loadTrigger.page, 5);
                const comments = commentPaging.items;
                if (loadTrigger.page === 1) {
                    setComments(comments);
                } else {
                    setComments((prev) => [...prev, ...comments]);
                }
                setTotalCount(commentPaging.totalCount);
            }
        }
        catch (error) {
            window.alert("error occured, pls try again");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleAddComment = async (text) => {
        try {
            const createdComment = await addComment(text.trim(), postId);
            setComments(prev => [createdComment, ...prev]);
        } catch (error) {
            window.alert("error occured, pls try again");
        }
    };
    const handleSortChange = (sortOption) => {
        setLoadTrigger({ page: 1, sortOption }); // Reset to page 1 on sort change
    };
    useEffect(() => {
        fetchComments();
    }, [loadTrigger]);
    return (
        <div className="container mx-auto">
            {/* Sorting Filter */}
            <div className="flex justify-end mb-3">
                <select
                    value={loadTrigger.sortOption}
                    onChange={(e) => handleSortChange(parseInt(e.target.value))}
                    className="p-2 border rounded-md"
                >
                    <option value={0}>Popular</option>
                    <option value={1}>Latest</option>
                </select>
            </div>
            <div className="relative mb-3">
                <TextareaAutosize
                    ref={textareaRef}
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-md"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleAddComment(e.target.value);
                            e.target.value = '';
                            e.preventDefault();
                        }
                    }}
                />
                <button
                    className="absolute right-2 bottom-1 text-blue-500 hover:text-blue-700"
                    onClick={() => {
                        if (textareaRef.current) {
                            handleAddComment(textareaRef.current.value);
                            textareaRef.current.value = "";
                        }
                    }}
                >
                    Submit
                </button>
            </div>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <Comment
                        key={comment.commentId}
                        comment={comment}
                        setList={setComments}
                    />
                ))}
            </div>
            {comments.length < totalCount && (
                <div className="text-center mt-4">
                    <button
                        onClick={() =>
                            setLoadTrigger((prev) => ({ ...prev, page: prev.page + 1 }))
                        }
                        disabled={isLoading}
                        className="text-blue-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'More Comments'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
