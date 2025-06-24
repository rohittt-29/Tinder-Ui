import { io } from "socket.io-client";
import { BASE_URL } from "./Constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true
    });
  } else {
    return io("https://togetha-backend.onrender.com", {
      transports: ["websocket"],
      withCredentials: true
    });
  }
};
