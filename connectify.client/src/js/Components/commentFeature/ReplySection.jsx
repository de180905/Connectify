import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { getReplies, replyToComment } from "../../api/Comment";
import Comment from "./Comment";
const ReplySection = forwardRef(({ comment, setShowReplies }, ref) => {
    const [replies, setReplies] = useState([]);
    const [loadTrigger, setLoadTrigger] = useState({ page: 1, sortOption: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    useImperativeHandle(ref, () => ({
        addReply: (reply) => {
            setReplies(prev => [reply, ...prev]);
        },
    }));
   
    const fetchReplies = async () => {
        setIsLoading(true);
        try {
            const repliesPaging = await getReplies(comment.commentId, loadTrigger.pageNumber, 5);
            const replies = repliesPaging.items;
            if (loadTrigger.page == 1) {
                setReplies(prev => replies);
            } else {
                setReplies((prev) => [...prev, ...replies]);
            }
            setTotalCount(repliesPaging.totalCount);
        }
        catch (error) {
            window.alert("error occured, pls try again");
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchReplies();
    }, [loadTrigger]);
    return (
        <div className="ml-4 mt-2">
            {replies.map((reply) => (
                <Comment
                    key={reply.commentId}
                    comment={reply}
                    setList={setReplies}
                />
            ))}
            {replies.length < totalCount && (
                <div className="text-center mt-4">
                    <button
                        onClick={() =>
                            setLoadTrigger((prev) => ({ ...prev, page: prev.page + 1 }))
                        }
                        disabled={isLoading}
                        className="text-blue-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'More Replies'}
                    </button>
                </div>
            )}
        </div>

    );
});
export default ReplySection;
