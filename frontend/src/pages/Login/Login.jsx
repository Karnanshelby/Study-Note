import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import axios from "axios";
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter the password");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    // Clear errors and proceed with login
    setEmailError("");
    setPasswordError("");

    try {
      dispatch(signInStart());

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message)
        console.log(res.data);
        dispatch(signInFailure(res.data.message));
        return;
      }


      toast.success(res.data.message)
      dispatch(signInSuccess(res.data));
      navigate("/Home");
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        // backgroundImage: "url('/src/images/animeCloud.jpg')",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        // backgroundPosition: "center",
        height: "100vh",
        margin: 0,
         
      }}
    >
            {/* Background container with blur */}
          <div
            style={{
              backgroundImage: "url('/src/images/animeCloud.jpg')",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              filter: "blur(25px)", // Blur effect
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1, // Keeps the background behind the form
            }}
          ></div>

          <div
            className="w-96 rounded-lg px-7 py-10 bg-white/50 backdrop-blur-md shadow-lg border border-black/30 shadow-black hover:backdrop-brightness-105   "
          >        
          <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="input-box border-2 bg-sky-200 border-slate-950 placeholder:text-slate-950 hover:shadow-2xl shadow-slate-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="mb-4">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <button type="submit" className="w-full text-sm bg-green-700 text-white p-2 rounded my-1 shadow-lg shadow-black hover:text-lg">
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-violet-900 underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
