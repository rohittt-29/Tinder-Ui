import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserfromFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {
  const dispatch = useDispatch();

   const { _id,firstName, lastName , about, photoUrl, age, gender} = user;

   const handleRequest = async(status, userId)=>{
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status  +"/" + userId,{},{withCredentials: true  });
      dispatch(removeUserfromFeed(userId))
    } catch (err) {
       console.log(err);
    }
   }
   
  return (
   <div className="card bg-base-200 w-86  shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="Name text-3xl text-white font-semibold">{firstName+ " " + lastName}</h2>
    <p className='text-xl text-white/70 '>{about}</p>
{age && gender && <p>{age + " , " + gender}</p>}
    <div className="card-actions justify-center mt-8 gap-5">
<div className='w-25 h-25 flex items-center justify-center text-rose-500 text-6xl rounded-full bg-gray-300  cursor-pointer hover:bg-gray-400 hover:scale-110 transition duration-200 ' onClick={()=>handleRequest("ignored", _id)}>
   <i className="ri-close-fill hover:scale-150 transition duration-200"></i>
  </div>
  <div className='w-25 h-25 flex items-center justify-center text-white text-6xl rounded-full bg-rose-600 cursor-pointer hover:bg-rose-700 hover:scale-110 transition duration-200' onClick={()=>handleRequest("interested", _id)}>
    <i className="ri-heart-3-fill hover:scale-150 transition duration-200"></i>
  </div>
    </div>
  </div>
</div>



  )
}

export default UserCard
