import { useEffect, useState } from "react";
import { getFriendsOfFriends } from "../../api/search";
import PeopleCard from "./PeopleCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module correctly
import "swiper/css";
import "swiper/css/navigation";
const PeopleSuggestion = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const users = await getFriendsOfFriends();
                console.log(users);
                setUsers(users);
            } catch(error){
                console.log(error);
            }
        }
        loadData();
    }, [])
    return (
        <>
            {/* Category Title */}
            <div className="sm:my-6 my-3 flex items-center justify-between">
                <div>
                    <h2 className="md:text-lg text-base font-semibold text-black">
                        Suggestions
                    </h2>
                    <p className="font-normal text-sm text-gray-500 leading-6">
                        These are people you may know.
                    </p>
                </div>
                <a href="#" className="text-blue-500 sm:block hidden text-sm">
                    See all
                </a>
            </div>

            {/* Group Slider */}
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2} // Adjust for the number of visible cards
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                }}
                className="mySwiper"
            >
                {users.map((user, index) => (
                    <SwiperSlide key={index}>
                        <PeopleCard people={user} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
export default PeopleSuggestion;