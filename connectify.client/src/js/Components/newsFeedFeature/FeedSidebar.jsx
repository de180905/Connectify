import {Link} from "react-router-dom"
import PeopleCard from "../peopleFeature/PeopleCard";
import { useEffect, useState } from "react";
import { getFriendsOfFriends } from "../../api/search";
const FeedSidebar = () => {
    const [peopleSuggest, setPeopleSuggest] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const users = await getFriendsOfFriends();
                console.log(users);
                setPeopleSuggest(users);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [])
    return (
        <div className="flex-1" >
            <div
                className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
            >
                <div className="box p-5 px-6">
                    <div className="flex items-baseline justify-between text-black dark:text-white">
                        <h3 className="font-bold text-base"> People you may know </h3>
                        <Link to="/People" className="text-sm text-blue-500">
                            See all
                        </Link>
                    </div>
                    <div className="side-list">

                        {peopleSuggest.map((user) => (
                            <div className="side-list-item">
                                <Link to={"/" + user.id}>
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="side-list-image rounded-full"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link to={"/" + user.id}>
                                        <h4 className="side-list-title"> {user.fullName} </h4>
                                    </Link>
                                    <div className="side-list-info">{user.mutualFriendsCount} mutual friends</div>
                                </div>
                                <Link to={"/"+user.id} className="button bg-primary-soft text-primary dark:text-white">
                                    Details
                                </Link>
                            </div>
                        ))}

                        <button className="bg-secondery button w-full mt-2 hidden">
                            See all
                        </button>
                    </div>
                </div>

                {/* latest marketplace items */}
                <div className="box p-5 px-6 border1 dark:bg-dark2">
                    <div className="flex justify-between text-black dark:text-white">
                        <h3 className="font-bold text-base"> Premium Photos </h3>
                        <button type="button">
                            {" "}
                            <ion-icon name="sync-outline" className="text-xl" />{" "}
                        </button>
                    </div>
                    <div
                        className="relative capitalize font-medium text-sm text-center mt-4 mb-2"
                        tabIndex={-1}
                        uk-slider="autoplay: true;finite: true"
                    >
                        <div className="overflow-hidden uk-slider-container">
                            <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                                <li className="w-1/2 pr-2">
                                    <a href="#">
                                        <div className="relative overflow-hidden rounded-lg">
                                            <div className="relative w-full h-40">
                                                <img
                                                    src="assets/images/product/product-1.jpg"
                                                    alt=""
                                                    className="object-cover w-full h-full inset-0"
                                                />
                                            </div>
                                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                                                {" "}
                                                $12{" "}
                                            </div>
                                        </div>
                                        <div className="mt-3 w-full"> Chill Lotion </div>
                                    </a>
                                </li>
                                <li className="w-1/2 pr-2">
                                    <a href="#">
                                        <div className="relative overflow-hidden rounded-lg">
                                            <div className="relative w-full h-40">
                                                <img
                                                    src="assets/images/product/product-3.jpg"
                                                    alt=""
                                                    className="object-cover w-full h-full inset-0"
                                                />
                                            </div>
                                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                                                {" "}
                                                $18{" "}
                                            </div>
                                        </div>
                                        <div className="mt-3 w-full"> Gaming mouse </div>
                                    </a>
                                </li>
                                <li className="w-1/2 pr-2">
                                    <a href="#">
                                        <div className="relative overflow-hidden rounded-lg">
                                            <div className="relative w-full h-40">
                                                <img
                                                    src="assets/images/product/product-5.jpg"
                                                    alt=""
                                                    className="object-cover w-full h-full inset-0"
                                                />
                                            </div>
                                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                                                {" "}
                                                $12{" "}
                                            </div>
                                        </div>
                                        <div className="mt-3 w-full"> Herbal Shampoo </div>
                                    </a>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                                uk-slider-item="previous"
                            >
                                {" "}
                                <ion-icon name="chevron-back" className="text-2xl" />
                            </button>
                            <button
                                type="button"
                                className="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                                uk-slider-item="next"
                            >
                                {" "}
                                <ion-icon name="chevron-forward" className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* online friends */}
                <div className="box p-5 px-6 border1 dark:bg-dark2">
                    <div className="flex justify-between text-black dark:text-white">
                        <h3 className="font-bold text-base"> Online Friends </h3>
                        <button type="button">
                            {" "}
                            <ion-icon name="sync-outline" className="text-xl" />{" "}
                        </button>
                    </div>
                    <div className="grid grid-cols-6 gap-3 mt-4">
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-2.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-3.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-4.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-5.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-6.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                        <a href="timeline.html">
                            <div className="w-10 h-10 relative">
                                <img
                                    src="assets/images/avatars/avatar-7.jpg"
                                    alt=""
                                    className="w-full h-full absolute inset-0 rounded-full"
                                />
                                <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                            </div>
                        </a>
                    </div>
                </div>
                {/* Pro Members */}
                <div className="box p-5 px-6 border1 dark:bg-dark2">
                    <div className="flex justify-between text-black dark:text-white">
                        <h3 className="font-bold text-base"> Pro Members </h3>
                    </div>
                    <div
                        className="relative capitalize font-normal text-sm mt-4 mb-2"
                        tabIndex={-1}
                        uk-slider="autoplay: true;finite: true"
                    >
                        <div className="overflow-hidden uk-slider-container">
                            <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                                <li className="w-1/2 pr-2">
                                    <a href="timeline.html"></a>
                                    <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                        <a href="timeline.html"></a>
                                        <a href="timeline.html">
                                            <div className="relative w-16 h-16 mx-auto mt-2">
                                                <img
                                                    src="assets/images/avatars/avatar-5.jpg"
                                                    alt=""
                                                    className="h-full object-cover rounded-full shadow w-full"
                                                />
                                            </div>
                                        </a>
                                        <div className="mt-5 text-center w-full">
                                            <a href="timeline.html">
                                                {" "}
                                                <h5 className="font-semibold"> Martin Gray</h5>{" "}
                                            </a>
                                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                                                {" "}
                                                12K Followers
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                                            >
                                                {" "}
                                                Follow{" "}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-1/2 pr-2">
                                    <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                        <a href="timeline.html">
                                            <div className="relative w-16 h-16 mx-auto mt-2">
                                                <img
                                                    src="assets/images/avatars/avatar-4.jpg"
                                                    alt=""
                                                    className="h-full object-cover rounded-full shadow w-full"
                                                />
                                            </div>
                                        </a>
                                        <div className="mt-5 text-center w-full">
                                            <a href="timeline.html">
                                                {" "}
                                                <h5 className="font-semibold"> Alexa Park</h5>{" "}
                                            </a>
                                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                                                {" "}
                                                12K Followers
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                                            >
                                                {" "}
                                                Follow{" "}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-1/2 pr-2">
                                    <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                        <a href="timeline.html">
                                            <div className="relative w-16 h-16 mx-auto mt-2">
                                                <img
                                                    src="assets/images/avatars/avatar-4.jpg"
                                                    alt=""
                                                    className="h-full object-cover rounded-full shadow w-full"
                                                />
                                            </div>
                                        </a>
                                        <div className="mt-5 text-center w-full">
                                            <a href="timeline.html">
                                                {" "}
                                                <h5 className="font-semibold"> James Lewis</h5>{" "}
                                            </a>
                                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                                                {" "}
                                                15K Followers
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                                            >
                                                {" "}
                                                Follow{" "}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="absolute -translate-y-1/2 bg-slate-100 rounded-full top-1/2 -left-4 grid w-9 h-9 place-items-center dark:bg-dark3"
                                uk-slider-item="previous"
                            >
                                {" "}
                                <ion-icon name="chevron-back" className="text-2xl" />
                            </button>
                            <button
                                type="button"
                                className="absolute -right-4 -translate-y-1/2 bg-slate-100 rounded-full top-1/2 grid w-9 h-9 place-items-center dark:bg-dark3"
                                uk-slider-item="next"
                            >
                                {" "}
                                <ion-icon name="chevron-forward" className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Trends */}
                <div className="box p-5 px-6 border1 dark:bg-dark2">
                    <div className="flex justify-between text-black dark:text-white">
                        <h3 className="font-bold text-base"> Trends for you </h3>
                        <button type="button">
                            {" "}
                            <ion-icon name="sync-outline" className="text-xl" />{" "}
                        </button>
                    </div>
                    <div className="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80">
                        <a href="#">
                            <div className="flex items-center gap-3 p">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 -mt-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-black dark:text-white text-sm">
                                        {" "}
                                        artificial intelligence{" "}
                                    </h4>
                                    <div className="mt-0.5"> 1,245,62 post </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="block">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 -mt-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-black dark:text-white text-sm">
                                        {" "}
                                        Web developers
                                    </h4>
                                    <div className="mt-0.5"> 1,624 post </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="block">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 -mt-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-black dark:text-white text-sm">
                                        {" "}
                                        Ui Designers
                                    </h4>
                                    <div className="mt-0.5"> 820 post </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="block">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 -mt-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-black dark:text-white text-sm">
                                        {" "}
                                        affiliate marketing{" "}
                                    </h4>
                                    <div className="mt-0.5"> 480 post </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FeedSidebar;
