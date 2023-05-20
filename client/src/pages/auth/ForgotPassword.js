import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useHelper from "../../helper/useHelper";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { indigo ,teal} from "@mui/material/colors";

const SignInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: teal[400],
    marginTop:20,
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const { request, response } = useHelper();
  const navigate = useNavigate();

  const handleFormData = (data) => {

    request("POST", "/auth/forgotpassword", data);
  };
  useEffect(()=>{
    if(response?.status){
        navigate("/auth/forgotpassword/twoway/otp",{state:response?.email});
    }
  },[response])


  return (
    <div className="flex justify-center my-16">
<div className=" flex flex-col md:w-1/3 ">
      <h3 className="text-center text-2xl  p-2   "><span className="underline">Forgot</span> password ?</h3>
      <p className="text-[14px] mt-12">Enter your email id  to get reset password otp </p>
      <form onSubmit={handleSubmit(handleFormData)} >
        <div>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
        </div>
        <span className="text-purple-400">
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" && "Email  is invalid"}
        </span>

        <div>
          <SignInButton type="submit" fullWidth variant="contained">
            Submit
          </SignInButton>
        </div>
      </form>
    </div>

    </div>
      );
};

export default ForgotPassword;
