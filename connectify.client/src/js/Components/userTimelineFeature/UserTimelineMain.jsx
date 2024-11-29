import { useContext, useState, useEffect } from "react";
import PostBoxOpener from "../postFeature/PostBoxOpener"
import PostsFeedingSection from "../postFeature/PostsFeedingSection"
import { useParams, Link} from 'react-router-dom';
import { getDescriptionOfUser, getFriendsOfUser, getPostMediaOfUser } from "../../api/search";
import { DateDisplay } from "../../Utils/datetimeUtil";
import { AppContext } from "../../Contexts/AppProvider";

const UserTimelineMain = () => {
    const { user: myUser } = useContext(AppContext);
    const { userId } = useParams();
    const [userDes, setUserDes] = useState(null);
    const [userPhotosPreview, setUserPhotosPreview] = useState([]);
    const [userFriendsPreview, setUserFriendsPreview] = useState({items:[], totalCount:0});
    useEffect(() => {
        const fetchUserDes = async () => {
            try {
                const res = await getDescriptionOfUser(userId);
                setUserDes(res);
            }
            catch (error) {
                console.log(error);
            }
        }
        const fetchUserPhotosPreview = async () => {
            try {
                const res = await getPostMediaOfUser(userId, null, 1, 4);
                setUserPhotosPreview(res.items);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchUserFriendsPreview = async () => {
            try {
                const res = await getFriendsOfUser(userId, null, 1, 6);
                setUserFriendsPreview({items: res.items, totalCount: res.totalCount})
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserDes();
        fetchUserPhotosPreview();
        fetchUserFriendsPreview();
    }, [])
    return (
        <>
            {/* feed story */}
            <div className="flex-1 xl:space-y-6 space-y-3">
                <PostBoxOpener />
                {/*  post image*/}
                <PostsFeedingSection
                    filterOptions={{
                        authorId: userId
                    }}
                />
                {/* placeholder */}
                <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                        <div className="flex-1 space-y-3">
                            <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                            <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                    </div>
                    <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>
                    <div className="flex gap-3">
                        <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                        <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                        <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                        <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                    </div>
                </div>
            </div>
            {/* sidebar */}
            <div className="lg:w-[400px]">
                <div
                    className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
                    uk-sticky="media: 1024; end: #js-oversized; offset: 80"
                >
                    <div className="box p-5 px-6">
                        <div className="flex items-ce justify-between text-black dark:text-white">
                            <h3 className="font-bold text-lg"> Intro </h3>
                            {userId == myUser.id && <Link to="/settings" className="text-sm text-blue-500">
                                Edit
                            </Link>}
                        </div>
                        <ul className="text-gray-700 space-y-4 mt-4 text-sm dark:text-white/80">
                            <li className="flex items-center gap-3">
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
                                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                    />
                                </svg>
                                <div>
                                    {" "}
                                    Born at{" "}
                                    <span className="font-semibold text-black dark:text-white">
                                        {" "}
                                        {DateDisplay(userDes?.dateOfBirth)}
                                    </span>{" "}
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
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
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                                <div>
                                    {" "}
                                    Live In{" "}
                                    <span className="font-semibold text-black dark:text-white">
                                        {" "}
                                        {userDes?.location}
                                    </span>{" "}
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
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
                                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                                    />
                                </svg>
                                <div>
                                    {" "}
                                    Works at{" "}
                                    <span className="font-semibold text-black dark:text-white">
                                        {" "}
                                        {userDes?.company}{" "}
                                    </span>{" "}
                                </div>
                            </li>

                            <li className="flex items-center gap-3">
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
                                        d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                </svg>
                                <div>
                                    {" "}
                                    Flowwed By{" "}
                                    <span className="font-semibold text-black dark:text-white">
                                        {" "}
                                        3,240 People{" "}
                                    </span>{" "}
                                </div>
                            </li>
                        </ul>
                        {/* Hobbies */}
                        <div className="flex flex-wrap gap-1 text-sm mt-4 font-semibold capitalize">
                            <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                                Shoping
                            </div>
                            <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                                code
                            </div>
                            <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                                art
                            </div>
                            <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                                design
                            </div>
                        </div>
                        {userPhotosPreview.length > 0 && (
                            <>
                                <div className="grid grid-cols-2 gap-1 text-center text-sm mt-4 mb-2 rounded-lg overflow-hidden">
                                    {userPhotosPreview.map(photo => (
                                        <div className="relative w-full aspect-[4/3]" key={photo.id}>
                                            <img
                                                src={photo.url}
                                                alt=""
                                                className="object-cover w-full h-full inset-0"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* View All Link */}
                                <div className="text-center mt-2">
                                    <Link to="photos" className="text-blue-500 text-sm font-semibold">
                                        View All Photos
                                    </Link>
                                </div>
                            </>
                        )}
                        
                    </div>
                    <div className="box p-5 px-6">
                        <div className="flex items-ce justify-between text-black dark:text-white">
                            <h3 className="font-bold text-lg">
                                {" "}
                                Friends
                                <span className="block text-sm text-gray-500 mt-0. font-normal dark:text-white">
                                    {" "}
                                    {userFriendsPreview.totalCount} Friends{" "}
                                </span>
                            </h3>
                            {userFriendsPreview.totalCount > 0 && (
                                <Link to="friends" className="text-blue-500 text-sm font-semibold">
                                    See all
                                </Link>
                            )}
                            
                        </div>
                        <div className="grid grid-cols-3 gap-2 gap-y-5 text-center text-sm mt-4 mb-2">
                            {userFriendsPreview.items.map(f => (
                                <div key={f.id}>
                                    <div className="relative w-full aspect-square rounded-full overflow-hidden">
                                        <img
                                            src={f.avatar}
                                            alt=""
                                            className="object-cover inset-0"
                                        />
                                    </div>
                                    <div className="mt-2 line-clamp-1"> {f.fullName} </div>
                                </div>
                            ))}
          
                        </div>
                    </div>
                    {/* Groups You Manage  */}
                    <div className="bg-white rounded-xl shadow p-5 px-6 border1 dark:bg-dark2">
                        <div className="flex items-baseline justify-between text-black dark:text-white">
                            <h3 className="font-bold text-base"> Suggested Manage </h3>
                            <a href="#" className="text-sm text-blue-500">
                                See all
                            </a>
                        </div>
                        <div className="side-list">
                            <div className="side-list-item">
                                <a href="timeline-group.html">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="side-list-image rounded-md"
                                    />
                                </a>
                                <div className="flex-1">
                                    <a href="timeline-group.html">
                                        <h4 className="side-list-title"> John Michael</h4>
                                    </a>
                                    <div className="side-list-info"> Updated 1 week ago </div>
                                </div>
                                <button className="button bg-primary text-white">Like</button>
                            </div>
                            <div className="side-list-item">
                                <a href="timeline-group.html">
                                    <img
                                        src="assets/images/avatars/avatar-4.jpg"
                                        alt=""
                                        className="side-list-image rounded-md"
                                    />
                                </a>
                                <div className="flex-1">
                                    <a href="timeline-group.html">
                                        <h4 className="side-list-title"> Martin Gray</h4>
                                    </a>
                                    <div className="side-list-info"> Updated 4 week ago </div>
                                </div>
                                <button className="button bg-primary text-white">Like</button>
                            </div>
                            <div className="side-list-item">
                                <a href="timeline-group.html">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="side-list-image rounded-md"
                                    />
                                </a>
                                <div className="flex-1">
                                    <a href="timeline-group.html">
                                        <h4 className="side-list-title"> Monroe Parker</h4>
                                    </a>
                                    <div className="side-list-info"> Updated 2 month ago </div>
                                </div>
                                <button className="button bg-primary text-white">Like</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserTimelineMain;
