import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'


const Connections = () => {
    const connection = useSelector((store)=>store.connection)
    const dispatch = useDispatch();
    const fetchConnections = async()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials:true});
            // console.log(res.data.data)
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
     <div className=' text-center mb-40'>
        <h1 className='font-bold  w-fit mx-auto italic md:p-2 text-xl md:text-3xl  border-b-2 border-purple-600 bg-gradient-to-l '>Connections</h1>
        {connection.map((con)=>{
            const {_id,firstName, lastName , photoUrl, age , gender, about} = con;
            return(
            <div key={_id} className='flex relative  items-start mx-2 my-4 p-2 md:m-4 md:p-4   rounded-lg border-1 border-gray-800 bg-base-200 mb-5 w-full  md:w-1/2 md:mx-auto'>
  <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex-shrink-0'>
    <img
      src={photoUrl}
      alt="photo"
      className='w-full h-full object-cover rounded-full'
    />
  </div>
  <div className='mx-3   w-2/3 md:w-4/5 text-left'>
    <h2 className='font-normal md:font-bold text-xl md:text-2xl'>{firstName + " " + lastName}</h2>
    {age && gender && <h3>{age + ", " + gender}</h3>}
    <p className='italic text-lg md:text-xl text-gray-400'> {about.length > 80 ? about.slice(0, 80) + '...' : about}</p>
  </div>
  <Link to={"/chat/" + _id}><div className='absolute right-1 bottom-0 w-9 h-9 md:w-14 md:h-14 m-3 mr-4 md:m-2 flex justify-center bg-rose-500 hover:scale-110 transition duration-200 cursor-pointer items-center rounded-full border-3 border-gray-800 p-4 md:p-2' ><i className="ri-send-plane-fill hover:scale-110 transition duration-500 text-xl "></i>
  </div>
  </Link>
</div>


            )
        })}
     </div>
    </div>
  )
}

export default Connections
