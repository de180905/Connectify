import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import { isImage } from "../../Utils/MediaHelper";
Modal.setAppElement('#root');
const MediaDetailModal = forwardRef(({ }, ref) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [mediaList, setMediaList] = useState([{url: ''}]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const handleNext = () => {
        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
    };

    const handlePrev = () => {
        setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaList.length) % mediaList.length);
    };
    useImperativeHandle(ref, () => ({
        open: (index) => {
            setCurrentMediaIndex(index);
            setModalIsOpen(true); 
        },
        close: () => setModalIsOpen(false),
        setMedia: (media) => setMediaList(media)
    }));
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="my-modal relative"
            overlayClassName="my-overlay"
        >
            <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 p-4 text-red-600">
                <i className="fas fa-times fa-2x"></i>
            </button>
            <div className="flex justify-center items-center h-full">
                {
                    mediaList.length > 1 && (
                        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black p-4">
                            <i className="fas fa-chevron-left fa-2x"></i>
                        </button>
                    )
                }
                {isImage(mediaList[currentMediaIndex].url) ? (
                    <img src={mediaList[currentMediaIndex].url} alt="" className="max-h-full max-w-full" />
                ) : (
                    <video className="max-h-full max-w-full" controls>
                        <source src={mediaList[currentMediaIndex].url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                {
                    mediaList.length > 1 && (
                        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black p-4">
                            <i className="fas fa-chevron-right fa-2x"></i>
                        </button>
                    )
                }
            </div>
        </Modal>
    )
});
export default MediaDetailModal;
