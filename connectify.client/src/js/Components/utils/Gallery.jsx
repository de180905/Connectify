import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Gallery = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch random images from Picsum API
        const fetchImages = async () => {
            const randomPage = Math.floor(Math.random() * 20) + 1;
            const res = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=5`);
            const data = await res.json();
            setImages(data);
        };

        fetchImages();

        // Auto-slide functionality
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change every 3 seconds

        // Clean up the interval when component unmounts
        return () => clearInterval(intervalId);
    }, [images.length]); // This will re-run if `images.length` changes

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="box p-5 px-6 border1 dark:bg-dark2">
            <div className="flex justify-between text-black dark:text-white">
                <h3 className="font-bold text-base">Premium Photos</h3>
                <button type="button">
                    <ion-icon name="sync-outline" className="text-xl" />
                </button>
            </div>
            <div
                className="relative capitalize font-medium text-sm text-center mt-4 mb-2"
                tabIndex={-1}
            >
                <div className="overflow-hidden">
                    {images.length > 0 && (
                        <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full h-60">
                                <img
                                    src={images[currentIndex].download_url}
                                    alt={images[currentIndex].author}
                                    className="object-cover w-full h-full inset-0"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 m-2 text-white bg-black/60 rounded-md py-1 px-2">
                                {images[currentIndex].author}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    className="absolute bg-white rounded-full top-1/2 left-2 transform -translate-y-1/2 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                    onClick={prevImage}
                >
                    <FaChevronLeft className="text-2xl" />
                </button>
                <button
                    type="button"
                    className="absolute bg-white rounded-full top-1/2 right-2 transform -translate-y-1/2 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                    onClick={nextImage}
                >
                    <FaChevronRight className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default Gallery;
