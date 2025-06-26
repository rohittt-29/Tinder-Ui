
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';


const Chat = () => {
     const {TargetUserId} = useParams();
     const messageEndRef = useRef();
     const navigate = useNavigate();
    //  console.log("TargetUserId from useParams:", TargetUserId);
  const [message, setmessage] = useState([]);
  const [newMessage , setNewMessage] = useState("");
  const [targetUser , setTargetUser] = useState('') 
 
    const user = useSelector((store)=> store.user)
 const userId = user?._id;

 const fetchTargetUser = async()=>{
  const res = await axios.get(BASE_URL + "/profile/view/" + TargetUserId,{withCredentials:true});
  setTargetUser(res?.data);
  console.log(res?.data.firstName)
 }

 const fetchMessage =async()=>{
  const chat = await axios.get(BASE_URL + "/chat/"+ TargetUserId,{withCredentials: true});

  console.log(chat.data.messages);
  const chatmessage =chat?.data?.messages.map((msg)=>{
    return {
      firstName: msg.senderId.firstName, 
      text: msg.text,
      time: new Date(msg.createdAt).toLocaleTimeString([],{hour:'2-digit' , minute:'2-digit'})
    }
  });
  setmessage(chatmessage)
 }
 
 useEffect(()=>{
  fetchMessage();   
 },[])

 useEffect(()=>{
  fetchTargetUser();
 },[])

 useEffect(()=>{
  messageEndRef.current?.scrollIntoView({behavior: "smooth"});
 },[message])

 


    useEffect(()=>{
      if(!userId){
        return;
      }
      const socket = createSocketConnection();
      socket.emit("joinChat",{firstName: user.firstName, userId,TargetUserId});
      socket.on("messageReceived",({firstName , text})=>{
        console.log(firstName+ " : " + text);
        setmessage((message)=>[...message, {firstName,text}])
      })
      return()=>{
        socket.disconnect();
      }
    },[userId, TargetUserId]);
   

    const sendMessage =()=>{
      const socket = createSocketConnection();
      socket.emit("sendMessage",{
        firstName: user.firstName,
        userId,
        TargetUserId,
        text: newMessage
      });
      setNewMessage("")
    }

  return (
    <div>
              <h1 className='font-bold  w-fit mx-auto italic md:p-2 text-xl md:text-3xl  border-b-2 border-purple-600 bg-gradient-to-l '>Messages</h1>
    <div className='flex flex-col md:border-1 md:border-gray-700 h-screen md:h-[80vh] md:my-5  w-full md:w-1/2 mx-auto'>
      
      <div className=' flex justify-between border-b-2 border-gray-800 '>
<h1 className="p-3 text-lg font-light ">Chatting with <span className='font-semibold'>{targetUser?.firstName || "someone"}</span></h1>

   <i onClick={()=>navigate("/connections")} className="ri-close-large-fill p-3 text-xl cursor-pointer  hover:scale-150 transition duration-200"></i></div>
   <div className='flex-1 p-2 md:p-5 overflow-scroll'>
    {message.map((msg,index)=>{
      return (
        <div key={index}> 
<div  className={"chat " +(user.firstName === msg.firstName? " chat-end": "chat-start")}>
  <div className="chat-image avatar">
<div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={user.firstName === msg.firstName ? user.photoUrl : targetUser.photoUrl}
      />
    </div>
  </div>
  <div className="chat-header">
 {msg.firstName}
    <time className="text-xs opacity-50">{msg.time}</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  
</div>
</div>

      );
    })}
      <div ref={messageEndRef} />
   </div>
<div className='p-3  border-t border-gray-700 flex items-center gap-2 '>
  <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} 
  onKeyDown={(e)=>e.key === 'Enter' && sendMessage()}
  className=' flex-1  p-2 outline-none  rounded-lg' placeholder='Type a Message' type="text" />
  <button onClick={sendMessage} className='px-5 py-2 md:px-6 md:py-2 cursor-pointer hover:bg-rose-400  bg-gray-600 text-white rounded-full'>Send</button>
  </div>
 </div>
    </div>
  )
}

export default Chat
