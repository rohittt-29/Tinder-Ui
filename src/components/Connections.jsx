import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'


const Connections = () => {
    const connection = useSelector((store)=>store.connection)
    const dispatch = useDispatch();
    const fetchConnections = async()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials:true});
            console.log(res.data.data)
            dispatch(addConnection(res?.data?.data))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connection) return;
    if(connection.length === 0) return <h1 className="relative mx-auto mt-24 w-fit  cursor-pointer text-white text-xl md:text-3xl px-8 py-5 rounded-3xl font-extrabold shadow-xl flex items-center gap-4 animate-bounce hover:animate-spin-slow transition-all duration-700 hover:scale-105 hover:shadow-purple-500/60">
 No Connections Found
  <img 
    src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/crying-face_1f622.gif" 
    alt="crying emoji"
    className="w-8 h-8 md:w-10 md:h-10 hover:rotate-12 transition-transform duration-300"
  />
</h1>




  return (
    <div>
     <div className=' text-center my-30'>
        <h1 className='font-bold  w-fit mx-auto italic p-2  text-3xl  border-b-2 border-purple-600 bg-gradient-to-l '>Connections</h1>
        {connection.map((con)=>{
            const {_id,firstName, lastName , photoUrl, age , gender, about} = con;
            return(
            <div key={_id} className='flex items-start m-4 p-4  rounded-lg border-1 border-gray-800 bg-base-200 mb-5 w-1/2 mx-auto'>
  <div className='w-[60px] h-[60px] flex-shrink-0'>
    <img
      src={photoUrl}
      alt="photo"
      className='w-full h-full object-cover rounded-full'
    />
  </div>
  <div className='mx-3 text-left'>
    <h2 className='font-bold text-2xl'>{firstName + " " + lastName}</h2>
    {age && gender && <h3>{age + ", " + gender}</h3>}
    <p className='italic text-xl text-gray-400'>{about}</p>
  </div>
</div>

            )
        })}
     </div>
    </div>
  )
}

export default Connections
