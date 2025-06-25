import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant';
import Bg from "../assets/Bg.png"
import Squares from './Sqaures';

const Login = () => {
  const [signup , setsignup] = useState(false)
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [emailId, setemailid] = useState('');
    const [password , setpassword] = useState('');
    const [error , seterror] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async()=>{
        try{
   const res = await axios.post(BASE_URL + "/login",{
    emailId,
    password,
   },{
    withCredentials: true
   });

   dispatch(addUser(res.data));
   return navigate('/');
        }
        catch(err){
          seterror(err?.response?.data || "something went wrong")
  
        }
        // navigate("/")
    }
    const handleSignup= async()=>{
      try {
        const res = await axios.post(BASE_URL + "/signup",{
          firstName,
          lastName,
          emailId,
          password
        },{withCredentials: true});
      dispatch(addUser(res.data.data));
   return navigate('/');
      } catch (err) {
       seterror(err?.response?.data || "something went wrong")
      }
    }
    const ToggleForm = ()=>{
      setsignup(!signup);
    }

  return (
    <div className='flex justify-center  mb-5'>
<div
  className="absolute inset-0 -z-1 ">
<Squares 
speed={0.4} 
squareSize={45}
direction='down' // up, down, left, right, diagonal
borderColor='#434343'
hoverFillColor='#E4287D'
/>
</div>




      <div className='absolute top-0 left-0 w-full h-full bg-purple-950/20 -z-10'></div>
<div className="card w-96 bg-black backdrop-blur-md border-2 border-gray-800 shadow-lg  rounded-lg md:mt-2 mt-13 ]">


  <div className="card-body ">
    <h2 className=" text-xl w-full  text-center">{signup? "SignUp": "Login"}</h2>
    <div>
     {  signup &&  (<fieldset className="fieldset">
  <legend className="fieldset-legend">First Name:</legend>
  <input
    type="text"
    name="first name"         // ✅ added name
    id="Firstname"           // ✅ added id
    value={firstName}
    className="input"
    placeholder="Type here"
    onChange={(e) => setfirstName(e.target.value)}
  />
</fieldset>)}
  {signup && (<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name:</legend>
  <input
    type="text"
    name="Last Name"         // ✅ added name
    id="lastName"           // ✅ added id
    value={lastName}
    className="input"
    placeholder="Type here"
    onChange={(e) => setlastName(e.target.value)}
  />
</fieldset>)}
       <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID:</legend>
  <input
    type="text"
    name="emailid"         // ✅ added name
    id="emailid"           // ✅ added id
    value={emailId}
    className="input"
    placeholder="Type here"
    onChange={(e) => setemailid(e.target.value)}
  />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password:</legend>
  <input
    type="password"        // 🔐 changed from "text" to "password"
    name="password"        // ✅ added name
    id="password"          // ✅ added id
    value={password}
    className="input"
    placeholder="Type here"
    onChange={(e) => setpassword(e.target.value)}
  />
</fieldset>

    </div>
    <p className='text-red-700'>{error}</p>
   
    <div className="card-actions justify-center">
      <button className="bg-[#7A1CAC] py-2 mt-2 font-medium px-6 rounded-sm cursor-pointer hover:bg-[#6b1cac]" onClick={signup? handleSignup : handleLogin}>{signup? "SignUp" : "Login"}</button>
   
    </div>  
       <h2 className='text-center my-2 cursor-pointer hover:text-blue-600' onClick={ToggleForm}>{!signup ? "New to This ? signUp Now" : "Already have an account ? Login"}</h2>
  </div>
</div>
    </div>
  )
}

export default Login










// <div className="absolute  hidden lg:block inset-0 -z-10">
//   {/* Floating Cards */}
//  <div className="absolute top-[430px] left-[200px] transform rotate-10 bg-white/10 text-white backdrop-blur-sm px-4 py-4 rounded-lg shadow-md animate-float-slow">
//   💘 Looking for Love
// </div>
//   <div className="absolute top-[230px] left-[1200px] bg-white/10   rotate-20 text-white backdrop-blur-sm px-4 py-2 rounded-xl shadow-md animate-float-medium">
//     🧠 Deep Conversations
//   </div>
//    <div className="absolute top-[180px] left-[28px] bg-white/10   -rotate-20 text-white backdrop-blur-sm px-4 py-2 rounded-xl shadow-md animate-float-medium">
//   🍿	Movie Buddy
//   </div>
//   <div className="absolute top-[500px] left-[1200px] -rotate-12 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-xl shadow-md animate-float-fast">
//     🎮 Game & Chill
//   </div>
// </div>