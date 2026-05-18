import React from "react";
import styles from "./MessageBubble.module.css";
import type { Message } from "../../types";

interface Props {
  message: Message;
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div
      className={`${styles.container} ${isUser ? styles.user : styles.assistant}`}
    >
      <div
        className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}
      >
        <p>{message.text}</p>
        <span className={styles.time}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
