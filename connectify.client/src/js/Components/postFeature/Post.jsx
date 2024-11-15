import React, { useState, useRef, useContext } from "react";
import {Link} from 'react-router-dom';
import { FaEllipsisH, FaThumbsUp, FaRegCommentDots, FaShare, FaSmile, FaLaugh, FaSadTear } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import Modal from "react-modal";
import { isImage } from "../../Utils/MediaHelper";
import '/assets/css/Modal.css'
import '/assets/css/Icon.css'
import '/assets/css/mediaStyle.css'
import { reactionTypeValue } from "../../Utils/EnumMapper";
import { reactToPost, unReactPost } from "../../api/Post";
import { AppContext } from "../../Contexts/AppProvider";
import { formatDistanceToUTCNow } from "../../Utils/datetimeUtil";
import CommentSection from "../commentFeature/CommentSection";
import ReadMoreLess from 'react-read-more-less';


// Đặt thuộc tính cho modal
Modal.setAppElement('#root');

const Post = ({ post, updatePostUI }) => {
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [showReactionDetails, setShowReactionDetails] = useState(false);
    const [showAllTaggedUsers, setShowAllTaggedUsers] = useState(false);
    const [show3dotsOpts, setShow3dotsOpts] = useState(false);
    const { postUpdateBoxRef, mediaDetailRef } = useContext(AppContext);
    // Hàm để chuyển đổi trạng thái xem thêm/thu gọn
    const toggleShowAllTaggedUsers = () => {
        setShowAllTaggedUsers(!showAllTaggedUsers);
    };
    const handleReactionClick = async (reactionType) => {
        if (reactionType != post.viewerReaction?.value) {
            const result = await reactToPost(post.id, reactionType);
            if (result.success) {
                console.log("vua react to post");
                const newP = { ...post, viewerReaction: result.data };
                const ncl = [...post.reactionCountsList]
                if (post.viewerReaction != null) {
                    for (let i = 0; i < ncl.length; i++) {
                        if (ncl[i].reactionType == post.viewerReaction.value) {
                            ncl[i] = { reactionType: post.viewerReaction.value, count: ncl[i].count - 1 }
                            if (ncl[i].count == 0) {
                                ncl.splice(i, 1);
                            }
                            break;
                        }
                    }
                }
                for (let i = 0; i < ncl.length; i++) {
                    if (ncl[i].reactionType == reactionType) {
                        ncl[i] = { reactionType: reactionType, count: ncl[i].count + 1 }
                        newP.reactionCountsList = ncl;
                        break;
                    }
                }
                ncl.push({ reactionType: reactionType, count: 1 })
                newP.reactionCountsList = ncl;
                updatePostUI(newP);
            }
        } else {
            const result = await unReactPost(post.id);
            if (result.success) {
                const newP = { ...post, viewerReaction: null };
                const ncl = [...post.reactionCountsList]
                for (let i = 0; i < ncl.length; i++) {
                    if (ncl[i].reactionType == post.viewerReaction.value) {
                        ncl[i] = { reactionType: post.viewerReaction.value, count: ncl[i].count - 1 }
                        if (ncl[i].count == 0) {
                            ncl.splice(i, 1);
                        }
                        break;
                    }
                }
                newP.reactionCountsList = ncl;
                updatePostUI(newP);
            }
        }
    }
    const toggleReactionDetails = () => {
        setShowReactionDetails(!showReactionDetails);
    };
    const [isLikeHovering, setIsLikeHovering] = useState(false);
    // Hàm render các cảm xúc
    const renderReactions = () => {
        return (
            <div style={{ top: '-150%', left: '0'}} className="absolute mb-2 flex space-x-2 p-2 bg-white rounded-lg shadow-lg">
                {Object.keys(reactionTypeValue).map(key =>
                    <button onClick={() => { handleReactionClick(parseInt(key)) }}>
                        {reactionTypeValue[key]}
                    </button>
                )}
            </div>
        );
    };
    const renderTaggedUsers = () => {
        const taggedUsers = post.taggedUsers;
        const totalTaggedUsers = taggedUsers.length;

        if (totalTaggedUsers === 0) {
            return null; // Không có người nào được tagged
        } else if (totalTaggedUsers === 1) {
            // Nếu có 1 người tagged
            return (
                <span>
                    with{" "}
                    <Link to={`/${taggedUsers[0].id}`} className="text-blue-500 hover:underline ml-1">
                        {taggedUsers[0].fullName}
                    </Link>
                </span>
            );
        } else if (totalTaggedUsers === 2) {
            // Nếu có 2 người tagged
            return (
                <span>
                    with{" "}
                    <Link to={`/${taggedUsers[0].id}`} className="text-blue-500 hover:underline ml-1">
                        {taggedUsers[0].fullName}
                    </Link>{" "}
                    and{" "}
                    <Link to={`/${taggedUsers[1].id}`} className="text-blue-500 hover:underline ml-1">
                        {taggedUsers[1].fullName}
                    </Link>
                </span>
            );
        } else {
            // Nếu có từ 3 người trở lên
            const firstTaggedUser = taggedUsers[0];
            const remainingTaggedUsers = taggedUsers.slice(1); // Lấy những người còn lại

            return (
                <span>
                    with{" "}
                    <Link to={`/${firstTaggedUser.id}`} className="text-blue-500 hover:underline ml-1">
                        {firstTaggedUser.fullName}
                    </Link>{" "}
                    and{" "}
                    {!showAllTaggedUsers ? (
                        <button
                            className="text-blue-500 hover:underline ml-1"
                            onClick={toggleShowAllTaggedUsers}
                        >
                            {remainingTaggedUsers.length} others
                        </button>
                    ) : (
                        <span>
                            {remainingTaggedUsers.map((user, index) => (
                                <Link
                                    key={user.id}
                                    to={`/${user.id}`}
                                    className="text-blue-500 hover:underline ml-1"
                                >
                                    {user.fullName}
                                    {index < remainingTaggedUsers.length - 1 ? "," : ""}
                                </Link>
                            ))}
                            {" "}
                            <button
                                className="text-blue-500 hover:underline ml-1"
                                onClick={toggleShowAllTaggedUsers}
                            >
                                Retract
                            </button>
                        </span>
                    )}
                </span>
            );
        }
    };

    // Hàm để xử lý cách hiển thị media
    const renderMedia = () => {
        const totalMedia = post.media.length;

        if (totalMedia === 1) {
            return (
                <div onClick={() => {
                    mediaDetailRef.current.setMedia(post.media);
                    mediaDetailRef.current.open(0);
                }} className="post-media-render cursor-pointer flex-1">
                    {isImage(post.media[0].url) ? (
                        <img src={post.media[0].url} alt="" className="w-full post-media  object-cover"/>
                    ) : (
                        <video className="w-full h-full object-cover" controls>
                            <source src={post.media[0].url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            );
        }

        if (totalMedia === 2) {
            return (
                <div className="post-media-render flex flex-row gap-1"> {/* Added gap-2 for gutter */}
                    {post.media.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                mediaDetailRef.current.setMedia(post.media);
                                mediaDetailRef.current.open(index);
                            }}
                            className="cursor-pointer flex-1"
                            style={{ width: "50%" }}
                        >
                            {isImage(item.url) ? (
                                <img src={item.url} alt="" className="w-full post-media  h-full object-cover" />
                            ) : (
                                <video className="w-full h-full object-cover" controls>
                                    <source src={item.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (totalMedia === 3) {
            return (
                <div className="post-media-render flex flex-col gap-1"> {/* Added gap-2 for gutter */}
                    <div
                        onClick={() => {
                                mediaDetailRef.current.setMedia(post.media);
                                mediaDetailRef.current.open(0);
                            }}
                        className="cursor-pointer"
                        style={{ height: "50%" }}
                    >
                        {isImage(post.media[0].url) ? (
                            <img src={post.media[0].url} alt="" className="w-full post-media  h-full object-cover" />
                        ) : (
                            <video className="w-full h-full object-cover" controls>
                                <source src={post.media[0].url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    <div className="flex flex-row gap-1" style={{height: "50%" }}> {/* Added gap-2 for gutter */}
                        {post.media.slice(1).map((item, index) => (
                            <div
                                key={index + 1}
                                onClick={() => {
                                    mediaDetailRef.current.setMedia(post.media);
                                    mediaDetailRef.current.open(index+1);
                                }}
                                className="cursor-pointer flex-1"
                                style={{ width: "50%" }}
                            >
                                {isImage(item.url) ? (
                                    <img src={item.url} alt="" className="w-full post-media h-full object-cover" />
                                ) : (
                                    <video className="w-full h-full object-cover" controls>
                                        <source src={item.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (totalMedia >= 4) {
            return (
                <div className="post-media-render flex flex-col gap-1"> {/* Added gap-2 for gutter */}
                    <div
                        onClick={() => {
                            mediaDetailRef.current.setMedia(post.media);
                            mediaDetailRef.current.open(0);
                        }}
                        className="cursor-pointer"
                        style={{ height: "50%" }}
                    >
                        {isImage(post.media[0].url) ? (
                            <img src={post.media[0].url} alt="" className="w-full  h-full post-media object-cover" />
                        ) : (
                            <video className="w-full h-full object-cover" controls>
                                <source src={post.media[0].url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    <div className="flex flex-row gap-1" style={{ height: "50%" }}> {/* Added gap-2 for gutter */}
                        {post.media.slice(1, 3).map((item, index) => (
                            <div
                                key={index + 1}
                                onClick={() => {
                                    mediaDetailRef.current.setMedia(post.media);
                                    mediaDetailRef.current.open(index+1);
                                }}
                                className="cursor-pointer flex-1 relative"
                                style={{ width: "50%" }}
                            >
                                {isImage(item.url) ? (
                                    <img src={item.url} alt="" className="w-full  h-full post-media object-cover" />
                                ) : (
                                    <video className="w-full h-full object-cover" controls>
                                        <source src={item.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {/* Hiển thị dấu cộng trên ảnh thứ 3 */}
                                {index === 1 && totalMedia > 3 && (
                                    <div style={{
                                        opacity: 0.6
                                    }} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-bold">
                                        +{totalMedia - 3}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };
    return (
        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border dark:bg-dark2">
            {/* post heading */}
            <div className="flex gap-3 sm:p-3 p-2.5 text-sm font-medium">
                <Link to={`/${post.author.id}`}>
                    <img src={post.author.avatar} alt="" className="w-9 h-9 rounded-full" />
                </Link>
                <div className="flex-1">
                    <Link to={`/${post.author.id}`}>
                        <span className="text-black dark:text-white">{post.author.fullName}</span>
                    </Link>
                    {post.feeling && (
                        <span className="text-gray-500 ml-1">
                            is feeling {post.feeling}
                        </span>
                    )}

                    {/* Hiển thị taggedUsers ngang hàng với tên tác giả */}
                    <div className="text-black dark:text-white flex items-center">
                        {renderTaggedUsers()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-white/80">
                        {post.updatedAt ?
                            (<span>Last updated: {formatDistanceToUTCNow(post.updatedAt, { addSuffix: true })}</span>)
                            :
                            (<span>Posted at: {formatDistanceToUTCNow(post.createdAt, { addSuffix: true })}</span>)
                        }
                    </div>
                </div>
                <div className="-mr-1 relative">
                    <button type="button" onClick={() => {
                        if (!show3dotsOpts) {
                            setShow3dotsOpts(true);
                        }
                    }} className="button-icon w-8 h-8">
                        <FaEllipsisH className="text-xl" />
                    </button>
                    {show3dotsOpts && (
                        <OutsideClickHandler onOutsideClick={() => { setShow3dotsOpts(false) }}>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                <ul className="py-1">
                                    {post.isAuthor &&
                                        <>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    postUpdateBoxRef.current.openPostUpdateBox();
                                                    postUpdateBoxRef.current.setPost(post);
                                                    postUpdateBoxRef.current.setUpdatePostUI(updatePostUI);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Update
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => { /* handleDelete */ }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Delete
                                            </button>
                                        </li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </OutsideClickHandler>
                    )}
                </div>
            </div>
            {/* post content */}
            <div className="pt-2 whitespace-pre-line pb-4 px-4">
                <ReadMoreLess
                    charLimit={500} // Limit the number of characters shown initially
                    readMoreText="Read More"
                    readLessText="Shrink"
                >
                    {post.content}
                </ReadMoreLess>
            </div>
            {/* post media */}
            <div className="flex">
                {renderMedia()}
            </div>
            {/* Reactions, Comments, Shares */}
            <div className="px-4 py-2 border-t relative">
                {showReactionDetails && (
                    <div className="reaction-details-modal p-4 border rounded-md bg-white shadow-lg mt-2">
                        <ul className="flex space-x-4">
                            {post.reactionCountsList.map((reaction, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <span>{reactionTypeValue[reaction.reactionType]}</span>
                                    <span>{reaction.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="flex justify-between items-center text-gray-500">
                    <div className="flex items-center space-x-2" onClick={toggleReactionDetails}>
                        {post.reactionCountsList.length > 0 ? post.reactionCountsList.map(cl => {
                            return reactionTypeValue[cl.reactionType]
                        }) : reactionTypeValue[0]}
                        <span>{post.reactionCountsList.reduce((total, reaction) => {
                            return total + reaction.count;
                        }, 0)}</span>
                    </div>
                    <div className="text-sm">
                        <span>{post.commentCount} Comments</span> · <span>7 Shares</span>
                    </div>
                </div>
            </div>

            {/* Các nút Like, Comment, Share */}
            <div className="flex justify-around py-2 border-t">
                <div className="relative"
                    onMouseEnter={() => { setIsLikeHovering(true) }}
                    onMouseLeave={() => { setIsLikeHovering(false) }}>
                    <button className="flex items-center space-x-2" onClick={() => {
                        handleReactionClick(post.viewerReaction ? post.viewerReaction.value : 0)
                    } }>
                        {post.viewerReaction ?
                            <>
                                {reactionTypeValue[post.viewerReaction.value]}
                                <span>{post.viewerReaction.text}</span>
                            </>
                            :
                            <>
                                <FaThumbsUp className="icon-hover" />
                                <span>Like</span>
                            </>
                        }
                    </button>
                    {isLikeHovering && renderReactions()}
                </div>
                <button className="flex items-center space-x-2"
                    onClick={
                        () => {
                            console.log("helloe");
                            setShowCommentSection(prev => !prev);
                        }
                    }>
                    <FaRegCommentDots className="icon-hover" />
                    <span>Comment</span>
                </button>
                <button className="flex items-center space-x-2">
                    <FaShare className="icon-hover"/>
                    <span>Share</span>
                </button>
            </div>
            {showCommentSection && <CommentSection postId={post.id} />}
        </div>
    );
};

export default Post;
