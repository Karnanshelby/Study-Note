import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/signup/Signup'
// import Navbar from './components/Navbar'
import Welcome from './pages/Welcome/Welcome'
import Profile from './pages/Profile/profile'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {

  // const {currentUser, loading, errorDispatch} = useSelector(
  //   (state) => state.user
  // )

  // const [userInfo, setUserInfo] = useState(null)

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(currentUser === null){
  //     navigate("/login")
  //   }else{
  //     setUserInfo(currentUser?.rest)
  //   }
  // })
  
  // <Navbar userInfo={userInfo} />

  return (
  <BrowserRouter> 
    <Routes>
      <Route path="/Home" element={ <><Home/></>} /> 
      <Route path="/" element={<Welcome/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    <ToastContainer position="top-center"/>
  </BrowserRouter>
  )
}

export default App