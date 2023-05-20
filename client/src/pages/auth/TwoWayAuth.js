import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useHelper from "../../helper/useHelper";
import { useNavigate, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { indigo,teal } from "@mui/material/colors";

const SignInButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: teal[400],
  marginTop:20,
  "&:hover": {
    backgroundColor: indigo[600],
  },
}));

const TwoWayAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { request, response } = useHelper();
  const handleFormData = (data) => {


    request("POST", "/auth/forgotpassword/twoway/verifyotp", {
      email: state,
      otp: data.otp,
    });
  };

  useEffect(() => {
    if (response?.status) {
      navigate("/auth/resetpassword", { state: response?.email });
    }
  }, [response]);
  return (
    <div className="flex justify-center my-16">
      <div className=" flex flex-col md:w-1/3 ">
        <h3 className="text-center text-2xl">Recovery</h3>
        <p className="text-[14px] mt-12">Enter your one time otp </p>
        <form onSubmit={handleSubmit(handleFormData)}>
          <div>
            <TextField
              margin="normal"
              fullWidth
              id="otp"
              name="otp"
              autoComplete="otp"
              autoFocus
              {...register("otp", {
                required: true,
                minLength: 6,
                maxLength: 6,
              })}
            />
          </div>
          <span className="span-error">
            {errors.otp?.type === "required" && "otp is required"}
            {errors.otp?.type === "minLength" &&
              "otp  must be of 6 characters long"}
            {errors.otp?.type === "maxLength" &&
              "otp  must not be more than 6 characters "}
          </span>
          <div>
            <SignInButton type="submit" fullWidth variant="contained">
              Recover
            </SignInButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoWayAuth;
