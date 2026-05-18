import React from "react";
import styles from "./TechStack.module.css";

interface TechStackProps {
  items: string[];
}

export const TechStack: React.FC<TechStackProps> = ({ items }) => {
  return (
    <section className={styles.section}>
      <h2>Стек технологий</h2>
      <div className={styles.stack}>
        {items.map((tech) => (
          <span key={tech} className={styles.stackItem}>
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};
