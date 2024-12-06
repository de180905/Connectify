import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module correctly
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import { loadChatRooms } from "../../api/chat";
import { splitFullName } from "../../Utils/stringUtil";
import {Link } from "react-router-dom"
const Stories = () => {
    const [chatrooms, setChatrooms] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await loadChatRooms("private", '', 1, 10);
                setChatrooms(data);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [])
    return (
        <div className="mb-8">
            <h3 className="font-extrabold text-2xl  text-black dark:text-white hidden">
                {" "}
                Stories
            </h3>
            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next",
                    }}
                    loop={false}
                    spaceBetween={14} // Equivalent to your custom spacing
                    slidesPerView={6} // Adjust based on the number of visible items
                >
                    {/* Dynamically generate slides for users */}
                    {chatrooms.map((cr) => (
                        <SwiperSlide key={cr.chatRoomId}>
                            <Link
                                to={`/chatrooms/${cr.chatRoomId}`}
                                className="flex flex-col items-center"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full dark:border-slate-700">
                                    <img
                                        src={cr.avatar}
                                        alt={cr.name}
                                        className="absolute w-full h-full object-cover rounded-full"
                                    />
                                    {cr.isOnline && (
                                        <div className="w-4 h-4 absolute bottom-0 right-0 bg-green-500 rounded-full border border-white dark:border-slate-800" />
                                    )}
                                </div>
                                <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {splitFullName(cr.name).firstName}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}

                </Swiper>

                {/* Navigation Buttons */}
                <button
                    type="button"
                    className="swiper-button-prev absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3"
                >
                    <ion-icon name="chevron-back" className="text-2xl" />
                </button>
                <button
                    type="button"
                    className="swiper-button-next absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -right-3.5 grid w-8 h-8 place-items-center dark:bg-dark3"
                >
                    <ion-icon name="chevron-forward" className="text-2xl" />
                </button>
            </div>
        </div>
    )
}
export default Stories;
