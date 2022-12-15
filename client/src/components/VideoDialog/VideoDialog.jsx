import React from "react";
import clsx from "clsx";
import styles from "./VideoDialog.module.css";
import CallingDialog from "../CallingDialog";

function Video({ srcObject, ...props }) {
  const refVideo = React.useRef(null);

  React.useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
    refVideo.current.addEventListener("loadedmetadata", () => {
      refVideo.current.play();
    });
  }, [srcObject]);

  return <video ref={(video) => (refVideo.current = video)} {...props} />;
}

const Actions = ({ onReject, onAcccept, showAcceptButton }) => {
  return (
    <div className={styles.actions}>
      <button onClick={onReject}>Reject</button>
      {showAcceptButton && <button onClick={onAcccept}>Accept</button>}
    </div>
  );
};

export default function VideoDialog({
  peers,
  isCalling,
  callee,
  onRejectCall,
  onAcceptCall,
  caller, // Who is trying to call us!
  isCallAccepted, // If the call is accepted!
}) {
  const renderVideos = () => {
    return peers.map(({ peer, stream }) => {
      return <Video className={styles.video} key={peer} srcObject={stream} />;
    });
  };
  return (
    <div className={clsx([styles.dialog, styles.open])}>
      {Boolean(peers.length) && renderVideos()}
      {((caller && !isCallAccepted) || isCalling) && (
        <CallingDialog callee={callee} caller={caller ? caller.from : null} />
      )}
      <Actions
        showAcceptButton={caller && !isCallAccepted}
        onReject={onRejectCall}
        onAcccept={onAcceptCall}
      />
    </div>
  );
}
