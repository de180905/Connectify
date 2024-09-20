const GroupTimeline = () => {
    return (
        <main
            id="site__main"
            className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
        >
            <div className="max-w-[1065px] mx-auto">
                {/* cover  */}
                <div className="bg-white shadow lg:rounded-b-2xl lg:-mt-10 dark:bg-dark2">
                    {/* cover */}
                    <div className="relative overflow-hidden w-full lg:h-72 h-36">
                        <img
                            src="assets/images/group/group-cover.jpg"
                            alt=""
                            className="h-full w-full object-cover inset-0"
                        />
                        {/* overly */}
                        <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from -black/60 pt-10 z-10" />
                        <div className="absolute bottom-0 right-0 m-4 z-20">
                            <div className="flex items-center gap-3">
                                <button className="button bg-white/20 text-white flex items-center gap-2 backdrop-blur-small">
                                    Crop
                                </button>
                                <button className="button bg-black/10 text-white flex items-center gap-2 backdrop-blur-small">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:px-10 md:p-5 p-3">
                        <div className="flex flex-col justify-center">
                            <div className="flex lg:items-center justify-between max-md:flex-col">
                                <div className="flex-1">
                                    <h3 className="md:text-2xl text-base font-bold text-black dark:text-white">
                                        {" "}
                                        Friends Forever{" "}
                                    </h3>
                                    <p className=" font-normal text-gray-500 mt-2 flex gap-2 flex-wrap dark:text-white/80">
                                        <span className="max-lg:hidden"> Public group </span>
                                        <span className="max-lg:hidden"> • </span>
                                        <span>
                                            {" "}
                                            <b className="font-medium text-black dark:text-white">
                                                1.2K
                                            </b>{" "}
                                            likes{" "}
                                        </span>
                                        <span className="max-lg:hidden"> • </span>
                                        <span>
                                            {" "}
                                            <b className="font-medium text-black dark:text-white">
                                                1.4K
                                            </b>{" "}
                                            followers{" "}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex -space-x-4 mr-3">
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="w-10 rounded-full border-4 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="w-10 rounded-full border-4 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="w-10 rounded-full border-4 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-4.jpg"
                                                alt=""
                                                className="w-10 rounded-full border-4 border-white dark:border-slate-800"
                                            />
                                            <img
                                                src="assets/images/avatars/avatar-5.jpg"
                                                alt=""
                                                className="w-10 rounded-full border-4 border-white dark:border-slate-800"
                                            />
                                        </div>
                                        <button className="button bg-primary flex items-center gap-1 text-white py-2 px-3.5 shadow ml-auto">
                                            <ion-icon name="add-outline" className="text-xl" />
                                            <span className="text-sm"> Join</span>
                                        </button>
                                        <div>
                                            <button
                                                type="button"
                                                className="rounded-lg bg-secondery flex px-2.5 py-2 dark:bg-dark2"
                                            >
                                                <ion-icon
                                                    name="ellipsis-horizontal"
                                                    className="text-xl"
                                                ></ion-icon>
                                            </button>
                                            <div
                                                className="w-[240px]"
                                                uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10"
                                            >
                                                <nav>
                                                    <a href="#">
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="pricetags-outline"
                                                        />{" "}
                                                        Unfollow{" "}
                                                    </a>
                                                    <a href="#">
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="share-outline"
                                                        />{" "}
                                                        Share
                                                    </a>
                                                    <a href="#">
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="link-outline"
                                                        />{" "}
                                                        Copy link{" "}
                                                    </a>
                                                    <a href="#">
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="chatbubble-ellipses-outline"
                                                        />{" "}
                                                        Sort comments{" "}
                                                    </a>
                                                    <a href="#">
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="flag-outline"
                                                        />{" "}
                                                        Report group
                                                    </a>
                                                    <hr />
                                                    <a
                                                        href="#"
                                                        className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                                                    >
                                                        {" "}
                                                        <ion-icon
                                                            className="text-xl"
                                                            name="stop-circle-outline"
                                                        />{" "}
                                                        Block{" "}
                                                    </a>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between  border-t border-gray-100 px-2 dark:border-slate-700">
                        <nav className="flex gap-0.5 rounded-xl overflow-hidden -mb-px text-gray-500 font-medium text-sm overflow-x-auto dark:text-white">
                            <a
                                href="#"
                                className="inline-block py-3 leading-8 px-3.5 border-b-2 border-blue-600 text-blue-600"
                            >
                                Discussion
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Files
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Photos
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Event
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Video
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Members
                            </a>
                            <a href="#" className="inline-block py-3 leading-8 px-3.5">
                                Media
                            </a>
                        </nav>
                        <div className="flex items-center gap-1 text-sm p-3 bg-secondery py-2 mr-2 rounded-xl max-md:hidden dark:bg-white/5">
                            <ion-icon name="search" className="text-lg" />
                            <input placeholder="Search .." className="!bg-transparent" />
                        </div>
                    </div>
                </div>
                <div
                    className="flex 2xl:gap-12 gap-10 mt-8 max-lg:flex-col"
                    id="js-oversized"
                >
                    {/* feed story */}
                    <div className="flex-1 xl:space-y-6 space-y-3">
                        {/* add story */}
                        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 text-sm font-medium border1 dark:bg-dark2">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3"
                                    uk-toggle="target: #create-status"
                                >
                                    <div className="py-2.5 text-center dark:text-white">
                                        {" "}
                                        What do you have in mind?{" "}
                                    </div>
                                </div>
                                <div
                                    className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-lg transition-all bg-pink-100/60 hover:bg-pink-100"
                                    uk-toggle="target: #create-status"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 stroke-pink-600 fill-pink-200/70"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#2c3e50"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 8h.01" />
                                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                                        <path d="M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5" />
                                        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5" />
                                    </svg>
                                </div>
                                <div
                                    className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-lg transition-all bg-sky-100/60 hover:bg-sky-100"
                                    uk-toggle="target: #create-status"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 stroke-sky-600 fill-sky-200/70 "
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#2c3e50"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                                        <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/*  post image*/}
                        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">
                            {/* post heading */}
                            <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                <a href="timeline.html">
                                    {" "}
                                    <img
                                        src="assets/images/avatars/avatar-3.jpg"
                                        alt=""
                                        className="w-9 h-9 rounded-full"
                                    />{" "}
                                </a>
                                <div className="flex-1">
                                    <a href="timeline.html">
                                        {" "}
                                        <h4 className="text-black dark:text-white">
                                            {" "}
                                            Monroe Parker{" "}
                                        </h4>{" "}
                                    </a>
                                    <div className="text-xs text-gray-500 dark:text-white/80">
                                        {" "}
                                        2 hours ago
                                    </div>
                                </div>
                                <div className="-mr-1">
                                    <button type="button" className="button-icon w-8 h-8">
                                        {" "}
                                        <ion-icon className="text-xl" name="ellipsis-horizontal" />{" "}
                                    </button>
                                    <div
                                        className="w-[245px]"
                                        uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
                                    >
                                        <nav>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0"
                                                    name="bookmark-outline"
                                                />{" "}
                                                Add to favorites{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0"
                                                    name="notifications-off-outline"
                                                />{" "}
                                                Mute Notification{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0"
                                                    name="flag-outline"
                                                />{" "}
                                                Report this post{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0"
                                                    name="share-outline"
                                                />{" "}
                                                Share your profile{" "}
                                            </a>
                                            <hr />
                                            <a
                                                href="#"
                                                className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                                            >
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0"
                                                    name="stop-circle-outline"
                                                />{" "}
                                                Unfollow{" "}
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            {/* post image */}
                            <div className="relative w-full lg:h-96 h-full sm:px-4">
                                <img
                                    src="assets/images/post/img-2.jpg"
                                    alt=""
                                    className="sm:rounded-lg w-full h-full object-cover"
                                />
                            </div>
                            {/* post icons */}
                            <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            type="button"
                                            className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"
                                        >
                                            {" "}
                                            <ion-icon className="text-lg" name="heart" />{" "}
                                        </button>
                                        <a href="#">1,300</a>
                                    </div>
                                    <div
                                        className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl"
                                        uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left"
                                    >
                                        <div
                                            className="flex gap-2"
                                            uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                                        >
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 👍 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> ❤️ </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😂 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😯 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😢 </span>
                                            </button>
                                        </div>
                                        <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="button-icon bg-slate-200/70 dark:bg-slate-700"
                                    >
                                        {" "}
                                        <ion-icon className="text-lg" name="chatbubble-ellipses" />{" "}
                                    </button>
                                    <span>260</span>
                                </div>
                                <button type="button" className="button-icon ml-auto">
                                    {" "}
                                    <ion-icon className="text-xl" name="paper-plane-outline" />{" "}
                                </button>
                                <button type="button" className="button-icon">
                                    {" "}
                                    <ion-icon className="text-xl" name="share-outline" />{" "}
                                </button>
                            </div>
                            {/* comments */}
                            <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                                <div className="flex items-start gap-3 relative">
                                    <a href="timeline.html">
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="w-6 h-6 mt-1 rounded-full"
                                        />{" "}
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href="timeline.html"
                                            className="text-black font-medium inline-block dark:text-white"
                                        >
                                            {" "}
                                            Steeve{" "}
                                        </a>
                                        <p className="mt-0.5">What a beautiful photo! I love it. 😍 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <a href="timeline.html">
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-3.jpg"
                                            alt=""
                                            className="w-6 h-6 mt-1 rounded-full"
                                        />{" "}
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href="timeline.html"
                                            className="text-black font-medium inline-block dark:text-white"
                                        >
                                            {" "}
                                            Monroe{" "}
                                        </a>
                                        <p className="mt-0.5"> You captured the moment.😎 </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2"
                                >
                                    <ion-icon
                                        name="chevron-down-outline"
                                        className="ml-auto duration-200 group-aria-expanded:rotate-180"
                                    />
                                    More Comment
                                </button>
                            </div>
                            {/* add comment */}
                            <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                <img
                                    src="assets/images/avatars/avatar-7.jpg"
                                    alt=""
                                    className="w-6 h-6 rounded-full"
                                />
                                <div className="flex-1 relative overflow-hidden h-10">
                                    <textarea
                                        placeholder="Add Comment...."
                                        rows={1}
                                        className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                                        defaultValue={""}
                                    />
                                    <div
                                        className="!top-2 pr-2"
                                        uk-drop="pos: bottom-right; mode: click"
                                    >
                                        <div
                                            className="flex items-center gap-2"
                                            uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 fill-sky-600"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5 fill-pink-600"
                                            >
                                                <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
                                >
                                    {" "}
                                    Replay
                                </button>
                            </div>
                        </div>
                        {/* post text*/}
                        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">
                            {/* post heading */}
                            <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                <a href="timeline.html">
                                    {" "}
                                    <img
                                        src="assets/images/avatars/avatar-5.jpg"
                                        alt=""
                                        className="w-9 h-9 rounded-full"
                                    />{" "}
                                </a>
                                <div className="flex-1">
                                    <a href="timeline.html">
                                        {" "}
                                        <h4 className="text-black dark:text-white">
                                            {" "}
                                            John Michael{" "}
                                        </h4>{" "}
                                    </a>
                                    <div className="text-xs text-gray-500 dark:text-white/80">
                                        {" "}
                                        2 hours ago
                                    </div>
                                </div>
                                <div className="-mr-1">
                                    <button
                                        type="button"
                                        className="button__ico w-8 h-8"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {" "}
                                        <ion-icon
                                            className="text-xl md hydrated"
                                            name="ellipsis-horizontal"
                                            role="img"
                                            aria-label="ellipsis horizontal"
                                        />{" "}
                                    </button>
                                    <div
                                        className="w-[245px] uk-dropdown"
                                        uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
                                    >
                                        <nav>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0 md hydrated"
                                                    name="bookmark-outline"
                                                    role="img"
                                                    aria-label="bookmark outline"
                                                />{" "}
                                                Add to favorites{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0 md hydrated"
                                                    name="notifications-off-outline"
                                                    role="img"
                                                    aria-label="notifications off outline"
                                                />{" "}
                                                Mute Notification{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0 md hydrated"
                                                    name="flag-outline"
                                                    role="img"
                                                    aria-label="flag outline"
                                                />{" "}
                                                Report this post{" "}
                                            </a>
                                            <a href="#">
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0 md hydrated"
                                                    name="share-outline"
                                                    role="img"
                                                    aria-label="share outline"
                                                />{" "}
                                                Share your profile{" "}
                                            </a>
                                            <hr />
                                            <a
                                                href="#"
                                                className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                                            >
                                                {" "}
                                                <ion-icon
                                                    className="text-xl shrink-0 md hydrated"
                                                    name="stop-circle-outline"
                                                    role="img"
                                                    aria-label="stop circle outline"
                                                />{" "}
                                                Unfollow{" "}
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:px-4 p-2.5 pt-0">
                                <p className="font-normal">
                                    {" "}
                                    Photography is the art of capturing light with a camera. It can be
                                    used to create images that tell stories, express emotions, or
                                    document reality. it can be fun, challenging, or rewarding. It can
                                    also be a hobby, a profession, or a passion. 📷{" "}
                                </p>
                            </div>
                            {/* post icons */}
                            <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            type="button"
                                            className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"
                                        >
                                            {" "}
                                            <ion-icon className="text-lg" name="heart" />{" "}
                                        </button>
                                        <a href="#">1,300</a>
                                    </div>
                                    <div
                                        className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl"
                                        uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left"
                                    >
                                        <div
                                            className="flex gap-2"
                                            uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                                        >
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 👍 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> ❤️ </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😂 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😯 </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:scale-125 duration-300"
                                            >
                                                {" "}
                                                <span> 😢 </span>
                                            </button>
                                        </div>
                                        <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="button-icon bg-slate-200/70 dark:bg-slate-700"
                                    >
                                        {" "}
                                        <ion-icon className="text-lg" name="chatbubble-ellipses" />{" "}
                                    </button>
                                    <span>260</span>
                                </div>
                                <button type="button" className="button-icon ml-auto">
                                    {" "}
                                    <ion-icon className="text-xl" name="paper-plane-outline" />{" "}
                                </button>
                                <button type="button" className="button-icon">
                                    {" "}
                                    <ion-icon className="text-xl" name="share-outline" />{" "}
                                </button>
                            </div>
                            {/* comments */}
                            <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                                <div className="flex items-start gap-3 relative">
                                    <a href="timeline.html">
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="w-6 h-6 mt-1 rounded-full"
                                        />{" "}
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href="timeline.html"
                                            className="text-black font-medium inline-block dark:text-white"
                                        >
                                            {" "}
                                            Steeve{" "}
                                        </a>
                                        <p className="mt-0.5">
                                            {" "}
                                            I love taking photos of nature and animals. 🌳🐶
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <a href="timeline.html">
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-3.jpg"
                                            alt=""
                                            className="w-6 h-6 mt-1 rounded-full"
                                        />{" "}
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href="timeline.html"
                                            className="text-black font-medium inline-block dark:text-white"
                                        >
                                            {" "}
                                            Monroe{" "}
                                        </a>
                                        <p className="mt-0.5"> I enjoy people and emotions. 😊😢 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <a href="timeline.html">
                                        {" "}
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="w-6 h-6 mt-1 rounded-full"
                                        />{" "}
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href="timeline.html"
                                            className="text-black font-medium inline-block dark:text-white"
                                        >
                                            {" "}
                                            Jesse{" "}
                                        </a>
                                        <p className="mt-0.5"> Photography is my passion. 🎨📸 </p>
                                    </div>
                                </div>
                            </div>
                            {/* add comment */}
                            <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                <img
                                    src="assets/images/avatars/avatar-7.jpg"
                                    alt=""
                                    className="w-6 h-6 rounded-full"
                                />
                                <div className="flex-1 relative overflow-hidden h-10">
                                    <textarea
                                        placeholder="Add Comment...."
                                        rows={1}
                                        className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        defaultValue={""}
                                    />
                                    <div
                                        className="!top-2 pr-2 uk-drop"
                                        uk-drop="pos: bottom-right; mode: click"
                                    >
                                        <div
                                            className="flex items-center gap-2"
                                            uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 fill-sky-600"
                                                style={{ opacity: 0 }}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5 fill-pink-600"
                                                style={{ opacity: 0 }}
                                            >
                                                <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
                                >
                                    {" "}
                                    Replay
                                </button>
                            </div>
                        </div>
                        {/* placeholder */}
                        <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                                <div className="flex-1 space-y-3">
                                    <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                                    <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                            </div>
                            <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>
                            <div className="flex gap-3">
                                <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                                <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                                <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                                <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[400px]">
                        <div
                            className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
                            uk-sticky="media: 1024; end: #js-oversized; offset: 80"
                        >
                            {/* group info */}
                            <div className="box p-5 px-6">
                                <div className="flex items-ce justify-between text-black dark:text-white">
                                    <h3 className="font-bold text-lg"> About </h3>
                                    <a href="#" className="text-sm text-blue-500">
                                        Edit
                                    </a>
                                </div>
                                <ul className="text-gray-700 space-y-4 mt-2 mb-1 text-sm dark:text-white">
                                    <li>
                                        {" "}
                                        This group, it's not a group of Dr. Adan Adam, and she don't
                                        know about it , it's a group for peaple.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                                            />
                                        </svg>
                                        <div>
                                            <span className="font-semibold text-black dark:text-white">
                                                Public
                                            </span>
                                            <p> Anyone can see who's in the group and what they post.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <div>
                                            <span className="font-semibold text-black dark:text-white">
                                                {" "}
                                                Visible{" "}
                                            </span>
                                            <p> Anyone can find this group</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                            />
                                        </svg>
                                        <div>
                                            {" "}
                                            Members{" "}
                                            <span className="font-semibold text-black dark:text-white">
                                                {" "}
                                                3,240 People{" "}
                                            </span>{" "}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* group media  */}
                            <div className="box p-5 px-6">
                                <div className="flex items-baseline justify-between text-black dark:text-white">
                                    <h3 className="font-bold text-base"> Recent Media </h3>
                                    <a href="#" className="text-sm text-blue-500">
                                        See all
                                    </a>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-center text-sm mt-4 mb-2 rounded-lg overflow-hidden">
                                    <div className="relative w-full aspect-[4/3]">
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="object-cover w-full h-full inset-0"
                                        />
                                    </div>
                                    <div className="relative w-full aspect-[4/3]">
                                        <img
                                            src="assets/images/avatars/avatar-7.jpg"
                                            alt=""
                                            className="object-cover w-full h-full inset-0"
                                        />
                                    </div>
                                    <div className="relative w-full aspect-[4/3]">
                                        <img
                                            src="assets/images/avatars/avatar-4.jpg"
                                            alt=""
                                            className="object-cover w-full h-full inset-0"
                                        />
                                    </div>
                                    <div className="relative w-full aspect-[4/3]">
                                        <img
                                            src="assets/images/avatars/avatar-6.jpg"
                                            alt=""
                                            className="object-cover w-full h-full inset-0"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* related group  */}
                            <div className="box p-5 px-6">
                                <div className="flex items-baseline justify-between text-black dark:text-white">
                                    <h3 className="font-bold text-base"> Suggested groups </h3>
                                    <a href="#" className="text-sm text-blue-500">
                                        See all
                                    </a>
                                </div>
                                <div className="side-list">
                                    <div className="side-list-item">
                                        <a href="timeline-group.html">
                                            <img
                                                src="assets/images/group/group-3.jpg"
                                                alt=""
                                                className="side-list-image rounded-md"
                                            />
                                        </a>
                                        <div className="flex-1">
                                            <a href="timeline-group.html">
                                                <h4 className="side-list-title"> Abstract minimal </h4>
                                            </a>
                                            <div className="side-list-info"> 218 Members </div>
                                        </div>
                                        <button className="button bg-primary text-white">Join</button>
                                    </div>
                                    <div className="side-list-item">
                                        <a href="timeline-group.html">
                                            <img
                                                src="assets/images/group/group-4.jpg"
                                                alt=""
                                                className="side-list-image rounded-md"
                                            />
                                        </a>
                                        <div className="flex-1">
                                            <a href="timeline-group.html">
                                                <h4 className="side-list-title"> Delicious Foods</h4>
                                            </a>
                                            <div className="side-list-info"> 325 Members </div>
                                        </div>
                                        <button className="button bg-primary text-white">Join</button>
                                    </div>
                                    <div className="side-list-item">
                                        <a href="timeline-group.html">
                                            <img
                                                src="assets/images/group/group-5.jpg"
                                                alt=""
                                                className="side-list-image rounded-md"
                                            />
                                        </a>
                                        <div className="flex-1">
                                            <a href="timeline-group.html">
                                                <h4 className="side-list-title"> Property Rent </h4>
                                            </a>
                                            <div className="side-list-info"> 158 Members </div>
                                        </div>
                                        <button className="button bg-primary text-white">Join</button>
                                    </div>
                                    <div className="side-list-item">
                                        <a href="timeline-group.html">
                                            <img
                                                src="assets/images/group/group-5.jpg"
                                                alt=""
                                                className="side-list-image rounded-md"
                                            />
                                        </a>
                                        <div className="flex-1">
                                            <a href="timeline-group.html">
                                                <h4 className="side-list-title"> Graphic Design </h4>
                                            </a>
                                            <div className="side-list-info"> 142 Members </div>
                                        </div>
                                        <button className="button bg-primary text-white">Join</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}
export default GroupTimeline;