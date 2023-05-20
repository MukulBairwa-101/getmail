import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHelper from "../helper/useHelper";
import EmailListElement from "../Components/EmailListElement";
import { fetchMails } from "../Redux/Action";
import { TbMailOff } from "../util/data";

const Sent = () => {
  let loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
  const { request, response } = useHelper();

  const dispatch = useDispatch();
  const mails = useSelector((state) => state.appReducer?.mails);
  useEffect(() => {
    request("GET", `/mailbox/sent?email=${loggedInUser?.user?.email}`);
  }, []);

  useEffect(() => {
    if (response) {
      dispatch(fetchMails(response?.mails));
    }
  }, [response]);

  return (
    <div className="mt-0">
      <div className="divide-y divide-slate-200 ...">
        {!mails.length ? (
          <div className="flex flex-col items-center  gap-4 justify-center  text-[18px] sm:text-[24px] p-2 my-16">
            <TbMailOff className=" text-6xl md:text-9xl" />
            Sentbox is empty
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

export default Sent;
