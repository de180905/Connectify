import MainLayout from "./MainLayout"
import { Outlet, Link } from "react-router-dom";
const ChatroomsLayout = () => {
    const mainContent = (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            <div className="relative overflow-hidden border -m-2.5 dark:border-slate-700">
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
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                        <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Jesse Steeve
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Love your photos 😍
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Martin Gray
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
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-3.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                        <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Monroe Parker
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Can i call you to day?
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-4.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                James Lewis
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            {" "}
                                            Want to buy landscape photo? 🌄{" "}
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                        <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Jesse Steeve
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Headshot needed. Resume. Do it? 👩‍💼
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Martin Gray
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                04:20PM
                                            </div>
                                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700" />
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Online course interesting? 🎓
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-3.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Monroe Parker
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            I’m glad you like it.😊
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-4.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                James Lewis
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                01:10PM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            {" "}
                                            Product photographer wanted? 📷{" "}
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                        <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Jesse Steeve
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                09:40AM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Love your photos 😍
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">
                                                Martin Gray
                                            </div>
                                            <div className="text-xs font-light text-gray-500 dark:text-white/70">
                                                02:52PM
                                            </div>
                                        </div>
                                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                                            Photo editor needed. Fix photos? 🛠️
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* overly */}
                        <div
                            id="side-chat"
                            className="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden"
                            uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                        />
                    </div>
                    <Outlet/>
                    
                </div>
            </div>
        </main>

    );
    return (
        <MainLayout mainContent={mainContent}/>
    )
}
export default ChatroomsLayout;
