import React from "react";
import styles from "./LoadingDots.module.css";

export const LoadingDots: React.FC = () => {
  return (
    <div className={styles.dots}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};
