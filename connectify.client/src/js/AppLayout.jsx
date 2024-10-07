import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet, Link } from "react-router-dom";
const AppLayout = () => {
    return (
        <>
            <div id="wrapper">
                <Header />
                <Sidebar />
                <Outlet/>
            </div>
        </>
    )
}
export default AppLayout;