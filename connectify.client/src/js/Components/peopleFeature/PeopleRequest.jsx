import * as React from "react";
import { getFriendRequest } from "../../api/search";
import { respondFriendRequest, revokeFriendRequest } from "../../api/Friend";

const FriendRequestCard = ({ request }) => {
    const [finishedText, setFinishedText] = React.useState();
    const accept = async () => {
        const res = await respondFriendRequest(request.userId, 1);
        if (res) {
            console.log("Success");
            setFinishedText("Accepted");
        }

    }
    const decline = async () => {
        const res = await respondFriendRequest(request.userId, 2);
        if (res) {
            console.log("Success");
            setFinishedText("Declined");
        }

    }
    const revoke = async () => {
        const res = await revokeFriendRequest(request.userId);
        if (res) {
            console.log("Success");
            setFinishedText("Revoked");
        }

    }

    return (
        <div className="flex md:items-center space-x-4 p-4 rounded-md box">
            <div className="sm:w-20 w-14 sm:h-20 h-14 flex-shrink-0 rounded-lg relative">
                <img
                    src={request.avatar}
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
                    {request.firstName + " " + request.lastName}{" "}
                </a>
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
            {finishedText? <button
                type="button"
                className="button bg-grey-500 text-black"
                disabled
            >
                {finishedText}
            </button> : 
                request.isSent ? (
                    <button
                        type="button"
                        onClick={revoke}
                        className="button bg-yellow-500 text-white"
                    >
                        Revoke
                    </button>
                ) : (
                    <div className="flex flex-col space-y-2">
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
                    </div>
                )
            }
            
            
        </div>
    )
}
const PeopleRequest = () => {
    const [totalPage, setTotalPage] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [requestList, setRequestList] = React.useState([]);
    const [filter, setFilter] = React.useState("sent");
    const loadMore = async () => {
        const data = await getFriendRequest(filter, pageNumber+1);
        if (data) {
            console.log(data);
            setPageNumber(prev => prev+1);
            setRequestList(prev => [...prev, ...data.items.filter(item2 => !prev.some(item1 => item1.userId == item2.userId))]);
        } else {
            window.alert("failed to fetch content, please try again");
        }
    }
    React.useEffect(() => {
        const getData = async () => {
            setPageNumber(1);
            const data = await getFriendRequest(filter, pageNumber);
            if (data) {
                console.log(data);
                setRequestList(data.items);
                setTotalPage(data.totalCount / data.pageSize);
            } else {
                setTotalPage(0);
                window.alert("failed to fetch content, please try again");
            }

        };
        getData();
    }, [filter])
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
                            Friend requests{" "}
                        </h2>
                        <p className="font-normal text-sm text-gray-500 leading-6">
                            Below are friend requests you sent or received up till now
                        </p>
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => { setFilter(e.target.value) }}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 hover:shadow-md cursor-pointer"
                    >
                        <option value="sent">Sent</option>
                        <option value="received">Received</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-2 md:gap-2 gap-3">
                    {requestList.map((request) => {
                        return <FriendRequestCard key={request.userId} request={request} />
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
            </div>
        </main>

    );
}
export default PeopleRequest;