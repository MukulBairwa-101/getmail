import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useHelper from "../helper/useHelper";
import { getOne } from "../Redux/Action";
import { BsArrowLeftShort } from "../util/data";
import Avatar from "@mui/material/Avatar";
import { colorSet } from "../util/data";

const Mail = () => {
  const { purple, blue, green, yellow, defaultColor, indigo, deepOrange } =
    colorSet;

  let result = 0,
    avatarValue = "";
  let loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

  let { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const mail =
    useSelector((state) => state.appReducer?.mail) ??
    JSON.parse(localStorage.getItem("ONE_MAIL"));

  const { request, response } = useHelper();

  const getUserColorcode = () => {
    if (loggedInUser.email === mail?.from) {
      avatarValue = mail?.to.substring(0, 1) ?? 'd';
    } else {
      avatarValue = mail?.from.substring(0, 1) ?? 'd';
    }

    result = avatarValue.charCodeAt(0);
  };

  useEffect(() => {
    request("GET", `/mailbox/getOne/${id}`);
   
  }, []);

  useEffect(() => {
    if (response) {
      dispatch(getOne(response?.mail));
      getUserColorcode();
    }
  }, [response]);

 

  return (
    <div className="flex flex-col justify-between gap-4 mb-24   font-poppins  ">
      <div
        id="mail_header"
        className="border-b border-solid border-gray-100 sm:p-6 fixed w-full  sm:ml-[-33px] mt-[-28px]  z-10 bg-[white]  "
      >
        <BsArrowLeftShort
          className="text-4xl text-slate-600 font-bold  p-2 cursor-pointer  hover:rounded-full hover:bg-slate-50 "
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex flex-col justify-between gap-2  mt-12 sm:mt-28 ">
        <div className="px-3 sm:px-1 md:px-16 relative mb-6   ">
          <h2 className=" text-xl sm:text-2xl text-gray-700   p-2 ">
            {mail?.subject}
          </h2>
        </div>
        <div
          id="mail_body"
          className=" px-2 sm:px-1 md:px-16 mt-8 flex  flex-col gap-8 "
        >
          <div className="flex  justify-start items-center gap-6  ">
            <Avatar
              sx={{
                bgcolor: `${
                  result >= 97 && result <= 106
                    ? purple
                    : result >= 107 && result <= 115
                    ? green
                    : result >= 116 && result <= 122
                    ? blue
                    : result >= 65 && result <= 70
                    ? indigo
                    : result >= 71 || result <= 78
                    ? yellow
                    : result >= 79 || result <= 85
                    ? deepOrange
                    : defaultColor
                }`,
              }}
              className="z-0 "
            >
              {avatarValue ?? 'de'}
            </Avatar>

            <div className="flex flex-col md:flex-row justify-between  w-full">
              <div className="flex flex-col gap-1">
                <p className=" text-[14px] sm:text-md font-medium  font-poppins">
                  {mail.from}
                </p>
                <span className="text-[12px] sm:text-sm text-gray-500">
                  {" "}
                  to {mail.to}
                </span>
              </div>
              <div>
                <span className=" text-[11px] sm:text-[13px] text-gray-500">
                  {new Date(mail?.createdAt).toDateString()}
                </span>{" "}
                ,{" "}
                <span className="text-[11px] sm:text-[13px] text-gray-500">
                  {" "}
                  {new Date(mail?.createdAt).getHours()}:
                  {new Date(mail?.createdAt).getMinutes()}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="px-16 hidden md:block">
            <p className="text-[15px]">{mail?.body}</p>
          </div>
        </div>
        <div className="px-3 my-6 block md:hidden">
          <p className="text-[14px] pr-2">{mail?.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
