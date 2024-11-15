import * as React from "react";
import SearchAutocomplete from "../utils/SearchAutoComplete";
import { getUserDescription, updateUserDescription } from "../../api/authen";

const UserDescription = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => { // Define an async function
            const response = await getUserDescription(); // Await the API call
            if (response.success) {
                console.log(response.data); // Log the response data
                setData(response.data); // Update the state with response data
            }
        };
        fetchData(); // Call the async function
    }, []);
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form.checkValidity()) {
            const response = await updateUserDescription(data);
            if (response.success) {
                window.alert("Update success");
            } else {
                window.alert(response.message);
            }
        } else {
            // Trigger native validation messages
            form.reportValidity(); // This will show the validation messages
        }
        
    }
    const handleBioChange = (e) => {
        setData(prev => {
            return {...prev, bio:e.target.value}
        })
    }
    const handleGenderChange = (e) => {
        setData(prev => {
            return { ...prev, gender: parseInt(e.target.value) }
        })
    }
    const handleLocationChange = (value) => {
        setData(prev => {
            return { ...prev, location: value.display_name }
        })
    }
    const handleSchoolChange = (value) => {
        setData(prev => {
            return { ...prev, school: value.label}
        })
    }
    const handleCompanyChange = (value) => {
        setData(prev => {
            return { ...prev, company: value.name}
        })
    }
    const handleDobChange = (e) => {
        setData(prev => {
            return { ...prev, dateOfBirth: e.target.value }
        })
    } 
    const handleFirstNameChange = (e) => {
        setData(prev => {
            return { ...prev, firstName: e.target.value }
        })
    } 
    const handleLastNameChange = (e) => {
        setData(prev => {
            return { ...prev, lastName: e.target.value }
        })
    } 
    return (
        <form>
            {data && <div>
                <div className="space-y-6" styles={{ width: '100vw' }}>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Email </label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="text"
                                value={data.email}
                                className="w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="md:flex items-start gap-10">
                        <label className="md:w-32 text-right"> Bio </label>
                        <div className="flex-1 max-md:mt-4">
                            <textarea
                                className="w-full"
                                rows={5}
                                value={data.bio}
                                onChange={handleBioChange}
                            />
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Location </label>
                        <div className="flex-1 max-md:mt-4">
                            <SearchAutocomplete Category="location"
                                passData={handleLocationChange}
                                initialQuery={data.location}/>
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Company </label>
                        <div className="flex-1 max-md:mt-4">
                            <SearchAutocomplete Category="company"
                                initialQuery={data.company}
                                passData={handleCompanyChange} />
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        {/* First Name Field */}
                        <div className="md:w-1/2 flex items-center gap-10">
                            <label className="md:w-32 text-right"> First Name </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    type="text"
                                    className="!border-0 !rounded-md w-full"
                                    value={data.firstName}
                                    onChange={handleFirstNameChange}
                                    required
                                    maxLength={40}
                                    pattern="^[A-Za-z]+$" // Only allows letters
                                    title="First name must contain only letters (no numbers or special characters)."
                                    placeholder="Enter your first name"
                                />
                            </div>
                        </div>

                        {/* Last Name Field */}
                        <div className="md:w-1/2 flex items-center gap-10">
                            <label className="md:w-32 text-right"> Last Name </label>
                            <div className="flex-1 max-md:mt-4">
                                <input
                                    type="text"
                                    className="!border-0 !rounded-md w-full"
                                    value={data.lastName}
                                    onChange={handleLastNameChange}
                                    required
                                    maxLength={40}
                                    pattern="^[A-Za-z]+$" // Only allows letters
                                    title="First name must contain only letters (no numbers or special characters)."
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Gender </label>
                        <div className="flex-1 max-md:mt-4">
                            <select className="!border-0 !rounded-md lg:w-1/2 w-full"
                                value={data.gender}
                                onChange={handleGenderChange}>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                                <option value={2}>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Date of Birth </label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="date"
                                className="!border-0 !rounded-md lg:w-1/2 w-full"
                                value={new Date(data.dateOfBirth).toISOString().split("T")[0]}
                                onChange={handleDobChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-16 lg:pl-[10.5rem]">
                    <button
                        type="submit"
                        className="button lg:px-6 bg-secondery max-md:flex-1"
                    >
                        {" "}
                        Cancle
                    </button>
                    <button
                        onClick={(e) => {
                            handleSaveChanges(e);
                        }}
                        type="submit"
                        className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                        {" "}
                        Save <span className="ripple-overlay" />
                    </button>
                </div>
            </div>}
            
        </form>
    )
}
export default UserDescription;
