
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';


const Chat = () => {
     const {TargetUserId} = useParams();
    //  console.log("TargetUserId from useParams:", TargetUserId);
  const [message, setmessage] = useState([]);
  const [newMessage , setNewMessage] = useState(""); 
 
    const user = useSelector((store)=> store.user)
 const userId = user?._id;

 const fetchMessage =async()=>{
  const chat = await axios.get(BASE_URL + "/chat/"+ TargetUserId,{withCredentials: true});

  console.log(chat.data.messages);
  const chatmessage =chat?.data?.messages.map((msg)=>{
    return {
      firstName: msg.senderId.firstName, text: msg.text
    }
  });
  setmessage(chatmessage)
 }
 
 useEffect(()=>{
  fetchMessage();   
 },[])


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
    <div className='flex flex-col md:border-1 md:border-gray-700 h-screen md:h-[80vh] md:my-5  w-full md:w-1/2 mx-auto'>
   <h1 className='p-3 border-b-2 border-gray-800'>Chats</h1>
   <div className='flex-1 p-5 overflow-scroll'>
    {message.map((msg,index)=>{
      return (
        <div key={index}> 
<div  className={"chat " +(user.firstName === msg.firstName? " chat-end": "chat-start")}>
  <div className="chat-image avatar">

  </div>
  <div className="chat-header">
 {msg.firstName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
</div>

      );
    })}
   </div>
<div className='p-3 border-t border-gray-700 flex items-center gap-2 '>
  <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className=' flex-1  p-2   rounded-lg' placeholder='Type a Message' type="text" />
  <button onClick={sendMessage} className='px-5 py-2 md:px-6 md:py-2 cursor-pointer hover:bg-rose-400  bg-rose-500 text-white rounded-lg'>Send</button>
  </div>
    </div>
  )
}

export default Chat
