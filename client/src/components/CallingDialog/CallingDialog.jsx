import React from "react";
import styles from "./CallingDialog.module.css";

export default function CallingDialog({ callee, caller }) {
  return (
    <div className={styles.calling}>
      <h2 className={styles.callee}>{caller ? caller : callee}</h2>
      <p>{caller ? "Is calling you..." : "Calling..."}</p>
    </div>
  );
}
