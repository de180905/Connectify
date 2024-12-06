import React from 'react';
import { Outlet, Link } from "react-router-dom";
function LoginLayout() {
  return (
      <div className="sm:flex">
          <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
              <div
                  className="w-full lg:max-w-sm mx-auto space-y-10"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
              >
                  <Outlet/>
              </div>
          </div>
          {/* image slider */}
          <div className="flex-1 relative bg-primary max-md:hidden">
              <div
                  className="relative w-full h-full"
                  tabIndex={-1}
                  uk-slideshow="animation: slide; autoplay: true"
              >
                  <ul className="uk-slideshow-items w-full h-full">
                      <li className="w-full">
                          <img
                              src="assets/images/post/img-3.jpg"
                              alt=""
                              className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
                          />
                          <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                              <div
                                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                              >
                                  <h4
                                      className="!text-white text-2xl font-semibold mt-7"
                                      uk-slideshow-parallax="y: 600,0,0"
                                  >
                                      {" "}
                                      Connect With Friends{" "}
                                  </h4>
                                  <p
                                      className="!text-white text-lg mt-7 leading-8"
                                      uk-slideshow-parallax="y: 800,0,0;"
                                  >
                                      {" "}
                                      This phrase is more casual and playful. It suggests that you are
                                      keeping your friends updated on what is happening in your life.
                                  </p>
                              </div>
                          </div>
                          <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0" />
                      </li>
                      <li className="w-full">
                          <img
                              src="/assets/images/post/img-2.jpg"
                              alt=""
                              className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
                          />
                          <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                              <div
                                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                              >
                                  <h4
                                      className="!text-white text-2xl font-semibold mt-7"
                                      uk-slideshow-parallax="y: 800,0,0"
                                  >
                                      {" "}
                                      Connect With Friends{" "}
                                  </h4>
                                  <p
                                      className="!text-white text-lg mt-7 leading-8"
                                      uk-slideshow-parallax="y: 800,0,0;"
                                  >
                                      {" "}
                                      This phrase is more casual and playful. It suggests that you are
                                      keeping your friends updated on what is happening in your life.
                                  </p>
                              </div>
                          </div>
                          <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0" />
                      </li>
                  </ul>
                  {/* slide nav */}
                  <div className="flex justify-center">
                      <ul className="inline-flex flex-wrap justify-center  absolute bottom-8 gap-1.5 uk-dotnav uk-slideshow-nav">
                          {" "}
                      </ul>
                  </div>
              </div>
          </div>
      </div>

  );
}

export default LoginLayout;