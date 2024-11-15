import PeopleCard from "../peopleFeature/PeopleCard";
import * as React from "react";
import { getFriendsOfUser, getPeople } from "../../api/search";
import { useParams } from 'react-router-dom';
const UserTimelineFriends = () => {
    const [totalPage, setTotalPage] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [peopleList, setPeopleList] = React.useState([]);
    const { userId } = useParams();
    const [options, setOptions] = React.useState({
        fullName: ''
    });
    const loadMore = async () => {
        const data = await getPeople(options.fullName, null, null, null, pageNumber + 1);
        if (data) {
            setPageNumber(prev => prev + 1);
            setPeopleList(prev => [...prev, ...data.items.filter(item2 => !prev.some(item1 => item1.id == item2.id))]);
        } else {
            window.alert("failed to fetch content, please try again");
        }
    }
    const onNameChange = (e) => {
        setOptions(prev => {
            return { ...prev, fullName: e.target.value }
        })
    }

    React.useEffect(() => {
        const getData = async () => {
            console.log(options);
            const data = await getFriendsOfUser(userId, options.fullName, 1);
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
        <>
            <div className="2xl:max-w-[1220px] max-w-[1065px] mx-auto">
                {/* Search Inputs */}
                <div className="my-4 mb-4 grid gap-4">
                    {/* Search by Name */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={onNameChange}
                    />
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

            </div>
        </>

    );
}

export default UserTimelineFriends;
