import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { colorSet } from "../util/data";

const EmailListElement = ({ email }) => {
  const navigate = useNavigate();

  const { purple, blue, green, yellow, defaultColor, indigo, deepOrange } =
    colorSet;

  let result = 0;
  let path = window.location.pathname;

  const [userColorCode, setUserColorCode] = useState("");

  const getUserColorcode = () => {
    if (path === "sent") {
      let ch = email?.from.substring(0, 1);
      result = ch.charCodeAt(0);
    } else {
      let ch = email?.to.substring(0, 1);
      result = ch.charCodeAt(0);
    }
  };

  getUserColorcode();

  return (
    <div
      onClick={() => navigate(`/mail/${email._id}`)}
      className="flex  gap-4 justify-between rounded-md hover:bg-slate-100  cursor-pointer  sm:items-center text-[14px] p-1  flex-col sm:flex-row   "
    >
      <div className="flex justify-start items-center my-2  md:my-4 gap-4 w-[320px]">
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
          className="z-0"
        >
          {path === "/sent"
            ? email?.to.substring(0, 1)
            : email?.from.substring(0, 1)}
        </Avatar>
        {path === "/inbox" || path === "/" ? (
          <span className={`${!email?.isRead ? "font-bold" : "font-normal"} `}>
            {email?.from}
          </span>
        ) : (
          <span className={`${!email?.isRead ? "font-bold" : "font-normal"}`}>
            To : {email?.to}
          </span>
        )}
      </div>

      <p className={`${!email?.isRead ? "font-bold" : "font-normal"}`}>
        {email?.subject} - {email?.body.substring(0, 20)}..{" "}
        {/* {email?.subject}  */}
      </p>
      <span className={`${!email?.isRead ? "font-bold" : "font-normal"}`}>
        {new Date(email?.createdAt).toDateString()}
      </span>
    </div>
  );
};

export default EmailListElement;
