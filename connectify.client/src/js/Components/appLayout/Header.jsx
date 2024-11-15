import { useContext } from "react";
import { AppContext } from "../../Contexts/AppProvider";
import { TokenService } from "../../api/authen";
import { Link } from 'react-router-dom';
import Notification from "../notificationFeature/Notification";
import ChatNotification from "../chatFeature/ChatNotification";
const Header = ({ chatNotificationRef, NotificationRef }) => {
    const { user } = useContext(AppContext);
    return (
        <header className="z-[100] h-[--m-top] fixed top-0 left-0 w-full flex items-center bg-white/80 sky-50 backdrop-blur-xl border-b border-slate-200 dark:bg-dark2 dark:border-slate-800">
            <div className="flex items-center w-full xl:px-6 px-2 max-lg:gap-10">
                <div className="2xl:w-[--w-side] lg:w-[--w-side-sm]">
                    {/* left */}
                    <div className="flex items-center gap-1">
                        {/* icon menu */}
                        <button
                            uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
                            className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden dark:hover:bg-slate-600 group"
                        >
                            <ion-icon
                                name="menu-outline"
                                className="text-2xl group-aria-expanded:hidden"
                            />
                            <ion-icon
                                name="close-outline"
                                className="hidden text-2xl group-aria-expanded:block"
                            />
                        </button>
                        <div id="logo">
                            <Link to="/">
                                <img
                                    src="assets/images/connectifyLogo.png"
                                    alt=""
                                    className="w-28 md:block hidden dark:!hidden"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="max-w-[1220px] mx-auto flex items-center">
                        {/* search */}
                        <div
                            id="search--box"
                            className="xl:w-[680px] sm:w-96 sm:relative rounded-xl overflow-hidden z-20 bg-secondery max-md:hidden w-screen left-0 max-sm:fixed max-sm:top-2 dark:!bg-white/5"
                        >
                            <ion-icon
                                name="search"
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder="Search Friends, videos .."
                                className="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm"
                            />
                        </div>
                        {/* search dropdown*/}
                        <div
                            className="hidden uk- open z-10"
                            uk-drop="pos: bottom-center ; animation: uk-animation-slide-bottom-small;mode:click "
                        >
                            <div className="xl:w-[694px] sm:w-96 bg-white dark:bg-dark3 w-screen p-2 rounded-lg shadow-lg -mt-14 pt-14">
                                <div className="flex justify-between px-2 py-2.5 text-sm font-medium">
                                    <div className=" text-black dark:text-white">Recent</div>
                                    <button type="button" className="text-blue-500">
                                        Clear
                                    </button>
                                </div>
                                <nav className="text-sm font-medium text-black dark:text-white">
                                    <a
                                        href="#"
                                        className=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            className="w-9 h-9 rounded-full"
                                        />{" "}
                                        <div>
                                            {" "}
                                            <div> Jesse Steeve </div>{" "}
                                            <div className="text-xs text-blue-500 font-medium mt-0.5">
                                                {" "}
                                                Friend{" "}
                                            </div>{" "}
                                        </div>{" "}
                                        <ion-icon
                                            name="close"
                                            className="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            className="w-9 h-9 rounded-full"
                                        />{" "}
                                        <div>
                                            {" "}
                                            <div> Martin Gray </div>{" "}
                                            <div className="text-xs text-blue-500 font-medium mt-0.5">
                                                {" "}
                                                Friend{" "}
                                            </div>{" "}
                                        </div>{" "}
                                        <ion-icon
                                            name="close"
                                            className="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <img
                                            src="assets/images/group/group-2.jpg"
                                            className="w-9 h-9 rounded-full"
                                        />{" "}
                                        <div>
                                            {" "}
                                            <div> Delicious Foods</div>{" "}
                                            <div className="text-xs text-rose-500 font-medium mt-0.5">
                                                {" "}
                                                Group{" "}
                                            </div>{" "}
                                        </div>{" "}
                                        <ion-icon
                                            name="close"
                                            className="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <img
                                            src="assets/images/group/group-1.jpg"
                                            className="w-9 h-9 rounded-full"
                                        />{" "}
                                        <div>
                                            {" "}
                                            <div> Delicious Foods</div>{" "}
                                            <div className="text-xs text-yellow-500 font-medium mt-0.5">
                                                {" "}
                                                Page{" "}
                                            </div>{" "}
                                        </div>{" "}
                                        <ion-icon
                                            name="close"
                                            className="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-6.jpg"
                                            className="w-9 h-9 rounded-full"
                                        />{" "}
                                        <div>
                                            {" "}
                                            <div> John Welim </div>{" "}
                                            <div className="text-xs text-blue-500 font-medium mt-0.5">
                                                {" "}
                                                Friend{" "}
                                            </div>{" "}
                                        </div>{" "}
                                        <ion-icon
                                            name="close"
                                            className="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="hidden relative  px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <ion-icon className="text-2xl" name="search-outline" /> Creative
                                        ideas about Business
                                    </a>
                                    <a
                                        href="#"
                                        className="hidden relative  px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                                    >
                                        {" "}
                                        <ion-icon className="text-2xl" name="search-outline" /> 8 Facts
                                        About Writting
                                    </a>
                                </nav>
                                <hr className="-mx-2 mt-2 hidden" />
                                <div className="flex justify-end pr-2 text-sm font-medium text-red-500 hidden">
                                    <a
                                        href="#"
                                        className="flex hover:bg-red-50 dark:hover:bg-slate-700 p-1.5 rounded"
                                    >
                                        {" "}
                                        <ion-icon name="trash" className="mr-2 text-lg" /> Clear your
                                        history
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* header icons */}
                        <div className="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
                            {/* create */}
                            <button
                                type="button"
                                className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 max-sm:hidden"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <ion-icon
                                    name="add-circle-outline"
                                    className="sm:hidden text-2xl "
                                />
                            </button>
                            <div
                                className="hidden bg-white p-4 rounded-lg overflow-hidden drop-shadow-xl dark:bg-slate-700 md:w-[324px] w-screen border2"
                                uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                            >
                                <h3 className="font-bold text-md"> Create</h3>
                                {/* slider */}
                                <div
                                    className="mt-4"
                                    tabIndex={-1}
                                    uk-slider="finite:true;sets: true"
                                >
                                    <div className="uk-slider-container pb-1">
                                        <ul
                                            className="uk-slider-items grid-small"
                                            uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-right-small; delay: 20 ;repeat: true"
                                        >
                                            <li className="w-28" uk-scrollspy-class="uk-animation-fade">
                                                <div className="p-3 px-4 rounded-lg bg-teal-100/60 text-teal-600 dark:text-white dark:bg-dark4">
                                                    <ion-icon
                                                        name="book"
                                                        className="text-2xl drop-shadow-md"
                                                    />
                                                    <div className="mt-1.5 text-sm font-medium"> Story </div>
                                                </div>
                                            </li>
                                            <li className="w-28">
                                                <div className="p-3 px-4 rounded-lg bg-sky-100/60 text-sky-600 dark:text-white dark:bg-dark4">
                                                    <ion-icon
                                                        name="camera"
                                                        className="text-2xl drop-shadow-md"
                                                    />
                                                    <div className="mt-1.5 text-sm font-medium"> Post </div>
                                                </div>
                                            </li>
                                            <li className="w-28">
                                                <div className="p-3 px-4 rounded-lg bg-purple-100/60 text-purple-600 dark:text-white dark:bg-dark4">
                                                    <ion-icon
                                                        name="videocam"
                                                        className="text-2xl drop-shadow-md"
                                                    />
                                                    <div className="mt-1.5 text-sm font-medium"> Reel </div>
                                                </div>
                                            </li>
                                            <li className="w-28">
                                                <div className="p-3 px-4 rounded-lg bg-pink-100/60 text-pink-600 dark:text-white dark:bg-dark4">
                                                    <ion-icon
                                                        name="location"
                                                        className="text-2xl drop-shadow-md"
                                                    />
                                                    <div className="mt-1.5 text-sm font-medium">
                                                        {" "}
                                                        location{" "}
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="w-28">
                                                <div className="p-3 px-4 rounded-lg bg-sky-100/70 text-sky-600 dark:text-white dark:bg-dark4">
                                                    <ion-icon
                                                        name="happy"
                                                        className="text-2xl  drop-shadow-md"
                                                    />
                                                    <div className="mt-1.5 text-sm font-medium"> Status </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* slide nav icons */}
                                    <div className="dark:hidden">
                                        <a
                                            className="absolute -translate-y-1/2 top-1/2 -left-4 flex items-center w-8 h-full px-1.5 justify-start bg-gradient-to-r from-white via-white dark:from-slate-600 dark:via-slate-500 dark:from-transparent dark:via-transparent"
                                            href="#"
                                            uk-slider-item="previous"
                                        >
                                            {" "}
                                            <ion-icon
                                                name="chevron-back"
                                                className="text-xl dark:text-white"
                                            />{" "}
                                        </a>
                                        <a
                                            className="absolute -translate-y-1/2 top-1/2 -right-4 flex items-center w-8 h-full px-1.5 justify-end bg-gradient-to-l from-white via-white dark:from-transparent dark:via-transparent"
                                            href="#"
                                            uk-slider-item="next"
                                        >
                                            {" "}
                                            <ion-icon
                                                name="chevron-forward"
                                                className="text-xl dark:text-white"
                                            />{" "}
                                        </a>
                                    </div>
                                    {/* slide nav */}
                                    <div className="justify-center mt-2 -mb-2 hidden dark:flex">
                                        <ul className="inline-flex flex-wrap justify-center gap-1 uk-dotnav uk-slider-nav">
                                            {" "}
                                        </ul>
                                    </div>
                                </div>
                                {/* list */}
                                <ul
                                    className="-m-1 mt-4 pb-1 text-xs text-gray-500 dark:text-white"
                                    uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-bottom-small ;repeat: true"
                                >
                                    <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                                        <img
                                            src="assets/images/icons/group.png"
                                            alt=""
                                            className="w-7"
                                        />
                                        <div className="flex-1">
                                            <a href="timeline.html">
                                                <h4 className="font-medium text-sm text-black dark:text-white">
                                                    {" "}
                                                    Groups{" "}
                                                </h4>
                                            </a>
                                            <div className="mt-1 text-xs text-gray-500 dark:text-white">
                                                {" "}
                                                Meet people with similar interests.{" "}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                                        <img
                                            src="assets/images/icons/page.png"
                                            alt=""
                                            className="w-7"
                                        />
                                        <div className="flex-1">
                                            <a href="timeline.html">
                                                <h4 className="font-medium text-sm text-black dark:text-white">
                                                    {" "}
                                                    Pages{" "}
                                                </h4>
                                            </a>
                                            <div className="mt-1"> Find and connect with businesses.</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                                        <img src="assets/images/icons/event.png" className="w-7" />
                                        <div className="flex-1">
                                            <a href="timeline.html">
                                                <h4 className="font-medium text-sm text-black dark:text-white">
                                                    {" "}
                                                    Event{" "}
                                                </h4>
                                            </a>
                                            <div className="mt-1">Discover fun activities near you .</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                                        <img
                                            src="assets/images/icons/market.png"
                                            className="w-8 -ml-1"
                                        />
                                        <div className="flex-1">
                                            <a href="timeline.html">
                                                <h4 className="font-medium text-sm text-black dark:text-white">
                                                    {" "}
                                                    Event{" "}
                                                </h4>
                                            </a>
                                            <div className="mt-1">Find local buyers and sellers .</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                                        <img
                                            src="assets/images/icons/game.png"
                                            alt=""
                                            className="w-7"
                                        />
                                        <div className="flex-1">
                                            <a href="timeline.html">
                                                <h4 className="font-medium text-sm text-black dark:text-white">
                                                    {" "}
                                                    Games{" "}
                                                </h4>
                                            </a>
                                            <div className="mt-1"> play game with friends have fun. </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* notification */}
                            <Notification/>
                            {/* messages */}
                            <ChatNotification ref={chatNotificationRef} />
                            {/* profile */}
                            <div className="rounded-full relative bg-secondery cursor-pointer shrink-0">
                                <img
                                    src={user?.avatar}
                                    alt=""
                                    className="sm:w-9 sm:h-9 w-7 h-7 rounded-full shadow shrink-0"
                                /> 
                            </div>
                            <div
                                className="hidden bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 w-64 border2"
                                uk-drop="offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                            >
                                <Link to={`/${user?.id}`}>
                                    <div className="p-4 py-5 flex items-center gap-4">
                                        <img
                                            src={user?.avatar}
                                            alt=""
                                            className="w-10 h-10 rounded-full shadow"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-black">
                                                {user?.fullName}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                                <hr className="dark:border-gray-600/60" />
                                <nav className="p-2 text-sm text-black font-normal dark:text-white">
                                    <a href="setting.html">
                                        <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                                />
                                            </svg>
                                            My Billing
                                        </div>
                                    </a>
                                    <a href="/settings">
                                        <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            My Account
                                        </div>
                                    </a>
                                    <hr className="-mx-2 my-2 dark:border-gray-600/60" />
                                    <button onClick={TokenService.logout}>
                                        <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                            <svg
                                                className="w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Log Out
                                        </div>
                                    </button>
                                </nav>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}
export default Header;

