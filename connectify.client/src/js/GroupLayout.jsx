import MainLayout from "./MainLayout"
import { Outlet, Link } from "react-router-dom";
const GroupLayout = () => {
    const mainContent = (
        <Outlet/>
    );
    const subContent = (
        <div>
            <button
                type="button"
                className="sm:m-10 m-5 px-4 py-2.5 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow fixed bottom-0 right-0 group flex items-center gap-2"
            >
                <svg
                    className="w-6 h-6 group-aria-expanded:hidden duration-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                </svg>
                <div className="text-base font-semibold max-sm:hidden"> Chat </div>
                <svg
                    className="w-6 h-6 -mr-1 hidden group-aria-expanded:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className="bg-white rounded-xl drop-shadow-xl  sm:w-80 w-screen border-t dark:bg-dark3 dark:border-slate-600"
                id="chat__box"
                uk-drop="offset:10;pos: bottom-right; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-right; mode: click"
            >
                <div className="relative">
                    <div className="p-5">
                        <h1 className="text-lg font-bold text-black"> Chats </h1>
                    </div>
                    {/* search input defaul is hidden */}
                    <div
                        className="bg-white p-3 absolute w-full top-11 border-b flex gap-2 hidden dark:border-slate-600 dark:bg-slate-700 z-10"
                        uk-scrollspy="cls:uk-animation-slide-bottom-small ; repeat: true; duration:0"
                        id="search__chat"
                    >
                        <div className="relative w-full">
                            <input
                                type="text"
                                className="w-full rounded-3xl dark:!bg-white/10"
                                placeholder="Search"
                            />
                            <button
                                type="button"
                                className="absolute  right-0  rounded-full shrink-0 px-2 -translate-y-1/2 top-1/2"
                                uk-toggle="target: #search__chat ; cls: hidden"
                            >
                                <ion-icon name="close-outline" className="text-xl flex" />
                            </button>
                        </div>
                    </div>
                    {/* button actions */}
                    <div className="absolute top-0 -right-1 m-5 flex gap-2 text-xl">
                        <button uk-toggle="target: #search__chat ; cls: hidden">
                            <ion-icon name="search-outline" />
                        </button>
                        <button uk-toggle="target: #chat__box ; cls: uk-open">
                            <ion-icon name="close-outline" />
                        </button>
                    </div>
                    {/* tabs */}
                    <div className="page-heading bg-slat e-50 ">
                        <nav className="nav__underline -mt-7 px-5">
                            <ul
                                className="group"
                                uk-switcher="connect: #chat__tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                            >
                                <li>
                                    {" "}
                                    <a
                                        href="#"
                                        className="inline-block py-[18px] border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                                    >
                                        {" "}
                                        Friends
                                    </a>{" "}
                                </li>
                                <li>
                                    {" "}
                                    <a href="#"> Groups </a>{" "}
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* tab 2 optional */}
                    <div
                        className="grid grid-cols-2 px-3 py-2 bg-slate-50  -mt-12 relative z-10 text-sm border-b  hidden"
                        uk-switcher="connect: #chat__tabs; toggle: * > button ; animation: uk-animation-slide-right uk-animation-slide-top"
                    >
                        <button className="bg-white shadow rounded-md py-1.5"> Friends </button>
                        <button> Groups </button>
                    </div>
                    {/* chat list */}
                    <div
                        className="uk-switcher overflow-hidden rounded-xl -mt-8"
                        id="chat__tabs"
                    >
                        {/* tab list 1 */}
                        <div className="space-y -m t-5 p-3 text-sm font-medium h-[280px] overflow-y-auto">
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-1.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Jesse Steeve </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> John Michael </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Monroe Parker </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> James Lewis </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-4.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Martin Gray </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Alexa stella </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-1.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Jesse Steeve </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> John Michael </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Monroe Parker </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> James Lewis </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-4.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Martin Gray </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Alexa stella </div>
                                </div>
                            </a>
                        </div>
                        {/* tab list 2 */}
                        <div className="space-y -m t-5 p-3 text-sm font-medium h-[280px] overflow-y-auto">
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-1.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Jesse Steeve </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> John Michael </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Monroe Parker </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> James Lewis </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-4.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Martin Gray </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Alexa stella </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-1.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Jesse Steeve </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> John Michael </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Monroe Parker </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> James Lewis </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-4.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Martin Gray </div>
                                </div>
                            </a>
                            <a href="#" className="block">
                                <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="w-7 rounded-full"
                                    />
                                    <div> Alexa stella </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-3.5 h-3.5 absolute -bottom-2 right-5 bg-white rotate-45 dark:bg-dark3" />
            </div>
        </div>

    );
    return (
        <MainLayout mainContent={mainContent} subContent={subContent} />
    )
}
export default GroupLayout;