import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant';


const Login = () => {
   
    const [emailId, setemailid] = useState("rohit@gmail.com");
    const [password , setpassword] = useState("Rohit@123");
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
        }
        catch(err){
      console.log(err);
        }
        navigate("/")
    }

  return (
    <div className='flex justify-center mt-5'>
    <div className="card bg-base-200 w-96 shadow-sm rounded-lg">
  <div className="card-body ">
    <h2 className=" text-xl w-full  text-center">Login</h2>
    <div>
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
   
    <div className="card-actions justify-center">
      <button className="bg-[#7A1CAC] py-2 mt-2 font-medium px-6 rounded-sm cursor-pointer hover:bg-[#6b1cac]" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
