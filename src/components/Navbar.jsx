import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/UserSlice';
import Logo from "../assets/Logo.svg"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((store)=> store.user);
  // console.log(user)
  const handleLogout = async()=>{
   try{
    const res  =  await axios.post(BASE_URL + "/logout",{} ,{withCredentials:true})
    if(res.status === 200){
         dispatch(removeUser())
         navigate('/login')
    }
   }
   catch(err){
    console.error(err)
   }

   return 
  }

  return (
 <div className="navbar bg-gradient-to-b from-black shadow-sm  z-1 ">  
   <div className="flex-1 p-6">
     {user ? (
  <Link to='/' className="text-xl">
    <img src={Logo} alt="App Logo" className="h-10" />
  </Link>
) : (
  <span className="text-xl opacity-100 cursor-default">
    <img src={Logo} alt="App Logo" className="h-10 " />
  </span>
)}
   </div>
   <div className="flex gap-2">
    
     {user && ( <div className="dropdown dropdown-bottom mx-10 flex items-center gap-4">
       <p >Welcome {user.firstName}</p>
       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        
       
          <div className="w-10 rounded-full">
         
           <img
             alt="Tailwind CSS Navbar component"
            src={user.photoUrl} className='w-10 h-10' />
         </div>
       </div>
       <ul
         tabIndex={0}
         className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
         <li>
           <Link to='/profile' className="justify-between">
             Profile
             <span className="badge">New</span>
           </Link>
         </li>
          <li>
           <Link to='/connections' className="justify-between">
            My connections
          
           </Link>
         </li>
            <li>
           <Link to='/requests' className="justify-between">
          requests
          
           </Link>
         </li>
         
         <li onClick={handleLogout}><a>Logout</a></li>
       </ul>
     </div>
     )}
   </div>
 </div>
  )
}

export default Navbar
