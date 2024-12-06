import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "../../Contexts/AppProvider";
import { useEffect } from "react";
import CoverUploader from "../croppedUploaders/CoverUploader";
import AvatarUploader from "../croppedUploaders/AvatarUploader";
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { getUserBasic } from "../../api/search";
import { FaUserPlus, FaEnvelope, FaUserMinus, FaCheckCircle, FaTimesCircle, FaSearch, FaEllipsisH, FaTags, FaClock, FaFlag, FaShareAlt, FaBan } from "react-icons/fa";
import { respondFriendRequest, revokeFriendRequest, sendFriendRequest, unFriend } from "../../api/Friend";
import { getOrCreatePrivateChatRoom } from "../../api/chat";
import { uploadAvatar } from "../../api/authen";
import BlockUserConfirmForm from "../block/BlockUserConfirmForm";



const UserTimeline = () => {
    const { user: myUser } = useContext(AppContext);
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isOpenBlockConfirm, setIsOpenBlockConfirm]=useState(false)

    //ham dong block user 
    const handleCloseComfirmBlockUser = useCallback(()=>{
        setIsOpenBlockConfirm(false)
    }, [])
    const navigate = useNavigate();
    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getUserBasic(userId);
                setUser(result);
            } catch(error){
                console.log(error);
            }
        };
        getUser();
    }, [userId]);
    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
            style={{marginTop: '13vh'} }
        >
            <div className="max-w-[1065px] mx-auto max-lg:-m-2.5">
                {/* cover  */}
                <div className="bg-white shadow lg:rounded-b-2xl lg:-mt-10 dark:bg-dark2">
                    {/* cover */}
                    <CoverUploader initialImg={user?.profileCover} editable={myUser?.id == userId} />
                    {/* user info */}
                    <div className="p-3">
                        <div className="flex flex-col justify-center md:items-center lg:-mt-48 -mt-28">
                            <div className="relative lg:h-48 lg:w-48 w-28 h-28 mb-4 z-10">
                                <div className="relative rounded-full md:border-[6px] border-gray-100 dark:border-slate-900 shadow aspect-square">
                                    <AvatarUploader initialAvatar={user?.avatar} editable={myUser?.id == userId}
                                        uploadFunc={uploadAvatar} />
                                </div>
                                <button
                                    type="button"
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"
                                >
                                    {" "}
                                    <ion-icon
                                        name="camera"
                                        className="text-2xl md hydrated"
                                        role="img"
                                        aria-label="camera"
                                    />
                                </button>
                            </div>
                            <h3 className="md:text-3xl text-base font-bold text-black dark:text-white">
                                {" "}
                                {user?.fullName} {" "}
                            </h3>
                        </div>
                    </div>
                    {/* navigations */}
                    <div
                        className="flex items-center justify-between mt-3 border-t border-gray-100 px-2 max-lg:flex-col dark:border-slate-700"
                        uk-sticky="offset:50; cls-active: bg-white/80 shadow rounded-b-2xl z-50 backdrop-blur-xl dark:!bg-slate-700/80; animation:uk-animation-slide-top ; media: 992"
                    >
                        <div className="flex items-center gap-2 text-sm py-2 pr-1 max-md:w-full lg:order-2">
                            {/* Conditional rendering for friend request states */}
                            {user?.userP2PStatus === 0 && (
                                <button className="button bg-primary flex items-center gap-2 text-white py-2 px-3.5 max-md:flex-1"
                                    onClick={async () => {
                                       const res = await sendFriendRequest(userId);
                                        if (res) {
                                            setUser(prev => { return { ...prev, userP2PStatus: 1 } })
                                        }
                                    }}>
                                    <FaUserPlus className="text-xl" />
                                    <span className="text-sm"> Add Friend</span>
                                </button>
                            )}

                            {user?.userP2PStatus === 1 && (
                                <button className="button bg-secondary flex items-center gap-2 text-white py-2 px-3.5 max-md:flex-1"
                                    onClick={async () => {
                                        const res = await revokeFriendRequest(userId);
                                        if (res) {
                                            setUser(prev => { return { ...prev, userP2PStatus: 0 } })
                                        }
                                    }}>
                                    <FaUserMinus className="text-xl" />
                                    <span className="text-sm"> Cancel Request</span>
                                </button>
                            )}

                            {user?.userP2PStatus === 2 && (
                                <div className="flex gap-2">
                                    <button className="button bg-success flex items-center gap-2 text-white py-2 px-3.5 max-md:flex-1"
                                        onClick={async () => {
                                            const res = await respondFriendRequest(userId, 1);
                                        if (res) {
                                            setUser(prev => { return { ...prev, userP2PStatus: 3 } })
                                        }
                                    }}>
                                        <FaCheckCircle className="text-xl" />
                                        <span className="text-sm"> Accept</span>
                                    </button>
                                    <button className="button bg-danger flex items-center gap-2 text-white py-2 px-3.5 max-md:flex-1"
                                        onClick={async () => {
                                            const res = await respondFriendRequest(userId, 2);
                                            if (res) {
                                                setUser(prev => { return { ...prev, userP2PStatus: 0 } })
                                            }
                                        }}>
                                        <FaTimesCircle className="text-xl" />
                                        <span className="text-sm"> Decline</span>
                                    </button>
                                </div>
                            )}

                            {user?.userP2PStatus === 3 && (
                                <button className="button bg-danger flex items-center gap-2 text-white py-2 px-3.5 max-md:flex-1"
                                    onClick={async () => {
                                        const res = await unFriend(userId);
                                        if (res) {
                                            setUser(prev => { return { ...prev, userP2PStatus: 0 } })
                                        }
                                    }}>
                                    <FaUserMinus className="text-xl" />
                                    <span className="text-sm"> Unfriend</span>
                                </button>
                            )}

                            {/* Message button */}
                            {myUser.id != userId && <button className="rounded-lg bg-secondary flex px-2.5 py-2 dark:bg-dark2"
                                onClick={async () => {
                                    try {
                                        const chatroomId = await getOrCreatePrivateChatRoom(userId);
                                        navigate(`/chatrooms/${chatroomId}`);
                                    }
                                    catch (error) {
                                        window.alert("error occured, please try again");
                                    }
                                }}
                            >
                                <FaEnvelope className="text-xl text-white" />
                            </button>}
                        </div>

                        <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
                            <NavLink
                                to=""
                                end
                                className={({ isActive }) =>
                                    `inline-block py-3 leading-8 px-3.5 ${isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`
                                }
                            >
                                Timeline
                            </NavLink>
                            <NavLink
                                to="friends"
                                className={({ isActive }) =>
                                    `inline-block py-3 leading-8 px-3.5 ${isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`
                                }
                            >
                                Friends{" "}
                            </NavLink>
                            <NavLink
                                to="photos"
                                end
                                className={({ isActive }) =>
                                    `inline-block py-3 leading-8 px-3.5 ${isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`
                                }
                            >
                                Photos
                            </NavLink>
                        </nav>
                    </div>
                </div>
                <div
                    className="flex 2xl:gap-12 gap-10 mt-8 max-lg:flex-col"
                    id="js-oversized"
                >
                    <Outlet/>

                </div>
            </div>
            {/*Block confirm component */}
            {isOpenBlockConfirm && <BlockUserConfirmForm user={user} onCloseBlockUserCofirm={handleCloseComfirmBlockUser}/>}
        </main>
    )
}
export default UserTimeline;