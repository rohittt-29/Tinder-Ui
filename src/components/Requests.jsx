import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store)=> store.request);
  
  const reviewRequest = async(status, _id)=>{
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{withCredentials: true})
    } catch (err) {
      console.log(err);
      dispatch(removeRequest(_id))
    }
  }
  const fetchRequest = async()=>{

    try {
      const res = await axios.get(BASE_URL + "/user/request/receive" , {withCredentials: true});
      console.log(res?.data?.data);
      dispatch(addRequest(res?.data?.data))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchRequest();
  },[])
  if(!request) return;
    if(request.length === 0) return <h1 className="relative mx-auto mt-24 w-fit  cursor-pointer text-gray-300 text-xl md:text-3xl px-8 py-5 rounded-3xl font-extrabold shadow-xl flex items-center gap-4 animate-bounce hover:animate-spin-slow transition-all duration-700 hover:scale-105 hover:shadow-purple-500/60">
  No Request Found  
  <img 
    src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/crying-face_1f622.gif" 
    alt="crying emoji"
    className="w-8 h-8 md:w-10 md:h-10 hover:rotate-12 transition-transform duration-300"
  />
</h1>





  return (
    
    <div>
     <div className=' text-center my-10'>
        <h1 className='font-bold bg-purple-500 w-fit mx-auto italic p-2 rounded-bl-2xl rounded-tr-2xl text-3xl bg-gradient-to-l from-purple-900'>Requests</h1>
        {request.map((req)=>{
            const {_id,firstName, lastName , photoUrl, age , gender, about} = req.fromUserId;
            return(
                <div key={_id} className=' relative flex m-4 p-4 rounded-lg bg-base-300 mb-5 w-1/2 mx-auto'>
                 <div>   <img src={photoUrl} alt="photo" className='w-15 h-15 rounded-full' /></div>
                 <div className='mx-3 text-left'>
                    <h2 className='font-bold text-2xl'>{firstName+ " " + lastName}</h2>
                  {age && gender && <h3>{age + ", " + gender}</h3>}
                   
                    <p className='italic text-xl text-gray-400' >{about}</p>
                   
                    </div>
                 <div className=' absolute bottom-4 right-4 flex  space-x-3'>
  <div className='w-15 h-15 flex items-center justify-center text-rose-500 text-3xl rounded-full bg-gray-300  cursor-pointer hover:bg-gray-400 hover:scale-110 transition duration-200 ' onClick={()=>reviewRequest("rejected", req._id)}>
   <i className="ri-close-fill hover:scale-150 transition duration-200"></i>
  </div>
  <div className='w-15 h-15 flex items-center justify-center text-white text-3xl rounded-full bg-rose-600 cursor-pointer hover:bg-rose-700 hover:scale-110 transition duration-200' onClick={()=>reviewRequest("accepted", req._id)}>
    <i className="ri-heart-3-fill hover:scale-150 transition duration-200"></i>
  </div>
</div>

                   
                </div>
            )
        })}
     </div>
    </div>
  )
}
export default Requests
