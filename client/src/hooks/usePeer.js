import React from "react";
import Peer from "simple-peer";

const usePeer = (userName, roomId, socket, emit) => {
  const [peers, setPeers] = React.useState([]);
  const [caller, setCaller] = React.useState();
  const [isCalling, setIsCalling] = React.useState(false);
  // const [socket] = useSocket();

  const [isCallAccepted, setIsCallAccepted] = React.useState(false);
  // const peer = React.useRef();

  React.useEffect(() => {
    if (socket) {
      socket.on("hey", (data) => {
        console.log("Hey is received from:", JSON.stringify(data));
        setCaller(data);
      });
      socket.on("call-rejected", () => {
        setPeers([]);
        setCaller();
        setIsCallAccepted(false);
        setIsCalling(false);
      });
    }
  }, [socket]);

  const call = (user) => {
    setIsCalling(true);
    const getUserMedia = (
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia
    ).bind(navigator);
    getUserMedia(
      { video: true, audio: true },
      function (stream) {
        setPeers((peers) => {
          return [...peers, { peer: userName, stream }];
        });
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (signal) => {
          console.log(`I am going to call ${user}!`);
          emit("call", { signal, from: userName, roomId });
        });

        peer.on("stream", (stream) => {
          console.log("Streaming from call");
          setPeers((peers) => {
            return [...peers, { peer: user, stream }];
          });
        });

        socket.on("call-accepted", (signal) => {
          setIsCallAccepted(true);
          peer.signal(signal);
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  };

  const acceptCall = () => {
    const getUserMedia = (
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia
    ).bind(navigator);

    getUserMedia(
      { video: true, audio: true },
      function (stream) {
        setIsCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
        });

        peer.on("signal", (data) => {
          emit("accept-call", { signal: data, roomId });
        });

        peer.on("stream", (stream) => {
          console.log("Streaming from accepted call");
          setPeers((peers) => {
            return [...peers, { peer: caller.from, stream }];
          });
        });

        peer.signal(caller.signal);
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  };

  const rejectCall = () => {
    emit("reject-call", { from: userName, roomId });
    setPeers([]);
    setCaller();
    setIsCallAccepted(false);
    setIsCalling(false);
  };

  return [
    call,
    peers,
    isCallAccepted,
    acceptCall,
    caller,
    isCalling,
    rejectCall,
  ];
};

export default usePeer;
