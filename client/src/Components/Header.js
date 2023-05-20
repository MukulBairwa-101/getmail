import React, { useState, useCallback } from "react";
import useHelper from "../helper/useHelper";
import { useDispatch } from "react-redux";
import { fetchMails } from "../Redux/Action";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

import {
  GiHamburgerMenu,
  RiSearch2Line,
  MdEdit,
  HiInbox,
  BiSend,
  RiCloseFill,
} from "../util/data";

import { Drawer } from "@mui/material";

import { popupActive } from "../Redux/Action";

const BootstrapButton = styled(Button)({
  textTransform: "none",
  padding: "6px 12px",
  lineHeight: 1.5,
  backgroundColor: "#609EA2",
  borderColor: "#0063cc",
  fontFamily: "poppins",
  "&:hover": {
    backgroundColor: "#1F4068",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { request, response } = useHelper();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
  const path = window.location.pathname;

  const handleSearch = (e) => {
    const { value } = e.target;
    request(
      "GET",
      `/mailbox/search?email=${loggedInUser?.user?.email}&searchKey=${value}`
    );
  };

  // set dobounce effect in search

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const optimizedSearchFilter = useCallback(debounce(handleSearch), []);

  const signOut = () => {
    sessionStorage.removeItem("LOGGED_IN_USER");
    if (
      !JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"))?.user?.access_token
    ) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  if (response) {
    dispatch(fetchMails(response?.filterdData));
  }

  return (
    <div className="  z-20 fixed w-full">
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="persistent"
      >
        <div className="relative m-4 p-2 flex flex-col gap-2 ">
          <span
            className="absolute right-0 top-0 cursor-pointer   "
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <RiCloseFill />
          </span>
          <div className="my-8 mx-auto">
            <h1 className="text-xl  font-poppins font-bold  sm:text-3xl mx-4">
              Get<span className="text-gray-400 ">mail</span>
            </h1>
          </div>

          <div
            className="bg-indigo-300 text-white cursor-pointer rounded-xl my-6  text-md	 flex   items-center "
            onClick={() => {
              dispatch(popupActive(true));
              setIsOpen(false);
            }}
          >
            <MdEdit className="m-2" />
            <p className="text-1xl m-2 ">Compose</p>
          </div>
          <div
            className={` ${
              path === "/inbox" ? "bg-violet-100" : null
            } cursor-pointer flex my-4 rounded  items-center`}
            onClick={() => {
              navigate("/inbox");
              setIsOpen(false);
            }}
          >
            <HiInbox className="m-2" />
            <span className="m-2">Inbox</span>
          </div>
          <div
            className={`  ${
              path === "/sent" || path === "/" ? "bg-violet-100" : null
            }  cursor-pointer rounded flex my-4  items-center`}
            onClick={() => {
              navigate("/sent");
              setIsOpen(false);
            }}
          >
            <BiSend className="m-2" />
            <span className="m-2">Sent</span>
          </div>
          <BootstrapButton
            variant="contained"
            size="small"
            disableElevation
            onClick={signOut}
          >
            Logout
          </BootstrapButton>
        </div>
      </Drawer>

      <div className="flex justify-between items-center    w-full bg-slate-100 p-4 m-0  z-10">
        <div className="flex items-center">
          <GiHamburgerMenu
            className="cursor-pointer visible  sm:invisible"
            onClick={() => setIsOpen((prev) => !prev)}
          />

          <h1 className="text-xl  font-poppins font-bold  sm:text-3xl mx-4">
            Get<span className="text-gray-400 ">mail</span>
          </h1>
        </div>

        <div className="flex  w-1/2 ">
          <label className="relative block sm:w-full">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <RiSearch2Line />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-3/4  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm  md:text-md"
              placeholder="Search ..."
              type="text"
              name="search"
              onChange={optimizedSearchFilter}
            />
            <div></div>
          </label>
        </div>
        <div className=" justify-between items-center gap-4 hidden sm:flex">
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {loggedInUser?.user?.username.substring(0, 1)}
          </Avatar>
          <div>
            <BootstrapButton
              variant="contained"
              size="small"
              disableElevation
              onClick={signOut}
            >
              Logout
            </BootstrapButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
