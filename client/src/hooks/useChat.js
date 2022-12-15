import React from "react";

const useChat = (roomId, socket, emit) => {
  const [messages, setMessages] = React.useState([]);
  const [otherUser, setOtherUser] = React.useState();

  const handleMessage = (message) => {
    setMessages((messages) => [...messages, { isMine: false, message }]);
  };

  const handleUserJoin = (userName) => {
    setOtherUser(userName);
    handleMessage(`${userName} has joined the room!`);
  };

  React.useEffect(() => {
    if (socket) {
      socket.on("message", handleMessage);
      socket.on("user-join", handleUserJoin);
    }
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = (message) => {
    setMessages([...messages, { message, isMine: true }]);
    emit("message", { message, roomId });
  };

  return [sendMessage, messages, otherUser];
};

export default useChat;
