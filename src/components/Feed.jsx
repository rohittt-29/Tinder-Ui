import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import SwipeCards from './SwipeCards';
import Shimmer from './Shimmer';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch feed only if it's empty
    // if (!feed || feed.length === 0) {
      getFeed();
    // }
  }, []);

if (!feed)
  return (
    <div className='flex justify-center items-center h-screen'>
      <Shimmer />
    </div>
  );


  if (feed?.length === 0)
    return (
      <h1 className="relative mx-auto mt-24 w-fit  cursor-pointer text-gray-300 text-md md:text-3xl px-8 py-5 rounded-3xl font-extrabold shadow-xl flex items-center gap-4 animate-bounce hover:animate-spin-slow transition-all duration-700 hover:scale-105 hover:shadow-purple-500/60">
        No Users Found
        <img
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/crying-face_1f622.gif"
          alt="crying emoji"
          className="w-8 h-8 md:w-10 md:h-10 hover:rotate-12 transition-transform duration-300"
        />
      </h1>
    );

  return (
    <div>
      <SwipeCards users={feed} onEmpty={getFeed} />
    </div>
  );
};

export default Feed;
