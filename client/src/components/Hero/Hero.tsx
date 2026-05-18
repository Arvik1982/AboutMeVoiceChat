import React from "react";
import styles from "./Hero.module.css";
import { Github, Send, Mail } from "lucide-react";

interface HeroProps {
  name: string;
  title: string;
  experience: string;
  description: string;
  avatar: string;
  social: {
    github: string;
    telegram: string;
    email: string;
  };
}

export const Hero: React.FC<HeroProps> = ({
  name,
  title,
  experience,
  description,
  avatar,
  social,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.avatar}>{avatar}</div>
      <h1>{name}</h1>
      <p className={styles.title}>{title}</p>
      <p className={styles.experience}>{experience}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.social}>
        <a href={social.github} target="_blank" rel="noopener noreferrer">
          <Github size={20} />
        </a>
        <a href={social.telegram} target="_blank" rel="noopener noreferrer">
          <Send size={20} />
        </a>
      </div>
    </section>
  );
};
