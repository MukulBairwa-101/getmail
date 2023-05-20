import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useHelper from "../../helper/useHelper";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import Avatar from "@mui/material/Avatar";
import { VscEye, VscEyeClosed } from "../../util/data";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";

import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [togglePassword, setTogglePassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { request, response } = useHelper();
  const { request: googleReq, response: googleRes } = useHelper();

  const notify = (text) => {
    toast.error(text);
  };
  useEffect(() => {
    if (response) {
      sessionStorage.setItem("LOGGED_IN_USER", JSON.stringify(response));
      if (
        JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"))?.user
          ?.access_token &&
        response
      ) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      else {
       notify(response?.message);
     }
    }
    if (googleRes) {
      sessionStorage.setItem("LOGGED_IN_USER", JSON.stringify(googleRes));
      if (
        JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"))?.user?.access_token
      ) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  }, [response, googleRes]);

  //   handlers

  const passwordVisibility = (e) => {
    const { name, value } = e.target;
    if (name === value) {
      setTogglePassword(!togglePassword);
    }
  };

  const handleFormData = (data) => {
    request("POST", "/auth/signin", data);
    setIsClicked(true)
  };

  const handleCallbackResponse = (response) => {};

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        plugin_name: "chat",
        scope: "profile",
      });
    });
  }, []);

  const responseGoogle = (googleResponse) => {
    if (googleResponse) {
      googleReq("POST", "/auth/google", googleResponse.profileObj);
    }
  };

  const responseErrorGoogle = (googleResponse) => {};



  return (
    <>
      <ToastContainer />
      <div className="flex justify-center w-full">
        <div className="w-full max-w-xs">
          <div className="flex flex-col w-1/5 m-auto ">
            <Avatar sx={{ m: 2, bgcolor: "primary.main" }} />
            <h2 className="text-xl text-center tracking-wide"> GetMail</h2>
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2"
            onSubmit={handleSubmit(handleFormData)}
          >
            <div class="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border ${
                  errors.email ? "border-red-500" : "none"
                }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
              <span className="text-rose-300 text-sm   ">
                {errors.email?.type === "required" && "Email is required"}
                {errors.email?.type === "pattern" && "Email  is invalid"}
              </span>
            </div>
            <div className="mb-6 relative ">
              {togglePassword ? (
                <VscEyeClosed
                  onClick={passwordVisibility}
                  className="absolute  z-10	 right-4  top-10"
                />
              ) : (
                <VscEye
                  onClick={passwordVisibility}
                  className="absolute z-10	 right-4  top-10"
                />
              )}
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border ${
                  errors.password ? "border-red-500" : "none"
                }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                name="password"
                // placeholder=""
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                })}
                type={togglePassword ? "text" : "password"}
              />
              <span className="text-rose-300 text-sm  ">
                {errors.password?.type === "required" && "Password is required"}
                {errors.password?.type === "pattern" && "Password  is invalid"}
                {errors.password?.type === "minLength" &&
                  "Password must be of 6 characters"}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <div className="py-1 px-2 flex justify-center items-center">
                {
                  !response  && isClicked ?
                  <>
                  <Loader />
                  Signin
                  </>
                  : response && isClicked ? 'Signed in'
                  : 'Sign In'
                }

                </div>
               
              </button>
              <p
                className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/auth/forgotpassword")}
              >
                Forgot Password?
              </p>
            </div>
            <hr />
            <div className="m-4 flex justify-center">
              <GoogleLogin
                clientId="723659888695-7n73umrg5sf4d3no2lenrne3u0qg852a.apps.googleusercontent.com"
                buttonText="Sign in with google"
                onSuccess={responseGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="my-4">
              <span>doesn't have an account yet?</span>{" "}
              <span
                className="text-purple-400 cursor-pointer"
                onClick={() => navigate("/auth/signup")}
              >
                create
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
