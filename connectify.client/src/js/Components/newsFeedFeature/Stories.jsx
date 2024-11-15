const Stories = () => {
    return (
        <div className="mb-8">
            <h3 className="font-extrabold text-2xl  text-black dark:text-white hidden">
                {" "}
                Stories
            </h3>
            <div
                className="relative"
                tabIndex={-1}
                uk-slider="auto play: true;finite: true"
                uk-lightbox=""
            >
                <div className="py-5 uk-slider-container">
                    <ul
                        className="uk-slider-items w-[calc(100%+14px)]"
                        uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
                    >
                        <li className="md:pr-3" uk-scrollspy-class="uk-animation-fade">
                            <div
                                className="md:w-16 md:h-16 w-12 h-12 rounded-full relative border-2 border-dashed grid place-items-center bg-slate-200 border-slate-300 dark:border-slate-700 dark:bg-dark2 shrink-0"
                                uk-toggle="target: #create-story"
                            >
                                <ion-icon name="camera" className="text-2xl" />
                            </div>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-1.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-2.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-4.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-5.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-1.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-7.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-1.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-2.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-2.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-4.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-5.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-6.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                            <a
                                href="assets/images/avatars/avatar-lg-1.jpg"
                                data-caption="Caption 1"
                            >
                                <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                    <img
                                        src="assets/images/avatars/avatar-7.jpg"
                                        alt=""
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </li>
                        <li className="md:pr-3 pr-2">
                            <div className="md:w-16 md:h-16 w-12 h-12 bg-slate-200/60 rounded-full dark:bg-dark2 animate-pulse" />
                        </li>
                    </ul>
                </div>
                <div className="max-md:hidden">
                    <button
                        type="button"
                        className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3"
                        uk-slider-item="previous"
                    >
                        {" "}
                        <ion-icon name="chevron-back" className="text-2xl" />
                    </button>
                    <button
                        type="button"
                        className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3"
                        uk-slider-item="next"
                    >
                        {" "}
                        <ion-icon name="chevron-forward" className="text-2xl" />{" "}
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Stories;
