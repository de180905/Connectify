import * as React from "react";
import { getPeople } from "../../api/search";
import SearchAutocomplete from "../utils/SearchAutoComplete";
import { Link } from 'react-router-dom'
import PeopleCard from "./PeopleCard";
import PeopleSuggestion from "./PeopleSuggestion";

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
                <PeopleSuggestion/>
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
                
            </div>
        </main>

    );
}
export default PeopleIndex;