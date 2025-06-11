import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/UserSlice';

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
 <div className="navbar bg-base-300 shadow-sm">
   <div className="flex-1">
        {/* Always show logo, but conditionally make it clickable */}
        {user ? (
          <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
        ) : (
          <span className="btn btn-ghost text-xl opacity-100 cursor-default">daisyUI</span>
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
         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         <li>
           <Link to='/profile' className="justify-between">
             Profile
             <span className="badge">New</span>
           </Link>
         </li>
         <li><a>Settings</a></li>
         <li onClick={handleLogout}><a>Logout</a></li>
       </ul>
     </div>
     )}
   </div>
 </div>
  )
}

export default Navbar
