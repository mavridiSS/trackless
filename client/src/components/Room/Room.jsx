import React from "react";
import { useParams, useHistory } from "react-router-dom";
import usePeer from "../../hooks/usePeer";
import useChat from "../../hooks/useChat";
import VideoDialog from "../VideoDialog/VideoDialog";
import Chat from "../Chat";
import useSocket from "../../hooks/useSocket";
import { generateName } from "../../utils/names";

export default function Room() {
  const username = React.useRef(generateName());
  const history = useHistory();
  const { roomId } = useParams();
  const [socket, emit] = useSocket();

  const [sendMessage, messages, otherUser] = useChat(roomId, socket, emit);

  const [
    call,
    peers,
    isCallAccepted,
    acceptCall,
    caller,
    isCalling,
    rejectCall,
  ] = usePeer(username.current, roomId, socket, emit);

  React.useEffect(() => {
    // If no room id or the room is not created redirect to home.
    // TODO: Check for not exisiting room
    if (!roomId) {
      history.push("/");
    } else {
      if (username.current && roomId) {
        emit("join", { username: username.current, roomId });
      }
    }
  }, [username, roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCall = () => {
    call(otherUser);
  };

  if (peers.length || (caller && !isCallAccepted)) {
    return (
      <VideoDialog
        peers={peers}
        isCalling={isCalling && !isCallAccepted}
        callee={otherUser}
        caller={caller}
        isCallAccepted={isCallAccepted}
        onRejectCall={rejectCall}
        onAcceptCall={acceptCall}
      />
    );
  }

  return (
    <Chat sendMessage={sendMessage} messages={messages} onCall={handleCall} />
  );
}
