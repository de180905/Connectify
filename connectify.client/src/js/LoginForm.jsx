import React from 'react';
import { signin } from './api/authen';
import { useNavigate, Link } from "react-router-dom";
import { getRouteParams } from './Utils/routing';

function LoginForm() {
    const params = getRouteParams();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState(params.get("email"));
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    async function handleSignIn() {
        const response = await signin(email, password);
        if (!response.success) {
            setErrorMessage(response.message)
        }
        else {
            const data = response.data;
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            if (response.data.needEmailVerified) {
                navigate("/account/verify-email/" + email);
            } else {
                navigate("/");
            }
        }
    }
  return (
      <>
          {/* title */}
          <div>
              <h2 className="text-2xl font-semibold mb-1.5">
                  {" "}
                  Sign in to your account{" "}
              </h2>
              <p className="text-sm text-gray-700 font-normal">
                  If you haven’t signed up yet.{" "}
                  <a href="/account/register" className="text-blue-700">
                      Register here!
                  </a>
              </p>
          </div>
          {/* form */}
          <form
              method="#"
              action="#"
              className="space-y-7 text-sm text-black font-medium dark:text-white"
              uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
              onSubmit={(event) => {
                  event.preventDefault();
                  handleSignIn();
              }}
          >
              {/* email */}
              <div>
                  <label htmlFor="email" className="">
                      Email address
                  </label>
                  <div className="mt-2.5">
                      <input
                          id="email"
                          name="email"
                          type="email"
                          autoFocus=""
                          placeholder="Email"
                          required=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                      />
                  </div>
              </div>
              {/* password */}
              <div>
                  <label htmlFor="email" className="">
                      Password
                  </label>
                  <div className="mt-2.5">
                      <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="***"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                      />
                  </div>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                      <input id="rememberme" name="rememberme" type="checkbox" />
                      <label htmlFor="rememberme" className="font-normal">
                          Remember me
                      </label>
                  </div>
                  <a href="#" className="text-blue-700">
                      Forgot password{" "}
                  </a>
              </div>
              {/* submit button */}
              <div>
                  <button type="submit" className="button bg-primary text-white w-full">
                      Sign in
                  </button>
              </div>
              {/* Error message */}
              {errorMessage && (
                  <div className="text-red-500 text-center mt-2">
                      {errorMessage}
                  </div>
              )}
              <div className="text-center flex items-center gap-6">
                  <hr className="flex-1 border-slate-200 dark:border-slate-800" />
                  Connectify - Remake your life
                  <hr className="flex-1 border-slate-200 dark:border-slate-800" />
              </div>
              
          </form>
      </>
  );
}

export default LoginForm;