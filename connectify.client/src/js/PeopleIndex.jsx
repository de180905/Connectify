import * as React from "react";
import { getPeople } from "./api/search";
import { respondFriendRequest, sendFriendRequest, revokeFriendRequest } from "./api/Friend";
import SearchAutocomplete from "./SearchAutoComplete";
import { Link } from 'react-router-dom'
const PeopleCard = ({ people, setPeople }) => {
    const addFriend = async () => {
        const res = await sendFriendRequest(people.id);
        if (res) {
            console.log("Success");
            setPeople(prev => prev.map(p => p.id == people.id ? { ...p, userP2PStatus: 1 } : p))
        }

    }
    const accept = async () => {
        const res = await respondFriendRequest(people.id, 1);
        if (res) {
            console.log("Success");
            setPeople(prev => prev.map(p => p.id == people.id ? { ...p, userP2PStatus: 3 } : p))
        }

    }
    const decline = async () => {
        const res = await respondFriendRequest(people.id, 2);
        if (res) {
            console.log("Success");
            setPeople(prev => prev.map(p => p.id == people.id ? { ...p, userP2PStatus: 0 } : p))
        }

    }
    const response = () => {

    }
    const revoke = async () => {
        const res = await revokeFriendRequest(people.id);
        if (res) {
            console.log("Success");
            setPeople(prev => prev.map(p => p.id == people.id ? { ...p, userP2PStatus: 0 } : p))
        }

    }
    const view = async () => { }
    const UserP2PStatusAction = {
        0: {
            text: "AddFriend",
            action: addFriend
        },
        1: {
            text: "Revoke",
            action: revoke
        },
        3: {
            text: "View",
            action: view
        }

    }

    return (
        <div className="flex md:items-center space-x-4 p-4 rounded-md box">
            <div className="sm:w-20 w-14 sm:h-20 h-14 flex-shrink-0 rounded-lg relative">
                <img
                    src={people.avatar}
                    className="absolute w-full h-full inset-0 rounded-md object-cover shadow-sm"
                    alt=""
                />
            </div>
            <div className="flex-1">
                <a
                    href="timeline-group.html"
                    className="md:text-lg text-base font-semibold capitalize text-black dark:text-white"
                >
                    {" "}
                    {people.firstName+" "+people.lastName}{" "}
                </a>
                <div className="flex space-x-2 items-center text-sm font-normal">
                    <div> 19K Members</div>
                    <div>·</div>
                    <div> 21 posts a week</div>
                </div>
                <div className="flex items-center mt-2">
                    <img
                        src="assets/images/avatars/avatar-2.jpg"
                        className="w-6 rounded-full border-2 border-gray-200 -mr-2"
                        alt=""
                    />
                    <img
                        src="assets/images/avatars/avatar-4.jpg"
                        className="w-6 rounded-full border-2 border-gray-200"
                        alt=""
                    />
                    <div className="text-sm text-gray-500 ml-2">
                        {" "}
                        16 common friends
                    </div>
                </div>
            </div>
            {people.userP2PStatus == 2 ? <div className="flex flex-col space-y-2">
                <button
                    type="button"
                    className="button bg-blue-500 text-white"
                    onClick={accept}
                >
                    Accept
                </button>
                <button
                    type="button"
                    className="button bg-yellow-500 text-white"
                    onClick={decline}
                >
                    Decline
                </button>
            </div> : <button
                type="button"
                className="button bg-primary-soft text-primary dark:text-white gap-1 max-md:hidden"
                onClick={UserP2PStatusAction[people.userP2PStatus].action}
            >
                {" "}
                <ion-icon name="add-circle" className="text-xl -ml-1" />
                {UserP2PStatusAction[people.userP2PStatus].text}
            </button>}
            
        </div>
    )
}
const PeopleIndex = () => {
    const [totalPage, setTotalPage] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [peopleList, setPeopleList] = React.useState([]);
    const [options, setOptions] = React.useState({
        fullName: '', location: '', company: '', filter: 'friends'
    });
    const loadMore = async () => {
        const data = await getPeople(options.fullName, options.location, options.company, options.filter, pageNumber+1);
        if (data) {
            setPageNumber(prev => prev+1);
            setPeopleList(prev => [...prev, ...data.items.filter(item2 => !prev.some(item1 => item1.id == item2.id))]);
        } else {
            window.alert("failed to fetch content, please try again");
        }    
    }
    const onNameChange = (e) => {
        console.log(e.target.value);
        setOptions(prev => {
            return { ...prev, fullName: e.target.value}
        })
    }
    const onLocationChange = (item) => {
        setOptions(prev => {
            return { ...prev, location: item.display_name }
        })
    }
    const onCompanyChange = (item) => {
        setOptions(prev => {
            return { ...prev, company: item.name }
        })
    }
    React.useEffect(() => {
        const getData = async () => {
            console.log(options);
            const data = await getPeople(options.fullName, options.location, options.company, options.filter, 1);
            /*            setPeopleList(prev => [...prev, ...data.items.filter(item2 => !prev.some(item1 => item1.id == item2.id))]);*/
            if (data) {
                setPageNumber(1);
                setPeopleList(data.items);
                setTotalPage(data.totalCount / data.pageSize);
            } else {
                window.alert("failed to fetch content, please try again");
            }  

        };
        getData();
    }, [options])
    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] py-10 p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            <div className="2xl:max-w-[1220px] max-w-[1065px] mx-auto">
                <div className="page-heading">
                    <h1 className="page-title"> People </h1>
                </div>
                
                {/* suggest title */}
                <div className="sm:my-6 my-3 flex items-center justify-between lg:mt-10">
                    <div>
                        <h2 className="md:text-lg text-base font-semibold text-black">
                            {" "}
                            Find someone{" "}
                        </h2>
                        <p className="font-normal text-sm text-gray-500 leading-6">
                            {" "}
                            Discover people surrounding you.{" "}
                            <Link to="requests" className="text-blue-500 text-sm">See friend requests</Link>
                        </p>
                    </div>
                    <select
                        value={options.filter}
                        onChange={(e) => setOptions(prev => { return { ...prev, filter: e.target.value } })} // Update the filter state
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 hover:shadow-md cursor-pointer"
                    >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends</option>
                    </select>
                </div>
                {/* Search Inputs */}
                <div className="my-4 mb-4 grid gap-4">
                    {/* Search by Name */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={onNameChange}
                    />

                    {/* Location and Company Search on the same line */}
                    <div className="flex gap-4">
                        {/* Search by Place using Autocomplete */}
                        <div className="w-1/2"> {/* Flex child to split the width */}
                            <SearchAutocomplete
                                placeholder="Search by location..."
                                Category="location"
                                passData={onLocationChange}
                            />
                        </div>

                        {/* Search by Workplace using Autocomplete */}
                        <div className="w-1/2"> {/* Flex child to split the width */}
                            <SearchAutocomplete
                                placeholder="Search by workplace..."
                                Category="company"
                                passData={onCompanyChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-2 gap-3">
                    {peopleList.map((people) => {
                        return <PeopleCard key={people.id} people={people} setPeople={setPeopleList} />
                    })}
                </div>
                <div className="flex justify-center my-6">
                    {pageNumber < totalPage ? 
                        <button
                            onClick={loadMore}
                            type="button"
                            className="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2"
                        >
                            Load more...
                        </button> :
                        <p>No more content available</p>
                    }      
                </div>
                {/* group list tabs */}
                <div className="uk-switcher" id="group-tabs">
                    {/* card layout 1 */}
                    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2.5">
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-4.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body relative z-10">
                                <img
                                    src="assets/images/avatars/avatar-4.jpg"
                                    alt=""
                                    className="w-10 rounded-full mb-2 shadow -mt-8 relative border-2 border-white dark:border-slate-800"
                                />
                                <a href="timeline-group.html">
                                    <h4 className="card-title"> Delicious Foods</h4>
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Travel</a>
                                    <div className="md:block hidden">·</div>
                                    <div> 232k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-3.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body relative z-10">
                                <img
                                    src="assets/images/avatars/avatar-3.jpg"
                                    alt=""
                                    className="w-10 rounded-full mb-2 shadow -mt-8 relative border-2 border-white dark:border-slate-800"
                                />
                                <a href="timeline-group.html">
                                    <h4 className="card-title"> Abstract minimal </h4>
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Technology </a>
                                    <div className="md:block hidden">·</div>
                                    <div> 328k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-2.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body relative z-10">
                                <img
                                    src="assets/images/avatars/avatar-2.jpg"
                                    alt=""
                                    className="w-10 rounded-full mb-2 shadow -mt-8 relative border-2 border-white dark:border-slate-800"
                                />
                                <a href="timeline-group.html">
                                    <h4 className="card-title"> Delicious Foods</h4>
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Bussiness</a>
                                    <div className="md:block hidden">·</div>
                                    <div> 436k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-1.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body relative z-10">
                                <img
                                    src="assets/images/avatars/avatar-2.jpg"
                                    alt=""
                                    className="w-10 rounded-full mb-2 shadow -mt-8 relative border-2 border-white dark:border-slate-800"
                                />
                                <a href="timeline-group.html">
                                    <h4 className="card-title"> Graphic Design </h4>
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Design </a>
                                    <div className="md:block hidden">·</div>
                                    <div> 420k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* card layout 2 */}
                    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2.5">
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/product/product-1.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Graphic Design </h4>
                                </a>
                                <div className="card-text">
                                    <div className="card-list-info font-normal mt-1">
                                        <div>232k members </div>
                                        <div className="md:block hidden">·</div>
                                        <a href="#"> Education </a>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex -space-x-2">
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                        </div>
                                        <p className="card-text"> 6 friend are members </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/product/product-2.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Delicious Foods</h4>
                                </a>
                                <div className="card-text">
                                    <div className="card-list-info font-normal mt-1">
                                        <div>232k members </div>
                                        <div className="md:block hidden">·</div>
                                        <a href="#"> Education </a>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex -space-x-2">
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                        </div>
                                        <p className="card-text"> 8 friend are members </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/product/product-4.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Delicious Foods</h4>
                                </a>
                                <div className="card-text">
                                    <div className="card-list-info font-normal mt-1">
                                        <div>232k members </div>
                                        <div className="md:block hidden">·</div>
                                        <a href="#"> Education </a>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex -space-x-2">
                                            <img
                                                src="assets/images/avatars/avatar-4.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                        </div>
                                        <p className="card-text"> 12 friend are members </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/product/product-3.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Abstract minimal </h4>
                                </a>
                                <div className="card-text">
                                    <div className="card-list-info font-normal mt-1">
                                        <div>360k members </div>
                                        <div className="md:block hidden">·</div>
                                        <a href="#"> Education </a>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex -space-x-2">
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="w-6 rounded-full border-2 border-white dark:border-slate-800"
                                            />
                                        </div>
                                        <p className="card-text"> 3 friend are members </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <a
                                        href="timeline-group.html"
                                        className="button bg-secondery !w-auto"
                                    >
                                        {" "}
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* card layout 3 */}
                    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2.5">
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-2.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Delicious Foods</h4>{" "}
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Health </a>
                                    <div className="md:block hidden">·</div>
                                    <div>42k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary-soft text-primary dark:text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <button type="button" className="button bg-secondery flex-1">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-1.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Graphic Design </h4>{" "}
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Health </a>
                                    <div className="md:block hidden">·</div>
                                    <div>42k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary-soft text-primary dark:text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <button type="button" className="button bg-secondery flex-1">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-3.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Abstract minimal </h4>{" "}
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Delicious Foods</a>
                                    <div className="md:block hidden">·</div>
                                    <div>232k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary-soft text-primary dark:text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <button type="button" className="button bg-secondery flex-1">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <a href="timeline-group.html">
                                <div className="card-media h-24">
                                    <img src="assets/images/group/group-cover-4.jpg" alt="" />
                                    <div className="card-overly" />
                                </div>
                            </a>
                            <div className="card-body">
                                <a href="timeline-group.html">
                                    {" "}
                                    <h4 className="card-title"> Delicious Foods</h4>{" "}
                                </a>
                                <div className="card-list-info font-normal mt-1">
                                    <a href="#"> Travel</a>
                                    <div className="md:block hidden">·</div>
                                    <div>620k members </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="button bg-primary-soft text-primary dark:text-white flex-1"
                                    >
                                        Join
                                    </button>
                                    <button type="button" className="button bg-secondery flex-1">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* category title */}
                <div className="sm:my-6 my-3 flex items-center justify-between">
                    <div>
                        <h2 className="md:text-lg text-base font-semibold text-black">
                            {" "}
                            Suggestions{" "}
                        </h2>
                        <p className="font-normal text-sm text-gray-500 leading-6">
                            {" "}
                            These are people you may know.{" "}
                        </p>
                    </div>
                    <a href="#" className="text-blue-500 sm:block hidden text-sm">
                        {" "}
                        See all{" "}
                    </a>
                </div>
                {/* group  slider */}
                <div tabIndex={-1} uk-slider="finite:true">
                    <div className="uk-slider-container pb-1">
                        <ul className="uk-slider-items grid-small">
                            <li className="md:w-1/5 sm:w-1/3 w-1/2">
                                <a href="#">
                                    <div className="relative rounded-lg overflow-hidden">
                                        <img
                                            src="assets/images/category/Buy-and-sell.html"
                                            alt=""
                                            className="h-36 w-full object-cover"
                                        />
                                        <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10">
                                            <div className="text-white p-5 text-lg leading-3">
                                                {" "}
                                                Shopping{" "}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* slide nav icons */}
                    <a className="nav-prev" href="#" uk-slider-item="previous">
                        {" "}
                        <ion-icon name="chevron-back" className="text-2xl" />{" "}
                    </a>
                    <a className="nav-next" href="#" uk-slider-item="next">
                        {" "}
                        <ion-icon name="chevron-forward" className="text-2xl" />
                    </a>
                </div>
            </div>
        </main>

    );
}
export default PeopleIndex;