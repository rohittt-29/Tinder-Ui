import React from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserfromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const SwipeCards = ({ users }) => {
  const dispatch = useDispatch();

  const onSwipe = async (direction, userId) => {
    console.log("Swiped", direction, "on", userId);

    try {
      if (direction === "right") {
        // User liked
        await axios.post(
          BASE_URL+ "/request/send/interested" + "/"+ userId,
          {},
          { withCredentials: true }
        );
      } else if (direction === "left") {
        // User ignored
        await axios.post(
          BASE_URL + "/request/send/ignored"+"/" + userId,
          {},
          { withCredentials: true }
        );
      }

      // Remove the user from the feed in Redux store
      dispatch(removeUserfromFeed(userId));
    } catch (err) {
      console.error("Swipe action error:", err);
    }
  };

  const onCardLeftScreen = (userId) => {
    console.log("Card left screen", userId);
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden relative">
      {users.map((user) => (
        <TinderCard
          className="absolute"
          key={user._id}
          onSwipe={(dir) => onSwipe(dir, user._id)}
          onCardLeftScreen={() => onCardLeftScreen(user._id)}
          preventSwipe={["up", "down"]}
        >
          <div className="max-w-sm">
            <UserCard user={user} />
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeCards;
