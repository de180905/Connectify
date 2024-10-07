import * as React from "react";
import Chatroom from "./Chatroom";
import MainLayout from "./MainLayout"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { loadChatRooms } from "./api/chat";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ChatroomsLayout = () => {
    const [chatroomslist, setChatroomslist] = React.useState([]);
    React.useEffect(() => {
        loadChatRooms().then((chatrooms) => {
            setChatroomslist(chatrooms);
        });
    }, []);
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
                                <div className="relative mt-4">
                                    <div className="absolute left-3 bottom-1/2 translate-y-1/2 flex">
                                        <ion-icon name="search" className="text-xl" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full !pl-10 !py-2 !rounded-lg"
                                    />
                                </div>
                            </div>
                            {/* users list */}
                            <div className="space-y-2 p-2 overflow-y-auto md:h-[calc(100vh-204px)] h-[calc(100vh-130px)]">
                                {chatroomslist.map((cr) => (<Chatroom chatroom={cr} key={cr.chatRoomId} />))}

                            </div>
                        </div>
                        {/* overly */}
                        <div
                            id="side-chat"
                            className="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden"
                            uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                        />
                    </div>
                    <Outlet />

                </div>
            </div>
        </main>
    )
}
export default ChatroomsLayout;
