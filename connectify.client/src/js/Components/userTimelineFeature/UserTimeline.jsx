import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "../../Contexts/AppProvider";
import { useEffect } from "react";
import CoverUploader from "../croppedUploaders/CoverUploader";
import AvatarUploader from "../croppedUploaders/AvatarUploader";
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { getUserBasic } from "../../api/search";
import { FaUserPlus, FaUserMinus, FaCheckCircle, FaTimesCircle, FaSearch, FaEllipsisH, FaTags, FaClock, FaFlag, FaShareAlt, FaBan } from "react-icons/fa";
import { respondFriendRequest, revokeFriendRequest, sendFriendRequest, unFriend } from "../../api/Friend";
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
                                <AvatarUploader initialAvatar={user?.avatar} editable={myUser?.id == userId} />
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
                            <p className="mt-2 text-gray-500 dark:text-white/80">
                                {" "}
                                Family , Food , Fashion , Fourever{" "}
                                <a href="#" className="text-blue-500 ml-4 inline-block">
                                    {" "}
                                    Edit{" "}
                                </a>
                            </p>
                            <p className="mt-2 max-w-xl text-sm md:font-normal font-light text-center hidden">
                                {" "}
                                I love beauty and emotion. 🥰 I’m passionate about photography and
                                learning. 📚 I explore genres and styles. 🌈 I think photography is
                                storytelling. 😊
                            </p>
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

                            {/* Search button */}
                            <button type="submit" className="rounded-lg bg-secondary flex px-2.5 py-2 dark:bg-dark2">
                                <FaSearch className="text-xl" />
                            </button>

                            {/* Menu button with dropdown */}
                            <div>
                                <button type="submit" className="rounded-lg bg-secondary flex px-2.5 py-2 dark:bg-dark3">
                                    <FaEllipsisH className="text-xl" />
                                </button>
                                <div
                                    className="w-[240px]"
                                    uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click; offset:10"
                                >
                                    <nav>
                                        <a href="#"><FaTags className="text-xl" /> Unfollow</a>
                                        <a href="#"><FaClock className="text-xl" /> Mute story</a>
                                        <a href="#"><FaFlag className="text-xl" /> Report</a>
                                        <a href="#"><FaShareAlt className="text-xl" /> Share profile</a>
                                        <hr />
                                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                                            onClick={()=>{setIsOpenBlockConfirm(true)}}>
                                            <FaBan className="text-xl" /> Block
                                        </a>
                                    </nav>
                                </div>
                            </div>
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
                            {/* dropdown */}
                            <div>
                                <NavLink
                                    to="#"
                                    className="inline-flex items-center gap-2 py-3 leading-8 px-3"
                                >
                                    More <ion-icon name="chevron-down" />
                                </NavLink>
                                <div
                                    className="md:w-[240px] w-screen"
                                    uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:-4"
                                >
                                    <nav className="text-[15px]">
                                        <NavLink to="/likes"> Likes </NavLink>
                                        <NavLink to="/music"> Music </NavLink>
                                        <NavLink to="/events"> Events </NavLink>
                                        <NavLink to="/books"> Books </NavLink>
                                        <NavLink to="/reviews"> Reviews given </NavLink>
                                        <NavLink to="/groups"> Groups</NavLink>
                                        <NavLink to="/manage-sections"> Manage Sections</NavLink>
                                    </nav>
                                </div>
                            </div>
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