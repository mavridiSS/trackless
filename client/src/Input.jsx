import React from "react";
import styles from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={styles.inputRoot}>
      <input
        type="text"
        aria-label="left"
        className={styles.input}
        {...props}
      />
    </div>
  );
}
