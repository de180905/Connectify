import * as React from "react";
import Chatroom from "./Chatroom";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { loadChatRooms } from "../../api/chat";
import OutsideClickHandler from "react-outside-click-handler";

const ChatroomsLayout = React.forwardRef((props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [chatroomslist, setChatroomslist] = React.useState([]);
    const [loadTrigger, setLoadTrigger] = React.useState({ page: 1, searchTerm: "" });
    const [isLoading, setIsLoading] = React.useState(false);
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
    React.useEffect(() => {
        fetchChatRooms();
    }, [loadTrigger]);
    React.useImperativeHandle(ref, () => ({
        updateAndMoveChatroomToTop: updateAndMoveChatroomToTop,
        updateChatroomHasSeen: updateChatroomHasSeen,
        updateChatroom: updateChatroom
    }));
    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            <div className="relative overflow-hidden border -m-2.5 dark:border-slate-700" >
                <div className="flex bg-white dark:bg-dark2">
                    {/* sidebar */}
                    <div className="md:w-[360px] relative border-r dark:border-slate-700">
                        <div
                            id="side-chat"
                            className="top-0 left-0 max-md:fixed max-md:w-5/6 max-md:h-screen bg-white z-50 max-md:shadow max-md:-translate-x-full dark:bg-dark2"
                        >
                            {/* heading title */}
                            <div className="p-4 border-b dark:border-slate-700">
                                <div className="flex mt-2 items-center justify-between">
                                    <h2 className="text-2xl font-bold text-black ml-1 dark:text-white">
                                        {" "}
                                        Chats{" "}
                                    </h2>
                                    {/* right action buttons */}
                                    <div className="flex items-center gap-2.5">
                                        <button className="group">
                                            <ion-icon
                                                name="settings-outline"
                                                className="text-2xl flex group-aria-expanded:rotate-180"
                                            />
                                        </button>
                                        <div
                                            className="md:w-[270px] w-full"
                                            uk-dropdown="pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small"
                                        >
                                            <nav>
                                                <a href="#">
                                                    {" "}
                                                    <ion-icon
                                                        className="text-2xl shrink-0 -ml-1"
                                                        name="checkmark-outline"
                                                    />{" "}
                                                    Mark all as read{" "}
                                                </a>
                                                <a href="#">
                                                    {" "}
                                                    <ion-icon
                                                        className="text-2xl shrink-0 -ml-1"
                                                        name="notifications-outline"
                                                    />{" "}
                                                    notifications setting{" "}
                                                </a>
                                                <a href="#">
                                                    {" "}
                                                    <ion-icon
                                                        className="text-xl shrink-0 -ml-1"
                                                        name="volume-mute-outline"
                                                    />{" "}
                                                    Mute notifications{" "}
                                                </a>
                                            </nav>
                                        </div>
                                        <button className="">
                                            <ion-icon
                                                name="checkmark-circle-outline"
                                                className="text-2xl flex"
                                            />
                                        </button>
                                        {/* mobile toggle menu */}
                                        <button
                                            type="button"
                                            className="md:hidden"
                                            uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                                        >
                                            <ion-icon name="chevron-down-outline" />
                                        </button>
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
                                    <div className="relative mt-4">
                                        <div className="absolute left-3 bottom-1/2 translate-y-1/2 flex">

                                        </div>
                                        <input
                                            value={loadTrigger.searchTerm}
                                            type="text"
                                            placeholder="Search"
                                            className="w-full !pl-10 !py-2 !rounded-lg"
                                            onChange={handleSearchInputChange}
                                        />
                                    </div>
                                </OutsideClickHandler>

                            </div>
                            {/* users list */}
                            <div className="space-y-2 p-2 overflow-y-auto md:h-[calc(100vh-204px)] h-[calc(100vh-130px)]"
                                onScroll={handleScroll}>
                                {chatroomslist.length > 0 ? (
                                    chatroomslist.map((cr) => (<Chatroom chatroom={cr} key={cr.chatRoomId} />))
                                ) : (
                                    <p className="text-center text-gray-500 mt-4">No chatrooms available</p>
                                )}
                            </div>
                        </div>
                        {/* overly */}
                        <div
                            id="side-chat"
                            className="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden"
                            uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                        />
                    </div>
                    <Outlet context={{updateChatroomHasSeen}} />

                </div>
            </div>
        </main>
    )
})
export default ChatroomsLayout;
