import AvatarUpload from "../utils/AvatarUpload";
import ChangePassword from "../password/ChangePassword";
import UserDescription from "./UserDescription";

const UserSettings = () => {
    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            <div className="max-w-3xl mx-auto">
                <div className="box relative rounded-lg shadow-md">
                    <AvatarUpload />
                    {/* nav tabs */}
                    <div className="relative border-b" tabIndex={-1} uk-slider="finite: true">
                        <nav className="uk-slider-container overflow-hidden nav__underline px-6 p-0 border-transparent -mb-px">
                            <ul
                                className="uk-slider-items w-[calc(100%+10px)] !overflow-hidden"
                                uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                            >
                                <li className="w-auto pr-2.5">
                                    {" "}
                                    <a href="#"> Description </a>{" "}
                                </li>
                                <li className="w-auto pr-2.5">
                                    {" "}
                                    <a href="#"> Account settings</a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Setting</a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Avatare</a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Invites</a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Finish</a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Description </a>{" "}
                                </li>
                                <li className="w-auto invisible pr-2.5">
                                    {" "}
                                    <a href="#"> Setting</a>{" "}
                                </li>
                            </ul>
                        </nav>
                        <a
                            className="absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2 py-1 justify-start bg-gradient-to-r from-white via-white dark:from-slate-800 dark:via-slate-800"
                            href="#"
                            uk-slider-item="previous"
                        >
                            {" "}
                            <ion-icon name="chevron-back" className="text-2xl ml-1" />{" "}
                        </a>
                        <a
                            className="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2 py-1 justify-end bg-gradient-to-l from-white via-white dark:from-slate-800 dark:via-slate-800"
                            href="#"
                            uk-slider-item="next"
                        >
                            {" "}
                            <ion-icon name="chevron-forward" className="text-2xl mr-1" />{" "}
                        </a>
                    </div>
                    <div
                        id="setting_tab"
                        className="uk-switcher md:py-12 md:px-20 p-6 overflow-hidden text-black text-sm"
                    >
                        {/* tab user basic info */}
                        <UserDescription />
                        {/* tab password*/}
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </main>
    )
}
export default UserSettings;
