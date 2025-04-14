import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
// import Navbar from "../../components/Navbar";
import {toast} from 'react-toastify'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name) {
      setNameError("Please enter your name");
      hasError = true;
    } else {
      setNameError("");
    }

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

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setNameError(res.data.message || "Signup failed. Try again");
        toast.error(res.data.message)
        return;
      }

      toast.success(res.data.message)
      //setError("")

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setNameError(error.message);
    }

    // Clear errors and proceed with signup
    // setNameError("");
    // setEmailError("");
    // setPasswordError("");

    // Call the signup API (to be implemented)
    console.log("Sign-up successful!");
  };

  //sign up api

  return (
    <>
      <div
        className="flex items-center justify-center"
        style={{
          // backgroundImage: "url('/src/images/greenanime.jpg')",
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
              backgroundImage: "url('/src/images/greenanime.jpg')",
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
            className="w-96 rounded-lg px-7 py-10 bg-white/50 backdrop-blur-md shadow-lg border border-black/30 shadow-black hover:backdrop-brightness-110"
          >           <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <div className="mb-4">  
              <input
                type="text"
                placeholder="Name"
                className="input-box border-2 border-slate-950 placeholder:text-slate-950"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                className="input-box border-2 border-slate-950 placeholder:text-slate-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <button type="submit" className="w-full text-sm bg-green-700 text-white p-2 rounded my-1 shadow-md shadow-black ">
            Sign Up
          </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-violet-900 underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
