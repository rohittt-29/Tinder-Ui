import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/Constant'
import { addUser } from '../utils/UserSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store)=> store.user)
  const fetchUser = async()=>{
    if(userdata) return;
    try{
   const res = await axios.get(BASE_URL + "/profile/view",{
    withCredentials: true,
   });
   dispatch(addUser(res.data))
    }
    catch(err){
      // navigate('/login')
      if(err.status === 401){
        navigate('/login')
      }
     console.error(err);
    }
  };
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
      
      <Navbar/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Body
