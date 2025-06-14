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
    if(connection.length === 0) return <h1 className="relative mx-auto mt-24 w-fit bg-gradient-to-r from-indigo-700 via-purple-600 cursor-pointer text-white text-xl md:text-3xl px-8 py-5 rounded-3xl font-extrabold shadow-xl flex items-center gap-4 animate-bounce hover:animate-spin-slow transition-all duration-700 hover:scale-105 hover:shadow-purple-500/60">
  Bhai, abhi tak koi connection nahi mila...
  <img 
    src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/crying-face_1f622.gif" 
    alt="crying emoji"
    className="w-8 h-8 md:w-10 md:h-10 hover:rotate-12 transition-transform duration-300"
  />
</h1>




  return (
    <div>
     <div className=' text-center my-10'>
        <h1 className='font-bold bg-purple-500 w-fit mx-auto italic p-2 rounded-bl-2xl rounded-tr-2xl text-3xl bg-gradient-to-l from-purple-900'>Connections</h1>
        {connection.map((con)=>{
            const {firstName, lastName , photoUrl, age , gender, about} = con;
            return(
                <div className=' flex m-4 p-4 rounded-lg bg-base-300 mb-5 w-1/2 mx-auto'>
                 <div>   <img src={photoUrl} alt="photo" className='w-15 h-15 rounded-full' /></div>
                 <div className='mx-3 text-left'>
                    <h2 className='font-bold text-2xl'>{firstName+ " " + lastName}</h2>
                  {age && gender && <h3>{age + ", " + gender}</h3>}
                   
                    <p className='italic text-xl text-gray-400' >{about}</p>
                    </div>
                </div>
            )
        })}
     </div>
    </div>
  )
}

export default Connections
