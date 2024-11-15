import { useState, useEffect, useContext } from "react";
import { getPostMediaOfUser } from "../../api/search";
import { useParams } from "react-router-dom";
import { isVideo } from "../../Utils/MediaHelper";
import { AppContext } from "../../Contexts/AppProvider";
const TimelineGallery = () => {
    const [mediaList, setMediaList] = useState([]);        // Danh sách ảnh
    const [page, setPage] = useState(1);             // Trang hiện tại
    const [loading, setLoading] = useState(true);   // Trạng thái loading   
    const [filter, setFilter] = useState({ fileType: "image", relation: "userPhotos" });
    const { userId } = useParams();
    const [total, setTotal] = useState(1);
    const { mediaDetailRef } = useContext(AppContext);
    
    // Hàm gọi API để lấy ảnh
    const fetchData = async (isReset) => {
        setLoading(true);
        try {
            // Giả sử đây là API lấy ảnh người dùng theo userId và page
            const data = await getPostMediaOfUser(userId, filter, isReset ? 1 : page, 10)
            setTotal(data.totalCount);
            if (isReset) {
                setMediaList(data.items);
                setPage(2);
            } else {
                setMediaList(prev => [...prev, ...data.items]);
                setPage(p => p+1)
            }
        } catch (error) {
            console.error("Error loading media:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(true);
    }, [filter]); 

    return (
        <div className="photo-gallery">
            <div className="flex gap-3 mb-4">
                <select
                    value={filter.fileType}
                    onChange={(e) => setFilter(prev => { return { ...prev, fileType: e.target.value } })}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                </select>

                {/* Bộ lọc loại ảnh */}
                <select
                    value={filter.relation}
                    onChange={(e) => setFilter(prev => { return { ...prev, relation: e.target.value}})}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="userPhotos">Media By User</option>
                    <option value="isTagged">Media with User</option>
                </select>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {mediaList.map((media, key) => (
                    <div key={media.id}
                        onClick={
                            () => {
                                mediaDetailRef.current.setMedia(mediaList);
                                mediaDetailRef.current.open(key);
                            }
                        }
                        className="cursor-pointer">
                        {isVideo(media.url) ? (
                            <video src={media.url} controls className="w-full h-auto object-cover rounded aspect-square object-top" />
                        ) : (
                            <img src={media.url} alt="User photo" className="w-full h-auto object-cover rounded aspect-square object-top" />
                        )}
                    </div>
                    
                ))}
            </div>
            {mediaList.length < total && (
                <button
                    onClick={() => { fetchData(false); }}
                    disabled={loading}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            )}
        </div>
    );
};

export default TimelineGallery;
