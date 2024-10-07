import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ mainContent, subContent }) => {
    return (
        <>
            <div id="wrapper">
                <Header />
                <Sidebar />
                {mainContent}
            </div>
        </>
    )
}

export default MainLayout;
