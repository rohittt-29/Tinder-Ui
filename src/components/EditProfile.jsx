import axios from 'axios';
import React, { useState } from 'react'

import UserCard from './UserCard';
import { BASE_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';


const EditProfile = ({user}) => {
   
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
      const [photoUrl, setphotoUrl] = useState(user.photoUrl);
    const [Changepassword , setChangepassword] = useState(false);
    const [newpassword , setnewpassword] = useState("");
    const [age , setage] = useState(user.age);
    const [gender , setgender] = useState(user.gender);
    const [skills , setskills] = useState(user.skills);
      const [about , setabout] = useState(user.about);
      const [toast, settoast] = useState(false)

    const [error , seterror] = useState("")
  
    const dispatch = useDispatch()
  const saveProfile = async()=>{
    seterror("")
    try{
     const res = await axios.patch(BASE_URL + "/profile/edit",{ firstName,
       lastName , 
    
       about, 
       photoUrl,
        age, 
        gender}
         ,{withCredentials: true});
         dispatch(addUser(res?.data?.data));

         if(Changepassword){
          await axios.patch(BASE_URL + "/profile/forgetPassword", {emailId: user.emailId, newPassword: newpassword});
         };
        //  console.log("Saved user:", res?.data?.data);
        settoast(true);
        setTimeout(()=>{
          settoast(false)
        },3000)

    }
    catch(err){
      seterror(err?.response?.data)
    }
  }
   

  return (
   <>
  <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-6 max-w-7xl my-20 mx-auto">
    
    {/* Left: Edit Form */}
    <div className="w-full lg:w-2/3">
      <div className="card bg-base-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* First Name */}
  <div>
    <label className="label">First Name</label>
    <input
      type="text"
      value={firstName}
      className="input input-bordered w-full"
      onChange={(e) => setfirstName(e.target.value)}
    />
  </div>

  {/* Last Name */}
  <div>
    <label className="label">Last Name</label>
    <input
      type="text"
      value={lastName}
      className="input input-bordered w-full"
      onChange={(e) => setlastName(e.target.value)}
    />
  </div>

  {/* Photo URL */}
  <div>
    <label className="label">Photo URL</label>
    <input
      type="text"
      value={photoUrl}
      className="input input-bordered w-full"
      onChange={(e) => setphotoUrl(e.target.value)}
    />
  </div>

  {/* Age */}
  <div>
    <label className="label">Age</label>
    <input
      type="number"
      value={age}
      className="input input-bordered w-full"
      onChange={(e) => setage(e.target.value)}
    />
  </div>

  {/* Gender */}
  <div>
    <label className="label">Gender</label>
    <select
      className="select select-bordered w-full"
      value={gender}
      onChange={(e) => setgender(e.target.value)}
    >
      <option disabled value="">
        Select Gender
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="others">Others</option>
    </select>
  </div>

  {/* Skills */}
  <div>
    <label className="label">Skills</label>
    <input
      type="text"
      value={skills}
      className="input input-bordered w-full"
      onChange={(e) => setskills(e.target.value)}
    />
  </div>

  {/* About */}
  <div className="md:col-span-2">
    <label className="label">About</label>
    <textarea
      rows={3}
      value={about}
      className="textarea textarea-bordered w-full"
      onChange={(e) => setabout(e.target.value)}
    />
  </div>

  {/* Change Password Toggle */}
  <div className="md:col-span-2">
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={Changepassword}
        onChange={() => setChangepassword(!Changepassword)}
        className="checkbox"
      />
      Change Password?
    </label>
  </div>

  {/* Password Field */}
  {Changepassword && (
    <div className="md:col-span-1">
      <label className="label">New Password</label>
      <input
        type="password"
        value={newpassword}
        className="input input-bordered w-full"
        onChange={(e) => setnewpassword(e.target.value)}
      />
    </div>
  )}
</div>

        {/* Error */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button
            className="bg-[#7A1CAC] text-white py-2 px-6 rounded hover:bg-[#6b1cac]"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>

    {/* Right: Live Preview */}
    <div className="w-full lg:w-1/3">
      <UserCard user={{ firstName, lastName, about, photoUrl, age, gender }} />
    </div>
  </div>

  {/* Toast */}
  {toast && (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success flex gap-2 items-center">
        <i className="ri-checkbox-circle-fill text-xl text-white"></i>
        <span>Profile saved successfully.</span>
      </div>
    </div>
  )}
</>

  )
}
export default EditProfile;