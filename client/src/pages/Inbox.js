import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHelper from "../helper/useHelper";
import EmailListElement from "../Components/EmailListElement";
import { fetchMails } from "../Redux/Action";
import { TbMailOff } from "../util/data";
import Loader from "../Components/Loader";

const Inbox = () => {
  let loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

  const { request, response } = useHelper();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const mails = useSelector((state) => state.appReducer?.mails);

  useEffect(() => {
    request("GET", `/mailbox/inbox?email=${loggedInUser?.user?.email}`);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (response) {
      setTimeout(() => {
        dispatch(fetchMails(response?.mails));
        setIsLoading(false);
      }, 1000);
    }
  }, [response]);

  return (
    <div className="w-full">
      <div className="  divide-y divide-slate-200 ...  ">
        {!mails.length ? (
          <div className="flex flex-col items-center  gap-4 justify-center  text-[18px] sm:text-[24px] p-2 my-16">
            <TbMailOff className=" text-6xl md:text-9xl" />
            Inbox is empty
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center  gap-4 justify-center  text-[18px] sm:text-[24px] p-2 my-16">
            <Loader attributes={{ height: 60, width: 60, color: "#609EA2" }} />
          </div>
        ) : (
          mails?.map((item) => {
            return <EmailListElement email={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Inbox;
