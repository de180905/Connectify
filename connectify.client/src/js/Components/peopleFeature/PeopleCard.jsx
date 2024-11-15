import * as React from "react";
import { Link } from 'react-router-dom'
import { respondFriendRequest, revokeFriendRequest, sendFriendRequest } from "../../api/Friend";
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
        },
        4: {
            text: "View",
            action: view
        }
    }

    return (
        <div className="flex md:items-center space-x-4 p-4 rounded-md box">
            <div className="sm:w-20 w-14 sm:h-20 h-14 flex-shrink-0 rounded-lg relative">
                <Link
                    to={`/${people.id}`}
                >
                    <img
                        src={people.avatar}
                        className="absolute w-full h-full inset-0 rounded-md object-cover shadow-sm"
                        alt=""
                    />
                </Link>
            </div>
            <div className="flex-1">
                <Link
                    to={`/${people.id}`}
                    className="md:text-lg text-base font-semibold capitalize text-black dark:text-white"
                >
                    {" "}
                    {people.fullName}{" "}
                </Link>
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
export default PeopleCard
