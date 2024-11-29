import {Link, NavLink} from 'react-router-dom';
const Sidebar = () => {
    return (
        <div
            id="site__sidebar"
            className="fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full"
        >
            {/* sidebar inner */}
            <div className="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
                <div className="pr-4" data-simplebar="">
                    <nav id="side">
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `inline-block py-3 leading-8 px-3.5 ${isActive ? 'bg-gray-200 text-blue-600' : 'bg-transparent text-gray-600'}`
                                    }
                                >
                                    <img
                                        src="assets/images/icons/home.png"
                                        alt="feeds"
                                        className="w-6"
                                    />
                                    <span> Feed </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/chatrooms"
                                    className={({ isActive }) =>
                                        `inline-block py-3 leading-8 px-3.5 ${isActive ? 'bg-gray-200 text-blue-600' : 'bg-transparent text-gray-600'}`
                                    }
                                >
                                    <img
                                        src="assets/images/icons/message.png"
                                        alt="messages"
                                        className="w-5"
                                    />
                                    <span> messages </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/people"
                                    end
                                    className={({ isActive }) =>
                                        `inline-block py-3 leading-8 px-3.5 ${isActive ? 'bg-gray-200 text-blue-600' : 'bg-transparent text-gray-600'}`
                                    }
                                >
                                    <img
                                        src="assets/images/icons/page.png"
                                        alt="pages"
                                        className="w-6"
                                    />
                                    <span> People </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/groups"
                                    end
                                    className={({ isActive }) =>
                                        `inline-block py-3 leading-8 px-3.5 ${isActive ? 'bg-gray-200 text-blue-600' : 'bg-transparent text-gray-600'}`
                                    }
                                >
                                    <img
                                        src="assets/images/icons/group.png"
                                        alt="groups"
                                        className="w-6"
                                    />
                                    <span> Groups </span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800">
                        <div className="px-3 pb-2 text-sm font-medium">
                            <div className="text-black dark:text-white">Shortcut</div>
                        </div>
                        <a href="#">
                            <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                                <img
                                    src="assets/images/avatars/avatar-2.jpg"
                                    alt=""
                                    className="w-6 rounded-full object-cover"
                                />
                                <div> Marin Gray</div>
                            </div>
                        </a>
                        <a href="#">
                            <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                                <img
                                    src="assets/images/avatars/avatar-7.jpg"
                                    alt=""
                                    className="w-6 rounded-full object-cover"
                                />
                                <div> Alexa Stella</div>
                            </div>
                        </a>
                        <a href="#">
                            <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                                <img
                                    src="assets/images/avatars/avatar-3.jpg"
                                    alt=""
                                    className="w-6 rounded-full object-cover"
                                />
                                <div> Sarah Ali</div>
                            </div>
                        </a>
                    </div>
                    <nav
                        id="side"
                        className="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800"
                    >
                        <div className="px-3 pb-2 text-sm font-medium">
                            <div className="text-black dark:text-white">Pages</div>
                        </div>
                        <ul className="mt-2 -space-y-2" uk-nav="multiple: true">
                            <li>
                                <a href="setting.html">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
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
                                    <span> Setting </span>
                                </a>
                            </li>
                            <li>
                                <a href="upgrade.html">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                        />
                                    </svg>
                                    <span> Upgrade </span>
                                </a>
                            </li>
                            <li>
                                <a href="form-login.html">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                        />
                                    </svg>
                                    <span> Authentication </span>
                                </a>
                            </li>
                            <li className="uk-parent">
                                <a href="#" className="group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                        />
                                    </svg>
                                    <span> Development </span>
                                    <ion-icon
                                        name="chevron-down"
                                        className="text-base ml-auto duration-200 group-aria-expanded:rotate-180"
                                    />
                                </a>
                                <ul className="pl-10 my-1 space-y-0 text-sm">
                                    <li>
                                        <a href="components.html" className="!py-2 !rounded -md">
                                            Elements
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components.html" className="!py-2 !rounded -md">
                                            Components
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components.html" className="!py-2 !rounded -md">
                                            Icons
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <div className="text-xs font-medium flex flex-wrap gap-2 gap-y-0.5 p-2 mt-2">
                        <a href="#" className="hover:underline">
                            About
                        </a>
                        <a href="#" className="hover:underline">
                            Blog{" "}
                        </a>
                        <a href="#" className="hover:underline">
                            Careers
                        </a>
                        <a href="#" className="hover:underline">
                            Support
                        </a>
                        <a href="#" className="hover:underline">
                            Contact Us{" "}
                        </a>
                        <a href="#" className="hover:underline">
                            Developer
                        </a>
                    </div>
                </div>
            </div>
            {/* sidebar overly */}
            <div
                id="site__sidebar__overly"
                className="absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm"
                uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
            ></div>
        </div>

    );
}
export default Sidebar;