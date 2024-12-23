import {Link} from "react-router-dom"
import PeopleCard from "../peopleFeature/PeopleCard";
import { useEffect, useState } from "react";
import { getFriendsOfFriends } from "../../api/search";
import Gallery from "../utils/Gallery";
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
        <div className="sticky top-0 self-start h-screen">
            <div
                className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6 overflow-y-auto"
                style={{ height: '100%' }}
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
                <Gallery/>
                
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
