import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { AppContext } from "../../Contexts/AppProvider";
import { TokenService } from "../../api/authen";
import { Link } from 'react-router-dom';
import ChatNotification from "../chatFeature/ChatNotification";
import NotificationList from "../notification/NotificationList";
import { getUnreadNotificationsCount } from "../../api/notificationApi";

const Header = forwardRef(({ chatNotificationRef }, ref) => {
    const { user } = useContext(AppContext);
    const [numberUnReadNotification, setNumberUnreadNotification] = useState(0)
    const [loadNotifications, setLoadNotifications] = useState(0)
    const fetchData = useCallback(async () => {
        try {
            const response = await getUnreadNotificationsCount();
            console.log('number of notification:', response);
            if (response && response.data) {
                setNumberUnreadNotification(response.data.count);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, []);
    useEffect(() => {
        fetchData()
    }, [])
    useImperativeHandle(ref, () => ({
        incrementUnreadNotification() {
            setNumberUnreadNotification(prevCount => prevCount + 1)
            setLoadNotifications(prev => prev + 1)
        }
    }))
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
                        {/* Slogan */}
                        <div
                            id="slogan"
                            className="w-full flex items-center py-4 bg-transparent"
                        >
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide pl-16">
                                Connectify - <span className="text-blue-600">Remake Your Life</span>
                            </h1>
                        </div>

                        {/* header icons */}
                        <div className="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
                            {/* notification */}
                            <button
                                type="button"
                                className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white"
                                uk-tooltip="title: Notification; pos: bottom; offset:6"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 max-sm:hidden"
                                >
                                    <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">
                                    {numberUnReadNotification ? numberUnReadNotification : ''}
                                </div>
                                <ion-icon
                                    name="notifications-outline"
                                    className="sm:hidden text-2xl"
                                />
                            </button>

                            <div
                                className="hidden bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[365px] w-screen border2"
                                uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                            >
                                <NotificationList notificationEvent={loadNotifications} />
                            </div>
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
                                    <Link to="/settings">
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
                                    </Link>
                                    <Link to="/activityHistory">
                                        <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >                                              
                                                <circle cx="3.5" cy="6" r="0.8" fill="currentColor" />
                                                <circle cx="3.5" cy="12" r="0.8" fill="currentColor" />
                                                <circle cx="3.5" cy="18" r="0.8" fill="currentColor" />                                                
                                                <rect x="7" y="5.25" width="13" height="1" fill="currentColor" />
                                                <rect x="7" y="11.25" width="13" height="1" fill="currentColor" />
                                                <rect x="7" y="17.25" width="13" height="1" fill="currentColor" />
                                            </svg>
                                            Activity History
                                        </div>
                                    </Link>
                                    {user?.roles && user.roles.includes("Administrator") && <>
                                        {/* Manage Posts */}
                                        <Link to="/admin/ManagePostReports">
                                            <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <rect x="3" y="4" width="18" height="2" fill="currentColor" />
                                                    <rect x="3" y="11" width="18" height="2" fill="currentColor" />
                                                    <rect x="3" y="18" width="18" height="2" fill="currentColor" />
                                                </svg>
                                                Manage Post Reports
                                            </div>
                                        </Link>

                                        {/* Manage Users */}
                                        <Link to="/admin/ManageUsers">
                                            <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <circle cx="12" cy="8" r="3.5" fill="currentColor" />
                                                    <path
                                                        d="M12 14c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                Manage Users
                                            </div>
                                        </Link>
                                    </>}

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
})
export default Header;

