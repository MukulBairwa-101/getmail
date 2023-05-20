import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { popupActive } from "../Redux/Action";
import useHelper from "../helper/useHelper";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Loader from "../Components/Loader";

import "react-toastify/dist/ReactToastify.css";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
const BootstrapButtonDelete = styled(Button)({
  textTransform: "none",
  padding: "6px 12px",
  lineHeight: 1.5,
  backgroundColor: "#E3F4F4",
  borderColor: "#0063cc",
  color:'#181823',
  fontFamily: "poppins",
  "&:hover": {
    backgroundColor: "#D2E9E9",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
})

const ComposeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useForm();

  // toast.configure()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const compose = useSelector((state) => state.appReducer?.popupActive);

  const { request, response } = useHelper();

  const handleClose = () => {
    dispatch(popupActive(false));
    reset({
      formState: {},
    });
  };

  const notify = (text) => {
    toast.success(text);
    handleClose();
  };

  let loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

  const handleFormData = (data) => {
    request(
      "POST",
      `/mailbox/sendmail?email=${loggedInUser?.user?.email}&username=${loggedInUser?.user?.username}`,
      data
    );
    setIsClicked(true)
  };

  useEffect(() => {
    if (response) {
      notify(response?.message);
    }
  }, [response]);

  return (
    <>
      <ToastContainer />

      <div>
        <Dialog
          open={compose}
          fullWidth
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleFormData)}>
              <label className="block mb-2 sm:mb-4 ">
                <span className="block text-sm font-medium text-slate-700">
                  To
                </span>

                <input
                  type="text"
                  {...register("to", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                />
              <span className="text-rose-300 text-sm " >
                {errors.to?.type === "required" && "email is required"}
                {errors.to?.type === "pattern" && "Email is not valid"}
              </span>
              </label>

              <label className="block mb-2 sm:mb-4">
                <span className="block text-sm font-medium text-slate-700">
                  Subject
                </span>

                <input
                  type="text"
                  {...register("subject", {
                    required: true,
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                />
              <span className="text-rose-300 text-sm ">
                {errors.subject?.type === "required" &&
                  "Subject should not be empty"}
              </span>
              </label>
              <label className="block mb-2 sm:mb-4">
                <span className="block text-sm font-medium text-slate-700">
                  Body
                </span>

                <input
                  type="text"
                  {...register("body", {
                    required: true,
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                />
              <span className="text-rose-300 text-sm ">
                {errors.body?.type === "required" && "Body should not be empty"}
              </span>
              </label>
              <DialogActions>
                <BootstrapButtonDelete onClick={handleClose}>Delete</BootstrapButtonDelete>
                <BootstrapButton variant="contained" type="submit">
                <div className=" flex justify-center items-center">
                {
                  !response  && isClicked ?
                  <>
                  <Loader />
                  Sending
                  </>
                  : response && isClicked ? 'Send'
                  : 'Send'
                }

                </div>
                </BootstrapButton>
              </DialogActions>
            </form>
        </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ComposeForm;
