import React from "react";
import styles from "./Approach.module.css";

interface ApproachProps {
  development: string[];
  aiTools: string[];
}

export const Approach: React.FC<ApproachProps> = ({ development, aiTools }) => {
  return (
    <section className={styles.section}>
      <h2>Как я работаю</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Подход к разработке</h3>
          <ul>
            {development.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h3>AI в моей работе</h3>
          <ul>
            {aiTools.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
