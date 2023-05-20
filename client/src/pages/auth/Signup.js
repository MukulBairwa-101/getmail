import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useHelper from "../../helper/useHelper";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import { VscEye, VscEyeClosed } from "../../util/data";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [togglePassword, setTogglePassword] = useState(false);

  const { request, response } = useHelper();

  useEffect(() => {
    if (response) {
      navigate("/auth/signin");
    }
  }, [response]);

  //   handlers

  const passwordVisibility = (e) => {
    const { name, value } = e.target;
    if (name === value) {
      setTogglePassword(!togglePassword);
    }
  };

  const handleFormData = (data) => {
    request("POST", "/auth/signup", data);
  };

  return (
    <div className="flex justify-center w-full">
      <div class="w-full max-w-sm">
        <div className="flex flex-col w-1/6 m-auto ">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
          <h2 className="txet-2xl"> GetMail</h2>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2"
          onSubmit={handleSubmit(handleFormData)}
        >
          <div className="mb-4">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="firstname"
            >
              Firstname
            </label>
            <input
              class={`shadow appearance-none border ${
                errors.firstname ? "border-red-500" : "none"
              }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              {...register("firstname", {
                required: true,
                minLength: 3,
              })}
            />
            <span className="text-rose-300 text-sm   ">
              {errors.firstname?.type === "required" && "Firstname is required"}
              {errors.firstname?.type === "minLength" &&
                "Firstname must be of 3 characters long"}
            </span>
          </div>

          <div className="mb-4">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="lastname"
            >
              Lastname
            </label>
            <input
              class={`shadow appearance-none border ${
                errors.lastname ? "border-red-500" : "none"
              }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              {...register("lastname", {
                required: true,
                minLength: 3,
              })}
            />
            <span className="text-rose-300 text-sm   ">
              {errors.lastname?.type === "required" && "Lastname is required"}
              {errors.lastname?.type === "minLength" &&
                "Lastname must be of 3 characters long"}
            </span>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class={`shadow appearance-none border ${
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
          <div class="mb-6 relative ">
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
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class={`shadow appearance-none border ${
                errors.password ? "border-red-500" : "none"
              }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              name="password"
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
          <div class="flex items-center justify-between mb-6">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <hr />
          <div className="my-4 text-center">
            <span>Already have an account?</span>{" "}
            <span
              className="text-purple-400 cursor-pointer"
              onClick={() => navigate("/auth/signin")}
            >
              Sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
