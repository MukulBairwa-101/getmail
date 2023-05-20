import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, HiInbox, BiSend } from "../util/data";
import { useNavigate } from "react-router-dom";

import { popupActive } from "../Redux/Action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;

  return (
    <div className="w-52 hidden  sm:flex  h-full   bg-slate-100 p-4 fixed  flex-col gap-4 mt-16">
      <div
        className="cursor-pointer rounded-xl my-4	 flex   items-center bg-indigo-200  hover:bg-indigo-300  hover:text-white   w-3/4"
        onClick={() => dispatch(popupActive(true))}
      >
        <MdEdit className="m-2" />
        <p className="text-1xl m-2  ">Compose</p>
      </div>
      <div
        className={` ${
          path === "/inbox" || path === "/"
            ? "bg-violet-100"
            : "hover:bg-slate-200 "
        }  cursor-pointer flex  rounded-xl  items-center   `}
        onClick={() => navigate("/inbox")}
      >
        <HiInbox className="m-2" />
        <span className="m-2">Inbox</span>
      </div>
      <div
        className={` ${
          path === "/sent" ? "bg-violet-100" : "hover:bg-slate-200 "
        }  cursor-pointer flex  rounded-xl  items-center    `}
        onClick={() => navigate("/sent")}
      >
        <BiSend className="m-2" />
        <span className="m-2">Sent</span>
      </div>
    </div>
  );
};

export default Sidebar;
