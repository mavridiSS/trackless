import React from "react";
import styles from "./IconButton.module.css";

export default function IconButton({ children, ...props }) {
  return (
    <button {...props} className={styles.iconButton}>
      {children}
    </button>
  );
}
