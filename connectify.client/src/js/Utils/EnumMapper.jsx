import { FaThumbsUp, FaHeart, FaLaugh, FaSurprise, FaSadTear, FaAngry } from "react-icons/fa";
import '/assets/css/icon.css'

// Mapping of ReactionType to their respective integers
const reactionTypeValue = {
    0: <FaThumbsUp key="0" className = "text-blue-500 icon-hover"/>,
    1: <FaHeart key="1" className="text-red-500 icon-hover" />,
    2: <FaLaugh key="2" className="text-yellow-500 icon-hover" />,
    3: <FaSurprise key="3" className="text-yellow-500 icon-hover" />,
    4: <FaSadTear key="4" className="text-yellow-500 icon-hover" />,
    5: <FaAngry key="5" className="text-yellow-500 icon-hover" />,
};

export { reactionTypeValue }
