import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import Chatroom from "./Chatroom";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { loadChatRooms } from "../../api/chat";
import OutsideClickHandler from "react-outside-click-handler";
import NotificationDot from "../notificationFeature/NotificationDot";

const ChatNotification = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [chatroomslist, setChatroomslist] = useState([]);
    const [loadTrigger, setLoadTrigger] = useState({ page: 1, searchTerm: "" });
    const [isLoading, setIsLoading] = useState(false);
    const updateAndMoveChatroomToTop = (updatedChatroom) => {
        setChatroomslist(prevList => {
            const chatroomIndex = prevList.findIndex(cr => cr.chatRoomId == updatedChatroom.chatRoomId);
            if (chatroomIndex > -1) {
                // Remove the old chatroom and add the updated one at the top
                const newList = [
                    updatedChatroom,
                    ...prevList.slice(0, chatroomIndex),
                    ...prevList.slice(chatroomIndex + 1)
                ];
                return newList;
            }
            // If not found, add it at the top of the list
            return [updatedChatroom, ...prevList];

        });
    };
    const updateChatroomHasSeen = (chatRoomId) => {
        setChatroomslist(prevList => {
            return prevList.map(cr => {
                return cr.chatRoomId == chatRoomId ? { ...cr, hasSeen: true } : cr
            });
        });
    };
    const updateChatroom = (updatedChatroom) => {
        setChatroomslist(prevList => {
            return prevList.map(cr => {
                return cr.chatRoomId == updatedChatroom.chatRoomId ? updatedChatroom : cr
            });
        });
    };

    const fetchChatRooms = async () => {
        setIsLoading(true);
        try {
            const chatrooms = await loadChatRooms(loadTrigger.searchTerm, loadTrigger.page, 10);
            if (loadTrigger.page == 1) {
                setChatroomslist(prev => chatrooms);
            } else {
                setChatroomslist((prev) => [...prev, ...chatrooms]);
            }
            if (location.pathname === '/chatrooms') {
                navigate(`/chatrooms/${chatrooms[0].chatRoomId}`);
            }
        }
        catch (error) {
            
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleScroll = (e) => {
        if (isLoading) {
            return;
        }
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight) {
            setLoadTrigger(prev => {
                return { ...prev, page: prev.page + 1 }
            });
        }
    };
    const handleSearchInputChange = (event) => {
        if (isLoading) {
            return;
        }
        setLoadTrigger(prev => {
            return { ...prev, page: 1, searchTerm: event.target.value }
        });
    };
    useEffect(() => {
        fetchChatRooms();
    }, [loadTrigger]);
    useImperativeHandle(ref, () => ({
        updateAndMoveChatroomToTop: updateAndMoveChatroomToTop,
        updateChatroomHasSeen: updateChatroomHasSeen,
        updateChatroom: updateChatroom
    }));
    return (
        <>
            <button
                type="button"
                className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white"
                uk-tooltip="title: Messages; pos: bottom; offset:6"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 max-sm:hidden"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                        clipRule="evenodd"
                    />
                </svg>
                <NotificationDot number={chatroomslist.filter(c => !c.hasSeen).length} />
                <ion-icon name="chatbox-ellipses-outline" className="sm:hidden text-2xl" />
            </button>
            <div
                className="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2"
                uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
            >
                {/* heading */}
                <div className="flex items-center justify-between gap-2 p-4 pb-1">
                    <h3 className="font-bold text-xl"> Chats </h3>
                    <div className="flex gap-2.5 text-lg text-slate-900 dark:text-white">
                        <ion-icon name="expand-outline" />
                        <ion-icon name="create-outline" />
                    </div>
                </div>

                {/* search */}
                <OutsideClickHandler onOutsideClick={() => {
                    if (loadTrigger.searchTerm) {
                        if (isLoading) {
                            return;
                        }
                        setLoadTrigger(prev => {
                            return { ...prev, searchTerm: '' }
                        })
                    }
                }}>
                    <div className="relative w-full p-2 px-3 ">
                        <input
                            value={loadTrigger.searchTerm}
                            type="text"
                            className="w-full !pl-10 !rounded-lg dark:!bg-white/10"
                            placeholder="Search"
                            onChange={handleSearchInputChange}
                        />
                        <ion-icon
                            name="search-outline"
                            className="dark:text-white absolute left-7 -translate-y-1/2 top-1/2"
                        />
                    </div>
                </OutsideClickHandler>

                {/* chatrooms */}
                <div className="h-80 overflow-y-auto pr-2" onScroll={handleScroll}>
                    <div className="p-2 pt-0 pr-1 dark:text-white/80">
                        {chatroomslist.length > 0 ? (
                            chatroomslist.map((cr) => (<Chatroom chatroom={cr} key={cr.chatRoomId} />))
                        ) : (
                            <p className="text-center text-gray-500 mt-4">No chatrooms available</p>
                        )}
                    </div>
                </div>
                {/* footer */}
                <a href="#">
                    <div className="text-center py-4 border-t border-slate-100 text-sm font-medium text-blue-600 dark:text-white dark:border-gray-600">
                        {" "}
                        See all Messages
                    </div>
                </a>
                <div className="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent" />
            </div>
        </>
    )
});
export default ChatNotification;
