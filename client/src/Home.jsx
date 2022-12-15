import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
// import {v4 as uuidv4} from "uuid";
import styles from "./Home.module.css";
import { generateName } from "./utils/names";

export default function Home() {
  const [room, setRoom] = React.useState("");
  const history = useHistory();
  console.log(generateName());

  const handleRoomInputChange = (event) => setRoom(event.target.value);

  const handleCreateRoom = async () => {
    const room = generateName();
    const response = await fetch("/create-room", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ room }),
    });
    const roomId = await response.text();
    history.push(
      { pathname: `/r/${roomId}` },
      { username: generateName(), roomId }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <input
          onChange={handleRoomInputChange}
          className={styles.usernameInput}
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          autofocus="1"
          aria-label="Username"
        /> */}
        <button
          onClick={handleCreateRoom}
          className={clsx(styles.button, styles.joinButton)}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}
