import React from "react";
import io from "socket.io-client";

const useSocket = () => {
  const socketRef = React.useRef();

  if (!socketRef.current)
    socketRef.current = io(process.env.SOCKET_URL || "http://localhost:5000/");

  const emit = (event, payload) => {
    socketRef.current.emit(event, payload);
  };

  return [socketRef.current, emit];
};

export default useSocket;
