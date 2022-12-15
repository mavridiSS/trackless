import React from "react";
import clsx from "clsx";
import styles from "./Chat.module.css";
import Input from "../../Input";
import { ReactComponent as SendIcon } from "../../send.svg";
import { ReactComponent as VideoIcon } from "../../video.svg";
import IconButton from "../IconButton/IconButton";

export default function Chat({ onCall, sendMessage, messages }) {
  const [message, setMessage] = React.useState("");

  const renderMessages = () => {
    return messages.map(({ message, isMine }, index) => (
      <li
        className={clsx([
          styles.messageItem,
          isMine ? styles.myMessage : styles.receivedMessage,
        ])}
        key={index}
      >
        {message}
      </li>
    ));
  };

  const handleSendMessage = () => {
    setMessage("");
    sendMessage(message);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSendMessage();
  };

  return (
    <div className={styles.container}>
      <ol className={styles.messages}>{renderMessages()}</ol>
      <div className={styles.actionsContainer}>
        <IconButton onClick={onCall}>
          <VideoIcon fill="rgb(0, 132, 255)" />
        </IconButton>
        <Input
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={handleKeyPress}
          value={message}
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon fill="rgb(0, 132, 255)" />
        </IconButton>
      </div>
    </div>
  );
}
