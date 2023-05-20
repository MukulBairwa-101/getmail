import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Inbox from "./pages/Inbox";
import Mail from "./pages/mail";
import Sent from "./pages/Sent";
import ComposeForm from "./Components/ComposeForm";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TwoWayAuth from "./pages/auth/TwoWayAuth";
import ResetPassword from "./pages/auth/ResetPassword";

import "./App.css";

function App() {

  let token = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"))?.user?.access_token
  const navigate = useNavigate();


 
  if(!token){
    return (
      <div className="App">
         <Routes>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/auth/forgotpassword/twoway/otp"
            element={<TwoWayAuth />}
          />
          <Route path="/auth/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        </Routes>
      </div>
    )
  }


  return (
    <div className="App">  
        <div className="flex relative">
          <ComposeForm />
          <Header />
          <div className="flex w-full">
            <Sidebar />
            <div className="sm:ml-60  mt-24 w-full md:w-3/4 ">
              <Routes>
              <Route path="/" element={<Inbox />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/sent" element={<Sent />} />
                <Route path="/mail/:id" element={<Mail />} />
                <Route path="*" element={<Navigate to="/inbox" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default App;
