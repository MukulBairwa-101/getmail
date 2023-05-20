import React, { useEffect ,useState} from 'react'
import { useForm } from "react-hook-form";
import useHelper from "../../helper/useHelper";
import {useNavigate,useLocation} from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { indigo ,teal} from "@mui/material/colors";
import {VscEye,VscEyeClosed} from "../../util/data";


const SignInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: teal[400],
    marginTop:20,
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));



const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        formState,
        getValues
      } = useForm();
      const navigate = useNavigate();

      const [passwordVisibility,setPasswordVisibility]= useState(false);
      const [confirmPasswordVisibility,setConfirmPasswordVisibility]= useState(false);

      const {state}= useLocation();

      const { request, response } = useHelper();

      const handleFormData = (data) => {
        request("POST", "/auth/resetpassword", {password:data.password,email:state});
      };

      const togglePassword =(attribute)=>{
        if(attribute ===  'passwordToggle'){
            setPasswordVisibility(!passwordVisibility);
        }
        if(attribute === 'confirmPasswordToggle'){
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }
    
      useEffect(()=>{
        if(response?.status){
            navigate("/auth/signin");
        }
      },[response]);
  return (
    <div className="flex justify-center my-16">
<div className=" flex flex-col md:w-1/3 ">
        <h3 className="text-center text-2xl">Reset password</h3>
        <form onSubmit={handleSubmit(handleFormData)}>
        <div className="relative">
       
            <h4 className="text-[14px] mt-8">Enter new password</h4>
            {passwordVisibility ? (
            <VscEyeClosed onClick={()=>togglePassword("passwordToggle")}  className="absolute z-10	  right-4  top-14"/>
          ) : (
            <VscEye onClick={()=>togglePassword("passwordToggle")}  className="absolute z-10	 right-4  top-14"/>
          )}
        <TextField
            margin="normal"
            type={passwordVisibility ? "text" : "password"}
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />
        </div>
        <span >
          {errors.password?.type === "required" && "Password is required"}
          {errors.password?.type === "pattern" && "Password  is invalid"}
          {errors.password?.type === "minLength" &&
            "Password must be of 6 characters"}
        </span>

        <div className="relative">
        <h4 className="text-[14px] mt-8">Re-enter new password</h4>
        {confirmPasswordVisibility ? (
            <VscEyeClosed onClick={()=>togglePassword("confirmPasswordToggle")} className="absolute z-10	  right-4  top-14"/>
          ) : (
            <VscEye onClick={()=>togglePassword("confirmPasswordToggle")} className="absolute z-10	 right-4  top-14"/>
          )}
        <TextField
            margin="normal"
            type={confirmPasswordVisibility ? "text" : "password"}
            fullWidth
            id="confirmpassword"
            label="Confirm password"
            name="confirmpassword"
            autoComplete="confirmpassword"
            autoFocus
            {...register("confirmpassword", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              validate:value => value === getValues("password")
            })}
          />
        </div>
        <span >
          {errors.confirmpassword?.type === "required" && "Password is required"}
          {errors.confirmpassword?.type === "pattern" && "Password  is invalid"}
          {errors.confirmpassword?.type === "minLength" &&
            "Password must be of 6 characters"}
            {errors.confirmpassword?.type === "validate" &&
            "Password do not match"}
        </span>
        <div>
          <SignInButton type="submit" fullWidth variant="contained">
            Submit
          </SignInButton>
        </div>
        </form>
    </div>
    </div>
    
  )
}

export default ResetPassword;