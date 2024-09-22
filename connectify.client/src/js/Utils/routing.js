import { useLocation } from "react-router-dom"; // Import useLocation

function getRouteParams() {
    return new URLSearchParams(useLocation().search);
}

export { getRouteParams }
