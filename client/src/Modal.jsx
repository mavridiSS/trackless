import React from "react";
import clsx from "clsx";
import styles from "./Modal.module.css";

export default function Modal({ onClose, open, onJoin }) {
  const [username, setUsername] = React.useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleJoin = () => onJoin(username);

  return (
    <div className={clsx([styles.modal, open ? styles.open : styles.closed])}>
      <section className={styles.modalMain}>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
        <button disabled={!username} type="button" onClick={handleJoin}>
          Join
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </section>
    </div>
  );
}
