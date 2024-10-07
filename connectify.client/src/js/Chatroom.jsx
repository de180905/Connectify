import { Link, useParams } from "react-router-dom";
import { loadChatMessages } from "./api/chat";
import * as React from "react";


const Chatroom = ({ chatroom }) => {
    return (
        <Link
            to={`${chatroom.chatRoomId}`}
            state={{ chatroom: chatroom }}
            className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
        >
            <div className="relative w-14 h-14 shrink-0">
                <img
                    src={chatroom.avatar}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                />
                <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">
                        {chatroom.name}
                    </div>
                    <div className="text-xs font-light text-gray-500 dark:text-white/70">
                        09:40AM
                    </div>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700" />
                </div>
                <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                    Photo editor needed. Fix photos? 🛠️
                </div>
            </div>
        </Link>
    );
}
export default Chatroom;