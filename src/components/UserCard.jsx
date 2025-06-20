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
 <div className="flex flex-col items-center mb-50">
  {/* User Card */}
  <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
    <img
      src={photoUrl}
      alt="User"
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
      <h2 className="text-white text-2xl font-bold">
        {firstName} {lastName}{age && `, ${age}`}
      </h2>
    </div>
  </div>

  {/* Like / Dislike Buttons Outside Card */}
  <div className="flex justify-center gap-10 mt-6">
    <div
      className="w-16 h-16 flex items-center justify-center text-rose-500 text-4xl rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 hover:scale-110 transition duration-200"
      onClick={() => handleRequest("ignored", _id)}
        onTouchStart={() => handleRequest("ignored", _id)}
    >
      <i className="ri-close-fill"></i>
    </div>
    <div
      className="w-16 h-16 flex items-center justify-center text-white text-4xl rounded-full bg-rose-600 cursor-pointer hover:bg-rose-700 hover:scale-110 transition duration-200"
      onClick={() => handleRequest("interested", _id)}
     onTouchStart={() => handleRequest("interested", _id)}
    >
      <i className="ri-heart-3-fill"></i>
    </div>
  </div>
</div>



  )
}

export default UserCard
